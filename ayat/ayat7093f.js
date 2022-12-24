function share_fb(l){
	var url = encodeURIComponent('indexa2a0-2.html?l='+l+'&c=7');
	window.open('http://www.facebook.com/sharer.php?u='+url,'sharer','toolbar=0,status=0,width=626,height=436');
}
function share_twt(l,m){
	var url = m + ' : ' + encodeURIComponent('indexa2a0-2.html?l='+l);
	window.open('http://twitter.com/home?status='+url,'twit','toolbar=0,status=0,width=626,height=436');
}
$(function(){
	$("#sel_bund").change(function(){
		var v = $(this).val();
		$("#sel_bund_null").remove();
		$("#bund_bu")[0].href = '?do=download&os=win&ver=latest&type='+v;
		$("#bund_bu")[0].title = $(this)[0].title;
		$("#bund_bu").css('visibility','visible');
	});
	
	$("#sl_k li a").click(function(e, p){
		if(!p && k_int) clearInterval(k_int);
		var $this = $(this);
		$("#sl_k li a").removeClass('active');
		$this.addClass('active');
		var $c = $("#"+this.id.replace(/k_/i,'c_') ) ;
		var t = 0;
		$c.prevAll().each(function(){
			t += $(this).height();
		});
		var ct = parseInt($("#sl_c")[0].style.top) || 0;
		var dt = Math.abs(-t-ct)*2;
		if(dt)
			$("#sl_c").animate({top: -t} , dt , 'swing');
	});
	k_int = 0;
	$("#k_standard").trigger("click",true);

	/*
	var arr = ['k_update','k_standard','k_flat','k_bundled','k_warsh'];
	var k=1;
	k_int = setInterval(function(){
		if(k >= arr.length){
			$("#"+arr[0]).trigger("click",true);
			clearInterval(k_int);
			return;
		}
		$("#"+arr[k++]).trigger("click",true);
		
		//alert(1);
	} , 3000);
	*/




	$(".ip,.ip2").live('mouseover', function(e){
		var $this = $(this);
		
		if(! $this.data('t')){
			if(! $this.attr('title')) return;
			$this.data('t' , $this.attr('title'));
			$this.attr('title' , '');
		}
		vT($this.data('t') , e , $this.hasClass('ip2') );
		if($this.hasClass('ip_o')) $this.data('t' , '');
	});
	$(".ip,.ip2").live('mouseout' , function(){
		hT();
	});
	timer_t = 0;
	function vT(s , e , two){
		if(timer_t) clearTimeout(timer_t);
		var tolX  = 20;
		var tolY  = 20;
		var delay = 100;
		var tp   = e.pageY+tolY;
		var lft  = e.pageX+tolX;
		var html = 't';
		if(two){
			tp  = 495;
			lft = 5;
			delay = 300;
			html = 't2';
		}
	
		if(lft < 0) lft = 0;
		$("#"+html).html(s).css({top:tp,left:lft}).fadeIn(delay);
		
	}
	function hT(){
		if(timer_t) clearTimeout(timer_t);
		timer_t = setTimeout(function(){
			timer_t = 0;
			$("#t,#t2").fadeOut(100);
		} , 150);
		
	}
	
	
	sha_tr = false;
	$(".sha_bu").mouseover(function(){
		if(sha_tr){
			clearTimeout(sha_tr);
			sha_tr = false;
			return;
		}
		$("#sha_box").stop(true);
		$(this).addClass('active');
		var t = $(this).offset()['top'];
		var l = $(this).offset()['left'];
		t -= $("#sha_box").height();
		$("#sha_box").css({top:t,left:l});
		$("#sha_box").fadeIn();
	});
	$(".sha_bu").mouseout(function(){
		if(sha_tr){
			return;
		}
		sha_tr = setTimeout(function(){
			$("#sha_box").stop(true);
			$("#sha_box").fadeOut();
			$(".sha_bu").removeClass('active');
			sha_tr = false;			
		} , 400);
	});
	$("#sha_box").mouseover(function(){
		if(sha_tr){
			clearTimeout(sha_tr);
			sha_tr = false;
			return;
			//console.log(11);
		}
		//console.log(23);			
	});
	$("#sha_box").mouseout(function(){
		if(sha_tr){
			return;
		}
		sha_tr = setTimeout(function(){
			$("#sha_box").stop(true);
			$("#sha_box").fadeOut();
			$(".sha_bu").removeClass('active');
			sha_tr = false;			
		} , 400);
	});
	/*
	$("#share_fb").click(function(){
		var url = encodeURIComponent('http://quran.ksu.edu.sa/');
		window.open('http://www.facebook.com/sharer.php?u='+url,'sharer','toolbar=0,status=0,width=626,height=436');
	});
	$("#share_twt").click(function(){
		
		var url = 'مشروع قرآني شامل بمميزات فريدة' + ' : ' + encodeURIComponent('http://quran.ksu.edu.sa/');
		window.open('http://twitter.com/home?status='+url,'twit','toolbar=0,status=0,width=626,height=436');
	});
	*/
	



});
scroll_int = 0;
function dload(){
	//alert($(document).scrollTop() < 5)
	if($(document).scrollTop() < 150){
		window.scrollTo(0, 0);
		if(scroll_int) clearInterval(scroll_int);
		var pos = $(document).scrollTop();
		scroll_int = setInterval(function(){
			if(pos > 350){
				clearInterval(scroll_int);
			}
			else{
				pos += 20;
				window.scrollTo(0, pos);
			}
		}, 20);
	}
	
	return false;
	//alert(1);
	$("#overall").show();
	$("#overall").fadeTo('fast',.7, function(){
		alert(10);
	});
	return false;
	
}
