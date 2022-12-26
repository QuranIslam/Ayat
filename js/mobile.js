// super globals //
SG = (typeof SG == "undefined") ? {} : SG;
var p_paused = null,
def_aya = '1_1',
def_qaree = 'Hudhaify_64kbps',
def_lang = 'ar',
def_mosshaf = 'hafs',
def_trans = '',
def_tafsir = 'sa3dy',
def_vision = 'normal',
def_keeplight = "yes",
def_keepworking = "yes",
_FR_ = false,
currMosshaf, currVision = 'normal', currTrans, currTafsir, currActiveWin, currPage = 0, page_key="Page", autoStop=false,

currLang, currAya, isZoom, globalPlay, pausedByCall = 0, repeat_started = 0,
mp3url = '',
_lang = false,
_first_run = false,
_emp = function () {},
oldAndroid = (navigator.userAgent.indexOf("Android 2") != -1),
tarajem = { "ar_ayat": { "dir": "rtl", "cap": "نصوص الآيات - إملائي" }, "ar_mu": { "dir": "rtl", "cap": "عربى - التفسير الميسر" }, "ar_ma3any": { "dir": "rtl", "cap": "عربى - معاني الكلمات" }, "en_sh": { "dir": "ltr", "cap": "English - Sahih International" }, "fr_ha": { "dir": "ltr", "cap": "Français - Hamidullah" }, "es_navio": { "dir": "ltr", "cap": "Spanish - Melara Navio" }, "pt_elhayek": { "dir": "ltr", "cap": "Português - El Hayek" }, "de_bo": { "dir": "ltr", "cap": "Deutsch - Bubenheim & Elyas" }, "tr_diyanet": { "dir": "ltr", "cap": "Turkish - Diyanet Isleri" }, "bs_korkut": { "dir": "ltr", "cap": "Bosnian - Korkut" }, "sq_nahi": { "dir": "ltr", "cap": "Shqiptar - Efendi Nahi" }, "it_piccardo": { "dir": "ltr", "cap": "Italian - Piccardo" }, "nl_siregar": { "dir": "ltr", "cap": "Dutch - Sofian Siregar" }, "ur_gl": { "dir": "rtl", "cap": "أردو - جالندربرى" }, "ku_asan": { "dir": "rtl", "cap": "كردى - برهان محمد أمين" }, "pr_tagi": { "dir": "rtl", "cap": "فارسى - حسين تاجى كله دارى" }, "id_indonesian": { "dir": "ltr", "cap": "Indonesian - Bahasa Indonesia" }, "ms_basmeih": { "dir": "ltr", "cap": "Malay - Basmeih" },"th_thai": { "dir": "ltr", "cap": "Thai - ภาษาไทย" }, "bn_bengali": { "dir": "ltr", "cap": "Bengali - Muhiuddin Khan" }, "ml_abdulhameed":{dir:"ltr","cap": "Malayalam - Abdul Hameed and Kunhi"}, "ta_tamil": { "dir": "ltr", "cap": "Tamil - Jan Turst Foundation" }, "ru_kuliev": { "dir": "ltr", "cap": "Россию - Кулиев" }, "uz_sodik": { "dir": "ltr", "cap": "Uzbek - Мухаммад Содик" }, "zh_jian": { "dir": "ltr", "cap": "Chinese - Ma Jian" }, "so_abduh": { "dir": "ltr", "cap": "Somali - Abduh" }, "ha_gumi": { "dir": "ltr", "cap": "Hausa - Gumi" }, "sw_barwani": { "dir": "ltr", "cap": "Swahili - Al-Barwani" } },
tafaser = {},
quraa = {},
pb_trans_map = { "En": "English_Walk", "Fr": "fr.leclerc_128kbs", "Ur": "ur.khan_46kbs", "Bs": "Bosnian_Korkut_128kbps" },
langs_av = { "ar": { l_dir: "rtl" }, "en": { l_dir: "ltr" } },
scrW, scrH, prev_scrW, prev_scrH,
in_mtest_mode = false;
$(function () {
    setTimeout(function () {
        SG.boot(function () {
            SG.Initer.init();
            setTimeout(SG.actRun, 100);
        });
    }, 0);
});


