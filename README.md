### This is in beta, and has not yet reached a stable realease
*The API may be changed at any point until 1.0 is reached*

[![Build Status](https://travis-ci.org/ericwooley/react-in-style.svg)](https://travis-ci.org/ericwooley/react-in-style)
[![Code Climate](https://codeclimate.com/github/ericwooley/react-in-style/badges/gpa.svg)](https://codeclimate.com/github/ericwooley/react-in-style)
[![Test Coverage](https://codeclimate.com/github/ericwooley/react-in-style/badges/coverage.svg)](https://codeclimate.com/github/ericwooley/react-in-style) actually 97% but jest and codeclimate won't play nice.

Unit tests work in IE9+ however, this library has not been battle tested, and probably isn't ready for production unless you want to live on the edge. If you do implement it somewhere, I will list it here as an example. PR or message me.

# react-in-style

[![Join the chat at https://gitter.im/ericwooley/react-in-style](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ericwooley/react-in-style?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Style react components by generating a style tag for all react components in a sass-like fassion.

--------------------------------------------------------------------------------------------------
## Motivation

This project was started as an alternative to react style because of it's inabilty to reasonably handle 
css states. Instead we are reacting in style, allowing you to define how your component should look, and creating a style tag in the head of the page which defines your component, hover states and all.

## Installing

`npm install --save react-in-style`


### Example Usage

```javascript
// or include `dist/react-in-style.js`
var ReactInStyle = require('react-in-style');
var style = {
        // & refers to parent selector, similar to SASS
        '&.test': {
            ':hover': {
                background: '#999'
            }
        },
        height: '100px',
        width: '100px',
        display: 'block',
        // Auto converted to kebab case.
        backgroundColor: 'red',
        img: {
            height: '500px',
            &.thumbnail: {
                height: '50px'
            }
        }
        ':hover': {
            'background-color': 'blue'
        }
    };
Pic = React.createClass({
    style: style,
    render: function() {
        return (
            React.createElement('CustomElement', {className:'test'},
                React.createElement('img', {
                    src: 'http://i.imgur.com/dYJLWdn.jpg',
                    className:'thumbnail'
                })
            )
        );
     }
 });

 // The second argument is the selector for your element.
 ReactInStyle.add(Pic, 'customelement', {
    queries: ['min-width: 500px', 'max-width: 900px']
 });

// You can also pass in an object directly instead of a class
// ReactInStyle.add(style, 'customelement', {
//     queries: ['min-width: 500px', 'max-width: 900px']
// });



 module.exports = Pic;
 ```
 
 The above would put a style tag in the head of the page. 

```html
<html>
    <head>
    ...
        <style id="react-in-style">
            @media (min-width: 500px) and (max-width: 900px) {
                customelement.test:hover {background: #999}
                customelement {height: '100px';width: '100px';display: 'block';background-color: 'red'}
                customelement img {height: '500px'}
                customelement img.thumbnail {height: '50px'} 
                customelement:hover {background-color: 'blue'}
            }
        </style>    
    </head>
</html>
```

## API

* Methods
    - add(class, selector, options)
        1. The class with the style object (attached via object.prototype.style)
        2. The selector for the style.
        3. options (with examples)
        ```javascript
        {
            // suppress warnings, which occur when the selector is added twice.
            noWarnings: false, // default

            // Prefix with css browser prefixors (opt in, large performance hit, *see note below)
            prefix: false, // default 

            // Will wrap 
            queiries: ['max-width: 900px', 'orientation: landscape' ... ] // example
        }
        
        ```
        *Prefixes are handled with [autoprefixer](https://github.com/postcss/autoprefixer-core), and the first time it's used will cause a network request and, therefore a large delay*
    - destroy() : Destroys all styles and removes all data related to previous adds.

## Running the unit tests

`open 'test/runner.html' && gulp test:browser` (may need to refresh once after it loads.)



# Contributing

Pull -> branch -> pull request

Try to match the style (tabs/spaces etc) if not I will fix it.
