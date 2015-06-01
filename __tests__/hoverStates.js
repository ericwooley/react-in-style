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
describe('hover states', function(){
   var Pic;
   beforeEach(function() {
        ReactInStyle.destroy();
        Pic = React.createClass({
           style: {
                height: '100px',
                width: '100px',
                'background-color': 'red',     
                ':hover': {
                    'background-color': 'blue'
                }
           },
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
        ReactInStyle.add(Pic, 'sadman', {requestAnimationFrame: false});
        expect(ReactInStyle.styleTag.innerHTML)
            .to.equal('sadman{height:100px; width:100px; background-color:red;}\nsadman:hover{background-color:blue;}\n');
    });
    afterEach(function(){
        render(new Pic());
    });
});