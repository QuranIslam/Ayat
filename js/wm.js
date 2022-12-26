// Super Globals //
SG = (typeof SG == "undefined")?{} : SG;
_platform_ = "wos";

url_interface = 'interfacec3ba.json?ui=mobile';
base_mp3url = 'https://quran.ksu.edu.sa/ayat/mp3';
res_url = 'ayat/resources';
res_ext = 'ayt';
masahef = {
	"hafs"    : {url:"ayat/safahat1/" , folder:"hafs" ,  ext:"png" , page_key:"Page" , whr:1.474 , height:690 , factor:0.2},
	"tajweed" : {url:"tajweed_png/", folder:"tajweed" ,  ext:"png" , page_key:"Page2" , whr:1.546 , height:720 , factor:0.13},
	"warsh"   : {url:"warsh/" , folder:"warsh" , ext:"png" , page_key:"Page_warsh" , whr:1.62 , height:760 , factor:0.13}
};
currActiveAlertHider=false;

(function(){
// context globals //
var loadedAudio = [];
// end context globals //
//alert(navigator.userAgent);
SG.getImg = function(img , cid, cb , cbf){
    //if(parseInt(img, 10) == 1) img = "605.png";
    //if(parseInt(img, 10) == 2) img = "606.png";
    
    var m = new Image();
    //alert(imgs_url+img);
    m.onload = function(){
        //alert(12);
        cb(imgs_url+img,cid);
    }
    m.src = imgs_url+img;
    if(m.loaded) cb(imgs_url+img,cid); // ??
	
}

SG.getAudio = function(qaree , sura , aya , cid , cb , cbf){
	cb(base_mp3url+'/'+qaree+'/'+paddingAya( sura ) + paddingAya( aya ) + '.mp3' , cid);
}
SG.preloadAudio = function(qaree , sura , aya){
	SG._ap1.preloadAya( base_mp3url +'/' + qaree + '/' + paddingAya(sura) + paddingAya( aya ) + ".mp3" );
	
}
var TagPlayer = function(tag, isLoader){
	var _this = this;

	this.tag = $(tag);
	this.isPlaying = false;
	this.isPaused = false;
	this.duration = 0;
	this.cancelEnded = false;
	this.evs = {};
	this.setSrc = function(src){
		this.tag[0].src = src
	}
	this.init = function(){
        
        if(isLoader) return;
        
		this.tag.on('ended' , function(){
			if(! _this.isPlaying) return;
			_this.ended();	

		});
		
		this.tag.on('canplay',function(){
			if(! _this.isPlaying || _this.evs['canplay']) return;
			_this.evs['canplay'] = true;
            _this.tag[0].play();
            setTimeout(function(){
                _this.trigger('played');
            }, 1000);
			
		});
		this.tag.on('durationchange',function(){
			if(! _this.isPlaying || _this.evs['duration']) return;
			_this.evs['duration'] = true;
			_this.duration = _this.tag[0].duration;
			_this.trigger('duration');
		});
		
		this.tag.on('pause',function(){
			//alert(1111111111);
			//alert(_this.tag[0].ended);

			if(! _this.isPlaying) return;
			if(_this.isPaused) return;
			if(_this.tag[0].ended || (_this.tag[0].duration && _this.tag[0].currentTime && (Math.abs(_this.tag[0].duration - _this.tag[0].currentTime) <= 1) )){
				_this.ended();	
			}
			else{
				$("#pop_pause").trigger(END_EV);
			}
		});
		this.tag.on('play',function(){
			//alert(1111);
			//if(_this.isPlaying) return;
			//alert(_this.isPaused);	
			if(! _this.isPaused) return;
			//alert(2222);
			$("#pop_play").trigger(END_EV);

		});
		
	}
	this.ended = function(){
		if(_this.cancelEnded) return;
		_this.isPlaying = false;
		_this.cancelEnded = true;
		_this.trigger('ended');


		setTimeout(function(){
			_this.cancelEnded = false;
		},200);
	}
	this.load = function(file){
		this.setSrc(file);
		this.tag[0].load(file);
	}

	this.fullPlay = function(file){
		if(this.isPlaying) this.stop();
		this.evs = {'canplay':false,'duration':false};
		this.duration = 0;
		this.isPlaying = true;
		this.isPaused = false;
		this.load(file);
		
	}
	this.play = function(){
		this.isPaused = false;
		this.tag[0].play();
	}
	this.stop = function(){
		this.isPlaying = false;
		this.tag[0].pause();	
	}
	this.pause = function(){
		this.isPaused = true;
		this.tag[0].pause();
	}
	this.de = $("<span></span>");
	this.trigger = function(ev){
		this.de.trigger(ev);
	}
	this.on = function(ev,cb){
		this.de.on(ev,cb);
	}
	this.init();
}
SG.APlayer = function(){
	//return;
	var _this = this;

	this.NP = {};
	this.NP_loader = {};
	this.duration = 0;
	this.playStarted = false;
	this.inited = false;
	this.canPreload = !(navigator.userAgent.match(/OS [56](_\d)+ like Mac OS X/i));
	this.init = function(){
		if(this.inited) return;
		this.inited = true;
		this.NP = new TagPlayer($("#pl1")[0]);
		this.NP_loader = new TagPlayer($("#pl2")[0] , true);
		this.NP.on('ended',this.endedH);
		this.NP.on('played',this.playedH);

		this.NP.on('duration',this.durationH);
	}
	this.playedH = function(){
        //setTimeout(function(){
            _this.playStarted = true;

            _this.onPlay();

        //}, 300);
        setTimeout(function(){
            _this.nowCanPreload = true;
            _this.onCanPreload();
        }, 2000);
	}
	this.durationH = function(){
		//alert(_this.NP.duration);
		_this.duration = _this.NP.duration;
	}
	this.endedH = function(){
		
		_this.onComplete();
	}
	this.play = function(file){
		//alert(this.state); ///// qwer
		//alert(file);
		if(! file){
			this.NP.play();
			return;
		}
		
		this.duration = 0;
		this.playStarted = false;
		this.nowCanPreload = false;
        this.onCanPreload = function(){};
		this.NP.fullPlay(file);
		
		setTimeout(function(){
			if(_this.playStarted) return;
			_this.onStart();		
		},10)
		//alert(111);
	
		//alert(file)

	}
	this.pause = function(){
		this.NP.pause();
	}
	this.stop = function(){
		this.NP.stop();
	}
	this.preloadAya = function(file){
       // alert(this.canPreload);
        if(!this.canPreload) return;
        //alert(file);
        if(this.nowCanPreload){
            //alert("cp: "+file);
            this.NP_loader.load(file);
        }
        else{
            this.onCanPreload = function(){
                //alert("ocp: "+file);
                this.NP_loader.load(file);
            }
        }
	}
	this.onComplete = function(){};
	this.onStart = function(){};
	this.onPlay  = function(){};
    this.onCanPreload = function(){};
	this.init();
}



var Plugins = {INITP:{} , Tools:{} , Dloader:{} , DBP:{} , Listen:{}};


Plugins.INITP.check = function(cb){
	cb();
}
Plugins.Tools.send = function(subj, msg, obj){
	var subj = subj || '';
	document.location.href = "mailto:?subject="+subj+"&body="+encodeURI(msg);
}
Plugins.Tools.openurl = function(url , obj){
    window.open(url);
	//obj.href = url;
}
Plugins.Listen.start = Plugins.Listen.stop = function(){
}

Plugins.Dloader.downloadFile = function(a,b,cb,cbf){
	setTimeout(function(){
		cb();
	} , 100);
}
Plugins.DBP.tafsir = function(author,id,cb,cbf){
    cbf();
    return;
    //////
	var suraAya = id2aya(id);
	var sura = suraAya.split('_')[0];
	var aya  = suraAya.split('_')[1];
	var hp = url_interface + '&do=tafsir&author=' + author + '&sura='+sura + '&aya='+aya;
	$.get(hp , function(bayan){
		var nass_aya    = '<div class="tafsir_txt_aya">' + bayan.split('|||')[0] + ' <span class="tafsir_txt_aya_num">['+QuranData.Sura[sura][sura_key] + ' : ' + aya + ']</span> ' + '</div>';
		var nass_tafsir = '<div class="tafsir_txt_tafsir">' + bayan.split('|||')[1] + '</div>';
		var nass = '<div class="tafsir_txt">' + nass_aya + nass_tafsir + '</div>'
		
		cb(nass);
	});
}
Plugins.DBP.search = async function(type, query, tash, cb, cbf) {
  // Retrieve the data from the local JSON file using the fetch function
  const response = await fetch("quran.json");
  const data = await response.json();

  // Use the filter method to search for the query within the data
  const results = data.filter(
    item => item.text.includes(query) || item.nass_safy.includes(query)
  );

  // Process the search results and construct an object containing the search results
  const out = {};
  for (const result of results) {
    out[result.sura + "_" + result.aya] = result.text;
  }

  // Call the callback function with the search results object as an argument
  cb(out);
};


Plugins.DBP.amaken = function(mosshaf , page , cb){
	function cb2(j){
		cb(j[page]);
	}
	$.get("hilit/hilitpage" + page + ".json", cb2, 'json');
}
Plugins.DBP.trans  = function(trans, begin, end, cb, cbf){
    cbf();
    return;
	$.get(url_interface+"&do=tarjama&tafsir=" + trans + "&begin="+begin+"&end="+end, function(json){
		var j = {};
		for(var ip in json.tafsir){
			j[ip] = json.tafsir[ip]['text'];
		}
		//trace(txt);
		cb(j);
	}, 'json');
}
SG.Plugins = Plugins;

SG.hideAB = function(){
	if( ( navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Mobile/i) ) ){
		window.scrollTo(0,1);	
	}
	else if(navigator.userAgent.match(/iPhone/i) ||  navigator.userAgent.match(/iPad/i)	){
		window.scrollTo(0,1);
	}	
}

SG.boot = function(cb){

	if(false){// && !top || !top.location || !self || !self.location || top!=self || top.location!=self.location || (top.location.pathname.indexOf("m.php") == -1 && top.location.pathname.indexOf("mobile.php") == -1 && top.location.pathname.indexOf("m.dev.php") == -1 && top.location.pathname.indexOf("m.dev2.php") == -1)){
		$('body').html('<div style="text-align:center;font-weight:bold;padding-top:40px;"><a href="http://quran.ksu.edu.sa/" target="_blank">موقع المصحف الإلكتروني</a><br><br><a href="http://quran.ksu.edu.sa/" target="_blank">Electronic Mosshaf</a></div>');
		return;
	}
    SG.Initer.currAya   = getHash('aya') || getKey('curr_aya') || null;
    
    SG.Initer.currLang  = getKey('lang') || null;
	SG.Initer.currTrans = getKey('trans') || null;
	SG.Initer.currTafsir= getKey('tafsir') || null;
	SG.Initer.currQaree = getKey('curr_qaree') || null;
	SG.Initer.currZoom  = getKey('curr_zoom') || null;
	
	
	window.location.hash = '#';

	
	SG.Trig.on("ayaChange", function(e,sura,aya){
		var h = window.location.hash;
		if(h && h.length > 3 && (h.indexOf("aya=") != -1)){
			h = h.replace(/aya=[0-9]+_[0-9]+/i,'aya='+currAya);
		}
		else{
			h = '#aya='+currAya;
		}
		window.location.hash = h;
		
	});


	$(".popup").on("show" , function(){

		window.scrollTo(0,0);
		var $this = $(this);
        if(window.location.hash.indexOf('w=') == -1){
            window.location.hash += '&w=1';
        }

		$(window).off('hashchange.w');
		$(window).on('hashchange.w' , function(){
			if(location.hash.indexOf('w=') == -1){
				$this.find(".popup_close").trigger(END_EV);
			}
		});
	});
	$(".popup").on("hide" , function(){
		window.scrollTo(0,0);
		$(window).off('hashchange.w');
		if(location.hash.indexOf('w=') != -1){
			window.location.hash = window.location.hash.replace(/[&]w=1/,'');// '#aya='+currAya;
		}

	});

	SG.Trig.on("showMenu" , function(){
		console.log("SHOW_MENU");
		$(window).off('hashchange.html');
        if(window.location.hash.indexOf('m=') == -1){
            window.location.hash += '&m=1';
        }
		$(window).on('hashchange.html' , function(){
			if(location.hash.indexOf('m=') == -1){				
				SG.Menu.toggle(-1);
			}
		});
	});
	SG.Trig.on("hideMenu" , function(){
		console.log("HIDE_MENU");
		$(window).off('hashchange.html');
		if(location.hash.indexOf('m=') != -1){
			window.location.hash = window.location.hash.replace(/[&]m=1/,'');// '#aya='+currAya;
		}
	});

	SG.Trig.on("showModal" , function(e,h){
        currActiveAlertHider = h;
		$(window).off('hashchange.f');
        if(window.location.hash.indexOf('f=') == -1){
            window.location.hash += '&f=1';
        }
		$(window).on('hashchange.f' , function(){
			if(location.hash.indexOf('f=') == -1){				
				currActiveAlertHider();
                currActiveAlertHider = false;
			}
		});
	});
	SG.Trig.on("hideModal" , function(){
		$(window).off('hashchange.f');
		if(location.hash.indexOf('f=') != -1){
            currActiveAlertHider = false;
			window.location.hash = window.location.hash.replace(/[&]f=1/,'');// '#aya='+currAya;
		}
	});
    
    
    
    
	SG.Trig.on("showSubMenu" , function(){
		console.log("SHOW_SUB");

		$(window).off('hashchange.m2');

        if(window.location.hash.indexOf('m2=') == -1){
            window.location.hash += '&m2=1';
        }

		$(window).on('hashchange.m2' , function(){
			if(location.hash.indexOf('m2=') == -1){				
				SG.Menu.hideActiveSub();
			}
		});
	});
	SG.Trig.on("hideSubMenu" , function(){
		console.log("HIDE_SUB");
	
		$(window).off('hashchange.m2');
		if(location.hash.indexOf('m2=') != -1){
			window.location.hash = window.location.hash.replace(/[&]m2=1/,'');// '#aya='+currAya;
		}

	});

	SG.Trig.on("showToolsMenu" , function(){
		$(window).off('hashchange-2.html');

        if(window.location.hash.indexOf('t=') == -1){
            window.location.hash += '&t=1';
        }


		$(window).on('hashchange-2.html' , function(){
			if(location.hash.indexOf('t=') == -1){				
				SG.ToolsMenu.toggle(-1);
			}
		});
	});
	SG.Trig.on("hideToolsMenu" , function(){
		$(window).off('hashchange-2.html');
		if(location.hash.indexOf('t=') != -1){
			window.location.hash = window.location.hash.replace(/[&]t=1/,'');// '#aya='+currAya;
		}

	});



	SG.Initer.preHook  = function(){
		if(navigator.userAgent.indexOf("IEMobile") != -1){
		   $("head").append('<link type="text/css" href="css/wp.css" rel="stylesheet">');		
		}
	}
	SG.Initer.postHook = function(){
		
		$("#bu_download").on(END_EV , function(){
			//alert($("#bu_download_link")[0].href);
			//window.open($("#bu_download_link")[0].href);
		});
		$("#contact_cont").on("show",function(){
			setTimeout(function(){
				alertt(parseAr(_lang['unsub_twitter']));
                //alert((_lang['unsub_twitter']));
			} , 3000);			
		});

		$("#contact_bu").on(END_EV , function(){
			var $obj = $(this);
			
			if(! $obj.data('title')) $obj.data('title' , $obj.html() );
			else if($obj.data('title') != $obj.html()){
				$obj.data('xhr').abort();
				$obj.html($obj.data('title'));
				return;
			}
			var title = $obj.data('title');
			
			$obj.html('<img src="images/loading_micro.gif" style="border:none">');
			var esm   = $("#ct_esm").val();
			var email = $("#ct_email").val();
			var msg   = $("#ct_msg").val();
			var hp    = url_interface + '&do=feedback&mobile=1&l='+currLang;
			
			$obj.data('xhr' , $.post(hp,{esm:esm, email:email, msg:msg}) );
			
			$obj.data('xhr').done(function(bayan){
				$obj.html($obj.data('title'));
				var err = Number(bayan.err);
				if(err){
					$obj.hide();
					setTimeout(function(){
						$obj.show();
					}, 3000);
					$("#ct_bayan").html(bayan.msg);
					$("#ct_bayan").fadeIn('slow').delay(2000).fadeOut('fast');
				}
				else{
					//$obj_cont.find("input").get(0).disabled = 1;
					$obj.hide();
					$("#ct_bayan").html( bayan.msg );
					$("#ct_bayan").fadeIn('slow');
				}
			});
		});
	
		$("#contact_mi").on(END_EV , function(){
			if(!$("#inf_cont").is(":visible") ){
				$('#inf_cont').show();
				$("#inf_cont").trigger("show");
			}
		});
		
	}




	
	if(! getKey("intro")){
		_FR_ = true;
		var l_str = '<div id="f_lang_sel">';
		l_str += '<button id="flang_en">English</button>';
        l_str += '<button id="flang_ar">'+parseAr('عربي',true)+'</button>';
		l_str += '</div>';
		setKey("intro",1);
        var langSeld = false;
		var a = alertt(l_str , parseAr('اللغة',true)+' | Language', function(){
            if(langSeld) return;

            SG.switchLang(def_lang);
			winLoaded();
			cb();
            
        }, {tiny:true});
        a.setContrs('hide');
		$("#f_lang_sel button").on(END_EV , function(){
			//alert($(this).attr('id').split('_')[1])
            langSeld = true;
			SG.switchLang($(this).attr('id').split('_')[1]);
			winLoaded();
			cb();
            a.tm();
		});
	}
	else{
		$(window).load(function(){
			winLoaded();
		});
		cb();
	}



}

var winLoaded = function(){
	
	setTimeout(function(){
		//SG.hideAB();
	}, 1000);
	
	//SG.Trig.on('orientation', SG.hideAB);

	setTimeout(function(){
		if(SG.ToolsMenu.getState() === null){
			SG.ToolsMenu.toggle(1);
			setTimeout(function(){
				SG.ToolsMenu.toggle(-1)
			} , 6000);
		}
	} , 9000); 
	
	if(! isMob()){
		setTimeout(function(){
			alertt(_lang['notify_mob_interface']);
		} , 5000);		
	}

	
}
var isMob = function(){
	//return true;
	 if( navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i)
	 || navigator.userAgent.match(/Windows Phone/i)
	 ){
	    return true;
	  }
	 else {
	    return false;
	  }
}
var getParam = function(name){
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
	return decodeURIComponent(results[1].replace(/\+/g, " "));
}
var getHash = function(key){
	var h = '';
	try{
		h = location.hash.match(new RegExp(key+'=([^&]*)'))[1] || '';
	}
	catch(e){}
	return h;
}

