var ifr;var SCROLL_BAR_WIDTH=20;var USP_MIN_WIDTH=800;var lastVisitedURL="";function pageY(a){return a.offsetParent?(a.offsetTop+pageY(a.offsetParent)):a.offsetTop}var buffer=90;function needsFullWindowScroll(a){return/launch\?code=sdp$/.test(a)}function loadIframe(a,b){ifr=document.getElementById("appContainer");if(Ext.isWebKit){if(!needsFullWindowScroll(a)){ifr.scrolling="auto";ifr.style.overflow="auto"}}ifr.customHeight=(b?b:-1);Ext.fly("appContainer").dom.setAttribute("src",a)}var eventMethod=window.addEventListener?"addEventListener":"attachEvent";var eventer=window[eventMethod];var messageEvent=eventMethod=="attachEvent"?"onmessage":"message";var integratedAppDomains=null;eventer(messageEvent,function(c){if(integratedAppDomains===null){integratedAppDomains={};integratedAppDomains[window.location.hostname]=true;Ext.each(integratedAppDomainsList.split(","),function(d){integratedAppDomains[Ext.String.trim(d)]=true})}domain=c.origin.replace(/.*\/\//,"");if(c.origin.search(/https:/i)!==0||!(domain in integratedAppDomains)){return}var b=Ext.decode(c.data);if(b.action==="sizing"){setSize(b);setDefaultScrollBehavior(false)}if(b.action==="navigate"){var a=b.url;if(a!=null){if(navigationValidation!=null&&navigationValidation==="true"){if(a.toLowerCase().indexOf(c.origin.toLowerCase())!==0&&window.location.hostname.toLowerCase().indexOf(domain.toLowerCase())!==0){return}}if(Ext.isSafari&&(a.indexOf("SafariCookie")>-1)){window.location.href=a}else{loadIframe(a)}}}else{}},false);function calcDefaultHeight(){var a=document.documentElement.clientHeight;buffer=parseInt(ifs.env.footerBuffer)||buffer;a-=pageY(document.getElementById("appContainer"))+buffer;a=(a<0)?0:a;a=ifr.customHeight&&ifr.customHeight>0?ifr.customHeight:a;document.getElementById("appContainer").style.height=a+"px"}function setDefaultWidth(){USP_MIN_WIDTH=800;document.getElementById("header-container").style.minWidth=USP_MIN_WIDTH+"px";document.getElementById("main").style.width="100%";document.getElementById("appContainer").style.width="100%"}var timeOut=null;function resizeIFrameEvent(a){if(timeOut!=null){clearTimeout(timeOut)}timeOut=setTimeout(function(){setWidth();setTimeout(function(){setHeight()},150)},150)}function resizeIframeHeight(a){setTimeout(function(){setHeight()},150)}function setDefaultScrollBehavior(a){if(Ext.isEmpty(ifr)){ifr=document.getElementById("appContainer")}var c=ifr.src;if(a&&c===lastVisitedURL){return}lastVisitedURL=c;document.body.style.overflow=(a===true)?"hidden":"visible";ifr.scrolling=(a===true)?"auto":"no";ifr.style.overflow=(a===true)?"auto":"hidden";if(a){calcDefaultHeight();Ext.EventManager.removeResizeListener(resizeIFrameEvent);Ext.EventManager.onWindowResize(calcDefaultHeight);setDefaultWidth()}else{Ext.EventManager.removeResizeListener(calcDefaultHeight);Ext.EventManager.onWindowResize(resizeIFrameEvent);var b=!!navigator.userAgent.match(/Trident.*rv[ :]*11\./);if(Ext.isIE||b){ifr.contentWindow.document.documentElement.style.overflow="hidden"}}}function iframeOnLoad(){ifr=document.getElementById("appContainer");setDefaultScrollBehavior(true);try{var b=(ifr.contentWindow||ifr.contentDocument);if(b.document){b=b.document;var d=b.getElementsByTagName("title")[0];if(d!=null&&d!=undefined){var a=d.innerHTML;ifr.setAttribute("title",a)}else{ifr.setAttribute("title",ifs.env.i18nStrings.uspcommon.iframetitle)}}}catch(c){}}function setWidth(b){if(!b){b=USP_MIN_WIDTH}else{USP_MIN_WIDTH=b}var a=Ext.Element.getViewportWidth();if(a<b+SCROLL_BAR_WIDTH){document.getElementById("main").style.width=b+SCROLL_BAR_WIDTH+"px";ifr.style.width=b+SCROLL_BAR_WIDTH+"px";document.getElementById("header-container").style.minWidth=b+SCROLL_BAR_WIDTH+"px"}else{document.getElementById("main").style.width="100%";ifr.style.width="100%";document.getElementById("header-container").style.width="100%";document.getElementById("header-container").style.minWidth=b+"px"}}function setHeight(b){var a=(b?b.currentHeight:getAbsoluteHeight(Ext.get(ifr.contentWindow.document.body)));if(a!=0){ifr.style.height=a+(Ext.isIE9?12:0)+"px"}}function setSize(a){try{if(!ifr.contentWindow){return}setHeight(a);setWidth(a?a.minWidth:null)}catch(b){}}function getAbsoluteHeight(b){var a=b.getHeight();Ext.each(b.query("> {position=absolute}{display=block}"),function(f,e,d){var c=f.offsetHeight+f.offsetTop;if(c>a){a=c}});return a}function getAbsoluteWidth(b){var a=b.getWidth();Ext.each(b.query("> {position=absolute}{display=block}"),function(e,d,c){var f=e.offsetWidth+e.offsetLeft;if(f>a){a=f}});return a}function resizeIframeRegistration(){var a=document.documentElement.clientHeight;a-=pageY(document.getElementById("regframe"));a=(a<0)?0:a;a=(a>iframe.contentWindow.document.body.scrollHeight)?a:iframe.contentWindow.document.body.scrollHeight;iframe.scrolling="no";document.getElementById("regframe").style.height=a+"px"};