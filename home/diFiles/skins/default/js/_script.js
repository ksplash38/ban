// stuff inside here will run when the DOM is ready
// onload replacement
$(function(){

$('.uti .loginLi a#loginEnroll').on('click', function (event) {
    $(this).parent().toggleClass('open');
});

$('body').on('click', function (e) {
    if (!$('.uti .loginLi a').is(e.target) 
        && $('.uti .loginLi').has(e.target).length === 0 
        && $('.open').has(e.target).length === 0
    ) {
        $('.uti .loginLi').removeClass('open');
    }
});

/*Allows search image to be clicked to search*/
$('form[name=seek] .input-group span.search-submit').on('click', function(){
	$('form[name=seek]').submit();
});
/* checks for hash on homepage, toggles login section */
var currentLocation = window.location;
	console.log(currentLocation.hash);
if(currentLocation.hash.length > 1 && currentLocation.pathname.indexOf('home/home') >= 0) 
{
	if (currentLocation.hash == "#pNav")
	{
	  $('.mastWrap .mast div#pNav').addClass('in');
	}
	if (currentLocation.hash == "#loginEnroll")
	{
		$('.uti .loginLi').addClass('open');
	}
}

/*tag replace*/
	$(".tagReplace").each(function(){
					var txt = $(this).text();
					txt = txt.tagReplace();
					$(this).html(txt);
				});

  
// prevent IE from throwing error 
if (typeof console == "undefined") {
    window.console = {
        log: function () {}
    };
}

	// Uncomment and Optimize the selector below for rollover images. 
	// Should select the ID of the element containing the nav w/ rollover images.
	// HINT: You can add more image containers by separating IDs with a space, just like in CSS: $('#navBar1 #navBar2')
	$('.pNav').rollovers();
	
	// Uncomment the following to make a search box automagically add and remove the default value of that field
	//    on focus and blur.
	 $('#searchField').searchField();

	//fix for IE6 security warning when doing a site search on a secure page
	if (cfg_has_search)
	{
		var ieVer = parseInt(navigator.appVersion.split('MSIE')[1]);
		if (ieVer == 6) {
			$('.searchForm').attr('action', $('.searchForm').attr('action').replace( /https/, 'http' ));
		}
	}
	
	// Back-to-top button generator ; use <attr name="noBackToTop" value="true" /> in navigation.xml to disable
	//backToTopCode = '<br /><a href="#" class="backToTopButton"><img src="'+fiImages+'/btn_backtotop.gif" border="0" alt="Back to Top" /></a>';
	backToTopCode = '';//<br /><a href="#" class="backToTopButton btn">Back to Top</a>';
	if (cfg_layout!="home") {
		if(!noBackToTop) $('.content').append( backToTopCode );
	
		var scrollableArea = $( '.content' ).outerHeight() + $( '.content' ).offset().top;
		if( (scrollableArea < $(window).height() ) ) {
			$('.backToTopButton').hide();
		}
	}

	// This turns on the DIMenus plugin, modify the selector to suit your template needs
	if(cfg_menu_system=="dimenus" && $(window).width() > 767 ) {
	 $('.parentMenu').DIMenus({columns:2});
	}
	
	// removes hand cursor from main nav items that link to javascript:void()
	$(".pNav a[href*='javascript:void']").addClass("nocursor");

	$('input').placeholder();



// qualize the height of DHTML nav columns
$('.subMenu').each(function() {
    //$(this).show().equalize({children: '.navColumn'}).hide()    
     $(this).prop('style','top:0;left:-1000px').show().equalize({children: '.navColumn'}).removeProp('style').hide()
});

	// if working locally, WC tends to cache so you need your session reset when clicking links.
	// if(cfg_on_bender) {
	// 	$('.sNav a, .content a, .nav a, .foot a').each(function() { 
	// 		$(this).attr('href',$(this).attr("href")+'?sid=');
	// 	});		
	// }	

	// move backpage images from snippet to template
		// if( $('.contentImg').children().length > 0 ) 
		// {
		// 	var image = $('.contentImg');
		// 	image.detach();
		// 	$('.imgBack').html(image)
		// }	

	//Backpage promo image mover
	var defaultContent = "<div class='hed'><img src='" + fiImages + "/hed_default.jpg' alt='Default' /></div><!--hed-->";
	var imageSelector = ".hed > img"; //this will be the promo image we care about
	var $moveTo = $(".moveTo")
	var $moveFrom = $(".editor .hed")
	//see if there's stuff in the snippet (a per-page promo image)
	if( $moveFrom.children().length > 0) {
		var content = $moveFrom; 
		content.detach();
		$moveTo.html(content);
	}
		//make sure an image is loading, if not, use the default content

	$(imageSelector).error(function(){
		log("Image not found: " + $(imageSelector).attr("src") + "\nUsing Default Content: " + defaultContent)
		$moveTo.html(defaultContent);
	});
		$(imageSelector).error();
		


		//Move first h1 from body content to special div
		//<div class="mainH1">
    //</div>
		//$('.mainH1').html($(".content h1:first-child").detach());
		//$('.pageHeader .contentOuter').html($(".content h1:first-child").text());$(".content h1:first-child").detach();
		
		//remove the button from the promo if it has no text
		$(".promoTxt .btn").each(function(){if($(this).html().length==0)$(this).detach()});


		//If there are no section links, hide the related div
				
				 if($(".snav ul:first-child ul").children().length == 0){
			$(".snav").detach()
		}
		
	
		//add a popup to calculator pages
		
if($(".section-calculator").length==1){
	showWarning("javascript:$('#tpwModal').hide();", "", "", 6);
	$("#tpwModal .btn-primary").detach();
}

$(window).resize( function() {
	adjustSitemode();
});
		
});

