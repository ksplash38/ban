/*
This depends on jQuery.js v.1.3.1

The main nav setup:
<ul id="mainNav">
	<li class="parentMenu" id="personal"><a href="personal">Personal</a></li>
	<li class="parentMenu" id="business"><a href="business">Business</a></li>
	<li class="parentMenu" id="loans"><a href="loans">Loans</a></li>
</ul>


Then somewhere else, the menu containers:
<div class="subMenu" id="menu_personal"> ... </div>
<div class="subMenu" id="menu_business"> ... </div>
<div class="subMenu" id="menu_loans"> ... </div>


Then in the onReady:
<script type="text/javascript">
	$(function () {
		$('ul#mainNav').DIMenus( [{ ... }] );
	});
</script>


and... Don't forget the CSS!


*/

jQuery.fn.extend({
	/*
		Here is the primary plugin method :: $('#menuContainerID').DIMenus( [{ columns: int, ... }] );

		This performs all of the initialization of the menus, and attaches the
		mouseEnter/Leave events to the nav items and corresponding sub-menus.
	*/
	'DIMenus': function (settings) {
		if (typeof jQuery == 'undefined' || typeof jQuery.offset == 'undefined') {
			throw("This plugin requires jQuery v1.3.1, or if using an older version of jQuery then jQuery.dimensions is required. In any case you need an implementation of jQuery.offset() to be available to this plugin!\n\nUpgrade your jQuery library!");
			return false;
		}
		
		var $this = $(this);

		jQuery.DIMenus.setSettings(settings);
		var params = jQuery.extend({}, jQuery.DIMenus.settings);

		$this.not('li[id="home"]').each(function () {
			var $this = $(this);
			$this.hover(jQuery.DIMenus.navOver,jQuery.DIMenus.navOut);
			var $subMenu = $("div.subMenu#menu_"+this.id);
			$subMenu.hover(jQuery.DIMenus.menuOver,jQuery.DIMenus.menuOut);
			
			//jQuery.DIMenus.menus[this.id] = { 'nav':$(this)[0], 'menu':$subMenu[0], offset: { 'x':0, 'y':0 } };
			 jQuery.DIMenus.menus[this.id] = { 'nav':$(this)[0], 'menu':$subMenu[0], offset: { 'x':params.xOffset?params.xOffset:0, 'y':params.yOffset?params.yOffset:0 } };

			// Setup the multi-column layout
			if (params.columns > 1) {
				// Create the first column from the existing list
				var $navCol1 = $('ul:not(li>ul)', $subMenu).wrap('<div class="navColumn navCol1" style="float:left;"></div>');
				
				//$subMenu.width($navCol1.width());

				var $sourceListItems = $('ul>li:not(li>ul>li)', $('div.navCol1', $subMenu));
				var n = $sourceListItems.size();
				var c = params.columns;
				var itemsPerColumn = Math.ceil(n/c);
				var beginIndex = itemsPerColumn;
				var endIndex = (itemsPerColumn*2);
				// Add the rest of the columns (beginning w/ col 2... i=2). Styles are inline to centralize things, but classes can be used for general styles
				for (var i = 2; i <= params.columns; i++) {
					var $colItems = $sourceListItems.slice(beginIndex,endIndex);
					if ($colItems.size() > 0) {
						var $navColn = $subMenu.append('<div class="navColumn navCol'+i+'" style="float:left;"><ul><!-- comment --></ul></div>');
						$('.navCol'+i+'>ul:not(li>ul)', $subMenu).append($colItems);
						//$subMenu.width($subMenu.width()+$navColn.width()+2);
						beginIndex = endIndex;
						endIndex += itemsPerColumn;
					}
				}
				// Tack on a clearfloat to keep things from going bad
				$subMenu.append('<div style="clear:both;height:0px;"><!-- comment --></div>');
			}
		});
	}
});

jQuery.extend(jQuery, { DIMenus: {
	'name': 'DIMenus',
	'settings': {},
	'menus': {},
	'menuTimeout': null,
	'currentMenu': null,
	'setSettings': function (settings) { jQuery.extend(jQuery.DIMenus.settings, settings); },
	'setMenuOffset': function (menu, x, y) {
		jQuery.extend(jQuery.DIMenus.menus[menu].offset, { 'x':x, 'y':y });
	},
	'positionMenu': function (menuName) {
		// figure out the top and left positions of the menu
		var $menuNav = $(jQuery.DIMenus.menus[menuName].nav);
		var $menuContainer = $(jQuery.DIMenus.menus[menuName].menu);
		var menuPos = $menuNav.position();
		menuPos.top += jQuery.DIMenus.menus[menuName].offset.y + ($menuNav.height() + ($.browser.msie ? -3 : -1));
		menuPos.left += jQuery.DIMenus.menus[menuName].offset.x;
		
		// if dhtml ends up outside the viewport, move it over so it's visible
		//var viewportWidth = $(document).width();
		//if ($menuContainer.outerWidth() + menuPos.left > viewportWidth)
	//		menuPos.left -= $menuContainer.outerWidth() + menuPos.left - viewportWidth + (($.browser.msie) ? 20 : 5);
	//	$menuContainer.css('top', menuPos.top).css('left', menuPos.left);
		
		var viewportWidth = $(document).width();
		var menuRightPos = $menuContainer.outerWidth() + menuPos.left + $(".nav").position().left + $(".mastWrap").position().left + 50;
		if (menuRightPos > viewportWidth)
			 menuPos.left -= menuRightPos - viewportWidth + (($.browser.msie) ? 20 : 5);
				$menuContainer.css('top', menuPos.top).css('left', menuPos.left);
	},
	'navOver': function () {
		// This is the mouseover event
		window.clearTimeout(jQuery.DIMenus.menuTimeout);
		if (jQuery.DIMenus.currentMenu) jQuery.DIMenus.currentMenu.hide();
		jQuery.DIMenus.currentMenu = $('#menu_' + this.id);
		jQuery.DIMenus.positionMenu(this.id);
		jQuery.DIMenus.currentMenu.show();
	},
	'navOut': function () {
		// This is the mouseout event
		jQuery.DIMenus.menuTimeout = window.setTimeout(function() {
			jQuery.DIMenus.currentMenu.hide();
		}, 100);
	},
	'menuOver': function() {
		// This is the mouseover event
		window.clearTimeout(jQuery.DIMenus.menuTimeout);
	},
	'menuOut': function () {
		// This is the mouseout event
		jQuery.DIMenus.menuTimeout = window.setTimeout(function() {
			jQuery.DIMenus.currentMenu.hide();
		}, 100);
	}
} });
