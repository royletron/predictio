Router.map(function() {
  this.route('home', {path: '/'});
  this.route('fixtures', {path: '/fixturez', data: function(){
    return {fixtures: Fixtures.find({}, {sort: {play_at: 1}})};
  }});
  this.route('league', {path: '/leaguez'});
  this.route('profile', {path: '/profilez', data: function() {
    console.log(Meteor.user());
    return Meteor.user();
  }})
});

Router.configure({
  layoutTemplate: 'layout'
})

Router.onAfterAction(function() {
  if(Meteor.user() == null)
  {
    Router.go('home');
    toastr.error('Need to be logged in!')
  }
}, {except: 'home'});