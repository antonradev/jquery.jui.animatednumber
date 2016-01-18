/*
 * jquery.jui.modals v0.1
 * Animates DOM element with numbered value from zero to itself
 * https://github.com/antonradev/jquery.jui.animatednumber
 *
 * Usage:
 *
 *$(".selector-with-number").juianimatednumber(options);
 *
 * https://github.com/antonradev/jquery.jui.animatednumber
 * http://jui.uxpd.net/jqueryjuianimatednumber.html
 *
 * Copyright (c) 2016 Anton Radev anton.radev@gmail.com http://www.antonradev.com
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */


(function ($) {

    $.fn.juianimatednumber = function (options) {


        var defaults = {
            duration: 1500
        };

        var settings = $.extend({}, defaults, options);


        function clearNumber(num) {

            if (typeof num !== 'undefined') {

                if (/^\d+$/.test(num)) {
                    return num;
                }
                else {
                    num = num.toString();
                    num = num.replace(/\D/g, '');
                    return num;
                }

            }

        }

        function startAnimation(elem, duration) {

            var number = elem.text();

            elem.animate({counter: clearNumber(number)}, {
                duration: duration,
                step: function () {
                    elem.text(clearNumber(Math.ceil(this.counter)));
                }
            }).delay(duration, function () {
                elem.text(number);
            });

        }

        function isElementInViewport(el) {

            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }

            var rect = el.getBoundingClientRect();

            return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                    );
        }


        return $(this).each(function () {

            var _this = $(this);

            if (isElementInViewport(_this)) {
                startAnimation(_this, settings.duration);
            }

            $(window).on('scroll', function () {
                if (isElementInViewport(_this)) {
                    startAnimation(_this, settings.duration);
                }
            });

        });

    };

}(jQuery));