<template>
		<div class="header">
			<div class="content-wrapper">
				<div class='avatar'>
					<img :src="seller.avatar" width="64" height="64" />
				</div>
				<div class="content">
					<div class="title">
						<span class="brand"></span>
						<span class="name">{{seller.name}}</span>
					</div>
					<div class="description">
						{{seller.description}}/{{seller.deliveryTime}}分钟送达
					</div>
					<div v-if="seller.supports" class="support">
						<span class="icon"></span>
						<span class="text">{{seller.supports[0].description}}</span>
					</div>
					
				</div>
				<div v-if="seller.supports" class="support-count" @click="showDetail">
						<span class="count">{{seller.supports.length}}个&nbsp;></span>
					</div>
			</div>
			<div class="bulletin-wrapper"  @click="showDetail">
					<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
					<span class="bulletin-arrow">></span>
			</div>
			<div class="background">
				<img :src="seller.avatar" width="100%" height="100%" />
			</div>
			<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<Star :size="48" :score="seller.score"></Star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="(item,index) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
						    <p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="hideDetail">x</div>
			</div>
			</transition>
		</div>
</template>
<script>
import Star from '@/components/Star/Star';
export default {
	name:"vheader",
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return {
			detailShow:false
		}
	},
	components:{
		Star
	},
	created(){
		this.classMap = ['decrease','discount','special','invoice','guarantee'];
	},
	methods:{
		showDetail(){
			this.detailShow = true;
		},
		hideDetail(){
			this.detailShow = false;
		}
	}
}
</script>
<style scoped>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to{
	  opacity: 0;
	}
	.header{
		color:#fff;
		position:relative;
		overflow:hidden;
		background:rgba(7,17,27,0.5);
	}
	.header .content-wrapper{
		padding:24px 12px 18px 24px;
		font-size:0;
		position:relative;
	}
	.header .content-wrapper .avatar{
		display:inline-block;
		vertical-align:top;
	}
	 .header .content-wrapper .avatar img{
	 	border-radius:2px;
	 }
	.header .content-wrapper .content{
		display:inline-block;
		margin-left:16px;
		font-size:14px;
	}
	.header .content-wrapper .content .title{
		margin:2px 0 8px 0;
		font-size:0;
	}
	.header .content-wrapper .content .title .brand{
		display:inline-block;
		vertical-align:top;
		width:30px;
		height:18px;
		background:url(brand@2x.png) no-repeat;
		background-size:100% 100%;
	}
	.header .content-wrapper .content .title .name{
		margin-left:6px;
		font-size:16px;
		box-sizing:border-box;
		line-height:15px;
		font-weight:bold;
	}
	.header .content-wrapper .content .description{
		margin-bottom:10px;
		line-height:12px;
		font-size:12px;
	}
	.header .content-wrapper .content .support .icon{
		display:inline-block;
		vertical-align:top;
		width:12px;
		height:12px;
		margin-right:4px;
		background:url(decrease_1@2x.png) no-repeat;
		background-size:100% 100%;
	}
	.header .content-wrapper .content .support .text{
		font-size:10px;
		vertical-align:top;
		line-height:12px;
	}
	.header .content-wrapper .support-count{
		position:absolute;
		right:12px;
		bottom:18px;
		padding:0 8px;
		height:24px;
		line-height:24px;
		border-radius:14px;
		background:rgba(0,0,0,0.2);
		text-align:center;
	}
	.header .content-wrapper .support-count .count{
		font-size:10px;
	}

	.header .bulletin-wrapper{
		height:28px;
		line-height:28px;
		padding:0 22px 0 12px;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
		position:relative;
		background:rgba(7,17,27,0.2);
	}
	.header .bulletin-wrapper .bulletin-title{
		display:inline-block;
		vertical-align:top;
		width:22px;
		height:12px;
		background:url(bulletin@2x.png) no-repeat;
		background-size:100% 100%;
		margin-top:8px;
	}
	.header .bulletin-wrapper .bulletin-text{
		vertical-align:top;
		font-size:10px;
		margin:0 4px;
	}
	.header .bulletin-wrapper .bulletin-arrow{
		position:absolute;
		font-size:10px;
		right:12px;
	}
	.header .background{
		position:absolute;
		left:0;
		top:0;
		z-index:-1;
		width:100%;
		height:100%;
		filter:blur(10px)
	}
	.header .detail{
		position:fixed;
		z-index:100;
		left:0;
		top:0;
		width:100%;
		height:100%;
		overflow:auto;
		background:rgba(7,17,27,0.8);
		backdrop-filter:blur(10px);
	}
	.header .detail .detail-wrapper{
		min-height:100%;
		width:100%;
	}
	.header .detail .detail-wrapper .detail-main{
		margin-top:64px;
		padding-bottom:64px;
	}
	.header .detail .detail-wrapper .detail-main .name{
		line-height:16px;
		text-align:center;
		font-size:16px;
		font-weight:700;
	}
	.header .detail .detail-wrapper .detail-main .star-wrapper{
		margin-top:18px;
		padding:2px 0;
		text-align:center;
	}
	.header .detail .detail-wrapper .detail-main .title{
		display:flex;
		width:80%;
		margin:28px auto 24px auto;
	}
	.header .detail .detail-wrapper .detail-main .title .line{
		flex:1;
		position:relative;
		top:-6px;
		border-bottom:1px solid rgba(255,255,255,0.2)
	}
	.header .detail .detail-wrapper .detail-main .title .text{
		padding: 0 12px;
		font-size:14px;
		font-weight:700;
	}
	.header .detail .detail-wrapper .detail-main .supports{
		width:80%;
		margin:0 auto;
	}
	.header .detail .detail-wrapper .detail-main .supports .support-item{
		padding:0 12px;
		margin-bottom:12px;
		font-size:0;
	}
	.header .detail .detail-wrapper .detail-main .supports .support-item:last-child{
		margin-bottom:0;
	}
	
	.header .detail .detail-wrapper .detail-main .supports .support-item .decrease{
		background:url(decrease_1@2x.png);
	}
	.header .detail .detail-wrapper .detail-main .supports .support-item .discount{
		background:url(discount_1@2x.png);
	}
	.header .detail .detail-wrapper .detail-main .supports .support-item .guarantee{
		background:url(guarantee_1@2x.png);
	}
	.header .detail .detail-wrapper .detail-main .supports .support-item .invoice{
		background:url(invoice_1@2x.png);
	}
	.header .detail .detail-wrapper .detail-main .supports .support-item .special{
		background:url(special_1@2x.png);
	}
	.header .detail .detail-wrapper .detail-main .supports .support-item .icon{
		display:inline-block;
		width:16px;
		height:16px;
		vertical-align:top;
		margin-right:6px;
		background-size:16px 16px;
		background-repeat:no-repeat;
	}
	.header .detail .detail-wrapper .detail-main .supports .support-item .text{
		line-height:16px;
		font-size:12px;
	}
	.header .detail .detail-wrapper .detail-main .bulletin{
		width:80%;
		margin:0 auto;
	}
	.header .detail .detail-wrapper .detail-main .bulletin .content{
		padding:0 12px;
		line-height:24px;
		font-size:12px;
	}
	.header .detail .detail-close{
		position:relative;
		width:32px;
		height:32px;
		margin:-64px auto 0 auto;
		clear:both;
		font-size:32px;
	}
</style>