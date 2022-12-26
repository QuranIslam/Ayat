/*-------------------- Globals ------------------------*/
currAya   = 0;
currPage  = -1;
globalPlay = 0;
pb_trans  = false;
pb_trans_map = {"En":"English_Walk" , "Fr":"fr.leclerc_128kbs" , "Ur":"ur.khan_46kbs" , "Bs":"Bosnian_Korkut_128kbps"};
pb_played = false;
played1st = false;
playedAu  = true;
pageBusy  = false;
hilites = {};
tarajem = {"ar_ayat":{dir:"rtl"},"ar_ayat_safy":{dir:"rtl"},"ar_mu":{dir:"rtl"},"ar_ma3any":{dir:"rtl"},"en_sh":{dir:"ltr"},"ku_asan":{dir:"rtl"},"pr_tagi":{dir:"rtl"},"ur_gl":{dir:"rtl"},"ru_ku":{dir:"ltr"},"sq_nahi":{dir:"ltr"},"fr_ha":{dir:"ltr"},'de_bo':{dir:"ltr"} , 'pt_elhayek':{dir:"ltr"} , 'sv_bernstrom':{dir:"ltr"} , 'es_navio':{dir:"ltr"}, 'es_cortes':{dir:"ltr"}, 'bn_bengali':{dir:"ltr"}, 'bs_korkut':{dir:"ltr"}, 'it_piccardo':{dir:"ltr"}, 'nl_siregar':{dir:"ltr"}, 'so_abduh':{dir:"ltr"}, 'tr_diyanet':{dir:"ltr"}, 'ta_tamil':{dir:"ltr"}, 'ta_tamil':{dir:"ltr"}, 'ha_gumi':{dir:"ltr"}, 'id_indonesian':{dir:"ltr"}, 'ms_basmeih':{dir:"ltr"}, 'nl_keyzer':{dir:"ltr"}, 'sw_barwani':{dir:"ltr"}, 'th_thai':{dir:"ltr"}, 'uz_sodik':{dir:"ltr"}, 'zh_jian':{dir:"ltr"}, 'ml_abdulhameed':{dir:"ltr"} };
tafaser = {"sa3dy": "السعدي", "baghawy":"البغوي" , "katheer":"ابن كثير" , "qortoby":"القرطبي" , "tabary":"الطبري"  , "indonesian":"Indonesian - Tafsir Jalalayn" , "russian":"русский (Russian) - Кулиев -ас-Саади"};
base_mp3url = 'https://quran.ksu.edu.sa/ayat/mp3';
url_interface = '';
currMosshaf = 'hafs';
imgs_url = 'safahat/png_big/index.html';
imgs_ext = 'png';
jxr = {};
scroll_pane = false;
page_key = 'Page';
masahef = {
	"hafs"    : {url:"ayat/safahat1/" ,  ext:"png" , page_key:"Page" , height:690},
	"warsh"   : {url:"warsh/" ,  ext:"png" , page_key:"Page_warsh" , height:760},
	"tajweed" : {url:"tajweed_png/" ,  ext:"png" , page_key:"Page2" , height:720}	
}
avail_masahef = ["hafs","warsh","tajweed"];

if(! _lang['sura_key']){
	sura_key  = (logha == 'ar' || logha == 'ku' || logha == 'pr' || logha == 'ur')?4:5;
}
else{
	sura_key = _lang['sura_key'];
}
if(logha == 'bs'){
	sura_key = 'bs';
}

quraa_map = {
	"husary":"Husary_64kbps",
	"husary.m":"Husary_Mujawwad_64kbps",
	"husary.t":"Hussary.teacher_64kbps",
	"husary.tq":"Hussary.teacher_32kbps",
	"husary.w":"warsh_husary_64kbps",
	"husary.e":"husary_qasr_64kbps",
	"huzaify" : "Hudhaify_64kbps",
	"sudais"  : "Abdurrahmaan_As-Sudais_64kbps",
	"shuraym" : "Saood_ash-Shuraym_64kbps",
	"maher" : "Maher_AlMuaiqly_64kbps",
	"ghamidi" : "Ghamadi_40kbps",
	"qatami" : "Nasser_Alqatami_128kbps",
	"jibreel" : "Muhammad_Jibreel_64kbps",
	"shatree" : "Abu_Bakr_Ash-Shaatree_64kbps",
	"ajamy" : "Ahmed_ibn_Ali_al-Ajamy_64kbps",
	"afasy" : "Alafasy_64kbps",
	"basfar": "Abdullah_Basfar_64kbps",
	"absulbasit" : "Abdul_Basit_Murattal_64kbps",
	"absulbasit.m" : "AbdulSamad_64kbps",
	"minshawy" : "Minshawy_Murattal_128kbps",
	"minshawy.m" : "Minshawy_Mujawwad_64kbps",
	"minshawy.t" : "Minshawy_Teacher_128kbps",
	
	"ayyoub" : "Muhammad_Ayyoub_64kbps",
	"rifai" : "Hani_Rifai_192kbps",
	"awwad" : "Abdullaah_3awwaad_Al-Juhaynee_128kbps",
	"qasim" : "Muhsin_Al_Qasim_192kbps",
	"tablawy" : "Mohammad_al_Tablaway_64kbps",
	"tunaiji" : "tunaiji_64kbps",
	"khaleefa": "khaleefa_96kbps",
	"yaser" : "Yasser_Ad-Dussary_128kbps",
	"abdulkareem" : "Muhammad_AbdulKareem_128kbps",
	"dosary" : "warsh_dossary_128kbps",
	"dosary.q" : "warsh_dossary_32kbps",
	"yasin" : "warsh_yassin_64kbps", 
	"fares" : "Fares_Abbad_64kbps", 
	"salamah" : "Yaser_Salamah_128kbps", 
	"mostafa" : "Mostafa_Ismail_128kbps",
    "jaber" : "Ali_Jaber_64kbps",
	"ayman" : "Ayman_Sowaid_64kbps",
	
	
	"husary.q":"Husary_40kbps",
	"minshawy.q" : "Minshawy_Murattal_48kbps",
	"absulbasit.q" : "Abdul_Basit_Murattal_40kbps",
	"huzaify.q":"Hudhaify_32kbps",
	"banna":"Banna_32kbps",
	"basfar.q":"Abdullah_Basfar_32kbps",
	"akhdar.q":"Ibrahim_Akhdar_32kbps",
	"ayyob.q":"Muhammad_Ayyoub_32kbps",
	
	"en":"English_Walk",
	"fr":"fr.leclerc_128kbs",
	"ur":"ur.khan_46kbs",
	"bs":"Bosnian_Korkut_128kbps"

}


////////////////////
/*-------------------- page loading --------------------*/

// audhubillah.mp3
// bismillah.mp3

imgsLoaded = {};
function loadImg(){
	$(".b-p1").css({zIndex:"inherit"});
	$(".b-p2").css({zIndex:"inherit"});
	
	

	var n = currPage;
	
	pageBusy = false;
	
	if(n % 2){
		var n1 = n;
	}
	else{
		var n1 = n-1;
	}
	var n2 = n1+1;
	/////////////////////////////
	imgsLoaded = {};
	
	$("#img_right_cont").html('<img id="img_right" class="img_quran" src="'+imgs_url+ n1 +'.'+imgs_ext+'" onload="imgLoaded(\'' + n1 + '\' , this)" />');
	$("#img_left_cont").html('<img id="img_left" class="img_quran" src="'+imgs_url+ n2 +'.'+imgs_ext+'" onload="imgLoaded(\'' + n2 + '\' , this)" />');
	
	pageUpdated();
	
	//dfds['img_ready'].resolve();
	
}
function unloadImg(){
	$(".b-p1").css({zIndex:10});
	$(".b-p2").css({zIndex:10});
	removeOverlays();
}
function pageUpdated(){
	$("#marker").show();
	if(currMode == 'simple') return;
	if(currMode == 'memorize'){
		var page = currPage;
		drawHilites(page , true);
		if( page % 2 ){
			drawHilites(page+1 , true);	
		}
		else{
			drawHilites(page-1 , true);
		}			
		memorize_hiliteAya(memorize_currAya);

		return;
	}
	$(".fld_goto_page").val(currPage);
	imgAfterLoad( currPage );
	setTimeout(function(){
		manOverlays();
	} , 200);
}
function beforeUpdatePage(){
	removeOverlays();
	tabsMan.closeTabs();
	hideWidget();
	stopPlayer();
	$("#marker").hide();
}
function loadPage( n  ) {
    if(n == 'laheq') {
        loadPage(currPage + 1);
        return;
    } else if(n == 'sabeq') {
        loadPage(currPage - 1);
        return;
    }
    if(pageBusy){
    	return;
    }
        
    pageBusy = true;

    /*-------------------*/
    beforeUpdatePage();
    /*-------------------*/
    var n = Number(n);
    if( Math.abs(currPage-n) <= 1) {
    	
        if(n > currPage) { // laheq
            if(currPage % 2) {
                currPage = n;
                pageBusy = false;
                pageUpdated();
                return;
            }
        } else if(n < currPage){
            if(currPage % 2 == 0) {
                currPage = n;
                pageBusy = false;
                pageUpdated();
                return;
            }
        }
        else{
            pageBusy = false;
            pageUpdated();
            return;
        }
    }

    if(n > currPage) {
        $("#book").booklet('prev');
    } else {
        $("#book").booklet('next');
    }

	currPage = n;

}

function setCurrAya(sura , aya){
	var sura = Number(sura);
	var aya  = Number(aya);
	if(isNaN(sura) || sura < 1) sura = 1;
	if(sura > 114) sura = 114;

	if( isNaN(aya) || (aya > QuranData.Sura[ sura ][1]) ) aya = 1;
	
	if(currAya && (currAya == sura+'_'+aya)) return;
	
	currAya = sura+'_'+aya;

	$.bbq.pushState('aya='+sura+'_'+aya);
	
	
	//$.get(url_interface+'&do=current&sub=aya&state='+currAya);
	setCookie('pc_curr_aya' , currAya , 365 , 'index-2.html' , '' ,'');
}
function loadAya(sura, aya){

	loadPage( suraSafha(sura, aya) );
	setCurrAya(sura, aya);
}

/*--------------------- player -------------------------*/
inp2 = false;
function playAya(hint){
	if(! verifyAya() ){
		loadAya(currAya.split('_')[0] , currAya.split('_')[1]);
		return;
	}
	hiliteCurrAya();	
	if(! globalPlay) return;
	
	stopPlayer();
	
	if(! playedAu){
		inp2 = true;
		$("#player2").jPlayer( "clearMedia" );	
		$("#player2").jPlayer("setMedia", {
			mp3: base_mp3url+"/all/audhubillah.mp3"
		}).jPlayer("play");
		return false;
	}

	if((typeof hint == 'undefined' || hint == false) && currAya.split('_')[1] == 1 &&  currAya.split('_')[0] != 1 && currAya.split('_')[0] != 9 && currQaree != 'Banna_32kbps' && currQaree != 'Ahmed_ibn_Ali_al-Ajamy_64kbps' && currQaree != 'warsh_yassin_64kbps' ){
		inp2 = true;
		if(currQaree == 'English_Walk' || currQaree == 'fr.leclerc_128kbs' || currQaree == 'ur.khan_46kbs'){
			var b_qaree = 'https://quran.ksu.edu.sa/all/bismillah.mp3';
		}
		else{
			var b_qaree = currQaree+'/001001.mp3';
		}
		$("#player").jPlayer( "clearMedia" );	
		$("#player").jPlayer("setMedia", {
			mp3: base_mp3url+"/"+b_qaree
		}).jPlayer("play");
		
		return;
	}
	if(hint && pb_trans_map[hint]){
		var m_url = base_mp3url + '/'+pb_trans_map[hint]+'/';
	}
	else{
		var m_url = mp3url;
	}
	var aya = paddingAya( currAya.split('_')[0] ) + paddingAya( currAya.split('_')[1] );	


	$("#player").jPlayer("setMedia", {
		mp3: m_url + aya + ".mp3"
	}).jPlayer("play");



	
	window.setTimeout(function(){
		preloadAya();
	} , 1000);

}
function preloadAya(){
	if(pb_trans && ! pb_played){
		var aya = currAya;
		var m_url = base_mp3url + '/' + pb_trans_map[pb_trans] + '/';
	}
	else{
		var aya = setNextAya(true);
		var m_url = mp3url;		
	}

	
	aya = paddingAya( aya.split('_')[0] ) + paddingAya( aya.split('_')[1] );
	$("#player2").jPlayer("setMedia", {
		mp3: m_url + aya + ".mp3"
	}).jPlayer("load");


}
function verifyAya(){
	var sura = currAya.split('_')[0];
	var aya  = currAya.split('_')[1];
	
	
	var page = suraSafha( sura , aya );
	if(page != currPage) return false;
	return true;
}

function stopPlayer(){
	$("#player" ).jPlayer( "clearMedia" );
}


