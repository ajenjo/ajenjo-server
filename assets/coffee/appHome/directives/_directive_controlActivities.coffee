# appHome :: directives/_directive_controlActivities.coffee
directive 'controlActivities', () ->
  # restrict: "E"

  controller: [
    'controlActivities'
    '$scope'
    'log'
    (controlActivities, $scope, log) ->

      logControlActivities = new log 'Control Activities'

      $scope.existsActivities   = controlActivities.existsActivities
      $scope.percent            = controlActivities.getPercent

      $scope.countActivities    = controlActivities.count
      # $scope.createdActivities  = controlActivities.created
      $scope.history                = controlActivities.getHistory
      # $scope.finishedActivities = controlActivities.finished
      # $scope.progress           = controlActivities.progress

  ]

