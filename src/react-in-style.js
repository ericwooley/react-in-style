/* global console */
import autoprefixer from 'autoprefixer-core';
let defaultAddOptions = {
    noWarnings: false,
    prefix:false,
    requestAnimationFrame: true
};
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
    add(reactClass, selector, options = defaultAddOptions) {
        if (this.appliedStyles[selector] && !options.force) {
            this.log(() => 
                console.error(
                    'selector ' +
                    selector + 
                    ' already has styles applied'));
        }
        this.unApliedStyles[selector] = reactClass.prototype.style;
        // find a way to do this without being in an animationFrame
        if(options.requestAnimationFrame) {
            this.applyStyles(options);
        } else {
            this.renderStyles(options);
        }
            
    }

    applyStyles(options) {
        this.requestAnimationFrame(() => this.renderStyles(options));
    }
    renderStyles(options) {
        Object.keys(this.unApliedStyles).forEach((selector) => {
            var style = this.unApliedStyles[selector];
            delete this.unApliedStyles[selector];
            this.appliedStyles[selector] = style;
            var styleString = this.objToCss(style, selector);
            if(options.prefix){
                styleString = autoprefixer.process(styleString).css;
            }
            this.styleTag.innerHTML += styleString + '\n';
        });
    }
    log(f) {
        try{
            if (console) {
                f();
            }    
        } catch(e){
            // whelp, we tried;
        }
    }
    objToCss(style, rootSelector = '', styles = []) {
        var rootStyle = '';
        Object.keys(style).forEach((key) => {
            let spacer = ' ',
            firstLetter = key[0], 
            selector = key;

            if (firstLetter === '&') {
                spacer = '';
                selector = key.substring(1);
            } 
            selector = selector.replace(/&/g, rootSelector);
            if (typeof style[key] !== 'object') {
                rootStyle += key + ':' + style[key] + '; ';
            } else {
                if (firstLetter === ':') {
                    spacer = '';
                }
                var newKey = rootSelector + spacer + selector;
                this.objToCss(style[key], newKey, styles);
            }
        });
        styles.unshift(rootSelector.trim() + '{' + rootStyle.trim() + '}');
        return styles.join('\n');
    }
}
export default new ReactInStyle();