<template>
    <v-app>
        <div class="text-center ma-2">
            <v-snackbar v-model="snackbar" :top="'top'">
                {{ response.msg }}
                <v-btn small text @click="snackbar = false"> Close </v-btn>
            </v-snackbar>
        </div>

        <v-data-table
            :headers="headers"
            :items="kitchens"
            :search="search"
            class="elevation-1"
        >
        <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Kitchens</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>

                    <v-text-field
                        v-model="search"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-dialog v-model="dialog" max-width="1000px">
                        <template v-slot:activator="{}">
                            <v-btn
                                small
                                class="mb-2 primary accent--text"
                                to="/kitchen/create"
                                >Add Kitchen</v-btn
                            >
                        </template>
                        <v-card>
                            <v-card-title>
                                <v-icon
                                    small
                                    :color="editedItem.IsActive? 'success' : 'error'"
                                >
                                    mdi-checkbox-blank-circle
                                </v-icon>

                                &nbsp;{{ editedItem.IsActive ? "Active" : "Inactive" }}
                                
                                <v-spacer></v-spacer>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-form ref="form" lazy-validation>
                                        <v-row>
                                            <v-col cols="6">
                                                <v-text-field
                                                    :rules="Rules"
                                                    :readonly="isReadOnly"
                                                    v-model="editedItem.name"
                                                    label="Title"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="6">
                                                <v-select
                                                    :readonly="isReadOnly"
                                                    v-model="editedItem.city_id"
                                                    :items="cities"
                                                    item-text="city"
                                                    item-value="id"
                                                    label="City"
                                                    persistent-hint
                                                ></v-select>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field
                                                    :rules="Rules"
                                                    v-model="editedItem.lat"
                                                    label="Lat"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field
                                                    :rules="Rules"
                                                    v-model="editedItem.lon"
                                                    label="Lon"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col>
                                                <v-text-field
                                                    :rules="Rules"
                                                    :readonly="isReadOnly"
                                                    v-model="editedItem.number"
                                                    label="Number"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col>
                                                <v-text-field
                                                    :rules="Rules"
                                                    :readonly="isReadOnly"
                                                    v-model="
                                                        editedItem.steaming_url
                                                    "
                                                    label="Steaming Url"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col>
                                                <v-text-field
                                                    :rules="Rules"
                                                    :readonly="isReadOnly"
                                                    v-model="
                                                        editedItem.location
                                                    "
                                                    label="Location"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-text-field
                                                    :rules="Rules"
                                                    :readonly="isReadOnly"
                                                    v-model="
                                                        editedItem.description
                                                    "
                                                    label="Description"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row v-if="!isReadOnly">
                                            <v-col>
                                                <v-checkbox
                                                    color="primary"
                                                    v-model="editedItem.IsActive"
                                                    label="Active"
                                                ></v-checkbox>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                small
                                                class="
                                                    primary
                                                    accent--text
                                                    mt-4
                                                "
                                                text
                                                @click="close"
                                                >Cancel</v-btn
                                            >
                                            &nbsp;
                                            <v-btn
                                                small
                                                v-if="!isReadOnly"
                                                class="
                                                    primary
                                                    accent--text
                                                    mt-4
                                                "
                                                text
                                                @click="save"
                                            >
                                                Save
                                            </v-btn>
                                        </v-row>
                                    </v-form>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="viewItem(item)">
                    mdi-eye
                </v-icon>
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small class="mr-2" @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-app>
</template>
<script>
export default {
    data: () => ({
        search: "",
        isReadOnly: false,
        snackbar: false,
        dialog: false,
        headers: [
            {
                text: "Title",
                align: "left",
                sortable: false,
                value: "name",
            },
            {
                text: "City",
                align: "left",
                sortable: false,
                value: "city.city",
            },
            {
                text: "Location",
                align: "left",
                sortable: false,
                value: "location",
            },
            {
                text: "Number",
                align: "left",
                sortable: false,
                value: "number",
            },
            { text: "Actions", value: "action", sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            name: "",
            location: "",
            lat: "",
            lon: "",
            description: "",
            streaming_url: "",
            number: "",
            city_id: "",
            IsActive: false,
        },
        defaultItem: {
            name: "",
            location: "",
            lat: "",
            lon: "",
            description: "",
            streaming_url: "",
            number: "",
            city_id: "",
            IsActive: false,
        },
        response: { msg: "" },
        kitchens: [],
        cities: [],
        Rules: [(v) => !!v || "This field is required"],
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Product" : "Edit Product";
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
    },

    async created() {
        const kitchen = await this.$axios.get("kitchen");
        this.kitchens = kitchen.data.data;

        const cities = await this.$axios.get("city");
        this.cities = cities.data.data || [];
    },

    methods: {
        async editItem(item) {
            this.getSpecificIndex(item);            
            this.isReadOnly = false;
        },
        async viewItem(item) {
            this.getSpecificIndex(item);
            this.isReadOnly = true;
        },

        getSpecificIndex(item){
            this.editedIndex = this.kitchens.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.editedItem.city_id = parseInt(item.city_id);
            this.editedItem.steaming_url = item.steaming_url || "Not Defined";
            this.dialog = true;
        },

        deleteItem(item) {
            confirm("Are you sure you want to delete this item?") &&
                this.$axios.delete("kitchen/" + item.id).then((res) => {
                    const index = this.kitchens.indexOf(item);
                    this.kitchens.splice(index, 1);
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
            this.$axios
                .put("kitchen/" + this.editedItem.id, this.editedItem)
                .then((res) => {
                    if (!res.data.status) {
                        this.errors = res.data.errors;
                    } else {
                        const idx = this.kitchens.findIndex(
                            (item) => item.id == this.editedItem.id
                        );
                        Object.assign(this.kitchens[idx], res.data.record);
                        this.snackbar = res.data.status;
                        this.response.msg = res.data.message;
                        this.close();
                    }
                });
        },
    },
};
</script>