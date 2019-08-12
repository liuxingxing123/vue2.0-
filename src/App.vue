<template>
 <div id="app">
		<vheader :seller="seller"></vheader>
		<div class="tab">
			<div class="tab-item">
				<router-link to="/goods">
				商品
				</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/ratings">
				评论
				</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/seller">
				商家
				</router-link>
			</div>
		</div>
		<keep-alive>
			<router-view :seller="seller"></router-view>
		</keep-alive>
	</div>
</template>

<script>
import vheader from '@/components/Header/Header';
import {urlParse} from '@/common/js/util';
const ERR_OK = 0;
export default {
  data(){
    return {
    	seller:{
    		id:(() => {
    			let queryParam = urlParse();
    			return queryParam.id;
    		})()
    	}
    }
  },
  name: 'app',
  components:{
  	vheader
  },
  created(){
	  this.$http.get('/api/seller?id='+this.seller.id).then((response) => {
	  		response = response.body;
	  		if(response.errno == ERR_OK){
	  			this.seller = response.data;
	  		}
	  })
  }
}
</script>

<style scope>
	#app .tab{
		display:flex;
		width:100%;
		height:40px;
		line-height:40px;
		position:relative;
	}
	#app .tab:after{
		content:"";
		display:block;
		position:absolute;
		left:0;
		bottom:0;
		width:100%;
		border-top:1px solid rgba(7,17,27,0.1);
		transform:scaleY(0.5);
		-webkit-transform:scaleY(0.5);
	}
	#app .tab .tab-item{
		flex:1;
		text-align:center;
	}
	#app .tab .tab-item > a{
		display:block;
		font-size:14px;
		color:rgb(77,85,93);
	}
	#app .tab .tab-item > a.active{
		color:rgb(240,20,20);
	}
</style>
一个元素被设为绝对定位或者浮动后，其display计算值就变为了block，尽管其表现形式和inline-block类似——包裹内部元素且不超出包

含块的特性。按照如下方式在控制台尝试可验证：
var span = document.createElement('span');
document.body.appendChild(span);
console.log('1.' + window.getComputedStyle(span).display);
span.style.float = 'left';
console.log('2.' + window.getComputedStyle(span).display);


v-cloak指令只是在标签中加入一个v-cloak自定义属性，在HTML还编译完成之后该属性会被删除。
v-pre可以用来阻止预编译，有v-pre指令的标签内部的内容不会被编译，会原样输出。

只要document.visibilityState属性发生变化，就会触发visibilitychange事件。因此，可以通过监听这个事件（通过

document.addEventListener()方法或document.onvisibilitychange属性），跟踪页面可见性的变化。
由此可见，visibilitychange事件比pagehide、beforeunload、unload事件更可靠，所有情况下都会触发（从visible变为hidden）。因此，

可以只监听这个事件，运行页面卸载时需要运行的代码，不用监听后面那三个事件。

is
可以直接传递一个组件
:is
是查找父组件中的一个赋值，然后找到相应的组件
