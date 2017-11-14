require.config({
	paths:{
		"jquery":"http://127.0.0.1:8080/js/jquery-3.1.1.min",
		"fastclick":"http://127.0.0.1:8080/js/fastclick",
		"zepto":"http://127.0.0.1:8080/js/zepto.min",
		"zeptoTap":"http://127.0.0.1:8080/js/zepto.tap",
		"swiper":"http://127.0.0.1:8080/js/swiper-3.4.2.min",
		"iscroll":"http://127.0.0.1:8080/js/iScroll",
		"iscrollProbe":"http://127.0.0.1:8080/js/iscroll-probe"
			},
	shim:{
		"fly" : {
            deps : ["jquery"]
        }
	}
});