function setNextAya(ret){
	var sura = Number( currAya.split('_')[0] );
	var aya  = Number( currAya.split('_')[1] );
	//var sura_ayat = QuranData.Sura[sura][1];
	if(++aya > QuranData.Sura[sura][1]){
		sura = sura+1;
		aya  = 1;
	}
	if(sura > 114){
		sura = 1;
		aya  = 1;
	}
	if(typeof ret != 'undefined') return sura+'_'+aya; 

	setCurrAya(sura , aya);
}
aya_prev = false;
function memorize_hiliteAya(aya){
	var sura = aya.split('_')[0];
	var aya = aya.split('_')[1];
	$("#" + sura+'_'+aya + '__hilite_1').addClass('click');
	$("#" + sura+'_'+aya + '__hilite_2').addClass('click');
	$("#" + sura+'_'+aya + '__hilite_3').addClass('click');
	
}
function hiliteCurrAya(){
	var sura = currAya.split('_')[0];
	var aya  = currAya.split('_')[1];
	var juz  = suraJuz(sura , aya);
	var hizb = suraHizb(currAya.split('_')[0] , currAya.split('_')[1])%8 || 8;

	var suraName = getSuraName( sura );
	
	if(aya_prev){
		$("#"+aya_prev+'__hilite_1, #'+aya_prev+'__hilite_2, #'+aya_prev+'__hilite_3').removeClass('active');
		$("#"+aya_prev+'__trans' ).removeClass('active');
		$("#tb_sura").data('prev').removeClass('active');
		$("#tb_aya").data('prev').removeClass('active');
		$("#tb_juz").data('prev').removeClass('active');
		$("#tb_safha").data('prev').removeClass('active');
		$("#wd_hizb").data('prev').removeClass('active');
	}	
	$("#tb_sura").data('prev' , $("#sura_"+sura).addClass('active')).html( suraName );
	$("#tb_aya").data('prev' , $("#aya_"+aya).addClass('active')).html( aya );
	$("#tb_safha").data('prev' , $("#safha_"+currPage).addClass('active')).html( currPage );
	$("#tb_juz").data('prev' , $("#juz_"+juz).addClass('active')).html( juz );
	$("#wd_hizb").data('prev' , $("#hizb_"+hizb).addClass('active'));

	$("#" + sura+'_'+aya + '__hilite_1').addClass('active');
	$("#" + sura+'_'+aya + '__hilite_2').addClass('active');
	$("#" + sura+'_'+aya + '__hilite_3').addClass('active');
	$("#" + sura+'_'+aya + '__trans').addClass('active');
	if(scroll_pane){
		trans_scrollTo($("#" + sura+'_'+aya + '__trans'));
	}
	
	aya_prev = sura+'_'+aya;
	
}
/*------------- Hilites --------------*/
function drawHilites( page , memorize ){
	if(! page){
		page = currPage;
	}
	if(! hilites[currMosshaf]) hilites[currMosshaf] = {};
	if(! hilites[currMosshaf][ page ]){
		jxr['hilites'] = $.get("hilit/hilitpage" + page + ".json"  , function(json){
			//console.log(json[page]);
			var x,y;
			for(var i in json[page]){
				//json[page][i][0] = json[page][i][0]*(456/1654); 
				//json[page][i][1] = json[page][i][1]*(739/2681);
			}
			hilites[currMosshaf][ page ] = json[ page ];
			hilitePage( page , memorize );
		} , 'json');
	}
	else{
		hilitePage( page , memorize);
	}
}
//////////////////////


_hlMeta = {
	"hafs" : {
		height : 30,
		mgwidth : 40,
		twidth : 416,
		ofwidth : 10,
		ofheight : 15,
		fasel_sura : 110,
		page_top : 37,
		page_sura_top : 80,
		mem_height : 45,
		mem_ofheight : 24,

		fp_height: 20,
		fp_mgwidth: 80,
		fp_twidth: 376,
		fp_ofwidth: 5,
		fp_ofheight: 10		
	},
	"warsh" : {
		height : 40,
		mgwidth : 25,
		twidth : 427,
		ofwidth : 17,
		ofheight : 20,
		fasel_sura : 140,
		page_top : 30,
		page_sura_top : 80,
		mem_height : 48,
		mem_ofheight : 22,
		
		fp_height: 20,
		fp_mgwidth: 80,
		fp_twidth: 376,
		fp_ofwidth: 5,
		fp_ofheight: 10
	},
	"tajweed" : {
		height : 40,
		mgwidth : 25,
		twidth : 427,
		ofwidth : 17,
		ofheight : 20,
		fasel_sura : 140,
		page_top : 30,
		page_sura_top : 80,
		mem_height : 48,
		mem_ofheight : 22,
		
		fp_height: 30,
		fp_mgwidth: 100,
		fp_twidth: 350,
		fp_ofwidth: 10,
		fp_ofheight: 15
	}
}
function hilitePage(page , memorize){
	//hl_remove();
	var amaken = hilites[currMosshaf][page];

	var sura,aya,top,left,prev_top,prev_left,mgwidth,mgheight,twidth,ofwidth,ofheight,fasel_sura,page_top,page_sura_top,width,height,diff,hl_id,hilite_id;
	
	if( page % 2 ){
		var img_id = "img_right_cont";	
	}
	else{
		var img_id = "img_left_cont";
	}
	
	var b_top  = $("#"+img_id).offset()['top'];
	var b_left = $("#"+img_id).offset()['left'];
	
	hilite_id = 'hilite';
		
	height = _hlMeta[currMosshaf]['height'];
	mgwidth = _hlMeta[currMosshaf]['mgwidth'];
	twidth = _hlMeta[currMosshaf]['twidth'];
	ofwidth = _hlMeta[currMosshaf]['ofwidth'];
	ofheight = _hlMeta[currMosshaf]['ofheight'];
	fasel_sura = _hlMeta[currMosshaf]['fasel_sura'];
	page_top = _hlMeta[currMosshaf]['page_top'];
	page_sura_top = _hlMeta[currMosshaf]['page_sura_top'];
	
	if(memorize){
		hilite_id = 'hilite_memorize';
		height = _hlMeta[currMosshaf]['mem_height'];
		ofheight = _hlMeta[currMosshaf]['mem_ofheight'];
	}

	if(page == 1 || page == 2){
		height = _hlMeta[currMosshaf]['fp_height'];
		mgwidth = _hlMeta[currMosshaf]['fp_mgwidth'];
		twidth = _hlMeta[currMosshaf]['fp_twidth'];
		ofwidth = _hlMeta[currMosshaf]['fp_ofwidth'];
		ofheight = _hlMeta[currMosshaf]['fp_ofheight'];	
	}
	
	prev_top  = null;
	prev_left = null;
	
	var count = 1;
	for(var i in amaken){
		sura = i.split('_')[0];
		aya  = i.split('_')[1];
		
		top = amaken[sura + "_" + aya][1] - ofheight;
		left = amaken[sura + "_" + aya][0] - ofwidth;
	
		width = 0;
	
		hl_id = sura+'_'+aya+'__'+'hilite_1';
	
		if(count == 1){
			prev_left = twidth;
			if(page == 1 || page == 2){
				prev_top = 270;
			}
			else{
				if(aya == 1){
					prev_top = page_sura_top;
				}
				else{
					prev_top = page_top;
				}
			}
		}
		else{
			if(aya == 1){
				prev_top += fasel_sura;
				prev_left = twidth;
			} 
		}

		diff = (top - prev_top);
		if(diff > (height*1.6)){
			hl_draw(sura+'_'+aya+'__'+'hilite_1' , prev_top , mgwidth , prev_left - mgwidth , height , b_top , b_left , img_id , hilite_id);
			hl_draw(sura+'_'+aya+'__'+'hilite_2' , top , left , (twidth - left) , height , b_top , b_left , img_id , hilite_id);
			hl_draw(sura+'_'+aya+'__'+'hilite_3' , (prev_top + height) , mgwidth , (twidth - mgwidth) , (diff - height)  , b_top , b_left , img_id , hilite_id);

		}
		else if(diff > (height*0.6)){
			hl_draw(sura+'_'+aya+'__'+'hilite_1' , prev_top , mgwidth , (prev_left - mgwidth) , height  , b_top , b_left , img_id , hilite_id);
			hl_draw(sura+'_'+aya+'__'+'hilite_2' , top , left , (twidth - left) , height  , b_top , b_left , img_id , hilite_id);
		}
		else{
			width = prev_left - left;
			hl_draw(hl_id , top , left , width , height , b_top , b_left , img_id , hilite_id);
		}

		count++;
		
		prev_top  = top;
		prev_left = left;

	}
	if(memorize){
		$('.hiliter.copy').addClass('memorize');
		memorize_hiliteAya(memorize_currAya);
		$('.img_cont').css('visibility','visible');
		return;

	}
	setTimeout(function(){
		
		hiliteCurrAya();
		
	} , 200);
	//hl_draw(hl_id , top , left , width , height);
}
function hl_draw(id , top , left , width , height , b_top , b_left , img_id , hilite_id){
	if(! hilite_id) var hilite_id = 'hilite';
	var b_top = 0;
	var b_left = 0;
	var top  = b_top + top;
	var left = b_left + left;
	
	/*
	top = (455/1680)*top;
	left = (455/1680)*left;
	//width = (455/1680)*width;
	height = (455/1680)*height;
	*/
	
	//var width  = ((width/456)*100) -  ((width/456)*3) + '%';
	//var height = ((height/739)*100) + '%';

	//var left    = ((left/1680)*left);// + '%';
	//var top     = ((top/2723.2)*left);// - 2.5  + '%';

	
	$("#"+hilite_id).clone().attr('id' , id).addClass('copy').appendTo("#"+img_id);
	setTimeout(function(){
		$("#" + id).css({"display":"block","top":top,"left":left,"width":width,"height":height});
	} , 100);
}


function hl_remove(){
	$(".hiliter.copy").remove();
}

/*--------------------- overlays ----------------------*/
function manOverlays(){
	//init();
	if(currPage % 2){
		addOverlay("img_left_cont" );
	}
	else{
		addOverlay("img_right_cont");
	}
	drawHilites();
	getTranslation();
	
}

function removeOverlays(){
	$(".trans_widg.copy").remove();

	$(".overlayer.copy").remove();
	$(".overlayer_sel.copy").remove();
	$(".hiliter.copy").remove();
	

	scroll_pane = false;
	
}

function addOverlay( id ){
	var p = $("#"+id).offset();
	var w = $("#"+id).width();
	var h = $("#"+id).height();


	$("#overlay").clone().attr('id' , 'overlay_' + id).addClass('copy').appendTo("#"+id);
	
	setTimeout(function(){
		$("#overlay_" + id).css({width: Number(w)+2 , top:0, left:0, height: '100%'  , opacity:.2 , display:"block"});
	} , 10);
	setTimeout(function(){
		$("#overlay_" + id).fadeTo(300,.9);
	} , 100);
	
	$("#overlay_sel").clone().attr('id' , 'overlay_sel_'+id).addClass('copy').appendTo("#"+id);
	setTimeout(function(){
		$("#overlay_sel_" + id).css({width:'100%',display:"block",zIndex:1000,position:"absolute"});
		//setSeld($(".trans_selector.selobj ul li a[name='"+currTarjama+"']"));
		$(".trans_selector.selobj ul li a[name='"+currTarjama+"']").click();
	} , 10);
	
	
	
}

/*----------------- inst tarajem -----------------*/

function getTranslation( page ){
	var page = page || currPage;
	if(! page) return;
	if(currTarjama == '_hide'){
		$(".trans_widg.copy").remove();		
		$(".overlayer.copy").remove();
		scroll_pane = false;
		return;

	}
	if(! tarajem[currTarjama]) return;
	if(! tarajem[currTarjama][currMosshaf]) tarajem[currTarjama][currMosshaf] = {};
	if( ! tarajem[currTarjama][currMosshaf][page]){
		var b_sura = QuranData[page_key][ page ][0];
		var b_aya  = QuranData[page_key][ page ][1];
		
		var e_sura = QuranData[page_key][ page+1 ][0];
		var e_aya  = QuranData[page_key][ page+1 ][1];
		
		
		var url = url_interface + currTarjama;
		jxr['tafsir'] = $.get("tarjmat/" + url + ".json" , function(json){
			
			tarajem[ currTarjama ][ currMosshaf ][ page ] = json.tafsir;
			setTranslation( page );
		} , 'json');
	}
	else{
		setTranslation( page );
	}
}
function setTranslation( page ){
	if( page % 2 ){
		var img_id = "img_left_cont";	
	}
	else{
		var img_id = "img_right_cont";
	}

	$(".trans_widg.copy").remove();


	scroll_pane = false;


	var top    = $("#"+img_id).offset()['top']+30;
	var left   = $("#"+img_id).offset()['left']+30;
	var width  = $("#"+img_id).width()-60;
	var height = $("#"+img_id).height()-60;
	
	
	var txt = "";
	var count = 1;
	if(tarajem[ currTarjama ]['dir'] == 'rtl'){
		var cl1 = 'cl_rtl';
	}
	else{
		var cl1 = 'cl_ltr';
		
	}
	var cl = '';
	var t = '';
	for(var i in tarajem[ currTarjama ][ currMosshaf ][ page ]){
		t = tarajem[ currTarjama ][ currMosshaf ][ page ][i]['text'];
		if(! t) continue;
		if(currTarjama == "ar_ma3any"){
			try{
				t = t.replace(/([^>]*)\:/g,'<span style="color:#770000">$1</span>: ');
			}
			catch(e){}
		}
		cl = (count%2)?'odd':'even';
		cl += ' '+cl1
		txt += '<div id="'+ i.split('_')[0]+'_'+ i.split('_')[1] +'__trans" class="'+ cl +'" onmouseover="manOver(this)" onmouseout="manOut(this)"> <span>( ' + i.split('_')[1] + ' ) &nbsp; </span>' + t +'</div>';
		count++;
	}
	/*
	$("#tafsir_widg").clone().attr('id' , 'tafsir_widg_' + img_id).addClass('copy').appendTo("#"+img_id);

	$('#tafsir_widg_' + img_id).html( txt );
	$('#tafsir_widg_' + img_id).css({ top: 30, left: 30, width: width, height: height });
	*/

	$("#trans_widg_holder .trans_widg").clone().attr('id' , 'trans_widg_' + img_id).addClass('copy').appendTo("#"+img_id);
	setTimeout(function(){
		scroll_pane = $('#trans_widg_' + img_id);
		//console.log($('#trans_widg_' + img_id + ' .trans_widg'));
		$('#trans_widg_' + img_id + ' .overview').html( txt );
		$('#trans_widg_' + img_id ).tinyscrollbar();
		
		scroll_pane.port = scroll_pane.find('.viewport');
		scroll_pane.overall = scroll_pane.find('.overview');
		scroll_pane.thumb = scroll_pane.find('.thumb');
		scroll_pane.track = scroll_pane.find('.track');
		hiliteCurrAya();
		
	}, 300);

}




