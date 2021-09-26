// source: https://github.com/darius/requestAnimationFrame/blob/master/requestAnimationFrame.js

// Adapted from https://gist.github.com/paulirish/1579671 which derived from
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon

// MIT license

import window from 'global/window';

const vendors = ['webkit', 'moz'];

let requestAnimationFrame;
let cancelAnimationFrame;

for (let i = 0; i < vendors.length; i += 1) {
    const vp = vendors[i];
    requestAnimationFrame = window.requestAnimationFrame;
    if (!requestAnimationFrame) requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
    if (!requestAnimationFrame) cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[ vp + 'CancelRequestAnimationFrame'];
}

// iOS6 is buggy
if (
    /iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) ||
    !window.requestAnimationFrame ||
    !window.cancelAnimationFrame
) {
    let lastTime = 0;

    requestAnimationFrame = function(callback) {
        let now = Date.now();
        let nextTime = Math.max(lastTime + 16, now);

        return setTimeout(function() {
            callback(lastTime = nextTime);
        }, nextTime - now);
    };

    cancelAnimationFrame = clearTimeout;
}

export {
  requestAnimationFrame,
  cancelAnimationFrame,
};
