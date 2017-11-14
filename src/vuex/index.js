import Vue from 'vue';
import Vuex from 'vuex';

import user from './user'

//当模块化使用组价的时候，需要手动调用 Vue.use
Vue.use(Vuex);

const store = new Vuex.Store({ //创建仓库实例
    modules:{
    	user
    }
})

export default store 