function setCurrTarjama(obj){
	if($(obj).attr('name') == currTarjama) return;
	var prev = currTarjama;
	currTarjama = $(obj).attr('name');
	if(currTarjama == '_hide'){
		$(".overlayer.copy").remove();
		$(".trans_widg.copy").remove();
		if(scroll_pane){
			scroll_pane = false;
		}
		//$(".overlayer_sel.copy").remove();
	}
	else{
		if(prev == '_hide'){
			if(currPage % 2){
				addOverlay("img_left_cont" );
			}
			else{
				addOverlay("img_right_cont");
			}
		}
		//$.get(url_interface+'&do=current&sub=tarjama&state='+currTarjama);
		setCookie('pc_curr_tarjama' , currTarjama , 365 , 'index-2.html' , '' , '');
		getTranslation();
	}
	$.bbq.pushState('trans='+currTarjama);
}

function manOver( obj ){
	if(currMode == 'memorize') return;
	var id = obj.id.split('__')[0];

	$("#"+id+'__hilite_1').addClass('hover');
	$("#"+id+'__hilite_2').addClass('hover');
	$("#"+id+'__hilite_3').addClass('hover');
	
	trans_scrollTo($("#"+id+'__trans').addClass('hover'));
	
}
function manOut( obj ){
	if(currMode == 'memorize') return;
	var id = obj.id.split('__')[0];
	$("#"+id+'__hilite_1').removeClass('hover');
	$("#"+id+'__hilite_2').removeClass('hover');
	$("#"+id+'__hilite_3').removeClass('hover');
	
	$("#"+id+'__trans').removeClass('hover');
}
function ayaClick( obj ){
	if(currMode == 'memorize') return;

	var id = obj.id.split('__')[0];
	if($(obj).hasClass('repeat') || in_repeat_mode){
		repeat_ayaClick(id , obj);
		return;
	}
	stopPlayer();
	setCurrAya(id.split('_')[0] , id.split('_')[1]);
	playAya();
}

function juzSafha(juz){
	return suraSafha( QuranData.Juz[juz][0] , QuranData.Juz[juz][1] );
}
function suraSafha(sura , aya){
	var n = QuranData[page_key].length;
	var aya = aya || 1;
	for(var i=1 ; i<n ; i++){
		if(QuranData[page_key][i][0] > sura || (QuranData[page_key][i][0] == sura && QuranData[page_key][i][1] >= aya) ){
			if(QuranData[page_key][i][0] == sura && QuranData[page_key][i][1] == aya){
				return i;
			}
			return i-1;
		}
	}
}
function suraJuz(sura , aya){
	var n = QuranData.Juz.length;
	var aya = aya || 1;
	for(var i=1 ; i<n ; i++){
		if(QuranData.Juz[i][0] > sura || (QuranData.Juz[i][0] == sura && QuranData.Juz[i][1] >= aya) ){
			if(QuranData.Juz[i][0] == sura && QuranData.Juz[i][1] == aya){
				return i;
			}
			return i-1;
		}
	}
}
function suraHizb(sura , aya){
	var n = QuranData.HizbQaurter.length;
	var aya = aya || 1;
	for(var i=1 ; i<n ; i++){
		if(QuranData.HizbQaurter[i][0] > sura || (QuranData.HizbQaurter[i][0] == sura && QuranData.HizbQaurter[i][1] >= aya) ){
			if(QuranData.HizbQaurter[i][0] == sura && QuranData.HizbQaurter[i][1] == aya){
				return i;
			}
			return i-1;
		}
	}
}
function aya2id(sura , aya){
	var id = 0;
	for(var i=1 ; i< sura ; i++){
		id += QuranData.Sura[i][1];
	}
	id += aya;
	return id;
}
function id2aya(id){
	var i = 1;
	var temp_id = id;
	while(temp_id > 0){
		temp_id -= QuranData.Sura[i++][1];
	}
	var sura = i-1;
	var aya  = QuranData.Sura[sura][1] + temp_id;
	return sura+'_'+aya;
}
function getSuraName(sura){
	if(sura_key == 4 || sura_key == 5){
		return QuranData.Sura[sura][sura_key];
	}
	else if(sura_key == 'bs'){
		return QuranData.Sura_bs[sura];
	}
}
function init_toolbar(){
	// dabt safahat 1
	var i = 0;
	var nass = '';
	nass = '<div class="title">' +_lang['page']+ '[ <span>1 : 300</span> - <a href="javascript:;" onclick="ezherSafahat(2)">301 : 604</a> ] <input type="text" class="fld_goto_page" size="3"> <button class="bu_goto_page">'+_lang['browse']+'</button>  <a href="javascript:;" onclick="hideWidget()" class="close_bu"></a></div>';
	nass += '<div class="middle">';
	var pk = page_key || 'Page';
	
	for(i=1 ; i<= 300 ; i++){
		nass += '<a href="#aya='+QuranData[pk][i][0]+'_'+QuranData[pk][i][1]+'" onclick="gotoPage('+ i +')" id="safha_'+i+'">'+ i + '</a> ';
	}
	nass += '<div style="clear:both"></div>';
	nass += '</div>';
	$("#safahat_1").html(nass);
	// dabt safahat 2
	var nass = '';
	nass = '<div class="title">' +_lang['page']+ '[ <a href="javascript:;" onclick="ezherSafahat(1)">1 : 300</a> - <span>301 : 604</span> ] <input type="text" class="fld_goto_page" size="3"> <button class="bu_goto_page">'+_lang['browse']+'</button> <a href="javascript:;" onclick="hideWidget()" class="close_bu"></a></div>';
	nass += '<div class="middle">';
	for(i=301 ; i<= 604 ; i++){
		nass += '<a href="#aya='+QuranData[pk][i][0]+'_'+QuranData[pk][i][1]+'" onclick="gotoPage('+ i +')" id="safha_'+i+'">'+ i + '</a> ';
	}
	nass += '<div style="clear:both"></div>';
	nass += '</div>';
	$("#safahat_2").html(nass);
	// dabt sowar
	nass = '<div class="title">' +_lang['sura']+ ' : <input type="text" id="fld_srch_sowar" /> <a href="javascript:;" onclick="hideWidget()" class="close_bu"></a></div>';
	nass += '<div class="middle">';
	for(i=1 ; i<=114 ; i++){
		nass += '<a href="#aya='+i+'_'+1+'" onclick="gotoSura('+ i +'); return false;" id="sura_'+ i +'"><span class="num">' + i + '</span>' + getSuraName(i) + '</a> ';
	}
	nass += '<div style="clear:both"></div>';
	nass += '</div>';
	$("#sowar").html(nass);
	// dabt agzaa
	nass = '<div class="title">' +_lang['juz']+ '<a href="javascript:;" onclick="hideWidget()" class="close_bu"></a></div>';
	nass += '<div class="middle">';
	for(i=1 ; i<=30 ; i++){
		nass += '<a href="#aya='+QuranData.Juz[i][0]+'_'+QuranData.Juz[i][1]+'" onclick="gotoJuz('+ i +')" id="juz_'+ i +'">' + i + '</a> ';
	}
	var first_hizb  = (logha == 'ar')?(_lang['hizb'] + ' ' + _lang['first']):(_lang['first'] + ' ' + _lang['hizb']);
	var second_hizb = (logha == 'ar')?(_lang['hizb'] + ' ' + _lang['second']):(_lang['second'] + ' ' + _lang['hizb']);
	nass += '<div style="clear:both"></div>';
	nass += '</div>';
	nass += '<div>&nbsp;</div>';
	nass += '<div class="title">'+_lang['arbaa']+'</div>';
	nass += '<div class="middle" id="wd_hizb">';
	nass += '<div class="wd_hizb">'  + first_hizb +  '</div>';
	for(i=1 ; i<=4 ; i++){
		nass += '<a href="javascript:;" onclick="gotoHizb('+ i +')" id="hizb_'+ i +'">' + i + '</a> ';
	}
	nass += '<div class="wd_hizb">' + second_hizb + '</div>';
	for(i=5 ; i<=8 ; i++){
		nass += '<a href="javascript:;" onclick="gotoHizb('+ i +')" id="hizb_'+ i +'">' + i + '</a> ';
	}
	nass += '<div style="clear:both"></div>';
	nass += '</div>';
	
	$("#agzaa").html(nass);

}
function buildAyatWidget(){
	var sura = currAya.split('_')[0];
	var aya  = currAya.split('_')[1];
	
	var i = 0;
	var n = QuranData.Sura[sura][1];
	var nass = '';
	nass = '<div class="title">' +_lang['aya']+ '<a href="javascript:;" onclick="hideWidget()" class="close_bu"></a></div>';
	nass += '<div class="middle">';
	for(i=1 ; i<=n ; i++){
		nass += '<a href="#aya='+sura+'_'+i+'" onclick="gotoAya('+ sura+','+i +')" id="aya_'+ i +'">'+ i + '</a> ';
	}
	nass += '<div style="clear:both"></div>';
	nass += '</div>';
	$("#ayat").html(nass);
	$("#tb_aya").data("prev" , $("#aya_"+aya).addClass('active') );
}

function showWidget( id ){
	
	if( $('#toolbar_widget').children( '#'+id ).is(":visible") ){
		hideWidget();
		return;
	}
	
	$('#toolbar_widget').children('div').hide();
	// $('#toolbar_widget').css({height:400,display:"block"}) //
	$('#toolbar_widget').show();
	
	$('#toolbar_widget').children( '#'+id ).fadeIn();
}
function hideWidget(){
	$('#toolbar_widget').fadeOut();
}
function ezherSafahat(n){
	var n = (n)?n:(currPage <= 300)?1:2;
	showWidget( 'safahat_'+n );
}
function ezherSowar(){
	showWidget( 'sowar' );
}
function ezherAgzaa(){
	showWidget( 'agzaa' );
}
function ezherAyat(){
	buildAyatWidget();
	showWidget( 'ayat' );
}



function gotoPage( n ){
	if(n == 'next'){
		//if(currMode == 'memorize') return;
		(currMode == 'simple' || currMode == 'memorize')?gotoPage(currPage+2):gotoPage(currPage+1);
		return;
	}
	else if(n == 'prev'){
		//if(currMode == 'memorize') return;
		(currMode == 'simple' || currMode == 'memorize')?gotoPage(currPage-2):gotoPage(currPage-1);
		return;
	}

	if(n > 604 || n < 1) return;
	
	hideWidget();
	
	gotoAya(QuranData[page_key][ n ][0] , QuranData[page_key][ n ][1]);
}
function gotoSura( n ){
	hideWidget();
	gotoAya(n , 1);
}
function gotoAya(sura , aya) {

    if(in_repeat_mode) {
        if(intAya(sura+'_'+aya) < intAya(repeat['begin_aya']) || intAya(sura+'_'+aya) > intAya(repeat['end_aya']) ) {
            repeat_notifyAway();
            return;
        }
        repeated_aya = 0;
        repeat_ayaClick(sura+'_'+aya);
        return;
    }

    hideWidget();
    stopPlayer();
    setCurrAya(sura , aya);
    playAya();
}
function gotoJuz( n ){
	hideWidget();
	gotoAya(QuranData.Juz[ n ][0] , QuranData.Juz[ n ][1]);
}
function gotoHizb( n ){
	hideWidget();
	var j  = suraJuz(currAya.split('_')[0] , currAya.split('_')[1]);
	var h  = n;
	var jh = (j*8)-8+(h*1);
	gotoAya( QuranData.HizbQaurter[jh][0] , QuranData.HizbQaurter[jh][1] );
}
function paddingAya(aya){
	var aya = aya+'';
	if(aya.length < 2){
		return '00' + aya;
	}
	else if(aya.length < 3){
		return '0' + aya;
	}
	return aya;
}




/*-----------------------------------*/

function mOver(obj){
	var id = $(obj).attr('id');
	
	$("#" + id.split('__')[0] + '__hilite_1').addClass('hover');
	$("#" + id.split('__')[0] + '__hilite_2').addClass('hover');
	$("#" + id.split('__')[0] + '__hilite_3').addClass('hover');
}
function mOut(obj){
	var id = $(obj).attr('id');
	$("#" + id.split('__')[0] + '__hilite_1').removeClass('hover');
	$("#" + id.split('__')[0] + '__hilite_2').removeClass('hover');
	$("#" + id.split('__')[0] + '__hilite_3').removeClass('hover');
}
/*---------------- init ---------------------*/




