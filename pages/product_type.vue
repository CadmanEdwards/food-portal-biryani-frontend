<template>
    <v-app>
        <div class="text-center ma-2">
            <v-snackbar
                v-model="snackbar"
                top="top"
                color="success"
                elevation="24"
            >
                {{ response.msg }}
            </v-snackbar>
        </div>
        <v-data-table
            :headers="headers"
            :items="types"
            :search="search"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="">
                    <v-toolbar-title>Product Types</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>

                    <v-text-field
                        v-model="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>

                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn small color="primary" class="mb-2" v-on="on"
                                >Add Product Type</v-btn
                            >
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="editedItem.type"
                                                label="Product Type"
                                            ></v-text-field>
                                            <span
                                                v-if="
                                                    errors && errors.length > 0
                                                "
                                                class="error--text"
                                                >{{ errors[0] }}</span
                                            >
                                        </v-col>
                                        <v-col> </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="error" small @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn class="primary" small @click="save"
                                    >Save</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
                <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
            </template>
        </v-data-table>
    </v-app>
</template>
<script>
export default {
    data: () => ({
        endpoint: "product_type",
        search: "",
        snackbar: false,
        dialog: false,
        headers: [
            { text: "Type", align: "left", sortable: false, value: "type" },
            { text: "Actions", value: "action", sortable: false },
        ],
        editedIndex: -1,
        editedItem: { type: "" },
        defaultItem: { type: "" },
        response: { msg: "" },
        types: [],
        errors: [],
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1
                ? "New Product Type"
                : "Edit Product Type";
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
    },

    async created() {
        const type = await this.$axios.get(this.endpoint);
        this.types = type.data.data;
    },

    methods: {
        editItem(item) {
            console.log(item);
            this.editedIndex = this.types.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            confirm("Are you sure you want to delete this item?") &&
                this.$axios
                    .delete(this.endpoint + "/" + item.id)
                    .then((res) => {
                        const index = this.types.indexOf(item);
                        this.types.splice(index, 1);
                        this.snackbar = res.data.status;
                        this.response.msg = res.data.message;
                    });
        },

        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
        },

        save() {
            if (this.editedIndex > -1) {
                this.$axios
                    .put(this.endpoint + "/" + this.editedItem.id, {
                        type: this.editedItem.type.toLowerCase(),
                    })
                    .then((res) => {
                        if (!res.data.status) {
                            this.errors = res.data.errors;
                        } else {
                            const index = this.types.findIndex(
                                (item) => item.id == this.editedItem.id
                            );
                            this.types.splice(index, 1, {
                                id: this.editedItem.id,
                                type: this.editedItem.type,
                            });
                            this.snackbar = res.data.status;
                            this.response.msg = res.data.message;
                            this.close();
                        }
                    })
                    .catch((err) => console.log(err));
            } else {
                this.$axios
                    .post(this.endpoint, { type: this.editedItem.type.toLowerCase() })
                    .then((res) => {
                        if (!res.data.status) {
                            this.errors = res.data.errors;
                        } else {
                            this.types.unshift(res.data.record);
                            this.snackbar = res.data.status;
                            this.response.msg = res.data.message;
                            this.close();
                        }
                    })
                    .catch((res) => console.log(res));
            }
        },
    },
};
</script>