/*---------- context start ---------*/
(function (window, $) {
    // context globals //

    var blink_hilite = false,
    trigbind = null,
    imgs_t, imgs_t2,
    hilites = {}, pb_trans, pb_played,

    trans_enb = 1,
    transR = 0,

    mosshafSeld, nav, nav_menu, nav_trans,
    t_ele, transH, transR,
    tdiff_ele = 0, TST = 0, cancelNextS,
    in_repeat_mode, aya_prev,
    

    tViews = 25,
    inViews = 15,

    CPX = prevS = inViews,
    repeatSelsInited,
    al_audio, al_image,
    canHTM = null,


    nav_menu = false,
    navReseted = false,
    tc_moved = false,
    tc_timer = false,
    in_repeat_mode = false,
    repeatSelsInited = false,
    repeat = {},
    visionSeld = false,
    repeated_aya = 0,
    repeated_all = 0,
    aya_prev = false,
    bl_aya = 0,
    doubleTap = false,
    dTap_id = false,
    didDT = false,
    prevOri, prevH, lockResizeEv;
    // end context globals //



    function clickMenu() { // @WARN Move
        toggleMenu();
    }

    SG.Initer = {
        init: function () {
            this.preInit();
            this.preHook();
            this.preHook2();
            this.initRoot();
            this.initMainWidg();
            this.initPlayerActions();
            this.initToolsActions();
            this.initMenuActions();
            this.postHook();
            this.postHook2();
            this.postInit();
        },
        preInit: function () { },
        preHook: function () { },
        preHook2: function () { },
        initRoot: function () {
            //remKey('curr_tfs');

            if (_FR_) {
                // blink_hilite = true;
            }
            if (!currLang) { // if currLang present means switchLang called
                switchLang(this.currLang || def_lang);
            }

            SG.Trig.on("langChange", function () {
                //$(".selt_fld_srch").attr("placeholder", parseAr(_lang['search_holder']));
            });
            //$(".selt_fld_srch").attr("placeholder", parseAr(_lang['search_holder']));

            $(".popup").on(MOVE_EV, function (e) {
                e.stopPropagation();
            });

            $(".popup").on("show", function () {
                $("#popup_root").show();
            });
            $(".popup").on("hide", function () {
                $("#popup_root").hide();
            });

            $(".popup_close").on(END_EV, function (e) {
                if (!$(this).parents('.popup').is(":visible")) return;
                e.preventDefault();
                e.stopPropagation();

                var $pop = $(this).parents('.popup');
                $pop.trigger("hiding");
                $pop.hide();
                setTimeout(function () {
                    //$("#root").show();
                    $pop.trigger("hide");
                }, 100);
            });


            if (oldAndroid) {//
                $("head").append('<link type="text/css" href="css/oldandroid.css" rel="stylesheet">');
            }
            

            currAya = this.currAya || def_aya;
            currQaree = this.currQaree || def_qaree;
            currTrans = this.currTrans || def_trans;
            currTafsir = this.currTafsir || def_tafsir;

            mp3url = base_mp3url + '/' + currQaree + '/';

            currMosshaf = this.currMosshaf || def_mosshaf;

            set_mosshaf(currMosshaf);

            SG._ap1 = new SG.APlayer(); //////////// moD
            SG._ap1.onComplete = function () {
            }




            SG.Trig.on("langChange", function (l) {

                if (repeatSelsInited == 2) repeatSelsInited = 1;

            });



            //document.addEventListener(START_EV, function (e) { e.preventDefault(); }, false);	
            //document.addEventListener(END_EV, function (e) { e.preventDefault(); }, false);	

            //$(document).bind(MOVE_EV , false);//.on(START_EV , false).on(END_EV , false);
            //document.addEventListener("menubutton", clickMenu, false); // @Warn ; move to android.js
            //document.addEventListener("backbutton", manBack , false); // @Warn ; move to android.js
        },

        initMainWidg: function () {
            var frame = new Image();
            frame.src = 'frame_' + currMosshaf + '.jpg';

            //setTimeout(function () {
                var str = '';
                for (var i = 0; i < tViews; i++) {
                    str += '<li id="li' + i + '">' + '<img id="img' + i + '" src="frame_' + currMosshaf + '.jpg"></li>';
                    //str += '<li id="li'+i+'">'+'<div><div id="rs'+i+'" class="right_shadow"></div><div id="ls'+i+'" class="left_shadow"></div><img id="img'+i+'" src="frame_'+currMosshaf+'.jpg"><div></li>';
                }
                $("#thelist").html(str);
            //}, 0);

            


            if (applyAnd4Fix()) {
                $("#scroller").addClass('and4fix');
            }

            SG.DimMan.adjust();


            $("#wrapper,#trans,#menu,#status,#tools,.tools_fl").on(MOVE_EV, function (e) {
                e.preventDefault();
            });
            if (!oldAndroid) {
                $('.submenu').on(MOVE_EV, function (e) {
                    e.preventDefault();
                });
            }
            else {
                $('.submenu').on(MOVE_EV, function (e) {//
                    e.stopPropagation();
                });
            }

            $("#wrapper").on("tapone", function (e) {
                if (!SG.Naver.get('wrapper').moved && (canHTM !== false)) {
                    SG.ToolsMenu.toggle();
                }
                SG.Menu.toggle(-1);
            });

            $("#trans").on("tapone", function () {
                if (!SG.Naver.get('trans').moved) {
                    SG.ToolsMenu.toggle();
                }
                SG.Menu.toggle(-1);
            });

            $("#wrapper").on(START_EV, function (e) {

            		if(SG.Naver.get('wrapper').moved){
            			return;
            		}

                if (typeof e.touches != 'undefined' && e.touches.length > 1) return;


                if (doubleTap) {
                    didDT = true;
                    doubleTap = false;
                }
                else {
                    doubleTap = true;
                }

                if (dTap_id) {
                    clearTimeout(dTap_id);
                }

                dTap_id = setTimeout(function () { doubleTap = false; dTap_id=0;}, 350);

            });
            $("#wrapper").on(END_EV, function (e) {
            		if(SG.Naver.get('wrapper').moved){
            			didDT = false;
            			return;
            		}            	
                if (didDT) {
                    loadAya(currAya.split('_')[0], currAya.split('_')[1], true, true);
                    SG.DimMan.refresh(false, true);
                    didDT = false;
                    SG.ToolsMenu.toggle(-1);
                    var hn = getKey('chooseAya_hint') || 0;//
                    if (!hn || hn < 4) {
                        setKey('chooseAya_hint', ++hn);
                        setTimeout(function () {
                            alert(_lang['chooseAya_hint']);
                        }, 300);
                    }
                }////
            });

            var tdiff_ele = 0;
            $("#wrapper").on(START_EV, ".hiliter.copy", function (e) {
            		e.preventDefault();
                tdiff_ele = e.timeStamp || Date.now();
            });
            $("#wrapper").on(END_EV, ".hiliter.copy", function (e) {//
            		e.preventDefault();
                if (!SG.Naver.get('wrapper').moved) {
                    var el = e.target;
                    var ts = e.timeStamp || Date.now();
                    //var ts = Date.now();
                    var tdiff = ts - tdiff_ele;
                    var tAya = el.id.split('__')[0];
                    //canHTM = false;

                    if (tdiff >= 250) {
                        setCurrAya(tAya);
                        SG._ap1.onComplete = function () { };
                        SG._ap1.stop();

                        canHTM = false;
                        setTimeout(function () {
                            SG.ToolsMenu.toggle(1);
                            canHTM = true;
                            playAya();
                        }, 200);
                    }//

                }


            });
            /*
            $("body").on("keyup","#favNote",function(){
                //$(this).val( parseAr($(this).val(),true) );
            });
            */



            $("#cont").css('left', (prevS * 4) + '%');

            SG.Naver.attach('wrapper', function () {
                return new Naver("#wrapper", {
                    scrollX: true,
                    scrollY: true,
                    snap: true,
                    snapX: true,
                    snapY: false,
                    
                    HWCompositing: useHW(),// (navigator.userAgent.indexOf("Android") == -1),
                    tap: true,
                    momentum: true,
                    momentumX: false,
                    momentumY: true,
                    preventDefault: false,
					snapStepY: 20000,
                    snapSpeed: 300,
                    useTransition: useTransition(),
                    bounce: false,
                    directionLockThreshold: 1,
                    freeScroll: false
                });
            });
            SG.Naver.activate('wrapper', true);
            var cPage, loadAya_timer;
            SG.Naver.get('wrapper').on("scrollEnd", function (obj) {
                c(in_mtest_mode)
                if(in_mtest_mode){
                    CPX = 0;
                    return;
                }
                if (cancelNextS) {
                    cancelNextS = false;
                    return;
                }


                if (this.currentPage.pageX == prevS) return;

                //SG.Menu.toggle(-1);


                CPX = this.currentPage.pageX;

                if (CPX > prevS) {
                    cPage = currPage - Math.abs(CPX - prevS);
                    if (cPage < 1) cPage = 604;
                }
                else {
                    cPage = currPage + Math.abs(CPX - prevS);
                    if (cPage > 604) cPage = 1;
                }
                //clearTimeout(loadAya_timer);
                if (CPX <= 0 || CPX >= (tViews - 1)) {
                    CPX = prevS = inViews;
                    loadAya(QuranData[page_key][cPage][0], QuranData[page_key][cPage][1], true, false);
                    this.goToPage(inViews, 0, 0);

                }
                else {
                    prevS = CPX;
                    loadAya(QuranData[page_key][cPage][0], QuranData[page_key][cPage][1], false, false);
                    this.scrollTo(this.currentPage.x, 0, 200);
                }

                $("#cont").css('left', (CPX * 4) + '%');
            });

            SG.Naver.attach('trans', 'defaultSet');

            $("#info_sura_aya,#tls_info_book").on(START_EV, function (e) {
                e.preventDefault();
                e.stopPropagation();
                SG.ToolsMenu.toggle(-1);
                SG.Menu.setAltSub('sm_browseSura');
                SG.Menu.toggle(1);
            });
            
            
            $("#tc_img_c").on(START_EV, function (e) {
                e.preventDefault();
                e.stopPropagation();
                hideTransPane();
            });

            $("#tc_img_zin,#tc_img_zout").on(START_EV, function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).addClass('active');
            });

            $("#tc_img_zin,#tc_img_zout").on(END_EV, function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).removeClass('active');
                var s = parseInt($("#trans_cont").css('font-size'));
                s += ($(this)[0].id == 'tc_img_zin') ? 1 : -1;
                setKey('curr_tfs', s);
                $("#trans_cont").css('font-size', s);

            });
            $("#trans_ctrl_choose").on(START_EV, function (e) {
                e.preventDefault();
                e.stopPropagation();
                SG.ToolsMenu.toggle(-1);
                SG.Menu.setAltSub('sm_trans');
                SG.Menu.toggle(1);
            });

            if (SG.Initer.currTFS) {
                $("#trans_cont").css('font-size', SG.Initer.currTFS + "px");
            }


            SG.Naver.activate('trans');
			
            $("#trans_ctrl").on(START_EV, function (e) {
                var p1 = (hasTouch) ? e.originalEvent.touches[0] : e;

                e.preventDefault();
                e.stopPropagation();
                var t = document.getElementById("trans_ctrl");
                //t.style.top = '150px';
                if (!parseInt(t.style.top)) t.style.top = '1px';
                var cy = p1.pageY || p1.originalEvent.pageY;
                var po = parseInt(t.style.top);
                var mx = -(t.offsetHeight - (scrH / 4));
                //t.style.height = '40px';
                $(this).addClass('active');
                if (tc_timer) clearTimeout(tc_timer);

                tc_moved = false;
                //console.log(MOVE_EV);

                
				var cy2 = 0;
                $(this).on(MOVE_EV, function (e2) {
                    e2.preventDefault();
                    e2.stopPropagation();
                    var p2 = (hasTouch) ? e2.originalEvent.touches[0] : e2;

                    //$.inspect(p1.originalEvent, 'console');


                    cy2 = p2.pageY || p2.originalEvent.pageY;

                    if (Math.abs(cy2 - cy) > 3) {
                        tc_moved = true;

                        po = po + (cy2 - cy);
                        if (po < 0) po = 0;
                        if (po > scrH) po = scrH;
                        t.style.top = po + 'px';
                        cy = cy2;
                    }
                });
            });
            $("#trans_ctrl").on(END_EV, function (e) {
                e.preventDefault();
                e.stopPropagation();
                var $this = $(this);
                $this.off(MOVE_EV);
                if (tc_timer) clearTimeout(tc_timer);

                tc_timer = setTimeout(function () {
                    $this.removeClass('active');
                }, (tc_moved) ? 0 : 2000);

                if (tc_moved) {
                    transR = scrH - parseInt(this.style.top);
                    transR = (transR / scrH) * 100;
                    SG.DimMan.refresh();
                }
            });
        },

        initPlayerActions: function () {
            $("#t_bu_play,#tls_play").on(END_EV, function (e) {
                e.preventDefault();
                e.stopPropagation();
                pausedByCall = 0;

                $("#tls_pause img").attr('src', tls_pause_img);
                $("#t_bu_pause img").attr('src', bu_pause_img);

                $("#tls_play,#t_bu_play").hide();
                $("#tls_pause,#t_bu_pause").show();
                $("#tls_stop,#t_bu_stop").show();
                if (p_paused) {
                    p_paused = 0;
                    SG._ap1.play();
                }
                else {
                    globalPlay = 1;
                    SG.Trig.invoke("globalPlay");
                    

                    playAya();

                    SG.Plugins.Listen.start(function (s) {
                        if (s == 'IDLE') {
                            if (pausedByCall && globalPlay) {
                                pausedByCall = 0;
                                $("#tls_play").trigger(END_EV);
                            }
                        }
                        else {
                            if (globalPlay && !p_paused) {
                                pausedByCall = 1;
                                $("#tls_pause").trigger(END_EV);
                            }
                        }
                    }, function () { });
                }

            });
            $("#t_bu_pause,#tls_pause").on(END_EV, function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(this).find("img").attr('src').indexOf('loading') != -1) {
                    stopPlayer();
                    return;
                }
                p_paused = 1;
                SG._ap1.pause();
                $("#tls_play,#t_bu_play").show();
                $("#tls_pause,#t_bu_pause").hide();
            });
            $("#t_bu_stop,#tls_stop").on(END_EV, function (e) {
                e.preventDefault();
                e.stopPropagation();
                //$("#player").jPlayer("stop");
                stopPlayer();
            });
            SG._ap1.onStart = function () {
            	c("ON_START");
                $("#tls_pause img,#t_bu_pause img").attr('src', 'images/loading_micro.gif');
            }
            var tls_pause_img = $("#tls_pause img").attr('src');
            var bu_pause_img = $("#t_bu_pause img").attr('src');

            SG._ap1.onPlay = function () {
            	c("ON_PLAY");
                $("#tls_pause img").attr('src', tls_pause_img);
                $("#t_bu_pause img").attr('src', bu_pause_img);
            }

            $("#t_bu_pause,#tls_pause").hide();

        },

        initToolsActions: function () {
            $("#menu_key,#menu_hint").on(END_EV, function (e) {
                e.preventDefault();
                e.stopPropagation();
                SG.ToolsMenu.toggle(-1);
                setTimeout(function () {
                    SG.Menu.toggle(1);

                }, 200);
            });
            SG.Trig.on("showMenu", function () {
                SG.ToolsMenu.toggle(-1);
            });
            $(".popup").on("show", function () {
                SG.ToolsMenu.toggle(-1);
            });
            SG.Trig.on("pageChange", function (e, p) {
                if(p % 2){
                    $("#tls_info_book img")[0].src = "images/book_right.png";
                    
                    $("#page_marker").addClass("right");
                    $("#page_marker").removeClass("left");                    
                    
                }
                else{
                    $("#tls_info_book img")[0].src = "images/book_left.png";
        
                    $("#page_marker").addClass("left");
                    $("#page_marker").removeClass("right");                    
                }
                
                
            });
            SG.Trig.on("ayaChange", function (e, sura, aya) {
                $("#info_sura_aya").html(parseAr(_lang['sura_s']) + ': ' + parseAr(QuranData.Sura[sura][sura_key]) + ' - ' + parseAr(_lang['aya_s']) + ': ' + parseAr(" "+aya));
            });
            SG.Trig.on("langChange", function (e) {
                var sura = currAya.split('_')[0];
                var aya = currAya.split('_')[1];
                $("#info_sura_aya").html(parseAr(_lang['sura_s']) + ': ' + parseAr(QuranData.Sura[sura][sura_key]) + ' - ' + parseAr(_lang['aya_s']) + ': ' + parseAr(" "+aya));
                $("#tls_qaree").html('<b class="lang" id="lang_qaree">' + parseAr(_lang['qaree']) + '</b>: ' + parseAr(getQareeName(currQaree)));

            });

            $("#tls_qaree").html('<b class="lang" id="lang_qaree">' + parseAr(_lang['qaree']) + '</b>: ' + parseAr(getQareeName(currQaree)));


            $("#tls_tafsir").on(END_EV, function (e) {
                e.stopPropagation();
                e.preventDefault();
                SG.ToolsMenu.toggle(-1);

                SG.Menu.setAltSub("sm_tafaser");
                SG.Menu.toggle(1);
            });

            $("#tools,.tools_fl").on(START_EV, function () {
                isToolsMenu = 0;
            });
            $("#tools,.tools_fl").on(END_EV, function () {
                isToolsMenu = 1;
            });
            $("#fav_read,#fav_memo").on(END_EV, function(e){
                e.stopPropagation();
                e.preventDefault();
                var aya_id = aya2id(currAya);

                if($(this).attr('id') == 'fav_read'){
                    SG.Favs.add(aya_id,'read');
                    //setKey('fav_read',aya_id);
                }
                else{
                    SG.Favs.add(aya_id,'memo');
                    //setKey('fav_memo',aya_id);
                }
                

                
            });
            $("#fav_note").on(END_EV, function (e) {
                e.stopPropagation();
                e.preventDefault();
                
                            
                var aya_id = aya2id(currAya);
                SG.Favs.add(aya_id,'note');
            });

            $("#tls_qaree").on(END_EV, function (e) {
                e.stopPropagation();
                e.preventDefault();
                SG.ToolsMenu.toggle(-1);

                SG.Menu.setAltSub('sm_recites');
                SG.Menu.toggle(1);
            });

            $("#tls_copy").on(END_EV, function (e) {//
                showCopyWidg();
            });
            
            $("#share_twit").on(END_EV, function (e) {//
                ////////
                
                var sura = currAya.split('_')[0];
                var aya = currAya.split('_')[1];//
                var subj = '';//_lang['sura_s']+' '+QuranData.Sura[sura][sura_key]+' : '+_lang['aya_s']+ ' ' +aya;
                var aya_id = aya2id(sura, aya);
                var obj = this;
                var a = SG.Dialog.notify(parseAr(_lang['pls_wait']));//alertt(parseAr(_lang['pls_wait']), null, null, true);
                $.ajaxSetup({ async: false });
                var tash = ($(this).attr('id').indexOf("WOT") == -1 && $(this).attr('id').indexOf("share") == -1) ? true : false;
                var act = ($(this).attr('id').indexOf("copy") != -1) ? 'copy' : (($(this).attr('id').indexOf("send") != -1) ? 'send' : 'share');
                SG.Plugins.DBP.search('id', aya_id, tash, function (json) {
                    a.tm();//
                    var nass = "{" + json[sura + '_' + aya] + "}" + " " + '[' + QuranData.Sura[sura][4] + " : " + aya + ']';

                    var url = 'http://twitter.com/home?status=' + encodeURIComponent(nass + "\n" + 'http://quran.ksu.edu.sa/index.php?aya=' + sura + '_' + aya);

                    SG.Plugins.Tools.openurl(url, this);

                    setTimeout(function () {
                        obj.href = 'javascript:;';
                    }, 1000);
                    $.ajaxSetup({ async: true });
                }, function () {
                });
            })//.on("click", function (e) { e.preventDefault(); });

            $("#share_fb").on(END_EV, function (e) {
                e.stopPropagation();
                e.preventDefault();
                var sura = currAya.split('_')[0];
                var aya = currAya.split('_')[1];
                var subj = _lang['sura_s'] + ' ' + QuranData.Sura[sura][sura_key] + ' : ' + _lang['aya_s'] + ' ' + aya;
                var aya_id = aya2id(sura, aya);
                var url = 'http://facebook.com/sharer/sharer.php?u=' + encodeURIComponent('indexcbb1.html?aya=' + sura + '_' + aya + '&l=' + currLang + '#aya=' + sura + '_' + aya);//+'&p[title]='+escape(subj)+'&p[summary]='+escape(nass)+'&p[images][0]='+escape('http://quran.ksu.edu.sa/images_home/quran_img_th.png');
                SG.Plugins.Tools.openurl(url, this);

            });

            $("#tls_share,#tls_fav").on(END_EV, function (e) {
                e.stopPropagation();
                e.preventDefault();
                var obj = $(this).attr('id').split('_')[1];
                if ($("#tools_" + obj).is(":visible")) {
                    $("#tools_" + obj).hide();
                    return;
                }
                $(".tools_fl").hide();
                var l = $(this).offset()['left'];
                var t = $(this).offset()['top'];
                var h = $(this).height();
                var w = $(this).width();
                var tw = $("#tools_" + obj).width();
                var th = $("#tools_" + obj).height();
                var tl = l - (Math.abs(w - tw) / 2);
                tl = (tl > 0) ? tl : 0;
                $("#tools_" + obj).css({ 'top': t - th, 'left': tl }).show();
            });
        },

        initMenuActions: function () {

        },

        postHook: function () { },
        postHook2: function () { },
        postInit: function () {

            if(! useESels()){
                return;
            }
            
            var s_groups = [];
            function buildSowarG(){
                s_groups = [];
                var j_str = parseAr(_lang['juz']);
                var endVal=0, j=0,gs=[] ;
                for(var i=1; i<=30; i++){
                    endVal = (QuranData.Juz[i+1][1] == 1)?(QuranData.Juz[i+1][0]-1):QuranData.Juz[i+1][0];
                    gs = [];
                    for(j=QuranData.Juz[i][0]; j<= endVal; j++){
                        gs.push(String(j));
                    }
                    s_groups.push({title:j_str+" "+i,cnt:gs});
                }
            }
            buildSowarG();
            SG.Trig.on("langChange", function(){
                buildSowarG();
            });
            
            
            var tt_groups = [];
            function buildTTarajemG(){
                tt_groups = [];
                var gs = [];
                for (var i in tafaser) {
                    gs.push("tafasir|"+i);
                }
                tt_groups.push({title:parseAr(_lang['download_ttarajem_tafaser']),cnt:gs});
                
                gs = [];
                for (i in tarajem) {
                    if (!tarajem[i]['cap'])
                        continue;
                    gs.push("tarajem|"+i);
                }
                tt_groups.push({title:parseAr(_lang['download_ttarajem_tarajem']),cnt:gs});
                
            }
            buildTTarajemG();
            SG.Trig.on("langChange", function(){
                buildTTarajemG();
            });

            
            $("#browse_sel_sura,#browse_sel_aya,#browse_sel_juz,#browse_sel_hizb,#tafsir_sel_sura,#tafsir_sel_aya,#tafsir_sel_tafsir,#t_sel_tafsir,#trans_sel_trans,#sel_quraa,#sel_vtrans,#sel_autoStop,#repeat_sel_begin_sura,#repeat_sel_end_sura,#repeat_sel_begin_aya,#repeat_sel_end_aya,#repeat_for_aya,#repeat_for_all,#repeat_waiting,#mtest_sel_begin_sura,#mtest_sel_begin_aya,#mtest_sel_end_sura,#mtest_sel_end_aya,#m_quraa,#m_sel_begin_sura,#m_sel_begin_aya,#m_sel_end_sura,#m_sel_end_aya,#m_ttarajem,#mozaker_1_time,#mozaker_2_time,#mozaker_3_time,#mozaker_4_time,#mozaker_5_time,#mozaker_1_alert,#mozaker_2_alert,#mozaker_3_alert,#mozaker_4_alert,#mozaker_5_alert").on(START_EV+" "+END_EV+" click", function(e){
                e.preventDefault();
                try{
                		this.blur();
                }
                catch(e){}
            });

            $("#browse_sel_sura,#tafsir_sel_sura,#repeat_sel_begin_sura,#repeat_sel_end_sura,#mtest_sel_begin_sura,#mtest_sel_end_sura,#m_sel_begin_sura,#m_sel_end_sura").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
	                selt($this, parseAr(_lang['sura']), _emp, s_groups.slice());        			
            		}, 400);
            });
            $("#mozaker_1_time,#mozaker_2_time,#mozaker_3_time,#mozaker_4_time,#mozaker_5_time").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
            			selt($this, parseAr(_lang['mozaker']), _emp);
	            	}, 400);

            });
            $("#mozaker_1_alert,#mozaker_2_alert,#mozaker_3_alert,#mozaker_4_alert,#mozaker_5_alert").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
            			selt($this, parseAr(_lang['mozaker']), _emp);
	            	}, 400);

            });

            $("#browse_sel_juz").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
            			selt($this, parseAr(_lang['juz']), _emp);
	            	}, 400);

            });            
            $("#browse_sel_hizb").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
                		selt($this, parseAr(_lang['hizb']), _emp);
	            	}, 400);
            });
            $("#browse_sel_aya,#tafsir_sel_aya,#repeat_sel_begin_aya,#repeat_sel_end_aya,#mtest_sel_begin_aya,#mtest_sel_end_aya,#m_sel_begin_aya,#m_sel_end_aya").on("tapone", function(e){
            	    var $this = $(this);
            		setTimeout(function(){
                		selt($this, parseAr(_lang['aya']), _emp);
	            	}, 400);            
            });  

            
            $("#tafsir_sel_tafsir,#t_sel_tafsir").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){	
    	            		selt($this, parseAr(_lang['tafsir']), _emp);
	            	}, 400);
            });
            
            $("#trans_sel_trans").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
                		selt($this, parseAr(_lang['trans']), _emp, [
	                    {title:'Europe',cnt:['en_sh','fr_ha','es_navio','pt_elhayek','de_bo','tr_diyanet','bs_korkut','sq_nahi','it_piccardo','nl_siregar']},
	                    {title:'Asia',cnt:['ur_gl','ku_asan','pr_tagi','id_indonesian','ms_basmeih','th_thai','bn_bengali','ml_abdulhameed','ta_tamil','ru_kuliev','uz_sodik','zh_jian']},
	                    {title:'Africa',cnt:['so_abduh','ha_gumi','sw_barwani']}
	                ]);
	            	}, 400);
            });            
           
            $("#sel_quraa,#m_quraa").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
	                selt($this, parseAr(_lang['qaree']), _emp, [
	                    {title:parseAr(_lang['recite_moalim']),cnt:['Ayman_Sowaid_64kbps','Hussary.teacher_64kbps','Minshawy_Teacher_128kbps','khaleefa_96kbps']},
	                    {title:parseAr(_lang['recite_mujawwad']),cnt:['Husary_Mujawwad_64kbps','Minshawy_Mujawwad_64kbps','AbdulSamad_64kbps']},
	                    {title:parseAr(_lang['recite_warsh']),cnt:['warsh_dossary_128kbps','warsh_husary_64kbps','warsh_yassin_64kbps']}
	                ]);
	            	}, 400);
            });
            $("#sel_vtrans").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
	                selt($this, parseAr(_lang['chooseVTrans']), _emp);
	            	}, 400);
            });
            $("#sel_autoStop").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
	                selt($this, parseAr(_lang['autoStop']), _emp);
	            	}, 400);
            });            
            $("#repeat_for_aya").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
	                selt($this, parseAr(_lang['repeat_forAya']), _emp);
	            	}, 400);
            });
            $("#repeat_for_all").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
                		selt($this, parseAr(_lang['repeat_forAll']), _emp);
	            	}, 400);
            });
            $("#repeat_waiting").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
                		selt($this, parseAr(_lang['repeat_waiting']), _emp);
	            	}, 400);
            });
            
            $("#m_ttarajem").on("tapone", function(e){
            		var $this = $(this);
            		setTimeout(function(){
	                selt($this, parseAr(_lang['download_ttarajem']), _emp, tt_groups.slice());
	            	}, 400);
            });            
            
        }

    }
    SG.Naver = (function ($) {
        var sets = { 
            defaultSet: function (id) {
                return new Naver('#' + id, {
                    scrollX: false,
                    scrollY: true,
                    
                    snap: false,
                    momentum: true,
                    momentumY: true,

                    useTransition: useTransition(),
                    preventDefault: false
                });
            },
            horSet: function(id){
                return new Naver('#' + id, {
                    scrollX: true,
                    scrollY: false,
                    snap: false,
                    momentum: true,
                    momentumX: true,
                    useTransition: useTransition(),
                    preventDefault: false
                });
            }
        }
        var navs = {};
        var actives = {};
        return {
            attach: function (id, act, delay) {
                if (!navs[id]) {
                    navs[id] = (typeof act == 'string') ? sets[act](id) : act();
                }
            },
            refresh: function (id) {
                if (!navs[id]) return;
                navs[id].refresh();
            },
            setOpt: function(id, opt, val){
                if (!navs[id]) return;
                navs[id].options[opt] = val;
            },
            refreshActives: function () {
                for (var id in actives) {
                    if (navs[id])
                        navs[id].refresh();
                }
            },
            activate: function (id, dontRefresh) {
                if (!navs[id]) return;
                actives[id] = true;
                if (dontRefresh) return;

                if (navs[id]) navs[id].refresh(); // @Enhancement, dont refresh unless needed

            },
            deactivate: function (id) {
                if (!navs[id]) return;

                actives[id] = undefined;
            },
            get: function (id) {
                return navs[id];
            }
        }
    })($);

    SG.Menu = (function ($) {
        var trig = function () { };
        var attach = function () { };
        var state = null;
        var navs = {};
        var inits = [];
        var activeSub = null;
        var viewAltSub = false;
        var actions = {
            rate: function(){
                SG.Plugins.Tools.rate();
            },
            share: function(){
                //SG.Plugins.Tools.share();
                showShareWidg();
            },
            browseBySura: function () {
                showSub('sm_browseSura');
            },
            browseByJuz: function () {
                showSub('sm_browseJuz');
            },
            browseTafaser: function () {
                showSub('sm_tafaser');
            },
            browseTrans: function () {
                showSub('sm_trans');
            },
            browseByPage: function () {
                try{
                    document.activeElement.blur();
                }
                catch(e){}
                showSub('sm_browsePage');
                //$("#sm_browsePage").val(currPage).click();
            },
            browseByFavs: function () {
                showFavs($("#img_favs")[0]);
            },
            recites: function () {
                showSub('sm_recites');
            },
            repeat: function () {
                showSub('sm_repeat');
            },
            mtest: function () {
                showSub('sm_mtest');
            },
            mozaker: function () {
                showSub('sm_mozaker');
            },            
            showOpts: function () {
                showSub('sm_opts');
            },
            showSettings: function () {
                showSub('sm_settings');
            },
            showHelp: function () {
                $('#help_cont').show();
                $('#help_cont').trigger("show");
                SG.Menu.toggle(-1);
            },
            showContact: function () {
                $('#contact_cont').show();
                $('#contact_cont').trigger("show");
                SG.Menu.toggle(-1);

            },
            downloadImages: function () {
                showSub('sm_downloadImages');
            },
            downloadAudio: function () {
                showSub('sm_downloadAudio');
            },
            downloadTtarajem: function () {
                showSub('sm_downloadTtarajem');
            }
        };
        var initers = {
            main: function () {
                if ($.inArray('main', inits) == -1) {
                    inits.push('main');
                    SG.Naver.attach('menu', 'defaultSet', 300);

                    SG.Trig.on("langChange", function () {
                        $("#fld_search").attr("placeholder", parseAr(_lang['search_holder']));
                    });
                    $("#fld_search").attr("placeholder", parseAr(_lang['search_holder']));
                    $("#fld_search_txt").hide();
                    $("#fld_search_txt").keyup(function(){
                        
                        $("#fld_search").val( parseAr($(this).val(), true) );
                    });
                    

                    $("body").on("change","select", function () {
                        try {
                            $(this).prev(".ay_sel_text").html(parseAr($(this).find("option").filter(":selected").text()));
                        }
                        catch (e) { }
                    });

                    $("#menu .menuAct").on("tapone", function (e) {
                        (actions[$(this).attr('id')] || _emp)();
                    });
                    $("#menu").on("swipeone", function (e) {
                        if (e.direction == "left") {
                            hide();
                        }
                    });


                    $(".menu_divider").on("tapone", function () {
                        var item = this;
                        var fOut = $(item).next(".menu_item").is(":visible")
                        while (item = $(item).next(".menu_item")[0]) {
                            if(fOut){
                                $(item).hide();
                                SG.Naver.refresh('menu');
                            }
                            else{
                                $(item).fadeIn('fast', function () {
                                    SG.Naver.refresh('menu');
                                });
                            }
                        }

                        setTimeout(function () {
                            //SG.Naver.refresh('menu');
                        }, 0);
                    });

                    $(".submenu").on("swipeone", function (e) {
                        if (e.direction == "left") {
                            hideSub($(this).attr('id'), true);
                        }
                    });

                    $(".sm_close").on(END_EV, function () {
                        hideSub($(this).parents('.submenu').attr('id'), true);
                    });

                    $("#fld_search,#fld_search_txt").on("keydown", function (e) {
                        if (e.keyCode == 13) {
                            doSearch($("#bu_search")[0]);
                        }
                    });

                    $("#bu_search").on(END_EV, function (e) {
                        doSearch($("#bu_search")[0]);
                    });

                    //$("#browse_sel_page").html(build_selPages(currPage));
                    $("#browse_sel_page").change(function () {
                        toggle(-1);

                        var p = $(this).val();
                        setTimeout(function () {
                            loadAya(QuranData[page_key][p][0], QuranData[page_key][p][1], true, true);
                        }, 200);

                    });
                }
            },
            sm_browseSura: function () {
                if ($.inArray('sm_browseSura', inits) == -1) {
                    inits.push('sm_browseSura');

                    SG.Trig.on("langChange", function () {
                        $("#browse_sel_sura").html(build_selSowar(currAya.split('_')[0]));
                    });

                    $("#browse_sel_sura").html(build_selSowar(currAya.split('_')[0]));
                    $("#browse_sel_sura").change();
                    $("#browse_sel_aya").html(build_selAyat(QuranData.Sura[currAya.split('_')[0]][1], currAya.split('_')[1]));
                    $("#browse_sel_aya").change();


                    $("#browse_sel_sura").change(function () {
                        var sura = $(this).val();
                        $("#browse_sel_aya").html(build_selAyat(QuranData.Sura[sura][1], 1, 1));
                        $("#browse_sel_aya").change();
                    });

                    $("#bu_gotoSura").on("tapone", function (e) {
                        var s = $("#browse_sel_sura").val();
                        var a = $("#browse_sel_aya").val();
                        loadAya(s, a, true, true);
                        hideSub("sm_browseSura");
                    });

                    SG.Naver.attach('sm_browseSura', 'defaultSet', 300);
                }
                else {
                    $("#browse_sel_sura").val(currAya.split('_')[0]).change();
                    $("#browse_sel_aya").val(currAya.split('_')[1]).change();
                }

            },
            sm_browseJuz: function () {
                if ($.inArray('sm_browseJuz', inits) == -1) {
                    inits.push('sm_browseJuz');

                    SG.Trig.on("langChange", function () {
                        $("#browse_sel_hizb").html(build_selAhzab());
                    });


                    $("#browse_sel_juz").html(build_selAgzaa());
                    $("#browse_sel_hizb").html(build_selAhzab());

                    $("#browse_sel_juz").change(function (event, hizb) {
                        var hizb = Number(hizb) || 1;
                        $("#browse_sel_hizb").val(hizb);
                        $("#browse_sel_hizb").change();
                    });

                    $("#browse_sel_juz").val(suraJuz(currAya.split('_')[0], currAya.split('_')[1])).trigger('change', (suraHizb(currAya.split('_')[0], currAya.split('_')[1]) % 8 || 8));


                    $("#bu_gotoJuz").on("tapone", function (e) {
                        var j = $("#browse_sel_juz").val();
                        var h = $("#browse_sel_hizb").val();
                        var jh = (j * 8) - 8 + (h * 1);

                        loadAya(QuranData.HizbQaurter[jh][0], QuranData.HizbQaurter[jh][1], true, true);
                        hideSub("sm_browseJuz");
                    });

                    SG.Naver.attach('sm_browseJuz', 'defaultSet', 300);

                }
                else {
                    $("#browse_sel_juz").val(suraJuz(currAya.split('_')[0], currAya.split('_')[1])).trigger('change', (suraHizb(currAya.split('_')[0], currAya.split('_')[1]) % 8 || 8));
                }

            },
            sm_browsePage: function () {
                if ($.inArray('sm_browsePage', inits) == -1) {
                    inits.push('sm_browsePage');

                    $(".bbp").on("tapone", function () {
                        var val = $("#fld_page").val();
                        val = val.replace(/٠‎/g, 1).replace(/١/g, 1).replace(/٢/g, 2).replace(/٣/g, 3).replace(/٤/g, 4).replace(/٥/g, 5).replace(/٦/g, 6).replace(/٧/g, 7).replace(/٨/g, 8).replace(/٩/g, 9);

                        if (!val || isNaN(val)) val = 1;
                        val = parseInt(val, 10);
                        
                        val = ($(this).attr('id').split('_')[2] == "pos") ? (val + Number($(this).attr('id').split('_')[1])) : (val - Number($(this).attr('id').split('_')[1]));
                        if (val < 1) val = 1;
                        if (val > 604) val = 604;
                        $("#fld_page").val(val);
                    });


                    $("#bu_gotoPage").on("tapone", function (e) {
                        var val = $("#fld_page").val();
                        val = val.replace(/٠‎/g, 1).replace(/١/g, 1).replace(/٢/g, 2).replace(/٣/g, 3).replace(/٤/g, 4).replace(/٥/g, 5).replace(/٦/g, 6).replace(/٧/g, 7).replace(/٨/g, 8).replace(/٩/g, 9);

                        if (!val || isNaN(val)) val = 1;
                        val = parseInt(val, 10);
                        if (val < 1) {
                            val = 1;
                        }
                        if (val > 604) {
                            val = 604;
                        }
                        
                        loadAya(QuranData[page_key][val][0], QuranData[page_key][val][1], true, true);

                        gotoPage(val, true);
                        hideSub("sm_browsePage");
                    });

                    SG.Naver.attach('sm_browsePage', 'defaultSet', 300);
                }
                $("#fld_page").val(currPage);

            },
            sm_tafaser: function () {
                if ($.inArray('sm_tafaser', inits) == -1) {
                    inits.push('sm_tafaser');

                    SG.Trig.on("langChange", function () {
                        if (!getKey('tafsir')) {
                            currTafsir = def_tafsir;
                        }
                        $("#tafsir_sel_sura").html(build_selSowar(currAya.split('_')[0]));
                        $("#tafsir_sel_tafsir").html(build_selTafaser(currTafsir));
                    });

                    $("#tafsir_sel_sura").html(build_selSowar(currAya.split('_')[0]));
                    $("#tafsir_sel_sura").change();
                    $("#tafsir_sel_aya").html(build_selAyat(QuranData.Sura[currAya.split('_')[0]][1], currAya.split('_')[1]));
                    $("#tafsir_sel_aya").change();

                    $("#tafsir_sel_tafsir").html(build_selTafaser(currTafsir));
                    $("#tafsir_sel_tafsir").change();

                    $("#tafsir_sel_sura").change(function () {
                        var sura = $(this).val();
                        $("#tafsir_sel_aya").html(build_selAyat(QuranData.Sura[sura][1], 1, 1));
                        $("#tafsir_sel_aya").change();
                    });

                    $("#bu_showTafsir").on("tapone", function (e) {
                        currTafsir = $("#tafsir_sel_tafsir").val();
                        setKey('tafsir', currTafsir);
                        showTafsir(this);
                    });
                    SG.Naver.attach('sm_tafaser', 'defaultSet', 300);

                }
                else {
                    $("#tafsir_sel_sura").val(currAya.split('_')[0]).change();
                    $("#tafsir_sel_aya").val(currAya.split('_')[1]).change();
                    $("#tafsir_sel_tafsir").val(currTafsir).change();
                }
            },
            sm_trans: function () {
                if ($.inArray('sm_trans', inits) == -1) {
                    inits.push('sm_trans');

                    SG.Trig.on("langChange", function () {
                        if (!getKey('trans')) {
                            currTrans = def_trans;
                            SG.refreshTransPane();
                        }
                    });


                    $("#trans_sel_trans").html(build_selTrans(currTrans));
                    $("#trans_sel_trans").change();

                    $("#bu_showTrans").on("tapone", function (e) {
                        currTrans = $("#trans_sel_trans").val();
                        setKey('trans', currTrans);

                        if (!trans_enb){
                            showTransPane();
                        }

                        SG.Menu.toggle(-1);

                        SG.refreshTransPane();

                    });

                    SG.Naver.attach('sm_trans', 'defaultSet', 300);
                }
                else {
                    $("#trans_sel_trans").change();
                }
            },
            sm_recites: function () {
                if ($.inArray('sm_recites', inits) == -1) {
                    inits.push('sm_recites');

                    SG.Trig.on("langChange", function () {
                        $("#sel_quraa").html(build_selQuraa(currQaree));
                    });
                    $("#sel_quraa").html(build_selQuraa(currQaree));
                    $("#sel_quraa").change();
                    $("#sel_vtrans").change();
                    $("#sel_autoStop").change();
                    $("#sel_vtrans").change(function () {
                        pb_trans = $(this).val();
                        if (pb_trans == 0) pb_trans = false;
                    });
                    $("#sel_autoStop").change(function () {
                        autoStop = $(this).val();
                        if (autoStop == 0) autoStop = false;
                    });

                    $("#sel_quraa").change(function (e,org) {
                        if($(this).val() == "khaleefa_96kbps"){
                            if(parseInt(currAya.split('_')[0]) < 46){
                                SG.Dialog.alertt(parseAr(_lang['recite_kh_res']));
                                if(currQaree != "khaleefa_96kbps"){ // avoid ifinite loop
                                    $(this).val(currQaree).change();
                                }
                                return;
                            }
                        }

                        currQaree = $(this).val();
                        $("#tls_qaree").html('<b class="lang" id="lang_qaree">' + parseAr(_lang['qaree']) + '</b>: ' + parseAr($("#sel_quraa option[value='" + currQaree + "']").text()));
                        

                        mp3url = base_mp3url + '/' + currQaree + '/';
                        setKey('curr_qaree', currQaree);
                        if (org || e.originalEvent) {
                            SG._ap1.stop();
                            playAya();
                        }
                    });
                    $("#recites_repeat").on("tapone", function (e) {
                        if (repeat_started) {
                            stopRepeat();
                        }
                        else {
                            showSub('sm_repeat');
                            setAltSub('sm_recites');
                        }
                    });

                    
                    
                    SG.Naver.attach('sm_recites', 'defaultSet', 300);
                }
                else {
                    $("#sel_quraa").change();
                    $("#sel_vtrans").change();
                    if (repeat_started) {
                        $("#recites_repeat").addClass("ay_active").html('<b class="lang" id="lang_deactivateRepeat">' + parseAr(_lang['deactivateRepeat']) + '</b>');
                    }
                    else {
                        $("#recites_repeat").removeClass("ay_active").html('<b class="lang" id="lang_repeat_settings">' + parseAr(_lang['repeat_settings']) + '</b>');
                    }

                }

            },
            sm_repeat: function () {
                if ($.inArray('sm_repeat', inits) == -1) {
                    inits.push('sm_repeat');

                    SG.Trig.on("langChange", function () {
                        $("#repeat_sel_begin_sura").html(build_selSowar(currAya.split('_')[0])).change();
                    });



                    $("#repeat_tog_bu").on("tapone", function (e) {
                        if (in_repeat_mode) {
                            stopRepeat();
                        }
                        else {
                            in_repeat_mode = true;
                            $("#repeat_widg").show();
                            $("#repeat_widg").show();
                            $("#repeat_keyname").html('<b class="lang" id="lang_deactivateRepeat">' + parseAr(_lang['deactivateRepeat']) + '</b>');
                        }
                        SG.Naver.refresh('sm_repeat');

                    });

                    $("#repeat_recites").on("tapone", function (e) {
                        $("#t_bu_play").trigger(END_EV);
                        showSub('sm_recites');
                    });



                    $("#repeat_widg .ay_select").on("tapone", function () {
                        if (repeat_started) {
                            if (confirm(_lang['repeat_notifyStop'])) {
                                stopRepeat();
                            }
                            SG.Naver.get('sm_repeat').scrollTo(0, 0, 0);
                            setTimeout(function () {
                                SG.Naver.refresh('sm_repeat');
                            }, 100);//
                        }
                    });////

                    initCombinedSels();

                    $("#repeat_sel_begin_sura").html(build_selSowar(currAya.split('_')[0])).change();
                    $("#repeat_sel_begin_aya").val(currAya.split('_')[1]).change();

                    SG.Naver.attach('sm_repeat', 'defaultSet', 300);
                }
                else {
                    SG.Naver.refresh('sm_repeat');
                    var sura = currAya.split('_')[0];
                    var aya = currAya.split('_')[1];

                    $("#repeat_sel_begin_sura").val(sura).change();
                    $("#repeat_sel_begin_aya").val(aya).change();


                }

                $("#repeat_for_aya").change();
                $("#repeat_waiting").change();
                $("#repeat_for_all").change();



            },
            sm_mtest: function () {
                if ($.inArray('sm_mtest', inits) == -1) {
                    inits.push('sm_mtest');

                    SG.Trig.on("langChange", function () {
                        $("#mtest_sel_begin_sura").html(build_selSowar()).change();
                    });



                    initCombinedSels();

                    $("#mtest_sel_begin_sura").html(build_selSowar(1)).change();
                    $("#mtest_sel_begin_aya").val(1).change();
                    $("#mtest_sel_end_sura").val(114).change();
                    
                    $("#mtest_start").on("tapone", function (e) {
                        SG.Mtest.start();
                    });

                    SG.Naver.attach('sm_mtest', 'defaultSet', 300);
                }
                else {
                    SG.Naver.refresh('sm_mtest');
                }

            },
            sm_mozaker: function () {
                if ($.inArray('sm_mozaker', inits) == -1) {
                    inits.push('sm_mozaker');

                    SG.Trig.on("langChange", function () {
                        $("#mozaker_1_time").html(build_selMozaker(0)).val(getKey('mozaker_1_time') || -1).change();
                        $("#mozaker_2_time").html(build_selMozaker(2)).val(getKey('mozaker_2_time') || -1).change();
                        $("#mozaker_3_time").html(build_selMozaker(4)).val(getKey('mozaker_3_time') || -1).change();
                        $("#mozaker_4_time").html(build_selMozaker(6)).val(getKey('mozaker_4_time') || -1).change();
                        $("#mozaker_5_time").html(build_selMozaker(8)).val(getKey('mozaker_5_time') || -1).change();
                    });

                    $("#mozaker_1_time,#mozaker_2_time,#mozaker_3_time,#mozaker_4_time,#mozaker_5_time").on("change", function(e,org){
                        var $this = $(this);
                        var curr = parseInt($this.attr('id').split('_')[1], 10);
                        
                        if($this.val() != -1){
                            $this.parents(".ay_form_row").first().next(".ay_form_row").first().show();
                        }
                        else{
                            $this.parents(".ay_form_row").first().next(".ay_form_row").first().hide();
                        }
                        
                        if (org || e.originalEvent) {
                            if( !getKey('mozaker_'+curr+'_time') || getKey('mozaker_'+curr+'_time') != $this.val() ){
                                SG.Naver.refresh('sm_mozaker');

                                setKey('mozaker_'+curr+'_time', $this.val());
                                SG.setMozaker(curr);
                            }
                        }

                    });
                    
                    $("#mozaker_1_time").html(build_selMozaker(0)).val(getKey('mozaker_1_time') || -1).change();
                    $("#mozaker_2_time").html(build_selMozaker(2)).val(getKey('mozaker_2_time') || -1).change();
                    $("#mozaker_3_time").html(build_selMozaker(4)).val(getKey('mozaker_3_time') || -1).change();
                    $("#mozaker_4_time").html(build_selMozaker(6)).val(getKey('mozaker_4_time') || -1).change();
                    $("#mozaker_5_time").html(build_selMozaker(8)).val(getKey('mozaker_5_time') || -1).change();
                    
                    $("#mozaker_1_alert").val(getKey('mozaker_1_alert') || -1).change();
                    $("#mozaker_2_alert").val(getKey('mozaker_2_alert') || -1).change();
                    $("#mozaker_3_alert").val(getKey('mozaker_3_alert') || -1).change();
                    $("#mozaker_4_alert").val(getKey('mozaker_4_alert') || -1).change();
                    $("#mozaker_5_alert").val(getKey('mozaker_5_alert') || -1).change();
                    
                    
                    $("#mozaker_1_alert,#mozaker_2_alert,#mozaker_3_alert,#mozaker_4_alert,#mozaker_5_alert").on("change", function(e,org){
                        if (org || e.originalEvent) {
                            var $this = $(this);
                            var curr = parseInt($this.attr('id').split('_')[1], 10);

                            if( !getKey('mozaker_'+curr+'_alert') || getKey('mozaker_'+curr+'_alert') != $this.val() ){
                                setKey('mozaker_'+curr+'_alert', $this.val());
                                SG.setMozaker(curr);
                            }
                        }

                    });

                    $("#mozaker_1_msg,#mozaker_2_msg,#mozaker_3_msg,#mozaker_4_msg,#mozaker_5_msg").on("tapone", function(){
                        var $this = $(this);
                        var curr = parseInt($this.attr('id').split('_')[1], 10);

                        var b = SG.Dialog.alertt('<textarea style="font-family:sans;font-size:18px;line-height:170%;width:80%;height:60%;direction:rtl" id="fld_mozaker_msg">'+(getKey('mozaker_'+curr+'_msg')?getKey('mozaker_'+curr+'_msg'):_lang['mozaker_msg_default'])+'</textarea>', parseAr(_lang['copy']), _emp);
                        //b.hideBu();
                        var contrs = [{cap:parseAr(_lang['alert_ok']),cb:setAlertMsg},
                                      {cap:parseAr(_lang['cancel']),cb:function(){b.tm()}}];

                        b.setContrs(contrs);
                        function setAlertMsg(){
                            if(!getKey('mozaker_'+curr+'_msg') || getKey('mozaker_'+curr+'_msg') != $.trim($("#fld_mozaker_msg").val())){
                                setKey('mozaker_'+curr+'_msg', $.trim($("#fld_mozaker_msg").val()));
                                SG.setMozaker(curr);
                            }
                            b.tm();
                        }
                    
                    });
                    
                    SG.Naver.attach('sm_mozaker', 'defaultSet', 300);
                }
                else {
                    SG.Naver.refresh('sm_mozaker');
                }

            },

            sm_opts: function () {
                if ($.inArray('sm_opts', inits) == -1) {
                    inits.push('sm_opts');

                    if (!canInvert()) {
                        $("#vision_cont").hide();
                    }

                    $("#bu_l_ar,#bu_l_en").on("tapone", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if ($(this).attr("id") == 'bu_l_ar') {
                            $("#bu_l_ar").addClass('ay_active');
                            $("#bu_l_en").removeClass('ay_active');
                            var l = 'ar';
                        }
                        else {
                            $("#bu_l_en").addClass('ay_active');
                            $("#bu_l_ar").removeClass('ay_active');
                            var l = 'en';
                        }

                        if (l == currLang) return;

                        switchLang(l);
                    });

                    $(".bu_mosshaf").on("tapone", function (e, el) {
                        var mosshaf = $(this).attr("id").replace(/bu_mosshaf_/, '');
                        if (mosshafSeld && mosshaf == 'warsh') {
                            if (!confirm(_lang['confirm_warsh'])) {
                                return;
                            }
                        }
                        $(".bu_mosshaf").removeClass('ay_active');
                        $(this).addClass('ay_active');
                        set_mosshaf(mosshaf, '');
                    });
                    $(".bu_vision").on("tapone", function (e, el) {
                        var vision = $(this).attr("id").replace(/bu_vision_/, '');
                        $(".bu_vision").removeClass('ay_active');
                        $(this).addClass('ay_active');
                        set_vision(vision);
                    });


                    $("#bu_mosshaf_" + currMosshaf).addClass("ay_active");
                    $("#bu_vision_" + currVision).addClass("ay_active");
                    $("#bu_l_" + currLang).addClass('ay_active');
                    SG.Naver.attach('sm_opts', 'defaultSet', 300);

                }
                else {
                    //$("#bu_mosshaf_"+currMosshaf).addClass("ay_active");
                    //$("#bu_vision_"+currVision).addClass("ay_active");
                    //$("#bu_l_"+currLang).addClass('ui-btn-active');
                }

            }


        };
        var show = function () {
            SG.Trig.invoke("showMenu");
            if (!oldAndroid) {
                $("#menu .noAnim").hide();
                $("#menu").addClass("anim_menu");
            }
            $("#menu").show();


            init(900, 'main');
            setTimeout(function () {
                $("#menu").trigger("show");
                if (!oldAndroid) {
                    $("#menu .noAnim").show();
                }
                SG.Naver.activate('menu');
            }, 1000);
            state = 1;
        };
        var hide = function () {
            SG.Trig.invoke("hideMenu");
            $("#menu").hide();
            $("#menu").removeClass("anim_menu");
            SG.Naver.deactivate('menu');
            state = 0;
            $("#menu").trigger("hide");//
        };
        var toggle = function (t) {
            var vas = false;
            if (viewAltSub) {
                vas = viewAltSub;
            }
            viewAltSub = false;
            if ((t > 0) && vas) {
                showSub(vas);
            }
            else if ((t < 0) && activeSub) {
                hideSub(activeSub);
            }
            else {
                if (t > 0 && visible()) return;
                if (t < 0 && !visible()) return;
                (visible()) ? hide() : show();
            }
        }
        var visible = function () {
            return (state) ? true : false;
        }

        var showSub = function (sub) {
            toggle(-1); // hide this menu
            //		setTimeout(function(){
            SG.Trig.invoke("showSubMenu");
            if (!oldAndroid) {
                $("#" + sub + " .noAnim").hide();
                $("#" + sub).addClass('anim_menu');
            }
            else {
                window.scroll(0, 0);
            }
            $("#" + sub).show();
            activeSub = sub;
            init(700, sub);
            setTimeout(function () {
                SG.Naver.activate(sub);
                $("#" + sub).trigger("show");
                setTimeout(function () {
                    if (!oldAndroid) {
                        $("#" + sub + " .noAnim").show();
                    }
                    $("#" + sub).focus();
                    $("#" + sub).click();

                }, 200);
            }, 750);

            //		},0)
        };
        var hideSub = function (sub, showMenu) {
            SG.Trig.invoke("hideSubMenu");
            $("#" + sub).hide();
            activeSub = false;
            if (oldAndroid) {
                window.scroll(0, 0);
            }

            if (showMenu) toggle(1);
            SG.Naver.deactivate(sub);
            $("#" + sub).trigger("hide");

        };
        var hideActiveSub = function () {
            if (!activeSub) return;
            $("#" + activeSub).hide();

            SG.Naver.deactivate(activeSub);
            $("#" + activeSub).trigger("hide");

            activeSub = false;

            SG.Trig.invoke("hideSubMenu");

            toggle(1);

        };

        var setAltSub = function (sub) {
            init(0, 'main');
            viewAltSub = sub;
        }
        var init = function (delay, what) {
            if (delay)
                setTimeout((initers[what] || _emp), delay);
            else 
			(initers[what] || _emp)();
        }
        var setAction = function(id){

        }
        var setIniter = function (id, cb) {
            initers[id] = function () {
                if ($.inArray(id, inits) == -1) {
                    inits.push(id);
                    (cb || _emp)(true);
                }
                else {
                    (cb || _emp)(false);
                }
            }

        }
        var isInited = function (id) {
            return ($.inArray(id, inits) != -1);
        }
        return {
            toggle: toggle,
            setAltSub: setAltSub,
            hideActiveSub: hideActiveSub,
            setAction: setAction,
            setIniter: setIniter,
            isInited: isInited,
            showed: function () { return state !== null }
        };
    })($);

    SG.ToolsMenu = (function ($) {
        var state = null;
        var toggle = function (t) {
            if (t > 0 && state) return;
            if (t < 0 && !state) return;
            (state) ? hide() : show();

        }
        function show() {
            state = 1;

            SG.Trig.invoke("showToolsMenu");

            $("#status").removeClass('anim_statusIn anim_statusOut').show().addClass('anim_statusIn');
            $("#tools").removeClass('anim_toolsIn anim_toolsOut').show().addClass('anim_toolsIn');
            if (!SG.Menu.showed()) {
                setTimeout(function () {
                    $("#menu_hint").removeClass('anim_menuHintIn').show().addClass('anim_menuHintIn');
                    setTimeout(function () {
                        $("#menu_hint").fadeOut();
                    }, 3000);
                }, 1000);
            }
        }
        function hide(inst) {
            state = 0;

            SG.Trig.invoke("hideToolsMenu");

            $("#menu_hint").hide();

            $(".tools_fl").hide();

            if (inst) {
                $("#status").hide();
                $("#tools").hide();
            }
            else {
                $("#status").removeClass('anim_statusIn').addClass("anim_statusOut");
                $("#tools").removeClass('anim_toolsIn').addClass("anim_toolsOut");

                setTimeout(function () {
                    $("#status").hide();
                    $("#tools").hide();
                }, 200);

            }
        }
        return {
            toggle: toggle,
            getState: function () { return state; }
        };

    })($);

    SG.actRun = function () {
        var lockResizeEv = false;

        SG.DimMan.initResizeEv();

        $(window).on("resize", function () {
            if (lockResizeEv) return;
            lockResizeEv = true;

            setTimeout(function () {
                SG.DimMan.handleResizeEv();
                lockResizeEv = false;
            }, 300);

        });

        SG.Naver.get("wrapper").goToPage(prevS, 0, 0);
        loadAya(currAya.split('_')[0], currAya.split('_')[1], false, true);

    }

    SG.Trig = (function ($) {
        var c = $('<span></span>');
        return {
            invoke: function (ev, param) {
                c.trigger(ev, param);
            },
            on: function (ev, cb) {
                c.on(ev, cb);
            },
            one: function(ev, cb){
                c.one(ev, cb);
            },
            off: function(ev){
                c.off(ev);
            }
        }
    })($);
    SG.Tapper = (function () {
        var els = {}
        var on = function () {
            $(el).on(START_EV, function () {

            });
        }
    })();
    SG.DimMan = (function ($) { // central dimensions manager

        var prevOri = null,
            prevH = null,
            prevW = null,
            doZoom = null;

        function adjustDims(toggleZoom) {
            var w = window.innerWidth;
            var h = window.innerHeight;
            var tx = w / 12;
            if (doZoom === null) {
                doZoom = (SG.Initer.currZoom != null) ? parseInt(SG.Initer.currZoom,10) : (window.innerWidth <= 320);
            }
            if (toggleZoom) {
                doZoom = !doZoom;////
                setKey('curr_zoom', (doZoom)?"1":"0"); // stored values are strings
            }
            isZoom = doZoom;
            scrW = w;
            scrH = h;

            var zoom_factor = (doZoom) ? masahef[currMosshaf]['factor'] : 0;

            //trace(zoom_factor);
            scrW_mosshaf = scrW + scrW * zoom_factor
            //trace(scrW_mosshaf);


            transH = 0;
            if (trans_enb) {
                if (!transR) {
                    transR = 33;
                }
                transH = Math.ceil(scrH * (transR / 100));
                $("#trans").height(transH);
                $("#trans").css('top', scrH - transH + 1);
                $("#trans_ctrl").css('top', scrH - transH + 1);
                $("#trans,#trans_ctrl").show();
            }

            $("#scroller").height((scrW_mosshaf * masahef[currMosshaf]['whr']) + transH);
            $("#wrapper").width(scrW_mosshaf);

            $("#wrapper").css('left', -(zoom_factor / 2) * 100 + "%");
            $("html,body").css('height', scrH);

            $("#wrapper").height(scrH);
            $(".popup").css("min-height", scrH + 10 + "px");

            //$("#tools").css({ top: scrH - $("#tools").height() });

            $("#cont").height(scrW_mosshaf * masahef[currMosshaf]['whr']);
            $("#cont").width((100 / tViews) + '%');
            $("#menu,.submenu").height(scrH);
        }


        return {
            refresh: function (rotated, zoom) {
                adjustDims(zoom);
                SG.Naver.refreshActives();
                p_scrollTo();
                trans_scrollTo();

                if (rotated) {
                    SG.ToolsMenu.toggle(-1);
                    addHilites(currPage, true);
                }
            },
            initResizeEv: function () {
                prevOri = window['orientation'];
                prevH = window.innerHeight;
                prevW = window.innerWidth;
            },
            handleResizeEv: function () {
                var resNav = false;
                var rotated = false;
                if ((typeof window['orientation'] != 'undefined' && window['orientation'] != prevOri)
                 || (window.innerWidth != prevW)) {
                    resNav = true;
                    rotated = true;
                    SG.Trig.invoke('orientation');
                }

                if (window.innerHeight != prevH) {
                    resNav = true;
                }

                if (resNav) {
                    setTimeout(function () {
                        SG.DimMan.refresh(rotated); ////
                    }, 50);
                }

                prevW = window.innerWidth;
                prevH = window.innerHeight;
                prevOri = window['orientation'];

            },

            adjust: adjustDims

        }
    })($);

    /*----------------- End of Context --------------------*/




    function refreshTransPane(){
        if(! trans_enb) return;
        /////
        $("#trans_cont").html('');

        getTrans(currPage, currTrans, function (txt) {
            setTransToPane(txt);
        });
    
    }
    function showTransPane() {
        trans_enb = 1;
        SG.DimMan.refresh(); // will show the trans pane automatically
    }
    function hideTransPane(){
        trans_enb = 0;
        $("#trans,#trans_ctrl").hide();
        SG.DimMan.refresh();
    }
    function setTransToPane(txt) {
        $("#trans_cont").html(txt);
        if (SG.Naver.get('trans')) SG.Naver.refresh('trans');
        hiliteCurrAya();
        trans_scrollTo();
    }

    function getTrans(page, trans, cb) {
        var page = page || currPage;
        if (!page) return;
        var b_sura = QuranData[page_key][page][0];
        var b_aya = QuranData[page_key][page][1];

        var e_sura = QuranData[page_key][page + 1][0];
        var e_aya = QuranData[page_key][page + 1][1];

        var cl1 = (tarajem[trans]['dir'] == "rtl") ? 'cl_rtl' : 'cl_ltr';
        //var txt = '<div class="'+cl1+'">';
        var url = "tarjmat/" + trans+".json";

        var begin = aya2id(b_sura, b_aya);
        var end = aya2id(e_sura, e_aya);


        var prevAya = 0;


        SG.Plugins.DBP.trans(trans, begin, end, function (j) {
            if (!j) return;

            cb('<div class="' + cl1 + '">' + transAdabter(j, trans) + '</div>');
        }, function (j) {
            $.get("tarjmat/"+trans+".json", function (json) {
                var j = {};
                for (var ip in json.tafsir) {
                    j[ip] = json.tafsir[ip]['text'];
                }

                cb('<div class="' + cl1 + '">' + transAdabter(j, trans) + '</div>');
            }, 'json');
        });
    }
    function showTafsir(buEle) {

        var $obj = $(buEle);
        if (!$obj.data('title')) $obj.data('title', $obj.html());
        else if ($obj.data('title') != $obj.html()) {
            if ($obj.data('xhr')) {
                $obj.data('xhr').abort();
            }
            $obj.html($obj.data('title'));
            return;
        }
        var title = $obj.data('title');

        $obj.html('<img src="images/loading_micro.gif" style="border:none">');

        var author = $("#tafsir_sel_tafsir").val();
        var caption = $("#tafsir_sel_tafsir option").filter(":selected").html();
        var sura = $("#tafsir_sel_sura").val();
        var aya = $("#tafsir_sel_aya").val();


        var hp = '';
        galb(sura, aya);
        function galb(sura, aya) {
            window.scroll(0, 0);

            $("#t_next,#t_prev").hide();
            $("#t_cont_sub").html('');

            $("#t_cont_sub").html('<div style="text-align:center;padding-top:30%"><img src="images/loading_trans.gif"></div>');

            var id = aya2id(sura + '_' + aya);

            SG.Plugins.DBP.tafsir(author, id, function (nass) {
                $obj.html(title);

                if (!nass) return;

                SG.Menu.toggle(-1);

                setNassTafsir(nass);

            }, function (j) {
                hp = 'tafserat/' +  author + '-sura'+sura + '-aya'+aya + '.html';
                $obj.data('xhr', $.get(hp));
                $obj.data('xhr').done(function (bayan) {
                    $obj.html(title);
                    SG.Menu.toggle(-1);

                    var nass_aya = '<div class="tafsir_txt_aya">' + bayan.split('|||')[0] + ' <span class="tafsir_txt_aya_num">[' + QuranData.Sura[sura][sura_key] + ' : ' + aya + ']</span> ' + '</div>';
                    var nass_tafsir = '<div class="tafsir_txt_tafsir">' + bayan.split('|||')[1] + '</div>';
                    var nass = '<div class="tafsir_txt">' + nass_aya + nass_tafsir + '</div>'

                    setNassTafsir(nass);
                });
                $obj.data('xhr').fail(function () {
                    $obj.html(title);
                    alert(_lang['chk_conn']);
                    $("#t_cont_sub").html("");

                });
                
            });

        }

        function setNassTafsir(nass) {

            //nass = nass.replace(/[ًٌٍََُُِّْٰ]/gi,'');

            $("#t_cont_title").html(caption);
            if (!$("#t_cont").is(":visible")) {
                $('#t_cont').show();
                $("#t_cont").trigger("show");
                $("#t_cont_sub").html(nass);
                $("#t_next,#t_prev").show();
            }
            else {
                if(navigator.userAgent.indexOf("Android 4.0") != -1 || navigator.userAgent.indexOf("Android 2") != -1){
                    $("#t_cont").hide();
                }
                //$("#t_cont_sub").html(" ");

                setTimeout(function () {
                    if(navigator.userAgent.indexOf("Android 4.0") != -1 || navigator.userAgent.indexOf("Android 2") != -1){
                        $('#t_cont').show();
                    }

                    $("#t_cont_sub").html(nass);
                    $("#t_next,#t_prev").show();

                    //$("#t_cont_sub").css('height',$("#t_cont_sub").height());

                    //$("#t_cont").css('height',$("#t_cont_sub").height()+90);
                }, 1000);

            }

        }

        $("#t_sel_tafsir").off('change');
        $("#t_sel_tafsir").html(build_selTafaser(author)).change();
        $("#t_sel_tafsir").on('change', function () {
            author = $(this).val();
            galb(sura, aya);
        });
        $("#t_next").off(END_EV);
        $("#t_next").on(END_EV, function () {
            $(this).blur();
            if (++aya > QuranData.Sura[sura][1]) {
                aya = 1;
                if (sura++ >= 114) {
                    return;
                }
            }
            galb(sura, aya);
        });
        $("#t_prev").off(END_EV);
        $("#t_prev").on(END_EV, function () {
            $(this).blur();

            if (--aya < 1) {
                if (--sura < 1) {
                    return;
                }
                aya = QuranData.Sura[sura][1];
            }
            galb(sura, aya);
        });
    }


    function addHilites(page, scroll, mtest, hilite_id, $cont , cb) {
        if(! hilite_id) hilite_id = 'hilite';
        if(! $cont) $cont = $("#cont");
        if(! cb) cb = hCurrAya;
        if(! mtest){
            $(".hiliter.copy").remove();
        }



        if (!hilites[currMosshaf]) hilites[currMosshaf] = {};

        if (hilites[currMosshaf][page]) {
            drawHilites(page, scroll, mtest, hilite_id, $cont);

            cb()
            return;
        }

        SG.Plugins.DBP.amaken(currMosshaf, page, function (j) {
            hilites[currMosshaf][page] = j;//sortAyat(json);
            drawHilites(page, scroll, mtest, hilite_id, $cont);
            delete hilites[currMosshaf][page];

            cb();

        }, function () { alert('Internal Error') });
        //
        function hCurrAya(){
            setTimeout(function () {
                hiliteCurrAya();
                if (scroll) {
                    p_scrollTo();
                }
            }, 200);
        }
        
    }

    var _hlMeta = {
        "hafs": {
            height: 30,
            mgwidth: 40,
            twidth: 416,
            ofwidth: 10,
            ofheight: 15,
            fasel_sura: 110,
            page_top: 37,
            page_sura_top: 80,
            mem_height: 45,
            mem_ofheight: 24,

            fp_height: 20,
            fp_mgwidth: 80,
            fp_twidth: 376,
            fp_ofwidth: 5,
            fp_ofheight: 10
        },
        "warsh": {
            height: 40,
            mgwidth: 25,
            twidth: 427,
            ofwidth: 17,
            ofheight: 20,
            fasel_sura: 140,
            page_top: 30,
            page_sura_top: 130,
            mem_height: 48,
            mem_ofheight: 22,

            fp_height: 20,
            fp_mgwidth: 80,
            fp_twidth: 376,
            fp_ofwidth: 5,
            fp_ofheight: 10
        },
        "tajweed": {
            height: 40,
            mgwidth: 25,
            twidth: 427,
            ofwidth: 17,
            ofheight: 20,
            fasel_sura: 140,
            page_top: 30,
            page_sura_top: 80,
            mem_height: 48,
            mem_ofheight: 22,

            fp_height: 30,
            fp_mgwidth: 100,
            fp_twidth: 350,
            fp_ofwidth: 10,
            fp_ofheight: 15
        }
    }


    function drawHilites(page, scroll, mtest, hilite_id, $cont) {

        //hl_remove();

        if (currMosshaf == 'tajweed') {
            //$("#page_num").css({top:scrW * masahef[currMosshaf]['whr'] - 25  , left:scrW/2 - 15}).html(currPage);
        }

        var amaken = hilites[currMosshaf][page];
        var sura, aya, top, left, prev_top, prev_left,
            mgwidth, mgheight, twidth, ofwidth, ofheight,
            fasel_sura, page_top, page_sura_top,
            width, height, diff, 
            hl_id, hilite_id,
            b_top = 0,b_left = 0;




        height = _hlMeta[currMosshaf]['height'];
        mgwidth = _hlMeta[currMosshaf]['mgwidth'];
        twidth = _hlMeta[currMosshaf]['twidth'];
        ofwidth = _hlMeta[currMosshaf]['ofwidth'];
        ofheight = _hlMeta[currMosshaf]['ofheight'];
        fasel_sura = _hlMeta[currMosshaf]['fasel_sura'];
        page_top = _hlMeta[currMosshaf]['page_top'];
        page_sura_top = _hlMeta[currMosshaf]['page_sura_top'];

        if(mtest){
            height = _hlMeta[currMosshaf]['mem_height'];
            ofheight = _hlMeta[currMosshaf]['mem_ofheight'];
        }
        

        if (page == 1 || page == 2) {
            height = _hlMeta[currMosshaf]['fp_height'];
            mgwidth = _hlMeta[currMosshaf]['fp_mgwidth'];
            twidth = _hlMeta[currMosshaf]['fp_twidth'];
            ofwidth = _hlMeta[currMosshaf]['fp_ofwidth'];
            ofheight = _hlMeta[currMosshaf]['fp_ofheight'];
        }

        prev_top = null;
        prev_left = null;

        var count = 1;
        //trace(amaken);
        for (var i in amaken) {
            sura = i.split('_')[0];
            aya = i.split('_')[1];

            top = amaken[sura + "_" + aya][1] - ofheight;
            left = amaken[sura + "_" + aya][0] - ofwidth;
            if(currMosshaf == "hafs" && (page == 1 || page == 2)){
                //alert(top);
                //top = top-20;
                //alert(top);
            }
            width = 0;

            hl_id = sura + '_' + aya + '__' + hilite_id;

            if (count == 1) {
                prev_left = twidth;
                if (page == 1 || page == 2) {
                    prev_top = 270;
                }
                else {
                    if (aya == 1) {
                        prev_top = page_sura_top;
                    }
                    else {
                        prev_top = page_top;
                    }
                }
            }
            else {
                if (aya == 1) {
                    prev_top += fasel_sura;
                    prev_left = twidth;
                }
            }

            diff = (top - prev_top);
            if (diff > (height * 1.6)) {
                hl_draw(hl_id+'_1', prev_top, mgwidth, prev_left - mgwidth, height, b_top, b_left, $cont);
                hl_draw(hl_id+'_2', top, left, (twidth - left), height, b_top, b_left, $cont);
                hl_draw(hl_id+'_3', (prev_top + height), mgwidth, (twidth - mgwidth), (diff - height), b_top, b_left, $cont);

            }
            else if (diff > (height * 0.6)) {
                hl_draw(hl_id+'_1', prev_top, mgwidth, (prev_left - mgwidth), height, b_top, b_left, $cont);
                hl_draw(hl_id+'_2', top, left, (twidth - left), height, b_top, b_left, $cont);
            }
            else {
                width = prev_left - left;
                hl_draw(hl_id+'_1', top, left, width, height, b_top, b_left, $cont);
            }

            count++;

            prev_top = top;
            prev_left = left;

        }

        //hl_draw(hl_id , top , left , width , height);
    }
    function hl_draw(id, top, left, width, height, b_top, b_left, $cont) {
        var b_top = 0;
        var b_left = 0;
        var top = b_top + top;
        var left = b_left + left;

        var width = ((scrW_mosshaf / 456) * width);
        var height = ((scrW_mosshaf / 456) * height);

        var left = ((scrW_mosshaf / 456) * left);
        var top = ((scrW_mosshaf / 456) * top);

        $("#hilite").clone().attr('id', id).addClass('copy').appendTo($cont);


        setTimeout(function () {
            $("#" + id).css({ "display": "block", "top": top, "left": left, "width": width, "height": height });
        }, 100);
    }
    function hl_remove() {
        $(".hiliter.copy").remove();
    }


    function playAya(played) {//
        if (!verifyAya()) {
            loadAya(currAya.split('_')[0], currAya.split('_')[1], true, true);
            return;
        }
        if (pausedByCall) {
            return;
        }
        if (p_paused) {
            stopPlayer();
        }
        if (globalPlay) {
            if (in_repeat_mode && !repeat_started) {
                startRepeat();
                return;
            }
            var callId = rand(1, 100000);
            if ((typeof played == 'undefined' || played == false) && currAya.split('_')[1] == 1 && currAya.split('_')[0] != 1 && currAya.split('_')[0] != 9 && currQaree != 'Banna_32kbps' && currQaree != 'Ahmed_ibn_Ali_al-Ajamy_64kbps' && currQaree != 'warsh_yassin_64kbps') {
                SG.getAudio(currQaree, 1, 1, callId, function (file, cid) {
                    if (!globalPlay) return;
                    if (cid != callId) return;
                    SG._ap1.play(file);
                    SG._ap1.onComplete = function () {//
                        pb_played = false;
                        //setNextAya();
                        playAya(true);
                    }

                }, function (cid) {
                    if (!globalPlay) return;
                    if (cid != callId) return;

                    stopPlayer();
                    if (al_audio && al_audio.tm) al_audio.tm();
                    al_audio = SG.Dialog.alertt(parseAr(_lang['fnf_audio']), false, function () { al_audio = false });
                });

            }
            else {
                if(currQaree == 'khaleefa_96kbps'){
                    if(parseInt(currAya.split('_')[0]) < 46){
                        stopPlayer();
                        SG.Dialog.alertt(parseAr(_lang['recite_kh_res']));
                    }
                }
                if (played && pb_trans_map[played]) {
                    var cQaree = pb_trans_map[played];
                }
                else {
                    var cQaree = currQaree;
                }
                
                
                SG.getAudio(cQaree, currAya.split('_')[0], currAya.split('_')[1], callId, function (file, cid) {

                    if (!globalPlay) return;
                    if (cid != callId) return;
                    SG._ap1.play(file);

                    preloadAya();

                    SG._ap1.onComplete = function () {
                        if (repeat_started) {
                            repeat_ayaEnded(this.duration);
                            return;
                        }
                        if (pb_trans && !pb_played) {
                            playAya(pb_trans);
                            pb_played = true;
                            return;
                        }
                        pb_played = false;
                        if(autoStop && ['sura','page','juz'].indexOf(autoStop) != -1){
                            if(autoStop == "page"){
                                if(isLastAyaInPage(currAya.split('_')[0], currAya.split('_')[1])){
                                    stopPlayer();
                                    confirmm('',parseAr(_lang['autoStop_page_msg']),parseAr(_lang['autoStop_deactivate']),parseAr(_lang['alert_ok']),function(){
                                        $("#sel_autoStop").val("0").change();
                                        setNextAya();
                                        $("#tls_play").trigger(END_EV);
                                    }, _emp);
                                }
                                else{
                                    setNextAya();
                                    playAya();
                                }
                            }
                            else if(autoStop == "sura"){
                                if(isLastAyaInSura(currAya.split('_')[0], currAya.split('_')[1])){
                                    stopPlayer();
                                    confirmm('',parseAr(_lang['autoStop_sura_msg']),parseAr(_lang['autoStop_deactivate']),parseAr(_lang['alert_ok']),function(){
                                        $("#sel_autoStop").val("0").change();
                                        setNextAya();
                                        $("#tls_play").trigger(END_EV);
                                    }, _emp);

                                }
                                else{
                                    setNextAya();
                                    playAya();
                                }
                            }
                            else if(autoStop == "juz"){
                                if(isLastAyaInJuz(currAya.split('_')[0], currAya.split('_')[1])){
                                    stopPlayer();
                                    confirmm('',parseAr(_lang['autoStop_juz_msg']),parseAr(_lang['autoStop_deactivate']),parseAr(_lang['alert_ok']),function(){
                                        $("#sel_autoStop").val("0").change();
                                        setNextAya();
                                        $("#tls_play").trigger(END_EV);
                                    }, _emp);

                                }
                                else{
                                    setNextAya();
                                    playAya();
                                }
                            }                            
                        }
                        else{ 
                            setNextAya();
                            playAya();
                        }
                        
                    }
                }, function (cid) {
                    if (!globalPlay) return;
                    if (cid != callId) return;

                    stopPlayer();
                    if (al_audio && al_audio.tm) al_audio.tm();
                    al_audio = SG.Dialog.alertt(parseAr(_lang['fnf_audio']), false, function () { al_audio = false });
                });

            }
        }



        hiliteCurrAya();
        //togglePopMenu(-1);
        //toggleHandMenu(-1);
        setTimeout(function(){
            p_scrollTo();
        }, 700);

        setTimeout(function () {
            trans_scrollTo();
        }, 500);


    }


    function preloadAya() {
        if (pb_trans && !pb_played) {
            var aya = currAya;
            var cQaree = pb_trans_map[pb_trans];
        }
        else {
            var aya = setNextAya(true);
            var cQaree = currQaree;
        }

        SG.preloadAudio(cQaree, aya.split('_')[0], aya.split('_')[1]);
    }


    function verifyAya() {
        var sura = currAya.split('_')[0];
        var aya = currAya.split('_')[1];


        var page = suraSafha(sura, aya);
        if (page != currPage) return false;
        return true;
    }
    function setNextAya(ret) {
        var sura = parseInt(currAya.split('_')[0]);
        var aya = parseInt(currAya.split('_')[1]);

        //var sura_ayat = QuranData.Sura[sura][1];
        if (++aya > QuranData.Sura[sura][1]) {
            sura = sura + 1;
            aya = 1;
        }
        if (sura > 114) {
            sura = 1;
            aya = 1;
        }

        if (typeof ret != 'undefined') return sura + '_' + aya;

        setCurrAya(sura, aya);

    }

    function loadAya(sura, aya, frame, scroll) {
        if (repeat_started) {
            if (intAya(sura + '_' + aya) < intAya(repeat['begin_aya']) || intAya(sura + '_' + aya) > intAya(repeat['end_aya'])) {
                if (!confirm(_lang['repeat_notifyAway'])) {
                    currPage = 0;
                    loadAya(currAya.split('_')[0], currAya.split('_')[1]);
                    return;
                }
                else {
                    stopPlayer();
                    stopRepeat();
                }
            }
        }
        SG._ap1.stop();
        var cp = suraSafha(sura, aya);
        if (frame) {
            $("#thelist li img").attr('src', 'frame_' + currMosshaf + ((currVision == 'night') ? '_night' : '') + '.jpg');
        }
        gotoPage(cp, frame);
        setCurrAya(sura, aya);

        addHilites(cp, scroll);
        SG.refreshTransPane();
        pb_played = false;
        
        playAya();
     
    }

    function gotoPage(p, frame) {
        if (p == currPage && !frame) return;

        if (p == 'next' || p == 'prev') {
            if (p == 'next') {
                currPage++;
            }
            else {
                currPage--;
            }
        }
        else {
            currPage = parseInt(p) || 1;
        }
        if (currPage > 604) currPage = 604;
        else if (currPage < 1) currPage = 1;

        SG.Trig.invoke("pageChange", currPage);


        loadPage(currPage);
    }

    var imgLoadingHolder = false;
    function loadPage(cp) {
        c(CPX);
        var view = CPX;
        if (imgs_t) clearTimeout(imgs_t);
        if (imgs_t2) clearTimeout(imgs_t2);
        /*
        $(".right_shadow,.left_shadow").hide();
        if(cp%2){
            $("#ls"+view).show();
            $("#rs"+(view+1)).show();
            $("#rs"+(view-1)).show();
        }
        else{
            $("#rs"+view).show();
            $("#ls"+(view+1)).show();
            $("#ls"+(view-1)).show();
        }
        */
        if(imgLoadingHolder){
            imgLoadingHolder.tm();
        }
        //alert(CPX);
        //alert(view);
        var imgLoaded = false;
        setTimeout(function(){
            if(imgLoaded) return;
            imgLoadingHolder = SG.Dialog.loading();
        }, 3000);
        var callId = rand(1, 10000);
        SG.getImg(cp + '.' + imgs_ext, callId, function (img, cid) {
            if (cid != callId) return;
            imgLoaded = true;
            if(imgLoadingHolder){
                imgLoadingHolder.tm();
            }
            var m = $("#img" + (view))[0];

            try {
                if (view - 3 >= 0) $("#img" + (view - 3))[0].src = 'frame_' + currMosshaf + ((currVision == 'night') ? '_night' : '') + '.jpg';
            }
            catch (e) { }
            try {
                if (view + 3 < tViews) $("#img" + (view + 3))[0].src = 'frame_' + currMosshaf + ((currVision == 'night') ? '_night' : '') + '.jpg';
            }
            catch (e) { }
            if (currVision == 'night') {
                if (m.src.length < 500) {
                    nighter(m,img);
                }
                //trigger("pageLoaded" , [cp]);
            }
            else {
                m.src = img;
            }
        }, function () {
            if(imgLoadingHolder){
                imgLoadingHolder.tm();
            }
            $("#img" + (view))[0].src = 'frame_' + currMosshaf + ((currVision == 'night') ? '_night' : '') + '.jpg';
            if (al_image && al_image.tm) al_image.tm();
            al_image = SG.Dialog.alertt(parseAr(_lang['fnf_image']), false, function () { al_image = false });
        });

        if (view > 0 && (cp + 1) <= 604) {
            //$("#img"+(view-1))[0].src =  'frame_'+currMosshaf+((currVision=='night')?'_night':'')+'.jpg';
            SG.getImg((cp + 1) + '.' + imgs_ext, callId, function (img, cid) {
                if (cid != callId) return;
                //$("#img"+(view-1))[0].src = img
                var m = $("#img" + (view - 1))[0];
                if (currVision == 'night') {
                    if (m.src.length < 500) {
                        if (imgs_t) clearTimeout(imgs_t);
                        imgs_t = setTimeout(function () {
                            nighter(m,img);
                            imgs_t = 0;
                        }, 1000);
                    }
                }
                else {
                    m.src = img;
                }

            }, _emp);
        }
        if (view < (tViews - 1) && (cp - 1) >= 1) {
            //$("#img"+(view+1))[0].src =  'frame_'+currMosshaf+((currVision=='night')?'_night':'')+'.jpg'
            SG.getImg((cp - 1) + '.' + imgs_ext, callId, function (img, cid) {
                if (cid != callId) return;
                //$("#img"+(view+1))[0].src = img
                var m = $("#img" + (view + 1))[0];
                if (currVision == 'night') {
                    if (m.src.length < 500) {
                        if (imgs_t2) clearTimeout(imgs_t2);
                        imgs_t2 = setTimeout(function () {
                            nighter(m,img);
                            imgs_t2 = 0;
                        }, 1300);
                    }
                }
                else {
                    m.src = img;
                }

            }, _emp);
        }

        function nighter(m,img){
            $(m).addClass("nightfix");
            var imgi = new Image();

            imgi.src = img;
            if (imgi.loaded) {
                m.src = invert(imgi);

                setTimeout(function () {
                    $(m).removeClass('nightfix');
                }, 200);

            }
            else {
                imgi.onload = function () {
                    m.src = invert(imgi);
                    setTimeout(function () {
                        $(m).removeClass('nightfix');
                    }, 200);
                }
            }
        }

        //togglePopMenu(-1);
        //toggleHandMenu(-1);

        //playAya();
    }


    function hiliteCurrAya() {
        //return;
        var sura = currAya.split('_')[0];
        var aya = currAya.split('_')[1];
        //$(".hiliter.copy.active").removeClass('active');
        if (aya_prev) {
            $("#" + aya_prev + '__hilite_1, #' + aya_prev + '__hilite_2, #' + aya_prev + '__hilite_3').removeClass('active');
            $("#" + aya_prev + '__trans').removeClass('active');
        }
        $("#" + sura + '_' + aya + '__hilite_1,#' + sura + '_' + aya + '__hilite_2,#' + sura + '_' + aya + '__hilite_3').addClass('active');
        $("#" + sura + '_' + aya + '__trans').addClass('active');
        aya_prev = sura + '_' + aya;
    }

    function setCurrAya(s, a) {
        if (repeat_started) {
            if (intAya(s + '_' + a) < intAya(repeat['begin_aya']) || intAya(s + '_' + a) > intAya(repeat['end_aya'])) {
                if (!confirm(_lang['repeat_notifyAway'])) {
                    return;
                }
                else {
                    stopPlayer();
                    stopRepeat();
                }
            }
        }

        var sura = s + '';
        var aya = a;
        if (sura.indexOf('_') != -1) {
            aya = sura.split('_')[1];
            sura = sura.split('_')[0];
        }
        sura = parseInt(sura);
        aya = parseInt(aya);
        if (isNaN(sura) || sura < 1) sura = 1;
        if (sura > 114) sura = 114;

        if (isNaN(aya) || aya > QuranData.Sura[sura][1]) aya = 1;
        prevAya = currAya;
        currAya = sura + '_' + aya;
        //$.get(url_interface+'&do=current&sub=aya&state='+currAya);

        setKey('curr_aya', currAya);

        SG.Trig.invoke("ayaChange", [sura, aya]);

    }

    function trans_scrollTo($item) {
        if (!$item) {
            var $item = $("#" + currAya.split('_')[0] + '_' + currAya.split('_')[1] + '__trans');
        }
        if (!trans_enb) return;
        if (!$item[0]) return;
        if (!SG.Naver.get('trans')) return;
        try {
            SG.Naver.get('trans').scrollToElement($item[0], 200);
        }
        catch (e) { }

    }
    function p_scrollTo($item) {
        if (!$item) {
            var $item = $("#" + currAya.split('_')[0] + '_' + currAya.split('_')[1] + '__hilite_1');
        }

        if (!$item[0]) return;
        if (!SG.Naver.get('wrapper')) return;

        var ypos = $item.offset().top;
        if (ypos > (scrH - transH)){
            ypos  = ypos - 10;//((scrH - transH)/2);
            ypos += Math.abs(SG.Naver.get('wrapper').y);
        }
        else if(ypos < 0){
            ypos  = ypos - 10;//((scrH - transH)/2);
            ypos += Math.abs(SG.Naver.get('wrapper').y);
        }
        else{
            ypos = 0;
        }
        ypos = (Math.abs(ypos) < Math.abs(SG.Naver.get('wrapper').maxScrollY)) ? Math.abs(ypos) : Math.abs(SG.Naver.get('wrapper').maxScrollY);
        if (ypos > 0) {
            try {
                SG.Naver.get('wrapper').scrollTo(SG.Naver.get('wrapper').x, -ypos, 200);
            }
            catch (e) { }
        }

    }




    function search_gotoAya(sura, aya) {
        loadAya(sura, aya, true, true);
    }

    function doSearch(img) {
        //$("#fld_search")[0].blur();

        var query = trim($("#fld_search_txt").val() || $("#fld_search").val());
        if (query.length < 3) {
            alert(_lang['search_err_length']);
            return;
        }
        try{
            document.activeElement.blur();
        }
        catch(e){}
        $("#fld_search_txt,#fld_search").blur();
        if (!img.orgS) img.orgS = img.src;
        if (img.src == "images/loading_micro.gif") {
            img.src = img.orgS;
        }
        else {
            img.src = "images/loading_micro.gif";
        }

        //

        SG.Plugins.DBP.search('query', query, true, function (json) {
            img.src = img.orgS;
            SG.Menu.toggle(-1);
            var num = getObjLength(json);
            var nass = '<div id="search_res">';
            if (!num) {
                nass += '<div class="result_header">' + parseAr(_lang['search_nores']) + '</div>';
            }
            else {
                var results = sortAyat(json);
                nass += '<div class="result_header"> ' + parseAr(_lang['search_resof']) + ' " ' + parseAr(query,true) + ' " - ' + num + ' </div>';
                //var results = bayan.results;
                var cls = "result_item";
                var n = 1;
                for (var i in results) {
                    cls = (!(n++ % 2)) ? 'result_item even' : 'result_item';
                    nass += '<div class="' + cls + '"> <a href="javascript:;" id="res__' + i.split('_')[0] + '_' + i.split('_')[1] + ' " >' + parseAr(QuranData.Sura[i.split('_')[0]][sura_key]) + ' - ' + parseAr(_lang['aya']) + ' ' + parseAr(i.split('_')[1]) + '</a>' + results[i] + '</div>'
                }
            }
            nass += '</div>';


            //$("#root").hide();

            $("#s_cont_sub").html(nass);
            $('#s_cont').show();
            $("#s_cont").trigger("show");

            $("#search_res a").on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();

                $("#s_cont .popup_close").trigger(END_EV);

                search_gotoAya($(this).attr('id').split('__')[1].split('_')[0], $(this).attr('id').split('__')[1].split('_')[1]);
            });

        }, function(){
            alert(_lang['chk_conn']);
            img.src = img.orgS;
        });
    }




    function startRepeat() {
        repeat['begin_aya'] = $("#repeat_sel_begin_sura").val() + '_' + $("#repeat_sel_begin_aya").val();
        repeat['end_aya'] = $("#repeat_sel_end_sura").val() + '_' + $("#repeat_sel_end_aya").val();
        repeat['waiting'] = Number($("#repeat_waiting").val());
        repeat['for_aya'] = Number($("#repeat_for_aya").val()) || 0;
        repeat['for_all'] = Number($("#repeat_for_all").val()) || 0;

        repeat_started = 1;

        $("#repeat_widg select").each(function () {
            $(this).css('visibility', 'hidden');
        });
        
        $("#recites_repeat").addClass("ay_active").html('<b class="lang" id="lang_deactivateRepeat">' + parseAr(_lang['deactivateRepeat']) + '</b>');

        loadAya(repeat['begin_aya'].split('_')[0], repeat['begin_aya'].split('_')[1]);
        //playAya();
        //playAya();
        //set_globalPlay(1);
    }
    function stopRepeat() {

        if (repeat['tOut']) clearTimeout(repeat['tOut']);

        in_repeat_mode = false;
        $("#repeat_widg").hide();
        $("#repeat_keyname").html('<b class="lang" id="lang_activateRepeat">' + parseAr(_lang['activateRepeat']) + '</b>');

        $("#recites_repeat").removeClass("ay_active").html('<b class="lang" id="lang_repeat_settings">' + parseAr(_lang['repeat_settings']) + '</b>');

        $("#repeat_widg").hide();

        repeat = {};
        repeated_aya = 0;
        repeated_all = 0;
        repeat_started = 0;

        $("#repeat_widg select").each(function () {
            $(this).css('visibility', 'visible');
        });


        stopPlayer();
        //set_globalPlay(0);
    }

    function repeat_ayaEnded(duration) {
        var waiting = (Math.round(duration) * repeat['waiting']) * 1000;
        repeat['tOut'] = setTimeout(function () {
            if (++repeated_aya > repeat['for_aya']) {
                
                repeated_aya = 0;
                
                var next = setNextAya(true);
                if (next == '1_1' || (intAya(next) > intAya(repeat['end_aya']))) {
                    if (++repeated_all > repeat['for_all']) {
                        repeated_all = 0;
                        repeated_aya = 0;

                        stopPlayer();
                    }
                    
                    loadAya(repeat['begin_aya'].split('_')[0], repeat['begin_aya'].split('_')[1], true);

                
                }
                else {
                    setNextAya();
                    playAya(Boolean(repeated_aya));
                }
                
            }
            else{
                playAya(Boolean(repeated_aya));
            }
            
        }, waiting);
    }


    function set_mosshaf(mosshaf) {
        if (mosshaf == currMosshaf && mosshafSeld) return;



        currMosshaf = mosshaf;
        page_key = masahef[mosshaf]['page_key'];
        imgs_url = masahef[mosshaf]['url'];
        imgs_ext = masahef[mosshaf]['ext'];

        if (currMosshaf == 'tajweed') {
            //$("#page_num").show();
        }
        else {
            //$("#page_num").hide();
        }

        if (mosshafSeld) {
            //currPage = 0;
            loadAya(currAya.split('_')[0], currAya.split('_')[1], true, true);
            SG.DimMan.refresh();
            setKey('mosshaf', currMosshaf);
        }
        mosshafSeld = true;
    }


    function set_vision(v) {
        if (v == currVision) return;

        if (v == 'normal') {
            $("#scroller").removeClass('night');
            $("#trans").removeClass('night');
            $("#root").removeClass('night');//

            //$("#scroller li img").removeClass('nightfix');
            //$("#scroller li img").css('background',"#fff");

        }
        else {
            $("#scroller").addClass('night');
            $("#trans").addClass('night');
            $("#root").addClass('night');
        }

        currVision = v;
        loadAya(currAya.split('_')[0], currAya.split('_')[1], true, true);
        SG.DimMan.refresh();



    }

    function showFavs(img) {
        var favs = getKey('favs');
        console.log(favs);
        var fav_read = getKey('fav_read');
        console.log(fav_read);
        var fav_memo = getKey('fav_memo');
        console.log(fav_memo);
        
        var nass = '';
        var dfd_read=$.Deferred(),dfd_memo=$.Deferred(),dfd_note=$.Deferred();
        if (!(favs || fav_read || fav_memo)) {
            var a1 = SG.Dialog.notify(parseAr(_lang['noFavs']));
            setTimeout(function () { a1.tm() }, 1500);
            return;
        }
        
        
        if (!img.orgS) img.orgS = img.src;
        if (img.src == "images/loading_micro.gif") {
            img.src = img.orgS;
        }
        else {
            img.src = "images/loading_micro.gif";
        }
        setTimeout(function(){
            if(fav_read){
                SG.Plugins.DBP.search('ids', fav_read, true, function (json) {
                    nass += formatFavs(json,'read');
                    dfd_read.resolve();
                });
            }
            else{
                dfd_read.resolve();
            }
            
            if(fav_memo){
                SG.Plugins.DBP.search('ids', fav_memo, true, function (json) {
                    dfd_read.done(function(){
                        nass += formatFavs(json,'memo');
                        dfd_memo.resolve();
                    });
                });
            }
            else{
                dfd_read.done(function(){
                    dfd_memo.resolve();
                });
            }
            if(favs){
                SG.Plugins.DBP.search('ids', favs, true, function (json) {
                    dfd_memo.done(function(){
                        nass += formatFavs(json,'note');
                        dfd_note.resolve();
                    });
                });
            }
            else{
                dfd_memo.done(function(){
                    dfd_note.resolve();
                });
            }
            
            dfd_note.done(function(){
                doShow('<div id="favs_res">' + nass + '</div>');
            });
            
        },500);
        
        
        function formatFavs(json,type){
            var num = getObjLength(json);
            var nass = '',note='';
            if (!num) {
                nass += '<div class="result_header">' + parseAr(_lang['noFavs']) + '</div>';
            }
            else {
                var results = sortAyat(json);

                //var results = bayan.results;
                var cls = "result_item";
                var n = 1;
                var sura, aya, aya_id, note;

                for (var i in results) {
                    note = '';
                    cls = (!(n++ % 2)) ? 'result_item even' : 'result_item';
                    sura = i.split('_')[0];
                    aya = i.split('_')[1];
                    aya_id = aya2id(sura, aya);

                    nass += '<div class="' + cls + '"> <a id="'+type+'_fav__' + sura + '_' + aya + ' " >' + parseAr(QuranData.Sura[sura][sura_key]) + ' - ' + parseAr(_lang['aya']) + ' ' + parseAr(aya) + '</a>' + results[i]
                    if(type == "note"){
                        if(getKey('fav_' + aya_id)){
                            note = parseAr(_lang['note']) + ": "+ getKey('fav_' + aya_id);
                        }
                        else{
                            note = '';
                        }
                    }
                    else if(type == "read"){
                        note = '<span style="color:#259037">'+_lang['fav_readPos']+'</span>' + ( getKey('fav_read_time_'+aya_id)?('<small style="color:#444">: '+_lang['fav_date']+' ' + formatFD(getKey('fav_read_time_'+aya_id))+'</small>'):'' );

                    }
                    else{
                        note = '<span style="color:#AB522A">'+_lang['fav_memoPos']+'</span>' + ( getKey('fav_memo_time_'+aya_id)?('<small style="color:#444">: '+_lang['fav_date']+' ' + formatFD(getKey('fav_memo_time_'+aya_id))+'</small>'):'' );

                    }
                    if (note) {
                        nass += '<div class="note">' + note + '</div>'
                    }

                    nass += '<a id="'+type+'_remfav__' + sura + '_' + aya + '" class="remfav">' + parseAr(_lang['remFav']) + '</a>' + '<div>&nbsp</div></div>';
                }
            }
            return nass;
        }
        
        function doShow(nass){
            img.src = img.orgS;
            SG.Menu.toggle(-1);

            $('#favs_cont_sub').html(nass);
            $("#favs_cont").show();
            $("#favs_cont").trigger("show");
        
            $("#favs_res").on("click","a", function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(this).attr('id').indexOf('remfav') != -1) {
                    SG.Favs.remove(aya2id($(this).attr('id').split('__')[1].split('_')[0], $(this).attr('id').split('__')[1].split('_')[1]) , $(this).attr('id').split('_')[0] , 'note');

                   
                    $(this).parents('.result_item').remove();
                    return;
                }

                $("#favs_cont .popup_close").trigger(END_EV);

                search_gotoAya($(this).attr('id').split('__')[1].split('_')[0], $(this).attr('id').split('__')[1].split('_')[1]);
            });
        
        }        
        
        
    }


    function switchLang(lang, setT) {
        _lang = null;
        var re = (currLang) ? true : false; // second time ?

        currLang = (lang && langs_av[lang]) ? lang : def_lang;

        if (langs_av[currLang]['l_dir'] == 'rtl') {
            sura_key = 4;
        } else {
            sura_key = 5;
        }

        _lang = _langs[currLang];

        quraa = { "hq": {
                          "Hudhaify_64kbps": _lang['recite_hudhaify'],

                          "Husary_64kbps": _lang['recite_husary'],
                          "husary_qasr_64kbps": _lang['recite_husary'] + ' 2',

                          "Abdullah_Basfar_64kbps": _lang['recite_basfar'],
                          "Muhammad_Ayyoub_64kbps": _lang['recite_ayyoub'],
                          "Minshawy_Murattal_128kbps": _lang['recite_minshawy'],
                          "Abdul_Basit_Murattal_64kbps": _lang['recite_abdul_basit'],
                          "Banna_32kbps": _lang['recite_banna'],
                          "Mohammad_al_Tablaway_64kbps": _lang['recite_tablawy'],
                          "Ali_Jaber_64kbps":_lang['recite_jaber'],

                          "Alafasy_64kbps": _lang['recite_afasy'],
                          "Abu_Bakr_Ash-Shaatree_64kbps": _lang['recite_shaatree'],
                          "Nasser_Alqatami_128kbps": _lang['recite_qatami'],
                          "tunaiji_64kbps": _lang['recite_khaleefa'],
                          "Yaser_Salamah_128kbps": _lang['recite_salamah'],
                          "Muhammad_Jibreel_64kbps": _lang['recite_jibreel'],

                          "Ghamadi_40kbps": _lang['recite_ghamadi'],
                          "Abdurrahmaan_As-Sudais_64kbps": _lang['recite_sudais'],
                          "Saood_ash-Shuraym_64kbps": _lang['recite_shuraym'],
                          "Maher_AlMuaiqly_64kbps": _lang['recite_maher'],
                          "Ahmed_ibn_Ali_al-Ajamy_64kbps": _lang['recite_ajamy'],
                          "Abdullaah_3awwaad_Al-Juhaynee_128kbps": _lang['recite_juhanee'],
                          "Muhsin_Al_Qasim_192kbps": _lang['recite_muhsin'],

                          "Fares_Abbad_64kbps": _lang['recite_abbad'],
                          "Yasser_Ad-Dussary_128kbps": _lang['recite_yaser'],
                          "Hani_Rifai_192kbps": _lang['recite_rifai'],

                          "Ayman_Sowaid_64kbps": _lang['recite_ayman'] + ' - ' + _lang['recite_moalim'],            
						  
                          "Hussary.teacher_64kbps": _lang['recite_husary'] + ' - ' + _lang['recite_moalim'],
                          "Minshawy_Teacher_128kbps": _lang['recite_minshawy'] + ' - ' + _lang['recite_moalim'],
                          "khaleefa_96kbps": _lang['recite_khaleefa'] + ' - ' + _lang['recite_moalim'],

                          "Husary_Mujawwad_64kbps": _lang['recite_husary'] + ' - ' + _lang['recite_mujawwad'],
                          "AbdulSamad_64kbps": _lang['recite_abdul_basit'] + ' - ' + _lang['recite_mujawwad'],
                          "Minshawy_Mujawwad_64kbps": _lang['recite_minshawy'] + ' - ' + _lang['recite_mujawwad'],

                          "warsh_dossary_128kbps": _lang['recite_ibrahim_dosary'] + ' - ' + _lang['recite_warsh'],            
                          "warsh_husary_64kbps": _lang['recite_husary'] + ' - ' + _lang['recite_warsh'],
                          "warsh_yassin_64kbps": _lang['recite_yassin'] + ' - ' + _lang['recite_warsh']


                       },
                 "mq": {
                         "Husary_40kbps": _lang['recite_husary'] + ' - ' + _lang['recite_mq'],
                         "Abdul_Basit_Murattal_40kbps": _lang['recite_abdul_basit'] + ' - ' + _lang['recite_mq'],
                         "Minshawy_Murattal_48kbps": _lang['recite_minshawy'] + ' - ' + _lang['recite_mq'],
                         "Hudhaify_32kbps": _lang['recite_hudhaify'] + ' - ' + _lang['recite_mq'],
                         "Abdullah_Basfar_32kbps": _lang['recite_basfar'] + ' - ' + _lang['recite_mq'],
                         "Muhammad_Ayyoub_32kbps": _lang['recite_ayyoub'] + ' - ' + _lang['recite_mq'],
                         "Ibrahim_Akhdar_32kbps": _lang['recite_akhdar'] + ' - ' + _lang['recite_mq'],
                         "warsh_dossary_32kbps": _lang['recite_ibrahim_dosary'] + ' - ' + _lang['recite_warsh'] + ' - ' + _lang['recite_mq'] 
                       }, 
                 "trans": {
                        "English_Walk": "English - Sahih International",
                        "ur.khan_46kbs": "اردو - جالندربرى",
                        "Bosnian_Korkut_128kbps": "Bosnian - Korkut"
                       }
                };

        //quraa = {"hq":{"Husary_64kbps":_lang['recite_husary'] , "husary_qasr_64kbps":_lang['recite_husary'] +' 2' , "Husary_Mujawwad_64kbps":_lang['recite_husary'] + ' - ' + _lang['recite_mujawwad'] , "Hussary.teacher_64kbps":_lang['recite_husary'] + ' - ' + _lang['recite_moalim'] , "Abdurrahmaan_As-Sudais_64kbps":_lang['recite_sudais'],"Saood_ash-Shuraym_64kbps":_lang['recite_shuraym'] , "Minshawy_Murattal_128kbps":_lang['recite_minshawy'], "Minshawy_Mujawwad_64kbps":_lang['recite_minshawy'] +' - ' + _lang['recite_mujawwad'], "Minshawy_Teacher_128kbps":_lang['recite_minshawy'] + ' - ' + _lang['recite_moalim']   , "Yaser_Salamah_128kbps":_lang['recite_salamah'] , "Ghamadi_40kbps":_lang['recite_ghamadi'] , "Fares_Abbad_64kbps":_lang['recite_abbad'] , "Nasser_Alqatami_128kbps":_lang['recite_qatami'] , "Yasser_Ad-Dussary_128kbps":_lang['recite_yaser'] , "Maher_AlMuaiqly_64kbps":_lang['recite_maher'] , "Ahmed_ibn_Ali_al-Ajamy_64kbps":_lang['recite_ajamy'] , "Alafasy_64kbps":_lang['recite_afasy'] , "Muhammad_Jibreel_64kbps":_lang['recite_jibreel'] , "Abdullah_Basfar_64kbps":_lang['recite_basfar'] , "Mostafa_Ismail_128kbps":_lang['recite_mostafa'] , "Muhammad_Ayyoub_64kbps":_lang['recite_ayyoub'] , "Minshawy_Murattal_128kbps":_lang['recite_minshawy'], "Minshawy_Mujawwad_64kbps":_lang['recite_minshawy'] +' - ' + _lang['recite_mujawwad'],  "Abu_Bakr_Ash-Shaatree_64kbps":_lang['recite_shaatree'] ,"Hudhaify_64kbps":_lang['recite_hudhaify'] , "Abdul_Basit_Murattal_64kbps":_lang['recite_abdul_basit'] , "AbdulSamad_64kbps":_lang['recite_abdul_basit'] +' - '+ _lang['recite_mujawwad'] , "Hani_Rifai_192kbps":_lang['recite_rifai'], "Abdullaah_3awwaad_Al-Juhaynee_128kbps":_lang['recite_juhanee'], "Muhsin_Al_Qasim_192kbps":_lang['recite_muhsin'] , "Mohammad_al_Tablaway_64kbps":_lang['recite_tablawy'] , "tunaiji_64kbps":_lang['recite_khaleefa'] , "khaleefa_96kbps":_lang['recite_khaleefa'] + ' - ' + _lang['recite_moalim']  , "warsh_husary_64kbps":_lang['recite_husary'] + ' - ' + _lang['recite_warsh'] , "warsh_dossary_128kbps":_lang['recite_ibrahim_dosary'] + ' - ' + _lang['recite_warsh'] , "warsh_yassin_64kbps":_lang['recite_yassin'] + ' - ' + _lang['recite_warsh'] } , "mq":{"Husary_40kbps":_lang['recite_husary'] + ' - ' + _lang['recite_mq'],"Banna_32kbps":_lang['recite_banna'],"Abdul_Basit_Murattal_40kbps":_lang['recite_abdul_basit'] + ' - ' + _lang['recite_mq'],"Minshawy_Murattal_48kbps":_lang['recite_minshawy'] + ' - ' + _lang['recite_mq'] ,"Hudhaify_32kbps":_lang['recite_hudhaify'] +' - '+_lang['recite_mq'] , "Abdullah_Basfar_32kbps":_lang['recite_basfar'] , "Muhammad_Ayyoub_32kbps":_lang['recite_ayyoub']  + ' - ' + _lang['recite_mq'] , "Ibrahim_Akhdar_32kbps":_lang['recite_akhdar'] , "warsh_dossary_32kbps":_lang['recite_ibrahim_dosary'] + ' - ' + _lang['recite_warsh'] +  ' - ' + _lang['recite_mq'] } , "trans":{"English_Walk":"English - Sahih International" , "ur.khan_46kbs":"اردو - جالندربرى" , "Bosnian_Korkut_128kbps":"Bosnian - Korkut"}  }; 

        tafaser = { "sa3dy": _lang['tafsir_sa3dy'], "waseet": _lang['tafsir_waseet'], "baghawy": _lang['tafsir_ba3awy'], "katheer": _lang['tafsir_katheer'], "qortoby": _lang['tafsir_kortoby'], "tabary": _lang['tafsir_tabary'], "tanweer": _lang['tafsir_tanweer'], "e3rab": _lang['tafsir_e3rab'], "tafheem": _lang['tafsir_tafheem'], "indonesian": _lang['tafsir_indonesian'], "russian": _lang['tafsir_russian'] };

        setKey('lang', currLang);

        def_trans = (currLang == 'ar') ? 'ar_mu' : 'en_sh';
        def_tafsir = (currLang == 'ar') ? 'sa3dy' : 'tafheem';
        if(currLang == "ar"){
            $(".lang").each(function () {
                $(this).html(parseAr(_lang[this.id.split('lang_')[1]]));//
            });
        }
        else{
            $(".lang").each(function () {
                $(this).html(_lang[this.id.split('lang_')[1]]);//
            });
        }
        if (currLang == "ar") {
            $(".lang_ar").show();
            $(".lang_en").hide();
            $("body").removeClass('ltr en').addClass('rtl ar');
        }
        else {
            $(".lang_en").show();
            $(".lang_ar").hide();
            $("body").removeClass('rtl ar').addClass('ltr en');

        }

        if (re) {
            SG.Trig.invoke("langChange", currLang);
        }

    }

    function invert(img) {
        var canvas = document.createElement("canvas");
        //var img = new Image();
        //img.src = img_src;
        var img_src = img.src;
        var w = img.width;
        var h = img.height;


        canvas.width = w;
        canvas.height = h;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var cData = ctx.getImageData(0, 0, w, h);
        var data = cData.data;

        var invertAlpha = false;
        var rect = img;

        var p = w * h;

        var pix = p * 4, pix1 = pix + 1, pix2 = pix + 2, pix3 = pix + 3;

        while (p--) {
            data[pix -= 4] = 255 - data[pix];
            data[pix1 -= 4] = 255 - data[pix1];
            data[pix2 -= 4] = 255 - data[pix2];
            if (invertAlpha)
                data[pix3 -= 4] = 255 - data[pix3];
        }

        ctx.putImageData(cData, 0, 0);

        return canvas.toDataURL("image/png");
        //canvas.parentNode.removeChild(canvas);
    }
    var cInvert = null;
    function canInvert() {
        if (cInvert !== null) return cInvert;
        var c = document.createElement("canvas");
        var data = c.toDataURL("image/png");
        cInvert = (data.indexOf("data:image/png") == 0);
        return cInvert;
    }

    SG.switchLang = switchLang;

    SG.refreshTransPane = refreshTransPane;
    
    SG.Favs = (function($){
        function _add_note(aya_id){
            if (exist(aya_id,'note')) {
                var a = SG.Dialog.confirmm('',parseAr(_lang['fav_exist']), parseAr(_lang['yes']), parseAr(_lang['no']), function(){
                    remove(aya_id,'note');
                    //a.tm();
                }, function(){
                    //a.tm();
                } );

            }
            else {
                var a = SG.Dialog.alertt('<div style="text-align:right;font-size:85%;color:#004080;">' + parseAr(_lang['note']) + ' ' + '<small style="color:#999"> - ' + parseAr(_lang['optional']) + '</small><div><input id="favNote"></div></div>', parseAr(_lang['fav_alert']));
                //a.hideBu();
                a.setContrs([{"cap":parseAr(_lang['cancel']),"cb":addFavCancel},{"cap":parseAr(_lang['buAddFav']),"cb":addFavOk}]);
                //a.setGroups([{title:"ملاحظة",cont:"1"},{title:"تدبر",cont:"1"},{title:"القراءة",cont:"1"},{title:"الحفظ",cont:"1"}]);
                function addFavOk(e) {

                    var curr = getKey('favs')?(getKey('favs')+','):'';
                    
                    setKey('favs', curr + aya_id);
                    var note = $("#favNote").val();
                    if (note) {
                        setKey('fav_' + aya_id, note);
                    }
                    a.tm();

                    var b = SG.Dialog.notify(parseAr(_lang['fav_added']));
                    setTimeout(function () { b.tm() }, 3000);            

                };
                function addFavCancel(e) {
                    a.tm();
                };
            }
        }

        function add(aya_id, type){
            if(type == 'memo' || type == 'read'){
                if(exist(aya_id,type)){
                    remove(aya_id, type);
                }
                var curr = getKey('fav_'+type)?(getKey('fav_'+type)+','):'';
                setKey('fav_'+type, curr+aya_id);
                setKey('fav_'+type+'_time_'+aya_id, Math.floor(Date.now()/1000));
                
                var b = SG.Dialog.notify(parseAr(_lang['fav_added']));
                setTimeout(function () { b.tm() }, 3000);            
            }
            else{
                _add_note(aya_id);
            }
        }
        function exist(aya_id,type){
            var key = (type == 'memo' || type == 'read')?'fav_'+type : 'favs';
            
            if(getKey(key) && (','+getKey(key)+',').indexOf(','+aya_id+',') != -1 ){
                return true;

            }
            else{
                return false;
            }
        }
        function remove(aya_id,type) {
            var key = (type == 'memo' || type == 'read')?'fav_'+type : 'favs';

            if(! exist(aya_id, type)){
                return;

            }

            var favs = getKey(key);
            var favs_out_arr = [];
            var favs_out_str = '';
            //trace(aya_id); 
            if (favs && favs.indexOf(',') != -1) {
                var favs_ids = favs.split(',');
                for (var i in favs_ids) {
                    if (favs_ids[i] == aya_id) {
                        continue;
                    }
                    favs_out_arr.push(favs_ids[i]);
                }
                favs_out_str = favs_out_arr.join(',');
                setKey(key, favs_out_str);
            }
            else {
                remKey(key);

            }
            remKey('fav_' + aya_id);
        }
        return {
            add:add,
            remove:remove,
            exist:exist
        }
    })($);
    
    function showShareWidg(){
        var b = SG.Dialog.alertt('<textarea style="font-family:sans;font-size:18px;line-height:170%;width:80%;height:80%;direction:rtl" id="fld_share">'+_lang['shareApp_msg']+'</textarea>', parseAr(_lang['shareApp_bu']), _emp, {large:true});
        //b.hideBu();
        var contrs = [{cap:parseAr(_lang['send']),cb:send}];
        if(_platform_ != 'wos'){
            contrs.push({cap:parseAr(_lang['copy']),cb:copy});
        }
        b.setContrs(contrs);
        $("#fld_share")[0].disabled = true;
        $("#fld_share").on(START_EV,function(e){
            this.disabled = false;
        });
        function send(){
            SG.Plugins.Tools.send('', $.trim( $("#fld_share").val() ));
        };
        function copy(){
            SG.Plugins.Tools.copy($.trim( $("#fld_share").val() ), function(){
                alert(parseAr(_lang['copy_done']));
            }, function(){
                alert(parseAr(_lang['copy_failed']));            
            });
        };        

    }