function imgLoaded( page , obj){
	if(currMode == 'memorize') return;

	imgsLoaded[ page ] = true;
	//$(obj).css({zIndex:99 , position:"absolute"});
	imgAfterLoad( page );
}
function imgAfterLoad( page ){
	if(! imgsLoaded[ page ]) return;
	if(page != currPage) return;
	setTimeout(function(){playAya();} , 10);
}

/*-------------------------------*/
function taber(man , title  , content , id) {

    this.man = man;
    this.id = (id)?id:'tb_' + Math.round(Math.random()*100000);

    $("#tabsbar").append('<a href="javascript:;" class="tab_bu" id="'+this.id+'_bu'+'"><span class="title">'+title + '</span><span class="close">&nbsp;</span><span class="min">&nbsp;</span>' +'</a>');
    $("#tabs_widg").append('<div class="tabswidg_sub" id="' +this.id+'_wd' + '">'+content+'</div>');

    this.widg = $("#"+this.id+'_wd');
    this.bu   = $("#"+this.id+'_bu');
    var _this = this;
    this.bu.click( function() {
        _this.toggleTab();
    });
    this.bu.children('span.close').click( function(e) {
    	e.stopPropagation();
        _this.removeTab();
    });
    this.removeTab = function() {
    	this.trigger('close');
        this.man.removeTab(this);
    }
    this.openTab = function() {
        //if(! _this) return;
        if(! this.widg) return;
        
        $("#tabs_widg").children(".tabswidg_sub").hide();
        //$("#tabs_widg").children("#"+this.id+'_wd').show();
        var _this = this;
        $("#tabs_widg").slideDown( function() {
            _this.widg.fadeIn();
        });
        $("#tabsbar").children("a").removeClass('active');
        //$("#tabsbar").children("#"+this.id+'_bu').addClass('active');
        this.bu.addClass('active');

        this.man.setActive(this);
        this.trigger('open');
    }
    this.closeTab = function() {
        $("#tabs_widg").children(".tabswidg_sub").hide();
        $("#tabs_widg").slideUp();
        this.bu.removeClass('active');
		this.trigger('close');
    }
    this.bind = function(e , cb) {
        this.widg.bind(e , cb);
    }
    this.trigger = function(e) {
        this.widg.trigger(e);
    }
    this.toggleTab = function() {
        this.bu.hasClass('active')?this.closeTab():this.openTab();
    }
    this.openTab();
    return this;
}

function tabser() {
    this.tabs = [];
    this.num = 0;
    this.active = '';
    this.addTab = function(title , content , id) {
        if(this.num > 6) {
            for(var i in this.tabs) {
                if(! this.tabs[i])
                    continue;
                this.tabs[i].removeTab();
                break;
            }
        }
        if(this.tabs[id]) {
            this.tabs[id].toggleTab();
            return this.tabs[id];
        }
        var tab = new taber(this , title , content , id);

        this.tabs[ tab.id ] = tab;
        this.num++;
        return tab;
    }
    this.getTBID = function(id) {
        if(this.tabs[id])
            return this.tabs[id];
        return null;
    }
    this.closeTabs = function() {
        for(var i in this.tabs) {
            if(! this.tabs[i])
                continue;
            this.tabs[i].closeTab();
        }
    }
    this.closeTab = function(tab) {
        tab.closeTab();
    }
    this.removeTab = function( tab ) {
        //tab.bu.remove();
        tab.bu.fadeOut( function() {
            $(this).remove();
        });
        tab.trigger('remove');
        tab.widg.remove();
        tab.widg = undefined;
        this.tabs[ tab.id ] = undefined;
        if(tab.id == this.active) {
            $("#tabs_widg").slideUp();

        }
        this.num--;
    }
    this.setActive = function(tab) {
        this.active = tab.id;
    }
}

function search_gotoAya(sura , aya){
	tabsMan.closeTabs();
	gotoAya(sura , aya);
}

async function doSearch() {
  // Retrieve the search query from the search field element
  const query = trim($("#search_fld").val());

  // Check if the search query is less than 2 characters in length
  if (query.length < 2) {
    alert(_lang['search_err_length']);
    return;
  }

  // Retrieve the data from the local JSON file using the fetch function
  const response = await fetch("quran.json");
  const data = await response.json();

  // Use the filter method to search for the query within the data
  const results = data.filter(item => item.text.includes(query) || item.nass_safy.includes(query));

  // Check if there are any search results
  if (results.length === 0) {
    // If there are no search results, display a message to the user
    var nass = '<div class="result_header">' + _lang['search_nores'] + '</div>';
  } else {
    // If there are search results, construct an HTML string containing the results
    var nass =
      '<div class="result_header">' +
      _lang['search_resof'] +
      ' " ' +
      query +
      ' " (' +
      results.length +
      ") </div>";
    var cls = "result_item";
    var n = 1;
    for (const result of results) {
      cls = n++ % 2 === 0 ? "result_item even" : "result_item";
      nass +=
        '<div class="' +
        cls +
        '"> <a href="#aya=' +
        result.sura +
        "_" +
        result.aya +
        '" onclick="search_gotoAya(' +
        result.sura +
        "," +
        result.aya +
        ');return false;" >' +
        getSuraName(result.sura) +
        " - " +
        _lang["aya"] +
        " " +
        result.aya +
        "</a>" +
        result.text +
        "</div>";
    }
  }

  // Add a new tab to the tabs manager object with the search results HTML
  tabsMan.addTab(_lang["search_key"] + " (" + results.length + ")", nass);
}


function doTafsir(author , obj){

	var sura  = currAya.split('_')[0];
	var aya   = currAya.split('_')[1];
	var hp    = 'tafserat/' +  author + '-sura'+sura + '-aya'+aya + '.html';
	var xhr =  $.get(hp);
	var auTrans = {"sa3dy":"saadi","qortoby":"qortobi","e3rab":"eerab"}
	xhr.done(function(bayan){
		var win_url = "https://quran.ksu.edu.sa/tafseer/"+((auTrans[author])?auTrans[author]:author)+"/sura"+sura+"-aya"+aya+".html";
		var nass_meta   = '<div class="tafsir_txt_meta"><button class="bu_tafsir_prev"> &lt; </button> &nbsp; | &nbsp; '+  _lang['sura'] +': <select class="sel_sura_tafsir">' + build_selSowar(sura) + '</select> -' +_lang['aya']+ ': <select class="sel_aya_tafsir">' + build_selAyat(QuranData.Sura[sura][1] , aya) +'</select> -' +_lang['tafaser_key']+ ': <select class="sel_tafaser_tafsir">'+ build_selTafaser(author) +'</select> <button class="bu_tafsir_goto" onclick="gotoTafsir(this)">'+_lang['browse']+'</button> &nbsp; | &nbsp; <button class="bu_tafsir_next"> &gt; </button> </div>';
		var nass_aya    = '<div class="tafsir_txt_aya">' + bayan.split('|||')[0] + '</div>';
		var nass_tafsir = '<div class="tafsir_txt_tafsir">' + bayan.split('|||')[1] + ' <a href="' + win_url + '" target="_blank" class="ip" title="عرض في نافذة مستقلة - للقراءة والطباعة والنشر">' + '<img src="images/newwin.png" align="absmiddle">' + '</a>' + '</div>';
		var nass_footer = '<div class="tafsir_txt_meta tafsir_txt_footer"><button class="bu_tafsir_prev_ft"> &lt; </button> &nbsp; | &nbsp; ' + ' <button class="bu_tafsir_next_ft"> &gt; </button>  </div>';

		var nass = '<div class="tafsir_txt">' + nass_meta + nass_aya + nass_tafsir + nass_footer + '</div>';
 	  
 	    var tab = tabsMan.addTab('<span class="lang" id="lang_tafaser_key">'+_lang['tafaser_key']+'</span>' , nass);

 	    tab.bind('close' , function(){
 	    	$(document).unbind('keyup.tafsir');
 	    });
 	    tab.bind('open' , function(){
 	    	
 	    	$(document).unbind('keyup.tafsir');
	        $(document).bind('keyup.tafsir' , function(event){
                if(event.shiftKey) return;
				if(event.keyCode == 37){
					event.stopPropagation();
					var target = event.target || event.targetElement;
					if(target.tagName.toLowerCase() == 'input' || target.tagName.toLowerCase() == 'textarea') return;
					tab.widg.find(".bu_tafsir_next").click();
					//gotoPage('next');
				}
				else if(event.keyCode == 39){
					event.stopPropagation();
					var target = event.target || event.targetElement;		
					if(target.tagName.toLowerCase() == 'input' || target.tagName.toLowerCase() == 'textarea') return;
					tab.widg.find(".bu_tafsir_prev").click();
				}
			});
 	    });
 	    tab.trigger('open');
	});
	
	/*
	var $obj = $(obj);
	if(! $obj.data('title')) $obj.data('title' , $obj.html() );
	else if($obj.data('title') != $obj.html()){
		$obj.data('xhr').abort();
		$obj.html($obj.data('title'));
		return;
	}
	var title = $obj.data('title');
	
	$obj.html('<img src="images/loading.gif" style="border:none">');
	var sura  = currAya.split('_')[0];
	var aya   = currAya.split('_')[1];
	var hp    = 'tafserat/' +  author + '-sura'+currAya.split('_')[0] + '-aya'+currAya.split('_')[1] + '.html';
	$obj.data('xhr' , $.get(hp));
	
	$obj.data('xhr').done(function(bayan){
		$obj.html(title);
		var nass_meta   = '<div class="tafsir_txt_meta">  السورة : <select class="sel_sura_tafsir" onchange="sel_changed(this)">' + build_selSowar(sura) + '</select> - الآية : <select class="sel_aya_tafsir">' + build_selAyat(QuranData.Sura[sura][1] , aya) +'</select> - التفسير : <select class="sel_tafaser_tafsir">'+ build_selTafaser(author) +'</select> <button class="bu_tafsir_goto" onclick="gotoTafsir(this)">إنتقـــل</button></div>';
		var nass_aya    = '<div class="tafsir_txt_aya">' + bayan.split('|||')[0] + '</div>';
		var nass_tafsir = '<div class="tafsir_txt_tafsir">' + bayan.split('|||')[1] + '</div>';
		var nass = '<div class="tafsir_txt">' + nass_meta + nass_aya + nass_tafsir + '</div>';
		tabsMan.addTab('التفسير' , nass);
		
	});
	*/
	
}
function gotoTafsir(bu){
	var $bu  = $(bu);
	var $obj = $bu.parent();
	var sura = $obj.children('.sel_sura_tafsir').val();
	var aya  = $obj.children('.sel_aya_tafsir').val();
	var author = $obj.children('.sel_tafaser_tafsir').val();
	var $widg_obj = $obj.parent();

	if(! $bu.data('title')) $bu.data('title' , $bu.html() );
	else if($bu.data('title') != $bu.html()){
		$bu.data('xhr').abort();
		$bu.html($bu.data('title'));
		return;
	}
	var title = $bu.data('title');

	$bu.html('<img src="images/loading.gif" style="border:none">');

	var hp    = 'tafserat/' +  author + '-sura'+sura + '-aya'+aya + '.html';
	$bu.data('xhr' , $.get(hp));

	var auTrans = {"sa3dy":"saadi","qortoby":"qortobi","e3rab":"eerab"}
	
	$bu.data('xhr').done(function(bayan){
		$bu.html(title);
		var win_url = "https://quran.ksu.edu.sa/tafseer/"+((auTrans[author])?auTrans[author]:author)+"/sura"+sura+"-aya"+aya+".html";

		$widg_obj.find('.tafsir_txt_aya').html(bayan.split('|||')[0]);
		$widg_obj.find('.tafsir_txt_tafsir').html(bayan.split('|||')[1] + ' <a href="' + win_url + '" target="_blank" class="ip" title="عرض في نافذة مستقلة - للقراءة والطباعة والنشر">' + '<img src="images/newwin.png" align="absmiddle">' + '</a>' );
	});
	
}
function sel_changed(sel){
	var $sel = $(sel);
	var $obj = $sel.parent();
	$obj.children('.sel_aya_tafsir').html( build_selAyat( QuranData.Sura[ $sel.val() ][1] , 1 ) );
	
}
function build_selTafaser(seld){
	var seld = seld || 0;
	var str = '';
	var n  = '';
	var i = 1;
	for(var i in tafaser){
		if(i == seld) str += '<option value="'+i+'" selected="selected">' + tafaser[i] + '</option>';
		else str += '<option value="'+i+'">' + tafaser[i] + '</option>';
		//else str += '<option value="'+i+'">' + QuranData['Sura'][i][4] + '</option>';
	}
	return str;
	
}
function build_selSowar(seld , start){
	var seld = seld || 0;
	var str = ''; //'<option value="فضلا إختر السورة" data-placeholder="true"> فضلا إختر السورة  </option>';
	var n  = '';
	var i = start || 1;
	var n = 114;
	for(i ; i <= n ; i++){
		if(i == seld) str += '<option value="'+i+'" selected="selected">' + i + '. ' + getSuraName(i) + '</option>';
		else str += '<option value="'+i+'">' + i + '. ' + getSuraName(i) + '</option>';
	}
	return str;
}
function build_selAyat(num , seld , start){

	var seld = seld || 0;
	var str = ''; //'<option value="فضلا إختر السورة" data-placeholder="true"> فضلا إختر السورة  </option>';
	var i = start || 1;
	for(i ; i <= num ; i++){
		if(i == seld) str += '<option value="'+i+'" selected="selected">' + i + '</option>';
		else str += '<option value="'+i+'">' + i + '</option>';
		//else str += '<option value="'+i+'">' + i + '</option>';
	}
	//$("#"+id).empty();
	return str;
}

