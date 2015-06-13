# appHome :: directives/_directive_boxSearch.coffee

#
# Permite obtener valores que requieren de multiples valores.
#
# Example:
# <div form-repeat-element="data">
#     <div form-repeat-element-singular>
#         Nombre
#         <input form-repeat-element-value name="name" type="text" value="">
#     </div>
# </div>
#
# Return Example:
# data = [
#     {
#         "name" : "Juan"
#     },
#     {
#         "name" : "Diego"
#     }
# ]
#

# Esta diractiva es capas de manejar los datos con los que se alimanta
directive 'formRepeatElement', () ->

  restrict: 'EA'
  # replace: false

  scope:
    fnNew: "="
    ___min: "=minInit"
    ___data: "=ngModel"

  require: []

  link: ($scope, $element, $attrs) ->

  controller: [
    '$scope'
    '$attrs'
    ($scope, $attrs) ->
      ___addToData = -> $scope.___data.push {}

      $scope.fnNew = ->
        do ___addToData


      # console.log
      if $scope.___data is undefined
        $scope.___data = []

      # Si el numero de reviciones es mayor a la cantidad de datos, este crese.
      $scope.$watch '___min', (newData, oldData) ->
        nRepeatAddToData = (($scope.___min || 1) + 1) - ($scope.___data.length)

        if nRepeatAddToData > 1
          while nRepeatAddToData -= 1
            do ___addToData

  ]

  template: (element, attr) ->
    return "<span class=\"form-single-element\" ng-repeat=\"#{attr.nameData||'$$data'} in ___data\">#{element.html()}</span>"

directive 'formSingleElement', ->
  restrict: 'C'
  scope: false
  controller: [
    '$scope'
    ($scope) ->
      $$isMidlle = ->
        if not do $$isFotter and not do $$isHeader
          true
        else
          false
      $$isFotter = ->
        ($scope.$parent.___data.length - 1) is $scope.$index
      $$isHeader = ->
        $scope.$index == 0

      $scope.$$isFotter = $$isFotter
      $scope.$$isHeader = $$isHeader
      $scope.$$isMidlle = $$isMidlle

  ]

directive 'formRemoveElement', ->
  restrict: 'EA'
  scope: false
  controller: [
    "$scope"
    ($scope) ->
      $scope.$$remove = ->
        $scope.$parent.$parent.___data.splice($scope.$index, 1)
        # console.log "Remove element #{}",

  ]
