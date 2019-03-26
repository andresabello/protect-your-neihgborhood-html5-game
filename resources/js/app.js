import Vue from 'vue'
import ProtectYourHouse from './components/ProtectYourHouseGame.vue'
require('./bootstrap')

window.Vue = Vue

const app = new Vue({
    el: '#app',
    components: {
        "protect-your-house": ProtectYourHouse,
    }
})