function build_selPages(seld , start) {
    var seld = seld || 0;
    var str = ''; //'<option value="فضلا إختر السورة" data-placeholder="true"> فضلا إختر السورة  </option>';
    var n  = '';
    var i = start || 1;
    var n = 604;
    for(i ; i <= n ; i++) {
        if(i == seld)
            str += '<option value="'+i+'" selected="selected">' + i + '</option>';
        else
            str += '<option value="'+i+'">' + i + '</option>';
    }
    return str;
}
function getKeyFromQaree(qaree){
	for(var i in quraa_map){
		if(quraa_map[i] == qaree){
			return i;
		}
	}
	return 'husary';
}
function setQaree(obj){	
	var q_key = $(obj).attr("name");
	if(currQareeKey == q_key) return;
	
	if(quraa_map[q_key]){
		currQareeKey = q_key;
	}
	else{
		currQareeKey = getKeyFromQaree(q_key);
	}
	
	
	currQaree = quraa_map[currQareeKey];
	
	mp3url = base_mp3url + '/' + currQaree + '/';
	
	//$.get(url_interface+'&do=current&sub=qaree&state='+currQaree);
	setCookie('pc_curr_qaree' , currQareeKey , 365 , 'index-2.html' , '' , '');
	$.bbq.pushState('qaree=' + currQareeKey);
	if(! in_repeat_mode){
		stopPlayer();
		playAya();
		//set_globalPlay(1);
	}
}



tabsMan = new tabser();

function hr_moveTo(p , obj){
	$('.hr_ctrl').removeClass('active')
	$(obj).addClass('active');
	
	$("#hr_mohtawa_sub").animate({top: -p} , 900 , 'easeOutQuart');
}

function set_globalPlay(st){
	if(globalPlay == st) return;
	globalPlay = st;
	//$.get(url_interface+'&do=current&sub=play_state&state='+st);
	if(st) playAya();
}

function toggle_repeatWidg(show){
	if( $("#repeat_widg").is(":visible") ){
		if(show) return;
		if(! in_repeat_mode) $(".jp-repeat").removeClass('active');
		$("#repeat_widg").fadeOut();
		$(document).unbind('click.repeat');
	}
	else{
		
		$(".jp-repeat").addClass('active');
		$("#repeat_widg").fadeIn(500,function(){
		/////////////////////////////
			if(! in_repeat_mode){
				var sura = currAya.split('_')[0];
				var aya  = currAya.split('_')[1];
				if(! $("#repeat_sel_begin_sura").html()){
					$("#repeat_sel_begin_sura").html(build_selSowar(sura));
				}
				else{
					$("#repeat_sel_begin_sura").val(sura);
				}
				
				$("#repeat_sel_begin_aya").html(build_selAyat(QuranData.Sura[sura][1] , aya) );
				$("#repeat_sel_end_sura").html(build_selSowar(sura, sura));
				$("#repeat_sel_end_aya").html(build_selAyat(QuranData.Sura[sura][1] , aya , aya) );
			}

			$(document).bind('click.repeat' , function(){
				toggle_repeatWidg();
			});
			$("#repeat_widg").bind('click' , false);
		});
	}
}


function repeat_updEndSel(){
	
	var sura = $("#repeat_sel_begin_sura").val();
	var aya  = $("#repeat_sel_begin_aya" ).val();
	
	$("#repeat_sel_end_sura").html(build_selSowar(sura , sura));
	$("#repeat_sel_end_aya").html(build_selAyat(QuranData.Sura[sura][1] , aya , aya));
}
function repeat_updBeginAyat(){
	
	var sura = $("#repeat_sel_begin_sura").val();
	$("#repeat_sel_begin_aya").html(build_selAyat(QuranData.Sura[sura][1]));
}
function repeat_updEndAyat(){
	
	var sura = $("#repeat_sel_end_sura").val();
	$("#repeat_sel_end_aya").html(build_selAyat(QuranData.Sura[sura][1]));
}
repeat = {};
function init_repeat(){
	repeat = {};
	in_repeat_mode = false;
	
	$("#repeat_widg").find("input,select,button").each(function(){
		this.disabled = false;
	});
	repeat_setMsg('');
	$("#repeat_cancel_bu")[0].disabled = true;

}

function repeat_selBegin(){
	$("#repeat_step").html('خطوة 1 من 4');
	$("#repeat_msg").html('فضلا إختر آية البدء');
	$("#repeat_hint").html('إضغط على الآية المراد البدء بها *');
	$(".hiliter.copy").addClass('repeat');
	$("#repeat_bu").unbind();

	$("#repeat_bu").text('التالي');
	$("#repeat_bu")[0].disabled = true;
	
}

in_repeat_mode = false;
function repeat_ayaClick(aya , obj){
	var _aya = aya;
	var _obj = obj;
		
	if(! repeat['begin_aya']){
		$('.hiliter.copy.r_begin').removeClass('r_begin');

		$( '#'+_aya+'__hilite_1').addClass('r_begin');
		$( '#'+_aya+'__hilite_2').addClass('r_begin');
		$( '#'+_aya+'__hilite_3').addClass('r_begin');
		
		$("#repeat_bu").unbind();
		$("#repeat_bu")[0].disabled = false;
		$("#repeat_msg").html('آية البدء : سورة -  ' + getSuraName( _aya.split('_')[0] ) + ' آية : '+_aya.split('_')[1])
		$("#repeat_bu").click(function(){
			$("#repeat_step").html('خطوة 2 من 4');
			repeat['begin_aya'] = _aya;
			$("#repeat_msg").html('فضلا إختر آية الإنتهاء');
			$("#repeat_hint").html('إضغط على الآية المراد الانتهاء عندها *');
			this.disabled = true;
		});
	}
	else if(! repeat['end_aya']){
		if(intAya(_aya) < intAya(repeat['begin_aya']) ){
			$("#repeat_hint").html('عفوا لا يمكن ان تكون آية الانتهاء سابقة لآية البدء');
			return;
		}
		$('.hiliter.copy.r_end').removeClass('r_end');
		$( '#'+_aya+'__hilite_1' ).addClass('r_end');
		$( '#'+_aya+'__hilite_2' ).addClass('r_end');
		$( '#'+_aya+'__hilite_3' ).addClass('r_end');
		
		$("#repeat_bu").unbind();
		$("#repeat_bu")[0].disabled = false;

		$("#repeat_msg").html('آية الإنتهاء : سورة -  ' + getSuraName( _aya.split('_')[0] ) + ' آية : '+_aya.split('_')[1])
		$(".hiliter.copy").removeClass('repeat');
			
		$("#repeat_bu").click(function(){
			repeat['end_aya'] = _aya;
			$("#repeat_step").html('خطوة 3 من 4');
			$("#repeat_msg").html('فضلا أدخل عدد مرات التكرار لكل آية');
			$("#repeat_input").val(3);
			$("#repeat_hint").html('أدخل مرات التكرار وإختر مدة الإنتظار بين كل آية * ');
			$("#repeat_input_cont").show();
			$("#repeat_sel_cont").css({display:""});
			this.disabled = false;
			$(this).unbind();
			$(this).click(function(){
				set_repeatForAya();
			});
		});
	}
	else if(in_repeat_mode){
		if(intAya(_aya) < intAya(repeat['begin_aya']) || intAya(_aya) > intAya(repeat['end_aya']) ){
			repeat_notifyAway();
			return;
		}
		stopPlayer();
		setCurrAya(_aya.split('_')[0] , _aya.split('_')[1]);
		repeated_aya = 0;
		playAya();
	}
}

function set_repeatForAya(){
	repeat['for_aya'] = Number($("#repeat_input").val())  || 0;
	repeat['waiting'] = Number($("#repeat_select").val()) || 0;
	$("#repeat_input").val('1');
	$("#repeat_step").html('خطوة 4 من 4');
	$("#repeat_msg").html('فضلا أدخل عدد مرات التكرار للفقرة المحددة');
	$("#repeat_hint").html(' الفقرة هى من آية البدء إلى آية الإنتهاء *');
	$("#repeat_sel_cont").css({display:"none"});
	$("#repeat_bu").unbind();
	$("#repeat_bu").click(function(){
		set_repeatForAll();
	});
}
function set_repeatForAll(){
	repeat['for_all'] = Number($("#repeat_input").val()) || 0;
	$("#repeat_input").val('');
	$("#repeat_hint").html('');
	$("#repeat_msg").html('تم تهيئة التكرار');
	$("#repeat_input_cont").hide();
	$("#repeat_bu").html('ابدء التشغيل');
	$("#repeat_bu").unbind();
	$("#repeat_bu").click(function(){
		startRepeat();
	});
}
function repeat_setMsg(msg , force){
	if(in_repeat_mode && ! force){
		return;
	}
	$("#repeat_msg").html(msg);
}
function startRepeat(){
	repeat['begin_aya'] = $("#repeat_sel_begin_sura").val() + '_' + $("#repeat_sel_begin_aya").val();
	repeat['end_aya']   = $("#repeat_sel_end_sura").val() + '_' +   $("#repeat_sel_end_aya").val();
	repeat['waiting']   = Number($("#repeat_waiting").val());
	repeat['for_aya']   = Number($("#repeat_for_aya").val()) || 0;
	repeat['for_all']   = Number($("#repeat_for_all").val()) || 0;

	setCurrAya(repeat['begin_aya'].split('_')[0] , repeat['begin_aya'].split('_')[1]);
	playAya();
	set_globalPlay(1);

	in_repeat_mode = true;

	$("#repeat_widg").find("input,select,button").each(function(){
		this.disabled = 1;
	});
	repeat_setMsg('التكرار يعمل الآن' , true);
	$("#repeat_cancel_bu")[0].disabled = false;
	toggle_repeatWidg();

}
function stopRepeat(hide){
	if(repeat['tOut']) clearTimeout(repeat['tOut']);
	init_repeat();
	if(hide) toggle_repeatWidg();
	$(".jp-repeat").removeClass('active');

	$(".hiliter.copy").removeClass('repeat');
	$(".hiliter.copy").removeClass('r_begin');
	$(".hiliter.copy").removeClass('r_end');
	stopPlayer();
}
function repeat_notifyAway(){
	//$("#repeat_widg").show();
	$("#repeat_msg").html('عفوا لابد من ايقاف التكرار للتتمكن من الانتقال');
	
	toggle_repeatWidg(true);
	

}
function repeat_verify(obj){
	var val = Number($(obj).val()) || 0;
	if(val < 0) val = 0;
	$(obj).val( val );
}
repeated_aya = 0;
repeated_all = 0;
function repeat_ayaEnded(duration){
	var waiting = (Math.round(duration)*repeat['waiting'])*1000;
	repeat['tOut'] = setTimeout(function(){
		
		
		if(++repeated_aya > repeat['for_aya']){
			var next = setNextAya(true);
			if(next == '1_1' || (intAya(next) > intAya(repeat['end_aya']) ) ){
				setCurrAya(repeat['begin_aya'].split('_')[0] , repeat['begin_aya'].split('_')[1]);
				if(++repeated_all > repeat['for_all']){
					set_globalPlay(0);
					stopPlayer();
					setCurrAya(repeat['begin_aya'].split('_')[0] , repeat['begin_aya'].split('_')[1]);
					hiliteCurrAya();
					repeated_all = 0;
					repeated_aya = 0;
					return true;
				}
			}
			else{
				setNextAya();
			}

			repeated_aya = 0;
		}
		playAya(Boolean(repeated_aya));
	} , waiting );
}
/*--------------------------------------*/
memorize_inited = false
function init_memorize(){
	if(! memorize_inited){
		var sura = 1;//currAya.split('_')[0];
		var aya  = 1;//currAya.split('_')[1];
		
		$("#m_sowar_from").html(build_selSowar(sura, 1));
		$("#m_ayat_from").html(build_selAyat(QuranData.Sura[sura][1], 1) );
		$("#m_pages_from").html(build_selPages() );

		$("#m_sowar_to").html(build_selSowar(114));
		$("#m_ayat_to").html(build_selAyat(QuranData.Sura[114][1], 6));
		$("#m_pages_to").html(build_selPages(604) );

	    $("#m_pages_from").change(function(){
	    	var v = $(this).val();
	    	$("#m_sowar_from").val(QuranData[page_key][v][0]);
	    	$("#m_sowar_from").change();
	    	
	    	$("#m_ayat_from").val(QuranData[page_key][v][1]);
	    	$("#m_ayat_from").change();
	    });
	    $("#m_pages_to").change(function(){
	    	var v = parseInt($(this).val())+1;
	    	var sura = QuranData[page_key][v][0];
	    	var aya  = QuranData[page_key][v][1];
	    	if(aya > 1) aya--;
	    	else{
	    		sura--;
	    		aya = QuranData.Sura[sura][1];
	    	}
	    	$("#m_sowar_to").val(sura);
	    	$("#m_sowar_to").change();
	    	
	    	$("#m_ayat_to" ).val(aya);
	    	$("#m_ayat_to" ).change();
	    });

		
		$("#m_sowar_from").live('change',function(){
			memorize_updBeginAyat();
			memorize_updEndSel();
		});
		$("#m_ayat_from").live('change',function(){
			$("#m_pages_from").val(suraSafha($("#m_sowar_from").val() , $("#m_ayat_from").val() ));
			memorize_updEndSel();
		});
		$("#m_sowar_to").live('change',function(){
			memorize_updEndAyat();
		});
		$("#m_ayat_to").live('change',function(){
			$("#m_pages_to").val(suraSafha($("#m_sowar_to").val() , $("#m_ayat_to").val() ));
		});

		//$(".memorize_widg").find('.m_sowar select').html( build_selSowar() );
		memorize_inited = true;
	}
}
function memorize_updEndSel(cont){
	
	var sura = $("#m_sowar_from").val();
	var aya  = $("#m_ayat_from" ).val();
	$("#m_sowar_to").html(build_selSowar(sura , sura));
	$("#m_ayat_to").html(build_selAyat(QuranData.Sura[sura][1] , QuranData.Sura[sura][1] , aya));
	$("#m_pages_to").html(build_selPages(suraSafha(sura,QuranData.Sura[sura][1]) ,  suraSafha(sura,aya) ));
}
function memorize_updBeginAyat(cont){
	var sura = $("#m_sowar_from").val();
	$("#m_ayat_from").html(build_selAyat(QuranData.Sura[sura][1]));
	$("#m_pages_from").html(build_selPages(suraSafha(sura,1)));
}
function memorize_updEndAyat(cont){
	var sura = $("#m_sowar_to").val();
	var aya  = $("#m_ayat_to" ).val();
	$("#m_ayat_to").html(build_selAyat(QuranData.Sura[sura][1] , QuranData.Sura[sura][1] ));
    $("#m_pages_to").val(suraSafha(sura,QuranData.Sura[sura][1]) ,  suraSafha(sura,aya) );

}