function manBack(){}
function clickMenu(){}


})(window, $);

Agent = (function(){
    var isWP=false,isAndroid=false,isIOS=false,isOther=false;
    var _vArr, _vC;

    isWP = (navigator.userAgent.toLowerCase().indexOf("windows phone") != -1);
    isAndroid = !isWP && (navigator.userAgent.toLowerCase().indexOf("android") != -1);
    isIOS  = !isWP && !isAndroid && /ip(hone|od|ad)/i.test(navigator.userAgent.toLowerCase());
    isOther  = !isWP && !isAndroid && !isIOS;
    function iosVer() {
        if (! isIOS) return null;

        var v = navigator.userAgent.toLowerCase().match(/os (\d+)_(\d+)_?(\d+)?/);
        if(! v) return null;
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
    function androidVer(){
        if (! isAndroid) return null;

        var v = navigator.userAgent.toLowerCase().match(/android (\d+)\.(\d+)\.?(\d+)?/i);
        if(! v) return null;
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];            
    }
    function wpVer(){
        if (! isWP) return null;

        var v = navigator.userAgent.toLowerCase().match(/windows phone (\d+)\.(\d+)\.?(\d+)?/i);
        if(! v) return null;
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];            
    }        
    function getVer(){
        if(isAndroid) return androidVer();
        if(isIOS) return iosVer();
        if(isWP) return wpVer();
        return null;
    }
    function _num(p1,p2,p3){
        return (parseInt(p1 || 0, 10) * 10000) + (parseInt(p2 || 0, 10) * 100) + (parseInt(p3 || 0, 10));
    }
    _vArr = getVer();
    if(_vArr) _vC = _num(_vArr[0], _vArr[1], _vArr[2]);
    console.log("vC: "+_vC);
    function verLT(p1,p2,p3){
        if(! _vC) return null;
        var v = _num(p1,p2,p3);

        if(_vC < v) return true;
        return false
    }
    function verGT(p1,p2,p3){
        if(! _vC) return null;
        var v = _num(p1,p2,p3);

        if(_vC > v) return true;
        return false
    }
    function verEq(p1,p2,p3){
        if(! _vC) return null;
        var v = _num(p1,p2,p3);

        if(_vC == v) return true;
        return false
    }
    function verEqGT(p1,p2,p3){
        if(verGT(p1,p2,p3) || verEq(p1,p2,p3)) return true;

        return false;
    }
    function verEqLT(p1,p2,p3){
        if(verLT(p1,p2,p3) || verEq(p1,p2,p3)) return true;

        return false;
    }    
    return{
        isAndroid: isAndroid,
        isIOS: isIOS,
        isWP: isWP,
        isOther: isOther,
        ver:_vC,
        verLT: verLT,
        verGT: verGT,
        verEq: verEq,
        verEqGT: verEqGT,
        verEqLT: verEqLT
    }
})();

