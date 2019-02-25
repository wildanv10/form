import Vue from 'vue'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/id'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

// add jQuery
import jQuery from 'jquery'
global.jQuery = jQuery

// add bootstrap
require('bootstrap')
import 'bootstrap/dist/css/bootstrap.css'
import 'element-ui/lib/theme-chalk/display.css';

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

new Vue({
  render: h => h(App),
}).$mount('#app')
