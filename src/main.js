import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from "axios";
import Mock from "./mock"
import TreeTable from "vue-table-with-tree-grid"
// axios.defaults.baseURL = '';
axios.interceptors.request.use(config => {
    return config
});
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.component('tree-table', TreeTable);

new Vue({
    router,
    Mock: Mock,
    render: h => h(App)
}).$mount('#app')