function showCopyWidg(){
  var sura = parseInt(currAya.split('_')[0]);
  var aya = parseInt(currAya.split('_')[1]);
  var ids = aya2id(sura, aya);

  // Use $.getJSON() to retrieve the contents of the quran.json file
  $.getJSON('quran.json', function(data) {
    // Loop through the array of verses in the file
    for (var i = 0; i < data.length; i++) {
      var verse = data[i];
      // Check if the verse's sura and aya match the specified sura and aya
      if (verse.sura == sura && verse.aya == aya) {
        // If a match is found, display the verse's text in the dialog
        var nass = '"' + verse.text + '" (' + QuranData.Sura[sura][4] + ' : ' + aya + ')';
        var b = SG.Dialog.alertt('<textarea style="font-family:sans;font-size:18px;line-height:170%;width:80%;height:60%;direction:rtl" id="fld_copy">' + nass + '</textarea>', parseAr(_lang['copy']), _emp, {large:true});

        // Add a click event handler to the text area element
        document.getElementById("fld_copy").addEventListener("click", function() {
          // Select the text in the text area when it is clicked
          this.select();
        });
      }
    }
  });
}



    
    
    SG.Mtest = (function($){
        var _currSuraAya,from_sura,from_aya,to_sura,to_aya,from_id,to_id,
            _indicated;
        
        function start(){
            _init();
            from_sura = Number($('#mtest_sel_begin_sura').val());
            from_aya = Number($('#mtest_sel_begin_aya').val());
            to_sura = Number($('#mtest_sel_end_sura').val());
            to_aya = Number($('#mtest_sel_end_aya').val());

            from_id = aya2id(from_sura , from_aya);
            to_id   = aya2id(to_sura , to_aya);

            $("#mtest_cont").show().trigger("show");

            setTimeout(ques,500);
        }
        function stop(){
            //
        }
        function ques(suraAya){
            if(! suraAya) suraAya = _getSuraAya();
            _currSuraAya = suraAya;
            var sura = Number(suraAya.split('_')[0]);
            var aya  = Number(suraAya.split('_')[1]);            
            var page = suraSafha(sura, aya);
            
            $("#mtest_img")[0].src = 'frame_' + currMosshaf + '.jpg';            
            _showOverlay();
            $("#mtest_hl_cont .hiliter").remove();
            
            _loadImg(page);
            
            addHilites(page, false, true, 'mtest', $("#mtest_hl_cont"), function(){
                $("#mtest_hl_cont .hiliter").addClass("mtest");
                
                $("#" + sura + '_' + aya + '__mtest_1,#' + sura + '_' + aya + '__mtest_2,#' + sura + '_' + aya + '__mtest_3').addClass('active');

                setTimeout(function(){
                    _scrollTo($("#" + sura + '_' + aya + '__mtest_1'));
                    _hideOverlay();
                    if(! _indicated){
                        setTimeout(function(){
                            _showIndicator();
                        }, 2000);
                    }
                    

                }, 200);
            });

        }
        function ans(){
            //
        }
        function _scrollTo($elem){
            if(!$elem || !$elem.offset() || !$elem.offset().top) return;
            var top = $elem.offset().top;
            top = top - Math.round(scrH/4);
            if(top < 10){
                top = 0;
            }
            window.scrollTo(0, top);
        }
        function _loadImg(page){
            var callId = rand(1, 10000);
            SG.getImg(page + '.' + imgs_ext, callId, function (img, cid) {
                if(cid != callId) return;
                $("#mtest_img")[0].src = img;
            });
        }
        var _inited = false;
        function _init(){
            // every time
            var zoom_factor = (isZoom) ? masahef[currMosshaf]['factor'] : 0;

            $("#mtest_hl_cont").width(scrW_mosshaf);
            $("#mtest_over").height(scrW_mosshaf * masahef[currMosshaf]['whr']);
            $("#mtest_hl_cont").css('left', - (zoom_factor / 2) * 100 + "%");
            $("#mtest_img")[0].src = 'frame_' + currMosshaf + '.jpg';

            if(_inited) return;
            
            // once
            _inited = true;
            $("#mtest_over").on(START_EV+" "+END_EV+" "+MOVE_EV, function(e){
                e.preventDefault();
                e.stopPropagation();
            });
            $("#mtest_hl_cont").on("click", ".hiliter", function(){
                var baseId = $(this).attr('id').match(/.*__mtest/i)[0];
                $('#'+baseId+'_1,#'+baseId+'_2,#'+baseId+'_3').remove();
                //$(this).remove();
            });
            $("#mtest_ques_bu").on(END_EV, function(){
                ques();
            });
            SG.Trig.on("orientation", function(){
                _showOverlay();
                setTimeout(function(){
                    _init();
                    ques(_currSuraAya);
                }, 900);
            });
            
        }
        function _showOverlay(){
            $("#mtest_over").show();
        }
        function _hideOverlay(){
            $("#mtest_over").fadeOut("fast");
        }
        function _showIndicator(){
            var sura = _currSuraAya.split('_')[0];
            var aya  = _currSuraAya.split('_')[1];
            var nextAya = id2aya(aya2id(sura,aya)+1);
            var nextAya_sura = nextAya.split('_')[0];
            var nextAya_aya  = nextAya.split('_')[1];

            if(parseInt($("#" + nextAya_sura + '_' + nextAya_aya + '__mtest_1').width(), 10) < 40 && $("#" + nextAya_sura + '_' + nextAya_aya + '__mtest_2')[0]){
                $("#" + nextAya_sura + '_' + nextAya_aya + '__mtest_2').html('<img id="mtest_indicator" src="images/mob_click.png">');
            }
            else{
                $("#" + nextAya_sura + '_' + nextAya_aya + '__mtest_1').html('<img id="mtest_indicator" src="images/mob_click.png">');
            }
            
        }
        function _getSuraAya(){
            var id = rand(from_id , to_id);
            var suraAya = id2aya(id);
            var sura = suraAya.split('_')[0];
            var aya  = suraAya.split('_')[1];
            var i = 0;
            while(_isExcluded(sura,aya)){
                 if(i++>30) break; // safety condition;
                
                id = rand(from_id , to_id);
                suraAya = id2aya(id);
                sura = suraAya.split('_')[0];
                aya  = suraAya.split('_')[1];
            }
            return sura+'_'+aya;
        }
        function _isExcluded(sura,aya){
            if(isLastAyaInSura(sura,aya) || isLastAyaInPage(sura,aya)) return true;

            var ayat = ['37_152','107_4'];
            var aya  = sura+'_'+aya;
            for(var i in ayat){
                if(aya == ayat[i]) return true;
            }
            return false;
        }
        return{
            start:start,
            stop:stop
        }

    })($);
    
})(window, $);
// end Context //
/*-------------------------------------------------------*/



