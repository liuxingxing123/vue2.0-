
import {ADDCOUNT,FETCGFOURLIST,CHANGEMSG } from './mutation-types'

export default { //这里是改变状态的唯一地方,必须是一个同步函数，我们要使用工具观察状态的改变
     [ADDCOUNT](state,num){//第一个参数 也是当前的 state
         state.count+=num
     },
     [FETCGFOURLIST](state,data){
         state.fourS = [...state.fourS,...data.list];
     },
     [CHANGEMSG](state,val){
         state.massage = val
     }
  }