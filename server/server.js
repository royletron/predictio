Meteor.startup(function () {
  // code to run on server at startup
  Meteor.methods({
    removeAllFixtures: function() {
      return Fixtures.remove({});
    },
    whoIs: function(id){
      user = Meteor.users.findOne({_id: id})
      //console.log(user);
      if(user != null)
        return user.emails[0]
      else
        return null
    },
    getEmails: function(){
      users = Meteor.users.find({}).fetch()
      emails = [];
      for (index = 0; index < users.length; ++index) {
        emails[emails.length] = users[index].emails[0].address;
      }
      return emails
    },
    addFixture: function(options){
      return Fixtures.insert(options);
    }
  });
});
Accounts.validateNewUser(function (user) {
  if (user.emails && user.emails[0].address.toLowerCase().split('@oup.com').length >= 2)
    return true;
  throw new Meteor.Error(403, "Email must be an @oup.com one!");
});