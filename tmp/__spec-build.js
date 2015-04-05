(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var setup = require('./setup');
var config = require('../../config');

global[config.exportVarName] = require('../../tmp/__entry');
global.mocha.setup('bdd');
global.onload = function() {
  global.mocha.checkLeaks();
  global.mocha.globals(config.mochaGlobals);
  global.mocha.run();
  setup();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../config":2,"../../tmp/__entry":4,"./setup":3}],2:[function(require,module,exports){
module.exports={
  "destinationFolder": "dist",
  "exportFileName": "react-in-style",
  "entryFileName": "react-in-style",
  "exportVarName": "ReactInStyle",
  "mochaGlobals": ["stub", "spy", "expect"]
}

},{}],3:[function(require,module,exports){
(function (global){
module.exports = function() {
  global.expect = global.chai.expect;
  beforeEach(function() {
    this.sandbox = global.sinon.sandbox.create();
    global.stub = this.sandbox.stub.bind(this.sandbox);
    global.spy  = this.sandbox.spy.bind(this.sandbox);
  });

  afterEach(function() {
    delete global.stub;
    delete global.spy;
    this.sandbox.restore();
  });
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/* global console */

var ReactInStyle = (function () {
    function ReactInStyle(options) {
        _classCallCheck(this, ReactInStyle);

        this.options = options;
        this.options.document = options.document || document;
        this.init();
    }

    _createClass(ReactInStyle, {
        init: {
            value: function init() {
                this.unApliedStyles = {};
                this.appliedStyles = {};
                this.initStyleTag();
            }
        },
        destroy: {
            value: function destroy() {
                if (this.styleTag.parentNode) {
                    this.styleTag.parentNode.removeChild(this.styleTag);
                }
                this.init();
            }
        },
        initStyleTag: {
            value: function initStyleTag() {
                var _this = this;

                this.styleTag = document.createElement("style");
                this.styleTag.id = "react-in-style";
                requestAnimationFrame(function () {
                    document.getElementsByTagName("head")[0].appendChild(_this.styleTag);
                });
            }
        },
        add: {
            value: function add(reactClass, selector) {
                var force = arguments[2] === undefined ? false : arguments[2];

                if (this.appliedStyles[selector] && !force) {
                    throw new Error("selector " + selector + " already has styles applied");
                }
                this.unApliedStyles[selector] = reactClass.prototype.style;
                // find a way to do this without being in an animationFrame
                if (typeof Mocha === "undefined") {
                    this.applyStyles();
                } else {
                    this.renderStyles();
                }
            }
        },
        applyStyles: {
            value: function applyStyles() {
                requestAnimationFrame(this.renderStyles.bind(this));
            }
        },
        renderStyles: {
            value: function renderStyles() {
                var _this = this;

                Object.keys(this.unApliedStyles).forEach(function (selector) {
                    var style = _this.unApliedStyles[selector];
                    delete _this.unApliedStyles[selector];
                    _this.appliedStyles[selector] = style;
                    var styleString = _this.objToCss(style, selector);
                    _this.styleTag.innerHTML += styleString;
                    console.log("computed style ---------------\n", styleString);
                });
            }
        },
        objToCss: {
            value: function objToCss(style) {
                var _this = this;

                var rootSelector = arguments[1] === undefined ? "" : arguments[1];
                var styles = arguments[2] === undefined ? [] : arguments[2];

                var rootStyle = "";
                console.log("generating style for ", style, rootSelector);
                Object.keys(style).forEach(function (key) {
                    if (typeof style[key] !== "object") {
                        rootStyle += key + ":" + style[key] + "; ";
                    } else {
                        var spacer = " ";
                        if (key[0] === ":") {
                            spacer = "";
                        }
                        console.log(style[key], spacer);
                        var newKey = rootSelector + spacer + key;
                        _this.objToCss(style[key], newKey, styles);
                    }
                });
                styles.unshift(rootSelector.trim() + "{" + rootStyle.trim() + "}");
                console.log(rootSelector, styles);
                console.groupEnd();
                return styles.join("\n");
            }
        }
    });

    return ReactInStyle;
})();

module.exports = new ReactInStyle();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0L3NldHVwL2Jyb3dzZXJpZnkuanMiLCJjb25maWcvaW5kZXguanNvbiIsInRlc3Qvc2V0dXAvc2V0dXAuanMiLCJ0bXAvX19lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBzZXR1cCA9IHJlcXVpcmUoJy4vc2V0dXAnKTtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi8uLi9jb25maWcnKTtcblxuZ2xvYmFsW2NvbmZpZy5leHBvcnRWYXJOYW1lXSA9IHJlcXVpcmUoJy4uLy4uL3RtcC9fX2VudHJ5Jyk7XG5nbG9iYWwubW9jaGEuc2V0dXAoJ2JkZCcpO1xuZ2xvYmFsLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICBnbG9iYWwubW9jaGEuY2hlY2tMZWFrcygpO1xuICBnbG9iYWwubW9jaGEuZ2xvYmFscyhjb25maWcubW9jaGFHbG9iYWxzKTtcbiAgZ2xvYmFsLm1vY2hhLnJ1bigpO1xuICBzZXR1cCgpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJkZXN0aW5hdGlvbkZvbGRlclwiOiBcImRpc3RcIixcbiAgXCJleHBvcnRGaWxlTmFtZVwiOiBcInJlYWN0LWluLXN0eWxlXCIsXG4gIFwiZW50cnlGaWxlTmFtZVwiOiBcInJlYWN0LWluLXN0eWxlXCIsXG4gIFwiZXhwb3J0VmFyTmFtZVwiOiBcIlJlYWN0SW5TdHlsZVwiLFxuICBcIm1vY2hhR2xvYmFsc1wiOiBbXCJzdHViXCIsIFwic3B5XCIsIFwiZXhwZWN0XCJdXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICBnbG9iYWwuZXhwZWN0ID0gZ2xvYmFsLmNoYWkuZXhwZWN0O1xuICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2FuZGJveCA9IGdsb2JhbC5zaW5vbi5zYW5kYm94LmNyZWF0ZSgpO1xuICAgIGdsb2JhbC5zdHViID0gdGhpcy5zYW5kYm94LnN0dWIuYmluZCh0aGlzLnNhbmRib3gpO1xuICAgIGdsb2JhbC5zcHkgID0gdGhpcy5zYW5kYm94LnNweS5iaW5kKHRoaXMuc2FuZGJveCk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICBkZWxldGUgZ2xvYmFsLnN0dWI7XG4gICAgZGVsZXRlIGdsb2JhbC5zcHk7XG4gICAgdGhpcy5zYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHsgdmFyIHByb3AgPSBwcm9wc1trZXldOyBwcm9wLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChwcm9wLnZhbHVlKSBwcm9wLndyaXRhYmxlID0gdHJ1ZTsgfSBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKTsgfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH07XG5cbi8qIGdsb2JhbCBjb25zb2xlICovXG5cbnZhciBSZWFjdEluU3R5bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlYWN0SW5TdHlsZShvcHRpb25zKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWFjdEluU3R5bGUpO1xuXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMub3B0aW9ucy5kb2N1bWVudCA9IG9wdGlvbnMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhSZWFjdEluU3R5bGUsIHtcbiAgICAgICAgaW5pdDoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bkFwbGllZFN0eWxlcyA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbGllZFN0eWxlcyA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFN0eWxlVGFnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0eWxlVGFnLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZVRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc3R5bGVUYWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW5pdFN0eWxlVGFnOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdFN0eWxlVGFnKCkge1xuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVUYWcuaWQgPSBcInJlYWN0LWluLXN0eWxlXCI7XG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKF90aGlzLnN0eWxlVGFnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWRkOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYWRkKHJlYWN0Q2xhc3MsIHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcmNlID0gYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwcGxpZWRTdHlsZXNbc2VsZWN0b3JdICYmICFmb3JjZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzZWxlY3RvciBcIiArIHNlbGVjdG9yICsgXCIgYWxyZWFkeSBoYXMgc3R5bGVzIGFwcGxpZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudW5BcGxpZWRTdHlsZXNbc2VsZWN0b3JdID0gcmVhY3RDbGFzcy5wcm90b3R5cGUuc3R5bGU7XG4gICAgICAgICAgICAgICAgLy8gZmluZCBhIHdheSB0byBkbyB0aGlzIHdpdGhvdXQgYmVpbmcgaW4gYW4gYW5pbWF0aW9uRnJhbWVcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1vY2hhID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclN0eWxlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYXBwbHlTdHlsZXM6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhcHBseVN0eWxlcygpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZW5kZXJTdHlsZXMuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlclN0eWxlczoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclN0eWxlcygpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy51bkFwbGllZFN0eWxlcykuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gX3RoaXMudW5BcGxpZWRTdHlsZXNbc2VsZWN0b3JdO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX3RoaXMudW5BcGxpZWRTdHlsZXNbc2VsZWN0b3JdO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hcHBsaWVkU3R5bGVzW3NlbGVjdG9yXSA9IHN0eWxlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3R5bGVTdHJpbmcgPSBfdGhpcy5vYmpUb0NzcyhzdHlsZSwgc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdHlsZVRhZy5pbm5lckhUTUwgKz0gc3R5bGVTdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tcHV0ZWQgc3R5bGUgLS0tLS0tLS0tLS0tLS0tXFxuXCIsIHN0eWxlU3RyaW5nKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb2JqVG9Dc3M6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvYmpUb0NzcyhzdHlsZSkge1xuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB2YXIgcm9vdFNlbGVjdG9yID0gYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBcIlwiIDogYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgICAgIHZhciBzdHlsZXMgPSBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IFtdIDogYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJvb3RTdHlsZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZW5lcmF0aW5nIHN0eWxlIGZvciBcIiwgc3R5bGUsIHJvb3RTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0eWxlW2tleV0gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RTdHlsZSArPSBrZXkgKyBcIjpcIiArIHN0eWxlW2tleV0gKyBcIjsgXCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BhY2VyID0gXCIgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5WzBdID09PSBcIjpcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlciA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdHlsZVtrZXldLCBzcGFjZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0tleSA9IHJvb3RTZWxlY3RvciArIHNwYWNlciArIGtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLm9ialRvQ3NzKHN0eWxlW2tleV0sIG5ld0tleSwgc3R5bGVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0eWxlcy51bnNoaWZ0KHJvb3RTZWxlY3Rvci50cmltKCkgKyBcIntcIiArIHJvb3RTdHlsZS50cmltKCkgKyBcIn1cIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocm9vdFNlbGVjdG9yLCBzdHlsZXMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGVzLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBSZWFjdEluU3R5bGU7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBSZWFjdEluU3R5bGUoKTsiXX0=
