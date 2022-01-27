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
            :items="payment_modes"
            :search="search"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="">
                    <v-toolbar-title>Payment Modes</v-toolbar-title>
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
                        >Delete Selected Records</v-btn>
						
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn small color="success" class="mb-2" v-on="on"
                                >Payment Mode +</v-btn
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
                                                v-model="editedItem.title"
                                                label="Payment Mode"
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
        model: "payment-mode",
        search: "",
        snackbar: false,
        dialog: false,
		ids : [],
        headers: [
            {
                text: "Id",
                align: "left",
                sortable: false,
                value: "id",
            },
			{
                text: "Payment Mode",
                align: "left",
                sortable: false,
                value: "title",
            },
            { text: "Actions", value: "action", sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            title: "",
        },
        defaultItem: {
            title: "",
        },
        response: {
            msg: "",
        },
        payment_modes: [],
        errors: [],
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Payment Mode" : "Edit Payment Mode";
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
        const payment_modes = await this.$axios.get(this.model);
        this.payment_modes = payment_modes.data;
    },

    methods: {
        editItem(item) {
            this.editedIndex = this.payment_modes.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

		delteteSelectedRecords(){
			let just_ids = this.ids.map(e => e.id);
			confirm("Are you sure you wish to delete selected records , to mitigate any inconvenience in future.") &&

			this.$axios
                    .post('payment-mode-dsr', {
						ids : just_ids
					})
                    .then((res) => {
                        if (!res.data.status) {
                            this.errors = res.data.errors;
                        } else {							
							this.$axios.get(this.model).then(res => {
							this.payment_modes = res.data;
							this.snackbar = true;
							this.ids = [];
							this.response.msg = "Selected records has been deleted";
							});
                        }
                    })
                    .catch((err) => console.log(err));
		},

        deleteItem(item) {
            confirm("Are you sure you wish to delete , to mitigate any inconvenience in future.") &&
                this.$axios.delete(this.model + "/" + item.id).then((res) => {
                    const index = this.payment_modes.indexOf(item);
                    this.payment_modes.splice(index, 1);
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
                title: this.editedItem.title.toLowerCase(),
            };

            if (this.editedIndex > -1) {
                this.$axios
                    .put(this.model + "/" + this.editedItem.id, payload)
                    .then((res) => {
						if(!res.data.status){
							this.errors = res.data.errors;							
						}
						else{
							const index = this.payment_modes.findIndex(
							(item) => item.id == this.editedItem.id
							);
							this.payment_modes.splice(index, 1, {
							id: this.editedItem.id,
							title: this.editedItem.title,
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
							this.payment_modes.unshift(res.data.record);
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