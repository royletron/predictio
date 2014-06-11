Router.map(function() {
  this.route('home', {path: '/'});
  this.route('fixtures', {path: '/fixturez'});
  this.route('league', {path: '/leaguez'});
  this.route('profile', {path: '/profilez', data: function() {
    console.log(Meteor.user());
    return Meteor.user();
  }})
});

Router.configure({
  layoutTemplate: 'layout'
})
