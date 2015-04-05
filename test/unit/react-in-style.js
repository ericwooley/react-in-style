/* globals React */
function render(item) {
    React.render(item.render(), document.getElementById('playground'));
}
describe('react-in-style', function() {
    beforeEach(function() {
        ReactInStyle.destroy();
    });
    it('should exist', function() {
        expect(ReactInStyle).to.exist();
    });
    describe('rendering', function() {
        var Pic;
        beforeEach(function() {
            Pic = React.createClass({
                style: {
                    height: '100px',
                    width: '100px',
                    'background-color': 'red',
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
            // render(new Pic());
        });
        it('should style a page', function() {
            ReactInStyle.add(Pic, 'sadman');
            expect(ReactInStyle.styleTag.innerHTML)
                .to.equal('sadman{height:100px; width:100px; background-color:red;}');
            
        });
        it('should style a page recursively', function() {
            Pic.prototype.style.img = {
                width: '50px',
                height: '50px'
            };
            ReactInStyle.add(Pic, 'sadman');

            expect(ReactInStyle.styleTag.innerHTML)
                .to.equal('sadman{height:100px; width:100px; background-color:red;}\nsadman img{width:50px; height:50px;}x');

        });
        it('should not have duplicates', function() {
            expect(function(){
                ReactInStyle.add(Pic, 'sadman');
                ReactInStyle.add(Pic, 'sadman');
            })
            .to.throw('selector sadman already has styles applied');
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
                .to.equal('sadman{height:100px; width:100px; background-color:red;}\nsadman:hover{background-color:blue;}');
        });
        afterEach(function(){
            render(new Pic());
        });

    });

});