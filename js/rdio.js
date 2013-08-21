(function() {
  
  window.App.rdio = {
    currentView: 'rdio-main',

    // =============================
    showInputOverlay: function() {
      var self = this;
      var handler;

      R.ready(function() {
        if (R && !R.authenticated()) {
          self.currentView = 'rdio-sign-in';
          handler = self._authHandler
        } else {
          handler = self._choiceHandler;
        }

        App.toggleInputOverlay(self.currentView, null, handler);
        // App.toggleInputOverlay('rdio-sign-in', null, handler);
      });
    },

    // =============================
    load: function(what, args, capsule) {
      var request = {
        method: {
          playlists: 'getUserPlaylist',
          playlist: 'get',
          following: 'userFollowing'
        }[what],

        content: {
          playlists: {
            user: args.key
          },
          playlist: {
            keys: args.keys
          },
          folllowing: {
            user: args.key,
            count: 100
          }
        }[what],


        success: function(data) {
          if (capsule) {
            data.listView = {
              source:'rdio',
              type: what
            };

            capsule.resolveWith(new App.List(data));
          }

          // TODO: This is where I should save the data to localStorage.rdio.what ?[args.key]?
        }
      };

      request.content.extras = args.extras || '';
      
      R.ready(function() {
        R.request(request);
      });
    },

    // =============================
    _choiceHandler: function($choice) {
      var who = $choice.attr('class');

      var finished = {
        following: false,
        playlists: false,
        collection: true,
        heavyRotation: true,
        playlist: true,
        user: true
      }[who];

      if (who == 'back') {
        this.currentView = 'rdio-main';
        this.showInputOverlay();
      } else if (finished) {
        App.toggleInputOverlay();
        App.changeList({
          source: 'rdio',
          type: who, 
          data: $choice.data('id')
        });
      } else {
        this.currentView = 'rdio-' + who + '-list';
        this.showInputOverlay();
      }
    },

    // =============================
    _authHandler: function() {
      var self = this;
      App.wait(true);
      R.authenticate(function(authenticated) {
        if (authenticated) {
          App.wait(false);
          self.showInputOverlay();
        }
      });
    }
  };

})();