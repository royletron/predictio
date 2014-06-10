Router.map(function() {
  this.route('home', {path: '/'});
  this.route('fixtures', {path: '/fixtures'});
});

Router.configure({
  layoutTemplate: 'layout'
})
