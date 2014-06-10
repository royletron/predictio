Fixtures = new Meteor.Collection('fixtures');

Fixtures.allow({
  insert: function (userId, fixture) {
    if(userId != 'oTNTFyqj49FZbjvtN')
      return false; // no cowboy inserts -- use createParty method
    else
      return true;
  },
  update: function (userId, fixture, fields, modifier) {
    return true;
  },
  remove: function (userId, fixture) {
    return false;
  }
});


Predictions = new Meteor.Collection('predictions');

Predictions.allow({
  insert: function(userId, prediction){
    if(userId == prediction.owner)
      return true;
    else
      return false;
  },
  update: function(userId, prediction, fields, modifier) {
    if (userId !== prediction.owner)
      return false; // not the owner

    if(prediction.fixture.closed)
      return false;

    var fixture = Fixture.findOne({_id: prediction.fixture});
    if(fixture != undefined)
      if(moment(this.play_at).add('hours', 17) > moment())
        return false;
      
    return true;
  },
  remove: function(userId, prediction) {
    if(userId != prediction.owner)
      return false;
    return true;
  }
})

Meteor.methods({
  removeAllFixtures: function() {
    return Fixtures.remove({});
  }
});
