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
                this.inBrowser = typeof document !== "undefined";
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

                if (this.inBrowser) {
                    this.styleTag = document.createElement("style");
                } else {
                    // for unit tests
                    this.styleTag = {
                        innerHTML: ""
                    };
                }
                this.styleTag.id = "react-in-style";
                this.requestAnimationFrame(function () {
                    if (_this.inBrowser) {
                        document.getElementsByTagName("head")[0].appendChild(_this.styleTag);
                    }
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