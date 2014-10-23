/** @jsx React.DOM */
jest.dontMock('../index.js');
describe('Calculator', function() {
  it('clears value when C is clicked', function() {
    var React = require('react/addons');
    var Calculator = require('../index.js').Calculator;
    var TestUtils = React.addons.TestUtils;

    var calculator = TestUtils.renderIntoDocument(
      <Calculator />
    );

    //it should start clear
    var input = TestUtils.findRenderedDOMComponentWithTag(
      calculator, 'input');
    expect(input.getDOMNode().textContent).toEqual('');

    var five = TestUtils.findRenderedDOMComponentWithClass(
      calculator, '5'
    );
    var clear = TestUtils.findRenderedDomComponentWithClass(
      calculator, 'C'
    );

    //when you click five the value of the disabled input should
    //be 5
    TestUtils.Simulate.click(five);
    expect(input.getDOMNode().textContent).toEqual('5');

    //when you click clear, the value should be empty again
    TestUtils.Simulate.click(clear);
    expect(input.getDOMNode().textContent).toEqual('');
  });
});
