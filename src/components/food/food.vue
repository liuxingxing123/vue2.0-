<template>
	<transition name="move">
	<div class="food" v-show="showFlag" ref="food">
		<div class="food-content">
			<div class="image-header">
				<img :src="food.image" alt="">
				<div class="back" @click="hide">
					<span class="icon-arrow_lift">&lt;</span>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
				<div class="cartcontrol-wrapper">
					<cartcontrol :food="food"></cartcontrol>
				</div>
				<transition name="fade">
				<div @click.stop.prevent="addfirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
				</transition>
			</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect @ratingtypeselect="change1" @contenttoggle="change2" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" ></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
								<div class="user">
									<span class="username">{{rating.username}}</span>
									<img :src="rating.avatar" class="avatar" width="12" height="12" alt="">
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
									{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
		</div>
	</div>
	</transition>
</template>

<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from '@/components/cartcontrol/cartcontrol';
import split from '@/components/split/split';
import ratingselect from '@/components/ratingselect/ratingselect';
import { eventBus } from '@/components/event-bus';
import {formatDate} from '@/common/js/date';
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
		name:'food',
		props:{
			food:{
				type:Object,
				default(){
					return {};
				}
			}
		},
		components:{
			cartcontrol,
			split,
			ratingselect
		},
		methods:{
			show(){
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = false;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.food,{
							click:true
						})
					}else{
						this.scroll.refresh();
					}
				})
			},
			hide(){
				this.showFlag = false;
			},
			addfirst(event){
				if(!event._constructed){
					return;
				}
				Vue.set(this.food,'count',1);
				eventBus.$emit('add_cart',event.target);
			},
			needShow(type,text){
				if(this.onlyContent && !text){
					return false;
				}
				if(this.selectType === ALL){
					return true;
				}else{
					return type === this.selectType;
				}
			},
			change1(type){
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			},
			change2(onlyContent){
				this.onlyContent = onlyContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			}
		},
		filters:{
			formatDate(time){
				let date = new Date(time);
				return formatDate(date,'yyyy-MM-dd  hh:mm');
			}
		},
		data(){
			return {
				showFlag:false,
				selectType:ALL,
				onlyContent:true,
				desc:{
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				}
			}
		}
	}
</script>

<style scoped>
	.food{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		z-index: 30;
		width:100%;
		background: #fff;
		transform: translate3d(0,0,0);
	}
	.food .image-header{
		position: relative;
		width: 100%;
		height:0;
		padding-top: 100%;
	}
	.food .image-header img{
		position: absolute;
		left: 0;
		top:0;
		width: 100%;
		height:100%;
	}
	.food .image-header .back{
		position: absolute;
		top: 10px;
		left: 0;
	}
	.food .image-header .back .icon-arrow_lift{
		display: block;
		padding: 10px;
		width: 20px;
		height: 20px;
		font-size: 20px;
		border-radius: 50%;
		text-align: center;
		line-height: 20px;
		color: #fff;
		background:rgba(0,0,0,0.5);
	}
	.food .content{
		padding: 18px;
		position: relative;
	}
	.food .content .title{
		line-height: 14px;
		margin-bottom: 8px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(7,17,27);
	}
	.food .content .detail{
		margin-bottom: 18px;
		line-height: 10px;
		font-size: 0;
		height: 10px;
	}
	.food .content .detail .sell-count,.food .content .detail .rating{
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.food .content .detail .sell-count{
		margin-right: 12px;
	}
	.food .content  .price{
		font-weight:700;
		line-height:24px;
	}
	.food .content  .price .now{
		margin-right:18px;
		font-size:14px;
		color:rgb(240,20,20);
	}
	.food .content  .price .old{
		text-decoration:line-through;
		font-size:10px;
		color:rgb(147,153,159);
	}
	.food .cartcontrol-wrapper{
		position: absolute;
		right: 18px;
		bottom: 18px;
	}
	.food .buy{
		position: absolute;
		right: 18px;
		bottom: 18px;
		z-index: 10;
		height:24px;
		line-height: 24px;
		padding: 0 12px;
		box-sizing: border-box;
		font-size: 10px;
		border-radius: 12px;
		color: #fff;
		background: rgb(0,160,220)
	}
	.food .info{
		padding: 18px;
		line-height: 14px;
		margin-bottom: 6px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.food .info .text{
		line-height: 24px;
		padding: 0 8px;
		font-size: 12px;
		color: rgb(77,85,93);
	}
	.food .rating{
		padding-top: 18px;
	}
	.food .rating .title{
		line-height: 14px;
		margin-left: 18px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(7,17,27);
	}
	.food .rating .rating-wrapper{
		padding:0 18px;
	}
	.food .rating .rating-wrapper .rating-item{
		position: relative;
		padding: 16px 0;
	}
	.food .rating .rating-wrapper .no-ratings{
		padding: 16px 0;
		font-size: 12px;
		color: rgb(147,153,159);
	}
	.food .rating .rating-wrapper .rating-item:after{
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
	.food .rating .rating-wrapper .rating-item .user{
		position: absolute;
		right: 0;
		top: 16px;
		font-size: 0;
		line-height: 12px;
	}
	.food .rating .rating-wrapper .rating-item .user .username{
		display: inline-block;
		vertical-align: top;
		font-size: 10px;
		color: rgb(147,153,159);
		margin-right: 6px;
	}
	.food .rating .rating-wrapper .rating-item .user .avatar{
		border-radius: 50%;
	}
	.food .rating .rating-wrapper .rating-item .time{
		line-height: 12px;
		font-size: 10px;
		color: rgb(147,153,159);
		margin-bottom: 6px;

	}
	.food .rating .rating-wrapper .rating-item .text{
		line-height: 16px;
		font-size: 12px;
		color: rgb(7,17,27);
	}
	.food .rating .rating-wrapper .rating-item .text .icon-thumb_up{
		margin-right: 4px;
		width:24px;
		height: 24px;
		display: inline-block;
		background: url('up.png') no-repeat;
		background-size: 100% 100%;
		vertical-align: middle;
	}
	.food .rating .rating-wrapper .rating-item .text .icon-thumb_down{
		margin-right: 4px;
		width:24px;
		height: 24px;
		display: inline-block;
		background: url('down.png') no-repeat;
		background-size: 100% 100%;
		vertical-align: middle;
	}
	.move-enter-active,.move-leave-active{
		transition: all 0.2s linear;
	}
	.move-enter{
		transform: translate3d(-100%,0,0);
	}
	.move-leave-to{
		transform: translate3d(100%,0,0);
	}
	.fade-enter-active,.fade-leave-active{
		transition: all 0.2s linear;
	}
	.fade-enter,.fade-leave-to{
		opacity: 0;
	}
</style>