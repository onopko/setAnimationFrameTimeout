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

		var requestAnimationFrame = (function () {
			return window.requestAnimationFrame       ||
				   window.webkitRequestAnimationFrame ||
				   window.mozRequestAnimationFrame    ||
				   window.msRequestAnimationFrame     ||
				   window.oRequestAnimationFrame      ||
				   function (_callback) {
					   window.setTimeout(_callback, 1000 / 60);
				   };
		})();

		var cancelAnimationFrame = (function() {
			return window.cancelRequestAnimationFrame  ||
				window.webkitCancelAnimationFrame        ||
				window.webkitCancelRequestAnimationFrame ||
				window.mozCancelRequestAnimationFrame    ||
				window.msCancelRequestAnimationFrame     ||
				window.oCancelRequestAnimationFrame      ||
				function (_id) {
					window.clearTimeout(_id);
				};
		})();

		var elapsed     = 0;
		var time        = getTime();
		var is_canceled = false;
		var timer;

		var clear = function () {
			cancelAnimationFrame(timer);

			elapsed = time = is_canceled = timer = update = clear = void 0;
		};

		var update = function() {
			var now = getTime();
			elapsed += (now - time);
			time = now;

			if (elapsed >= _delay) {
				var n = Math.floor(elapsed / _delay);
				elapsed -= n * _delay;

				_callback();
				clear();

				return false;
			}
			else {
				if (!is_canceled) {
					timer = requestAnimationFrame(update);
				}
				else {
					clear();
				}
			}

			now = void 0;
		};

		update();

		$.clearAnimationFrameTimeout = function () {
			is_canceled = true;
		};

		return this;
	};

})(jQuery, window);
