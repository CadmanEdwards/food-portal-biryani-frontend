<template>
    <v-app dark>
        <v-navigation-drawer
            v-model="drawer"
            dark
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
            class="no_print"
            color="secondary"
        >
            <v-list
                v-for="(i, idx) in items"
                :key="idx"
                style="padding: 5px 0 0 0px"
            >
                <v-list-item
                    style="min-height: 0"
                    :to="i.to"
                    router
                    v-if="!i.hasChildren"
                >
                    <v-list-item-icon class="ma-2">
                        <v-icon>{{ i.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ i.title }}</v-list-item-title>
                </v-list-item>

                <v-list-item
                    v-else
                    style="min-height: 0"
                    @click="child_menu = !child_menu"
                >
                    <v-list-item-icon class="ma-2">
                        <v-icon>{{ i.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ i.title }} </v-list-item-title>
                    <v-icon small>{{
                        !child_menu ? "mdi-chevron-down" : "mdi-chevron-up"
                    }}</v-icon>
                </v-list-item>
                <div v-if="child_menu">
                    <div
                        style="margin-left: 50px"
                        v-for="(j, jdx) in i.hasChildren"
                        :key="jdx"
                    >
                        <v-list-item style="min-height: 0" :to="j.to">
                            <v-list-item-title>{{ j.title }}</v-list-item-title>

                            <v-list-item-icon>
                                <v-icon :to="i.to">{{ j.icon }}</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </div>
                </div>
            </v-list>
            <v-list>
                <v-list-item style="min-height: 0" @click="logout">
                    <v-list-item-icon class="ma-2">
                        <v-icon>{{logout_btn.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> Logout </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <!-- color="#910105 #fd9d00" -->

        <v-app-bar
            color="primary"
            class="no_print"
            dark
            :clipped-left="clipped"
            fixed
            app
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            {{ title }}
            <v-spacer />
            <span v-if="this.$auth.user">
                Welcome, <b>{{ this.$auth.user.name }}</b
                >&nbsp;
                <v-icon small @click="logout"> {{ logout_btn.icon }} </v-icon>
            </span>
        </v-app-bar>
        <v-main>
            <v-container>
                <nuxt />
            </v-container>
        </v-main>

        <v-footer :fixed="fixed" app>
            <span>&copy; {{ year }}</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    mounted() {},
    data() {
        return {
            year: new Date().getFullYear(),
            clipped: false,
            child_menu: false,
            drawer: true,
            fixed: false,

            admins: [
                ["Management", "mdi-account-multiple-outline"],
                ["Settings", "mdi-cog-outline"],
            ],
            cruds: [
                ["Create", "mdi-plus-outline"],
                ["Read", "mdi-file-outline"],
                ["Update", "mdi-update"],
                ["Delete", "mdi-delete"],
            ],

            items: [
                {
                    icon: "mdi-home",
                    title: "Home",
                    to: "/",
                },
                {
                    icon: "mdi-food",
                    title: "Kitchen",
                    to: "/kitchen",
                },
                {
                    icon: "mdi-package-variant",
                    title: "Products",
                    to: "/product",
                    hasChildren: [
                        {
                            icon: "mdi-package-variant-closed",
                            title: "Category",
                            to: "/category",
                        },
                        {
                            icon: "mdi-package-variant-closed",
                            title: "Unit",
                            to: "/product_type",
                        },
                    ],
                },

                {
                    icon: "mdi-credit-card-outline",
                    title: "Payment Mode",
                    to: "/payment_mode",
                },
                {
                    icon: "mdi-credit-card-outline",
                    title: "Delivery Mode",
                    to: "/delivery_mode",
                },
                {
                    icon: "mdi-credit-card-outline",
                    title: "Vouchers",
                    to: "/voucher",
                },
                {
                    icon: "mdi-city",
                    title: "Cities",
                    to: "/cities",
                },
                {
                    icon: "mdi-chart-bubble",
                    title: "User",
                    to: "/users",
                },
                {
                    icon: "mdi-chart-bubble",
                    title: "Role",
                    to: "/role",
                },
                {
                    icon: "mdi-youtube",
                    title: "Promotional Video",
                    to: "/promotional_video",
                },
            ],

            miniVariant: false,
            title: "Food Portal Biryani",
            logout_btn: {
                icon: "mdi-logout",
                label: "Logout",
            },
        };
    },
    methods: {
        async logout() {
            await this.$auth.logout();
        },
    },
};
</script>
<style>
@media print {
    .no_print {
        display: none;
    }
}
/* div[data-app='true'] {
  background: url('file:///C:/Users/felix/Downloads/FINAL%20FOLDER%20OR%20UIZ%20FOR%20MINIMAX/FINAL%20FOLDER%20OR%20UIZ%20FOR%20MINIMAX/Website/FINAL%20HTML%20TEMPLATE%20FOR%20WEBSITE/HTML/assets/img/bgshapes.png') no-repeat center center fixed !important;
  background-size: cover;
} */
</style>
