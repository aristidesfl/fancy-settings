###
## Fancy Settings by Frank Kohlhepp
## Copyright (c) 2011 - 2012 Frank Kohlhepp
## https://github.com/frankkohlhepp/fancy-settings
## License: LGPL v2.1
###
class Bundle
  constructor: (@creator) ->
    @tab = new Element "div", class: "tab"
    @content = new Element "div", class: "tab-content"
    @tab.addEvent "click", @setActive
  
  setActive: =>
    @creator.activeBundle?.unsetActive() unless @creator.activeBundle == this
    @tab.addClass "active"
    @content.addClass "show"
    @creator.activeBundle = this
  
  unsetActive: =>
    @tab.removeClass "active"
    @content.removeClass "show"
    @creator.activeBundle = null
    this

window.Tab = class Tab
  constructor: (@tabContainer, @tabContentContainer) ->
  new: =>
    bundle = new Bundle this
    bundle.tab.inject @tabContainer
    bundle.content.inject @tabContentContainer
    bundle.setActive() unless @activeBundle?
    bundle
