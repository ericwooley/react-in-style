var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("autoprefixer-core")) : typeof define === "function" && define.amd ? define(["autoprefixer-core"], factory) : global.ReactInStyle = factory(global.autoprefixer);
})(this, function (autoprefixer) {
    "use strict";

    /* global console */
    var react_in_style__defaultAddOptions = {
        noWarnings: false,
        prefix: false,
        requestAnimationFrame: true
    };
    function toKebab(str) {
        str = str.replace(/([A-Z])/g, "-$1").toLowerCase();
        return str;
    }

    var ReactInStyle = (function () {
        function ReactInStyle(options) {
            _classCallCheck(this, ReactInStyle);

            this.setOptions(options);
            this.init();
        }

        _createClass(ReactInStyle, {
            requestAnimationFrame: {
                value: (function (_requestAnimationFrame) {
                    var _requestAnimationFrameWrapper = function requestAnimationFrame(_x, _x2) {
                        return _requestAnimationFrame.apply(this, arguments);
                    };

                    _requestAnimationFrameWrapper.toString = function () {
                        return _requestAnimationFrame.toString();
                    };

                    return _requestAnimationFrameWrapper;
                })(function (func, doItNow) {
                    if (doItNow || typeof requestAnimationFrame === "undefined") {
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
                    var options = arguments[2] === undefined ? react_in_style__defaultAddOptions : arguments[2];

                    if (this.appliedStyles[selector] && !options.force) {
                        this.log(function () {
                            return console.error("selector " + selector + " already has styles applied");
                        });
                    }
                    this.unApliedStyles[selector] = reactClass.prototype.style;
                    this.renderStyles(options);
                }
            },
            renderStyles: {
                value: function renderStyles(options) {
                    var _this = this;

                    Object.keys(this.unApliedStyles).forEach(function (selector) {
                        var style = _this.unApliedStyles[selector];
                        delete _this.unApliedStyles[selector];
                        _this.appliedStyles[selector] = style;
                        var styleString = _this.objToCss(style, selector);
                        if (options.prefix) {
                            styleString = autoprefixer.process(styleString).css;
                        }
                        _this.requestAnimationFrame(function () {
                            return _this.styleTag.innerHTML += styleString + "\n";
                        }, !options.requestAnimationFrame);
                    });
                }
            },
            log: {
                value: function log(f) {
                    try {
                        if (console) {
                            f();
                        }
                    } catch (e) {}
                }
            },
            objToCss: {
                value: function objToCss(style) {
                    var _this = this;

                    var rootSelector = arguments[1] === undefined ? "" : arguments[1];
                    var styles = arguments[2] === undefined ? [] : arguments[2];

                    var rootStyle = "";
                    Object.keys(style).forEach(function (key) {
                        var spacer = " ",
                            firstLetter = key[0],
                            selector = key;

                        if (firstLetter === "&") {
                            spacer = "";
                            selector = key.substring(1);
                        }
                        selector = selector.replace(/&/g, rootSelector);
                        if (typeof style[key] !== "object") {
                            rootStyle += toKebab(key) + ":" + style[key] + "; ";
                        } else {
                            if (firstLetter === ":") {
                                spacer = "";
                            }
                            var newKey = rootSelector + spacer + selector;
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

    var react_in_style = new ReactInStyle();

    return react_in_style;
});
//# sourceMappingURL=./react-in-style.js.map

// whelp, we tried;