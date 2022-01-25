$(function () {
	var swiper = new Swiper('.swiper-container', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	var init = false;

	function swiperMode() {
		let mobile = window.matchMedia('(min-width: 0px) and (max-width: 767px)');
		let tablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
		let desktop = window.matchMedia('(min-width: 1025px)');

		if (mobile.matches) {
			if (!init) {
				init = true;
				swiper = new Swiper('.swiper-container', {
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				});
			}
		} else if (tablet.matches) {
			swiper.destroy();
			init = false;
		} else if (desktop.matches) {
			swiper.destroy();
			init = false;
		}
	}
	window.addEventListener('load', function () {
		swiperMode();
	});
	window.addEventListener('resize', function () {
		swiperMode();
	});

	function scrollMode() {
		let mobile = window.matchMedia('(min-width: 0px) and (max-width: 767px)');
		let tablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
		let desktop = window.matchMedia('(min-width: 1025px)');

		if (desktop.matches) {
			$('.fadeInLeft').each(function () {
				var bottom_of_element = $(this).offset().top + $(this).outerHeight();
				var bottom_of_window = $(window).scrollTop() + $(window).height();

				if (bottom_of_window > bottom_of_element) {
					$(this).addClass('showmeLeft', {
						duration: 800
					});
				}
				if (bottom_of_window < bottom_of_element) {
					$(this).removeClass('showmeLeft', {
						duration: 800
					});
				}
			});

			$('.fadeInRight').each(function () {
				var bottom_of_element = $(this).offset().top + $(this).outerHeight();
				var bottom_of_window = $(window).scrollTop() + $(window).height();
				if (bottom_of_window > bottom_of_element) {
					$(this).addClass('showmeRight', {
						duration: 500
					});
				}
				if (bottom_of_window < bottom_of_element) {
					$(this).removeClass('showmeRight', {
						duration: 500
					});
				}
			});
		}
	}

	window.addEventListener('scroll', function () {
		scrollMode();
	});

	//팝업 오늘하루안보기
	var cookiedata = document.cookie;

	if (cookiedata.indexOf("ncookie=done") < 0) {
		document.getElementById('support').style.display = "block";
	} else {
		document.getElementById('support').style.display = "none";
	}

	function setCookie(name, value, expiredays) {
		var todayDate = new Date();
		todayDate.setDate(todayDate.getDate() + expiredays);
		document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}

	function closeWin() {
		document.getElementById('support').style.display = "none";
	}

	function todaycloseWin() {
		setCookie("ncookie", "done", 1);
		document.getElementById('support').style.display = "none";
	}

	$('.notToday').click(function () {
		todaycloseWin();
	});

	$('.closeBtn').click(function () {
		closeWin();
	})

	//스크롤방지
	$("#support").bind("scroll touchmove mousewheel", function (e) {
		e.preventDefault();
	});
	$("#support .inner").bind("scroll touchmove mousewheel", function (e) {
		e.stopPropagation();
	});

});

setTimeout(function () {
	$('.phonak').css('opacity', 1);
}, 1000);
