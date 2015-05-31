var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('autoprefixer-core')) : typeof define === 'function' && define.amd ? define(['autoprefixer-core'], factory) : global.ReactInStyle = factory(global.autoprefixer);
})(this, function (autoprefixer) {
    'use strict';

    var react_in_style__defaultAddOptions = {
        noWarnings: false,
        prefix: false
    };
    function toKebab(str) {
        str = str.replace(/([A-Z])/g, '-$1').toLowerCase();
        return str;
    }

    var ReactInStyle = (function () {
        function ReactInStyle(options) {
            _classCallCheck(this, ReactInStyle);

            this.setOptions(options);
            this.init();
        }

        _createClass(ReactInStyle, [{
            key: 'setOptions',
            value: function setOptions(options) {
                options = options || {};
                this.options = options;
            }
        }, {
            key: 'init',
            value: function init() {
                this.unApliedStyles = {};
                this.appliedStyles = {};
                this.initStyleTag();
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                if (this.styleTag.parentNode) {
                    this.styleTag.parentNode.removeChild(this.styleTag);
                }
                this.init();
            }
        }, {
            key: 'initStyleTag',
            value: function initStyleTag() {
                this.styleTag = document.createElement('style');
                this.styleTag.id = 'react-in-style';
                document.getElementsByTagName('head')[0].appendChild(this.styleTag);
            }
        }, {
            key: 'add',
            value: function add(input, selector) {
                var options = arguments[2] === undefined ? react_in_style__defaultAddOptions : arguments[2];

                var style = input.prototype && input.prototype.style ? input.prototype.style : input;
                this.unApliedStyles[selector] = style;
                this.renderStyles(options);
            }
        }, {
            key: 'applyMediaQuery',
            value: function applyMediaQuery(queries, style) {
                if (!queries || !queries.length) {
                    return style;
                }
                return '@media (' + queries.join(') and (') + ') {' + style + '}';
            }
        }, {
            key: 'renderStyles',
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
                    styleString = _this.applyMediaQuery(options.queries, styleString);
                    _this.styleTag.innerHTML += styleString.trim() + '\n';
                });
            }
        }, {
            key: 'objToCss',
            value: function objToCss(style) {
                var _this2 = this;

                var rootSelector = arguments[1] === undefined ? '' : arguments[1];
                var styles = arguments[2] === undefined ? [] : arguments[2];

                var rootStyle = '';
                Object.keys(style).forEach(function (key) {
                    var spacer = ' ',
                        firstLetter = key[0],
                        selector = key;

                    if (firstLetter === '&') {
                        spacer = '';
                        selector = key.substring(1);
                    }
                    selector = selector.replace(/&/g, rootSelector);
                    if (typeof style[key] !== 'object') {
                        rootStyle += toKebab(key) + ':' + style[key] + '; ';
                    } else {
                        if (firstLetter === ':') {
                            spacer = '';
                        }
                        var newKey = rootSelector + spacer + selector;
                        _this2.objToCss(style[key], newKey, styles);
                    }
                });
                styles.unshift(rootSelector.trim() + '{' + rootStyle.trim() + '}');
                return styles.join('\n');
            }
        }]);

        return ReactInStyle;
    })();

    var react_in_style = new ReactInStyle();

    return react_in_style;
});
//# sourceMappingURL=./react-in-style.js.map