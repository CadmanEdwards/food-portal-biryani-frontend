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
            :items="links"
            :search="search"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="">
                    <v-toolbar-title
                        >The first video will be used for
                        website</v-toolbar-title
                    >

                    <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
                    <!-- 
                    <v-text-field
                        v-model="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field> -->
                    <v-spacer></v-spacer>
                    <v-btn small color="error" class="mr-2 mb-2" @click="delteteSelectedRecords"
                        >Delete Selected Records</v-btn
                    >

                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn small color="success" class="mb-2" v-on="on"
                                >Promotional Video Link +</v-btn
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
                                                :readonly="readonly"
                                                v-model="editedItem.link"
                                                label="Link"
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

            <template v-slot:item.url_id="{ item }">
                <v-row>
                    <v-col v-if="item && item.url_id">
                        <iframe
                            class="pa-2"
                            width="45%"
                            height="250"
                            :src="item.url_id"
                            frameborder="0"
                        ></iframe>
                    </v-col>
                </v-row>
            </template>

            <template v-slot:item.action="{ item }">
                <v-icon
                    color="secondary"
                    small
                    class="mr-2"
                    @click="viewItem(item)"
                >
                    mdi-eye
                </v-icon>
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
        model: "promotional-video",
        search: "",
        ids: [],
        snackbar: false,
        dialog: false,
        preview: false,
        readonly: false,
        headers: [
            {
                text: "Id",
                align: "left",
                sortable: false,
                value: "id",
            },
            {
                text: "Video",
                align: "left",
                sortable: false,
                value: "url_id",
            },

            { text: "Actions", value: "action", sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            link: "",
        },
        defaultItem: {
            link: "",
        },
        response: {
            msg: "",
        },
        links: [],
        errors: [],
    }),

    computed: {
        formTitle() {
            if (this.readonly) {
                return "View Link";
            }
            return this.editedIndex === -1 ? "New Link" : "Edit Link";
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
        const links = await this.$axios.get(this.model);
        this.links = links.data;
    },

    methods: {
        editItem(item) {
            this.setItem(item, false);
        },
        viewItem(item) {
            this.setItem(item, true);
        },

        setItem(item, condition) {
            this.editedIndex = this.links.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
            this.readonly = condition;
        },
		delteteSelectedRecords(){
			let just_ids = this.ids.map(e => e.id);
			confirm("Are you sure you wish to delete selected records , to mitigate any inconvenience in future.") &&

			this.$axios
                    .post('promotional-video-dsr', {
						ids : just_ids
					})
                    .then((res) => {
                        if (!res.data.status) {
                            this.errors = res.data.errors;
                        } else {							
							this.$axios.get(this.model).then(res => {
							this.links = res.data;
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
                    const index = this.links.indexOf(item);
                    this.links.splice(index, 1);
                    this.snackbar = res.data.status;
                    this.response.msg = "Promotional Video has been deleted";
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
                link: this.editedItem.link,
            };

            if (this.editedIndex > -1) {
                this.$axios
                    .put(this.model + "/" + this.editedItem.id, payload)
                    .then((res) => {
                        if (!res.data.status) {
                            this.errors = res.data.errors;
                        } else {
                            const index = this.links.findIndex(
                                (item) => item.id == this.editedItem.id
                            );
                            this.links.splice(index, 1, res.data.record);
                            this.snackbar = res.data.status;
                            this.response.msg =
                                "Promotional Video has been updated";

                            this.close();
                        }
                    })
                    .catch((err) => console.log(err));
            } else {
                this.$axios
                    .post(this.model, payload)
                    .then((res) => {
                        if (!res.data.status) {
                            this.errors = res.data.errors;
                        } else {
                            this.links.unshift(res.data.record);
                            this.snackbar = res.data.status;
                            this.response.msg =
                                "Promotional Video has been added";
                            this.close();
                        }
                    })
                    .catch((err) => console.log(err));
            }
        },
    },
};
</script>