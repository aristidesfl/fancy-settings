###
## Fancy Settings by Frank Kohlhepp
## Copyright (c) 2011 - 2012 Frank Kohlhepp
## https://github.com/frankkohlhepp/fancy-settings
## License: LGPL v2.1
###
window.FancySettings = class FancySettings
  constructor: (@name) ->
    @tabs = {}
    @settings = {}
    
    $("title").set "text", @name
    $("name").set "text", @name
    
    $("search-tab").set "text", i18n.get "Search"
    $("search-label").set "text", i18n.get "Search"
    $("search").set "placeholder", i18n.get("Search") + "..."
    
    @tab = new Tab $("tab-container"), $("content")
    @search = new Search $("search"), $("search-tab-content")
  
  getTab: (name) =>
    return @tabs[name] if @tabs[name]?
    
    # Create new tab
    tab = {groups: {}}
    tab.content = @tab.new()
    
    tab.content.tab.set "text", name
    @search.bind tab.content.tab
    
    tab.content = tab.content.content
    (new Element "h2",
      class: "tab-name"
      text: name
    ).inject tab.content
    
    tab.settings = ((new Element "div",
      class: "tab-settings"
    ).inject tab.content)
    
    @tabs[name] = tab
  
  getGroup: (name, tabName) =>
    tab = @getTab tabName
    return tab.groups[name] if tab.groups[name]?
    
    # Create new group
    group = {}
    
    group.content = ((new Element "div",
      class: "setting group"
    ).inject tab.settings)
    
    (new Element "div",
      class: "setting group-name"
      text: name
    ).inject group.content
    
    group.content = ((new Element "div",
      class: "setting group-content"
    ).inject group.content)
    
    group.setting = new Setting group.content
    tab.groups[name] = group
  
  new: (params) =>
    group = @getGroup params.group, params.tab
    
    # Create and index the setting
    setting = group.setting.new params
    @settings[params.name] = setting
    @search.add setting
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
          setting.search.element.setStyle "margin-left", (maxWidth - width + 2) + "px"
        else
          setting.element.setStyle "margin-left", (maxWidth - width) + "px"
          setting.search.element.setStyle "margin-left", (maxWidth - width) + "px"
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
