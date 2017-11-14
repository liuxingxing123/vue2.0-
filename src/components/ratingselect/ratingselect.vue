<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span>
			</span>
			<span  @click="select(0,$event)"   class="block positive" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
			<span  @click="select(1,$event)"   class="block negative" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
		</div>
		<div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看内容的评价</span>
		</div>
	</div>
</template>

<script>
import { eventBus } from '@/components/event-bus';

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

 export default {
 	name:'ratingselect',
 	props:{
 		ratings:{
 			type:Array,
 			default(){
 				return [];
 			}
 		},
 		selectType:{
 			type:Number,
 			default:ALL
 		},
 		onlyContent:{
 			type:Boolean,
 			default:false
 		},
 		desc:{
 			type:Object,
 			default(){
 				return {
 					all:"全部",
 					positive:"满意",
 					negative:'不满意'
 				};
 			}
 		}
 	},
 	computed:{
 		positive(){
 			return this.ratings.filter((rating) => {
 				return rating.rateType === POSITIVE;
 			})
 		},
 		negative(){
 			return this.ratings.filter((rating) => {
 				return rating.rateType === NEGATIVE;
 			})
 		}
 	},
 	methods:{
 		select(type,event){
 			if(!event._constructed){
 				return ;
 			}
 			this.selectType = type;
 			eventBus.$emit("ratingtypeselect",this.selectType);
 		},
 		toggleContent(event){
 			if(!event._constructed){
 				return ;
 			}
 			this.onlyContent = ! this.onlyContent;
 			eventBus.$emit("contenttoggle",this.onlyContent);
 		}
 	}
 }
</script>

<style scoped>
	.ratingselect .rating-type{
		padding: 18px 0;
		margin: 0 18px;
		position: relative;
		font-size: 0;
	}
	.ratingselect .rating-type:after{
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
	.ratingselect .rating-type .block{
		display: inline-block;
		padding: 8px 12px;
		margin-right: 8px;
		font-size: 12px;
		line-height: 16px;
		border-radius: 1px;
		color: rgb(77,85,93);
	}
	.ratingselect .rating-type .block.active{
		color: #fff;
	}
	.ratingselect .rating-type .block .count{
		font-size: 8px;
		margin-left: 2px;
	}
	.ratingselect .rating-type .positive{
		background: rgba(0,160,220,.2);
	}
	.ratingselect .rating-type .positive.active{
		background:rgb(0,160,220);
	}
	.ratingselect .rating-type .negative{
		background: rgba(77,85,93,0.2);
	}
	.ratingselect .rating-type .negative.active{
		background: rgb(77,85,93);
	}
	.ratingselect .switch{
		padding: 12px 18px;
		line-height: 24px;
		border-bottom:1px solid rgba(7,17,27,0.1);
		color: rgb(147,153,159);
		font-size: 0;
	}
	.ratingselect .switch .icon-check_circle{
		margin-right: 4px;
		width: 24px;
		height: 24px;
		vertical-align: top;
		border-radius: 50%;
		display: inline-block;
		background: url(ok_gray.png) no-repeat;
		background-size: 100% 100%;
	}
	.ratingselect .switch.on .icon-check_circle{
		background:#00a0dc;
	}
	.ratingselect .switch .text{
		font-size: 12px;
		display: inline-block;
		vertical-align: top;
	}
</style>