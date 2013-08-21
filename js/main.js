(function() {

  window.App = {
    sources: ['rdio', 'lastFM', 'kexp'],
    defaultThemeColor: 'green',

    // =============================
    init: function() {
      this.$contentArea = $('.content-area');
      lessManager.viewBox.init();
      this.nav.init();
      this.registerSources(this.sources)
    },

    // =============================
    registerSources: function(sourceArray) {
      if (!sourceArray.length) return;
      var self = this;

      _.each(sourceArray, function(sourceName) {
        var source = self[sourceName];
        source.init();
        self.nav.register(source);
      });
    },

    // =============================
    changeSource: function(destination) {
      this.$contentArea.empty();
      
      var newColor;
      if (destination) {
        var module = this[destination];
        newColor = module.themeColor;
        this.jumpToSourceMap(module);
      } else {
        newColor = this.defaultThemeColor;
      }

      lessManager.updater.updateLess({ 
        '@sourceTheme': newColor
      });
    },

    // =============================
    jumpToSourceMap: function(module, layer) {
      module.render(this.$contentArea, layer);
    }
  };

  // =============================
  $(document).ready(function() {
    App.init();
  });

})();
