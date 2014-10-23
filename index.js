/** @jsx React.DOM */
var React = require('react');

var CalculatorButton = React.createClass({
  getDefaultProps: function() {
    return {
      label: ""
    }
  },
  calculate: function(evt) {
    var value = this.props.label,
        input = document.getElementById('calc-input');
    //exceptions for clear and equal keys.  will still suck if
    //you click = and then click a number.  TODO
    if (value === 'C'){
      input.value = '';
    } else if (value === '=') {
      input.value = eval (input.value);
    } else {
      input.value += value;
    }
  },
  render: function() {
    return (
      <span className={this.props.label + ' btn btn-primary col-xs-3'} onClick={this.calculate}>
        {this.props.label}
      </span>
    )
  }
});

var Calculator = React.createClass({
  getInitialState: function() {
    //map over state probably too, skip duplicated code
    return {
      top: ['7', '8', '9', '/'],
      second: ['4', '5', '6', '*'],
      third: ['3', '2', '1', '-'],
      last: ['C', '0', '+', '=']
    }
  },
  render: function() {
    return (
      <div className='panel-body container-fluid calculator'>
        <div className='row'>
          <input type='text' disabled id='calc-input' className='col-xs-12'></input>
        </div>
        <div className='row'>
          {this.state.top.map(function(label){
            return (
              <CalculatorButton label={label} />
            )
          })}
        </div>
        <div className='row'>
          {this.state.second.map(function(label){
            return (
              <CalculatorButton label={label} />
            )
          })}
        </div>
        <div className='row'>
          {this.state.third.map(function(label){
            return (
              <CalculatorButton label={label} />
            )
          })}
        </div>
        <div className='row'>
          {this.state.last.map(function(label){
            return (
              <CalculatorButton label={label} />
            )
          })}
        </div>
      </div>
    )
  }
});

var Panel = React.createClass({
  render: function() {
    return (
      <div className='container'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Calculator Fun Time!</h3>
          </div>
          <Calculator />
        </div>
      </div>
    )
  }
});

React.renderComponent(new Panel(), document.getElementById('content'));
