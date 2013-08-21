(function() {

  window.responseLess = {
    windowSizeUpdate: function(config) {
      this.$window = this.$window || $(window);

      var curWidth = parseInt(this.$window.innerWidth());
      var curHeight = parseInt(this.$window.innerHeight());
      // var changeBias = (Math.abs(this.width - curWidth) > Math.abs(this.height - curHeight)) ? 'x' : 'y';

      var WWU = Math.round((curWidth / 100)) + 'px';
      var WHU = Math.round((curHeight / 100)) + 'px';
      // debugger;

      less.modifyVars({
        '@page': curHeight + '', 
        '@x': WWU,
        '@y': WHU
      });

      this.ww = curWidth;
      this.wh = curHeight;
    },

    windowPositionUpdate: function(scroll) {
      less.modifyVars({ '@masterTop': scroll + 'px' });
    }
  };

  $(document).ready(function() { 
    responseLess.windowSizeUpdate();
    // responseLess.windowPositionUpdate();
  });

  $(window).resize(function() { responseLess.windowSizeUpdate(); }) // TODO: Would be nice to _.throttle/debounce this 
  // $(window).scroll(function(win) { responseLess.windowPositionUpdate(win.currentTarget.scrollY); }); // TODO: Would be nice to _.throttle/debounce this 

})();
