/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

import Vue from "vue";
import Vuetify from "vuetify";
import { Ripple } from "vuetify/lib/directives";
import Routes from "@/js/routes.js";
import App from "@/js/views/App";
import { Form, HasError, AlertError } from "vform";
import moment from "moment";
import store from "./store/";
import Gate from "./Gate";
import * as VueGoogleMaps from 'vue2-google-maps'

window.moment = moment;
window.Swal = require("sweetalert2");
window.Fire = new Vue();
// VUE FORM
window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

Vue.use(VueGoogleMaps, {
    load: {
      key: 'YOUR_API_TOKEN',
      libraries: 'places', // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)

      //// If you want to set the version, you can do so:
      // v: '3.26',
    },
    installComponents: true
  })

//Toast
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000
});
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});
window.Toast = Toast;
window.swalWithBootstrapButtons = swalWithBootstrapButtons;

// VUETIFY
Vue.use(Vuetify, {
    // other stuff
    directives: {
        Ripple
    }
});

// Front-end Access Control
Vue.prototype.$gate = new Gate(window.user);

//Moment Filters
Vue.filter("sinceDate", function(created) {
    return moment(created).fromNow();
});
Vue.filter("longDate", function(created) {
    return moment(created).format("MMMM D, YYYY");
});
Vue.filter("shortDate", function(created) {
    return moment(created).format("ll");
});

Vue.filter("initials", function(value) {
    return value.substr(0, 1).toUpperCase();
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component(
    "example-component",
    require("./components/ExampleComponent.vue").default
);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: "#app",
    router: Routes,
    store,
    render: h => h(App),
    vuetify: new Vuetify({
        theme: {
            themes: {
                light: {}
            }
        }
    })
});

export default app;
