# Ejemplos
#
# route '/books/:book',
#   redirectTo: '/book2'
#
# route '/book2/:var/c',
#   soluto: factory: ->
#     console.log 'ok'
#
# route '/l/',
#   controller  : 'exampleController'
#   templateUrl : 'eltemplte.html'
#

route 'otherwise',
  redirectTo: '/login'

route '/login',
  templateUrl : 'login_page'
  controller  : 'loginCtrl'

route '/recovery',
  templateUrl : 'recovery_password_page'
  controller  : 'recoveryPasswordCtrl'

route '/reset/password/:index/:verific',
  controller  : 'resetPassword'
  templateUrl : 'reset_password_page'