function memorize_question(){
	var from_sura = Number($('#m_sowar_from').val());
	var from_aya = Number($('#m_ayat_from').val());
	var to_sura = Number($('#m_sowar_to').val());
	var to_aya = Number($('#m_ayat_to').val());

	var from_id = aya2id(from_sura , from_aya);
	var to_id   = aya2id(to_sura , to_aya);
	
	var id = rand(from_id , to_id);
	var suraAya = id2aya(id);
	var sura = suraAya.split('_')[0];
	var aya  = suraAya.split('_')[1];
	var i = 0;
	while(excludeFromTest(sura,aya) && i++<30){
		id = rand(from_id , to_id);
		suraAya = id2aya(id);
		sura = suraAya.split('_')[0];
		aya  = suraAya.split('_')[1];
	}

	$('.img_cont').css('visibility','hidden');
	memorize_loadAya(sura,aya);
}
memorize_currAya = '';
function memorize_loadAya(sura,aya){
	memorize_currAya = sura+'_'+aya;
	var page = suraSafha(sura, aya);
	loadPage(page);
}
function excludeFromTest(sura,aya){
	if(isLastAya(sura,aya)) return true;
	
	var ayat = ['37_152','107_4'];
	var aya  = sura+'_'+aya;
	for(var i in ayat){
		if(aya == ayat[i]) return true;
	}
	return false;
}
function isLastAya(sura,aya){
	var safha = suraSafha(sura , aya);
	if(++aya > QuranData.Sura[sura][1]){
		return true;
	}

	var next_safha = suraSafha(sura , aya);
	
	if((safha != next_safha) && !(safha%2) ){
		return true;
	}
	return false;
}
memo_ans_tog = false;
function memorize_answer(){
	if(memo_ans_tog){
		$(".hiliter.memorize").removeClass('reveal');
		memo_ans_tog = false;
	}
	else{
		$(".hiliter.memorize").addClass('reveal');
		memo_ans_tog = true;		
	}
}
function memorize_manOver( obj ){
	var id = obj.id.split('__')[0];
	if($("#"+id+'__hilite_1').hasClass('active') || $("#"+id+'__hilite_1').hasClass('click')){
		return;
	}
	$("#"+id+'__hilite_1,'+"#"+id+'__hilite_2,'+"#"+id+'__hilite_3').stop().fadeTo(7000,0);
	
}
function memorize_manOut( obj ){
	var id = obj.id.split('__')[0];
	if($("#"+id+'__hilite_1').hasClass('active') || $("#"+id+'__hilite_1').hasClass('click')){
		return;
	}
	$("#"+id+'__hilite_1,'+"#"+id+'__hilite_2,'+"#"+id+'__hilite_3').stop().fadeTo(300,1);
}
function memorize_ayaClick( obj ){
	var id = obj.id.split('__')[0];
	if($("#"+id+'__hilite_1').hasClass('click')){
		$("#"+id+'__hilite_1,'+"#"+id+'__hilite_2,'+"#"+id+'__hilite_3').removeClass('click');
		$("#"+id+'__hilite_1,'+"#"+id+'__hilite_2,'+"#"+id+'__hilite_3').stop().css('opacity',99);		
		
	}
	else{
		$("#"+id+'__hilite_1,'+"#"+id+'__hilite_2,'+"#"+id+'__hilite_3').addClass('click');
		$("#"+id+'__hilite_1,'+"#"+id+'__hilite_2,'+"#"+id+'__hilite_3').stop().css('opacity',0);		
	}
}

function openContact(){	
	tabsMan.addTab(_lang['contact_title'] , '<div class="contact_cont">' + $("#contact").html() + '</div>');
}
function openEmbed(){	
	tabsMan.addTab(_lang['embed_title'] , '<div class="embed_cont">' + $("#embed").html() + '</div>');
}
function openInfo(){	

	tabsMan.addTab(_lang['info_title'] , '<div class="info_cont">' + $("#info").html() + '</div>');
}
function sendMsg(obj){
	
	var $obj = $(obj);
	var $obj_cont = $obj.parents('.contact_cont');
	
	if(! $obj.data('title')) $obj.data('title' , $obj.html() );
	else if($obj.data('title') != $obj.html()){
		$obj.data('xhr').abort();
		$obj.html($obj.data('title'));
		return;
	}
	var title = $obj.data('title');
	
	$obj.html('<img src="images/loading.gif" style="border:none">');
	var esm   = $obj_cont.find(".ct_esm").val();
	var email = $obj_cont.find(".ct_email").val();
	var msg   = $obj_cont.find(".ct_msg").val();
	var hp    = url_interface + '&do=feedback&l='+logha;
	
	$obj.data('xhr' , $.post(hp,{esm:esm, email:email, msg:msg}) );
	
	$obj.data('xhr').done(function(bayan){
		$obj.html($obj.data('title'));
		var err = Number(bayan.err);
		if(err){
			$obj_cont.find(".ct_bayan").html(bayan.msg);
			$obj_cont.find(".ct_bayan").fadeIn('slow').delay(2000).fadeOut('fast');
		}
		else{
			//$obj_cont.find("input").get(0).disabled = 1;
			$obj.hide();
			$obj_cont.find(".ct_bayan").html( _lang['contact_done'] );
			$obj_cont.find(".ct_bayan").fadeIn('slow');
		}
	});

}
/*--------------------------------------*/
ln_tmr = 0;
function viewLangs(){
	$("#langs_pane").show();
	if(ln_tmr) clearTimeout(ln_tmr);
}
function hideLangs(tmr){
	ln_tmr = setTimeout(function(){$("#langs_pane").hide();} , tmr || 1000);
}
proj_tmr = 0;
function viewProj(){
	$("#proj_pane").show();
	if(proj_tmr) clearTimeout(proj_tmr);
}
function hideProj(tmr){
	proj_tmr = setTimeout(function(){$("#proj_pane").hide();} , tmr || 1000);
}

//currMode = 'advanced';
mosshafSeld = false;
function set_mosshaf(mosshaf){
	if(mosshaf == currMosshaf && mosshafSeld) return;
	
	currMosshaf = mosshaf;
	page_key = masahef[mosshaf]['page_key'];
	imgs_url = masahef[mosshaf]['url'];
	imgs_ext = masahef[mosshaf]['ext'];

	/*
	if(mosshaf == 'warsh'){
		imgs_url  = 'warsh/';
		imgs_ext  = 'png';
		page_key = 'Page_warsh';
		var h = 760;
	}
	else{
		imgs_url  = 'safahat/tajweed_gif/';
		imgs_ext  = 'gif';
		page_key = 'Page';
		var h = 760;
	}
	*/
	$.bbq.pushState('m='+mosshaf);

	if(mosshafSeld){
		//$.fn.booklet.opts.height = h;
		$("#book").height(masahef[currMosshaf]['height']);
		$.fn.booklet.interfaces[0].options.height  = masahef[currMosshaf]['height'];
		$.fn.booklet.interfaces[0].options.pHeight = masahef[currMosshaf]['height'];
		currPage = 0;
		set_mode('advanced' , true);
		//$("#book,#book .b-load,#book .b-page").height(h);
	}
	mosshafSeld = true;
}
modeInited = false;
function set_mode(mode , force){
	if(mode == currMode && modeInited && ! force) return;
	modeInited = true;
	currMode = mode;
	if(mode == 'simple' || mode == 'memorize'){
		$(".adv_only" ).hide();
		$(".simp_only").show();

		setTimeout(function(){
			$(".simp_only .mode a").mouseover();
			$(".simp_only .mode a").mouseout();
		},1000);

		$("#header_container").hide();
		$("#help").hide();
		removeOverlays();
		tabsMan.closeTabs();
		hideWidget();
		stopPlayer();
		set_globalPlay(0);
		stopRepeat();
		$("#tabsbar").hide();
		$("#footer").hide();
		if(mode == 'memorize'){
			$("#memorize_widg").show();

			init_memorize();

			memorize_question();
		}
		else{
			$("#memorize_widg").hide();
			gotoAya(currAya.split('_')[0] , currAya.split('_')[1]);
		}

	}
	else if(mode == 'advanced'){
		
		$("#modes_selector.selobj ul li a[name='"+currMode+"']").click();

		$(".adv_only" ).show();
		$(".simp_only").hide();

		$("#memorize_widg").hide();
        removeOverlays();
		//trace(11111111111);
        $("#header_container").show();
        //currAya = '0_0';
        loadAya(currAya.split('_')[0] , currAya.split('_')[1]);
        //gotoAya(currAya.split('_')[0] , currAya.split('_')[1]);
        //manOverlays();
        //hiliteCurrAya();
        $("#tabsbar").show();
        $("#footer").show();
	}
}
function trans_scrollTo($item){
	if(! scroll_pane || ! $item[0]) return;
	var $port = scroll_pane.port;
	var $overall = scroll_pane.overall;
	var $thumb = scroll_pane.thumb;
	var $track = scroll_pane.track;
	
	var r_trk = ($thumb[0].offsetHeight/$track[0].offsetHeight);
	
	
	var itemT = $item[0].offsetTop;
	var itemH = $item[0].offsetHeight;
	
	var t1 = - parseInt($overall[0].style.top);
	var t2 = t1 + $port[0].offsetHeight;
	
	if(itemT < t1){
		var T = - (itemT) + 10
		//scroll_pane.tinyscrollbar_update(itemT);
		$overall.stop();
		$overall.clearQueue();
		$overall.animate({ top : T });
		
		$thumb.stop();
		$thumb.clearQueue();
		$thumb.animate({ top : itemT * r_trk });
	}
	else if( (itemT+itemH) > t2){
		var T = (itemT+itemH) - $port[0].offsetHeight + 10;
		//scroll_pane.tinyscrollbar_update((itemT+itemH) - $port[0].offsetHeight);
		$overall.stop();
		$overall.clearQueue();
		$overall.animate({ top : - T });
		
		$thumb.stop();
		$thumb.clearQueue();
		$thumb.animate({ top : T*(r_trk) });
		
	}

}
function set_pb_trans(v){
	if(! v || v.toLowerCase() == "off"){
		v = "Off";
		pb_trans = false;
		$.bbq.removeState('pb');
	}
	else{
		pb_trans = v;
		$.bbq.pushState('pb='+v);
	}
	$("#qaree_selector ul li a[name="+currQareeKey+"] b.pb_trans u").html(v);
}

function intAya(aya){
	var sura = String(aya.split('_')[0]);
	var aya  = String(aya.split('_')[1]);
	if(aya.length < 2){
		aya = '00'+aya;
	}
	else if(aya.length < 3){
		aya = '0'+aya;
	}
	return Number( sura+''+aya );
}
function rand(x,y){
	return Math.floor(Math.random() * (y - x + 1) + x);
}
function trim(str) {
	return $.trim(str);
}

