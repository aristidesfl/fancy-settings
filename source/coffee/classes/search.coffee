###
## Fancy Settings by Frank Kohlhepp
## Copyright (c) 2011 - 2012 Frank Kohlhepp
## https://github.com/frankkohlhepp/fancy-settings
## License: LGPL v2.1
###
window.Search = class Search
  constructor: (@search) ->
    @settings = []
    
    find = =>
      @find @search.get "value"
    
    @search.addEvent "keyup", (event) =>
      if event.key == "esc"
        @reset()
      else
        find()
    
    @search.addEventListener "search", find, false
  
  bind: (tab) =>
    tab.addEvent "click", @reset
    this
  
  index: (setting) =>
    @settings.push setting
    this
  
  find: (searchString) =>
    # Exit search mode
    if !searchString.trim()
      document.html.removeClass "searching"
      return this
    
    # Or enter search mode
    
    # Reset results
    $("nothing-found").removeClass "match"
    @settings.each (setting) =>
      setting.bundle.removeClass "match"
      setting.group.removeClass "match"
      setting.tab.content.removeClass "match"
    document.html.addClass "searching"
    
    # Filter settings
    results = @settings.filter (setting) =>
      if setting.searchString.toLowerCase().contains searchString.trim().toLowerCase()
        true
      else
        false
    
    # Display results
    if !results.length
      $("nothing-found").addClass "match"
    else
      results.each (setting) =>
        setting.bundle.addClass "match"
        setting.group.addClass "match"
        setting.tab.content.addClass "match"
    
    this
  
  reset: =>
    @search.set "value", ""
    @search.blur()
    @find ""
