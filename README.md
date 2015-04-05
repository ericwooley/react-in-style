# react-in-style

Style react components by generating a style tag for all react components in a sass-like fassion.

--------------------------------------------------------------------------------------------------
## Motivation

This project was started as an alternative to react style because of it's inabilty to reasonably handle 
css states. React style also attaches styles as a style attribute. Instead we are reacting in style, allowing you
to define how your component should look, and creating a style tag in the head of the page which defines your component.

## Installing

`npm install --save react-in-style`


### Example Usage

```javascript
var ReactInStyle = require('react-in-style');
Pic = React.createClass({
    style: {
        height: '100px',
        width: '100px',
        display: 'block',
        'background-color': 'red',     
        img: {
            height: '50px'
        }
        ':hover': {
            'background-color': 'blue'
        }
    },
    render: function() {
        return (
            React.createElement('CustomElement', null,
                React.createElement('img', {
                    src: 'http://i.imgur.com/dYJLWdn.jpg'
                })
            )
        );
     }
 });
 // The second argument is the selector for your element.
 ReactInStyle.add(Pic, 'customelement');
 ```

produces in $('head style#react-in-style')

> customelement {height: '100px';width: '100px';display: 'block';background-color: 'red'}

> customelement img {height: '50px'} 

> customelement:hover {background-color: 'blue'}

## API

* Methods
    - add(class, selector, force)
        1. The class with the style object (attached via object.prototype.style)
        2. The selector for the style.
        3. (Force) true/false: If the selector already has a style, an error will be thrown, unless true is passed in as the force option.
    - destroy() : Destroys all styles and removes all data related to previous adds.

## Running the unit tests

`open 'http://localhost:8080' && gulp test:browser`


# Contributing

Pull -> branch -> pull request

Try to match the style (tabs/spaces etc) if not I will fix it.