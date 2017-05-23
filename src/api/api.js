import http from '../utils/http.js'

//登录
export function login(userNo, password){
	const users = require('../data/user.js').default;
	return new Promise((resolve, reject) => {
        const user = users[userNo];
        setTimeout(() => {
        	if(user && password == user.password){
        		user.token = new Date().getTime();
        		resolve(user);
        	} else {
        		reject('用户名或密码错误');
        	}
        },200)
    })
}