var React = require('react/addons');
var App = React.createFactory(require('./components/App'));

var mountNode = document.getElementById('main');

if (typeof window !== "undefined") {
    window.onload = function(){
        React.render(App(), mountNode);
    };
}
