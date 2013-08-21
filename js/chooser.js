(function() {
  var Flags = Backbone.Model.extend();

  var NavItem = Backbone.View.extend({
    events: function() {
      return {
        'click': 'clickHandler'
      };
    },

    initialize: function() {
      this.flags = new Flags({
        loading: false,
        chosen: false,
        extended: false
      });

      this.$back = $('<div>')
        .addClass('back')
        .appendTo(this.$el);

      this.$spinner = $('<div>')
        .addClass('spinner')
        .appendTo(this.$back);

      this.$name = $('<div>')
        .addClass('name')
        .html(this.options.name)
        .appendTo(this.$el);

      _.bindAll(this, 'render', 'extend', 'showSpin', 'dim', 'clickHandler');
      this.listenTo(this.flags, 'change', this.render);
      this.render();
    },

    render: function() {
      this.$el.css(this.options.css);
      this.showSpin();
      this.showBack();
      this.extend();
      this.dim();
    },

    extend: function() {
      this.$el.toggleClass('extended', this.flags.get('extended'));
    },

    showBack: function() {
      this.$back.animate({
        height: (this.flags.get('chosen')) ? '0%' : '50%'
      });
    },

    showSpin: function() {
      this.$spinner.toggleClass('on', this.flags.get('loading'));
    },

    dim: function() {
      var alpha = (this.flags.get('chosen')) ? 1 : 0.5;
      this.$el.css('opacity', alpha);
    },

    clickHandler: function() {
      var change = !this.flags.get('chosen');
      App.nav.sourceClickHandler(this.options.name, change);
    }
  });

  // =============================
  // NAV CONTROLLER
  // =============================
  App.nav = {
    items: [],

    // =============================
    init: function() {
      this.$el = $('.input-bar');
      this.$nav = this.$el.find('.nav');
      this.$sources = this.$nav.find('.sources');
    },

    // =============================
    register: function(source) {
      var $el = $('<div>')
        .addClass(source.name + ' source')
        .appendTo(this.$sources)
      
      var item = new NavItem({
        name: source.name,
        el: $el,
        css: { 'background-color': source.themeColor }
      });

      source.view = item;
      this.items.push(item);
    },

    // =============================
    sourceClickHandler: function(sourceName, change) {
      _.each(this.items, function(item) {
        item.flags.set('chosen', (change && item.options.name == sourceName));
      });

      App.changeSource((change) ? sourceName : change);
    }
  };

})();
