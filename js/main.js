/*
	Name: Read
	Description: Responsive HTML5 Template
	Version: 1.0
	Author: pixelwars
*/


(function ($) {

	/* DOCUMENT LOAD */
	$(function() {
		
		
			
		//**********************************
		//NAV MENU
		$('.main-navigation li').hover(function() {
			var subMenu = $(this).find('ul:first');
			$(this).siblings().find('a').removeClass("selected");
			//if has sub menu
			if(subMenu.length) {
				$(this).find('a').eq(0).addClass("selected");
				subMenu.show();
			}
		}, function(e) {  //hover out
			var subMenu = $(this).find('ul:first');
			subMenu.hide();
			$(this).find('a').eq(0).removeClass("selected");
		});
		//NAV MENU
		//**********************************
		
		
		//**********************************
		// prepeare mobile search form 
		var searchForm = $('.main-navigation li:last').clone();
		searchForm.find('form').attr('id','search-form-mobile');
		searchForm.find('#search').attr('id','search-mobile-input').attr('placeholder',searchForm.find('label').text());
		searchForm.find('#search-submit').attr('id','search-mobile-submit');
		searchForm.find('label').remove();
		$('body').prepend('<div class="search-mobile">'+ searchForm.html() + '</div>');
		//**********************************
		
		
		// MOBIL NAV MENU - SELECT LIST
		//**********************************
		/* Clone our navigation */
		var mainNavigation = $('.main-navigation > ul').clone();
		
		/* Replace unordered list with a "select" element to be populated with options, and create a variable to select our new empty option menu */
		$('.main-navigation').prepend('<select class="menu"></select>');
		var selectMenu = $('select.menu');
		$(selectMenu).append('<option value="null">'+"MENU"+'</option>');
		
		/* Navigate our nav clone for information needed to populate options */
		$(mainNavigation).children('li').each(function() {
		
			 /* menu - LEVEL 1 */
			 $(selectMenu).append(generateSelectLink($(this), ''));
			
			 /* menu - LEVEL 2 */
			 if ($(this).children('ul').length > 0) {
					$(this).children('ul').children('li').each(function() {
			
					/* Append this option to our "select" */
					$(selectMenu).append(generateSelectLink($(this), ' » '));
				   
				   /* menu - LEVEL 3 */
				   if ($(this).children('ul').length > 0) {
						$(this).children('ul').children('li').each(function() {
					
						   /* Append this option to our "select" */
						   $(selectMenu).append(generateSelectLink($(this), ' »» '));
						   
						   
						   /* menu - LEVEL 4 */
						   if ($(this).children('ul').length > 0) {
								$(this).children('ul').children('li').each(function() {
							
								   /* Append this option to our "select" */
								   $(selectMenu).append(generateSelectLink($(this), ' »»» '));
								   
								});
							 }
						   
						});
					 }
				   
				});
			 }
		});
		
		function generateSelectLink(li, prefix) {
			var navLink = li.children('a'); 
			if(navLink.length) {
				return '<option value="' + navLink.attr('href') + '"> ' + prefix + navLink.text() + '</option>';
			}
			var sForm = li.children('form');
			if(sForm.length) {
				return '<option value="search"> ' + sForm.find('label').text() + '</option>';
			}
		}
		
		/* When our select menu is changed, change the window location to match the value of the selected option. */
		$(selectMenu).change(function() {
			
				var url = this.options[this.selectedIndex].value;
				if(url == 'search') {
					$('.search-mobile').slideDown().find('#search-mobile-input').focus();
				} else if (url != "null") {
					location = this.options[this.selectedIndex].value; 
				}
		});
		//**********************************
		
		
		//**********************************
		// mobile search focus out
		$('#search-mobile-input').focusout(function() {
			$('.search-mobile').slideUp();
			$("select.menu").val('null').trigger('click');
		});
		//**********************************
		
		
		
		//**********************************
		// SEARCH BOX
		$("#search-form #search").focus(function () {
			 $(this).stop().animate({ width:140 }).siblings('label').stop(true,true).fadeOut(400);
		}).blur(function() {
		  $(this).stop().animate({ width:50 });
		  if($(this).val() == "") {
			$(this).siblings('label').stop(true,true).fadeIn(400);
		  }
		});
		//**********************************
		
		
		//**********************************
		// WP FIX - searchbox
		$("#searchform #s").attr('placeholder','Enter keyword...');
		
		//button with icons
		$('input[type=submit], input[type=button], button, a.button').each(function(index, element) {
			if($(this).find('i').length) {
				$(this).addClass('icon-button');	
			}
		});
		//**********************************
		
		
		//**********************************
		// CODE PRETTIFY
		if($('.prettyprint').length) {
			window.prettyPrint && prettyPrint();
		}
		//**********************************
		
		
		
		
		//**********************************
		// UNIFORM
		$("select:not([multiple]), input:checkbox, input:radio, input:file").uniform();
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1;
		if(isAndroid) {
			$('html').addClass('android');
		}
		//**********************************
		
		
		//Custom Stuff
		var skills = $('#skills_list span');
		if (skills.length > 0){
			$("#skills").text(skills[Math.floor(Math.random()*skills.length)].innerText);
			setInterval(function(){
				$("#skills").fadeOut(500,function(){
					$("#skills").text(skills[Math.floor(Math.random()*skills.length)].innerText);
					$("#skills").fadeIn(500);
				});
			},3000);
		}
	});

})(jQuery);	