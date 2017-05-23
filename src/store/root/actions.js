import * as types from '../types'
import Api from '@/api'
//actions
export default {
	async login({commit}, data={}){
		return Api.login(data.userNo, data.password).then(function(res){
			commit(types.LOGIN,res);
		})
	},
	async logout({commit}){
		commit(types.LOGIN);
	}
}