###
## Fancy Settings by Frank Kohlhepp
## Copyright (c) 2011 - 2012 Frank Kohlhepp
## https://github.com/frankkohlhepp/fancy-settings
## License: MIT-license
###
window.FancySettings = class FancySettings
  constructor: (@name) ->
    @tabs = {}
    @settings = {}
    
    $("title").set "text", @name
    $("name").set "text", @name
    
    $("search-tab").set "text", i18n.get "Search"
    $("search-tab-name").set "text", i18n.get "Search Results"
    $("search").set "placeholder", i18n.get("Search") + "..."
    $("nothing-found").set "text", i18n.get "No matches were found."
    
    @tab = new Tab $("tab-container"), $("content")
    @search = new Search $("search")
  
  getTab: (name) =>
    return @tabs[name] if @tabs[name]?
    
    # Create new tab
    tab = @tab.new()
    tab.groups = {}
    
    tab.tab.set "text", name
    @search.bind tab.tab
    
    tab.content.name = (new Element "h2",
      class: "tab-name"
      text: name
    ).inject tab.content
    
    tab.content.settings = (new Element "div",
      class: "tab-settings"
    ).inject tab.content
    
    @tabs[name] = tab
  
  getGroup: (name, tab) =>
    return tab.groups[name] if tab.groups[name]?
    
    # Create new group
    group = (new Element "div",
      class: "setting group"
    ).inject tab.content.settings
    
    group.name = (new Element "div",
      class: "setting group-name"
      text: name
    ).inject group
    
    group.content = (new Element "div",
      class: "setting group-content"
    ).inject group
    
    group.setting = new Setting group.content
    tab.groups[name] = group
  
  check: (param, value) =>
    success = typeOf(value) is "string" and !!value
    throw """Error: "#{param}" is a required parameter. Check your manifest!""" unless success
    this
  
  new: (params) =>
    # Check required basic values
    @check "tab", params.tab
    @check "group", params.group
    @check "name", params.name
    @check "type", params.type
    
    tab = @getTab params.tab
    group = @getGroup params.group, tab
    
    # Create and index the setting
    setting = group.setting.new params
    setting.tab = tab
    setting.group = group
    
    @settings[params.name] = setting
    @search.index setting
    setting
  
  align: (settings) =>
    
    settings = settings.map (name) =>
      @settings[name]
    
    types = [
      "text"
      "button"
      "slider"
      "popupButton"
    ]
    
    type = settings[0].params.type
    maxWidth = 0
    
    unless types.contains type
      throw "invalidType"
    
    document.html.addClass "measuring"
    settings.each (setting) ->
      if setting.params.type != type
        throw "multipleTypes"
      
      
      width = setting.label.offsetWidth
      if width > maxWidth
        maxWidth = width
      
    
    
    
    settings.each (setting) ->
      width = setting.label.offsetWidth
      if width < maxWidth
        if type == "button" or type == "slider"
          setting.element.setStyle "margin-left", (maxWidth - width + 2) + "px"
          #setting.search.element.setStyle "margin-left", (maxWidth - width + 2) + "px"
        else
          setting.element.setStyle "margin-left", (maxWidth - width) + "px"
          #setting.search.element.setStyle "margin-left", (maxWidth - width) + "px"
    document.html.removeClass "measuring"


FancySettings.initWithManifest = (callback) ->
  fancySettings = new FancySettings manifest.name
  
  manifest.settings.each (params) =>
    fancySettings.new params
  
  if manifest.alignment?
    manifest.alignment.each (group) =>
      fancySettings.align group
  
  callback fancySettings if callback?
  this
