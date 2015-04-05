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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0L3NldHVwL2Jyb3dzZXJpZnkuanMiLCJjb25maWcvaW5kZXguanNvbiIsInRlc3Qvc2V0dXAvc2V0dXAuanMiLCJ0bXAvX19lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgc2V0dXAgPSByZXF1aXJlKCcuL3NldHVwJyk7XG52YXIgY29uZmlnID0gcmVxdWlyZSgnLi4vLi4vY29uZmlnJyk7XG5cbmdsb2JhbFtjb25maWcuZXhwb3J0VmFyTmFtZV0gPSByZXF1aXJlKCcuLi8uLi90bXAvX19lbnRyeScpO1xuZ2xvYmFsLm1vY2hhLnNldHVwKCdiZGQnKTtcbmdsb2JhbC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgZ2xvYmFsLm1vY2hhLmNoZWNrTGVha3MoKTtcbiAgZ2xvYmFsLm1vY2hhLmdsb2JhbHMoY29uZmlnLm1vY2hhR2xvYmFscyk7XG4gIGdsb2JhbC5tb2NoYS5ydW4oKTtcbiAgc2V0dXAoKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiZGVzdGluYXRpb25Gb2xkZXJcIjogXCJkaXN0XCIsXG4gIFwiZXhwb3J0RmlsZU5hbWVcIjogXCJyZWFjdC1pbi1zdHlsZVwiLFxuICBcImVudHJ5RmlsZU5hbWVcIjogXCJyZWFjdC1pbi1zdHlsZVwiLFxuICBcImV4cG9ydFZhck5hbWVcIjogXCJSZWFjdEluU3R5bGVcIixcbiAgXCJtb2NoYUdsb2JhbHNcIjogW1wic3R1YlwiLCBcInNweVwiLCBcImV4cGVjdFwiXVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgZ2xvYmFsLmV4cGVjdCA9IGdsb2JhbC5jaGFpLmV4cGVjdDtcbiAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNhbmRib3ggPSBnbG9iYWwuc2lub24uc2FuZGJveC5jcmVhdGUoKTtcbiAgICBnbG9iYWwuc3R1YiA9IHRoaXMuc2FuZGJveC5zdHViLmJpbmQodGhpcy5zYW5kYm94KTtcbiAgICBnbG9iYWwuc3B5ICA9IHRoaXMuc2FuZGJveC5zcHkuYmluZCh0aGlzLnNhbmRib3gpO1xuICB9KTtcblxuICBhZnRlckVhY2goZnVuY3Rpb24oKSB7XG4gICAgZGVsZXRlIGdsb2JhbC5zdHViO1xuICAgIGRlbGV0ZSBnbG9iYWwuc3B5O1xuICAgIHRoaXMuc2FuZGJveC5yZXN0b3JlKCk7XG4gIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIga2V5IGluIHByb3BzKSB7IHZhciBwcm9wID0gcHJvcHNba2V5XTsgcHJvcC5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAocHJvcC52YWx1ZSkgcHJvcC53cml0YWJsZSA9IHRydWU7IH0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcyk7IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9O1xuXG4vKiBnbG9iYWwgY29uc29sZSAqL1xuXG52YXIgUmVhY3RJblN0eWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZWFjdEluU3R5bGUob3B0aW9ucykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVhY3RJblN0eWxlKTtcblxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoUmVhY3RJblN0eWxlLCB7XG4gICAgICAgIGluaXQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgICAgIHRoaXMudW5BcGxpZWRTdHlsZXMgPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGxpZWRTdHlsZXMgPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRTdHlsZVRhZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZXN0cm95OiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdHlsZVRhZy5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnN0eWxlVGFnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluaXRTdHlsZVRhZzoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluaXRTdHlsZVRhZygpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlVGFnLmlkID0gXCJyZWFjdC1pbi1zdHlsZVwiO1xuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChfdGhpcy5zdHlsZVRhZyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFkZDoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChyZWFjdENsYXNzLCBzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBmb3JjZSA9IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hcHBsaWVkU3R5bGVzW3NlbGVjdG9yXSAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2VsZWN0b3IgXCIgKyBzZWxlY3RvciArIFwiIGFscmVhZHkgaGFzIHN0eWxlcyBhcHBsaWVkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnVuQXBsaWVkU3R5bGVzW3NlbGVjdG9yXSA9IHJlYWN0Q2xhc3MucHJvdG90eXBlLnN0eWxlO1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgYSB3YXkgdG8gZG8gdGhpcyB3aXRob3V0IGJlaW5nIGluIGFuIGFuaW1hdGlvbkZyYW1lXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBNb2NoYSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTdHlsZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFwcGx5U3R5bGVzOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXBwbHlTdHlsZXMoKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyU3R5bGVzLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZW5kZXJTdHlsZXM6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJTdHlsZXMoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMudW5BcGxpZWRTdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IF90aGlzLnVuQXBsaWVkU3R5bGVzW3NlbGVjdG9yXTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF90aGlzLnVuQXBsaWVkU3R5bGVzW3NlbGVjdG9yXTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuYXBwbGllZFN0eWxlc1tzZWxlY3Rvcl0gPSBzdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlU3RyaW5nID0gX3RoaXMub2JqVG9Dc3Moc3R5bGUsIHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3R5bGVUYWcuaW5uZXJIVE1MICs9IHN0eWxlU3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXB1dGVkIHN0eWxlIC0tLS0tLS0tLS0tLS0tLVxcblwiLCBzdHlsZVN0cmluZyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9ialRvQ3NzOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb2JqVG9Dc3Moc3R5bGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJvb3RTZWxlY3RvciA9IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGVzID0gYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBbXSA6IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgICAgIHZhciByb290U3R5bGUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2VuZXJhdGluZyBzdHlsZSBmb3IgXCIsIHN0eWxlLCByb290U2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHlsZVtrZXldICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb290U3R5bGUgKz0ga2V5ICsgXCI6XCIgKyBzdHlsZVtrZXldICsgXCI7IFwiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwYWNlciA9IFwiIFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleVswXSA9PT0gXCI6XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFjZXIgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3R5bGVba2V5XSwgc3BhY2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdLZXkgPSByb290U2VsZWN0b3IgKyBzcGFjZXIgKyBrZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5vYmpUb0NzcyhzdHlsZVtrZXldLCBuZXdLZXksIHN0eWxlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzdHlsZXMudW5zaGlmdChyb290U2VsZWN0b3IudHJpbSgpICsgXCJ7XCIgKyByb290U3R5bGUudHJpbSgpICsgXCJ9XCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJvb3RTZWxlY3Rvciwgc3R5bGVzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0eWxlcy5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUmVhY3RJblN0eWxlO1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUmVhY3RJblN0eWxlKCk7Il19
