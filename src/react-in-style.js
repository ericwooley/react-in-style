/* global console */
class ReactInStyle {
    constructor(options) {
        this.setOptions(options);
        this.init();
    }
    requestAnimationFrame(func) {
        if (typeof requestAnimationFrame === 'undefined') {
            func();
        } else {
            requestAnimationFrame(func);
        }
    }
    setOptions(options) {
        options = options || {};
        this.options = options;
        this.inBrowser = typeof document !== 'undefined';
    }
    init() {
        this.unApliedStyles = {};
        this.appliedStyles = {};
        this.initStyleTag();
    }
    destroy() {
        if (this.styleTag.parentNode) {
            this.styleTag.parentNode.removeChild(this.styleTag);
        }
        this.init();
    }
    initStyleTag() {
        if (this.inBrowser) {
            this.styleTag = document.createElement('style');
        } else {
            // for unit tests
            this.styleTag = {
                innerHTML: ''
            };
        }
        this.styleTag.id = 'react-in-style';
        this.requestAnimationFrame(() => {
            if (this.inBrowser) {
                document.getElementsByTagName('head')[0].appendChild(this.styleTag);
            }
        });
    }
    add(reactClass, selector, force = false) {
        if (this.appliedStyles[selector] && !force) {
            this.log(() => console.error('selector ' + selector + ' already has styles applied'));
        }
        this.unApliedStyles[selector] = reactClass.prototype.style;
        // find a way to do this without being in an animationFrame
        if (typeof Mocha === 'undefined') {
            this.applyStyles();
        } else {
            this.renderStyles();
        }
    }

    applyStyles() {
        this.requestAnimationFrame(this.renderStyles.bind(this));
    }
    renderStyles() {
        Object.keys(this.unApliedStyles).forEach((selector) => {
            var style = this.unApliedStyles[selector];
            delete this.unApliedStyles[selector];
            this.appliedStyles[selector] = style;
            var styleString = this.objToCss(style, selector);
            this.styleTag.innerHTML += styleString + '\n';
        });
    }
    log(f) {
        if (console) {
            f();
        }
    }
    objToCss(style, rootSelector = '', styles = []) {
        var rootStyle = '';
        Object.keys(style).forEach((key) => {
            if (typeof style[key] !== 'object') {
                rootStyle += key + ':' + style[key] + '; ';
            } else {
                let spacer = ' ';
                var firstLetter = key[0];
                if (firstLetter === ':') {
                    spacer = '';
                } else if (firstLetter === '&') {
                    spacer = '';
                    key = key.splice(0, 1);
                }

                var newKey = rootSelector + spacer + key;
                this.objToCss(style[key], newKey, styles);
            }
        });
        styles.unshift(rootSelector.trim() + '{' + rootStyle.trim() + '}');
        return styles.join('\n');
    }
}

export
default new ReactInStyle();