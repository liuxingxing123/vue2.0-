<template>
	<div class="ratings" ref="ratings">
		<div class="rating-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<Star class="star" :size="36" :score="seller.serviceScore"></Star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<Star class="star" :size="36" :score="seller.foodScore"></Star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class='delivery-wrapper'>
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect @ratingtypeselect="change1" @contenttoggle="change2"   :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings" ></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar" alt="">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<Star :size="24" :score="rating.score"></Star>
								<span class="delivery" v-show="rating.deliveryTime">
								{{rating.deliveryTime}}	
								</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend.length">
								<span class="icon-thumb_up"></span>
								<span v-for="item in rating.recommend" class="item">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import Star from '@/components/Star/Star';
import split from '@/components/split/split';
import ratingselect from '@/components/ratingselect/ratingselect';
import {formatDate} from '@/common/js/date';
import BScroll from 'better-scroll';

const ALL = 2;
const ERR_OK = 0;

export default {
	name:"Ratings",
	props:{
		seller:{
			type:Object
		}
	},
	components:{
		Star,
		split,
		ratingselect
	},
	data(){
		return {
			selectType:ALL,
			onlyContent:true,
			ratings:[],
			desc:{
				all:"全部",
 				positive:"满意",
 				negative:'不满意'
				}
			};
	},
	filters:{
			formatDate(time){
				let date = new Date(time);
				return formatDate(date,'yyyy-MM-dd  hh:mm');
			}
	},
	created(){
		this.$http.get('/api/ratings').then((response) => {
			response = response.body;
			if(response.errno === ERR_OK){
				this.ratings = response.data;
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.ratings,{
					click:true
					});
				})
				
			}
		})
	},
	methods:{
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
	}
}
</script>
<style scoped>
	.ratings{
		position: absolute;
		top: 174px;
		left: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	.ratings .overview{
		display: flex;
		padding: 18px 0;
	}
	.ratings .overview .overview-left{
		flex: 0 0 137px;
		width: 137px;
		border-right: 1px solid rgba(7,17,27,0.3);
		text-align: center;
		padding: 6px 0;
	}
	@media only screen and (max-width:320px){
		.ratings .overview .overview-left{
			flex: 0 0 120px;
			width: 120px;
		}
	}
	.ratings .overview .overview-left .score{
		line-height: 28px;
		font-size: 24px;
		color: rgb(255,153,0);
		margin-bottom: 6px;
	}
	.ratings .overview .overview-left .title{
		line-height: 12px;
		font-size: 12px;
		color: rgb(7,17,27);
		margin-bottom: 8px;
	}
	.ratings .overview .overview-left .rank{
		line-height: 10px;
		color:rgb(147,153,159);
		font-size: 10px;
	}
	.ratings .overview .overview-right{
		flex: 1;
		padding:6px 0 6px 24px;
	}
	@media only screen and (max-width:320px){
		.ratings .overview .overview-right{
			padding-left:3px;
		}
	}
	.ratings .overview .overview-right .score-wrapper{
		margin-bottom: 8px;
		font-size: 0;
	}
	.ratings .overview .overview-right .score-wrapper .title{
		font-size: 12px;
		color: rgb(7,17,27);
		display: inline-block;
		line-height: 18px;
		vertical-align: top;
	}
	.ratings .overview .overview-right .score-wrapper .star{
		display: inline-block;
		margin: 0 12px;	
		vertical-align: top;

	}
	.ratings .overview .overview-right .score-wrapper .score{
		display: inline-block;
		vertical-align: top;
		line-height: 18px;
		font-size: 12px;
		color: rgb(255,153,0);
	}
	.ratings .overview .overview-right .delivery-wrapper{
		font-size: 0;
	}
	.ratings .overview .overview-right .delivery-wrapper .title{
		font-size: 12px;
		color: rgb(7,17,27);
		line-height: 18px;
	}
	.ratings .overview .overview-right .delivery-wrapper  .delivery{
		font-size: 12px;
		color: rgb(147,153,159);
		margin-left: 12px;
	}
	.ratings .rating-wrapper{
		padding: 0 18px;

	}
	.ratings .rating-wrapper .rating-item{
		display: flex;
		padding: 18px;
		position: relative;
	}
	.ratings .rating-wrapper .rating-item:after{
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
	.ratings .rating-wrapper .rating-item .avatar{
		flex: 0 0 28px;
		margin-right: 12px;
		width: 28px;
	}
	.ratings .rating-wrapper .rating-item .avatar img{
		border-radius: 50%;
	}
	.ratings .rating-wrapper .rating-item .content{
		position: relative;
		flex: 1;
	}
	.ratings .rating-wrapper .rating-item .content .name{
		line-height: 12px;
		color: rgb(7,17,27);
		font-size: 10px;
		margin-bottom: 4px;
	}
	.ratings .rating-wrapper .rating-item .content .star-wrapper{
		margin-bottom: 6px;
		font-size: 0;
	}
	.ratings .rating-wrapper .rating-item .content .star-wrapper .star{
		margin-right: 6px;
		display: inline-block;
		vertical-align: top;
	}
	.ratings .rating-wrapper .rating-item .content .star-wrapper .delivery{
		display: inline-block;
		vertical-align: top;
		color: rgb(147,153,159);
	}
	.ratings .rating-wrapper .rating-item .content .text{
		line-height: 18px;
		color: rgb(7,17,27);
		font-size:12px;
		margin-bottom: 8px;
	}
	.ratings .rating-wrapper .rating-item .content  .recommend{
		line-height: 16px;
		font-size: 0;
	}
	.ratings .rating-wrapper .rating-item .content  .icon-thumb_up{
		display:inline-block;
		width: 9px;
		height: 9px;
		background: url(up.png) no-repeat;
		background-size: 100%;
		margin:0 8px 4px 0;
	}
	.ratings .rating-wrapper .rating-item .content .item{
		display:inline-block;
		margin:0 8px 4px 0;
		font-size: 9px;
		padding: 0 6px;
		border: 1px solid rgba(7,17,27,0.1);
		border-radius: 1px;
		color:rgb(147,153,159);
		background: #fff;
	}
	.ratings .rating-wrapper .rating-item .time{
		position: absolute;
		top: 0;
		right: 0;
		line-height: 12px;
		font-size: 10px;
		color:rgb(147,153,159);
	}
</style>
