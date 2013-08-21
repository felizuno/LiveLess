(function() {

  window.App.loader = {
    // =============================
    //  App.loader.get('thingName', argsObj).from('source').andThen(handlerFunc);
    // =============================
    get: function(what, args) {
      var self = this;
      App.wait(true);

      return {
        what: what,
        args: args || {},

        from: function(who) {
          if (who == 'rdio' || who == 'Rdio') {
            this.goGet = App.rdio.load;
          }

          return this;
        },

        andThen: function(then) {
          var capsule = $.Deferred();

          if (then && _.isFunction(then)) {
            capsule.done(function(data) {
              App.wait(false);
              then(data);
            });

            if (!this.goGet) {
              this.goGet = self._loadFromServer;
            }

            this.goGet(this.what, this.args, capsule);

            return;
          }

          return this;
        }
      };
    },

    // =============================
    _loadFromLastFm: function(what, capsule) {

    },

    // =============================
    _loadFromServer: function(what, capsule) {

    }

  };

})();