function adjustSitemode(){
	if( $(window).width() > 976 ) {
		sitemode="desktop";
	} else {
		sitemode="mobile";
	}

}

//console.log, eh?
//we should hide our messages
//and save our keystrokes
function log(log_message){
	if(cfg_enable_logging == true){
		console.log(log_message);
	}
}

// iframed form resizing
var int = self.setInterval(function(){isize()},2000);
var isize = function() {
	$('iframe.isize').each(function() {
		$(this).height($(this).contents().height());
	});
}

// pdf link detection and click event now handled here with .on()
// no need to place in the page onload
$("a[href$='.pdf'],a[href*='.pdf#']").on("click", function() {
	var $this = $(this);
	var linkOnclick = $this.attr('onclick');
	if (linkOnclick){
		linkOnclick = linkOnclick.toString();
		if (linkOnclick.indexOf("displayThirdPartyAlert")>-1)
		{
			return false;
		}
	}
	if (this.target=='_blank') this.target='';
	openPDF($this.attr('href'));
	return false;
});
$("a[href*='javascript:openPDF']").on("click", function() {
	if (this.target=='_blank') this.target = '';
	return true;
});

// for Cool Menus
if(window.event + "" == "undefined") event = null;
function showMenu(){return false};
oM = {mout:function(){return false;}};

/*
 * Added on 9-14-2012 by Darnell
 * Put this in an onclick with a link value from an SD (as a printData) and this function will evaluate
 *  how to handle the link, similar to what happens inside an SD, but without the XSL evaluation
 * Usage:
 *  <a href="#" onclick='return goToWCLink("$sd.getPrintData("dhtml_promos",$navSectionName,"link").replaceAll("\"","\\\"")")'>Text</a>
 */
