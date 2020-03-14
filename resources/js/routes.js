import Vue from 'vue';
import VueRouter from 'vue-router';


// Component Routers
Vue.use(VueRouter)
let routes = [
    { path: '/', component: require('./components/Index.vue').default },
    { path: '/government', component: require('./components/Government.vue').default },
    { path: '/news', component: require('./components/News.vue').default },
    { path: '/events', component: require('./components/Events.vue').default },
    { path: '/baranggay', component: require('./components/Baranggay.vue').default },
    { path: '/forum', component: require('./components/Forum.vue').default },
    { path: '*', component: require('./components/NotFound.vue').default },

    // Admin Routes
    { path: '/management', component: require('./components/Admin/Management.vue').default },
    { path: '/admin_government', component: require('./components/Admin/Government.vue').default },
    { path: '/admin_announcement', component: require('./components/Admin/Announcement.vue').default },
]
const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  try {
    return originalPush.call(this, location).catch(err => err)
  } catch (error) {
    console.log(error)
  }
}

export default router;
