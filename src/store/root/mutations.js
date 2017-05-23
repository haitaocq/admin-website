import * as types from '../types'

export default {
	//登录登出
	[types.LOGIN]: (state, data) => {
		console.log(state);
        state.user = data;
        state.token = data.token;
        sessionStorage.token = data.token;
    },
    [types.LOGOUT]: (state) => {
        sessionStorage.removeItem('token');
        state.user = null;
        state.token = null;
    }
}