function setCookie( name, value, expires, path, domain, secure ){

	var today = new Date();
	today.setTime( today.getTime() );
	
	if ( expires ){
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	
	document.cookie = name + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
	( ( path ) ? ";path=" + path : "" ) +
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
}

function getCookie( check_name ) {
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false;

	for ( i = 0; i < a_all_cookies.length; i++ ){

		a_temp_cookie = a_all_cookies[i].split( '=' );
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
		if ( cookie_name == check_name ){
			b_cookie_found = true;
			if ( a_temp_cookie.length > 1 ){
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )	{
		return null;
	}
}



pb1 = 0;
pb2 = 0;

var FlashDetect=new function(){var self=this;self.installed=false;self.raw="";self.major=-1;self.minor=-1;self.revision=-1;self.revisionStr="";var activeXDetectRules=[{"name":"ShockwaveFlash.ShockwaveFlash.7","version":function(obj){return getActiveXVersion(obj);}},{"name":"ShockwaveFlash.ShockwaveFlash.6","version":function(obj){var version="6,0,21";try{obj.AllowScriptAccess="always";version=getActiveXVersion(obj);}catch(err){}
return version;}},{"name":"ShockwaveFlash.ShockwaveFlash","version":function(obj){return getActiveXVersion(obj);}}];var getActiveXVersion=function(activeXObj){var version=-1;try{version=activeXObj.GetVariable("$version");}catch(err){}
return version;};var getActiveXObject=function(name){var obj=-1;try{obj=new ActiveXObject(name);}catch(err){obj={activeXError:true};}
return obj;};var parseActiveXVersion=function(str){var versionArray=str.split(",");return{"raw":str,"major":parseInt(versionArray[0].split(" ")[1],10),"minor":parseInt(versionArray[1],10),"revision":parseInt(versionArray[2],10),"revisionStr":versionArray[2]};};var parseStandardVersion=function(str){var descParts=str.split(/ +/);var majorMinor=descParts[2].split(/\./);var revisionStr=descParts[3];return{"raw":str,"major":parseInt(majorMinor[0],10),"minor":parseInt(majorMinor[1],10),"revisionStr":revisionStr,"revision":parseRevisionStrToInt(revisionStr)};};var parseRevisionStrToInt=function(str){return parseInt(str.replace(/[a-zA-Z]/g,""),10)||self.revision;};self.majorAtLeast=function(version){return self.major>=version;};self.minorAtLeast=function(version){return self.minor>=version;};self.revisionAtLeast=function(version){return self.revision>=version;};self.versionAtLeast=function(major){var properties=[self.major,self.minor,self.revision];var len=Math.min(properties.length,arguments.length);for(i=0;i<len;i++){if(properties[i]>=arguments[i]){if(i+1<len&&properties[i]==arguments[i]){continue;}else{return true;}}else{return false;}}};self.FlashDetect=function(){if(navigator.plugins&&navigator.plugins.length>0){var type='application/x-shockwave-flash';var mimeTypes=navigator.mimeTypes;if(mimeTypes&&mimeTypes[type]&&mimeTypes[type].enabledPlugin&&mimeTypes[type].enabledPlugin.description){var version=mimeTypes[type].enabledPlugin.description;var versionObj=parseStandardVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revisionStr=versionObj.revisionStr;self.revision=versionObj.revision;self.installed=true;}}else if(navigator.appVersion.indexOf("Mac")==-1&&window.execScript){var version=-1;for(var i=0;i<activeXDetectRules.length&&version==-1;i++){var obj=getActiveXObject(activeXDetectRules[i].name);if(!obj.activeXError){self.installed=true;version=activeXDetectRules[i].version(obj);if(version!=-1){var versionObj=parseActiveXVersion(version);self.raw=versionObj.raw;self.major=versionObj.major;self.minor=versionObj.minor;self.revision=versionObj.revision;self.revisionStr=versionObj.revisionStr;}}}}}();};FlashDetect.JS_RELEASE="1.0.4";


$(function() {
	// hinit start //

	$("#preload").fadeOut(function(){
		$("#root").show();
	});
	
	if(false && ! getCookie('new_msg')){
		if(! navigator.userAgent.match(/msie [2-8]/i)){
			setTimeout(function(){
				a = alertt(_lang['new_msg'] , '----');
				setCookie('new_msg' , 1 , 3 , 'index-2.html' , '' ,'');
	
			} , 9000);
		}		
	}
	
	init_toolbar();
	
	var c_aya = $.bbq.getState('aya') || getCookie('pc_curr_aya')  || '1_1';
	



	setCurrAya(c_aya.split('_')[0] , c_aya.split('_')[1]);


	
	/*dfds['player_ready'].done(function(){
		dfds['hilites_ready'].done(function(){
			playAya();
			//hiliteCurrAya(currAya);
		});
	});*/
	
	
	//setTimeout(function(){loadAya(currAya.split('_')[0] , currAya.split('_')[1]);hiliteCurrAya()} , 100)
	//loadAya(currAya.split('_')[0] , currAya.split('_')[1]);

	$(window).keyup(function(event){
        if(event.shiftKey) return;

		if(event.keyCode == 37){
			var target = event.target || event.targetElement;
			if(target.tagName.toLowerCase() == 'input' || target.tagName.toLowerCase() == 'textarea') return;
			gotoPage('next');
		}
		else if(event.keyCode == 39){
			var target = event.target || event.targetElement;		
			if(target.tagName.toLowerCase() == 'input' || target.tagName.toLowerCase() == 'textarea') return;
			gotoPage('prev');
		}
	});
	
	
	$("#search_fld").keydown(function(event){
		if(event.keyCode == 13){
			event.stopPropagation();	
			event.preventDefault();
			doSearch();
		}
		
	});

	$(".selobj ul li a").live('click' , function(){
		$(this).parents('ul').find('a').removeClass('active');
		$(this).addClass('active');
		$(this).parents(".selobj").children('ul').slideUp();
		if(! $(this).parents(".selobj").children('a.title').hasClass('static') ){
			$(this).parents(".selobj").children('a.title').html( $(this).html() );
		}

	});
	$(".selobj a.title").live('click' , function(e){
		
		$this = $(this);
 		if(! $this.data('id')) $this.data('id' , rand(1,1000));
		var $ul = $this.parent(".selobj").children("ul");
		if($ul.is(":visible")){
			$ul.slideUp();
			$(document).unbind('click.selobj_'+$this.data('id'));
		}
		else{
			setTimeout(function(){
				$(document).one('click.selobj_'+$this.data('id') , function(e){
					e.stopPropagation();
					$ul.slideUp();
					//$(document).unbind('click.selobj_'+$this.data('id'));
				});
				
			} , 10)
			$ul.slideDown();

		}
	});

	currMosshaf = $.bbq.getState('m') || getCookie('pc_curr_mosshaf') || 'hafs';
	
	if(! masahef[currMosshaf]) currMosshaf = 'hafs';
	var bh = masahef[currMosshaf]['height'];
	$('#book').booklet({startingPage:2,direction:'rtl', keyboard:false, pageNumbers: false, width:950, height:bh, hovers: false, overlays:false, 
    	before:function(a){
			unloadImg();
    	},

    	after:function(a){
    		loadImg();
    	}
	});

	tarajem_map = {"ar":"ar_mu","en":"en_sh","fr":"fr_ha","bs":"bs_korkut","tr":"tr_diyanet","de":"de_bo","es":"es_navio","it":"it_piccardo","id":"id_indonesian","ms":"ms_basmeih","ru":"ru_ku","ku":"ku_asan","ur":"ur_gl","zh":"zh_jian" , "pr":"pr_tagi" , "bn":"bn_bengali" , "pt":"pt_elhayek"};

    currTarjama = $.bbq.getState('trans') || tarajem_map[logha] || 'ar_mu';
	if(currTarjama == 'es_cortes') currTarjama = 'es_navio';
	$.bbq.pushState('trans='+currTarjama);

	currQareeKey = $.bbq.getState('qaree') || getCookie('pc_curr_qaree') || 'husary';
	if(currQareeKey == 'khaleefa_128kbps') currQareeKey = 'khaleefa_96kbps';
	if(! quraa_map[currQareeKey]){
		currQareeKey = getKeyFromQaree(currQareeKey);
	}
	currQaree = quraa_map[currQareeKey];
	$.bbq.pushState('qaree='+currQareeKey);
	
	mp3url = base_mp3url + '/' + currQaree + '/';

	$("#qaree_selector ul li a").append('<b class="pb_trans">Trns : <u>Off</u><div class="ip" name="Off" title="Switch off voice translation">Off</div><div name="En" class="ip" title="English voice translation">English</div><div name="Ur" class="ip" title="Urdu voice translation">Urdu</div><div name="Bs" class="ip" title="Bosnian voice translation">Bosnian</div></b>');
	$("#qaree_selector ul li a.no_pb .pb_trans").remove();

	$("#qaree_selector ul li a[name='"+currQareeKey+"']").click();
	$(".trans_selector.selobj ul li a[name='"+currTarjama+"']").click();
	$("#modes_selector ul li a[name='"+currMosshaf+"']").click();
	$("#modes_selector ul li a[name='"+currMode+"']").click();
	
	$("#qaree_selector b.pb_trans").live('mouseover',function(e){
		e.stopPropagation();
		if($(this).parents('a.active').data('pb_timer')){
			clearTimeout( $(this).parents('a.active').data('pb_timer') );
		}

		$(this).find('div').show();
	});
	$("#qaree_selector b.pb_trans").live('mouseout',function(e){
		e.stopPropagation();
		hT();
		if($(this).parents('a.active').data('pb_timer')){
			clearTimeout( $(this).parents('a.active').data('pb_timer') );
		}
		$(this).find('div').hide();
	});
	$("#qaree_selector ul li a.active").live('mouseover',function(e){
		if($(this).data('pb_timer')){
			clearTimeout( $(this).data('pb_timer') );
		}
		$(this).find('.pb_trans div').show();
	});
	$("#qaree_selector ul li a.active").live('mouseout',function(e){
		hT();
		$this = $(this);
		if($(this).data('pb_timer')){
			clearTimeout( $(this).data('pb_timer') );
		}
		$(this).data('pb_timer' , setTimeout(function(){
			$this.find('.pb_trans div').hide();
			$this.data('pb_timer' , 0);
		} , 200) );
		
	});
	$("#qaree_selector b.pb_trans div").bind('click',function(e){
		e.preventDefault();
		e.stopPropagation();
		$(this).siblings().removeClass('curr');
		$(this).addClass('curr');
		set_pb_trans($(this).attr('name'));
		$(this).siblings('div').hide();
		//console.log(11);
		//$("#qaree_selector b.eng").html(txt);
	});

	if($.bbq.getState('pb')){
		$("#qaree_selector ul li a[name="+currQareeKey+"] b.pb_trans div[name="+$.bbq.getState('pb')+"]").click();
	}
	else{
		$("#qaree_selector ul li a[name="+currQareeKey+"] b.pb_trans div[name=Off]").click();
	}
	//set_mode(currMode);

	$("#qaree_selector ul li a").click(function(){
		setQaree( this );
		if(pb_trans && $(this).find('b.pb_trans')[0]){
			$(this).find("b.pb_trans div[name="+pb_trans+"]").click();
		}
		if(this.name.indexOf('khaleefa') != -1){
			if(parseInt(currAya.split('_')[0]) < 46) gotoAya(46 , 1);
		}
		
		if($(this).hasClass('rec_warsh')){
			if(currMosshaf != 'warsh'){
				$("#modes_selector a.title").click();
			}
		}
		else{
			if(currMosshaf != 'hafs' && currMosshaf != 'tajweed'){
				$("#modes_selector a.title").click();
			}
		}
	});
	$("#sel_mode a").click(function(){
		var m = this.name;
		if(m){
			setTimeout(function(){set_mode(m)},10);
		}
	});
	$("#sel_mosshaf a").click(function(){
		if(this.name){
			set_mosshaf(this.name);
		}
	});
	
	$(".trans_selector.selobj ul li a").live('click', function(){
		setCurrTarjama( this );
	});
	//init_repeat();

	set_mosshaf(currMosshaf);
	setTimeout(function(){
		set_mode(currMode);
	} , 200);
	

	if(FlashDetect.installed){
		fver = FlashDetect.major+'.'+FlashDetect.minor
	}
	else{
		fver = 'none';
	}
	$("#player").jPlayer({
		ready: function () {

		},
		ended: function (event) {
			if(inp2){
				inp2 = false;
				if(playedAu){
					playAya(true);
				}
				else{
					playedAu = true;	
					playAya(false);
				}
				return;
			}
			
			if(in_repeat_mode){
				repeat_ayaEnded(event.jPlayer.status.duration);
				return;
			}
			if(pb_trans && ! pb_played){
				playAya(pb_trans);
				pb_played = true;
				return;
			}
			pb_played = false;
			setNextAya();
			playAya();
			pb1++;
		},
		error: function(event){
			if(playedAu){
				//$.get(url_interface+"&do=log_error&code="+event.jPlayer.error.type+"&currAya="+currAya+"&currQaree="+currQaree+"&pb1="+pb1+"&pb2="+pb2+'&fver='+fver);
			}
			//
		},
		solution:"html,flash",
		swfPath: "js",
		supplied: "mp3"
	});

	$("#player2").jPlayer({
		ready: function () {
		},
		ended: function (event) {
		},
		error: function(event){
			if(! playedAu){
				//$.get(url_interface+"&do=log_error&code="+event.jPlayer.error.type+"&pb1="+pb1+"&pb2="+pb2+'&fver='+fver);
			}
		},
		solution:"html,flash",
		swfPath: "js",
		supplied: "mp3",
		cssSelectorAncestor: "#pl2"
	});

	$(".mode a").mouseover(function(){
		if( $(this).parent().data('to') ){
			clearTimeout($(this).parent().data('to'));
		}
		//$(this).prev().children('span').fadeIn();
		$(this).prev().animate({width:120},300).children('span').fadeIn();
	});
	$(".mode a").mouseout(function(){
		var _this = this;
		$(this).parent().data('to' , window.setTimeout(function(){$(_this).prev().animate({width:0},300).children('span').hide()}  , 200) );
	});

	$(".mode .hint").mouseover(function(){
		if( $(this).parent().data('to') ){
			clearTimeout($(this).parent().data('to'));
		}
	});
	$(".mode .hint").mouseout(function(){
		var _this = this;
		$(this).parent().data('to' , window.setTimeout(function(){$(_this).animate({width:0},300).children('span').hide()}  , 200) );
	});
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
	$("#ln_key").mouseover(function(){
		viewLangs();
	});
	$("#ln_key").mouseout(function(){
		hideLangs();
	});
	$("#langs_pane").mouseover(function(){
		viewLangs();
	});
	$("#langs_pane").mouseout(function(){
		hideLangs(1000);
	});
	$("#proj_key").mouseover(function(){
		viewProj();
	});
	$("#proj_key").mouseout(function(){
		hideProj();
	});
	$("#proj_pane").mouseover(function(){
		viewProj();
	});
	$("#proj_pane").mouseout(function(){
		hideProj(1000);
	});

	$(".ln_item.inact").click(function(){
		$(".ln_hint").remove();
		$(".ln_item.inact").removeClass('clicked');
		$(this).addClass('clicked');
		$(this).after('<div class="ln_hint">'+$("#ln_hint").data('lng' , $(this)[0].name.split('_')[1] ).html()+'</div>');
	});
	$(".ln_no").live('click' , function(){
		$(".ln_item.inact").removeClass('clicked');		
		$(this).parents('.ln_hint').remove();
	});
	$(".ln_yes").live('click' , function(){
		var from = (logha == 'ar')?'arabic':'english';
		$(this)[0].href = 'langs/transer57eb.html?from='+from+'&to='+$("#ln_hint").data('lng');
		$(this)[0].target = '_blank';
		//document.location.href = 'langs/transer.php?from=english&to='+$("#ln_hint").data('lng');
	});	
	$("#share_fb").click(function(){
		var url = encodeURIComponent('indexa2a0.html?l='+logha+'&c=5');
		window.open('http://www.facebook.com/sharer.php?u='+url,'sharer','toolbar=0,status=0,width=626,height=436');
	});
	$("#share_twt").click(function(){
		
		var url = _lang['sh_desc'] + ' : ' + encodeURIComponent('indexa2a0.html?l='+logha);
		window.open('http://twitter.com/home?status='+url,'twit','toolbar=0,status=0,width=626,height=436');
	});
	sha_tr = false;
	$(".sha_bu,#share_key").mouseover(function(){
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
	$(".sha_bu,#share_key").mouseout(function(){
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
	
	
	
	$(".sel_sura_tafsir").live('change' , function(){
		$(this).nextAll('.sel_aya_tafsir').html( build_selAyat( QuranData.Sura[ $(this).val() ][1] , 1 ) );
	});
	$(".bu_tafsir_next").live('click' , function(){
		var sura = $(this).prevAll('.sel_sura_tafsir').val();
		var aya  = $(this).prevAll('.sel_aya_tafsir').val()
		if(aya++ >= QuranData.Sura[sura][1]){
			aya = 1;
			if(sura++ >= 114){
				return;
			}
			$(this).prevAll('.sel_sura_tafsir').val(sura);
			$(this).prevAll('.sel_sura_tafsir').change();
		}
		$(this).prevAll('.sel_aya_tafsir').val(aya);
		$(this).prevAll('.bu_tafsir_goto').click();
	});
	$(".bu_tafsir_prev").live('click' , function(){
		var sura = $(this).nextAll('.sel_sura_tafsir').val();
		var aya  = $(this).nextAll('.sel_aya_tafsir').val()
		if(aya-- <= 1){
			aya = -1;
			if(sura-- <= 1){
				return;
			}
			$(this).nextAll('.sel_sura_tafsir').val(sura);
			$(this).nextAll('.sel_sura_tafsir').change();
		}
		if(aya == -1){
			aya = QuranData.Sura[sura][1];
		}
		$(this).nextAll('.sel_aya_tafsir').val(aya);
		$(this).nextAll('.bu_tafsir_goto').click();
		
	});
	$(".bu_tafsir_next_ft").live('click' , function(){
		$(this).parents('.tabswidg_sub').find('.bu_tafsir_next').click();
	});
	$(".bu_tafsir_prev_ft").live('click' , function(){
		$(this).parents('.tabswidg_sub').find('.bu_tafsir_prev').click();
	});


	$("#fld_srch_sowar").keyup(function(){
		$("#sowar .middle a").srch(this.value);
	});
	$("#fld_srch_sowar").click(function(){
		this.select();
	});
	$("#fld_srch_sowar").val(_lang['search_title'] + ' ...');

	$(".fld_goto_page").click(function(){
		this.select();
	});
	$(".fld_goto_page").keydown(function(event){
		if(event.keyCode == 13){
			gotoPage(this.value);
		}
	});
	$(".bu_goto_page").click(function(){
		gotoPage($(this).prev('.fld_goto_page').val());
	});
	
	$(document).click(function(){
		hT();
	});
	// hinit end //
});
$(window).load(function(){
	if(currMosshaf == 'warsh'){
		if(true || getCookie('warsh_warn')){
			setTimeout(function(){
				alert(_lang['mosshaf_warsh_warning']);
				$("#modes_selector a.title").click();
				setCookie('warsh_warn' , 1 , 7 , 'index-2.html' , '' ,'');
			}, 15000);
		}
	}
});
(function($){
  $.srch = function(elements, keywords, filter, lookup) {
    keywords = $.trim(keywords);
    lookup = $.srch.lookups[lookup] || lookup || function(){ return this };
    filter = $.srch.filters[filter] || filter || $.srch.filters['by substring'];
    if (!keywords.length) filter = function(){ return false; }
    return elements.each(function() {
      lookup.call($(this))[filter.call($(this), keywords) ? 'hide' : 'show']();
    })
  }
  $.fn.srch = function(keywords, filter, options) {
    options = options || {};
    return $.srch(this, keywords, filter, options.remove);
  }
  $.srch.filters = {
    'by substring': function(search) {
      return (this.text().toLowerCase().indexOf(search.toLowerCase()) == -1);
    },
    
    'by keyword': function(search) {
      var words = this.text().split(' ');
      var keywords = search.split(' ');
      for (var i = 0, len = keywords.length; i < len; ++i)
        if (words.indexOf(keywords[i]) != -1)
          return false;
      return true;
    }
  }
  $.srch.lookups = {
    parent: function() {
      return this.parent();
    }
  }
  
})(jQuery);


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
		tp  = 560;
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


function alertt( msg  , title) {
    var title  = title || _lang['alert_defTitle'] || '';
    var $p_over = $("#p_over").clone().appendTo('body').attr('id','').addClass('p_over');
    var $p_alert = $("#p_alert").clone().appendTo('body').attr('id','').addClass('p_alert').data('over',$p_over);
    $p_alert.data("msg" , $p_alert.find(".msg"));
    $p_alert.tm = function(){
        $p_alert.data('over').remove();
        $p_alert.remove();    	
    }
    $p_alert.setMsg = function(msg){
        $p_alert.data("msg").html(msg);
    }
    
    $p_alert.hideBu = function(){
    	$p_alert.find('button.ok').hide();
    }
    $p_alert.showBu = function(){
    	$p_alert.find('button.ok').show();
    }
    $p_alert.find('button.ok').click( function() {
        $p_alert.tm();
    });
    $p_alert.find(".title").html(title);
    $p_alert.data("msg").html( msg || '');
	return $p_alert;
}


(function($){
	$.tiny = $.tiny || { };
	
	$.tiny.scrollbar = {
		options: {	
			axis: 'y',
			wheel: 40,
			scroll: true,
			size: 'auto',
			sizethumb: 'auto'
		}
	};	
	
	$.fn.tinyscrollbar = function(options) { 
		var options = $.extend({}, $.tiny.scrollbar.options, options); 		
		this.each(function(){ $(this).data('tsb', new Scrollbar($(this), options)); });
		return this;
	};
	$.fn.tinyscrollbar_update = function(sScroll) { return $(this).data('tsb').update(sScroll); };
	
	function Scrollbar(root, options){
		var oSelf = this;
		var oWrapper = root;
		var oViewport = { obj: $('.viewport', root) };
		var oContent = { obj: $('.overview', root) };
		var oScrollbar = { obj: $('.scrollbar', root) };
		var oTrack = { obj: $('.track', oScrollbar.obj) };
		var oThumb = { obj: $('.thumb', oScrollbar.obj) };
		var sAxis = options.axis == 'x', sDirection = sAxis ? 'left' : 'top', sSize = sAxis ? 'Width' : 'Height';
		var iScroll, iPosition = { start: 0, now: 0 }, iMouse = {};

		function initialize() {	
			oSelf.update();
			setEvents();
			return oSelf;
		}
		this.update = function(sScroll){
			oViewport[options.axis] = oViewport.obj[0]['offset'+ sSize];
			oContent[options.axis] = oContent.obj[0]['scroll'+ sSize];
			oContent.ratio = oViewport[options.axis] / oContent[options.axis];
			oScrollbar.obj.toggleClass('disable', oContent.ratio >= 1);
			oTrack[options.axis] = options.size == 'auto' ? oViewport[options.axis] : options.size;
			oThumb[options.axis] = Math.min(oTrack[options.axis], Math.max(0, ( options.sizethumb == 'auto' ? (oTrack[options.axis] * oContent.ratio) : options.sizethumb )));
			oScrollbar.ratio = options.sizethumb == 'auto' ? (oContent[options.axis] / oTrack[options.axis]) : (oContent[options.axis] - oViewport[options.axis]) / (oTrack[options.axis] - oThumb[options.axis]);
			iScroll = (sScroll == 'relative' && oContent.ratio <= 1) ? Math.min((oContent[options.axis] - oViewport[options.axis]), Math.max(0, iScroll)) : 0;
			iScroll = (sScroll == 'bottom' && oContent.ratio <= 1) ? (oContent[options.axis] - oViewport[options.axis]) : isNaN(parseInt(sScroll)) ? iScroll : parseInt(sScroll);
			setSize();
		};
		function setSize(){
			oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
			oContent.obj.css(sDirection, -iScroll);
			iMouse['start'] = oThumb.obj.offset()[sDirection];
			var sCssSize = sSize.toLowerCase(); 
			oScrollbar.obj.css(sCssSize, oTrack[options.axis]);
			oTrack.obj.css(sCssSize, oTrack[options.axis]);
			oThumb.obj.css(sCssSize, oThumb[options.axis]);		
		};		
		function setEvents(){
			oThumb.obj.bind('mousedown', start);
			oThumb.obj[0].ontouchstart = function(oEvent){
				oEvent.preventDefault();
				oThumb.obj.unbind('mousedown');
				start(oEvent.touches[0]);
				return false;
			};	
			oTrack.obj.bind('mouseup', drag);
			if(options.scroll && this.addEventListener){
				oWrapper[0].addEventListener('DOMMouseScroll', wheel, false);
				oWrapper[0].addEventListener('mousewheel', wheel, false );
			}
			else if(options.scroll){oWrapper[0].onmousewheel = wheel;}
		};
		function start(oEvent){
			iMouse.start = sAxis ? oEvent.pageX : oEvent.pageY;
			var oThumbDir = parseInt(oThumb.obj.css(sDirection));
			iPosition.start = oThumbDir == 'auto' ? 0 : oThumbDir;
			$(document).bind('mousemove', drag);
			document.ontouchmove = function(oEvent){
				$(document).unbind('mousemove');
				drag(oEvent.touches[0]);
			};
			$(document).bind('mouseup', end);
			oThumb.obj.bind('mouseup', end);
			oThumb.obj[0].ontouchend = document.ontouchend = function(oEvent){
				$(document).unbind('mouseup');
				oThumb.obj.unbind('mouseup');
				end(oEvent.touches[0]);
			};
			return false;
		};		
		function wheel(oEvent){
			if(!(oContent.ratio >= 1)){
				var oEvent = oEvent || window.event;
				var iDelta = oEvent.wheelDelta ? oEvent.wheelDelta/120 : -oEvent.detail/3;
				iScroll -= iDelta * options.wheel;
				iScroll = Math.min((oContent[options.axis] - oViewport[options.axis]), Math.max(0, iScroll));
				oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
				oContent.obj.css(sDirection, -iScroll);
				
				oEvent = $.event.fix(oEvent);
				oEvent.preventDefault();
			};
		};
		function end(oEvent){
			$(document).unbind('mousemove', drag);
			$(document).unbind('mouseup', end);
			oThumb.obj.unbind('mouseup', end);
			document.ontouchmove = oThumb.obj[0].ontouchend = document.ontouchend = null;
			return false;
		};
		function drag(oEvent){
			if(!(oContent.ratio >= 1)){
				iPosition.now = Math.min((oTrack[options.axis] - oThumb[options.axis]), Math.max(0, (iPosition.start + ((sAxis ? oEvent.pageX : oEvent.pageY) - iMouse.start))));
				iScroll = iPosition.now * oScrollbar.ratio;
				oContent.obj.css(sDirection, -iScroll);
				oThumb.obj.css(sDirection, iPosition.now);
			}
			return false;
		};
		
		return initialize();
	};
})(jQuery);


