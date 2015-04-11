/* globals React, require, jest, describe, it, expect, beforeEach, afterEach */
jest
  .dontMock('../src/react-in-style.js')
  .dontMock('autoprefixer');



document.body.innerHTML = '<div id="playground" style="display:none"></div>';

function render(item) {
    if(typeof document !== 'undefined'){
        React.render(item.render(), document.getElementById('playground'));
    }
}
function arrayToStyle(arr){
    return arr.join('\n')+'\n';
}
describe('react-in-style', function() {
    var ReactInStyle = require('../src/react-in-style');
    beforeEach(function() {
        ReactInStyle.destroy();
    });
    it('should exist', function() {
        expect(ReactInStyle).to.exist();
    });
    describe('rendering', function() {
        var Pic, stylizedString;
        beforeEach(function() {
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
            // render(new Pic());
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
    describe('hover states', function(){
       var Pic;
       beforeEach(function() {
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
    describe('camelCase to-Kebab', function(){
       var Pic;
       beforeEach(function() {
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
    describe('& selector', function(){
        var Pic, stylizedString;
        beforeEach(function(){
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
    describe('css prefixes', function(){
        var Pic, stylizedString;
        beforeEach(function(){
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
});