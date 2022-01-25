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
            :items="delivery_modes"
            :search="search"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="">
                    <v-toolbar-title>Delivery Modes</v-toolbar-title>
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
                                >Add Delivery Mode</v-btn
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
                                                v-model="editedItem.delivery_mode"
                                                label="Delivery Mode"
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
            <template v-slot:item.action="{ item }">
                  <v-icon color="secondary" small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon color="error" small @click="deleteItem(item)"> mdi-delete </v-icon>
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
        model: "delivery-mode",
        search: "",
        snackbar: false,
        dialog: false,
        headers: [
            {
                text: "Delivery Mode",
                align: "left",
                sortable: false,
                value: "delivery_mode",
            },
            { text: "Actions", value: "action", sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            delivery_mode: "",
        },
        defaultItem: {
            delivery_mode: "",
        },
        response: {
            msg: "",
        },
        delivery_modes: [],
        errors: [],
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Delivery Mode" : "Edit Delivery Mode";
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
    },

    async created() {
        const delivery_modes = await this.$axios.get(this.model);
        this.delivery_modes = delivery_modes.data;
    },

    methods: {
        editItem(item) {
            this.editedIndex = this.delivery_modes.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            confirm("Are you sure you want to delete this item?") &&
                this.$axios.delete(this.model + "/" + item.id).then((res) => {
                    const index = this.delivery_modes.indexOf(item);
                    this.delivery_modes.splice(index, 1);
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
            let payload = {
                delivery_mode: this.editedItem.delivery_mode.toLowerCase(),
            };

            if (this.editedIndex > -1) {
                this.$axios
                    .put(this.model + "/" + this.editedItem.id, payload)
                    .then((res) => {
						if(!res.data.status){
							this.errors = res.data.errors;							
						}
						else{
							const index = this.delivery_modes.findIndex(
							(item) => item.id == this.editedItem.id
							);
							this.delivery_modes.splice(index, 1, {
							id: this.editedItem.id,
							delivery_mode: this.editedItem.delivery_mode,
							});
							this.snackbar = res.data.status;
							this.response.msg = res.data.message;
							this.close();
						}
                    })
                    .catch((error) => console.log(err));
            } else {
                this.$axios
                    .post(this.model, payload)
                    .then((res) => {
						if(!res.data.status){
							this.errors = res.data.errors;							
						}
						else{
							this.delivery_modes.unshift(res.data.record);
							this.snackbar = res.data.status;
							this.response.msg = res.data.message;
							this.close();
						}                        
                    })
                    .catch((err) => console.log(err));
            }
        },
    },
};
</script>