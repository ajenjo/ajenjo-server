(function() {
  'use strict';
  var ___components, app, config, controller, directive, factory, k, mconfig, module, provider, ref,
    slice = [].slice;

  if (typeof angular !== "undefined" && angular !== null) {

    /*
      Variables config
     */
    config = {
      app_name: 'ajenjo',
      dev: true,
      presentation: true,
      log_simbol_end_time: ': ',
      log_view_time: true,
      sails_time_to_declare_disconect: 5000
    };
    ___components = {
      configs: [],
      modules: []
    };
    directive = function(name, fn) {
      return app.directive(name, fn);
    };
    module = {
      module: function(arr_str_modules) {
        var key, smodule;
        for (key in arr_str_modules) {
          smodule = arr_str_modules[key];
          ___components.modules.push(smodule);
        }
        return module;
      },
      config: function(arr_config) {
        ___components.configs.push(arr_config);
        return module;
      }
    };
    factory = function(name, fn) {
      return app.factory(name, fn);
    };
    provider = function(namem, fn) {
      return app.provider(name, fn);
    };

    /*  Modulos */
    module.module(['ngSails']).config([
      '$sailsProvider', function($sailsProvider) {
        $sailsProvider.autoConnect = true;
        $sailsProvider.url = document.location.protocol + "//" + document.location.host + "/";
        return $sailsProvider.useCORSRouteToGetCookie = true;
      }
    ]);
    module.module(['ngSanitize']);
    module.config([
      '$provide', function($provide) {
        var controlActivities;
        return $provide.provider('controlActivities', controlActivities = function() {
          var activities, activity, countActivitiesActives, existsActivities, getActivitiesCreated, getActivitiesFinished, getActivity, getHistory, getPercent, historyActivities, logControlActivities, newActivity, refreshViews, rootScope;
          activity = (function() {
            function activity(callback, callbacks, endCallBack) {
              this.callbacks = callbacks != null ? callbacks : [];
              this.endCallBack = endCallBack != null ? endCallBack : [];
              if (callback != null) {
                this.callback(callback);
              }
            }

            activity.prototype.runAllCallBack = function() {
              var callback, indexCallback, ref, results;
              try {
                ref = this.callbacks;
                results = [];
                for (indexCallback in ref) {
                  callback = ref[indexCallback];
                  results.push(callback());
                }
                return results;
              } catch (_error) {}
            };

            activity.prototype.callback = function(callback) {
              return this.callbacks.push(callback);
            };

            activity.prototype.endCallback = function(callback) {
              return this.endCallBack.push(callback);
            };

            activity.prototype.end = function() {
              var callbackEnd, indexCallback, ref, results;
              try {
                this.runAllCallBack();
              } catch (_error) {}
              try {
                ref = this.endCallBack;
                results = [];
                for (indexCallback in ref) {
                  callbackEnd = ref[indexCallback];
                  results.push(callbackEnd());
                }
                return results;
              } catch (_error) {}
            };

            return activity;

          })();
          activities = {
            created: 0,
            finished: 0,
            lastCountInactive: 0,
            _list: {}
          };
          historyActivities = [];
          logControlActivities = console.log;
          countActivitiesActives = function() {
            return Object.keys(activities._list).length;
          };
          existsActivities = function() {
            return countActivitiesActives() !== 0;
          };
          getActivitiesCreated = function() {
            return activities.created;
          };
          getActivitiesFinished = function() {
            return activities.finished;
          };
          newActivity = function(nameActivity, callBackActivities) {
            var activityCreated;
            activityCreated = new activity(callBackActivities);
            if (activities._list[nameActivity] == null) {
              activities.created++;
              historyActivities.push(activityCreated);
              activityCreated.endCallback(function() {
                logControlActivities.log("Se esta finalizando la actividad " + nameActivity + ".");
                activities.finished++;
                delete activities._list[nameActivity];
                if (!existsActivities()) {
                  activities.lastCountInactive = activities.created;
                }
                return refreshViews();
              });
              activities._list[nameActivity] = activityCreated;
              return getActivity(nameActivity);
            } else {
              return false;
            }
          };
          getActivity = function(nameActivity) {
            var activityFind;
            activityFind = activities._list[nameActivity];
            if (activityFind == null) {
              activityFind = newActivity(nameActivity);
            }
            return activityFind;
          };
          getPercent = function() {
            var countLast, created, finished, result;
            created = getActivitiesCreated();
            finished = getActivitiesFinished();
            countLast = activities.lastCountInactive;
            result = (finished - countLast) / (created - countLast);
            if (!existsActivities()) {
              return 1;
            } else {
              return result || 0;
            }
          };
          getHistory = function() {
            return activities._list;
          };
          rootScope = null;
          refreshViews = function() {
            return ((rootScope != null ? rootScope.$apply : void 0) != null)();
          };
          return {
            $get: [
              '$rootScope', 'log', '$interval', function($rootScope, log, $interval) {
                var createRootScope;
                logControlActivities = new log("Control Activities");
                createRootScope = function() {
                  return rootScope = $rootScope;
                };
                createRootScope();
                return {
                  "count": countActivitiesActives,
                  "created": getActivitiesCreated,
                  "finished": getActivitiesFinished,
                  "get": getActivity,
                  "new": newActivity,
                  "percent": getPercent,
                  activity: activity,
                  countActivitiesActives: countActivitiesActives,
                  existsActivities: existsActivities,
                  getActivitiesCreated: getActivitiesCreated,
                  getActivitiesFinished: getActivitiesFinished,
                  getActivity: getActivity,
                  getHistory: getHistory,
                  getPercent: getPercent,
                  newActivity: newActivity
                };
              }
            ]
          };
        });
      }
    ]);

    /* Module Route */
    module.module(['ngRoute']).config([
      '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        var route;
        route = function(path, config) {
          var keyPath, results, spath;
          if (path === 'otherwise') {
            return $routeProvider.otherwise(config);
          } else {
            if (typeof path === 'string' || path instanceof String) {
              return $routeProvider.when(path, config);
            } else if (Array.isArray(path)) {
              results = [];
              for (keyPath in path) {
                spath = path[keyPath];
                results.push(route(spath, config));
              }
              return results;
            } else {
              return console.warn("El path", path, "requiere que sea un Array<String> o String.");
            }
          }
        };
        route('otherwise', {
          redirectTo: '/home'
        });
        route('/login_demo', {
          templateUrl: 'login_page'
        });
        route('/home', {
          templateUrl: 'home_page'
        });
        route('/groups', {
          templateUrl: 'groups_page',
          controller: 'groupsCtrl'
        });
        route('/users', {
          templateUrl: 'users_page',
          controller: 'usersCtrl'
        });
        route('/permissions', {
          templateUrl: 'permissions_page',
          controller: 'permissionCtrl'
        });
        route('/users/add', {
          redirectTo: '/add/user'
        });
        route('/permissions/add', {
          redirectTo: '/add/permission'
        });
        route('/groups/add', {
          redirectTo: '/add/group'
        });
        route('/add/user', {
          templateUrl: 'adds_page',
          controller: 'add_user'
        });
        route('/add/group', {
          templateUrl: 'adds_page',
          controller: 'add_group'
        });
        route('/add/permission', {
          templateUrl: 'adds_page',
          controller: 'add_permission'
        });
        return $locationProvider.html5Mode({
          enable: false,
          requireBase: false
        });
      }
    ]);

    /* Module bootstrap */
    module.module(['ui.bootstrap']);

    /*  Fin de Modulos */
    app = angular.module(config.app_name, ___components.modules);
    factory('alert', function() {
      var alert;
      alert = (function() {
        function alert() {}

        alert.prototype.alerts = [];

        alert.prototype.modelAlert = {
          type: 'warning',
          message: ''
        };

        alert.prototype._onLogs = [];

        alert.prototype.onLog = function(fn) {
          return this._onLogs.push(fn);
        };

        alert.prototype.newAlert = function(data) {
          var j, len, logs, modelAlert, ref;
          modelAlert = angular.copy(this.modelAlert);
          if (((data != null ? data.msg : void 0) != null) || ((data != null ? data.message : void 0) != null)) {
            modelAlert.message = data.msg || data.message;
          }
          if ((data != null ? data.type : void 0) != null) {
            modelAlert.type = data.type;
          }
          ref = this._onLogs;
          for (j = 0, len = ref.length; j < len; j++) {
            logs = ref[j];
            logs(data, modelAlert);
          }
          return this.alerts.push(modelAlert);
        };

        alert.prototype.removeAlert = function(indexAlert) {
          return this.alerts.splice(indexAlert, 1);
        };

        return alert;

      })();
      return alert;
    });
    factory('log', function() {
      var aArray, log;
      aArray = function(arrs) {
        var SArr, arr, arrReturn, index, indexSArr;
        arrReturn = [];
        for (index in arrs) {
          arr = arrs[index];
          if (Array.isArray(arr)) {
            for (indexSArr in arr) {
              SArr = arr[indexSArr];
              arrReturn.push(SArr);
            }
          } else {
            arrReturn.push(arr);
          }
        }
        return arrReturn;
      };

      /*log54126 */
      log = (function() {
        function log(header, preModule, separator, styles1, stylesErr, virtualLog) {
          this.header = header != null ? header : null;
          this.preModule = preModule != null ? preModule : null;
          this.separator = separator != null ? separator : " > ";
          this.styles = styles1 != null ? styles1 : {
            color: "green"
          };
          this.stylesErr = stylesErr != null ? stylesErr : {
            color: "red"
          };
          this.virtualLog = virtualLog != null ? virtualLog : console.log;
        }

        log.prototype.getHeaderArr = function() {
          return ["" + this.header];
        };

        log.prototype.createTagLog = function() {
          var tags;
          if (this.preModule != null) {
            tags = [];
            tags.push(this.preModule.createTagLog());
            tags.push(this.getHeaderArr());
          } else {
            tags = this.getHeaderArr();
          }
          return aArray(tags);
        };

        log.prototype.getHeaderInline = function() {
          var e;
          return ((function() {
            var j, len, ref, results;
            ref = this.getHeader();
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              e = ref[j];
              results.push("" + e);
            }
            return results;
          }).call(this)).join(this.separator);
        };

        log.prototype.getHeader = function() {
          var i, k, ret;
          ret = (function() {
            var ref, results;
            ref = this.createTagLog();
            results = [];
            for (k in ref) {
              i = ref[k];
              results.push(i);
            }
            return results;
          }).call(this);
          return ret;
        };

        log.prototype.getSkeletonHeader = function(styles) {
          var e, getNewTime, headerInline, n, preMsgs, s;
          preMsgs = [];
          headerInline = this.getHeaderInline();
          getNewTime = new Date;
          preMsgs.push("%c[");
          if (config.log_view_time) {
            preMsgs.push((getNewTime.toLocaleTimeString()) + " " + (getNewTime.toLocaleDateString()) + config.log_simbol_end_time);
          }
          preMsgs.push(headerInline);
          preMsgs.push("]:");
          return preMsgs = [
            ((function() {
              var j, len, results;
              results = [];
              for (j = 0, len = preMsgs.length; j < len; j++) {
                e = preMsgs[j];
                results.push("" + e);
              }
              return results;
            })()).join(''), ((function() {
              var results;
              results = [];
              for (n in styles) {
                s = styles[n];
                results.push(n + ":" + s);
              }
              return results;
            })()).join(';')
          ];
        };

        log.prototype.log = function() {
          var msgs, preMsgs;
          msgs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          preMsgs = [];
          preMsgs.push.apply(preMsgs, this.getSkeletonHeader(this.styles));
          preMsgs.push.apply(preMsgs, msgs);
          if (config.dev) {
            return console.log.apply(console, preMsgs);
          }
        };

        log.prototype.error = function() {
          var msgs, preMsgs;
          msgs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          preMsgs = [];
          preMsgs.push.apply(preMsgs, this.getSkeletonHeader(this.stylesErr));
          preMsgs.push.apply(preMsgs, msgs);
          if (config.dev) {
            return console.log.apply(console, preMsgs);
          }
        };

        return log;

      })();
      return log;
    });
    factory('messages', function() {
      return {
        module: {
          groups: '[Module Groups]'
        },
        alerts: {
          error_add_groups: "Los grupos nos se han podido ingresar a la base de datos, revise los campos en rojo."
        }
      };
    });
    factory('model', function() {
      var cModel;
      cModel = (function() {
        function cModel(model) {
          if (model != null) {
            this.model = model;
          }
        }

        cModel.prototype.models = [];

        cModel.prototype.model = {};

        cModel.prototype._validates = {};

        cModel.prototype.validate = function(name, fn) {
          return this._validates[name] = fn;
        };

        cModel.prototype.add = function(dataToModel) {
          var fnValid, indexSPreModel, isPush, nameValid, preModel, ref, sPreModel;
          if (dataToModel == null) {
            dataToModel = {};
          }
          preModel = angular.copy(this.model);
          isPush = false;
          for (indexSPreModel in preModel) {
            sPreModel = preModel[indexSPreModel];
            if (dataToModel[indexSPreModel] != null) {
              isPush = true;
              preModel[indexSPreModel] = dataToModel[indexSPreModel];
            }
          }
          ref = this._validates;
          for (nameValid in ref) {
            fnValid = ref[nameValid];
            preModel[nameValid] = fnValid;
          }
          if (isPush) {
            return this.models.push(preModel);
          }
        };

        cModel.prototype.remove = function(index) {
          return this.models.slice(index, 1);
        };

        cModel.prototype.save = function(storage) {
          var fnValid, j, len, model, nameValid, ref, ref1, results;
          ref = this.models;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            model = ref[j];
            ref1 = this._validates;
            for (nameValid in ref1) {
              fnValid = ref1[nameValid];
              delete model[nameValid];
            }
            results.push(storage.push(model));
          }
          return results;
        };

        return cModel;

      })();
      return cModel;
    });
    factory('search', function() {
      var search;
      search = (function() {
        function search() {}

        search.prototype.active = false;

        search.prototype.actived = function() {
          return this.active = !this.active;
        };

        search.prototype.text = '';

        search.prototype.clear = function() {
          return this.text = '';
        };

        search.prototype.exit = function(keyEvent) {
          if (keyEvent.keyCode === 27) {
            this.active = false;
            return this.clear();
          }
        };

        return search;

      })();
      return search;
    });
    factory('verificData', function() {
      var domain, email, emailWeb, nameAndLastName, nameEmail, nameEmailWeb, web;
      domain = "[a-zA-Z0-9\\.\\_\\-]+\\.[a-zA-Z0-9]+";
      email = "[a-zA-Z0-9\\_\\-\\.\\%]+\\@" + domain;
      web = "[a-zA-Z0-9\\?\\$\\#\\/\\:\\.\\-_%\\&]+";
      nameEmail = "\"{0,}([a-zA-Z][a-zA-Z ]+)\"{0,}\\s{0,}<(" + email + ")>";
      nameEmailWeb = nameEmail + "[\\s]{0,}\\((" + web + ")\\)";
      emailWeb = "<(" + email + ")>[\\s]{0,}\\((" + web + ")\\)";
      nameAndLastName = "\"{0,}([a-zA-Z]+)([a-zA-Z ]+)\"{0,}";
      return {
        regexp: {
          email: email,
          nameEmail: nameEmail,
          nameEmailWeb: nameEmailWeb,
          emailWeb: emailWeb,
          nameAndLastName: nameAndLastName
        },
        isEmpty: function(value) {
          return !value;
        },
        useSymbol: function(symbol, value) {
          var valueFindSymbol, valueWithSymbol;
          valueFindSymbol = value != null ? typeof value.indexOf === "function" ? value.indexOf(symbol) : void 0 : void 0;
          valueWithSymbol = valueFindSymbol !== -1 && valueFindSymbol !== void 0;
          return valueWithSymbol;
        },
        isEmail: function(value) {
          return Boolean(/^[a-zA-Z0-9\._%\+\-]+@[a-zA-Z0-9\-\+]+\.[a-zA-Z0-9]+$/ig.exec(value));
        }
      };
    });

    /* Carga la aplicación */

    /* Controladores */
    controller = function(name_controller, modules_param, fn_controller) {
      modules_param.push(fn_controller);
      return app.controller(name_controller, modules_param);
    };
    controller('add_group', ['$scope', '$log', '$rootScope', 'messages', 'log', 'alert', 'verificData', 'controlActivities'], function($scope, $log, $rootScope, messages, log, alert, verificData, controlActivities) {
      var clearAlertsFixed, indexAlerts, isDangerGroupKey, isValidGroupKey, logAddGroup, logRemoveAlerts, logSaveGroups, logValidationGroup, progressbarPropieties, removeAlert, removeAlertFixed, ruleValidaIfExistsOnGroups, ruleValidaIfExistsOnLocalGroups, ruleValidationIfCorrectSyntaxKeyGroup, saveAllGroupsAdds, validationGroup;
      $scope.type = 'group';
      $scope.is = function(type) {
        return $scope.type === type;
      };
      logAddGroup = new log('Module Grups Add');
      logSaveGroups = new log('Save Groups', logAddGroup);
      logValidationGroup = new log('Validate Group', logAddGroup);
      logRemoveAlerts = new log('Remove Alerts', logAddGroup);
      $rootScope.title = 'Nuevo grupo';
      $scope.alerts = [];
      $scope.alertsFixed = [];
      indexAlerts = {
        keyAlertDanger: -1
      };
      $scope.removeAlert = removeAlert = function(indexAlert) {
        logRemoveAlerts.log("Eliminando la alerta en la posición", indexAlert);
        return $scope.alerts.splice(indexAlert, 1);
      };
      $scope.removeAlertFixed = removeAlertFixed = function(indexAlert) {
        logRemoveAlerts.log("Eliminando la alerta fija en la posición", indexAlert);
        return $scope.alertsFixed.splice(indexAlert, 1);
      };
      clearAlertsFixed = function() {
        var indexAlert, ref, results;
        ref = $scope.alertsFixed;
        results = [];
        for (indexAlert in ref) {
          alert = ref[indexAlert];
          results.push(removeAlertFixed(indexAlert));
        }
        return results;
      };
      $scope.data = {
        groupsAdd: []
      };
      ruleValidaIfExistsOnGroups = function(keyGroup) {
        var _keyGroup, existGroup, group, ref;
        existGroup = false;
        ref = $rootScope.groups;
        for (_keyGroup in ref) {
          group = ref[_keyGroup];
          if (group.key === keyGroup) {
            existGroup = true;
          }
        }
        return !existGroup;
      };
      ruleValidaIfExistsOnLocalGroups = function(keyGroup) {
        var _keyGroup, countExistGroup, group, ref;
        countExistGroup = 0;
        ref = $scope.data.groupsAdd;
        for (_keyGroup in ref) {
          group = ref[_keyGroup];
          if (group.key === keyGroup) {
            countExistGroup = countExistGroup + 1;
          }
        }
        if (countExistGroup <= 1) {
          return true;
        } else {
          return false;
        }
      };
      ruleValidationIfCorrectSyntaxKeyGroup = function(keyGroup) {
        var expressionRun, isCorrectTheRegularExpression;
        expressionRun = /^[a-z0-9_-]+$/gi;
        isCorrectTheRegularExpression = expressionRun.exec(keyGroup);
        return Boolean(isCorrectTheRegularExpression);
      };
      validationGroup = function(group) {
        var isValid;
        isValid = true;
        if (!ruleValidaIfExistsOnGroups(group.key)) {
          isValid = false;
        }
        if (!ruleValidaIfExistsOnLocalGroups(group.key)) {
          isValid = false;
        }
        if (!ruleValidationIfCorrectSyntaxKeyGroup(group.key)) {
          isValid = false;
        }
        return isValid;
      };
      isValidGroupKey = function(group) {
        var isEmpty, isValidGroup;
        isEmpty = verificData.isEmpty(group.key);
        isValidGroup = validationGroup(group);
        if (isEmpty) {
          return false;
        } else if (isValidGroup) {
          return true;
        } else {
          return false;
        }
      };
      isDangerGroupKey = function(group) {
        var isEmpty, isValidGroup;
        isEmpty = verificData.isEmpty(group.key);
        isValidGroup = validationGroup(group);
        if (isEmpty) {
          return false;
        } else if (!isValidGroup) {
          return true;
        }
      };
      progressbarPropieties = {
        max: 100,
        status: false,
        text: '',
        type: "default",
        value: 100
      };
      saveAllGroupsAdds = function() {
        var activitySaveAllGroups, activitySaveDbGroups, captureGroups, group, grupoKey, gruposErroneos, gruposListosParaGuardar, key, stringGruposErroneos;
        captureGroups = $scope.data.groupsAdd;
        activitySaveAllGroups = controlActivities.get('save_all_groups');
        gruposListosParaGuardar = (function() {
          var results;
          results = [];
          for (key in captureGroups) {
            group = captureGroups[key];
            if (isValidGroupKey(group)) {
              results.push({
                key: group.key,
                name: group.name
              });
            }
          }
          return results;
        })();
        gruposErroneos = (function() {
          var results;
          results = [];
          for (key in captureGroups) {
            group = captureGroups[key];
            if (isDangerGroupKey(group)) {
              results.push(group.key);
            }
          }
          return results;
        })();
        clearAlertsFixed();
        if (gruposErroneos.length > 0) {
          logSaveGroups.error("Se encontraron que los grupos con la claves", gruposErroneos, "no se pueden ingresar.");
          stringGruposErroneos = ((function() {
            var j, len, results;
            results = [];
            for (j = 0, len = gruposErroneos.length; j < len; j++) {
              grupoKey = gruposErroneos[j];
              results.push("\"" + (grupoKey || '') + "\"");
            }
            return results;
          })()).join(", ");
          indexAlerts.keyAlertDanger = 1 - $scope.alertsFixed.push({
            type: "danger",
            message: "<strong>Advertencia:</strong> Los grupos " + stringGruposErroneos + " no nos son posible agregarlos debido a que puede estar replicados o mal escrito. <br> <strong>Nota:</strong> <i>Por favor revisar los campos en rojo.</i>"
          });
        } else if (gruposListosParaGuardar.length > 0) {
          logSaveGroups.log("Están listo para agregar los grupos", (function() {
            var j, len, results;
            results = [];
            for (j = 0, len = gruposListosParaGuardar.length; j < len; j++) {
              group = gruposListosParaGuardar[j];
              results.push(group.key);
            }
            return results;
          })());
          activitySaveDbGroups = controlActivities.get('activity_save_db_groups');
          $rootScope.db.groups = gruposListosParaGuardar;
          $scope.statusLoadSaveGroup = true;
          activitySaveDbGroups.callback(function() {
            $scope.statusLoadSaveGroup = false;
            return indexAlerts.keyAlertCompleteUploadData = 1 - $scope.alertsFixed.push({
              type: "success",
              message: "Los datos han sido guardados correctamente. Visita los <a href=\"#/groups\" class=\"alert-link\">grupos</a> para revisar los grupos que acabas de ingresar."
            });
          });
          logSaveGroups.log("Limpiando la data local de los grupos. Eliminado", captureGroups.length, "datos.");
        } else {
          $scope.alerts.push({
            type: "warning",
            message: "<strong>Advertencia:</strong> No existe ningún grupo para agregar."
          });
        }
        return activitySaveAllGroups.end();
      };
      $scope.hsA = controlActivities.getHistory;
      $scope.dangerKey = isDangerGroupKey;
      $scope.progressbar = progressbarPropieties;
      $scope.save = saveAllGroupsAdds;
      return $scope.validateKey = isValidGroupKey;
    });
    controller('add_permission', ['$scope', '$log'], function($scope, $log) {
      $scope.type = 'permission';
      return $scope.is = function(type) {
        return $scope.type === type;
      };
    });
    controller('add_user', ['$scope', '$rootScope', 'log', 'verificData', '$http'], function($scope, $rootScope, log, verificData, $http) {
      var bulkEmailToListAccounts, dangerValidation, logAddUser, logCatchingEmailsToAdd, logParseStringToEmailList, logSaveUsers, matchesFind, save, successValidation;
      $scope.type = 'user';
      $scope.is = function(type) {
        return $scope.type === type;
      };
      $scope.data = {
        usersAdd: [],
        usersAddlongText: "",
        regexToFindEmails: verificData.regexp.emailWeb + "|" + verificData.regexp.nameEmailWeb + "|" + verificData.regexp.nameEmail + "|" + verificData.regexp.email
      };
      if (config.dev) {
        $scope.data.usersAddlongText = "name1@d.co,\nname2@d.co,\nnombre apellido segundo apellido <name3@do.co>,\nnombre Apellido<name4@d.c> (http://el.sitio/)\nnombre Apellido <name5@b.e>(http://el.sitio/)\n<name6@b.e> (http://el.sitio/)";
      }
      $scope.typeInvitation = 'single';
      $scope.toBulk = function() {
        return $scope.typeInvitation = 'bulk';
      };
      $scope.toSingle = function() {
        return $scope.typeInvitation = 'single';
      };
      logAddUser = new log('Module User Add');
      logSaveUsers = new log('Save User', logAddUser);
      logCatchingEmailsToAdd = new log('Catching Emails', logAddUser);
      logParseStringToEmailList = new log('Parset Email List', logCatchingEmailsToAdd);
      $scope.users = $rootScope.users;
      logAddUser.log('Datos cargados desde la variable \'users\' ($rootScope) a variable \'users\' ($scope):', $scope.users);
      matchesFind = function() {
        var regexToFindEmails, resultMatchesRegExp;
        regexToFindEmails = new RegExp($scope.data.regexToFindEmails, "g");
        resultMatchesRegExp = $scope.data.usersAddlongText.match(regexToFindEmails);
        $scope.data.regexpEnd = resultMatchesRegExp;
        return logCatchingEmailsToAdd.log('Capturando Emails usando el Regex', regexToFindEmails, 'Retornando: ', resultMatchesRegExp);
      };
      $scope.$watch('data.usersAddlongText', matchesFind);
      $scope.$watch('data.regexToFindEmails', matchesFind);
      successValidation = {
        email: function(data) {
          var email;
          email = data.email;
          if (verificData.isEmpty(email)) {
            return false;
          }
          if (verificData.isEmail(email)) {
            return true;
          } else {
            return false;
          }
        }
      };
      dangerValidation = {
        email: function(data) {
          var email;
          email = data.email;
          if (verificData.isEmpty(email)) {
            return false;
          }
          if (verificData.isEmail(email)) {
            return false;
          } else {
            return true;
          }
        }
      };
      bulkEmailToListAccounts = function() {
        var RegExpResult, RegExpResultNameAndLastname, contacto, contactosConEmailYWeb, contactosConNombreEmailYWeb, contactosConNombreYEmail, contactosSoloEmail, emailCapturado, firstName, isEmailAndName, isEmailAndWeb, isEmailNameAndWeb, isOnlyEmail, j, l, lastName, len, len1, len2, len3, len4, len5, listaDeContactosEncontrados, m, matchEmailAndName, matchEmailAndWeb, matchEmailNameAndWeb, matchNameAndLastName, matchOnlyEmail, nombreCapturado, o, p, q, tmpMemoriaDeContactosParaAgregar, webCapturado;
        matchEmailAndName = new RegExp(verificData.regexp.nameEmail);
        matchEmailAndWeb = new RegExp(verificData.regexp.emailWeb);
        matchEmailNameAndWeb = new RegExp(verificData.regexp.nameEmailWeb);
        matchNameAndLastName = new RegExp(verificData.regexp.nameAndLastName);
        matchOnlyEmail = new RegExp(verificData.regexp.email);
        listaDeContactosEncontrados = $scope.data.regexpEnd;
        logParseStringToEmailList.log("Lista de contactos encontrados", listaDeContactosEncontrados);
        logParseStringToEmailList.log("Clasificando", listaDeContactosEncontrados.length, "Contactos.");
        contactosConNombreEmailYWeb = [];
        contactosConNombreYEmail = [];
        contactosConEmailYWeb = [];
        contactosSoloEmail = [];
        for (j = 0, len = listaDeContactosEncontrados.length; j < len; j++) {
          contacto = listaDeContactosEncontrados[j];
          isEmailNameAndWeb = contacto.match(matchEmailNameAndWeb);
          isEmailAndName = contacto.match(matchEmailAndName);
          isEmailAndWeb = contacto.match(matchEmailAndWeb);
          isOnlyEmail = contacto.match(matchOnlyEmail);
          if (isEmailNameAndWeb) {
            contactosConNombreEmailYWeb.push(contacto);
          } else if (isEmailAndWeb) {
            contactosConEmailYWeb.push(contacto);
          } else if (isEmailAndName) {
            contactosConNombreYEmail.push(contacto);
          } else if (isOnlyEmail) {
            contactosSoloEmail.push(contacto);
          }
        }
        logParseStringToEmailList.log("Los contactos con Nombre Email y Sitio web encontrados", contactosConNombreEmailYWeb);
        logParseStringToEmailList.log("Los contactos con Nombre y Email encontrados", contactosConNombreYEmail);
        logParseStringToEmailList.log("Los contactos con Email y Web encontrados", contactosConEmailYWeb);
        logParseStringToEmailList.log("Los contactos solo con Email", contactosSoloEmail);
        logParseStringToEmailList.log("Los usuarios encontrados fueron", contactosConNombreEmailYWeb.length + contactosConNombreYEmail.length + contactosConEmailYWeb.length + contactosSoloEmail.length);
        tmpMemoriaDeContactosParaAgregar = [];
        for (l = 0, len1 = contactosSoloEmail.length; l < len1; l++) {
          contacto = contactosSoloEmail[l];
          tmpMemoriaDeContactosParaAgregar.push({
            email: contacto
          });
        }
        for (m = 0, len2 = contactosConEmailYWeb.length; m < len2; m++) {
          contacto = contactosConEmailYWeb[m];
          RegExpResult = contacto.match(matchEmailAndWeb);
          emailCapturado = RegExpResult[1];
          webCapturado = RegExpResult[2];
          tmpMemoriaDeContactosParaAgregar.push({
            email: emailCapturado,
            web: webCapturado
          });
        }
        for (o = 0, len3 = contactosConNombreYEmail.length; o < len3; o++) {
          contacto = contactosConNombreYEmail[o];
          RegExpResult = contacto.match(matchEmailAndName);
          nombreCapturado = RegExpResult[1];
          emailCapturado = RegExpResult[2];
          RegExpResultNameAndLastname = nombreCapturado.match(matchNameAndLastName);
          firstName = RegExpResultNameAndLastname[1];
          lastName = RegExpResultNameAndLastname[2];
          tmpMemoriaDeContactosParaAgregar.push({
            name: firstName,
            lastname: lastName,
            email: emailCapturado
          });
        }
        for (p = 0, len4 = contactosConNombreEmailYWeb.length; p < len4; p++) {
          contacto = contactosConNombreEmailYWeb[p];
          RegExpResult = contacto.match(matchEmailNameAndWeb);
          nombreCapturado = RegExpResult[1];
          emailCapturado = RegExpResult[2];
          webCapturado = RegExpResult[3];
          RegExpResultNameAndLastname = nombreCapturado.match(matchNameAndLastName);
          firstName = RegExpResultNameAndLastname[1];
          lastName = RegExpResultNameAndLastname[2];
          tmpMemoriaDeContactosParaAgregar.push({
            name: firstName,
            lastname: lastName,
            email: emailCapturado,
            web: webCapturado
          });
        }
        logParseStringToEmailList.log("Memoria temporal previa a ingresar a la lista", tmpMemoriaDeContactosParaAgregar);
        tmpMemoriaDeContactosParaAgregar = tmpMemoriaDeContactosParaAgregar.reverse();
        $scope.data.usersAdd = [];
        for (q = 0, len5 = tmpMemoriaDeContactosParaAgregar.length; q < len5; q++) {
          contacto = tmpMemoriaDeContactosParaAgregar[q];
          $scope.data.usersAdd.push(contacto);
        }
        return $scope.toSingle();
      };
      save = function() {
        var dataNewUsers;
        dataNewUsers = $scope.data.usersAdd;
        return logSaveUsers.error('Base para los usuarios a agregar', dataNewUsers);
      };
      $scope.bulkEmailToListAccounts = bulkEmailToListAccounts;
      $scope.save = save;
      $scope.d = dangerValidation;
      return $scope.v = successValidation;
    });
    controller('addsCtrl', ['$scope', '$routeParams', '$location'], function($scope, $routeParams, $location) {
      var tab;
      return $scope.tab = tab = $routeParams.type_adds;
    });

    /* Gestiona los permisos */
    controller('AppCtrl', ['$scope', '$rootScope', '$log', 'log', 'controlActivities', '$sails'], function($scope, $rootScope, $log, log, controlActivities, $sails) {
      var changeDataGroups, changeDataOficialByDB, groups, logChageGlobalData, logControllerApp, logSaveGlobalData, logStatusConnectionApp, permissions, users;
      $rootScope.title = 'Ajenjo';
      logChageGlobalData = new log('Change Data', logSaveGlobalData);
      logControllerApp = new log('Ctrl APP');
      logSaveGlobalData = new log('Save Global Data', logControllerApp);
      logStatusConnectionApp = new log('Status connection', logControllerApp);
      (function() {
        var conectado, desconectado, setAppInDisconectOfTiemOut, sinEstado, timeToTimeoutConnect;
        sinEstado = -1;
        desconectado = 0;
        conectado = 1;
        timeToTimeoutConnect = config.sails_time_to_declare_disconect;
        $rootScope.appIsConnect = sinEstado;
        setAppInDisconectOfTiemOut = function() {
          if ($rootScope.appIsConnect === sinEstado) {
            $rootScope.appIsConnect = desconectado;
            logStatusConnectionApp.log("Se cambio el estado de la aplicación debido a no estar conectado en", timeToTimeoutConnect, "segundos.");
            try {
              return $rootScope.$apply();
            } catch (_error) {}
          }
        };
        setTimeout(setAppInDisconectOfTiemOut, timeToTimeoutConnect);
        $sails.on('connect', function() {
          logStatusConnectionApp.log("Se ha conectado la aplicación.");
          return $rootScope.appIsConnect = conectado;
        });
        return $sails.on('disconnect', function() {
          logStatusConnectionApp.log("Esta ha desconectado la aplicación.");
          return $rootScope.appIsConnect = desconectado;
        });
      })();
      $sails.on('message_test', function(req) {
        return logControllerApp.log("Se ha recibido un estatus de parte del backend este dice:", req.text);
      });
      logControllerApp.log('El modo de desarrollador esta activo.');
      groups = [
        {
          key: 'abc1231',
          name: 'Administradores',
          description: 'Lorem ipsum dolor sit amet...'
        }, {
          key: 'abc1232',
          name: 'Usuarios',
          description: 'Lorem ipsum dolor sit amet...'
        }, {
          key: 'abc1233',
          name: 'Otros',
          description: 'Lorem ipsum dolor sit amet...'
        }
      ];
      if (groups == null) {
        groups = [];
      }
      users = [
        {
          id: 1,
          name: 'F Name 1',
          username: 'user1'
        }, {
          id: 2,
          name: 'F Name 2',
          username: 'user2'
        }, {
          id: 3,
          name: 'F Name 3',
          username: 'user3'
        }, {
          id: 4,
          name: 'F Name 4',
          username: 'user4'
        }, {
          id: 5,
          name: 'F Name 5',
          username: 'user5'
        }, {
          id: 6,
          name: 'F Name 6',
          username: 'user6'
        }, {
          id: 7,
          name: 'F Name 7',
          username: 'user7'
        }
      ];
      if (users == null) {
        users = [];
      }
      permissions = [
        {
          key: 'permission_01',
          description: 'Explicabo modi aspernatur temporibus laborum. Sequi maiores numquam ad ab'
        }, {
          key: 'permission_02',
          description: 'Distinctio earum beatae explicabo tenetur quibusdam pariatur molestiae, voluptatibus numquam'
        }, {
          key: 'permission_03',
          description: 'Enim corporis omnis, sed facilis iure cumque aspernatur earum fugit'
        }, {
          key: 'permission_04',
          description: 'Dicta odit veritatis, officia quisquam nemo quam maiores soluta.'
        }, {
          key: 'permission_05',
          description: 'Non earum alias aliquam magnam natus consectetur sequi facilis, optio'
        }, {
          key: 'permission_06',
          description: 'Minus hic porro reiciendis est architecto temporibus aliquam quae voluptates itaque'
        }, {
          key: 'permission_07',
          description: 'Est voluptate, dolor excepturi qui repellendus ex asperiores enim eaque'
        }, {
          key: 'permission_08',
          description: 'Iste inventore, doloremque officiis repellendus officia voluptas nesciunt maiores quo'
        }, {
          key: 'permission_09',
          description: 'Rerum nobis fuga sunt perspiciatis cumque cupiditate possimus impedit omnis incidunt'
        }, {
          key: 'permission_10',
          description: 'Cumque sint dicta eveniet repudiandae ex vel autem, vero ipsam'
        }, {
          key: 'permission_11',
          description: 'Quia neque necessitatibus tempora expedita architecto. Eaque voluptatem praesentium unde'
        }, {
          key: 'permission_12',
          description: 'Iste modi porro ex fugit, eius incidunt aperiam accusamus quasi'
        }
      ];
      if (permissions == null) {
        permissions = [];
      }
      $rootScope.groups = groups;
      $rootScope.permissions = permissions;
      $rootScope.users = users;
      changeDataOficialByDB = function(strNameData, data) {
        var dataGlobal, dataValue, indexDataValue, results;
        dataGlobal = $rootScope[strNameData] || [];
        logChageGlobalData.log("Data:", "\"" + strNameData + "\"", "Contiene:", dataGlobal);
        logChageGlobalData.log("Leyendo data", data, "e ingresando al la data global \"" + strNameData + "\".");
        results = [];
        for (indexDataValue in data) {
          dataValue = data[indexDataValue];
          results.push(dataGlobal.push(dataValue));
        }
        return results;
      };
      $rootScope.db = {
        groups: []
      };
      return $rootScope.$watch('db.groups', changeDataGroups = function(newData, oldData) {
        var activitySaveDbGroups, countGroupToDB, group, j, len, ref;
        countGroupToDB = 0;
        ref = $rootScope.db.groups;
        for (j = 0, len = ref.length; j < len; j++) {
          group = ref[j];
          countGroupToDB++;
        }
        if (countGroupToDB > 0) {
          activitySaveDbGroups = controlActivities.get('activity_save_db_groups');
          changeDataOficialByDB('groups', newData);
          logSaveGlobalData.log("Limpiando data 'groups' temporal de la db (\"db.groups\").");
          $rootScope.db.groups = [];
          activitySaveDbGroups.end();
          return $rootScope.$apply();
        }
      });
    });
    controller('groupsCtrl', ['$scope', '$rootScope', 'search'], function($scope, $rootScope, search) {
      $scope.groups = $rootScope.groups;
      return $scope.search = new search;
    });
    controller('navbarCtrl', ['$scope', '$location'], function($scope, $location) {
      return $scope.$location = $location;
    });
    controller('permissionCtrl', ['$scope', '$rootScope', 'search'], function($scope, $rootScope, search) {
      $scope.permissions = $rootScope.permissions;
      return $scope.search = new search;
    });
    controller('usersCtrl', ['$scope', '$rootScope', 'log', 'search'], function($scope, $rootScope, log, search) {
      var logModuleUser;
      $scope.type = 'user';
      $scope.is = function(type) {
        return $scope.type === type;
      };
      $scope.search = new search;
      logModuleUser = new log('Module User');
      return $scope.users = $rootScope.users;
    });

    /* End Comtroladores */

    /* Fin de Carga la aplicación */
    directive('formRepeatElement', function() {
      return {
        restrict: 'EA',
        scope: {
          fnNew: "=",
          ___min: "=minInit",
          ___data: "=ngModel"
        },
        require: [],
        link: function($scope, $element, $attrs) {},
        controller: [
          '$scope', '$attrs', function($scope, $attrs) {
            var ___addToData;
            ___addToData = function() {
              return $scope.___data.push({});
            };
            $scope.fnNew = function() {
              return ___addToData();
            };
            if ($scope.___data === void 0) {
              $scope.___data = [];
            }
            return $scope.$watch('___min', function(newData, oldData) {
              var nRepeatAddToData, results;
              nRepeatAddToData = (($scope.___min || 1) + 1) - $scope.___data.length;
              if (nRepeatAddToData > 1) {
                results = [];
                while (nRepeatAddToData -= 1) {
                  results.push(___addToData());
                }
                return results;
              }
            });
          }
        ],
        template: function(element, attr) {
          return "<span class=\"form-single-element\" ng-repeat=\"" + (attr.nameData || '$$data') + " in ___data\">" + (element.html()) + "</span>";
        }
      };
    });
    directive('formSingleElement', function() {
      return {
        restrict: 'C',
        scope: false,
        controller: [
          '$scope', function($scope) {
            var $$isFotter, $$isHeader, $$isMidlle;
            $$isMidlle = function() {
              if (!$$isFotter() && !$$isHeader()) {
                return true;
              } else {
                return false;
              }
            };
            $$isFotter = function() {
              return ($scope.$parent.___data.length - 1) === $scope.$index;
            };
            $$isHeader = function() {
              return $scope.$index === 0;
            };
            $scope.$$isFotter = $$isFotter;
            $scope.$$isHeader = $$isHeader;
            return $scope.$$isMidlle = $$isMidlle;
          }
        ]
      };
    });
    directive('formRemoveElement', function() {
      return {
        restrict: 'EA',
        scope: false,
        controller: [
          "$scope", function($scope) {
            return $scope.$$remove = function() {
              return $scope.$parent.$parent.___data.splice($scope.$index, 1);
            };
          }
        ]
      };
    });
    directive('controlActivities', function() {
      return {
        controller: [
          'controlActivities', '$scope', 'log', function(controlActivities, $scope, log) {
            var logControlActivities;
            logControlActivities = new log('Control Activities');
            $scope.existsActivities = controlActivities.existsActivities;
            $scope.percent = controlActivities.getPercent;
            $scope.countActivities = controlActivities.count;
            return $scope.history = controlActivities.getHistory;
          }
        ]
      };
    });
    ref = ___components.configs;
    for (k in ref) {
      mconfig = ref[k];
      app.config(mconfig);
    }
  }

  if (config.dev) {
    console.log("-- End Runing --");
  }

  if (config.dev || config.presentation) {
    console.log("%c", "padding:3px 174px; line-height: 20px; background-repeat:no-repeat; background-size: auto 100%; background-position:button left; background-image: url(\"" + location.protocol + "//" + location.host + (new RegExp('.{0,}/').exec(location.pathname)) + "/imgs/logo348.png\");");
  }

}).call(this);

//# sourceMappingURL=home.js.map
