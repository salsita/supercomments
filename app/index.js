require('babel/polyfill');
require('bootstrap');

let React = require('react');
let Fluxxor = require('fluxxor');
let url = require('url');
let Comments = require('./components/Comments');
let Actions = require('./actions/Actions');

let RedditStore = require('./stores/RedditStore');
let stores = {
  RedditStore: new RedditStore()
};

let flux = new Fluxxor.Flux(stores, Actions);

let config = JSON.parse(atob(frameElement.getAttribute('data-config')));

let parsedUrl = url.parse(config.url);
flux.actions.updateUrl({ url: parsedUrl.hostname+parsedUrl.pathname, config: { reddit: config.reddit, disqus: config.disqus }});
if (process.env.NODE_ENV !== 'test') {
  React.render(
    <Comments flux={flux}/>,
    document.getElementById('supercomments')
  );
}
