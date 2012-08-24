###
## Fancy Settings by Frank Kohlhepp
## Copyright (c) 2011 - 2012 Frank Kohlhepp
## https://github.com/frankkohlhepp/fancy-settings
## License: MIT-license
###
store = new Store "settings", null, 70

class Bundle
  constructor: (@params) ->
    @events = {}
    @searchString = "•#{@params.tab}•#{@params.group}•"
    
    @createDOM()
    @setupDOM()
    @setupEvents()
    
    @searchString = @searchString.toLowerCase()
  
  check: (param, type, value, setting) =>
    unless typeOf(value) is type
      throw """Error: #{param} is a required parameter (type: #{type}) for the setting "#{setting}". Check your manifest!"""
    this
  
  shouldBeEnabled: (enableValue, value) =>
    if typeOf(enableValue) is "function"
      !!enableValue value
    else
      enableValue is value
  
  addEvent: (type, callback) =>
    @events[type] ?= []
    @events[type].include(callback)
    this
  
  removeEvent: (type, callback) =>
    @events[type]?.erase callback
    delete @events[type] if !@events[type]?.length
    this
  
  fireEvent: (type, value) =>
    @events[type]?.each (callback) =>
      callback value, type
    this

class TextBundle extends Bundle
  # label, placeholder, masked, default
  # disabled, enableKey, enableValue
  #
  # Events: change
  
  createDOM: =>
    @bundle = new Element "div",
      class: "setting bundle text"
    
    @container = new Element "div",
      class: "setting container text"
    
    @element = new Element "input",
      class: "setting element text"
      type: "text"
    
    @label = new Element "label",
      class: "setting label text"
    
    this
  
  setupDOM: =>
    if @params.label?
      @label.set "html", @params.label
      @label.inject @container
      @searchString += "#{@params.label}•"
    
    if @params.placeholder?
      @element.set "placeholder", @params.placeholder
      @searchString += "#{@params.placeholder}•"
    
    if @params.masked
      @element.set "type", "password"
      @searchString += "password•"
    
    @check "default", "string", @params.default, @params.name
    @$set @get()
    
    if @params.disabled
      @disable()
    
    if @params.enableKey? and @params.enableValue?
      if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
        @enable()
      else
        @disable()
    
    @element.inject @container
    @container.inject @bundle
    
    this
  
  setupEvents: =>
    lastInput = @get()
    
    change = =>
      value = @$get()
      @set value
      lastInput = value
      @fireEvent "change", value
    
    @element.addEvent "change", change
    @element.addEvent "keyup", change
    
    store.addEvent @params.name, =>
      value = @get()
      if value isnt lastInput
        @$set value
        @fireEvent "change", value
    
    if @params.enableKey? and @params.enableValue?
      store.addEvent @params.enableKey, =>
        if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
          @enable()
        else
          @disable()
    
    this
  
  get: =>
    value = store.get @params.name
    if typeOf(value) isnt "string"
      @set @params.default
      @params.default
    else
      value
  
  set: (value) =>
    if typeOf(value) is "string"
      store.set @params.name, value
    else
      store.set @params.name, @params.default
    this
  
  $get: =>
    @element.get "value"
  
  $set: (value) =>
    @element.set "value", value
    this
  
  enable: =>
    @bundle.removeClass "disabled"
    @element.set "disabled", false
    this
  
  disable: =>
    @bundle.addClass "disabled"
    @element.set "disabled", true
    this

