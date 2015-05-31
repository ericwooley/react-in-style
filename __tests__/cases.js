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
describe('camelCase to-Kebab', function(){
   var Pic;
   beforeEach(function() {
    ReactInStyle.destroy();
       Pic = React.createClass({
           render: function() {
               return (
                   React.createElement('SadMan', null,
                       React.createElement('img', {
                           src: 'sadman.jpg'
                       })
                   )
               );
            }
        });
    });
    it('should style a page', function() {
        Pic.prototype.style = {
                height: '100px',
                width: '100px',
                backgroundColor: 'red',     
                ':hover': {
                    'background-color': 'blue'
                }
           };
        ReactInStyle.add(Pic, 'sadman', {requestAnimationFrame: false});
        expect(ReactInStyle.styleTag.innerHTML)
            .to.equal('sadman{height:100px; width:100px; background-color:red;}\nsadman:hover{background-color:blue;}\n');
    });
    it('should still work with vendor prefixes', function() {
        Pic.prototype.style = {
                height: '100px',
                width: '100px',
                '-webkit-transform': 'translateY(-100px)',     
                ':hover': {
                    'background-color': 'blue'
                }
           };
        ReactInStyle.add(Pic, 'sadman', {requestAnimationFrame: false});
        expect(ReactInStyle.styleTag.innerHTML)
            .to.equal(arrayToStyle([
                'sadman{height:100px; width:100px; -webkit-transform:translateY(-100px);}',
                'sadman:hover{background-color:blue;}'
            ]));
    });
    afterEach(function(){
        render(new Pic());
    });

});