Router.map(function() {
  this.route('home', {path: '/'});
  this.route('fixtures', {path: '/fixturez'});
});

Router.configure({
  layoutTemplate: 'layout'
})
