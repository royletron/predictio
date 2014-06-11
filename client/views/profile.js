Template.profile.rendered = function() {
  return $('#bio').keydown(function(event) {
    if (event.keyCode === 13) {
      return $('#bio').blur();
    }
  });
};

Template.profile.helpers({
  email: function() {
    if (Meteor.user() && (Meteor.user().emails != null)) {
      return Meteor.user().emails[0].address;
    }
  },
  displayName: function() {
    if (Meteor.user()) {
      return Meteor.user().profile.displayName;
    }
  }
});

Template.profile.events({
  'click .done': function() {
    if (Meteor.user().profile.displayName) {
      return Router.go('/');
    } else {
      return $('.errors').text('Display Name.');
    }
  },
  'change #email': function(event) {
    return Meteor.call('changeEmail', Meteor.userId(), $(event.target).val());
  },
  'change #displayName': function(event) {
    return Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.displayName': $(event.target).val()
      }
    });
  }
});
