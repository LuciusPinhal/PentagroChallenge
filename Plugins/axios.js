import Vue from 'vue'
import axios from 'axios' 

axios.defaults.baseURL="http://186.237.58.167:65129/api/user/getusers"
axios.defaults.headers.common['Authorization'] = `bearer ${localStorage.getItem('token')}`

Vue.use ({
    install(Vue){
        Vue.prototype.$http = axios
    }
})