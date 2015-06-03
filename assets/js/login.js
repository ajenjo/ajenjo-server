(function() {
  'use string';
  var ___components, app, config, controller, directive, factory, k, mconfig, module, provider, ref,
    slice = [].slice;

  if (typeof angular !== "undefined" && angular !== null) {

    /*
      Variables config
     */
    config = {
      app_name: 'ajenjo-login',
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
          redirectTo: '/login'
        });
        route('/login', {
          templateUrl: 'login_page',
          controller: 'loginCtrl'
        });
        route('/recovery', {
          templateUrl: 'recovery_password_page',
          controller: 'recoveryPasswordCtrl'
        });
        route('/reset/password/:index/:verific', {
          controller: 'resetPassword',
          templateUrl: 'reset_password_page'
        });
        return $locationProvider.html5Mode(false);
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

    /* Gestiona los permisos */
    controller('AppCtrl', ['$scope', '$rootScope', '$log', 'log', 'controlActivities', '$sails', '$location'], function($scope, $rootScope, $log, log, controlActivities, $sails, $location) {
      var logControllerApp, logSails, logStatusConnectionApp;
      $rootScope.title = 'Login';
      logControllerApp = new log('Ctrl APP');
      logSails = new log('Sails', logControllerApp);
      logStatusConnectionApp = new log('Status Connection', logControllerApp);
      (function() {
        var callToGetTestMessages;
        callToGetTestMessages = function() {
          var solicitaMensajeDeTest;
          solicitaMensajeDeTest = $sails.get('/test');
          return solicitaMensajeDeTest.success(function(data, status, headers, jwr) {
            return $rootScope.reqExperimental = data;
          });
        };
        $sails.on('connect', callToGetTestMessages);
        return $rootScope.callTest = callToGetTestMessages;
      })();
      return (function() {
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
    });
    controller('loginCtrl', ['$scope', '$sails', 'log', '$rootScope', 'controlActivities', '$location'], function($scope, $sails, log, $rootScope, controlActivities, $location) {
      var createSession, logLogin;
      $scope.loginError = false;
      logLogin = new log('Login');
      $scope.data = {
        usernameOrEmail: null,
        passwordVerific: null,
        rememberAccount: false
      };
      $scope.dataResult = {};
      $scope.loginError = false;
      $scope.keyToCreateSession = function($event) {
        if ($event.keyCode === 13) {
          return createSession();
        }
      };
      createSession = function() {
        var activityCrearUnaSesion, callLogin;
        activityCrearUnaSesion = controlActivities.get('activity_crear_una_sesion');
        if ($rootScope.appIsConnect <= 0) {
          $scope.loginError = false;
          $scope.loginCorrect = false;
          $scope.errorSys = true;
          activityCrearUnaSesion.end();
        } else {
          callLogin = $sails.post('/api/login', $scope.data);
          callLogin.success(function(data, status, headers, jwr) {
            $scope.dataResult = data;
            $scope.loginError = data.loginError;
            $scope.loginCorrect = data.loginCorrect;
            return $scope.errorSys = false;
          });
          callLogin.error(function(data, status, headers, jwr) {
            $scope.dataResult = data;
            $scope.loginError = false;
            $scope.loginCorrect = false;
            $scope.errorSys = false;
            return logLogin.log("El inicio de sesion ha fallado.");
          });
        }
        return callLogin["finally"](function(data, status, headers, jwr) {
          return activityCrearUnaSesion.end();
        });
      };
      $scope.login = createSession;
      if (config.dev) {
        $scope.data.usernameOrEmail = 'a';
        return $scope.data.passwordVerific = '1234';
      }
    });
    controller('recoveryPasswordCtrl', ['$scope', '$sails', 'log', 'controlActivities', '$rootScope'], function($scope, $sails, log, controlActivities, $rootScope) {
      var logRecoveryPassword, sendRecovery;
      logRecoveryPassword = new log('Recovery Password');
      $scope.isErrorOnSystem = false;
      $scope.isSendEmail = false;
      $scope.isNoSendEmail = false;
      $scope.data = {
        email: null
      };
      $scope.keyToCreateRecovery = function($event) {
        if ($event.keyCode === 13) {
          return sendRecovery();
        }
      };
      sendRecovery = function() {
        var activityRecoveryPassword, callRecoveryPassword, conectado, desconectado, sinEstado;
        sinEstado = -1;
        desconectado = 0;
        conectado = 1;
        if ($rootScope.appIsConnect === sinEstado || $rootScope.appIsConnect === desconectado) {
          return $scope.isErrorOnSystem = true;
        } else {
          activityRecoveryPassword = controlActivities.get('Recovery Password');
          callRecoveryPassword = $sails.post('/api/recovery', $scope.data);
          callRecoveryPassword.success(function(data, status, headers, jwr) {
            logRecoveryPassword.log('Return Data Recovery:', data);
            $scope.isErrorOnSystem = data.errorServer;
            if (data.isSendEmail) {
              $scope.isSendEmail = true;
              return $scope.isNoSendEmail = false;
            } else {
              $scope.isSendEmail = false;
              return $scope.isNoSendEmail = true;
            }
          });
          callRecoveryPassword.error(function(data, status, headers, jwr) {});
          return callRecoveryPassword["finally"](function(data, status, headers, jwr) {
            return activityRecoveryPassword.end();
          });
        }
      };
      if (config.dev) {
        $scope.data.email = "a@e.c";
      }
      return $scope.sendRecovery = sendRecovery;
    });
    controller('resetPassword', ['$scope', '$sails', 'log', 'controlActivities', '$rootScope'], function($scope, $sails, log, controlActivities, $rootScope) {
      var data, passwordPolicy, policyRequired;
      config = {
        minLengthPolycy: 6
      };
      passwordPolicy = {
        minLength: function(nMin) {
          if (nMin == null) {
            nMin = config.minLengthPolycy;
          }
          if (data.password.length >= nMin) {
            return true;
          } else {
            return false;
          }
        },
        withUppercase: function() {
          if (/[A-Z]/g.exec(data.password)) {
            return true;
          } else {
            return false;
          }
        },
        withLowercase: function() {
          if (/[a-z]/g.exec(data.password)) {
            return true;
          } else {
            return false;
          }
        },
        withNumber: function() {
          if (/[0-9]/g.exec(data.password)) {
            return true;
          } else {
            return false;
          }
        },
        withSign: function() {
          if (/[\°\|\¬\!\"\#\$\%\&\/\(\)\=\?\'\\\¿\¡\´\¨\*\+\~\[\]\{\}\^\`\;\,\:\.\-\_\s]/ig.exec(data.password)) {
            return true;
          } else {
            return false;
          }
        }
      };
      policyRequired = ['minLength'];
      data = {
        password: '',
        repeatPassword: '',
        getLevelPassword: function() {
          var j, len, levelPassword, numberToTruePolicies, numberTotalPolicies, policies, policySingular;
          policies = [passwordPolicy.minLength(), passwordPolicy.withLowercase(), passwordPolicy.withNumber(), passwordPolicy.withSign(), passwordPolicy.withUppercase(), passwordPolicy.minLength(10)];
          numberToTruePolicies = 0;
          numberTotalPolicies = policies.length;
          for (j = 0, len = policies.length; j < len; j++) {
            policySingular = policies[j];
            if (policySingular) {
              numberToTruePolicies++;
            }
          }
          levelPassword = (numberToTruePolicies / numberTotalPolicies) * 100;
          console.log(levelPassword);
          return levelPassword;
        },
        getTypePassword: function() {
          var levelPassword;
          levelPassword = data.getLevelPassword();
          switch (false) {
            case !(levelPassword < 25):
              return 'danger';
            case !(levelPassword < 50):
              return 'warning';
            case !(levelPassword < 75):
              return 'info';
            case !(levelPassword < 100):
              return 'default';
            default:
              return 'success';
          }
        },
        isValidPassword: function() {
          var arrVerificaciones, isValid, j, len, policyVerific, verific;
          isValid = true;
          arrVerificaciones = ((function() {
            var j, len, results;
            try {
              results = [];
              for (j = 0, len = policyRequired.length; j < len; j++) {
                policyVerific = policyRequired[j];
                results.push(passwordPolicy[policyVerific]());
              }
              return results;
            } catch (_error) {}
          })());
          for (j = 0, len = arrVerificaciones.length; j < len; j++) {
            verific = arrVerificaciones[j];
            if (verific === false) {
              isValid = false;
            }
          }
          return isValid;
        },
        isValidRepeatPassword: function() {
          if (data.password === data.repeatPassword) {
            return true;
          } else {
            return false;
          }
        }
      };
      $scope.configCtrl = config;
      $scope.data = data;
      return $scope.policy = passwordPolicy;
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

//# sourceMappingURL=login.js.map