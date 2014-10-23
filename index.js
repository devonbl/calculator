/** @jsx React.DOM */
var React = require('react');


var DevPage = React.createClass({

  render: function() {
    return (
      <div>
        test
      </div>
    )
  }
});

React.renderComponent(new DevPage(), document.getElementById("content"));
