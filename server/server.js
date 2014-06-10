Meteor.startup(function () {
  // code to run on server at startup
});
Accounts.validateNewUser(function (user) {
  if (user.emails && user.emails[0].address.toLowerCase().split('@oup.com').length >= 2)
    return true;
  throw new Meteor.Error(403, "Email must be an @oup.com one!");
});