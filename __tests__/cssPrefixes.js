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
describe('css prefixes', function(){
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
    it('prefix the transform attribute', function(){
        Pic.prototype.style['&'] = {
            'transform': 'translateY(100px)'
        };
        ReactInStyle.add(Pic, 'sadman', {prefix: true, requestAnimationFrame: false});
        expect(ReactInStyle.styleTag.innerHTML)
            .to.equal(arrayToStyle([
                stylizedString,
                'sadman{-webkit-transform:translateY(100px);-ms-transform:translateY(100px);transform:translateY(100px);}',
                'sadman img{border:50px solid black;}'
            ]));
    });
    afterEach(function(){
        render(new Pic());
    });
});