var st_useParse = null;
function useParse() { //Enhanced UI
    if(st_useParse !== null){
        return st_useParse;
    }
    if(!Agent.isAndroid || !Agent.ver || Agent.verEqGT(4,4) ){
        st_useParse = false;
    }
    else{
        st_useParse = true;
    }
    return st_useParse;
}

var st_useESels = null;
function useESels() { //Enhanced Sels
	//return true;
    if(st_useESels !== null){
        return st_useESels;
    }
    if(Agent.ver && (Agent.isIOS || (Agent.isAndroid && Agent.verEqGT(4,1)) ) ){
        st_useESels = true;
    }
    else{
        st_useESels = false;
    }
    return st_useESels;
}

var st_useTransition = null;
function useTransition() {
    if(st_useTransition !== null){
        return st_useTransition;
    }
    if(!Agent.isAndroid || !Agent.ver || Agent.verEqGT(4,4) ){
        st_useTransition = true;
    }
    else{
        st_useTransition = false;
    }
    return st_useTransition;


}
var st_useHW = null;
function useHW() {
    if(st_useHW !== null){
        return st_useHW;
    }
    if(!Agent.isAndroid || !Agent.ver || Agent.verEqGT(4) ){
        st_useHW = true;
    }
    else{
        st_useHW = false;
    }
    return st_useHW;
}
var st_applyAnd4Fix = null;
function applyAnd4Fix() {
    if(st_applyAnd4Fix !== null){
        return st_applyAnd4Fix;
    }
    if(Agent.isAndroid && Agent.ver && Agent.verEqGT(4) ){
        st_applyAnd4Fix = true;
    }
    else{
        st_applyAnd4Fix = false;
    }
    return st_applyAnd4Fix;
}
