Handlebars.registerHelper('key_value', function(context, options) {
  var result = [];
  _.each(context, function(value, key, list){
    result.push({key:key+1, value:value});
  })
  return result;
});

var winLoseDraw = function(home_score, away_score, side)
{
  if(home_score == away_score)
    return 'draw'
  if(side == 'home')
    if(home_score > away_score)
      return 'win'
  if(side == 'away')
    if(away_score > home_score)
      return 'win'
  return 'loss'
}

Template.league.users = function () {
  var data = []
  var fixtures = Fixtures.find({score1: { $ne: null}}).fetch();
  var fixture_ids = _.pluck(fixtures, '_id')
  var users = Meteor.users.find({}).fetch();
  _.each(users, function(user, idx){
    var scores = 0;
    var results = 0;
    var predictions = Predictions.find({owner: user._id, fixture: {$in: fixture_ids}}).fetch();
    _.each(predictions, function(prediction, idx){
      var this_fixture = Fixtures.findOne({_id: prediction.fixture});
      if((prediction.home_score == this_fixture.score1) && (prediction.away_score == this_fixture.score2))
        scores += 1;
      else
        if(winLoseDraw(prediction.home_score, prediction.away_score, 'home') == winLoseDraw(this_fixture.score1, this_fixture.score2, 'home'))
        results += 1;
    })
    var name = user.profile.displayName;
    if(name == undefined)
      name = "Anonz"
    data.push({name: name, scores: scores, results: results, points: (scores*4) + (results*2)});
  })
  data = _.sortBy(data, function(item){ return -item.points });
  return data;
};