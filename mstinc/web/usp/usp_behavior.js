 
  function USP_enableMe() {
      document.getElementById("dscheck").value="0";
  }
  function USP_isCookieEnabled() {
      var exp = new Date();
      exp.setTime(exp.getTime() + 1800000);
      USP_setCookie("testCookie", "cookie", exp, false, false, false);
      if (document.cookie.indexOf('testCookie') == -1) {
          return false;
      }
      exp = new Date();
      exp.setTime(exp.getTime() - 1800000);
      USP_setCookie("testCookie", "cookie", exp, false, false, false);
      return true;
  }
  function USP_setCookie(name, value, expires, path, domain, secure) {
      var curCookie = name + "=" + value +
          ((expires) ? "; expires=" + expires.toGMTString() : "") +
          ((path) ? "; path=" + path : "") +
          ((domain) ? "; domain=" + domain : "") +
          ((secure) ? "; secure" : "");
      document.cookie = curCookie;
  }
  function USP_isDupSubmit() {
      var dupSbmt = true;
      var e = document.getElementById("dscheck");
      if (e != null && e.value == "0") {
          dupSbmt = false;
          e.value = "1";
          setTimeout(USP_enableMe, 5000);
      }
      return dupSbmt;
  }
  function USP_setParamStatus() {
      if (!USP_isDupSubmit()) {
          if (USP_isCookieEnabled()) {
              document.getElementById('testcookie').value = 'true';
          }
          document.getElementById('testjs').value = 'true';
          return true;
      }
      return false;
  }

  jQuery(function(){
    //DOM insertion
    jQuery('form[name=Login]').prepend('<input type="hidden" id="testcookie" name="testcookie" value="false"/>');
    jQuery('form[name=Login]').prepend('<input type="hidden" id="testjs"     name="testjs"     value="false"/>');
    jQuery('form[name=Login]').prepend('<input type="hidden" id="dscheck"    name="dscheck"    value="0"/>');
    //submit
    jQuery('form[name=Login]').submit( function() {
      return USP_setParamStatus();
    });
  });
