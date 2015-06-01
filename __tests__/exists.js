/* globals require, jest, describe, it, beforeEach */

if(typeof jest !== 'undefined'){
    jest.autoMockOff();
    var expect = require('chai').expect;
    var ReactInStyle = require('../src/react-in-style');
    document.body.innerHTML = '<div id="playground" style="display:none"></div>';
}

describe('react-in-style', function() {
    beforeEach(function() {
        ReactInStyle.destroy();
    });
    it('should exist', function() {
         /*jshint -W030 */
        expect(ReactInStyle).to.exist;
    });
});