function goToWCLink(partial_link) {
	if (partial_link.indexOf("javascript:") == 0)
	{
		return void(eval(partial_link.substring(11))) && false;
	}
	else if (partial_link.indexOf("http://") == 0 || partial_link.indexOf("https://") == 0 || partial_link.indexOf("//") == 0)
	{
		location.href = partial_link;
	}
	else if (partial_link.charAt(0)=="/")
	{
		location.href = contextPath + partial_link;
	}
	else if (partial_link.indexOf(".pdf") > -1 )
	{
		openPDF(partial_link);
	}
	else if (partial_link.indexOf(".doc") > -1 || partial_link.indexOf(".docx") > -1 || partial_link.indexOf(".txt") > -1 || partial_link.indexOf(".xls") > -1 || partial_link.indexOf(".xlsx") > -1 || partial_link.indexOf(".ppt") > -1 || partial_link.indexOf(".pptx") > -1)
	{
		window.open(fiDocs + partial_link);
	}
	else
	{
		location.href = contextPath + "/" + partial_link;
	}
	return false;
}

function target_blank(url){
    tmp = window.open(url);
    tmp = null;
}

function wcInternalPopup(url, height, width, opts) {
	wcPopup(url, height, width, false, opts);
}

function wcPopup(url, height, width, disclaimer, opts){
	var disclaimer = parseInt(disclaimer);
	var wide = parseInt(width);
	var tall = parseInt(height);
	var halfwide = (wide/2);
	var halftall = (tall/2);
	var pWidth = (((parseInt(screen.width) / 2)) - halfwide);
	var pHeight = (((parseInt(screen.height) / 2)) - halftall);
	var features = opts || 'toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1,width='+wide+',height='+tall+',top='+pHeight+',left='+pWidth;
	if (disclaimer)
		showWarning("javascript:void(window.open('"+url+"','externalpopup','"+features+"').focus())", url, false, disclaimer)
	else
		window.open(url,'wc_popup',features).focus();
}

function openDisc(page){
	var pWidth = (((parseInt(screen.width) / 2)) - 300)
	var pHeight = (((parseInt(screen.height) / 2)) - 400)
	bWindow = window.open(page,'discwin',"scrollbars=1,toolbar=0,location=0,directories=0,status=0,menubar=0,width=600,height=600,top=" + pHeight + ",left=" + pWidth);
	bWindow = null;
}

/*
 * Opens a PDF in a second window
 * Params:
 *  pdfname - either a full path to the pdf -or- the filename of the pdf in 'documents' folder of fiFiles
 *  isFullPath - DEPRECATED :: set this to true if you do not want the 'documents' folder path prepended to the pdf name
 *  fullscreen - set this to true if you want the new window to fill the user's screen instead of opening at 780 x 580
 * Usage:
 *  openPDF('filename.pdf')
 *  openPDF('//www.domain.com/pdfs/filename.pdf', true)
 *  etc...
 */
function openPDF(pdfname, fullscreen)
{
	pdfname = /^http/.test(pdfname) ? pdfname : RegExp(fiDir+'/documents/').test(pdfname) ? pdfname : fiDir+'/documents/'+pdfname;
	width = fullscreen ? screen.width : 780;
	height = fullscreen ? screen.height : 580;
	var domExp = new RegExp("^(http|https)\:\/\/(www\.)?(\w*\.)+(org|com|net|gov)"),
		domain = pdfname.match(domExp);
	if (domain && document.location.href.indexOf(domain[2]+domain[3]+domain[4]) == -1) {
		wcPopup(pdfname, height, width);
	} else {
		wcInternalPopup(pdfname, height, width);
	}
} // openPDF()


/************************************************************************************************************
* This function is used in the onclick of the a tag to display the external site warning. 
* @param msg - Integer specifying the which message to display.
* @param lk - The a link object
* Usage: <a href="http://wwww.mysite.com" onclick="return displayThirdPartyAlert(1,this);">My Site</a>
**************************************************************************************************************/
function displayThirdPartyAlert(msg,lk){
	var description = lk.innerHTML;
	if(description.indexOf('alt="') != -1){
		var x = description.indexOf('alt="')+5;
		var temp = description.substring(x);
		description = temp.substring(0,temp.indexOf("\""));
	}
	showWarning(lk.href, description, lk.target, msg)
	return false;
}