function transAdabter(j, trans) {
    var t;
    var txt = '';
    var prevAya = 0;
    for (var i in j) {
        t = $.trim(j[i]);
        if (t == "") continue;

        if (trans == "ar_ma3any") {
            try {
                t = t.replace(/([^>]*)\:/g, '($1) :');
            }
            catch (e) { }
        }
        else if (trans == 'ar_mu') {
            if (navigator.userAgent.indexOf("Android") != -1) {
                t = t.replace(/الله/g, 'اللّه');
            }
        }


        if (prevAya && parseInt(i.split('_')[1]) < prevAya) txt += '<div class="hr"></div>';
        prevAya = parseInt(i.split('_')[1]);
        txt += '<div id="' + i.split('_')[0] + '_' + i.split('_')[1] + '__trans"> <span>( ' + i.split('_')[1] + ' ) &nbsp; </span>' + t + '</div>';

    }
    return txt;
}

function formatTafsir(text) {
    text = text.replace(/([^=])("[^"<]+")/g, "$1<span class=\"t1\">$2</span>", text);
    text = text.replace(/(\[[^\]<]+\])/g, "<span class=\"t2\">$1</span>", text);
    text = text.replace(/(\([^)<]+\))/g, "<span class=\"t3\">$1</span>", text);
    text = text.replace(/(\{[^}<]+\})/g, "<span class=\"t4\">$1</span>", text);
    return text;
}

