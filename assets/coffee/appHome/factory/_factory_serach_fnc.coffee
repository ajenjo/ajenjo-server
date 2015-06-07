# _factory_serach_fnc.coffee
factory 'search', ->

  class search
    active  : false
    actived : -> @active = !@active
    text    : ''
    clear   : -> @text = ''
    exit    : (keyEvent) ->
      if keyEvent.keyCode is 27
        @active = false
        do @clear


  search
