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

        this.setOptions(options);
        if (typeof requestAnimationFrame === "undefined") {
            this.requestAnimationFrame = function (inc) {
                return inc();
            };
        } else {
            this.requestAnimationFrame = function (func) {
                requestAnimationFrame(func);
            };
        }
        this.init();
    }

    _createClass(ReactInStyle, {
        requestAnimationFrame: {
            value: (function (_requestAnimationFrame) {
                var _requestAnimationFrameWrapper = function requestAnimationFrame(_x) {
                    return _requestAnimationFrame.apply(this, arguments);
                };

                _requestAnimationFrameWrapper.toString = function () {
                    return _requestAnimationFrame.toString();
                };

                return _requestAnimationFrameWrapper;
            })(function (func) {
                if (typeof requestAnimationFrame === "undefined") {
                    func();
                } else {
                    requestAnimationFrame(func);
                }
            })
        },
        setOptions: {
            value: function setOptions(options) {
                options = options || {};
                this.options = options;
                this.options.document = options.document || document;
            }
        },
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
                this.requestAnimationFrame(function () {
                    document.getElementsByTagName("head")[0].appendChild(_this.styleTag);
                });
            }
        },
        add: {
            value: function add(reactClass, selector) {
                var force = arguments[2] === undefined ? false : arguments[2];

                if (this.appliedStyles[selector] && !force) {
                    this.log(function () {
                        return console.error("selector " + selector + " already has styles applied");
                    });
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
                this.requestAnimationFrame(this.renderStyles.bind(this));
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
                    _this.styleTag.innerHTML += styleString + "\n";
                });
            }
        },
        log: {
            value: function log(f) {
                if (console) {
                    f();
                }
            }
        },
        objToCss: {
            value: function objToCss(style) {
                var _this = this;

                var rootSelector = arguments[1] === undefined ? "" : arguments[1];
                var styles = arguments[2] === undefined ? [] : arguments[2];

                var rootStyle = "";
                Object.keys(style).forEach(function (key) {
                    if (typeof style[key] !== "object") {
                        rootStyle += key + ":" + style[key] + "; ";
                    } else {
                        var spacer = " ";
                        if (key[0] === ":") {
                            spacer = "";
                        }

                        var newKey = rootSelector + spacer + key;
                        _this.objToCss(style[key], newKey, styles);
                    }
                });
                styles.unshift(rootSelector.trim() + "{" + rootStyle.trim() + "}");
                return styles.join("\n");
            }
        }
    });

    return ReactInStyle;
})();

