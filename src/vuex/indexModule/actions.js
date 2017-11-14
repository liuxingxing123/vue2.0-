import axios from 'axios';

export let fetchFours = ({commit,state,getters})=>{
        //做异步操作
         axios.get('/api/foursList',{
         	params:{
         		city:'CD'
         	}
         }).then((res)=>{
            //console.log(res)
            commit('FETCGFOURLIST',res.data)
         })
  	 }//类似于mutions，作用是用来做异步操作的，异步操作成功后再提交mutation

  