/************************************************************************************************************
* This function is used in the href of the a tag to display the external site warning. 
* @param lk - The url of the site to be opened
* @param desc - The description of the site to be opened, i.e. the name of the site.
* @param target - Allows for the window to opened in a new window
* @param msg - Integer specifying the which message to display.
* Usage: <a href="javascript:showWarning('http://wwww.mysite.com');">My Site</a>
**************************************************************************************************************/

function showWarning(lk, desc, target, msg){
	desc = (desc) ? desc : "Third Party Site";
	if(cfg_tpw_new_window=="true")target = (target) ? target : "_blank";
	if (lk.indexOf("http:")!=0&&lk.indexOf("https:")!=0&&lk.indexOf("mailto:")!=0) target = "_self";
	msg = (msg) ? msg : 0;
	
var titles = new Array();

titles[0] = titles[1] = '<h1>Third Party Site Disclaimer</h1>';
titles[2] = '<h1>Partner Site Disclaimer</h1>';
titles[3] = '<h1>Affiliate Site Disclaimer</h1>';
titles[4] = '<h1>Third Party Site Disclaimer</h1>';
titles[5] = '<h1>Email Disclaimer</h1>';
titles[6] = '<h1>Calculators Disclaimer</h1>';


var messages = new Array();
// Standard 3rd Party Warning
messages[0] = messages[1] = "<p>By accessing the noted link you will be leaving "+fiName+"'s website and entering a website hosted by another party. "+fiName+" has not approved this as a reliable partner site. Please be advised that you will no longer be subject to, or under the protection of, the privacy and security policies of "+fiName+"'s website. We encourage you to read and evaluate the privacy and security policies of the site you are entering, which may be different than those of "+fiName+".</p>";
messages[2] = "<p>By accessing the noted link you will be leaving our website and entering a partner site which is hosted by another party. Please be advised that you will no longer be subject to, or under the protection of, the privacy and security policies of our website. We encourage you to read and evaluate the privacy and security policies of the site which you are entering, which may be different than those of ours.</p>";
messages[3] = "<p>By accessing the noted link you will be leaving our website and entering an affiliate site which is hosted by another party. Please be advised that you will no longer be subject to, or under the protection of, the privacy and security policies of our website. We encourage you to read and evaluate the privacy and security policies of the site which you are entering, which may be different than those of ours.</p>";
messages[4] = "<p>By accessing the noted link you will be leaving our website and entering a site which is hosted by another party. Please be advised that you will no longer be subject to, or under the protection of, the privacy and security policies of our website. We encourage you to read and evaluate the privacy and security policies of the site which you are entering, which may be different than those of ours.</p>";
messages[5] = "<p>This is NOT a secured e-mail transmission. Please do not send personal/financial information via this method.</p>";
messages[6] = "<p>The information provided by these calculators is intended for illustrative purposes only and is not intended to purport actual user-defined parameters. The default figures shown are hypothetical and may not be applicable to your individual situation. Be sure to consult a financial professional prior to relying on the results.</p>";



$('#tpwModal .modal-title').html(titles[msg]);
$('#tpwModal .modal-body').html(messages[msg]);
$('#tpwModal .modal-footer .btn-go').attr('href',lk);
$('#tpwModal').show() 

}


