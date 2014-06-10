Template.layout.helpers({
  active: function(route) {
    var currentRoute = Router.current();
      return currentRoute &&
        route === currentRoute.lookupTemplate() ? 'active' : '';
  }
});
