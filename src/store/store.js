import * as types from './types'
//根模块
import rootStore from './root'
//modules
import frame from './frame'
import other from './other'

const modules = {
	frame,
	other,
}

export default {
	...rootStore,
	modules
}
