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
    describe('rendering', function() {
        var Pic, stylizedString;
        beforeEach(function() {
            ReactInStyle.destroy();
            Pic = React.createClass({
                style: {
                    height: '100px',
                    width: '100px',
                    display: 'block',
                    'background-color': 'red',
                },
                render: function() {
                    return (
                        React.createElement('SadMan', null,
                            React.createElement('img', {
                                src: 'sadman.jpg',
                                height: 75
                            })
                        )
                    );
                }
            });
            stylizedString = 'sadman{height:100px; width:100px; display:block; background-color:red;}\n';
            render(new Pic());
        });
        afterEach(function(){
            render(new Pic());
        });
        it('should style a page', function() {
            ReactInStyle.add(Pic, 'sadman', {requestAnimationFrame: false});
            expect(ReactInStyle.styleTag.innerHTML)
                .to.equal(stylizedString);
            
        });
        it('should recursively style a page', function() {
            Pic.prototype.style.img = {
                width: '50px',
                height: '50px'
            };
            ReactInStyle.add(Pic, 'sadman', {requestAnimationFrame: false});

            expect(ReactInStyle.styleTag.innerHTML)
                .to.equal(stylizedString+'sadman img{width:50px; height:50px;}\n');

        });
        it('should recursively style a page at depth 3', function() {
            Pic = React.createClass({
                style: {
                    height: '100px',
                    width: '100px',
                    display: 'block',
                    'border': '20px solid red',
                    div: {
                        border: '20px solid green',
                        img: {
                            height: '40px',
                            width:'40px',
                            border: '10px solid orange'
                        }
                    }
                },
                render: function() {
                    return (
                        React.createElement('SadMan', null,
                            React.createElement('div', null,
                                React.createElement('img', {
                                    src: 'sadman.jpg',
                                    height: 75
                                })
                            )
                        )
                    );
                }
            });
            ReactInStyle.add(Pic, 'sadman', {requestAnimationFrame: false});
            /* jshint ignore:start */
            expect(ReactInStyle.styleTag.innerHTML)
                
                .to.equal('sadman{height:100px; width:100px; display:block; border:20px solid red;}\nsadman div{border:20px solid green;}\nsadman div img{height:40px; width:40px; border:10px solid orange;}\n');
                /* jshint ignore:end */
        });
        it('should have work with an object instead of a class', function(){
            Pic = React.createClass({
               
                render: function() {
                    return (
                        React.createElement('SadMan', null,
                            React.createElement('div', null,
                                React.createElement('img', {
                                    src: 'sadman.jpg',
                                    height: 75
                                })
                            )
                        )
                    );
                }
            });
            var style = {
                height: '100px',
                width: '100px',
                display: 'block',
                'border': '20px solid red',
                div: {
                    border: '20px solid green',
                    img: {
                        height: '40px',
                        width:'40px',
                        border: '10px solid orange'
                    }
                }
            };
            ReactInStyle.add(style, 'sadman', {requestAnimationFrame: false});
            /* jshint ignore:start */
            expect(ReactInStyle.styleTag.innerHTML)
                .to.equal('sadman{height:100px; width:100px; display:block; border:20px solid red;}\nsadman div{border:20px solid green;}\nsadman div img{height:40px; width:40px; border:10px solid orange;}\n');
                /* jshint ignore:end */
        });
        it('should allow duplicates', function() {
            ReactInStyle.add(Pic, 'sadman', {requestAnimationFrame: false});
            Pic.prototype.style = {
                border: '20px solid blue',
            };
            
            ReactInStyle.add(Pic, 'sadman', {requestAnimationFrame: false});
            expect(ReactInStyle.styleTag.innerHTML)
                .to.equal(stylizedString+'sadman{border:20px solid blue;}\n');
        });
    });