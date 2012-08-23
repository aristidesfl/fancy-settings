// Generated by CoffeeScript 1.3.3

/*
## Fancy Settings by Frank Kohlhepp
## Copyright (c) 2011 - 2012 Frank Kohlhepp
## https://github.com/frankkohlhepp/fancy-settings
## License: LGPL v2.1
*/


(function() {
  var FancySettings,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.FancySettings = FancySettings = (function() {

    function FancySettings(name) {
      this.name = name;
      this.align = __bind(this.align, this);

      this["new"] = __bind(this["new"], this);

      this.check = __bind(this.check, this);

      this.getGroup = __bind(this.getGroup, this);

      this.getTab = __bind(this.getTab, this);

      this.tabs = {};
      this.settings = {};
      $("title").set("text", this.name);
      $("name").set("text", this.name);
      $("search-tab").set("text", i18n.get("Search"));
      $("search-tab-name").set("text", i18n.get("Search Results"));
      $("search").set("placeholder", i18n.get("Search") + "...");
      $("nothing-found").set("text", i18n.get("No matches were found."));
      this.tab = new Tab($("tab-container"), $("content"));
      this.search = new Search($("search"));
    }

    FancySettings.prototype.getTab = function(name) {
      var tab;
      if (this.tabs[name] != null) {
        return this.tabs[name];
      }
      tab = this.tab["new"]();
      tab.groups = {};
      tab.tab.set("text", name);
      this.search.bind(tab.tab);
      tab.content.name = (new Element("h2", {
        "class": "tab-name",
        text: name
      })).inject(tab.content);
      tab.content.settings = (new Element("div", {
        "class": "tab-settings"
      })).inject(tab.content);
      return this.tabs[name] = tab;
    };

    FancySettings.prototype.getGroup = function(name, tab) {
      var group;
      if (tab.groups[name] != null) {
        return tab.groups[name];
      }
      group = (new Element("div", {
        "class": "setting group"
      })).inject(tab.content.settings);
      group.name = (new Element("div", {
        "class": "setting group-name",
        text: name
      })).inject(group);
      group.content = (new Element("div", {
        "class": "setting group-content"
      })).inject(group);
      group.setting = new Setting(group.content);
      return tab.groups[name] = group;
    };

    FancySettings.prototype.check = function(param, value) {
      var success;
      success = typeOf(value) === "string" && !!value;
      if (!success) {
        throw "Error: " + param + " is a required parameter. Check your manifest!";
      }
      return this;
    };

    FancySettings.prototype["new"] = function(params) {
      var group, setting, tab;
      this.check("tab", params.tab);
      this.check("group", params.group);
      this.check("name", params.name);
      this.check("type", params.type);
      tab = this.getTab(params.tab);
      group = this.getGroup(params.group, tab);
      setting = group.setting["new"](params);
      setting.tab = tab;
      setting.group = group;
      this.settings[params.name] = setting;
      this.search.index(setting);
      return setting;
    };

    FancySettings.prototype.align = function(settings) {
      var maxWidth, type, types,
        _this = this;
      settings = settings.map(function(name) {
        return _this.settings[name];
      });
      types = ["text", "button", "slider", "popupButton"];
      type = settings[0].params.type;
      maxWidth = 0;
      if (!types.contains(type)) {
        throw "invalidType";
      }
      document.html.addClass("measuring");
      settings.each(function(setting) {
        var width;
        if (setting.params.type !== type) {
          throw "multipleTypes";
        }
        width = setting.label.offsetWidth;
        if (width > maxWidth) {
          return maxWidth = width;
        }
      });
      settings.each(function(setting) {
        var width;
        width = setting.label.offsetWidth;
        if (width < maxWidth) {
          if (type === "button" || type === "slider") {
            return setting.element.setStyle("margin-left", (maxWidth - width + 2) + "px");
          } else {
            return setting.element.setStyle("margin-left", (maxWidth - width) + "px");
          }
        }
      });
      return document.html.removeClass("measuring");
    };

    return FancySettings;

  })();

  FancySettings.initWithManifest = function(callback) {
    var fancySettings,
      _this = this;
    fancySettings = new FancySettings(manifest.name);
    manifest.settings.each(function(params) {
      return fancySettings["new"](params);
    });
    if (manifest.alignment != null) {
      manifest.alignment.each(function(group) {
        return fancySettings.align(group);
      });
    }
    if (callback != null) {
      callback(fancySettings);
    }
    return this;
  };

}).call(this);
