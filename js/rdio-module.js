(function() {

  var Person = function(data) {
    this.id  = data.key;
    this.data = data;
    var raw = $('#rdio-person-template').html();

    this.$el = $('<div>')
      .html(_.template(raw, this.data))
      .data('id', data.key)
      .addClass('rdioPerson');
  };

  Person.prototype = {
    renderTo: function($el) {
      // debugger;
      this.$el.appendTo($el);

      return this.$el;
    }
  };

  var rdioList = function(data) {
    // this.id  = data.key;
    // this.data = data;
    // var raw = $('#rdio-list-template').html();

    this.$el = $('<div>')
    //   .html(_.template(raw, this.data))
    //   .data('id', data.key)
      .addClass('rdioList');
  };

  rdioList.prototype = {
    renderTo: function($el) {
      // debugger;
      this.$el.appendTo($el);

      return this.$el;
    }
  };

  // =============================
  // App.Rdio
  // =============================
  App.rdio = {
    map: {
      title: 'Rdio',
      layer1: { choices: [], choiceIndex: 0, choiceHandler: this.choiceHandler1 },
      layer2: { choices: [], choiceIndex: 0, choiceHandler: this.choiceHandler2 }
    },
    name: 'rdio',
    themeColor: 'blue',

    // =============================
    init: function() {
      // this.map.layer1.choiceHandler = this.choiceHandler1;
      // this.map.layer2.choiceHandler = this.choiceHandler2;
      this.currentLayer = this.map.layer1;
      this.addUsersToMap(this.currentLayer);
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
    addUsersToMap: function(layer) {
      var self = this;

      var addUser = function(user) {
        if (user) { layer.choices.push(new Person(user)); }
      };
      
      R.ready(function() {
        var attr = R.currentUser.attributes;

        addUser({
          firstName: attr.firstName,
          lastName: attr.lastName,
          icon500: attr.icon.replace('200.jpg', '600.jpg'),
          key: attr.key,
          url: 'http://www.rdio.com' + attr.url
        });

        self.load({
          method: 'userFollowing',
          content: {
            user: R.currentUser.get('key'),
            count: 100,
            extras: '-*,firstName,lastName,icon500,key,url'
          },
          success: function(data) {
            self.view.flags.set('loading', false);
            _.each(data.result, addUser);
          }
        });
      });    
    },

    // =============================
    addListsToMap: function(layer, chioce) {
      layer.choices.empty();
      var addList = function(list) {
        if (list) { layer.choices.push(new rdioList(list)); }
      };

      R.ready(function() {
        self.load({
          method: 'getUserPlaylists',
          content: {
            user: choice.data.key,
            count: 100
            // extras: '-*,firstName,lastName,icon500,key,url'
          },
          success: function(data) {
            self.view.flags.set('loading', false);
            console.log('DATA', data);
            // _.each(data.result, addList);
          }
        });
      });    
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

      R.ready(function() {
        R.request(config);
      });
    }
  };

})();
