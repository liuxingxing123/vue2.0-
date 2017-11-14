<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="descreaseCart"></div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add" @click.stop.prevent="addCart"></div>
		
	</div>
</template>

<script>
import Vue from 'vue';
import { eventBus } from '@/components/event-bus';
export default {
	name:'cartcontrol',
	props:{
		food:{
			type:Object
		}
	},
	methods:{
		addCart(event){
			if(!event._constructed){
				return;
			}
			if(!this.food.count){
				Vue.set(this.food,'count',1);
			}else{
				this.food.count++;
			}
			eventBus.$emit('add_cart',event.target);
		},
		descreaseCart(event){
			if(!event._constructed){
				return;
			}
			if(this.food.count){
				this.food.count--;
			}
		}
	}
};
</script>

<style scoped>
	.cartcontrol{
		font-size:0;
	}
	.cartcontrol .cart-decrease{
		display: inline-block;
		padding:6px;
		width: 24px;
		height:24px;
		line-height: 24px;
		background: url(remove_circle.png) no-repeat;
		background-size: 100% 100%;
		border-radius: 50%;
		box-sizing: border-box;
	}
	.cartcontrol .cart-count{
		display: inline-block;
		vertical-align: top;
		width: 24px;
		line-height: 24px;
		text-align: center;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.cartcontrol .cart-add{
		display: inline-block;
		padding:6px;
		width: 24px;
		height:24px;
		line-height: 24px;
		background: url(add_circle.png) no-repeat;
		background-size: 100% 100%;
		border-radius: 50%;
		box-sizing: border-box;
	}
	.move-enter-active,.move-leave-active{
		transition: all  0.5s;
	}
	.move-enter,.move-leave-to{
		opacity: 0;
		transform: translate3d(0,0,0);
	}
	.move-enter-to,.move-leave{
		opacity: 1;
		transform: translate3d(24px,0,0);
	}
	
</style>