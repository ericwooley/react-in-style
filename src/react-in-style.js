/* global console */
class ReactInStyle {
    constructor(options){
        this.options = options;
        this.options.document = options.document || document;
        this.init();   
    }
    init(){
       this.unApliedStyles = {};
        this.appliedStyles = {};
        this.initStyleTag(); 
    }
    destroy(){
        if(this.styleTag.parentNode){
            this.styleTag.parentNode.removeChild(this.styleTag);
        }
        this.init();
    }
    initStyleTag(){
        this.styleTag = document.createElement('style');
        this.styleTag.id='react-in-style';
        requestAnimationFrame(() => {
            document.getElementsByTagName('head')[0].appendChild(this.styleTag);
        });
    }
    add(reactClass, selector, force = false){
        if(this.appliedStyles[selector] && !force) {
            throw new Error('selector ' + selector + ' already has styles applied');
        }
        this.unApliedStyles[selector] = reactClass.prototype.style;
        // find a way to do this without being in an animationFrame
        if(typeof Mocha === 'undefined'){ 
            this.applyStyles();
        } else {
            this.renderStyles();
        }
    }

    applyStyles(){
        requestAnimationFrame(this.renderStyles.bind(this));
    }
    renderStyles(){
        Object.keys(this.unApliedStyles).forEach((selector) => {
            var style = this.unApliedStyles[selector];
            delete this.unApliedStyles[selector];
            this.appliedStyles[selector] = style;
            var styleString = this.objToCss(style, selector);
            this.styleTag.innerHTML += styleString;
            console.log('computed style ---------------\n', styleString);
        });
    }
    objToCss(style, rootSelector='', styles = []) {
        var rootStyle = '';
        console.log('generating style for ', style, rootSelector);
        Object.keys(style).forEach((key) => {
            if(typeof style[key] !== 'object'){
                rootStyle += key + ':' + style[key]+'; '; 
            } else {
               let spacer = ' ';
               if(key[0] === ':'){
                   spacer = '';
               }
               console.log(style[key], spacer);
               var newKey = rootSelector + spacer + key;
               this.objToCss(style[key], newKey, styles);    
            }
        });
        styles.unshift(rootSelector.trim() + '{' + rootStyle.trim() + '}');
        console.log(rootSelector, styles);
        console.groupEnd();
        return styles.join('\n');
    }
}

export default new ReactInStyle();