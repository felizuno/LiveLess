(function() {
  
  window.lessManager = {

    // =============================
    // viewBox
    // =============================
    
    viewBox: {
      $el: null,

      // =============================
      init: function() {
        this.$el = $(window);
        var resp = _.bind(this.handleResize, this);
        this.$el.resize(_.throttle(resp, 250));
        this.handleResize();
      },

      // =============================
      handleResize: function() {
        var ww = this.$el.width();
        var wh = this.$el.height();

        var aspect = this._sigFigs(ww / wh, 100);
        var min = Math.min(ww, wh);
        var mobile = (min < 400);
        var dominant = (min === wh) ? 'x' : 'y';

        var fontSize = this._sigFigs(0.025 * ww, 10);
        // Enforce a max size
        fontSize = Math.min(fontSize, 58);
        console.log('!!!', ww, fontSize);

        lessManager.updater.updateLess({
          '@aspectRatio': aspect,
          '@screenOrientation': dominant,
          '@masterFontSize': fontSize + 'px'
        });
      },

      _sigFigs: function(num, scaler) {
        return Math.round(num * scaler) / scaler;
      }
    },


    // =============================
    // updater - To use less.modifyVars(), you
    //  must update ALL your variables every time,
    //  otherwise the un-updated variables will
    //  revert to their initial state.
    // =============================

    updater: {
      vars: {
        // NOTE: This doesn't have to be every
        // variable you have in your LESS, but
        // it must include every single variable
        // you plan to update via JS. Calls to 
        '@aspectRatio': (4 / 3),
        '@screenOrientation': 'x',
        '@sourceTheme': 'green',
        '@masterFontSize': '24px'
      },

      // =============================
      updateLess: function(config) {
        this._updateProps(this.vars, config);
        less.modifyVars(this.vars);
      },

      _updateProps: function(dest, config) {
        for (var key in config) {
          if (config.hasOwnProperty(key) 
          && dest.hasOwnProperty(key)) {
            // For LESS to take the vars 
            // everything has to be a string
            dest[key] = config[key] + '';
          }
        }
      }
    } // end updater
  };

})();
