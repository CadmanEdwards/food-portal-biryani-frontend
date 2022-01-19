import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b371831a = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _664d700b = () => interopDefault(import('..\\pages\\category.vue' /* webpackChunkName: "pages/category" */))
const _4a09aa16 = () => interopDefault(import('..\\pages\\cities.vue' /* webpackChunkName: "pages/cities" */))
const _50988337 = () => interopDefault(import('..\\pages\\customer\\index.vue' /* webpackChunkName: "pages/customer/index" */))
const _70625c51 = () => interopDefault(import('..\\pages\\delivery_mode.vue' /* webpackChunkName: "pages/delivery_mode" */))
const _3f7673aa = () => interopDefault(import('..\\pages\\forgotPassword.vue' /* webpackChunkName: "pages/forgotPassword" */))
const _474b447b = () => interopDefault(import('..\\pages\\kitchen\\index.vue' /* webpackChunkName: "pages/kitchen/index" */))
const _3290522c = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _3a3e6fd1 = () => interopDefault(import('..\\pages\\order\\index.vue' /* webpackChunkName: "pages/order/index" */))
const _2b1035c9 = () => interopDefault(import('..\\pages\\payment_mode.vue' /* webpackChunkName: "pages/payment_mode" */))
const _a0f2bb60 = () => interopDefault(import('..\\pages\\product\\index.vue' /* webpackChunkName: "pages/product/index" */))
const _0176f9d2 = () => interopDefault(import('..\\pages\\product_type.vue' /* webpackChunkName: "pages/product_type" */))
const _714d22cd = () => interopDefault(import('..\\pages\\promotional_video.vue' /* webpackChunkName: "pages/promotional_video" */))
const _31c8f1a0 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _85cc4a3e = () => interopDefault(import('..\\pages\\report\\index.vue' /* webpackChunkName: "pages/report/index" */))
const _52f10795 = () => interopDefault(import('..\\pages\\resetPassword\\index.vue' /* webpackChunkName: "pages/resetPassword/index" */))
const _1e45ba03 = () => interopDefault(import('..\\pages\\role.vue' /* webpackChunkName: "pages/role" */))
const _1991edc6 = () => interopDefault(import('..\\pages\\roles_permissions\\index.vue' /* webpackChunkName: "pages/roles_permissions/index" */))
const _cde57b82 = () => interopDefault(import('..\\pages\\status.vue' /* webpackChunkName: "pages/status" */))
const _1e4772d8 = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages/user" */))
const _a35aed6a = () => interopDefault(import('..\\pages\\users.vue' /* webpackChunkName: "pages/users" */))
const _6d474831 = () => interopDefault(import('..\\pages\\voucher.vue' /* webpackChunkName: "pages/voucher" */))
const _4a54daab = () => interopDefault(import('..\\pages\\blog\\create.vue' /* webpackChunkName: "pages/blog/create" */))
const _2ba7a332 = () => interopDefault(import('..\\pages\\customer\\create.vue' /* webpackChunkName: "pages/customer/create" */))
const _6c5cd4ba = () => interopDefault(import('..\\pages\\kitchen\\create.vue' /* webpackChunkName: "pages/kitchen/create" */))
const _6901f26e = () => interopDefault(import('..\\pages\\product\\create.vue' /* webpackChunkName: "pages/product/create" */))
const _04bb4204 = () => interopDefault(import('..\\pages\\report\\calendars.vue' /* webpackChunkName: "pages/report/calendars" */))
const _7bfdf7ca = () => interopDefault(import('..\\pages\\report\\cities.vue' /* webpackChunkName: "pages/report/cities" */))
const _0ff2a164 = () => interopDefault(import('..\\pages\\report\\customers.vue' /* webpackChunkName: "pages/report/customers" */))
const _18aff91a = () => interopDefault(import('..\\pages\\report\\drivers.vue' /* webpackChunkName: "pages/report/drivers" */))
const _2b4b1d34 = () => interopDefault(import('..\\pages\\report\\orders.vue' /* webpackChunkName: "pages/report/orders" */))
const _10819225 = () => interopDefault(import('..\\pages\\report\\products.vue' /* webpackChunkName: "pages/report/products" */))
const _317648d5 = () => interopDefault(import('..\\pages\\report\\repairs.vue' /* webpackChunkName: "pages/report/repairs" */))
const _2f7b63ca = () => interopDefault(import('..\\pages\\report\\sales.vue' /* webpackChunkName: "pages/report/sales" */))
const _a097f3fa = () => interopDefault(import('..\\pages\\report\\states.vue' /* webpackChunkName: "pages/report/states" */))
const _2fa6b73e = () => interopDefault(import('..\\pages\\report\\statusses.vue' /* webpackChunkName: "pages/report/statusses" */))
const _67d7cf0c = () => interopDefault(import('..\\pages\\report\\stock_adjustments.vue' /* webpackChunkName: "pages/report/stock_adjustments" */))
const _3610c2c4 = () => interopDefault(import('..\\pages\\report\\stocks.vue' /* webpackChunkName: "pages/report/stocks" */))
const _de10fa72 = () => interopDefault(import('..\\pages\\resetPassword\\_token.vue' /* webpackChunkName: "pages/resetPassword/_token" */))
const _4f82a276 = () => interopDefault(import('..\\pages\\roles_permissions\\_id.vue' /* webpackChunkName: "pages/roles_permissions/_id" */))
const _68e8af15 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blog",
    component: _b371831a,
    name: "blog"
  }, {
    path: "/category",
    component: _664d700b,
    name: "category"
  }, {
    path: "/cities",
    component: _4a09aa16,
    name: "cities"
  }, {
    path: "/customer",
    component: _50988337,
    name: "customer"
  }, {
    path: "/delivery_mode",
    component: _70625c51,
    name: "delivery_mode"
  }, {
    path: "/forgotPassword",
    component: _3f7673aa,
    name: "forgotPassword"
  }, {
    path: "/kitchen",
    component: _474b447b,
    name: "kitchen"
  }, {
    path: "/login",
    component: _3290522c,
    name: "login"
  }, {
    path: "/order",
    component: _3a3e6fd1,
    name: "order"
  }, {
    path: "/payment_mode",
    component: _2b1035c9,
    name: "payment_mode"
  }, {
    path: "/product",
    component: _a0f2bb60,
    name: "product"
  }, {
    path: "/product_type",
    component: _0176f9d2,
    name: "product_type"
  }, {
    path: "/promotional_video",
    component: _714d22cd,
    name: "promotional_video"
  }, {
    path: "/register",
    component: _31c8f1a0,
    name: "register"
  }, {
    path: "/report",
    component: _85cc4a3e,
    name: "report"
  }, {
    path: "/resetPassword",
    component: _52f10795,
    name: "resetPassword"
  }, {
    path: "/role",
    component: _1e45ba03,
    name: "role"
  }, {
    path: "/roles_permissions",
    component: _1991edc6,
    name: "roles_permissions"
  }, {
    path: "/status",
    component: _cde57b82,
    name: "status"
  }, {
    path: "/user",
    component: _1e4772d8,
    name: "user"
  }, {
    path: "/users",
    component: _a35aed6a,
    name: "users"
  }, {
    path: "/voucher",
    component: _6d474831,
    name: "voucher"
  }, {
    path: "/blog/create",
    component: _4a54daab,
    name: "blog-create"
  }, {
    path: "/customer/create",
    component: _2ba7a332,
    name: "customer-create"
  }, {
    path: "/kitchen/create",
    component: _6c5cd4ba,
    name: "kitchen-create"
  }, {
    path: "/product/create",
    component: _6901f26e,
    name: "product-create"
  }, {
    path: "/report/calendars",
    component: _04bb4204,
    name: "report-calendars"
  }, {
    path: "/report/cities",
    component: _7bfdf7ca,
    name: "report-cities"
  }, {
    path: "/report/customers",
    component: _0ff2a164,
    name: "report-customers"
  }, {
    path: "/report/drivers",
    component: _18aff91a,
    name: "report-drivers"
  }, {
    path: "/report/orders",
    component: _2b4b1d34,
    name: "report-orders"
  }, {
    path: "/report/products",
    component: _10819225,
    name: "report-products"
  }, {
    path: "/report/repairs",
    component: _317648d5,
    name: "report-repairs"
  }, {
    path: "/report/sales",
    component: _2f7b63ca,
    name: "report-sales"
  }, {
    path: "/report/states",
    component: _a097f3fa,
    name: "report-states"
  }, {
    path: "/report/statusses",
    component: _2fa6b73e,
    name: "report-statusses"
  }, {
    path: "/report/stock_adjustments",
    component: _67d7cf0c,
    name: "report-stock_adjustments"
  }, {
    path: "/report/stocks",
    component: _3610c2c4,
    name: "report-stocks"
  }, {
    path: "/resetPassword/:token",
    component: _de10fa72,
    name: "resetPassword-token"
  }, {
    path: "/roles_permissions/:id",
    component: _4f82a276,
    name: "roles_permissions-id"
  }, {
    path: "/",
    component: _68e8af15,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
