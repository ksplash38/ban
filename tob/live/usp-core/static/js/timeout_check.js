var timerRunning=false;var timerId;var warningClock;var timerLimit=(ifs.env.tokenLifetime)?parseInt(ifs.env.tokenLifetime)*1000:600000;var warningLimit=60;function startTimer(){if(warningClock!=null){clearInterval(warningClock);warningClock=null}if(timerId!=null){clearTimeout(timerId)}timerId=setTimeout(function(){showWarningBanner(warningLimit)},timerLimit-(warningLimit*1000));timerRunning=true}function stopTimer(){if(timerRunning){if(warningClock!=null){clearInterval(warningClock)}if(timerId!=null){clearTimeout(timerId)}}timerRunning=false;warningClock=null}function logout(){if(ifs.env.isMobileFlow){window.location.href="cma://usp-adaptive-conversion/timeout";return}else{if(ifs.env.isMWPwdResetFlow&&ifs.env.changePassword&&ifs.env.changePassword.mwCallBackUrl&&ifs.env.changePassword.mwCallBackUrl!=""){window.location.href=ifs.env.changePassword.mwCallBackUrl;return}}window.location.href="./logout?reason=timeout"}function keepSessionAlive(){if(timerRunning){Ext.Ajax.request({url:ifs.env.context+"/app/launch",params:{code:"loginPing"},method:"GET",success:function(a,b){},failure:function(a,b){}});hideWarningBanner();startTimer()}}function showWarningBanner(b){warningCounter=(b)?parseInt(b):59;Ext.get("warningTime").update((warningCounter));Ext.getDom("stillCounting").style.display="block";Ext.getDom("doneCounting").style.display="none";Ext.getDom("expiryWarning").style.display="block";var c=Ext.DomQuery.select("[tabindex],a[href],input,button",Ext.getDom("expiryWarning"));if(c!=null&&c.length>=1){for(i=0;i<=c.length-1;i++){if(c[i].getAttribute("onfocus")){c[i].removeAttribute("onfocus")}if(c[i].getAttribute("disabled")){c[i].removeAttribute("disabled")}}}var d=Ext.get("stillCounting").dom;var a=ARIA.ariaReplaceHTMLTagtoText(d.innerHTML);setTimeout(function(){ARIA.setAlertMessage(a);Ext.get("extendSession").focus()},2000);if(!warningClock){warningClock=setInterval(function(){if(warningCounter>0){Ext.get("warningTime").update((warningCounter--))}else{logout()}},1000)}}function hideWarningBanner(){if(warningClock){var a=Ext.get("doneCounting").dom;ariaDisableWarningPopup(a);Ext.getDom("stillCounting").style.display="none";Ext.getDom("doneCounting").style.display="block";setTimeout(function(){Ext.getDom("expiryWarning").style.display="none"},1000)}}function ariaEnableWarningPopup(a){ARIA.setRole(a,"alert")}function removeAriaWarnningProperty(a){a.removeAttribute("role")}function addTimerAlert(a){ARIA.setRole(a,"alert");ARIA.setProperty(a,"aria-live","polite");ARIA.setProperty(a,"aria-atomic","true")}function removeTimerAlertProperty(a){a.removeAttribute("role");a.removeAttribute("aria-live");a.removeAttribute("aria-atomic")}function ariaDisableWarningPopup(b){var a=ARIA.ariaReplaceHTMLTagtoText(b.innerHTML);ARIA.setAlertMessage(a)}Ext.onReady(function(){var a=Ext.Function.createThrottled(keepSessionAlive,30000,window);if(Ext.isIE){Ext.fly(window).on("click",a);Ext.fly(window).on("keydown",function(b){if(b.getCharCode()==9){a()}})}else{Ext.fly(document).on("click",a);Ext.fly(document).on("keydown",function(b){if(b.getCharCode()==9){a()}})}Ext.fly("warningTime").on("focus",function(){addTimerAlert(Ext.getDom("warningTime"))});Ext.fly("warningTime").on("blur",function(){removeTimerAlertProperty(Ext.getDom("warningTime"))});Ext.fly("expiry-warningDiv").on("keydown",function(b){if(b.shiftKey==true&&b.getCharCode()==9){b.stopEvent()}});Ext.fly("extendSession").on("keydown",function(b){if(b.shiftKey==false&&b.getCharCode()==9){b.stopEvent()}});Ext.fly("extendSession").on("click",function(b){var c=b;if(!b){c=window.event}c.cancelBubble=true;if(c.stopPropagation){c.stopPropagation()}keepSessionAlive()},this)});