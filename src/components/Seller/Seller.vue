<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<Star class="star" :size="36" :score="seller.score"></Star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<span class="icon-favorite" :class="{'active':favorite}"></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="support-item" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picwrapper">
					<ul ref="piclist" class="pic-list">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" alt="" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import Star from '@/components/Star/Star';
import split from '@/components/split/split';
import BScroll from 'better-scroll';
import {svaeToLocal,loadFromLocal} from '@/common/js/store';
export default {
	name:"Seller",
	props:{
		seller:{
			type:Object,
			default(){
				return {};
			}
		}
	},
	data(){
		return {
			favorite:(() => {
				return loadFromLocal(this.seller.id,'favorite',false)
			})()
		};
	},
	computed:{
		favoriteText(){
			return this.favorite?'已收藏':'收藏';
		}
	},
	components:{
		Star,
		split
	},
	created(){
		this.classMap = ['decrease','discount','special','invoice','guarantee'];
	},
	watch:{
		seller(){
			this._initScroll();
			this._initPics();
		}
	},
	mounted(){
		this._initScroll();
		this._initPics();
	},
	methods:{
		_initScroll(){
			if(!this.scroll){
				this.scroll = new BScroll(this.$refs.seller,{
					click:true
				})
			}else{
				this.scroll.refresh();
			}
		},
		_initPics(){
			if(this.seller.pics){
				let picWidth = 120;
				let margin = 6;
				let _width = (picWidth+margin)*(this.seller.pics.length)-margin;
				this.$refs.piclist.style.width = _width+"px";
				this.$nextTick(() => {
					if(!this.picScroll){
						this.picScroll = new BScroll(this.$refs.picwrapper,{
							scrollX:true,
							eventPassthrough:'vertical'
						})
					}else{
						this.picScroll.refresh();
					}
				})
			}
		},
		toggleFavorite(event){
			if(!event._constructed){
				return ;
			}
			this.favorite = !this.favorite;
			svaeToLocal(this.seller.id,'favorite',this.favorite)
		}
	}
}
</script>
<style scoped>
	.seller{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	.seller .overview{
		padding: 18px;
		position: relative;
	}
	.seller .overview .title{
		margin-bottom: 8px;
		color: rgb(7,17,27);
		line-height: 14px;
		font-size: 10px;
	}
	.seller .overview .desc{
		padding-bottom: 18px;
		font-size: 0;
		position: relative;
	}
	.seller .overview .desc:after{
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
	.seller .overview .desc .star{
		display: inline-block;
		margin-right: 8px;
		vertical-align: top;
	}
	.seller .overview .desc .text{
		margin-right: 12px;
		display: inline-block;
		font-size: 10px;
		line-height: 18px;
		color: rgb(77,85,93);
	}
	.seller .overview .remark{
		display: flex;
		padding-top:18px;
	}
	.seller .overview .remark .block{
		flex:1;
		text-align: center;
		border-right:1px  solid rgb(77,85,93);
	}
	.seller .overview .remark .block:last-child{
		border: none;
	}
	.seller .overview .remark .block h2{
		margin-bottom: 4px;
		line-height: 10px;
		font-size: 10px;
		color: rgb(147,153,159)
	}
	.seller .overview .remark .block .content{
		line-height: 24px;
		font-size: 10px;
		color: rgb(7,17,27);
	}
	.seller .overview .remark .block .content .stress{
		font-size: 24px;
	}
	.seller .overview .favorite{
		position: absolute;
		width: 50px;
		right: 11px;
		top: 18px;
		text-align: center;
	}
	.seller .overview .favorite .icon-favorite{
		display: block;
		margin: 0 auto;
		width: 24px;
		height:24px;
		background:url(nofavorite.png) no-repeat;
		background-size: 100% 100%;
		margin-bottom: 4px;
	}
	.seller .overview .favorite .icon-favorite.active{
		background:url(favorite.png) no-repeat;
		background-size: 100% 100%;
	}
	.seller .overview .favorite .text{
		line-height: 10px;
		font-size: 10px;
		color: rgb(77,85,93);
	}
	.seller .bulletin{
		padding: 18px 0 18px 18px;
	}
	.seller .bulletin .title{
		margin-bottom: 8px;
		color: rgb(7,17,27);
		line-height: 14px;
		font-size: 10px;
	}
	.seller .bulletin .content-wrapper{
		padding: 0 12px 16px 12px;
		position: relative;
		line-height: 24px;
		font-size: 12px;
		color: rgb(240,20,20);
		margin-right: 12px;
	}
	.seller .bulletin .content-wrapper:after{
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
	.seller .bulletin .supports{
		padding-right: 12px;
	}
	.seller .bulletin .supports .support-item{
		padding: 16px 12px;
		position: relative;
	}
	.seller .bulletin .supports .support-item:after{
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
	.seller .bulletin .supports .support-item:last-child{
		margin-bottom:0;
		border: none;
	}
	.seller .bulletin .supports .support-item .decrease{
		background:url(decrease_2@2x.png);
	}
	.seller .bulletin .supports .support-item .discount{
		background:url(discount_2@2x.png);
	}
	.seller .bulletin .supports .support-item .guarantee{
		background:url(guarantee_2@2x.png);
	}
	.seller .bulletin .supports .support-item .invoice{
		background:url(invoice_2@2x.png);
	}
	.seller .bulletin .supports .support-item .special{
		background:url(special_2@2x.png);
	}
	.seller .bulletin .supports .support-item .icon{
		display:inline-block;
		width:16px;
		height:16px;
		vertical-align:top;
		margin-right:6px;
		margin-top: 2px;
		background-size:16px 16px;
		background-repeat:no-repeat;
	}
	.seller .bulletin .supports .support-item .text{
		line-height:16px;
		font-size:12px;
		color: rgb(7,17,27);
	}
	.seller .pics{
		padding: 18px;
	}
	.seller .pics .title{
		margin-bottom: 12px;
		color: rgb(7,17,27);
		line-height: 14px;
		font-size: 10px;
	}
	.seller .pics .pic-wrapper{
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	.seller .pics .pic-wrapper .pic-list{
		font-size: 0;

	}
	.seller .pics .pic-wrapper .pic-list .pic-item{
		display: inline-block;
		margin-right: 6px;
		width: 120px;
		height: 90px;
	}
	.seller .pics .pic-wrapper .pic-list .pic-item:last-child{
		margin: 0;
	}
	.seller .info{
		padding: 18px 18px 0 18px;
		color: rgb(7,17,27);
	}
	.seller .info .title{
		position: relative;
		padding-bottom: 12px;
		line-height: 14px;
		font-size: 14px;
	}
	.seller .info .title:after{
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
	.seller .info .info-item{
		padding: 16px 12px;
		font-size: 12px;
		position: relative;
	}
	.seller .info .info-item:after{
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
	.seller .info .info-item:last-child{
		border:none!important;
	}
</style>