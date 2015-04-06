/* globals React */
function render(item) {
    if(typeof document !== 'undefined'){
        React.render(item.render(), document.getElementById('playground'));
    }
}
describe('react-in-style', function() {
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
                                src: 'http://i.imgur.com/dYJLWdn.jpg',
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
            ReactInStyle.add(Pic, 'sadman');
            expect(ReactInStyle.styleTag.innerHTML)
                .to.equal(stylizedString);
            
        });
        it('recursively should style a page', function() {
            Pic.prototype.style.img = {
                width: '50px',
                height: '50px'
            };
            ReactInStyle.add(Pic, 'sadman');

            expect(ReactInStyle.styleTag.innerHTML)
                .to.equal(stylizedString+'sadman img{width:50px; height:50px;}\n');

        });
        it('recursively should style a page at depth 3', function() {
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
                                    src: 'http://i.imgur.com/dYJLWdn.jpg',
                                    height: 75
                                })
                            )
                        )
                    );
                }
            });
            ReactInStyle.add(Pic, 'sadman');
            /* jshint ignore:start */
            expect(ReactInStyle.styleTag.innerHTML)
                
                .to.equal('sadman{height:100px; width:100px; display:block; border:20px solid red;}\nsadman div{border:20px solid green;}\nsadman div img{height:40px; width:40px; border:10px solid orange;}\n');
                /* jshint ignore:end */
        });
        it('should allow duplicates', function() {
            ReactInStyle.add(Pic, 'sadman');
            Pic.prototype.style = {
                border: '20px solid blue',
            };
            
            ReactInStyle.add(Pic, 'sadman');
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
                               src: 'http://i.imgur.com/dYJLWdn.jpg'
                           })
                       )
                   );
                }
            });
        });
        it('should style a page', function() {
            ReactInStyle.add(Pic, 'sadman');
            expect(ReactInStyle.styleTag.innerHTML)
                .to.equal('sadman{height:100px; width:100px; background-color:red;}\nsadman:hover{background-color:blue;}\n');
        });
        afterEach(function(){
            render(new Pic());
        });

    });

});