class NumberBundle extends Bundle
  # label, placeholder, min, max, step, default
  # disabled, enableKey, enableValue
  #
  # Events: change
  
  createDOM: =>
    @bundle = new Element "div",
      class: "setting bundle number"
    
    @container = new Element "div",
      class: "setting container number"
    
    @element = new Element "input",
      class: "setting element number"
      type: "number"
    
    @label = new Element "label",
      class: "setting label number"
    
    this
  
  setupDOM: =>
    if @params.label?
      @label.set "html", @params.label
      @label.inject @container
      @searchString += "#{@params.label}•"
    
    if @params.placeholder?
      @element.set "placeholder", @params.placeholder
      @searchString += "#{@params.placeholder}•"
    
    if @params.min?
      @element.set "min", @params.min
    
    if @params.max?
      @element.set "max", @params.max
    
    if @params.step?
      @element.set "step", @params.step
    
    @check "default", "number", @params.default, @params.name
    @$set @get()
    
    if @params.disabled
      @disable()
    
    if @params.enableKey? and @params.enableValue?
      if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
        @enable()
      else
        @disable()
    
    @element.inject @container
    @container.inject @bundle
    
    this
  
  setupEvents: =>
    lastInput = @get()
    
    change = =>
      value = @$get()
      @set value
      lastInput = value
      @fireEvent "change", value
    
    @element.addEvent "change", change
    @element.addEvent "keyup", change
    
    store.addEvent @params.name, =>
      value = @get()
      if value isnt lastInput
        @$set value
        @fireEvent "change", value
    
    if @params.enableKey? and @params.enableValue?
      store.addEvent @params.enableKey, =>
        if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
          @enable()
        else
          @disable()
    
    this
  
  get: =>
    value = store.get @params.name
    if typeOf(value) isnt "number"
      @set @params.default
      @params.default
    else
      value
  
  set: (value) =>
    if typeOf(value) is "number"
      store.set @params.name, value
    else
      store.set @params.name, @params.default
    this
  
  $get: =>
    Number @element.get "value"
  
  $set: (value) =>
    @element.set "value", value
    this
  
  enable: =>
    @bundle.removeClass "disabled"
    @element.set "disabled", false
    this
  
  disable: =>
    @bundle.addClass "disabled"
    @element.set "disabled", true
    this

class TextareaBundle extends Bundle
  # label, placeholder, default
  # disabled, enableKey, enableValue
  #
  # Events: change
  
  createDOM: =>
    @bundle = new Element "div",
      class: "setting bundle textarea"
    
    @container = new Element "div",
      class: "setting container textarea"
    
    @element = new Element "textarea",
      class: "setting element textarea"
    
    @label = new Element "label",
      class: "setting label textarea"
    
    this
  
  setupDOM: =>
    if @params.label?
      @label.set "html", @params.label
      @label.inject @container
      @searchString += "#{@params.label}•"
    
    if @params.placeholder?
      @element.set "placeholder", @params.placeholder
      @searchString += "#{@params.placeholder}•"
    
    @check "default", "string", @params.default, @params.name
    @$set @get()
    
    if @params.disabled
      @disable()
    
    if @params.enableKey? and @params.enableValue?
      if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
        @enable()
      else
        @disable()
    
    @element.inject @container
    @container.inject @bundle
    
    this
  
  setupEvents: =>
    lastInput = @get()
    
    change = =>
      value = @$get()
      @set value
      lastInput = value
      @fireEvent "change", value
    
    @element.addEvent "change", change
    @element.addEvent "keyup", change
    
    store.addEvent @params.name, =>
      value = @get()
      if value isnt lastInput
        @$set value
        @fireEvent "change", value
    
    if @params.enableKey? and @params.enableValue?
      store.addEvent @params.enableKey, =>
        if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
          @enable()
        else
          @disable()
    
    this
  
  get: =>
    value = store.get @params.name
    if typeOf(value) isnt "string"
      @set @params.default
      @params.default
    else
      value
  
  set: (value) =>
    if typeOf(value) is "string"
      store.set @params.name, value
    else
      store.set @params.name, @params.default
    this
  
  $get: =>
    @element.get "value"
  
  $set: (value) =>
    @element.set "value", value
    this
  
  enable: =>
    @bundle.removeClass "disabled"
    @element.set "disabled", false
    this
  
  disable: =>
    @bundle.addClass "disabled"
    @element.set "disabled", true
    this

class PushButtonBundle extends Bundle
  # label, value
  # disabled, enableKey, enableValue
  #
  # Events: click
  
  createDOM: =>
    @bundle = new Element "div",
      class: "setting bundle pushbutton"
    
    @container = new Element "div",
      class: "setting container pushbutton"
    
    @element = new Element "input",
      class: "setting element pushbutton"
      type: "button"
    
    @label = new Element "label",
      class: "setting label pushbutton"
    
    this
  
  setupDOM: =>
    if @params.label?
      @label.set "html", @params.label
      @label.inject @container
      @searchString += "#{@params.label}•"
    
    if @params.value?
      @element.set "value", @params.value
      @searchString += "#{@params.value}•"
    
    if @params.disabled
      @disable()
    
    if @params.enableKey? and @params.enableValue?
      if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
        @enable()
      else
        @disable()
    
    @element.inject @container
    @container.inject @bundle
    
    this
  
  setupEvents: =>
    @element.addEvent "click", =>
      @fireEvent "click"
    
    if @params.enableKey? and @params.enableValue?
      store.addEvent @params.enableKey, =>
        if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
          @enable()
        else
          @disable()
    
    this
  
  enable: =>
    @bundle.removeClass "disabled"
    @element.set "disabled", false
    this
  
  disable: =>
    @bundle.addClass "disabled"
    @element.set "disabled", true
    this

