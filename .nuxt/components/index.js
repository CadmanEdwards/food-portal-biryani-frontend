export { default as NuxtLogo } from '../..\\components\\NuxtLogo.vue'
export { default as Role } from '../..\\components\\Role.vue'
export { default as Tutorial } from '../..\\components\\Tutorial.vue'
export { default as User } from '../..\\components\\User.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'
export { default as Order } from '../..\\components\\Order\\Order.vue'
export { default as OrderRecentOrder } from '../..\\components\\Order\\Recent_Order.vue'
export { default as ReportsCalenders } from '../..\\components\\reports\\calenders.vue'
export { default as ReportsCities } from '../..\\components\\reports\\cities.vue'
export { default as ReportsCustomers } from '../..\\components\\reports\\customers.vue'
export { default as ReportsDrivers } from '../..\\components\\reports\\drivers.vue'
export { default as ReportsOrders } from '../..\\components\\reports\\orders.vue'
export { default as ReportsProducts } from '../..\\components\\reports\\products.vue'
export { default as ReportsRepairs } from '../..\\components\\reports\\repairs.vue'
export { default as ReportsSales } from '../..\\components\\reports\\sales.vue'
export { default as ReportsStates } from '../..\\components\\reports\\states.vue'
export { default as ReportsStatus } from '../..\\components\\reports\\status.vue'
export { default as ReportsStocks } from '../..\\components\\reports\\stocks.vue'
export { default as ReportsStockAdjustments } from '../..\\components\\reports\\stock_adjustments.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
