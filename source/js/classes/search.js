// Generated by CoffeeScript 1.3.3

/*
## Fancy Settings by Frank Kohlhepp
## Copyright (c) 2011 - 2012 Frank Kohlhepp
## https://github.com/frankkohlhepp/fancy-settings
## License: LGPL v2.1
*/


(function() {
  var Search,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Search = Search = (function() {

    function Search(search) {
      var find,
        _this = this;
      this.search = search;
      this.reset = __bind(this.reset, this);

      this.find = __bind(this.find, this);

      this.index = __bind(this.index, this);

      this.bind = __bind(this.bind, this);

      this.settings = [];
      find = function() {
        return _this.find(_this.search.get("value"));
      };
      this.search.addEvent("keyup", function(event) {
        if (event.key === "esc") {
          return _this.reset();
        } else {
          return find();
        }
      });
      this.search.addEventListener("search", find, false);
    }

    Search.prototype.bind = function(tab) {
      tab.addEvent("click", this.reset);
      return this;
    };

    Search.prototype.index = function(setting) {
      this.settings.push(setting);
      return this;
    };

    Search.prototype.find = function(searchString) {
      var results,
        _this = this;
      if (!searchString.trim()) {
        document.html.removeClass("searching");
        return this;
      }
      $("nothing-found").removeClass("match");
      this.settings.each(function(setting) {
        setting.bundle.removeClass("match");
        setting.group.removeClass("match");
        return setting.tab.content.removeClass("match");
      });
      document.html.addClass("searching");
      results = this.settings.filter(function(setting) {
        if (setting.searchString.toLowerCase().contains(searchString.trim().toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
      if (!results.length) {
        $("nothing-found").addClass("match");
      } else {
        results.each(function(setting) {
          setting.bundle.addClass("match");
          setting.group.addClass("match");
          return setting.tab.content.addClass("match");
        });
      }
      return this;
    };

    Search.prototype.reset = function() {
      this.search.set("value", "");
      this.search.blur();
      return this.find("");
    };

    return Search;

  })();

}).call(this);