String.prototype.tagReplace = function() {
	var result = (this == "") ? " " : this;

	return result.replace(/\(%tr%([^)]*)\)/g, '\<$1\>')
		.replace(/\(br\)/gi, "<br />")
		.replace(/\(bold\)/gi, "<strong>")
		.replace(/\(\/bold\)/gi, "</strong>")
		.replace(/\(sup\)/gi, "<sup>")
		.replace(/\(\/sup\)/gi, "</sup>")
		.replace(/\(em\)/gi, "<em>")
		.replace(/\(\/em\)/gi, "</em>")
		.replace(/\(amp\)/gi, "&")
		.replace(/\(lt\)/gi, "<")
		.replace(/\(gt\)/gi, ">")
		.replace(/\(astr\)/gi, "<sup>*</sup>")
		.replace(/\(carr\)/gi, "<sup>^</sup>")
		.replace(/\(dagg\)/gi, "<sup>&#8224;</sup>")
		.replace(/\(ddag\)/gi, "<sup>&#8225;</sup>");

}


function getUrl(){
	var url = document.location.href;
	var urlstart = url.indexOf("newUrl=") + 7;
	var urlToReturn = url.substring(urlstart);
	return urlToReturn;
}

// Array, String, and Date functions
// plus rollover and searchField jQuery plugins
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('A.X.1n=5(b){e c=A.1o({M:\'1p\',Y:\'1q\'},b);8 2.N(5(){e a=2;a.F=c;A(\'1r,1s[1t="1u"]\',2).O(\'[n*="\'+a.F.M+\'."]\').N(5(){q=2;q.P=B Z();q.Q=B Z();q.Q.n=q.n;q.P.n=q.n.l(B 1v(a.F.M+"\\.([a-z]{3,4})$",\'i\'),a.F.Y+".$1")}).1w(5(){2.n=2.P.n},5(){2.n=2.Q.n})})};A.X.1x=5(){8 2.N(5(){e a=A(2);j(2.G&&2.G.h&&!2.u.h){a.1y(2.G);a.1z(\'G\')}j(2.u.h){2.R=2.u;a.1A(5(){j(2.u==2.R)2.u=\'\'}).1B(5(){j(!2.u.h)2.u=2.R})}})};m.10=[\'1C\',\'1D\',\'1E\',\'1F\',\'1G\',\'1H\',\'1I\'];m.11=[\'1J\',\'1K\',\'1L\',\'1M\',\'1N\',\'1O\',\'1P\'];m.12=[\'1Q\',\'1R\',\'1S\',\'1T\',\'13\',\'1U\',\'1V\',\'1W\',\'1X\',\'1Y\',\'1Z\',\'20\'];m.14=[\'21\',\'22\',\'23\',\'24\',\'13\',\'25\',\'26\',\'27\',\'2a\',\'2b\',\'2c\',\'2d\'];(5(){5 9(a,b){j(!m.k[a]){m.k[a]=b}};9("15",5(){e y=2.S();8(y%4==0&&y%2e!=0)||y%2f==0});9("16",5(){8 2.H()==0||2.H()==6});9("2g",5(){8!2.16()});9("2h",5(){8[w,(2.15()?29:28),w,C,w,C,w,w,C,w,C,w][2.I()]});9("2i",5(a){8 a?m.11[2.H()]:m.10[2.H()]});9("2j",5(a){8 a?m.14[2.I()]:m.12[2.I()]});9("17",5(){e a=B m("1/1/"+2.S());8 18.2k((2.19()-a.19())/2l)});9("2m",5(){8 18.2n(2.17()/7)});9("2o",5(a){2.1a(0);2.1b(a);8 2});9("2p",5(a){2.2q(2.S()+a);8 2});9("2r",5(a){e b=2.J();2.1a(2.I()+a);j(b>2.J())2.1c(-2.J());8 2});9("1c",5(a){2.1b(2.J()+a);8 2});9("2s",5(a){2.2t(2.2u()+a);8 2});9("2v",5(a){2.2w(2.2x()+a);8 2});9("2y",5(a){2.2z(2.2A()+a);8 2})})();(5(){5 9(a,b){j(!T.k[a]){T.k[a]=b}};9("2B",5(a,b){b=b||D;x(e i=0;i<2.h;i++)a.E(b,2[i],i,2)});9("2C",5(a,b){b=b||D;x(e i=0;i<2.h;i++)j(!a.E(b,2[i],i,2))8 U;8 1d});9("2D",5(a,b){b=b||D;x(e i=0;i<2.h;i++)j(a.E(b,2[i],i,2))8 1d;8 U});9("2E",5(a,b){b=b||D;e r=[];x(e i=0;i<2.h;i++)r[r.h]=a.E(b,2[i],i,2);8 r});9("O",5(a,b){b=b||D;e r=[];x(e i=0;i<2.h;i++)j(a.E(b,2[i],i,2))r[r.h]=2[i];8 r});9("1e",5(a,b){x(e i=b||0;i<2.h;i++)j(2[i]===a)8 i;8-1});9("2F",5(){8 2.O(5(a,b,c){8 c.1e(a)>=b})})})();(5(){5 9(a,b){j(!1f.k[a]){1f.k[a]=b}}9("2G",5(){8 2.l(/(^\\s+|\\s+$)/g,"")});9("2H",5(){8 2.l(/[-2I]([a-z])/2J,5(z,b){8 b.2K()})});9("2L",5(a,b){e b=b||0;j(b<0||b>2.h)8 U;8 2.1g(b,b+a.h)==a});9("2M",5(a){8 2.1g(2.h-a.h)==a});9("2N",5(a,b){a=a||C;b=b===2O?"...":b;8 2.h>a?2.1h(0,a-b.h)+b:2});9("2P",5(){8 2.l(/<\\/?[^>]+>/o,\'\')});9("2Q",5(){8(2=="")?"&#2R;":2.l(/\\(1i\\)/o,"<1i />").l(/\\(K\\)/o,"<K>").l(/\\(\\/K\\)/o,"</K>").l(/\\(b\\)/o,"<1j>").l(/\\(\\/b\\)/o,"</1j>").l(/\\(i\\)/o,"<1k>").l(/\\(\\/i\\)/o,"</1k>")})})();V.k.L=5(a,b){2.k[a]=b;8 2};V.L(\'2S\',5(b){e d={},p=(2.k=B b());2.L(\'1l\',5 1l(a){j(!(a 2T d)){d[a]=0}e f,r,t=d[a],v=b.k;j(t){2U(t){v=v.2V.k;t-=1}f=v[a]}2W{f=p[a];j(f==2[a]){f=v[a]}}d[a]+=1;r=f.1m(2,T.k.1h.1m(W,[1]));d[a]-=1;8 r});8 2});V.L(\'2X\',5(a){x(e i=1;i<W.h;i+=1){e b=W[i];2.k[b]=a.k[b]}8 2});',62,184,'||this|||function|||return|add|||||var|||length||if|prototype|replace|Date|src|gi||el||||value||31|for|||jQuery|new|30|window|call|opts|title|getDay|getMonth|getDate|sup|method|off|each|filter|overObj|outObj|defaultValue|getFullYear|Array|false|Function|arguments|fn|on|Image|dayNames|abbrDayNames|monthNames|May|abbrMonthNames|isLeapYear|isWeekend|getDayOfYear|Math|getTime|setMonth|setDate|addDays|true|indexOf|String|substring|slice|br|strong|em|uber|apply|rollovers|extend|_off|_on|img|input|type|image|RegExp|hover|searchField|val|removeAttr|focus|blur|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat|January|February|March|April|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|||Sep|Oct|Nov|Dec|100|400|isWeekDay|getDaysInMonth|getDayName|getMonthName|floor|86400000|getWeekOfYear|ceil|setDayOfYear|addYears|setFullYear|addMonths|addHours|setHours|getHours|addMinutes|setMinutes|getMinutes|addSeconds|setSeconds|getSeconds|forEach|every|some|map|unique|trim|camelize|_|ig|toUpperCase|startsWith|endsWith|truncate|undefined|stripTags|tagReplace|160|inherits|in|while|constructor|else|swiss'.split('|'),0,{}))




