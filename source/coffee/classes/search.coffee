###
## Fancy Settings by Frank Kohlhepp
## Copyright (c) 2011 - 2012 Frank Kohlhepp
## https://github.com/frankkohlhepp/fancy-settings
## License: LGPL v2.1
###
window.Search = class Search
  constructor: (@search, @searchResultContainer) ->
    @index = []
    @groups = {}
    
    @setting = new Setting new Element "div"
    
    # Create setting for message "nothing found"
    setting = new Setting @searchResultContainer
    @nothingFound = setting.new
      type: "description"
      text: i18n.get "No matches were found."
    
    @nothingFound.bundle.set "id", "nothing-found"
    
    # Create event handlers
    find = (event) =>
      @find event.target.get "value"
    
    @search.addEvent "keyup", =>
      if event.key == "esc"
        @reset()
      else
        find(event)
    
    @search.addEventListener "search", find, false
  
  bind: (tab) =>
    tab.addEvent "click", @reset
  
  add: (setting) =>
    searchSetting = @setting.new setting.params
    setting.search = searchSetting
    searchSetting.original = setting
    @index.push searchSetting
    
    setting.addEvent "action", (value, stopPropagation) =>
      if searchSetting.set != undefined && stopPropagation != true
        searchSetting.set value, true
    
    searchSetting.addEvent "action", (value) =>
      if setting.set != undefined
        setting.set value, true
      setting.fireEvent "action", [value, true]
  
  find: (searchString) =>
    # Exit search mode
    if searchString.trim() == ""
      document.html.removeClass "searching"
      return
    
    # Or enter search mode
    @index.each (setting) => setting.bundle.dispose()
    Object.each @groups, (group) => group.dispose()
    document.html.addClass "searching"
    
    # Filter settings
    result = @index.filter (setting) =>
      if setting.params.searchString.contains searchString.trim().toLowerCase()
        return true
      else
        return false
    
    # Display settings
    result.each (setting) =>
      # Create group if it doesn't exist already
      if @groups[setting.params.group] == undefined
        @groups[setting.params.group] = (new Element "div",
          class: "setting group"
        ).inject @searchResultContainer
        
        group = @groups[setting.params.group]
        
        (new Element "td",
          class: "setting group-name"
          text: setting.params.group
        ).inject group
        
        group.settings = (new Element "div",
          class: "setting group-content"
        ).inject group
        
        group.content = (new Element "td",
          class: "setting group-content"
        ).inject group.settings
      else
        group = @groups[setting.params.group].inject @searchResultContainer
      
      setting.bundle.inject group.content
    
    if result.length == 0
      @nothingFound.bundle.addClass "show"
    else
      @nothingFound.bundle.removeClass "show"
  
  reset: =>
    @search.set "value", ""
    @search.blur()
    @find("")
