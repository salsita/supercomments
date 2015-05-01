require('babel/polyfill');
require('bootstrap');

var React = require('react');
var Fluxxor = require('fluxxor');
var Comments = require('./components/Comments');
var Actions = require('./actions/Actions');
var RedditStore = require('./stores/RedditStore');
var DisqusStore = require('./stores/DisqusStore');
var stores = {
  RedditStore: new RedditStore(),
  DisqusStore: new DisqusStore()
};

var flux = new Fluxxor.Flux(stores, Actions);

var url = window.location.search.substr(1);
var config = JSON.parse(atob(frameElement.getAttribute('data-config')));

flux.actions.updateUrl({ url: url, config: { disqus: config.disqus }});

if (process.env.NODE_ENV !== 'test') {
  React.render(
    <Comments flux={flux}/>,
    document.getElementById('supercomments')
  );
}
