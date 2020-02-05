// JavaScript Document

        $(window).scroll(function () {

          "use strict";
			$('#t1')
				.each(function () {
                var imagePos = $(this).offset().top;

                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow + 600) {
                    $(this).addClass("expandOpen");
                }
            });

        });
