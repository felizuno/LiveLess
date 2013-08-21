(function() {

  App.List = Backbone.Model.extend({
    initialize: function(dirtyData) {
      this[dirtyData.source](dirtyData);
    },

    rdio: function(dirtyData) {
      if (dirtyData.type == 'playlist') {
        // TODO
      }
    }
  });

})();