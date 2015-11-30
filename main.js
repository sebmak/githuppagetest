"use strict";

var Nav = React.createClass({

  getInitialState: function getInitialState() {
    return {
      className: "nav"
    }
  },

  componentDidMount: function componentDidMount() {
    setTimeout(function() {
      this.setState({className: "nav open"});
    }.bind(this), 10)
  },

  render: function render() {
    return React.createElement(
      "div",
      {className: this.state.className}
    );
  }
})

var HelloMessage = React.createClass({
  displayName: "HelloMessage",

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(Nav)
    );
  }
});


document.addEventListener('DOMContentLoaded', function() {
  var loader = document.getElementById('loading');
  var main = document.getElementById('main');
  loader.addEventListener("animationiteration", function() {
    this.className = "complete";
    setTimeout(function() {
      document.body.style.background = "rgba(33,150,243,1)";
      main.removeChild(loader);
      ReactDOM.render(React.createElement(HelloMessage, { name: "Sebastian" }), main);
    }, 500)
  });
}, false);
