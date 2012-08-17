// Generated by CoffeeScript 1.3.3

/*
## Fancy Settings by Frank Kohlhepp
## Copyright (c) 2011 - 2012 Frank Kohlhepp
## https://github.com/frankkohlhepp/fancy-settings
## License: LGPL v2.1
*/


(function() {
  var Bundle, Tab,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Bundle = (function() {

    function Bundle(creator) {
      this.creator = creator;
      this.unsetActive = __bind(this.unsetActive, this);

      this.setActive = __bind(this.setActive, this);

      this.tab = new Element("div", {
        "class": "tab"
      });
      this.content = new Element("div", {
        "class": "tab-content"
      });
      this.tab.addEvent("click", this.setActive);
    }

    Bundle.prototype.setActive = function() {
      var _ref;
      if (this.creator.activeBundle !== this) {
        if ((_ref = this.creator.activeBundle) != null) {
          _ref.unsetActive();
        }
      }
      this.tab.addClass("active");
      this.content.addClass("show");
      return this.creator.activeBundle = this;
    };

    Bundle.prototype.unsetActive = function() {
      this.tab.removeClass("active");
      this.content.removeClass("show");
      this.creator.activeBundle = null;
      return this;
    };

    return Bundle;

  })();

  window.Tab = Tab = (function() {

    function Tab(tabContainer, tabContentContainer) {
      this.tabContainer = tabContainer;
      this.tabContentContainer = tabContentContainer;
      this["new"] = __bind(this["new"], this);

    }

    Tab.prototype["new"] = function() {
      var bundle;
      bundle = new Bundle(this);
      bundle.tab.inject(this.tabContainer);
      bundle.content.inject(this.tabContentContainer);
      if (this.activeBundle == null) {
        bundle.setActive();
      }
      return bundle;
    };

    return Tab;

  })();

}).call(this);