class LabelBundle extends Bundle
  # label
  # disabled, enableKey, enableValue
  #
  # Events: (none)
  
  createDOM: =>
    @bundle = new Element "div",
      class: "setting bundle label"
    
    @container = new Element "div",
      class: "setting container label"
    
    @element = new Element "div",
      class: "setting element label"
    
    this
  
  setupDOM: =>
    @searchString = ""
    
    if @params.label?
      @element.set "html", @params.label
    
    if @params.disabled
      @disable()
    
    if @params.enableKey? and @params.enableValue?
      if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
        @enable()
      else
        @disable()
    
    @element.inject @container
    @container.inject @bundle
    
    this
  
  setupEvents: =>
    if @params.enableKey? and @params.enableValue?
      store.addEvent @params.enableKey, =>
        if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
          @enable()
        else
          @disable()
    
    this
  
  enable: =>
    @bundle.removeClass "disabled"
    this
  
  disable: =>
    @bundle.addClass "disabled"
    this

class CheckboxBundle extends Bundle
  # label, default
  # disabled, enableKey, enableValue
  #
  # Events: change
  
  createDOM: =>
    id = String.uniqueID()
    
    @bundle = new Element "div",
      class: "setting bundle checkbox"
    
    @container = new Element "div",
      class: "setting container checkbox"
    
    @element = new Element "input",
      id: id
      class: "setting element checkbox"
      type: "checkbox"
      value: "true"
    
    @label = new Element "label",
      class: "setting label checkbox"
      for: id
    
    this
  
  setupDOM: =>
    @element.inject @container
    @container.inject @bundle
    
    if @params.label?
      @label.set "html", @params.label
      @label.inject @container
      @searchString += "#{@params.label}•"
    
    @check "default", "boolean", @params.default, @params.name
    @$set @get()
    
    if @params.disabled
      @disable()
    
    if @params.enableKey? and @params.enableValue?
      if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
        @enable()
      else
        @disable()
    
    this
  
  setupEvents: =>
    lastInput = @get()
    
    @element.addEvent "change", =>
      value = @$get()
      @set value
      lastInput = value
      @fireEvent "change", value
    
    store.addEvent @params.name, =>
      value = @get()
      if value isnt lastInput
        @$set value
        @fireEvent "change", value
    
    if @params.enableKey? and @params.enableValue?
      store.addEvent @params.enableKey, =>
        if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
          @enable()
        else
          @disable()
    
    this
  
  get: =>
    value = store.get @params.name
    if typeOf(value) isnt "boolean"
      @set @params.default
      @params.default
    else
      value
  
  set: (value) =>
    if typeOf(value) is "boolean"
      store.set @params.name, value
    else
      store.set @params.name, @params.default
    this
  
  $get: =>
    @element.get "checked"
  
  $set: (value) =>
    @element.set "checked", value
    this
  
  enable: =>
    @bundle.removeClass "disabled"
    @element.set "disabled", false
    this
  
  disable: =>
    @bundle.addClass "disabled"
    @element.set "disabled", true
    this

