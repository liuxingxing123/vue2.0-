import getters from "./getters"
import * as actions from './actions'
import mutations from './mutations'

var state = { //状态，仓库中存放数据的地方
    count: 1,
    fourS:[],
    massage:"你变我啊！"
  }

export default {
	state,
	getters,
	mutations,
	actions
}

