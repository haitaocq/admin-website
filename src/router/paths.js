//iframe path
const Login = r => require.ensure([], () => r(require('../views/frame/login.vue')), 'group-iframe')
const Home = r => require.ensure([], () => r(require('../views/frame/home.vue')), 'group-iframe')

//other path 
const NotFund = r => require.ensure([], () => r(require('../views/other/404.vue')), 'group-other')



//route
export default [
	{
		path: '/',
		redirect: { path: '/home' }
	},{
		path: '/login',
		name: 'login',
		component: Login
	},{
		path: '/home',
		name: 'home',
		component: Home,
		meta: { 
			requireAuth: true
		}
	},{
        path: '/404',
        name: 'notFund',
        component: NotFund
    },{
	    path: "*",
	    redirect: { path: '/404' }
	}
]
