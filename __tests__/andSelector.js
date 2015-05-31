/* globals require, jest, describe, it, beforeEach, afterEach */
// jest
//   .dontMock('../src/react-in-style.js')
//   .dontMock('autoprefixer-core')
//   .dontMock('react');
if(typeof jest !== 'undefined'){
    jest.autoMockOff();
    var expect = require('chai').expect;
    var React = require('react');
    var ReactInStyle = require('../src/react-in-style');
    document.body.innerHTML = '<div id="playground" style="display:none"></div>';
}

function render(item) {
    React.render(item.render(), document.getElementById('playground'));
}
function arrayToStyle(arr){
    return arr.join('\n')+'\n';
}
   
describe('& selector', function(){
    var Pic, stylizedString;
    beforeEach(function(){
        ReactInStyle.destroy();
        Pic = React.createClass({
           style: {
                height: '100px',
                width: '100px',
                display: 'block',
                'background-color': 'red',
                img: {
                    border: '50px solid black'
                }
           },
           render: function() {
               return (
                   React.createElement('SadMan', {className:'test'},
                       React.createElement('img', {
                           src: 'sadman.jpg',
                           className: 'test-image'
                       })
                   )
               );
            }
        });
        stylizedString = 'sadman{height:100px; width:100px; display:block; background-color:red;}';
    });
    it('should back reference', function(){
        Pic.prototype.style['&.test'] = {
            height: '300px',
            width: '300px'
        };
        ReactInStyle.add(Pic, 'sadman', {requestAnimationFrame: false});
        expect(ReactInStyle.styleTag.innerHTML)
            .to.equal(
                arrayToStyle([stylizedString,
                    'sadman.test{height:300px; width:300px;}',
                    'sadman img{border:50px solid black;}'])
            );
    });
    it('should recursively back reference', function(){
        Pic.prototype.style['&.test'] = {
            height: '300px',
            width: '300px'
        };
        Pic.prototype.style.img['&.test-image'] = {
            border: '5px solid blue'
        };
        ReactInStyle.add(Pic, 'sadman', {requestAnimationFrame: false});
        expect(ReactInStyle.styleTag.innerHTML)
            .to.equal(arrayToStyle([
                stylizedString,
                'sadman.test{height:300px; width:300px;}',
                'sadman img{border:50px solid black;}',
                'sadman img.test-image{border:5px solid blue;}'
            ]));
    });
    it('should work with multiple selectors and back reference', function(){
        Pic.prototype.style['img, &.test'] = {
            height: '300px',
            width: '300px',
            padding: '15px'
        };
        Pic.prototype.style.img['&.test-image'] = {
            padding: 0,
        };
        ReactInStyle.add(Pic, 'sadman', {requestAnimationFrame: false});
        expect(ReactInStyle.styleTag.innerHTML)
            .to.equal(arrayToStyle([
                stylizedString,
                'sadman img, sadman.test{height:300px; width:300px; padding:15px;}',
                'sadman img{border:50px solid black;}',
                'sadman img.test-image{padding:0;}'
            ]));
    });
    afterEach(function(){
        render(new Pic());
    });
});