function showMenuHint() {
    $("#menu-hint").fadeIn();
    //$("#menu-hint").addClass("anim_mhint");
    //showMenu();
}
function hideMenuHint() {
    $("#menu-hint").fadeOut();
    //$("#menu-hint").removeClass("anim_mhint");
    //hideMenu();
}


function stopPlayer() {

    globalPlay = 0;
    p_paused = 0;
    SG._ap1.onComplete = function () { };
    SG._ap1.stop();
    $("#tls_play,#t_bu_play").show();
    $("#tls_pause,#t_bu_pause").hide();

    SG.Plugins.Listen.stop(function () { }, function () { });
    SG.Trig.invoke("globalStop");

}

function build_selMozaker(startM){
    var seld = seld || 0;
    var str = '<option value="-1">' + _lang['mozaker_null'] +'</option>';
    var str1 = '',str2 = '';
    var i = 1;
    var n = 23;
    var vH, vM,val;
    for (i=0 ; i < 24 ; i++) {
        vH = i;
        for(j=startM ; j < 60 ; j=j+10){
            if(j < 10) vM = '0'+j;
            else vM = j;
            
            val = vH +':'+ vM;
            if(i == 0 && j < 10) val  +=  ' - ' + _lang['mozaker_night'];// + ' - ' + val;
            if(i == 6 && j < 10) val  +=  ' - ' + _lang['mozaker_morning'];// + ' - ' + val;
            if(i == 12 && j < 10) val +=  ' - ' + _lang['mozaker_noon'];// + ' - ' + val;
            if(i == 18 && j < 10) val +=  ' - ' + _lang['mozaker_evening'];// + ' - ' + val;
            
            if(i < 6){
                str2 += '<option value="' + i + ':' + j + '">' + val +'</option>';
            } else{
                str1 += '<option value="' + i + ':' + j + '">' + val +'</option>';
            }
            
            
        }
        
    }
    str += str1+str2;
    return str;
    
}

