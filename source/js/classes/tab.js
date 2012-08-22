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

    function Bundle(creator, name) {
      this.creator = creator;
      this.name = name;
      this.setHash = __bind(this.setHash, this);

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
      if (this.creator.activeBundle !== this) {
        $("content").scrollTo(0);
      }
      this.creator.activeBundle = this;
      this.setHash();
      return this;
    };

    Bundle.prototype.unsetActive = function() {
      this.tab.removeClass("active");
      this.content.removeClass("show");
      this.creator.activeBundle = null;
      this.setHash();
      return this;
    };

    Bundle.prototype.setHash = function() {
      if (!this.creator.searchString) {
        if (document.location.hash.substring(1).split("/")[0] !== this.name) {
          return document.location.hash = this.name;
        }
      } else {
        if (document.location.hash.substring(1).split("/")[0] !== this.name) {
          return document.location.hash = "" + this.name + "/" + this.creator.searchString;
        }
      }
    };

    return Bundle;

  })();

  window.Tab = Tab = (function() {

    function Tab(tabContainer, tabContentContainer) {
      var _this = this;
      this.tabContainer = tabContainer;
      this.tabContentContainer = tabContentContainer;
      this["new"] = __bind(this["new"], this);

      this.autoselect = document.location.hash.substring(1).split("/")[0] || "1";
      this.searchString = document.location.hash.substring(1).split("/")[1];
      this.tabs = {};
      this.counter = 1;
      window.addEventListener("hashchange", function() {
        var select, _ref;
        select = document.location.hash.substring(1).split("/")[0] || "1";
        _this.searchString = document.location.hash.substring(1).split("/")[1];
        if (_this.activeBundle.name === select) {
          return;
        }
        if (_this.tabs[select] != null) {
          return _this.tabs[select].setActive();
        } else {
          return (_ref = _this.tabs[1]) != null ? _ref.setActive() : void 0;
        }
      });
    }

    Tab.prototype["new"] = function() {
      var bundle;
      bundle = new Bundle(this, (this.counter++).toString());
      bundle.tab.inject(this.tabContainer);
      bundle.content.inject(this.tabContentContainer);
      if (!(this.activeBundle != null) || bundle.name === this.autoselect) {
        bundle.setActive();
      }
      return this.tabs[bundle.name] = bundle;
    };

    return Tab;

  })();

}).call(this);
