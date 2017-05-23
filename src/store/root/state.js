//根state
const state = {
  user: {},
  token: null
}
if(sessionStorage.token){
	state.token = sessionStorage.token;
}

export default state