function build_selSowar(seld, start) {
    var seld = seld || 0;
    var str = ''; //'<option value="فضلا إختر السورة" data-placeholder="true"> فضلا إختر السورة  </option>';
    var i = start || 1;
    var n = 114;
    for (i ; i <= n ; i++) {
        if (i == seld) str += '<option value="' + i + '" selected="selected">' + i + '. ' + QuranData['Sura'][i][sura_key] + '</option>';
        else str += '<option value="' + i + '">' + i + '. ' + QuranData['Sura'][i][sura_key] + '</option>';
    }
    return str;
}
function build_selAyat(num, seld, start) {

    var seld = seld || 0;
    var str = ''; //'<option value="فضلا إختر السورة" data-placeholder="true"> فضلا إختر السورة  </option>';
    var i = start || 1;
    for (i ; i <= num ; i++) {
        if (i == seld) str += '<option value="' + i + '" selected="selected">' + i + '</option>';
        else str += '<option value="' + i + '">' + i + '</option>';
        //else str += '<option value="'+i+'">' + i + '</option>';
    }
    //$("#"+id).empty();
    return str;
}
function build_selAgzaa(seld) {
    var seld = seld || 0;
    var str = '';

    for (i = 1 ; i <= 30 ; i++) {
        str += '<option value="' + i + '">' + i + '</option>';
        //else str += '<option value="'+i+'">' + i + '</option>';

    }

    return str;
}
function build_selAhzab() {
    var seld = seld || 0;
    var str = '<optgroup label="' + _lang['first_hizb'] + '">';
    var asmaa = ['', _lang['first_quarter'], _lang['second_quarter'], _lang['third_quarter'], _lang['fourth_quarter']];
    var n = '';
    var i = 1;
    for (i = 1 ; i <= 4 ; i++) {
        str += '<option value="' + i + '">' + _lang['first_hizb'] + ' - ' + asmaa[i] + '</option>';
        //else str += '<option value="'+i+'"> الربع ' + asmaa[i] + '</option>';
    }
    str += '</optgroup>';
    str += '<optgroup label="' + _lang['second_hizb'] + '">';
    for (i = 5 ; i <= 8 ; i++) {
        str += '<option value="' + i + '">' + _lang['second_hizb'] + ' - ' + asmaa[i - 4] + '</option>';
        //else str += '<option value="'+i+'"> الربع ' + asmaa[i] + '</option>';
    }
    str += '</optgroup>';
    return str;
}

