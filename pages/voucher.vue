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
            :items="vouchers"
            :search="search"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="">
                    <v-toolbar-title>vouchers</v-toolbar-title>
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
                                >Add New Voucher</v-btn
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
                                                v-model="editedItem.code"
                                                label="Code"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field
                                                v-model="
                                                    editedItem.discount_value
                                                "
                                                label="Discount Value"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-menu
                                                v-model="menu2"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="auto"
                                            >
                                                <template
                                                    v-slot:activator="{
                                                        on,
                                                        attrs,
                                                    }"
                                                >
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.expiry_date
                                                        "
                                                        label="Expiry Date"
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="
                                                        editedItem.expiry_date
                                                    "
                                                    @input="menu2 = false"
                                                ></v-date-picker>
                                            </v-menu>
                                            <ul v-if="errors && errors.length > 0" class="error--text">
												<li v-for="(item, index) in errors" :key="index">
													{{ item }}
												</li>
											</ul>
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
            <template v-slot:item.status="{ item }">
                <v-chip
                    small
                    dark
                    v-if="item.status == 'New'"
                    class="secondary"
                    >{{ item.status }}</v-chip
                >
                <v-chip small dark v-else class="primary">{{
                    item.status
                }}</v-chip>
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
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
        menu2: false,
        search: "",
        snackbar: false,
        dialog: false,
        headers: [
            {
                text: "Code",
                align: "left",
                sortable: false,
                value: "code",
            },
            {
                text: "Status",
                align: "left",
                sortable: false,
                value: "status",
            },
            {
                text: "Expiry Date",
                align: "left",
                sortable: false,
                value: "expiry_date",
            },
            {
                text: "Discounted Value",
                align: "left",
                sortable: false,
                value: "discount_value",
            },
            { text: "Actions", value: "action", sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            code: "",
            expiry_date: "",
            discount_value: "",
        },
        defaultItem: {
            code: "",
            expiry_date: "",
            discount_value: "",
        },
        response: {
            msg: "",
        },
        vouchers: [],
        errors: [],
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Voucher" : "Edit Voucher";
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
			this.errors = [];
        },
    },

    async created() {
        const vouchers = await this.$axios.get("voucher");
        this.vouchers = vouchers.data.data;
    },

    methods: {
        editItem(item) {
            this.editedIndex = this.vouchers.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            confirm("Are you sure you want to delete this item?") &&
                this.$axios.delete("voucher/" + item.id).then((res) => {
                    if (!res.data.status) {
                        this.errors = res.data.errors;
                    } else {
                        const index = this.vouchers.indexOf(item);
                        this.vouchers.splice(index, 1);
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
            if (this.editedIndex > -1) {
                this.$axios
                    .put("voucher/" + this.editedItem.id, {
							code: this.editedItem.code,
							status: "Used",
							expiry_date: this.editedItem.expiry_date,
							discount_value: this.editedItem.discount_value,
                    })
                    .then((res) => {
                        if (!res.data.status) {
                            this.errors = res.data.errors;
                        } else {
                            const index = this.vouchers.findIndex(
                                (item) => item.id == this.editedItem.id
                            );
                            this.vouchers.splice(index, 1, {
                                id: this.editedItem.id,
                                code: this.editedItem.code,
                                status: "Used",
                                expiry_date: this.editedItem.expiry_date,
                                discount_value: this.editedItem.discount_value,
                            });

                            this.snackbar = res.data.status;
                            this.response.msg = res.data.message;
                            this.close();
                        }
                    })
                    .catch((err) => console.log(err));
            } else {
                let payload = {
                    code: this.editedItem.code,
                    expiry_date: this.editedItem.expiry_date,
                    discount_value: this.editedItem.discount_value,
                };
                this.$axios.post("voucher", payload).then((res) => {
                    if (!res.data.status) {
                        this.errors = res.data.errors;
                    } else {
                        console.log(res.data.record);
                        this.vouchers.unshift(res.data.record);
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