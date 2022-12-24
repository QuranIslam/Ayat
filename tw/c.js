function inv(){
	FB.init({ 
		appId:'403135549739488', cookie:true, 
		status:true, xfbml:true 
	});
     FB.ui({ method: 'apprequests', 
        message: 'كن داعية ... تطبيق آيات يقوم بإضافة آية مختارة من كتاب الله مع رابط للتلاوة والتفسير على حسابك يوميا'});
}
function buClick(link){
	if(link.indexOf('http') === 0) top.location.href = link;
	else link.call();
}
function showImg(){
	document.getElementById("s_img").style.display = 'inline';
}
function hideImg(){
	document.getElementById("s_img").style.display = 'none';
}
function showIdea(){
	document.getElementById("s_idea").style.display = 'block';
}
function hideIdea(){
	document.getElementById("s_idea").style.display = 'none';
}