function build_selQuraa(seld) {
    var seld = seld || 0;
    var str = '<optgroup label="' + _lang['recite_hq'] + ' - ' + _lang['recite_hcon'] + '">';
    for (var i in quraa['hq']) {
        if (i == seld) str += '<option value="' + i + '" selected="selected">' + quraa['hq'][i] + '</option>';
        else str += '<option value="' + i + '">' + quraa['hq'][i] + '</option>';
    }
    str += '</optgroup>';
    str += '<optgroup label="' + _lang['recite_mq'] + ' - ' + _lang['recite_mcon'] + '">';
    for (i in quraa['mq']) {
        if (i == seld) str += '<option value="' + i + '" selected="selected">' + quraa['mq'][i] + '</option>';
        else str += '<option value="' + i + '">' + quraa['mq'][i] + '</option>';
    }
    str += '</optgroup>';

    str += '<optgroup label="' + _lang['recite_trans'] + '">';
    for (i in quraa['trans']) {
        if (i == seld) str += '<option value="' + i + '" selected="selected">' + quraa['trans'][i] + '</option>';
        else str += '<option value="' + i + '">' + quraa['trans'][i] + '</option>';
    }
    str += '</optgroup>';

    return str;
}

function build_selTafaser(seld) {
    var seld = seld || 0;
    var str = '';
    for (var i in tafaser) {
        if (i == seld) str += '<option value="' + i + '" selected="selected">' + tafaser[i] + '</option>';
        else str += '<option value="' + i + '">' + tafaser[i] + '</option>';
    }
    return str;

}
function build_selTrans(seld) {
    var seld = seld || 0;
    var str = '';
    for (var i in tarajem) {
        if (i == seld) str += '<option value="' + i + '" selected="selected">' + tarajem[i]['cap'] + '</option>';
        else str += '<option value="' + i + '">' + tarajem[i]['cap'] + '</option>';
    }
    return str;

}
function build_selTtarajem() {
    var seld = seld || 0;
    var str = '<optgroup label="' + _lang['download_ttarajem_tafaser'] + '">';
    for (var i in tafaser) {
        str += '<option value="tafasir|' + i + '" style="direction:rtl">' + tafaser[i] + '</option>';
    }
    str += '</optgroup>';
    str += '<optgroup label="' + _lang['download_ttarajem_tarajem'] + '">';
    for (i in tarajem) {
        if (!tarajem[i]['cap'])
            continue;
        str += '<option value="tarajem|' + i + '" style="direction:rtl">' + tarajem[i]['cap'] + '</option>';
    }
    str += '</optgroup>';
    return str;

}

