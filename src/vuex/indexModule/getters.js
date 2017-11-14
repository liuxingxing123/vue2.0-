 export default {
 	volovfourS(state){
        return state.fourS.filter((s)=>{
              return !s.volov
        })
 }
}