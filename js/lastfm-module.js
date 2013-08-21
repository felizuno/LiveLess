(function() {

  // =============================
  // App.lastFM
  // =============================
  App.lastFM = {
    map: {
      title: 'Last.FM',
      layer1: { choices: [], choiceIndex: 0, choiceHandler: this.choiceHandler1 },
      layer2: { choices: [], choiceIndex: 0, choiceHandler: this.choiceHandler2 }
    },
    name: 'lastFM',
    themeColor: 'red',

    // =============================
    init: function() {
      // this.map.layer1.choiceHandler = this.choiceHandler1;
      // this.map.layer2.choiceHandler = this.choiceHandler2;
      this.currentLayer = this.map.layer1;
    },

    // =============================
    render: function($el, layer) {
      var self = this;

      this.currentLayer = (!!layer) ? layer : this.currentLayer;
      _.each(this.currentLayer.choices, function(choice) {
        choice.renderTo($el).click(self.currentLayer.choiceHandler);
      })
    },

    // =============================
    choiceHandler1: function(event) {
      var choiceId = $(event.originalEvent.target).data('id');
      var choice = _.find(this.currentLayer.choices, function(choice) {
        return choice.id === choiceId;
      });
      // this.currentLayer.choiceIndex = _.indexOf(this.currentLayer.choices, choice); 

      var nextLayer = this.map.layer2;

      this.addListsToMap(nextLayer, choice);
      App.jumpToSourceMap(this, nextLayer);
    },

    // =============================
    load: function(config) {
      this.view.flags.set('loading', true);
    }
  };

})();
