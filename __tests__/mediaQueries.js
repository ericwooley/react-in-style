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

describe('Media Queries', function(){
    var Pic, stylizedString;
    beforeEach(function(){
        ReactInStyle.destroy();
        Pic = React.createClass({
           style: {
                height: '100px',
                width: '100px',
                border: '10px solid red'
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
        stylizedString = '@media (min-width: 500px) and (max-width: 900px) {sadman{height:100px; width:100px; border:10px solid red;}}';
    });
    afterEach(function(){
        render(new Pic());
    });
    it('should wrap styles in a media query', function(){
        ReactInStyle.add(Pic, 'sadman', {requestAnimationFrame: false, queries: ['min-width: 500px', 'max-width: 900px']});
        expect(ReactInStyle.styleTag.innerHTML)
            .to.equal(
                arrayToStyle([stylizedString])
            );
    });
});