import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users';
import forum from './modules/forum';
import city from './modules/city';
import activity from './modules/activity';
import baranggay from './modules/baranggay';

//Load Vuex
Vue.use(Vuex);

//Create the Store
export default new Vuex.Store({
    modules: {
        users,
        forum,
        //City JS
        city,
        activity,
        baranggay,
    }
});
