// Generated by CoffeeScript 1.3.3

/*
## Fancy Settings by Frank Kohlhepp
## Copyright (c) 2011 - 2012 Frank Kohlhepp
## https://github.com/frankkohlhepp/fancy-settings
## License: LGPL v2.1
*/


(function() {
  var Bundle, NumberBundle, PushButtonBundle, Setting, TextBundle, TextareaBundle, store,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  store = new Store("settings");

  Bundle = (function() {

    function Bundle(params) {
      this.params = params;
      this.fireEvent = __bind(this.fireEvent, this);

      this.removeEvent = __bind(this.removeEvent, this);

      this.addEvent = __bind(this.addEvent, this);

      this.shouldBeEnabled = __bind(this.shouldBeEnabled, this);

      this.check = __bind(this.check, this);

      this.events = {};
      this.searchString = "•" + this.params.tab + "•" + this.params.group + "•";
      this.createDOM();
      this.setupDOM();
      this.setupEvents();
      this.searchString = this.searchString.toLowerCase();
    }

    Bundle.prototype.check = function(param, type, value, setting) {
      if (typeOf(value) !== type) {
        throw "Error: " + param + " is a required parameter (type: " + type + ") for the setting \"" + setting + "\". Check your manifest!";
      }
      return this;
    };

    Bundle.prototype.shouldBeEnabled = function(enableValue, value) {
      if (typeOf(enableValue) === "function") {
        return !!enableValue(value);
      } else {
        return enableValue === value;
      }
    };

    Bundle.prototype.addEvent = function(type, callback) {
      var _base, _ref;
      if ((_ref = (_base = this.events)[type]) == null) {
        _base[type] = [];
      }
      this.events[type].include(callback);
      return this;
    };

    Bundle.prototype.removeEvent = function(type, callback) {
      var _ref, _ref1;
      if ((_ref = this.events[type]) != null) {
        _ref.erase(callback);
      }
      if (!((_ref1 = this.events[type]) != null ? _ref1.length : void 0)) {
        delete this.events[type];
      }
      return this;
    };

    Bundle.prototype.fireEvent = function(type, value) {
      var _ref,
        _this = this;
      if ((_ref = this.events[type]) != null) {
        _ref.each(function(callback) {
          return callback(value, type);
        });
      }
      return this;
    };

    return Bundle;

  })();

  TextBundle = (function(_super) {

    __extends(TextBundle, _super);

    function TextBundle() {
      this.disable = __bind(this.disable, this);

      this.enable = __bind(this.enable, this);

      this.$set = __bind(this.$set, this);

      this.$get = __bind(this.$get, this);

      this.set = __bind(this.set, this);

      this.get = __bind(this.get, this);

      this.setupEvents = __bind(this.setupEvents, this);

      this.setupDOM = __bind(this.setupDOM, this);

      this.createDOM = __bind(this.createDOM, this);
      return TextBundle.__super__.constructor.apply(this, arguments);
    }

    TextBundle.prototype.createDOM = function() {
      this.bundle = new Element("div", {
        "class": "setting bundle text"
      });
      this.container = new Element("div", {
        "class": "setting container text"
      });
      this.element = new Element("input", {
        "class": "setting element text",
        type: "text"
      });
      this.label = new Element("label", {
        "class": "setting label text"
      });
      return this;
    };

    TextBundle.prototype.setupDOM = function() {
      if (this.params.label != null) {
        this.label.set("html", this.params.label);
        this.label.inject(this.container);
        this.searchString += "" + this.params.label + "•";
      }
      if (this.params.placeholder != null) {
        this.element.set("placeholder", this.params.placeholder);
        this.searchString += "" + this.params.placeholder + "•";
      }
      if (this.params.masked) {
        this.element.set("type", "password");
        this.searchString += "password•";
      }
      this.check("default", "string", this.params["default"], this.params.name);
      this.$set(this.get());
      if (this.params.disabled) {
        this.disable();
      }
      if ((this.params.enableKey != null) && (this.params.enableValue != null)) {
        if (this.shouldBeEnabled(this.params.enableValue, store.get(this.params.enableKey))) {
          this.enable();
        } else {
          this.disable();
        }
      }
      this.element.inject(this.container);
      this.container.inject(this.bundle);
      return this;
    };

    TextBundle.prototype.setupEvents = function() {
      var change, lastInput,
        _this = this;
      lastInput = this.get();
      change = function() {
        var value;
        value = _this.$get();
        _this.set(value);
        lastInput = value;
        return _this.fireEvent("change", value);
      };
      this.element.addEvent("change", change);
      this.element.addEvent("keyup", change);
      store.addEvent(this.params.name, function() {
        var value;
        value = _this.get();
        if (value !== lastInput) {
          _this.$set(value);
          return _this.fireEvent("change", value);
        }
      });
      if ((this.params.enableKey != null) && (this.params.enableValue != null)) {
        store.addEvent(this.params.enableKey, function() {
          if (_this.shouldBeEnabled(_this.params.enableValue, store.get(_this.params.enableKey))) {
            return _this.enable();
          } else {
            return _this.disable();
          }
        });
      }
      return this;
    };

    TextBundle.prototype.get = function() {
      var value;
      value = store.get(this.params.name);
      if (typeOf(value) !== "string") {
        this.set(this.params["default"]);
        return this.params["default"];
      } else {
        return value;
      }
    };

    TextBundle.prototype.set = function(value) {
      if (typeOf(value) === "string") {
        store.set(this.params.name, value);
      } else {
        store.set(this.params.name, this.params["default"]);
      }
      return this;
    };

    TextBundle.prototype.$get = function() {
      return this.element.get("value");
    };

    TextBundle.prototype.$set = function(value) {
      this.element.set("value", value);
      return this;
    };

    TextBundle.prototype.enable = function() {
      this.bundle.removeClass("disabled");
      this.element.set("disabled", false);
      return this;
    };

    TextBundle.prototype.disable = function() {
      this.bundle.addClass("disabled");
      this.element.set("disabled", true);
      return this;
    };

    return TextBundle;

  })(Bundle);

  NumberBundle = (function(_super) {

    __extends(NumberBundle, _super);

    function NumberBundle() {
      this.disable = __bind(this.disable, this);

      this.enable = __bind(this.enable, this);

      this.$set = __bind(this.$set, this);

      this.$get = __bind(this.$get, this);

      this.set = __bind(this.set, this);

      this.get = __bind(this.get, this);

      this.setupEvents = __bind(this.setupEvents, this);

      this.setupDOM = __bind(this.setupDOM, this);

      this.createDOM = __bind(this.createDOM, this);
      return NumberBundle.__super__.constructor.apply(this, arguments);
    }

    NumberBundle.prototype.createDOM = function() {
      this.bundle = new Element("div", {
        "class": "setting bundle number"
      });
      this.container = new Element("div", {
        "class": "setting container number"
      });
      this.element = new Element("input", {
        "class": "setting element number",
        type: "number"
      });
      this.label = new Element("label", {
        "class": "setting label number"
      });
      return this;
    };

    NumberBundle.prototype.setupDOM = function() {
      if (this.params.label != null) {
        this.label.set("html", this.params.label);
        this.label.inject(this.container);
        this.searchString += "" + this.params.label + "•";
      }
      if (this.params.placeholder != null) {
        this.element.set("placeholder", this.params.placeholder);
        this.searchString += "" + this.params.placeholder + "•";
      }
      if (this.params.min != null) {
        this.element.set("min", this.params.min);
      }
      if (this.params.max != null) {
        this.element.set("max", this.params.max);
      }
      if (this.params.step != null) {
        this.element.set("step", this.params.step);
      }
      this.check("default", "number", this.params["default"], this.params.name);
      this.$set(this.get());
      if (this.params.disabled) {
        this.disable();
      }
      if ((this.params.enableKey != null) && (this.params.enableValue != null)) {
        if (this.shouldBeEnabled(this.params.enableValue, store.get(this.params.enableKey))) {
          this.enable();
        } else {
          this.disable();
        }
      }
      this.element.inject(this.container);
      this.container.inject(this.bundle);
      return this;
    };

    NumberBundle.prototype.setupEvents = function() {
      var change, lastInput,
        _this = this;
      lastInput = this.get();
      change = function() {
        var value;
        value = _this.$get();
        _this.set(value);
        lastInput = value;
        return _this.fireEvent("change", value);
      };
      this.element.addEvent("change", change);
      this.element.addEvent("keyup", change);
      store.addEvent(this.params.name, function() {
        var value;
        value = _this.get();
        if (value !== lastInput) {
          _this.$set(value);
          return _this.fireEvent("change", value);
        }
      });
      if ((this.params.enableKey != null) && (this.params.enableValue != null)) {
        store.addEvent(this.params.enableKey, function() {
          if (_this.shouldBeEnabled(_this.params.enableValue, store.get(_this.params.enableKey))) {
            return _this.enable();
          } else {
            return _this.disable();
          }
        });
      }
      return this;
    };

    NumberBundle.prototype.get = function() {
      var value;
      value = store.get(this.params.name);
      if (typeOf(value) !== "number") {
        this.set(this.params["default"]);
        return this.params["default"];
      } else {
        return value;
      }
    };

    NumberBundle.prototype.set = function(value) {
      if (typeOf(value) === "number") {
        store.set(this.params.name, value);
      } else {
        store.set(this.params.name, this.params["default"]);
      }
      return this;
    };

    NumberBundle.prototype.$get = function() {
      return Number(this.element.get("value"));
    };

    NumberBundle.prototype.$set = function(value) {
      this.element.set("value", value);
      return this;
    };

    NumberBundle.prototype.enable = function() {
      this.bundle.removeClass("disabled");
      this.element.set("disabled", false);
      return this;
    };

    NumberBundle.prototype.disable = function() {
      this.bundle.addClass("disabled");
      this.element.set("disabled", true);
      return this;
    };

    return NumberBundle;

  })(Bundle);

  TextareaBundle = (function(_super) {

    __extends(TextareaBundle, _super);

    function TextareaBundle() {
      this.disable = __bind(this.disable, this);

      this.enable = __bind(this.enable, this);

      this.$set = __bind(this.$set, this);

      this.$get = __bind(this.$get, this);

      this.set = __bind(this.set, this);

      this.get = __bind(this.get, this);

      this.setupEvents = __bind(this.setupEvents, this);

      this.setupDOM = __bind(this.setupDOM, this);

      this.createDOM = __bind(this.createDOM, this);
      return TextareaBundle.__super__.constructor.apply(this, arguments);
    }

    TextareaBundle.prototype.createDOM = function() {
      this.bundle = new Element("div", {
        "class": "setting bundle textarea"
      });
      this.container = new Element("div", {
        "class": "setting container textarea"
      });
      this.element = new Element("textarea", {
        "class": "setting element textarea"
      });
      this.label = new Element("label", {
        "class": "setting label textarea"
      });
      return this;
    };

    TextareaBundle.prototype.setupDOM = function() {
      if (this.params.label != null) {
        this.label.set("html", this.params.label);
        this.label.inject(this.container);
        this.searchString += "" + this.params.label + "•";
      }
      if (this.params.placeholder != null) {
        this.element.set("placeholder", this.params.placeholder);
        this.searchString += "" + this.params.placeholder + "•";
      }
      this.check("default", "string", this.params["default"], this.params.name);
      this.$set(this.get());
      if (this.params.disabled) {
        this.disable();
      }
      if ((this.params.enableKey != null) && (this.params.enableValue != null)) {
        if (this.shouldBeEnabled(this.params.enableValue, store.get(this.params.enableKey))) {
          this.enable();
        } else {
          this.disable();
        }
      }
      this.element.inject(this.container);
      this.container.inject(this.bundle);
      return this;
    };

    TextareaBundle.prototype.setupEvents = function() {
      var change, lastInput,
        _this = this;
      lastInput = this.get();
      change = function() {
        var value;
        value = _this.$get();
        _this.set(value);
        lastInput = value;
        return _this.fireEvent("change", value);
      };
      this.element.addEvent("change", change);
      this.element.addEvent("keyup", change);
      store.addEvent(this.params.name, function() {
        var value;
        value = _this.get();
        if (value !== lastInput) {
          _this.$set(value);
          return _this.fireEvent("change", value);
        }
      });
      if ((this.params.enableKey != null) && (this.params.enableValue != null)) {
        store.addEvent(this.params.enableKey, function() {
          if (_this.shouldBeEnabled(_this.params.enableValue, store.get(_this.params.enableKey))) {
            return _this.enable();
          } else {
            return _this.disable();
          }
        });
      }
      return this;
    };

    TextareaBundle.prototype.get = function() {
      var value;
      value = store.get(this.params.name);
      if (typeOf(value) !== "string") {
        this.set(this.params["default"]);
        return this.params["default"];
      } else {
        return value;
      }
    };

    TextareaBundle.prototype.set = function(value) {
      if (typeOf(value) === "string") {
        store.set(this.params.name, value);
      } else {
        store.set(this.params.name, this.params["default"]);
      }
      return this;
    };

    TextareaBundle.prototype.$get = function() {
      return this.element.get("value");
    };

    TextareaBundle.prototype.$set = function(value) {
      this.element.set("value", value);
      return this;
    };

    TextareaBundle.prototype.enable = function() {
      this.bundle.removeClass("disabled");
      this.element.set("disabled", false);
      return this;
    };

    TextareaBundle.prototype.disable = function() {
      this.bundle.addClass("disabled");
      this.element.set("disabled", true);
      return this;
    };

    return TextareaBundle;

  })(Bundle);

  PushButtonBundle = (function(_super) {

    __extends(PushButtonBundle, _super);

    function PushButtonBundle() {
      this.disable = __bind(this.disable, this);

      this.enable = __bind(this.enable, this);

      this.setupEvents = __bind(this.setupEvents, this);

      this.setupDOM = __bind(this.setupDOM, this);

      this.createDOM = __bind(this.createDOM, this);
      return PushButtonBundle.__super__.constructor.apply(this, arguments);
    }

    PushButtonBundle.prototype.createDOM = function() {
      this.bundle = new Element("div", {
        "class": "setting bundle pushbutton"
      });
      this.container = new Element("div", {
        "class": "setting container pushbutton"
      });
      this.element = new Element("input", {
        "class": "setting element pushbutton",
        type: "button"
      });
      this.label = new Element("label", {
        "class": "setting label pushbutton"
      });
      return this;
    };

    PushButtonBundle.prototype.setupDOM = function() {
      if (this.params.label != null) {
        this.label.set("html", this.params.label);
        this.label.inject(this.container);
        this.searchString += "" + this.params.label + "•";
      }
      if (this.params.value != null) {
        this.element.set("value", this.params.value);
        this.searchString += "" + this.params.value + "•";
      }
      if (this.params.disabled) {
        this.disable();
      }
      if ((this.params.enableKey != null) && (this.params.enableValue != null)) {
        if (this.shouldBeEnabled(this.params.enableValue, store.get(this.params.enableKey))) {
          this.enable();
        } else {
          this.disable();
        }
      }
      this.element.inject(this.container);
      this.container.inject(this.bundle);
      return this;
    };

    PushButtonBundle.prototype.setupEvents = function() {
      var _this = this;
      this.element.addEvent("click", function() {
        return _this.fireEvent("click");
      });
      if ((this.params.enableKey != null) && (this.params.enableValue != null)) {
        store.addEvent(this.params.enableKey, function() {
          if (_this.shouldBeEnabled(_this.params.enableValue, store.get(_this.params.enableKey))) {
            return _this.enable();
          } else {
            return _this.disable();
          }
        });
      }
      return this;
    };

    PushButtonBundle.prototype.enable = function() {
      this.bundle.removeClass("disabled");
      this.element.set("disabled", false);
      return this;
    };

    PushButtonBundle.prototype.disable = function() {
      this.bundle.addClass("disabled");
      this.element.set("disabled", true);
      return this;
    };

    return PushButtonBundle;

  })(Bundle);

  window.Setting = Setting = (function() {

    function Setting(container) {
      this.container = container;
      this["new"] = __bind(this["new"], this);

    }

    Setting.prototype["new"] = function(params) {
      var bundle, types;
      types = {
        text: TextBundle,
        number: NumberBundle,
        textarea: TextareaBundle,
        pushButton: PushButtonBundle
      };
      if (types[params.type] != null) {
        bundle = new types[params.type](params);
        bundle.bundleContainer = this.container;
        bundle.bundle.inject(this.container);
        return bundle;
      } else {
        throw "Error: invalid type (" + params.type + ")";
      }
    };

    return Setting;

  })();

  /*
  `
  
    var store = new Store("settings");
    var Bundle = new Class({
      // Attributes:
      // - tab
      // - group
      // - name
      // - type
      //
      // Methods:
      //  - initialize
      //  - createDOM
      //  - setupDOM
      //  - addEvents
      //  - get
      //  - set
      "Implements": Events,
      
      "initialize": function (params) {
        this.params = params;
        this.searchString = "•" + this.params.tab + "•" + this.params.group + "•";
        
        this.createDOM();
        this.setupDOM();
        this.addEvents();
        
        if (this.params.name !== undefined) {
          this.set(store.get(this.params.name), true);
        }
        
        this.searchString = this.searchString.toLowerCase();
      },
      
      "addEvents": function () {
        this.element.addEvent("change", (function (event) {
          if (this.params.name !== undefined) {
            store.set(this.params.name, this.get());
          }
          
          this.fireEvent("action", this.get());
        }).bind(this));
      },
      
      "get": function () {
        return this.element.get("value");
      },
      
      "set": function (value, noChangeEvent) {
        this.element.set("value", value);
        
        if (noChangeEvent !== true) {
          this.element.fireEvent("change");
        }
        
        return this;
      }
    });
    
    Bundle.Description = new Class({
      // text
      "Extends": Bundle,
      "addEvents": undefined,
      "get": undefined,
      "set": undefined,
      
      "initialize": function (params) {
        this.params = params;
        this.searchString = "";
        
        this.createDOM();
        this.setupDOM();
      },
      
      "createDOM": function () {
        this.bundle = new Element("div", {
          "class": "setting bundle description"
        });
        
        this.container = new Element("div", {
          "class": "setting container description"
        });
        
        this.element = new Element("p", {
          "class": "setting element description"
        });
      },
      
      "setupDOM": function () {
        if (this.params.text !== undefined) {
          this.element.set("html", this.params.text);
        }
        
        this.element.inject(this.container);
        this.container.inject(this.bundle);
      }
    });
    
    Bundle.Button = new Class({
      // label, text
      // action -> click
      "Extends": Bundle,
      "get": undefined,
      "set": undefined,
      
      "initialize": function (params) {
        this.params = params;
        this.searchString = "•" + this.params.tab + "•" + this.params.group + "•";
        
        this.createDOM();
        this.setupDOM();
        this.addEvents();
        
        this.searchString = this.searchString.toLowerCase();
      },
      
      "createDOM": function () {
        this.bundle = new Element("div", {
          "class": "setting bundle button"
        });
        
        this.container = new Element("div", {
          "class": "setting container button"
        });
        
        this.element = new Element("input", {
          "class": "setting element button",
          "type": "button"
        });
        
        this.label = new Element("label", {
          "class": "setting label button"
        });
      },
      
      "setupDOM": function () {
        if (this.params.label !== undefined) {
          this.label.set("html", this.params.label);
          this.label.inject(this.container);
          this.searchString += this.params.label + "•";
        }
        
        if (this.params.text !== undefined) {
          this.element.set("value", this.params.text);
          this.searchString += this.params.text + "•";
        }
        
        this.element.inject(this.container);
        this.container.inject(this.bundle);
      },
      
      "addEvents": function () {
        this.element.addEvent("click", (function () {
          this.fireEvent("action");
        }).bind(this));
      }
    });
    
    Bundle.Text = new Class({
      // label, text, masked, default
      // action -> change & keyup
      "Extends": Bundle,
      
      "createDOM": function () {
        this.bundle = new Element("div", {
          "class": "setting bundle text"
        });
        
        this.container = new Element("div", {
          "class": "setting container text"
        });
        
        this.element = new Element("input", {
          "class": "setting element text",
          "type": "text"
        });
        
        this.label = new Element("label", {
          "class": "setting label text"
        });
      },
      
      "setupDOM": function () {
        if (this.params.label !== undefined) {
          this.label.set("html", this.params.label);
          this.label.inject(this.container);
          this.searchString += this.params.label + "•";
        }
        
        if (this.params.text !== undefined) {
          this.element.set("placeholder", this.params.text);
          this.searchString += this.params.text + "•";
        }
        
        if (this.params.masked === true) {
          this.element.set("type", "password");
          this.searchString += "password" + "•";
        }
        
        if (this.params.default !== undefined) {
          if (!this.get()) {
            console.log("jop");
            this.set(this.default);
          }
        }
        
        this.element.inject(this.container);
        this.container.inject(this.bundle);
      },
      
      "addEvents": function () {
        var change = (function (event) {
          if (this.params.name !== undefined) {
            store.set(this.params.name, this.get());
          }
          
          this.fireEvent("action", this.get());
        }).bind(this);
        
        this.element.addEvent("change", change);
        this.element.addEvent("keyup", change);
      }
    });
    
    Bundle.Checkbox = new Class({
      // label
      // action -> change
      "Extends": Bundle,
      
      "createDOM": function () {
        this.bundle = new Element("div", {
          "class": "setting bundle checkbox"
        });
        
        this.container = new Element("div", {
          "class": "setting container checkbox"
        });
        
        this.element = new Element("input", {
          "id": String.uniqueID(),
          "class": "setting element checkbox",
          "type": "checkbox",
          "value": "true"
        });
        
        this.label = new Element("label", {
          "class": "setting label checkbox",
          "for": this.element.get("id")
        });
      },
      
      "setupDOM": function () {
        this.element.inject(this.container);
        this.container.inject(this.bundle);
        
        if (this.params.label !== undefined) {
          this.label.set("html", this.params.label);
          this.label.inject(this.container);
          this.searchString += this.params.label + "•";
        }
      },
      
      "get": function () {
        return this.element.get("checked");
      },
      
      "set": function (value, noChangeEvent) {
        this.element.set("checked", value);
        
        if (noChangeEvent !== true) {
          this.element.fireEvent("change");
        }
        
        return this;
      }
    });
    
    Bundle.Slider = new Class({
      // label, max, min, step, display, displayModifier
      // action -> change
      "Extends": Bundle,
      
      "initialize": function (params) {
        this.params = params;
        this.searchString = "•" + this.params.tab + "•" + this.params.group + "•";
        
        this.createDOM();
        this.setupDOM();
        this.addEvents();
        
        if (this.params.name !== undefined) {
          this.set((store.get(this.params.name) || 0), true);
        } else {
          this.set(0, true);
        }
        
        this.searchString = this.searchString.toLowerCase();
      },
      
      "createDOM": function () {
        this.bundle = new Element("div", {
          "class": "setting bundle slider"
        });
        
        this.container = new Element("div", {
          "class": "setting container slider"
        });
        
        this.element = new Element("input", {
          "class": "setting element slider",
          "type": "range"
        });
        
        this.label = new Element("label", {
          "class": "setting label slider"
        });
        
        this.display = new Element("span", {
          "class": "setting display slider"
        });
      },
      
      "setupDOM": function () {
        if (this.params.label !== undefined) {
          this.label.set("html", this.params.label);
          this.label.inject(this.container);
          this.searchString += this.params.label + "•";
        }
        
        if (this.params.max !== undefined) {
          this.element.set("max", this.params.max);
        }
        
        if (this.params.min !== undefined) {
          this.element.set("min", this.params.min);
        }
        
        if (this.params.step !== undefined) {
          this.element.set("step", this.params.step);
        }
        
        this.element.inject(this.container);
        if (this.params.display === true) {
          if (this.params.displayModifier !== undefined) {
            this.display.set("text", this.params.displayModifier(0));
          } else {
            this.display.set("text", 0);
          }
          this.display.inject(this.container);
        }
        this.container.inject(this.bundle);
      },
      
      "addEvents": function () {
        this.element.addEvent("change", (function (event) {
          if (this.params.name !== undefined) {
            store.set(this.params.name, this.get());
          }
          
          if (this.params.displayModifier !== undefined) {
            this.display.set("text", this.params.displayModifier(this.get()));
          } else {
            this.display.set("text", this.get());
          }
          this.fireEvent("action", this.get());
        }).bind(this));
      },
      
      "get": function () {
        return Number.from(this.element.get("value"));
      },
      
      "set": function (value, noChangeEvent) {
        this.element.set("value", value);
        
        if (noChangeEvent !== true) {
          this.element.fireEvent("change");
        } else {
          if (this.params.displayModifier !== undefined) {
            this.display.set("text", this.params.displayModifier(Number.from(value)));
          } else {
            this.display.set("text", Number.from(value));
          }
        }
        
        return this;
      }
    });
    
    Bundle.PopupButton = new Class({
      // label, options[{value, text}]
      // action -> change
      "Extends": Bundle,
      
      "createDOM": function () {
        this.bundle = new Element("div", {
          "class": "setting bundle popup-button"
        });
        
        this.container = new Element("div", {
          "class": "setting container popup-button"
        });
        
        this.element = new Element("select", {
          "class": "setting element popup-button"
        });
        
        this.label = new Element("label", {
          "class": "setting label popup-button"
        });
        
        if (this.params.options === undefined) { return; }
  
        // convert array syntax into object syntax for options
        function arrayToObject(option) {
          if (typeOf(option) == "array") {
            option = {
              "value": option[0],
              "text": option[1] || option[0],
            };
          }
          return option;
        }
  
        // convert arrays
        if (typeOf(this.params.options) == "array") {
          var values = [];
          this.params.options.each((function(values, option) {
            values.push(arrayToObject(option));
          }).bind(this, values));
          this.params.options = { "values": values };
        }
  
        var groups;
        if (this.params.options.groups !== undefined) {
          groups = {};
          this.params.options.groups.each((function (groups, group) {
            this.searchString += (group) + "•";
            groups[group] = (new Element("optgroup", {
              "label": group,
            }).inject(this.element));
          }).bind(this, groups));
        }
  
        if (this.params.options.values !== undefined) {
          this.params.options.values.each((function(groups, option) {
            option = arrayToObject(option);
            this.searchString += (option.text || option.value) + "•";
  
            // find the parent of this option - either a group or the main element
            var parent;
            if (option.group && this.params.options.groups) {
              if ((option.group - 1) in this.params.options.groups) {
                option.group = this.params.options.groups[option.group-1];
              }
              if (option.group in groups) {
                parent = groups[option.group];
              }
              else {
                parent = this.element;
              }
            }
            else {
              parent = this.element;
            }
  
            (new Element("option", {
              "value": option.value,
              "text": option.text || option.value,
            })).inject(parent);
          }).bind(this, groups));
        }
      },
      
      "setupDOM": function () {
        if (this.params.label !== undefined) {
          this.label.set("html", this.params.label);
          this.label.inject(this.container);
          this.searchString += this.params.label + "•";
        }
        
        this.element.inject(this.container);
        this.container.inject(this.bundle);
      }
    });
    
    Bundle.ListBox = new Class({
      // label, options[{value, text}]
      // action -> change
      "Extends": Bundle.PopupButton,
      
      "createDOM": function () {
        this.bundle = new Element("div", {
          "class": "setting bundle list-box"
        });
        
        this.container = new Element("div", {
          "class": "setting container list-box"
        });
        
        this.element = new Element("select", {
          "class": "setting element list-box",
          "size": "2"
        });
        
        this.label = new Element("label", {
          "class": "setting label list-box"
        });
        
        if (this.params.options === undefined) { return; }
        this.params.options.each((function (option) {
          this.searchString += (option[1] || option[0]) + "•";
          
          (new Element("option", {
            "value": option[0],
            "text": option[1] || option[0]
          })).inject(this.element);
        }).bind(this));
      },
      
      "get": function () {
        return (this.element.get("value") || undefined);
      }
    });
    
    Bundle.RadioButtons = new Class({
      // label, options[{value, text}]
      // action -> change
      "Extends": Bundle,
      
      "createDOM": function () {
        var settingID = String.uniqueID();
        
        this.bundle = new Element("div", {
          "class": "setting bundle radio-buttons"
        });
        
        this.label = new Element("label", {
          "class": "setting label radio-buttons"
        });
        
        this.containers = [];
        this.elements = [];
        this.labels = [];
        
        if (this.params.options === undefined) { return; }
        this.params.options.each((function (option) {
          this.searchString += (option[1] || option[0]) + "•";
          
          var optionID = String.uniqueID();
          var container = (new Element("div", {
            "class": "setting container radio-buttons"
          })).inject(this.bundle);
          this.containers.push(container);
          
          this.elements.push((new Element("input", {
            "id": optionID,
            "name": settingID,
            "class": "setting element radio-buttons",
            "type": "radio",
            "value": option[0]
          })).inject(container));
          
          this.labels.push((new Element("label", {
            "class": "setting element-label radio-buttons",
            "for": optionID,
            "text": option[1] || option[0]
          })).inject(container));
        }).bind(this));
      },
      
      "setupDOM": function () {
        if (this.params.label !== undefined) {
          this.label.set("html", this.params.label);
          this.label.inject(this.bundle, "top");
          this.searchString += this.params.label + "•";
        }
      },
      
      "addEvents": function () {
        this.bundle.addEvent("change", (function (event) {
          if (this.params.name !== undefined) {
            store.set(this.params.name, this.get());
          }
          
          this.fireEvent("action", this.get());
        }).bind(this));
      },
      
      "get": function () {
        var checkedEl = this.elements.filter((function (el) {
          return el.get("checked");
        }).bind(this));
        return (checkedEl[0] && checkedEl[0].get("value"));
      },
      
      "set": function (value, noChangeEvent) {
        var desiredEl = this.elements.filter((function (el) {
          return (el.get("value") === value);
        }).bind(this));
        desiredEl[0] && desiredEl[0].set("checked", true);
        
        if (noChangeEvent !== true) {
          this.bundle.fireEvent("change");
        }
        
        return this;
      }
    });
    
  
  
  `
  */


}).call(this);