module.exports = new ReactInStyle();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0L3NldHVwL2Jyb3dzZXJpZnkuanMiLCJjb25maWcvaW5kZXguanNvbiIsInRlc3Qvc2V0dXAvc2V0dXAuanMiLCJ0bXAvX19lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBzZXR1cCA9IHJlcXVpcmUoJy4vc2V0dXAnKTtcbnZhciBjb25maWcgPSByZXF1aXJlKCcuLi8uLi9jb25maWcnKTtcblxuZ2xvYmFsW2NvbmZpZy5leHBvcnRWYXJOYW1lXSA9IHJlcXVpcmUoJy4uLy4uL3RtcC9fX2VudHJ5Jyk7XG5nbG9iYWwubW9jaGEuc2V0dXAoJ2JkZCcpO1xuZ2xvYmFsLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICBnbG9iYWwubW9jaGEuY2hlY2tMZWFrcygpO1xuICBnbG9iYWwubW9jaGEuZ2xvYmFscyhjb25maWcubW9jaGFHbG9iYWxzKTtcbiAgZ2xvYmFsLm1vY2hhLnJ1bigpO1xuICBzZXR1cCgpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJkZXN0aW5hdGlvbkZvbGRlclwiOiBcImRpc3RcIixcbiAgXCJleHBvcnRGaWxlTmFtZVwiOiBcInJlYWN0LWluLXN0eWxlXCIsXG4gIFwiZW50cnlGaWxlTmFtZVwiOiBcInJlYWN0LWluLXN0eWxlXCIsXG4gIFwiZXhwb3J0VmFyTmFtZVwiOiBcIlJlYWN0SW5TdHlsZVwiLFxuICBcIm1vY2hhR2xvYmFsc1wiOiBbXCJzdHViXCIsIFwic3B5XCIsIFwiZXhwZWN0XCJdXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICBnbG9iYWwuZXhwZWN0ID0gZ2xvYmFsLmNoYWkuZXhwZWN0O1xuICBiZWZvcmVFYWNoKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2FuZGJveCA9IGdsb2JhbC5zaW5vbi5zYW5kYm94LmNyZWF0ZSgpO1xuICAgIGdsb2JhbC5zdHViID0gdGhpcy5zYW5kYm94LnN0dWIuYmluZCh0aGlzLnNhbmRib3gpO1xuICAgIGdsb2JhbC5zcHkgID0gdGhpcy5zYW5kYm94LnNweS5iaW5kKHRoaXMuc2FuZGJveCk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaChmdW5jdGlvbigpIHtcbiAgICBkZWxldGUgZ2xvYmFsLnN0dWI7XG4gICAgZGVsZXRlIGdsb2JhbC5zcHk7XG4gICAgdGhpcy5zYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHsgdmFyIHByb3AgPSBwcm9wc1trZXldOyBwcm9wLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChwcm9wLnZhbHVlKSBwcm9wLndyaXRhYmxlID0gdHJ1ZTsgfSBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKTsgfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH07XG5cbi8qIGdsb2JhbCBjb25zb2xlICovXG5cbnZhciBSZWFjdEluU3R5bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlYWN0SW5TdHlsZShvcHRpb25zKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWFjdEluU3R5bGUpO1xuXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGluYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmMoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoUmVhY3RJblN0eWxlLCB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZToge1xuICAgICAgICAgICAgdmFsdWU6IChmdW5jdGlvbiAoX3JlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lV3JhcHBlciA9IGZ1bmN0aW9uIHJlcXVlc3RBbmltYXRpb25GcmFtZShfeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlcXVlc3RBbmltYXRpb25GcmFtZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lV3JhcHBlci50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWVXcmFwcGVyO1xuICAgICAgICAgICAgfSkoZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICBmdW5jKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHNldE9wdGlvbnM6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kb2N1bWVudCA9IG9wdGlvbnMuZG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluaXQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5BcGxpZWRTdHlsZXMgPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGxpZWRTdHlsZXMgPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRTdHlsZVRhZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZXN0cm95OiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdHlsZVRhZy5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnN0eWxlVGFnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluaXRTdHlsZVRhZzoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluaXRTdHlsZVRhZygpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlVGFnLmlkID0gXCJyZWFjdC1pbi1zdHlsZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKF90aGlzLnN0eWxlVGFnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWRkOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYWRkKHJlYWN0Q2xhc3MsIHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcmNlID0gYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwcGxpZWRTdHlsZXNbc2VsZWN0b3JdICYmICFmb3JjZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihcInNlbGVjdG9yIFwiICsgc2VsZWN0b3IgKyBcIiBhbHJlYWR5IGhhcyBzdHlsZXMgYXBwbGllZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudW5BcGxpZWRTdHlsZXNbc2VsZWN0b3JdID0gcmVhY3RDbGFzcy5wcm90b3R5cGUuc3R5bGU7XG4gICAgICAgICAgICAgICAgLy8gZmluZCBhIHdheSB0byBkbyB0aGlzIHdpdGhvdXQgYmVpbmcgaW4gYW4gYW5pbWF0aW9uRnJhbWVcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1vY2hhID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlTdHlsZXMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclN0eWxlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYXBwbHlTdHlsZXM6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhcHBseVN0eWxlcygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlbmRlclN0eWxlcy5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyU3R5bGVzOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyU3R5bGVzKCkge1xuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnVuQXBsaWVkU3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSBfdGhpcy51bkFwbGllZFN0eWxlc1tzZWxlY3Rvcl07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy51bkFwbGllZFN0eWxlc1tzZWxlY3Rvcl07XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFwcGxpZWRTdHlsZXNbc2VsZWN0b3JdID0gc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZVN0cmluZyA9IF90aGlzLm9ialRvQ3NzKHN0eWxlLCBzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnN0eWxlVGFnLmlubmVySFRNTCArPSBzdHlsZVN0cmluZyArIFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGxvZzoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxvZyhmKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnNvbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb2JqVG9Dc3M6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvYmpUb0NzcyhzdHlsZSkge1xuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB2YXIgcm9vdFNlbGVjdG9yID0gYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBcIlwiIDogYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgICAgIHZhciBzdHlsZXMgPSBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IFtdIDogYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJvb3RTdHlsZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoc3R5bGUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0eWxlW2tleV0gIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RTdHlsZSArPSBrZXkgKyBcIjpcIiArIHN0eWxlW2tleV0gKyBcIjsgXCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3BhY2VyID0gXCIgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5WzBdID09PSBcIjpcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlciA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdLZXkgPSByb290U2VsZWN0b3IgKyBzcGFjZXIgKyBrZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vYmpUb0NzcyhzdHlsZVtrZXldLCBuZXdLZXksIHN0eWxlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzdHlsZXMudW5zaGlmdChyb290U2VsZWN0b3IudHJpbSgpICsgXCJ7XCIgKyByb290U3R5bGUudHJpbSgpICsgXCJ9XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHlsZXMuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFJlYWN0SW5TdHlsZTtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFJlYWN0SW5TdHlsZSgpOyJdfQ==
