###
## Fancy Settings by Frank Kohlhepp
## Copyright (c) 2011 - 2012 Frank Kohlhepp
## https://github.com/frankkohlhepp/fancy-settings
## License: LGPL v2.1
###
class Bundle
  constructor: (@creator, @name) ->
    @tab = new Element "div", class: "tab"
    @content = new Element "div", class: "tab-content"
    @tab.addEvent "click", @setActive
  
  setActive: =>
    @creator.activeBundle?.unsetActive() unless @creator.activeBundle == this
    @tab.addClass "active"
    @content.addClass "show"
    @creator.activeBundle = this
    document.location.hash = @name
    $("content").scrollTo 0 unless @creator.activeBundle == this
    this
  
  unsetActive: =>
    @tab.removeClass "active"
    @content.removeClass "show"
    @creator.activeBundle = null
    document.location.hash = "1"
    $("content").scrollTo 0
    this

window.Tab = class Tab
  constructor: (@tabContainer, @tabContentContainer) ->
    @autoselect = document.location.hash.substring(1) or "1"
    @tabs = {}
    @counter = 1
    
    window.addEventListener "hashchange", =>
      select = document.location.hash.substring(1) or "1"
      unless @activeBundle.name != select
        return
      
      if @tabs[select]?
        @tabs[select].setActive()
      else
        @tabs[1]?.setActive()
  
  new: =>
    bundle = new Bundle this, (@counter++).toString()
    bundle.tab.inject @tabContainer
    bundle.content.inject @tabContentContainer
    bundle.setActive() if !@activeBundle? or bundle.name == @autoselect
    @tabs[bundle.name] = bundle
