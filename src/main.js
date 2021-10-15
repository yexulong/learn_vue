import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from "axios";
import Mock from "./mock"
// axios.defaults.baseURL = '';
axios.interceptors.request.use(config => {
    return config
});
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
    router,
    Mock: Mock,
    render: h => h(App)
}).$mount('#app')
