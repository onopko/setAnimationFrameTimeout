;(function ($, window, undefined) {
	"use strict";

	$.setAnimationFrameTimeout = function (_callback, _delay) {
		var performanceNow = window.performance && (
			window.performance.now       ||
			window.performance.webkitNow ||
			window.performance.mozNow    ||
			window.performance.msNow     ||
			window.performance.oNow
		);

		var getTime = function() {
			return (performanceNow && performanceNow.call(window.performance)) || (new Date().getTime());
		};

		var raf = (function() {
			return  window.requestAnimationFrame       ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||
					function (callback) {
						window.setTimeout(callback, 1000 / 60);
					};
		})();

		var elapsed = 0;
		var time    = getTime();
		var timer   = {};

		var update = function() {
			var now = getTime();
			elapsed += (now - time);
			time = now;

			if (elapsed >= _delay) {
				var n = Math.floor(elapsed / _delay);
				elapsed -= n * _delay;

				_callback();
			}
			else {
				timer.value = raf(update);
			}

			now = void 0;
		};

		timer.value = raf(update);

		return timer;
	};

	$.clearAnimationFrameTimeout = function (_timer) {
		if (window.cancelAnimationFrame) { if (typeof _timer === "object") { window.cancelAnimationFrame(_timer.value); } }
		else if (window.webkitCancelAnimationFrame) { if (typeof _timer === "object") { window.webkitCancelAnimationFrame(_timer.value); } }
		else if (window.webkitCancelRequestAnimationFrame) { if (typeof _timer === "object") { window.webkitCancelRequestAnimationFrame(_timer.value); } }
		else if (window.mozCancelRequestAnimationFrame) { if (typeof _timer === "object") { window.mozCancelRequestAnimationFrame(_timer.value); } }
		else if (window.oCancelRequestAnimationFrame) { if (typeof _timer === "object") { window.oCancelRequestAnimationFrame(_timer.value); } }
		else if (window.msCancelRequestAnimationFrame) { if (typeof _timer === "object") { window.msCancelRequestAnimationFrame(_timer.value); } }
		else { clearTimeout(_timer); }
	};

})(jQuery, window);
