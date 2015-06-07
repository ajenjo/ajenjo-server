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
  redirectTo: '/home'

route '/login_demo',
  templateUrl : 'login_page'

route '/home',
  templateUrl : 'home_page'

route '/groups',
  templateUrl : 'groups_page'
  controller  : 'groupsCtrl'

route '/users',
  templateUrl : 'users_page'
  controller  : 'usersCtrl'

route '/permissions',
  templateUrl : 'permissions_page'
  controller  : 'permissionCtrl'

# Falso Rutas
route '/users/add',
  redirectTo : '/add/user'

route '/permissions/add',
  redirectTo : '/add/permission'

route '/groups/add',
  redirectTo : '/add/group'

# Adds
route '/add/user',
  templateUrl : 'adds_page'
  controller  : 'add_user'

route '/add/group',
  templateUrl : 'adds_page'
  controller  : 'add_group'

route '/add/permission',
  templateUrl : 'adds_page'
  controller  : 'add_permission'


