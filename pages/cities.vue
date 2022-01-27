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
            :items="cities"
            :search="search"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="">
                    <v-toolbar-title>Cities</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>

                    <v-text-field
                        v-model="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-btn
                        small
                        color="error"
                        class="mr-2 mb-2"
                        @click="delteteSelectedRecords"
                        >Delete Selected Records</v-btn
                    >

                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn small color="primary" class="mb-2" v-on="on"
                                >City +</v-btn
                            >
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                                v-model="editedItem.city"
                                                label="City"
                                            ></v-text-field>
                                            <span
                                                v-if="
                                                    errors && errors.length > 0
                                                "
                                                class="error--text"
                                                >{{ errors[0] }}</span
                                            >
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn class="error" small @click="close"
                                    >Cancel</v-btn
                                >
                                <v-btn class="primary" small @click="save"
                                    >Save</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.id="{ item }">
                <v-row>
                    <v-col>
                        <v-checkbox
                            dense
                            v-model="ids"
                            :value="item"
                        ></v-checkbox>
                    </v-col>
                </v-row>
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon
                    color="secondary"
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon color="error" small @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
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
        search: "",
        snackbar: false,
        dialog: false,
        ids: [],
        headers: [
            {
                text: "Id",
                align: "left",
                sortable: false,
                value: "id",
            },
            {
                text: "City",
                align: "left",
                sortable: false,
                value: "city",
            },
            { text: "Actions", value: "action", sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            city: "",
        },
        defaultItem: {
            city: "",
        },
        response: {
            msg: "",
        },
        cities: [],
        errors: [],
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New City" : "Edit City";
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
            this.errors = [];
            this.search = "";
        },
    },

    async created() {
        const cities = await this.$axios.get("city");
        this.cities = cities.data.data;
    },

    methods: {
        editItem(item) {
            this.editedIndex = this.cities.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        delteteSelectedRecords() {
            let just_ids = this.ids.map((e) => e.id);
            confirm(
                "Are you sure you wish to delete selected records , to mitigate any inconvenience in future."
            ) &&
                this.$axios
                    .post("city-dsr", {
                        ids: just_ids,
                    })
                    .then((res) => {
                        if (!res.data.status) {
                            this.errors = res.data.errors;
                        } else {
                            this.$axios.get("city").then((res) => {
                                this.cities = res.data.data;
                                this.snackbar = true;
                                this.response.msg =
                                    "Selected records has been deleted";
                                this.ids = [];
                            });
                        }
                    })
                    .catch((err) => console.log(err));
        },

        deleteItem(item) {
            confirm("Are you sure you want to delete this item?") &&
                this.$axios.delete("city/" + item.id).then((res) => {
                    if (res.data.status) {
                        const index = this.cities.indexOf(item);
                        this.cities.splice(index, 1);
                        this.snackbar = res.data.status;
                        this.response.msg = res.data.message;
                    }
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
            let payload = {
                city: this.editedItem.city.toLowerCase(),
            };
            if (this.editedIndex > -1) {
                this.$axios
                    .put("city/" + this.editedItem.id, payload)
                    .then((res) => {
                        if (!res.data.status) {
                            this.errors = res.data.errors;
                        } else {
                            const index = this.cities.findIndex(
                                (item) => item.id == this.editedItem.id
                            );
                            this.cities.splice(index, 1, {
                                id: this.editedItem.id,
                                city: this.editedItem.city.toLowerCase(),
                            });
                            this.snackbar = res.data.status;
                            this.response.msg = res.data.message;
                            this.close();
                        }
                    })
                    .catch((err) => console.log(err));
            } else {
                this.$axios
                    .post("city", payload)
                    .then((res) => {
                        if (!res.data.status) {
                            this.errors = res.data.errors;
                        } else {
                            this.cities.unshift(res.data.record);
                            this.snackbar = res.data.status;
                            this.response.msg = res.data.message;
                            this.close();
                        }
                    });
            }
        },
    },
};
</script>