<template>
<div>
<div class="goods">
		<div class="menu-wrapper" ref="menu">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foods">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li @click='selectFood(food,$event)' v-for="food in item.foods" class="food-item">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" />
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellcount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>		
			</ul>
		</div>
		<shopcart ref="shopcart" :select-foods="selectFoods" :deliveryprice="seller.deliveryPrice" :minprice="seller.minPrice"></shopcart>
</div>
		<food :food="selectedFood" ref="food"></food>
</div>
</template>
<script>
import BScroll from 'better-scroll';
import shopcart from '@/components/shopcart/shopcart';
import cartcontrol from '@/components/cartcontrol/cartcontrol';
import food from '@/components/food/food';
import { eventBus } from '@/components/event-bus';
const ERR_OK = 0;
export default {
	name:"Goods",
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return {
			goods:[],
			listHeight:[],
			scrollY:0,
			selectedFood:{}
		};
	},
	components:{
		shopcart,
		cartcontrol,
		food
	},
	created(){
		this.$http.get("/api/goods").then((response) => {
			response = response.body;
			if(response.errno === ERR_OK){
				this.goods = response.data;
				this.$nextTick(() => {
					this._initScroll();
					this.calculateHeight();
				})
				
			}
		}),
		this.classMap = ['decrease','discount','special','invoice','guarantee'];
		eventBus.$on('add_cart',(el) => {
				
			})
	},
	computed:{
		currentIndex(){
			let LEN = this.listHeight;
			for(let i=0;i<LEN.length;i++){
				let height1 = LEN[i];
				let height2 = LEN[i+1];
				if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
					return i;
				}
			}
		},
		selectFoods(){
			let foods = [];
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if(food.count){
						foods.push(food);
					}
				})
			})
			return foods;
		}
	},
	methods:{
		_initScroll(){
			this.meunScroll = new BScroll(this.$refs.menu,{
				click:true
			});
			this.foodsScroll = new BScroll(this.$refs.foods,{
				probeType:3,
				click:true
			});

			this.foodsScroll.on("scroll",(pos) => {
				this.scrollY = Math.abs(Math.round(pos.y));
			});

		},
		calculateHeight(){
			let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
			let height = 0;
			this.listHeight.push(height);
			for(let i = 0;i<foodList.length;i++){
				let item = foodList[i];
				height += item.clientHeight;
				this.listHeight.push(height);
			}
		},
		selectMenu(index,event){
			if(!event._constructed){//浏览器原生没有这个属性  所以在pc上点击时event._constructed会返回false;
				return;
			}
			let foodList = this.$refs.foods.getElementsByClassName("food-list-hook");
			let el = foodList[index];
			this.foodsScroll.scrollToElement(el,300);
		},
		add_cart(target){
			//体验优化，异步执行下落动画
			this.$nextTick(() => {
				this.$refs.shopcart.drop(target);
			})
		},
		selectFood(food,event){
			if(!event._constructed){
				return;
			}
			this.selectedFood = food;
			this.$refs.food.show();
		}
	}
}
</script>
<style scoped>
.goods{ 
	display:flex;
	position:absolute;
	top:174px;
	bottom:46px;
	width:100%;
	overflow:hidden;
}
.goods .menu-wrapper{
	flex:0 0 80px;
	width:80px;
	background:#f3f5f7;
}
.goods .menu-wrapper .menu-item{
	display:table;
	height:54px;
	width:56px;
	line-height:14px;
	padding:0 12px;
}
.goods .menu-wrapper .current{
	position:relative;
	margin-top:-1px;
	z-index:10;
	background:#fff;
	font-weight:700;
}
.goods .menu-wrapper .current .text{
	border:none;
}
.goods .menu-wrapper .menu-item .decrease{
	background:url(decrease_3@2x.png);
}
.goods .menu-wrapper .menu-item .discount{
	background:url(discount_3@2x.png);
}
.goods .menu-wrapper .menu-item .guarantee{
	background:url(guarantee_3@2x.png);
}
.goods .menu-wrapper .menu-item .invoice{
	background:url(invoice_3@2x.png);
}
.goods .menu-wrapper .menu-item .special{
	background:url(special_3@2x.png);
}
.goods .menu-wrapper .menu-item .icon{
	display:inline-block;
	width:12px;
	height:12px;
	vertical-align:top;
	margin-right:2px;
	background-size:12px 12px;
	background-repeat:no-repeat;
}
.goods .menu-wrapper .menu-item .text{
	display:table-cell;
	width:56px;
	vertical-align:middle;
	font-size:12px;
	position:relative;
}
.goods .menu-wrapper .menu-item .text:after{
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
.goods .foods-wrapper{
	flex:1
}
.goods .foods-wrapper .title{
	padding-left:14px;
	height:26px;
	line-height:26px;
	border-left:2px solid #d9dde1;
	font-size:12px;
	color:rgb(147,153,159);
	background:#f3f5f7;
}
.goods .foods-wrapper .food-item{
	display:flex;
	margin:18px;
	padding-bottom:18px;
	position:relative;
}

.goods .foods-wrapper .food-item:after{
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
.goods .foods-wrapper .food-item:last-child{
	margin-bottom:0;
}
.goods .foods-wrapper .food-item:last-child:after{
	display:none;
}
.goods .foods-wrapper .food-item .icon{
	flex:0 0 57px;
	margin-right:10px;
}
.goods .foods-wrapper .food-item .content{
	flex:1;
}
.goods .foods-wrapper .food-item .content .name{
	margin:2px 0 8px 0;
	height:14px;
	line-height:14px;
	font-size:14px;
	color:rgb(7,17,27);
}
.goods .foods-wrapper .food-item .content .desc{
	margin-bottom:8px;
	line-height:12px;
	font-size:10px;
	color:rgb(147,153,159);
}
.goods .foods-wrapper .food-item .content .extra{
	line-height:10px;
	font-size:10px;
	color:rgb(147,153,159);
}
.goods .foods-wrapper .food-item .content .extra .count{
	margin-right:12px;
}
.goods .foods-wrapper .food-item .content .price{
	font-weight:700;
	line-height:24px;
}
.goods .foods-wrapper .food-item .content .price .now{
	margin-right:18px;
	font-size:14px;
	color:rgb(240,20,20);
}
.goods .foods-wrapper .food-item .content .price .old{
	text-decoration:line-through;
	font-size:10px;
	color:rgb(147,153,159);
}
.goods .foods-wrapper .food-item .cartcontrol-wrapper{
	position: absolute;
	right: 0;
	bottom: 12px;
	height: 24px;
}
</style>