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
                    _this.styleTag.innerHTML += styleString;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0L3NldHVwL2Jyb3dzZXJpZnkuanMiLCJjb25maWcvaW5kZXguanNvbiIsInRlc3Qvc2V0dXAvc2V0dXAuanMiLCJ0bXAvX19lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHNldHVwID0gcmVxdWlyZSgnLi9zZXR1cCcpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZycpO1xuXG5nbG9iYWxbY29uZmlnLmV4cG9ydFZhck5hbWVdID0gcmVxdWlyZSgnLi4vLi4vdG1wL19fZW50cnknKTtcbmdsb2JhbC5tb2NoYS5zZXR1cCgnYmRkJyk7XG5nbG9iYWwub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gIGdsb2JhbC5tb2NoYS5jaGVja0xlYWtzKCk7XG4gIGdsb2JhbC5tb2NoYS5nbG9iYWxzKGNvbmZpZy5tb2NoYUdsb2JhbHMpO1xuICBnbG9iYWwubW9jaGEucnVuKCk7XG4gIHNldHVwKCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImRlc3RpbmF0aW9uRm9sZGVyXCI6IFwiZGlzdFwiLFxuICBcImV4cG9ydEZpbGVOYW1lXCI6IFwicmVhY3QtaW4tc3R5bGVcIixcbiAgXCJlbnRyeUZpbGVOYW1lXCI6IFwicmVhY3QtaW4tc3R5bGVcIixcbiAgXCJleHBvcnRWYXJOYW1lXCI6IFwiUmVhY3RJblN0eWxlXCIsXG4gIFwibW9jaGFHbG9iYWxzXCI6IFtcInN0dWJcIiwgXCJzcHlcIiwgXCJleHBlY3RcIl1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIGdsb2JhbC5leHBlY3QgPSBnbG9iYWwuY2hhaS5leHBlY3Q7XG4gIGJlZm9yZUVhY2goZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zYW5kYm94ID0gZ2xvYmFsLnNpbm9uLnNhbmRib3guY3JlYXRlKCk7XG4gICAgZ2xvYmFsLnN0dWIgPSB0aGlzLnNhbmRib3guc3R1Yi5iaW5kKHRoaXMuc2FuZGJveCk7XG4gICAgZ2xvYmFsLnNweSAgPSB0aGlzLnNhbmRib3guc3B5LmJpbmQodGhpcy5zYW5kYm94KTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgIGRlbGV0ZSBnbG9iYWwuc3R1YjtcbiAgICBkZWxldGUgZ2xvYmFsLnNweTtcbiAgICB0aGlzLnNhbmRib3gucmVzdG9yZSgpO1xuICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGtleSBpbiBwcm9wcykgeyB2YXIgcHJvcCA9IHByb3BzW2tleV07IHByb3AuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKHByb3AudmFsdWUpIHByb3Aud3JpdGFibGUgPSB0cnVlOyB9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpOyB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfTtcblxuLyogZ2xvYmFsIGNvbnNvbGUgKi9cblxudmFyIFJlYWN0SW5TdHlsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVhY3RJblN0eWxlKG9wdGlvbnMpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlYWN0SW5TdHlsZSk7XG5cbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoaW5jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluYygpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuYyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhSZWFjdEluU3R5bGUsIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lOiB7XG4gICAgICAgICAgICB2YWx1ZTogKGZ1bmN0aW9uIChfcmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWVXcmFwcGVyID0gZnVuY3Rpb24gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF94KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIF9yZXF1ZXN0QW5pbWF0aW9uRnJhbWVXcmFwcGVyLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlcXVlc3RBbmltYXRpb25GcmFtZS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlcXVlc3RBbmltYXRpb25GcmFtZVdyYXBwZXI7XG4gICAgICAgICAgICB9KShmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgc2V0T3B0aW9uczoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRvY3VtZW50ID0gb3B0aW9ucy5kb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW5pdDoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bkFwbGllZFN0eWxlcyA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbGllZFN0eWxlcyA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFN0eWxlVGFnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0eWxlVGFnLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZVRhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc3R5bGVUYWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW5pdFN0eWxlVGFnOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdFN0eWxlVGFnKCkge1xuICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVUYWcuaWQgPSBcInJlYWN0LWluLXN0eWxlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoX3RoaXMuc3R5bGVUYWcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhZGQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhZGQocmVhY3RDbGFzcywgc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9yY2UgPSBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXBwbGllZFN0eWxlc1tzZWxlY3Rvcl0gJiYgIWZvcmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInNlbGVjdG9yIFwiICsgc2VsZWN0b3IgKyBcIiBhbHJlYWR5IGhhcyBzdHlsZXMgYXBwbGllZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy51bkFwbGllZFN0eWxlc1tzZWxlY3Rvcl0gPSByZWFjdENsYXNzLnByb3RvdHlwZS5zdHlsZTtcbiAgICAgICAgICAgICAgICAvLyBmaW5kIGEgd2F5IHRvIGRvIHRoaXMgd2l0aG91dCBiZWluZyBpbiBhbiBhbmltYXRpb25GcmFtZVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgTW9jaGEgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseVN0eWxlcygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU3R5bGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhcHBseVN0eWxlczoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFwcGx5U3R5bGVzKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyU3R5bGVzLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZW5kZXJTdHlsZXM6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJTdHlsZXMoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMudW5BcGxpZWRTdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IF90aGlzLnVuQXBsaWVkU3R5bGVzW3NlbGVjdG9yXTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF90aGlzLnVuQXBsaWVkU3R5bGVzW3NlbGVjdG9yXTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXBwbGllZFN0eWxlc1tzZWxlY3Rvcl0gPSBzdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlU3RyaW5nID0gX3RoaXMub2JqVG9Dc3Moc3R5bGUsIHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3R5bGVUYWcuaW5uZXJIVE1MICs9IHN0eWxlU3RyaW5nO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsb2c6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBsb2coZikge1xuICAgICAgICAgICAgICAgIGlmIChjb25zb2xlKSB7XG4gICAgICAgICAgICAgICAgICAgIGYoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9ialRvQ3NzOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb2JqVG9Dc3Moc3R5bGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJvb3RTZWxlY3RvciA9IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGVzID0gYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBbXSA6IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgICAgIHZhciByb290U3R5bGUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHlsZVtrZXldICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb290U3R5bGUgKz0ga2V5ICsgXCI6XCIgKyBzdHlsZVtrZXldICsgXCI7IFwiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwYWNlciA9IFwiIFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVswXSA9PT0gXCI6XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFjZXIgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3S2V5ID0gcm9vdFNlbGVjdG9yICsgc3BhY2VyICsga2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMub2JqVG9Dc3Moc3R5bGVba2V5XSwgbmV3S2V5LCBzdHlsZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3R5bGVzLnVuc2hpZnQocm9vdFNlbGVjdG9yLnRyaW0oKSArIFwie1wiICsgcm9vdFN0eWxlLnRyaW0oKSArIFwifVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3R5bGVzLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBSZWFjdEluU3R5bGU7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBSZWFjdEluU3R5bGUoKTsiXX0=
