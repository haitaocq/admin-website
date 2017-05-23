import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './paths.js'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    } else {
        next();
    }
})

router.afterEach(function(to) {
	//路由结束后操作
})

export default router;