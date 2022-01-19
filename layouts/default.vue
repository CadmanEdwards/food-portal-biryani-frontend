<template>
  <v-app dark style="background:url(file:///C:/Users/felix/Downloads/FINAL%20FOLDER%20OR%20UIZ%20FOR%20MINIMAX/FINAL%20FOLDER%20OR%20UIZ%20FOR%20MINIMAX/Website/FINAL%20HTML%20TEMPLATE%20FOR%20WEBSITE/HTML/assets/img/bgshapes.png);">
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
       <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
           <v-list-item-content>
            <v-list-item-title class="white--text"  v-text="item.title"/>
          </v-list-item-content>
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
      <v-app-bar-nav-icon  @click.stop="drawer = !drawer" />
      {{title}}
      <v-spacer />
      <span v-if="this.$auth.user" >
      Welcome, <b>{{this.$auth.user.name}}</b>&nbsp;
      <v-icon small @click="logout"> {{ logout_btn.icon }} </v-icon>
     
     </span>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
   
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{year}}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  mounted () {
    
  },
  data () {
    return {
      year: new Date().getFullYear(),
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
		{
		icon: 'mdi-package-variant',
		title: 'Kitchen',
		to: '/kitchen'
		},
		{
		icon: 'mdi-package-variant',
		title: 'Products',
		to: '/product'
		},
		{
			icon: 'mdi-package-variant-closed',
			title: 'Products Type',
			to: '/product_type'
		},
		{
			icon: 'mdi-package-variant-closed',
			title: 'Products Category',
			to: '/category'
		},
		{
			icon: 'mdi-credit-card-outline',
			title: 'Payment Mode',
			to: '/payment_mode'
		},
		{
			icon: 'mdi-credit-card-outline',
			title: 'Delivery Mode',
			to: '/delivery_mode'
		},
		{
			icon: 'mdi-credit-card-outline',
			title: 'Vouchers',
			to: '/voucher'
		},
		{
			icon: 'mdi-city',
			title: 'Cities',
			to: '/cities'
		},
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'User',
        //   to: '/user'
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Customer',
        //   to: '/customer'
        // },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Orders',
        //   to: '/order'
        // },
		{
          icon: 'mdi-youtube',
          title: 'Promotional Video',
          to: '/promotional_video'
        },
       
       
        // {
        // icon: 'mdi-chart-bubble',
        // title: 'Reports',
        // to: '/report'
        // },

          // {
          //   icon: 'mdi-chart-bubble',
          //   title: 'Role',
          //   to: '/role'
          // },
        //  {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Status',
        //   to: '/status'
        // },
             
        //  {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Category',
        //   to: '/category'
        // },
     
  
       
      ],
      
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Food Portal Biryani',
      logout_btn:{
        icon:'mdi-logout',
        label:'Logout'
      }
    }
  },
  methods:{
  async logout() {
    await this.$auth.logout();
  },
  }
}
</script>
<style>
@media print{
    .no_print{
        display: none;
        }
}
/* div[data-app='true'] {
  background: url('file:///C:/Users/felix/Downloads/FINAL%20FOLDER%20OR%20UIZ%20FOR%20MINIMAX/FINAL%20FOLDER%20OR%20UIZ%20FOR%20MINIMAX/Website/FINAL%20HTML%20TEMPLATE%20FOR%20WEBSITE/HTML/assets/img/bgshapes.png') no-repeat center center fixed !important;
  background-size: cover;
} */
</style>