class SliderBundle extends Bundle
  # label, min, max, step, display, displayModifier, default
  # disabled, enableKey, enableValue
  #
  # Events: change
  
  createDOM: =>
    @bundle = new Element "div",
      class: "setting bundle slider"
    
    @container = new Element "div",
      class: "setting container slider"
    
    @element = new Element "input",
      class: "setting element slider"
      type: "range"
    
    @label = new Element "label",
      class: "setting label slider"
    
    @display = new Element "span",
      class: "setting display slider"
    
    this
  
  setupDOM: =>
    if @params.label?
      @label.set "html", @params.label
      @label.inject @container
      @searchString += "#{@params.label}•"
    
    if @params.min?
      @element.set "min", @params.min
    
    if @params.max?
      @element.set "max", @params.max
    
    if @params.step?
      @element.set "step", @params.step
    
    @element.inject @container
    if @params.display
      @display.inject @container
    
    @check "default", "number", @params.default, @params.name
    @$set @get()
    
    if @params.disabled
      @disable()
    
    if @params.enableKey? and @params.enableValue?
      if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
        @enable()
      else
        @disable()
    
    @container.inject @bundle
    this
  
  setupEvents: =>
    lastInput = @get()
    
    @element.addEvent "change", =>
      value = @$get()
      @updateDisplay value
      @set value
      lastInput = value
      @fireEvent "change", value
    
    store.addEvent @params.name, =>
      value = @get()
      if value isnt lastInput
        @$set value
        @fireEvent "change", value
    
    if @params.enableKey? and @params.enableValue?
      store.addEvent @params.enableKey, =>
        if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
          @enable()
        else
          @disable()
    
    this
  
  get: =>
    value = store.get @params.name
    if typeOf(value) isnt "number"
      @set @params.default
      @params.default
    else
      value
  
  set: (value) =>
    if typeOf(value) is "number"
      store.set @params.name, value
    else
      store.set @params.name, @params.default
    this
  
  $get: =>
    Number @element.get "value"
  
  $set: (value) =>
    @element.set "value", value
    @updateDisplay value
    this
  
  enable: =>
    @bundle.removeClass "disabled"
    @element.set "disabled", false
    this
  
  disable: =>
    @bundle.addClass "disabled"
    @element.set "disabled", true
    this
  
  updateDisplay: (value) =>
    if @params.display
      if @params.displayModifier?
        @display.set "text", @params.displayModifier value
      else
        @display.set "text", value
    this

class PopupButtonBundle extends Bundle
  # label, options[[value, label, group*], ...], default
  # disabled, enableKey, enableValue
  #
  # Events: change
  
  constructor: (@params) ->
    @groups = {}
    super(@params)
  
  createDOM: =>
    @bundle = new Element "div",
      class: "setting bundle popupbutton"
    
    @container = new Element "div",
      class: "setting container popupbutton"
    
    @element = new Element "select",
      class: "setting element popupbutton"
    
    @label = new Element "label",
      class: "setting label popupbutton"
    
    this
  
  getGroup: (name) =>
    return @groups[name] if @groups[name]?
    
    # Create new group
    group = (new Element "optgroup",
      label: name
    ).inject @element
    @groups[name] = group
  
  setupDOM: =>
    if @params.label?
      @label.set "html", @params.label
      @label.inject @container
      @searchString += "#{@params.label}•"
    
    if @params.options?
      @params.options.each (params) =>
        option = new Element "option",
          value: params[0]
          text: params[1] or params[0]
        
        if params[2]?
          option.inject @getGroup params[2]
        else
          option.inject @element
    
    @check "default", "string", @params.default, @params.name
    @$set @get()
    
    if @params.disabled
      @disable()
    
    if @params.enableKey? and @params.enableValue?
      if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
        @enable()
      else
        @disable()
    
    @element.inject @container
    @container.inject @bundle
    
    this
  
  setupEvents: =>
    lastInput = @get()
    
    @element.addEvent "change", =>
      value = @$get()
      @set value
      lastInput = value
      @fireEvent "change", value
    
    store.addEvent @params.name, =>
      value = @get()
      if value isnt lastInput
        @$set value
        @fireEvent "change", value
    
    if @params.enableKey? and @params.enableValue?
      store.addEvent @params.enableKey, =>
        if @shouldBeEnabled @params.enableValue, store.get @params.enableKey
          @enable()
        else
          @disable()
    
    this
  
  get: =>
    value = store.get @params.name
    if typeOf(value) isnt "string"
      @set @params.default
      @params.default
    else
      value
  
  set: (value) =>
    if typeOf(value) is "string"
      store.set @params.name, value
    else
      store.set @params.name, @params.default
    this
  
  $get: =>
    @element.get "value"
  
  $set: (value) =>
    @element.set "value", value
    this
  
  enable: =>
    @bundle.removeClass "disabled"
    @element.set "disabled", false
    this
  
  disable: =>
    @bundle.addClass "disabled"
    @element.set "disabled", true
    this






























































































window.Setting = class Setting
  constructor: (@container) ->
  new: (params) =>
    # Available types
    types =
      text: TextBundle
      number: NumberBundle
      textarea: TextareaBundle
      pushButton: PushButtonBundle
      label: LabelBundle
      checkbox: CheckboxBundle
      slider: SliderBundle
      popupButton: PopupButtonBundle
    
    if types[params.type]?
      bundle = new types[params.type] params
      bundle.bundleContainer = @container
      bundle.bundle.inject @container
      bundle
    else
      throw "Error: invalid type (#{params.type})"







###
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
###