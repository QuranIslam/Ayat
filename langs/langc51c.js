$(function(){
	var ayat_fnd = false;






	$.get(file , function(xml){
		if(org_file){
			$.get(org_file , function(xml2){
				parse(xml , xml2);
			});
		}
		else{
			parse(xml);
		}
		function parse(xml , xml2){
			//alert(1);
			var $xml = $(xml);
			if(xml2) $xml2 = $(xml2);
			else $xml2 = false;
			var $chlds = $xml.children('root').children();
			var str = '<form id="frm">',$j;
			var lbl = '';
			$chlds.each(function(i,j){
				//alert(i);
				if( j.tagName.indexOf('Ayat')!= -1){
					ayat_fnd = true;
					str += '<fieldset class="ayat"><legend>'+j.tagName+'</legend>';
				}
				else{
					str += '<fieldset><legend>'+j.tagName+'</legend>';
				}
				
				$j = $(j).children();
				$j.each(function(k,m){
					$m = $(m);
					if($xml2){
						lbl = $xml2.find(m.tagName).text();
					}
					else{
						lbl = $m.text();
					}
					if(m.tagName.indexOf('hlp_') == -1){
						str += '<div><label>'+lbl+'</label><input type="text" size="120" name="'+m.tagName+'" value="'+$.trim($m.text())+'">'+'</div>';
					}
					else{
						str += '<div><label>'+lbl+'</label><textarea cols="120" rows="4" name="'+m.tagName+'">'+$.trim($m.text())+'</textarea></div><div class="cb">&nbsp;</div>';
					}
				});
				str += '</fieldset>';
			});
			str += '</form>';
			$('#cnt').html(str);
			if(ayat_fnd){
				$("#trj_ayat").show();
			}
		}
	});


	function xmler(lang){
		var objs = {};
		var key,val,str;
		for(var i in lang){
			if(i.indexOf('_') == -1){
				key = "general"
				val = i;
			}
			else{
				key = i.split("_")[0];
				val = i;
			}
			if(objs[key]){
				objs[key][i] = lang[i];
			}
			else{
				objs[key] = {};
				objs[key][i] = lang[i];
			}
			
		}
		str = '<root>'+"\r\n";
		for(var j in objs){
			str += "\t"+'<'+j+'>'+"\r\n";
			for (var k in objs[j]){
				str += "\t\t" + '<'+k+'> '+objs[j][k]+' </'+k+'>'+"\r\n";
			}
			str += "\t" + '</'+j+'>'+"\r\n";
		}
		str += '</root>';
		return str;
	}

	$("#save").click(function(){
		//alert($("#frm").serializeObject());
		msg("Saving ...");
		$.post('langer.html' , {export:1 , xml : xmler( $("#frm").serObj() ) } , function(){
			msg("Saved");
			saved_bef = true;
			setTimeout(function(){msg()} , 2000);
			
			$("#tb_exp").show();

		});
	});
	prev_mode = false;
	saved_bef = false;
	$("#preview").click(function(){
		//alert(0);
		if( ! prev_mode){
			//alert(1);
			if(! saved_bef){
				msg("Saving ...");
				$.post('langer.html' , {export:1 , xml : xmler( $("#frm").serObj() ) } , function(){
					msg(false);
					saved_bef = true;
					$("#preview").click();
				});
				return;
			}
			//alert(2);
			preview();
			$("#tb button").hide();
			$(this).show();
			$(this).addClass('active');
			$(this).html('Hide | إخفاء');
			prev_mode = true;
		}
		else{
			hide();
			$("#tb button").show();
			$(this).removeClass('active');
			$(this).html('Preview | استعراض');
			prev_mode = false;
		}
	});
	$("#saview").click(function(){
		msg("Saving ...");
		$.post('langer.html' , {export:1 , xml : xmler( $("#frm").serObj() ) } , function(){
			msg(false);
			saved_bef = true;
			$("#preview").click();
		});

	});
	$("#switch").click(function(){
		document.location = '?from='+$("#lang_from").val()+"&to="+$("#lang_to").val();
	});
	$("#export").click(function(){
		if($("#tb_exp").is(":visible") ){
			$("#tb_exp").hide();
			$(this).html("Export");
		}
		else{
			msg("Exporting ...");
			$(this).html("Close");			
			$.post('langer.html' , {"export":1 , xml : xmler( $("#frm").serObj() ) } , function(){
				msg(false);
				$("#tb_exp").show().html("  فضلا احتفظ بالرقم لتتمكن من استخدامه عبر قائمة الاستيراد  ' <span class='hilite'>"+key+"</span> ' : رقم التصدير هو " + "<p> Translation Key is : ' <span class='hilite'>"+key+"</span> ' - Please save it to be able to restore your work using import button");
			});
		}
	});
	$("#import").click(function(){
		if($("#tb_imp").is(":visible") ){
			$("#tb_imp").hide();
			$(this).html("Import");
		}
		else{
			$("#tb_imp").show();
			$(this).html("Close");
		}
	});
	$("#done").click(function(){
		if($("#tb_done").is(":visible") ){
			$("#tb_done").hide();
			$(this).removeClass('active');
			$(this).html("Done | تم");
		}
		else{
			$("#tb_done").show();
			$("#complete").click();
			$(this).addClass('active');
			$(this).html("Close | إغلاق");
		}
	});
	$("#imp").click(function(){
		msg('Importing ...');
		var k = $("#imp_key").val();
		$.post('langer.html' , {ver:1 , key:k} , function(r){
			if(r && r.indexOf('_') != -1){
				document.location = '?from='+r.split('_')[0]+'&to='+r.split('_')[1];//+'&k='+k;
			}
			else{
				msg('Key not Found');
				setTimeout(function(){msg()} , 1500);

			}
		});
	});
	$("#complete").click(function(){
		msg("Exporting ...");
		
		$.post('langer.html' , {"export":1 , "xml" : xmler( $("#frm").serObj() ) } , function(){
			msg("Marking ...");
			var notes = $("#notes").val();
			$.post('langer.html' , {notes:notes,comp:1} , function(r){
				
				if(r && r == "done"){
					msg("Done");
				}
				else{
					msg("Sorry Operation Failed");
				}
				setTimeout(function(){msg()} , 2000);
			});

		});

		
	});
	
	$("#bu_yes").click(function(){
		$(".ayat").show();
		$(this).parents('#trj_hint').remove();
	});
	
	function msg(s){
		if(! s){
			$("#tb_msg").slideUp('fast');
			return;
		}
		$("#tb_msg").html(s).slideDown('fast');
	}
	
	function preview(){
		$("#ifr")[0].src = '../index819a.html?l=preview';
		$("#ifr").show();
	}
	function hide(){
		$("#ifr")[0].src = '';
		$("#ifr").hide();
	}
	$('fieldset input, fieldset textarea').live('focus' , function(){this.select()});
	
	setInterval(function(){
		$("#save").click();
	} , 60000);
	//alert(str);
	
	//$("#output").val(xmler(_langs['ar']));
});
$.fn.serObj = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};