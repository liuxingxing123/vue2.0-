require(['config'],function(){
	require(['jquery',"fastclick","swiper","iscroll","iscrollProbe"],function($,FastClick,swiper,iScroll,iscroll){
		new FastClick(document.body);
		
		 var myScroll = new iscroll("#wrap",{
			         fadeScrollbars: true,
			        scrollY:true,
			        probeType:2,
			        tap:true
			    });
			 var obtn=$("#gotop");
			 var timer = null;
			 var bSys = true;
		 myScroll.on('scroll',function(){//滚动监听  touch事件
		 	    var advantage = $("#advantage");
		 	    var winHeight = this.wrapperHeight
		 	 	var _scrollTop = this.y;
		 	 	var productHeight = $("#hot-products").height();
		 	 	if(Math.abs(_scrollTop)>productHeight - winHeight){
		 	 		var productPx = 0 +"px";
       				 $("#hot-products  .product").css(
						"transform","translateY("+productPx+")"
       				 	)
		 	 	}
		 	 	
		 	 	var aboutHeight = $("#aboutUs").offset().top;
		 	 	//console.log(Math.abs(_scrollTop),aboutHeight - winHeight,aboutHeight,winHeight)
		 	 	//console.log(Math.abs(_scrollTop)>aboutHeight)
		 	 	if(Math.abs(_scrollTop)>aboutHeight-winHeight/10){
       					var aboutUs = 0 +"px";
       					$("#aboutUs .aboutUsImg").css("transform","translateY("+aboutUs+")")
       					$("#aboutUs .aboutUsMsg-1").css("transform","translateY("+aboutUs+")")
       					$("#aboutUs .aboutUsMsg-2").css("transform","translateY("+aboutUs+")")
       					$("#aboutUs .theAdvantage").css("transform","translateY("+aboutUs+")")
       					$("#aboutUs .aboutUsEnd").css("transform","translateY("+aboutUs+")")
       			}
		 	 	var concactHeight = $("#concact").offset().top;
		 	 	//console.log(Math.abs(_scrollTop)>concactHeight - winHeight/9)
		 	 	if(Math.abs(_scrollTop)>concactHeight - winHeight/9){
		 	 		var concact = 0+"px";
		 	 		$("#concact").css("transform","translateY("+concact+")")
		 	 	}
		 })//滚动事件结束
		 
		 //给Advantage  点击图标加样式
		 $("li").click(function(){
		 	$("li .wrapIcon").css("background","#eee");
		 	$("li .wrapIcon i").css("color","#5e7387");
		 	$(this).find(".wrapIcon").css("background","#4e97d9");
		 	$(this).find(".wrapIcon i").css("color","white");
		 })
		var hasClass = $("header .header-navbar i").hasClass("icon-anniu");
		var oHeight = 1.5+"rem";
		var count = 0;
		
		
		//回到顶部
		$("#gotop").click(function(){
			
			var timer = null;
			var bSys = true;
			if(!bSys){
				            clearInterval(timer);
				       }
				        bSys=false;

			timer = setInterval(function(){
				        	var scrollTop = myScroll.y;
				        	var iSpeed = Math.floor(scrollTop/18);
				        	if(scrollTop === 0){
				        		clearInterval(timer);
				        	}
				        	bSys = true;
				        	myScroll.y = scrollTop - iSpeed;
				        },20);
		})
		$("header .header-navbar").click(function(){
			$("header .navbar-list").css("height","0px");
			if(hasClass && count%2==0){
				$(this).find("i").removeClass("icon-anniu").addClass("icon-guanbi");
				$("header .navbar-list").animate({height:oHeight}).show();
			}
			else{
				$(this).find("i").removeClass("icon-guanbi").addClass("icon-anniu");
				$("header .navbar-list").animate({height:0}).hide();
			}
			count++;
		});
		
		$("header .header-language").click(function(){
			var more = 720+'deg';
			$("header .more-language").show().css("transform","rotateX("+more+")");
		})
		$("header .language-close").click(function(){
			$("header .more-language").fadeOut();
		})
		
		//dom结构，包括类 都不要修改 。
		var mySwiper = new Swiper ('#container', {
		    direction: 'horizontal', //控制那个方向上的滑动
		    loop: true, //无缝的切换
		    speed:800,
		    autoplay:1500,
		   // freeMode:true,
		   // effect:"coverflow",
		    noSwiping:true,
		    bulletActiveClass:"active",
		    // 如果需要分页器
		    pagination: '.swiper-pagination', //需要分页器 就配置它，value是当前分页器的容器的选择器
		     
		    // 如果需要前进后退按钮
			/*    nextButton: '.swiper-button-next',
		    prevButton: '.swiper-button-prev',*/
		     
		    // 如果需要滚动条
		   /* scrollbar: '.swiper-scrollbar',*/
		 });
		
		 function temp(product){//模板的函数  这里是模板开始的地方
					var temp = `
							<div class="product col-lg-3 col-md-4 col-sm-6">
								<img calss="img-responsive" src=${product.src} alt=${product.alt} title=${product.title} />
								<h4><a href="#">${product.msg}</a></h4>
							</div>
							`;
					return temp;
				}
				var oFragment = document.createDocumentFragment();
				var html = "";
				$.ajax('/productData.json').then(function(data){
					var data = data || [];
					if(data.length === 0){
						alert("还未有数据");
						return false;
					}
					$.each(data,function(index,product){
						html+=temp(product);
					});
					oFragment.append(html);
					$(".hotProducts").append(html);
				}).fail(function(){
					alert("内部数据错误");
				})//这里是模板结束的地方
				
				$('.products-btn > a').click(function (e) {
					e.preventDefault();
					$('.products-btn > a').removeClass('btnActive');
					$(this).addClass('btnActive');
				});
			
	})
})