function intAya(aya) {
    var sura = String(aya.split('_')[0]);
    var aya = String(aya.split('_')[1]);
    if (aya.length < 2) {
        aya = '00' + aya;
    }
    else if (aya.length < 3) {
        aya = '0' + aya;
    }
    return Number(sura + '' + aya);
}
function trim(str, chars) {
    return $.trim(str);
}


function setKey(key, val) {
    window.localStorage.setItem(key, val);
}
function getKey(key) {
    return window.localStorage.getItem(key);
}
function remKey(key) {
    window.localStorage.removeItem(key);
}
function sortAyat(o) {
    var sorted = {}, key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort(function (a, b) {
        if (Number(a.split('_')[0]) < Number(b.split('_')[0])) return -1;
        if (Number(a.split('_')[0]) > Number(b.split('_')[0])) return 1;
        if (Number(a.split('_')[1]) < Number(b.split('_')[1])) return -1;
        return 1;
    });

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;

}
function aya2id(sura, aya) {
    if (isNaN(sura) && sura.indexOf('_') != -1) {
        var suraAya = sura
        sura = suraAya.split('_')[0];
        aya = suraAya.split('_')[1];
    }
    var id = QuranData.Sura[sura][0];
    id += Number(aya);

    return id;
}
function id2aya(id, numeric) {
    // @IMPROVE
    var i = 1;
    var temp_id = id;
    while (temp_id > 0) {
        temp_id -= QuranData.Sura[i++][1];
    }
    var sura = i - 1;
    var aya = QuranData.Sura[sura][1] + temp_id;
    return (numeric) ? (paddingAya(sura) + '' + paddingAya(aya)) : (sura + '_' + aya);
}
function getObjLength(o) {
    var n = 0;
    for (var i in o) n++;
    return n;
}
function build_selPages(seld, start) {
    var seld = seld || 0;
    var str = ''; //'<option value="فضلا إختر السورة" data-placeholder="true"> فضلا إختر السورة  </option>';
    var n = '';
    var i = start || 1;
    var n = 604;
    for (i ; i <= n ; i++) {
        if (i == seld)
            str += '<option value="' + i + '" selected="selected">' + i + '</option>';
        else
            str += '<option value="' + i + '">' + i + '</option>';
    }
    return str;
}

function getSuraName(sura) {
    if (sura_key == 4 || sura_key == 5) {
        return QuranData.Sura[sura][sura_key];
    }
    else if (sura_key == 'bs') {
        return QuranData.Sura_bs[sura];
    }
}
function getQareeName(qaree) {
    for (var i in quraa) {
        for (var j in quraa[i]) {
            if (j == qaree)
                return quraa[i][j];
        }
    }
}
function build_selMasahef(mosshaf) {
    var str = '';
    for (var i in masahef) {
        if (i == mosshaf)
            str += '<option value="' + i + '" selected="selected">' + _lang['mosshaf_' + i] + '</option>';
        else
            str += '<option value="' + i + '">' + _lang['mosshaf_' + i] + '</option>';
    }
    return str;
}

function juzSafha(juz) {
    return suraSafha(QuranData.Juz[juz][0], QuranData.Juz[juz][1]);
}
function suraSafha(sura, aya) {
    var n = QuranData[page_key].length;
    if (typeof aya == 'undefined') {
        var aya = 1;
    }
    else {
        var aya = aya;
    }
    for (var i = 1 ; i < n ; i++) {
        if (QuranData[page_key][i][0] > sura || (QuranData[page_key][i][0] == sura && QuranData[page_key][i][1] >= aya)) {
            if (QuranData[page_key][i][0] == sura && QuranData[page_key][i][1] == aya) {
                return i;
            }
            return i - 1;
        }
    }
}
function suraJuz(sura, aya) {
    var n = QuranData.Juz.length;
    var aya = aya || 1;
    for (var i = 1 ; i < n ; i++) {
        if (QuranData.Juz[i][0] > sura || (QuranData.Juz[i][0] == sura && QuranData.Juz[i][1] >= aya)) {
            if (QuranData.Juz[i][0] == sura && QuranData.Juz[i][1] == aya) {
                return i;
            }
            return i - 1;
        }
    }
}
function suraHizb(sura, aya) {
    var n = QuranData.HizbQaurter.length;
    var aya = aya || 1;
    for (var i = 1 ; i < n ; i++) {
        if (QuranData.HizbQaurter[i][0] > sura || (QuranData.HizbQaurter[i][0] == sura && QuranData.HizbQaurter[i][1] >= aya)) {
            if (QuranData.HizbQaurter[i][0] == sura && QuranData.HizbQaurter[i][1] == aya) {
                return i;
            }
            return i - 1;
        }
    }
}
function paddingAya(aya) {
    var aya = aya + '';
    if (aya.length < 2) {
        return '00' + aya;
    }
    else if (aya.length < 3) {
        return '0' + aya;
    }
    return aya;
}

function isLastAyaInPage(sura,aya){

    var safha = suraSafha(sura , aya);
    
    if(isLastAyaInSura(sura,aya)){
        sura++;
        aya = 1;
    }
    else{
        aya++
    }
    
    var next_safha = suraSafha(sura , aya);

    if((safha != next_safha) ){
        return true;
    }
    return false;
}
function isLastAyaInJuz(sura,aya){

    var juz = suraJuz(sura , aya);
    
    if(isLastAyaInSura(sura,aya)){
        sura++;
        aya = 1;
    }
    else{
        aya++
    }
    
    var next_juz = suraJuz(sura , aya);

    if((juz != next_juz) ){
        return true;
    }
    return false;
}
function isLastAyaInSura(sura,aya){
    if(++aya > QuranData.Sura[sura][1]){
        return true;
    }    
    return false;
}



SG.Dialog = (function($){
    function modaless(msg){
        var $p_over = $("#p_over").clone().appendTo('body').attr('id', '').addClass('p_over');
        $p_over.show();
        var $p_modal = $("#p_modaless").clone().appendTo('body').attr('id', '').addClass('p_modaless').data('over', $p_over);

        $p_modal.css('opacity', '0.2');
        $p_modal.css('-webkit-transition', 'opacity 0.3s ease-in');
        $p_modal.css('-ms-transition', 'opacity 0.3s ease-in');
        $p_modal.css('transition', 'opacity 0.3s ease-in');

        $p_modal.show();
        if($(window).scrollTop() && Math.abs($(window).scrollTop()) > 10){
            $p_modal.css('top', parseInt($p_modal.css('top'),10)+$(window).scrollTop());
        }
        

        setTimeout(function () {
            $p_modal.css('opacity', '1');
        }, 100);
        
        $p_over.on(MOVE_EV, function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        $p_modal.on(MOVE_EV, function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        $p_modal.hd = function () {
            try{
                $p_modal.data('over').remove();
                $p_modal.remove();
                SG.Trig.invoke('hideModaless');
            }
            catch(e){}
        }

        $p_modal.find(".msg").html(msg);
        
        $p_modal.tm = $p_modal.hd;

        $p_over.on("tapone", function(){
            $p_modal.hd();
        });
        
        SG.Trig.invoke('showModaless', $p_modal.hd);
        return $p_modal;
    }
    function modal(cb,config){
    		//cb = cb || _emp;
        var rnd = rand(1,99999);
        var id = 'modal_'+rnd;
        var id_cont = 'modal_cont_'+rnd;
        var id_groups = 'modal_groups_'+rnd;
        
        var $p_over = $("#p_over").clone().appendTo('body').attr('id', '').addClass('p_over');

        var $p_modal = $("#p_modal").clone().appendTo('body').attr('id', '').addClass('p_modal').data('over', $p_over);
        $p_over.show();
    		var persist = false;
        if(config){
        		if(config['persist']){
        			persist = true;
        		} 
            if(config['large'])
                $p_modal.addClass('large');
            else if(config['tiny'])
                $p_modal.addClass('tiny');
              
        }

        $p_modal.css('opacity', '0.2');
        
        $p_modal.css('-webkit-transition', 'opacity 0.3s ease-in');
        $p_modal.css('-ms-transition', 'opacity 0.3s ease-in');
        $p_modal.css('transition', 'opacity 0.3s ease-in');
    
        $p_modal.show();

         setTimeout(function () {
            $p_modal.css('opacity', '1');
        }, 100);
       
        
        if($(window).scrollTop() && Math.abs($(window).scrollTop()) > 10){
            $p_modal.css('top', parseInt($p_modal.css('top'),10)+$(window).scrollTop());
        }
        $p_modal.find('.cont').attr('id', id_cont);
        $p_over.on(MOVE_EV, function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        $p_modal.on(MOVE_EV, function (e) {
            e.preventDefault();
        });     
        $p_over.on("tapone", function(){
	        	if(! persist){
	        		$p_modal.tm();
	        	}
        });
        $p_modal.find(".close").on(END_EV, function(){
            $(this).fadeOut();
            $p_modal.tm();
        });

        
        $p_modal.id = id;
        $p_modal.id_cont = id_cont;
        $p_modal.id_groups = id_groups;
        $p_modal.hd = function () {
			$p_modal.css('opacity','0');
        		$p_modal.data('over').css('opacity','0.1');

            setTimeout(function () {
                try{
                    $p_modal.data('over').remove();
                    $p_modal.remove();
                    SG.Trig.invoke('hideModal');
                    if (cb){
                        cb();
                    }
                }
                catch(e){}
            }, 400);
        }
        $p_modal.tm = $p_modal.hd;
        var scrolled = false;
        $p_modal.setCont = function (cont) {
            $p_modal.find(".inner_cont").html(cont);
            if(! scrolled){
                scrolled = true;
                SG.Naver.attach(id_cont , 'defaultSet');
            }
            else{
                SG.Naver.get(id_cont).scrollTo(0,0,0);
                SG.Naver.refresh(id_cont);
            }
        }
        $p_modal.setTitle = function(title){
            $p_modal.find(".title>.cap").html(title);
        }
        
        $p_modal.setContrs = function(mix){
            if(mix === 'hide'){
                $p_modal.find(".contrs").hide();
                return;
            }
            $p_modal.find(".contrs").html('');
            
            for(var i=0; i<mix.length; i++){
                var $bu = $('<button>'+mix[i]['cap']+'</button>').on("tapone",mix[i]['cb']);
                $p_modal.find(".contrs").append($bu);
            }
            
        }
        $p_modal.hideBu = function () {
            $p_modal.find('button.ok').hide();
        }
        $p_modal.showBu = function () {
            $p_modal.find('button.ok').show();
        }
        $p_modal.find('button.ok').on(END_EV, function (e) {
            $p_modal.tm();
        });

        $p_modal.setGroups = function(groups){
            var g_w = $p_modal.find(".groups_cont").width();
            $p_modal.addClass("wgrps");
            $p_modal.find(".groups_cont").attr("id",id_groups).show();
            var ngs = groups.length;
            var min_w = Math.round(g_w/2);
            if(ngs > 2){
                $p_modal.find(".arrow_left,.arrow_right").show();
            }
            SG.Trig.on('orientation.'+id,function(){
                if(typeof $p_modal != "undefined"){
                    if($p_modal.is(":visible")){
                        $p_modal.hd();
                    }
                }
            });
            for(var j=0; j<ngs; j++){
                $p_modal.find(".groups")[(currLang == "ar")?'prepend':'append']('<div class="grp" data-index="'+j+'" id="'+id+'_g_'+j+'">'+groups[j]['title']+'<div>');
            }
            $('#'+id+'_g_0').addClass("active");
            var groups_w = 0
            $p_modal.find(".grp").each(function(){
                var w = $(this).width();
                if(w < min_w) w = min_w;
                groups_w += w;

                $(this).width(w);
            });
            $p_modal.find(".groups").width(groups_w);
            
            SG.Naver.attach(id_groups , 'horSet');
            if(currLang == "en"){
                SG.Naver.get(id_groups).scrollToElement($('#'+id+'_g_'+(ngs-1))[0], 0);
            }
            setTimeout(function(){
                SG.Naver.get(id_groups).scrollToElement($('#'+id+'_g_0')[0], 900);
            }, 1000);
            
            $p_modal.find(".grp").on("tapone" , function(){
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                $p_modal.trigger('grp_click',$(this).attr('data-index'));
            });
        }
        
        SG.Trig.invoke('showModal', $p_modal.hd);
        return $p_modal;
    }
    function alertt(msg,title,cb,config){
        var $widg = modal(cb,config);
        $widg.addClass("p_alertt");
        $widg.setCont('<div class="alertt_msg">'+msg+'</div>');
        if(title) $widg.setTitle(title);
        return $widg;
    }
    function confirmm(title, msg, cap1, cap2, cb1, cb2) {
        cb1 = cb1 || _emp;
        cb2 = cb2 || _emp;
        var $widg = modal();
        $widg.addClass("p_alertt");
        $widg.setCont(msg);
        $widg.setContrs([{"cap":cap1,"cb":function(){cb1();$widg.tm()}},{"cap":cap2,"cb":function(){cb2();$widg.tm()}}]);
        return $widg;
    }
    function notify(msg){
        var  $widg = modaless(msg);
        return $widg;
    }
    function loading(){
        var  $widg = modaless('<img src="images/loading_trans.gif" style="margin:auto;padding:10px;">');
        return $widg;
    }
    
    function selt($sel, title, cb, groups){
        var $widg = modal(cb,{"large":true});
        
        if(groups){
            groups.unshift({title:_lang['all'],cnt:"all"});
            $widg.setGroups(groups);
        }
        var str = '';
        $sel.find("option").each(function(){
            str += '<div class="itm" data-val="'+$(this).val()+'">'+$(this).html()+'</div>';
        });

        $widg.setCont(str);
        
        if(title) $widg.setTitle(title);
        
        $widg.setContrs([{cap:" &nbsp; "+parseAr(_lang['hide'])+" &nbsp; ",cb:$widg.hd}]);
        
        $widg.find(".srch").show();
        
        var $active_ele = $widg.find("div[data-val='"+$sel.val()+"']");
        $active_ele.addClass("active");

        var scrollTo_ele = $active_ele.prev('.itm').prev('.itm')[0] || $active_ele.prev('.itm')[0] || $active_ele[0];
        if(scrollTo_ele) SG.Naver.get($widg.id_cont).scrollToElement(scrollTo_ele, 400);

        $widg.on("tapone",".itm", function(){
            $sel.val( $(this).attr('data-val') ).trigger('change',true);
            $widg.hd();
        });

        $widg.on("grp_click", function(e,index){
            selFilter(groups[index]['cnt']);
            SG.Naver.get($widg.id_cont).scrollTo(0,0,0);
            SG.Naver.get($widg.id_cont).refresh();
        });

        $widg.find(".selt_fld_srch").keyup(function(){
            var val = $(this).val().toLowerCase();
            $('#'+$widg.id+'_g_0').siblings().removeClass("active");
            $('#'+$widg.id+'_g_0').addClass("active");
            
            $widg.find(".inner_cont>div").each(function(){
                if(this.innerText.toLowerCase().indexOf(val) == -1){
                    this.style.display = 'none';
                }
                else{
                    this.style.display = '';
                }
            });
            SG.Naver.get($widg.id_cont).scrollTo(0,0,0);
            SG.Naver.get($widg.id_cont).refresh();
			try{
				SG.Naver.get($widg.id_groups).scrollToElement($('#'+$widg.id+'_g_0')[0], 300);
			}
			catch(e){}
        });
        
        function selFilter(gcont){
            if(gcont == "all"){
                $widg.find(".inner_cont>div").show();
            }
            else{
                $widg.find(".inner_cont>div").each(function(){
                    if(gcont.indexOf( $(this).attr('data-val') ) == -1){
                        this.style.display = 'none';
                    }
                    else{
                        this.style.display = '';
                    }
                });
            }
        }
    }
    return{
        notify:notify,
        loading:loading,
        alertt:alertt,
        confirmm:confirmm,
        selt:selt
    }

})($);
alertt = SG.Dialog.alertt;
selt = SG.Dialog.selt;
confirmm = SG.Dialog.confirmm;

var _ajaxes = (function () {
    var reqs = {};
    var add = function (url, data, method, ret, id) {
        var method = method || 'get';
        var id = id || '';
        var data = data || null;
        var ret = ret || 'json';
        var fullid = url + '_' + method + '_' + ret + '_' + id;
        if (!reqs[fullid]) {
            reqs[fullid] = {};
            reqs[fullid]['xhr'] = $[method](url, data, _emp, ret);
            reqs[fullid]['dfd'] = $.Deferred();

            reqs[fullid]['xhr'].done(function (p1, p2, p3) {
                reqs[fullid]['dfd'].resolve(p1, p2, p3);
                reqs[fullid] = undefined;
            });
            reqs[fullid]['xhr'].fail(function () {
                reqs[fullid]['dfd'].reject();
                reqs[fullid] = undefined;
            });
        }
        //reqs[fullid]['dfd'].then(cb,cbf);
        return reqs[fullid]['dfd'].promise();
    }
    var get = function (url, ret, id) {
        return add(url, null, 'get', ret, id);
    }
    return {
        get: get
    }

})();
var parsedStr = {};
function parseAr(str, force){
    if(!useParse()) return str;
    if(!force && currLang != "ar") return str;
    
    return (parsedStr[str])?parsedStr[str]:(parsedStr[str]=parseArabic(str));
}

function rand(x, y) {
    return Math.floor(Math.random() * (y - x + 1) + x);
}

var combinedSelsInited = false;
function initCombinedSels(){
    if(combinedSelsInited) return;
    ///////
    combinedSelsInited = true;

    $("#repeat_sel_begin_sura,#mtest_sel_begin_sura,#m_sel_begin_sura").change(function (e) {
        var base = $(this).attr('id').split('_')[0];

        var b_sura = $(this).val();
        var e_sura = $("#"+base+"_sel_end_sura").val();

        $("#"+base+"_sel_begin_aya").html(build_selAyat(QuranData.Sura[b_sura][1]));

        $("#"+base+"_sel_end_sura").html(build_selSowar(e_sura, b_sura));

        $("#"+base+"_sel_end_sura").change();

        $("#"+base+"_sel_begin_aya").change();

    });

    $("#repeat_sel_begin_aya,#mtest_sel_begin_aya,#m_sel_begin_aya").change(function () {
        var base = $(this).attr('id').split('_')[0];

        var b_sura = $("#"+base+"_sel_begin_sura").val();
        var e_sura = $("#"+base+"_sel_end_sura").val();
        var b_aya = $(this).val();
        var e_aya = $("#"+base+"_sel_end_aya").val();
        if (b_sura == e_sura) {
            $("#"+base+"_sel_end_aya").html(build_selAyat(QuranData.Sura[e_sura][1], e_aya, b_aya));
            $("#"+base+"_sel_end_aya").change();
        }
    });

    $("#repeat_sel_end_sura,#mtest_sel_end_sura,#m_sel_end_sura").change(function () {
        var base = $(this).attr('id').split('_')[0];

        var b_sura = $("#"+base+"_sel_begin_sura").val();
        var e_sura = $(this).val();
        var start = 1;

        if (b_sura == e_sura) {
            start = $("#"+base+"_sel_begin_aya").val();
        }

        $("#"+base+"_sel_end_aya").html(build_selAyat(QuranData.Sura[e_sura][1], QuranData.Sura[e_sura][1], start));
        $("#"+base+"_sel_end_aya").change();
    });

}

SG.setMozaker = _emp;
function formatFD(stamp){ //format fav date
    var d = new Date(stamp*1000);
    return d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
}

trace = function (v) {
    console.log(v);
}
c = trace;