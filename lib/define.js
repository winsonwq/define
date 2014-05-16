(function(global) {

  var globalModules = {
    set: function setModule (moduleName, dependencies) {
      var parentModulePath = modulePath(moduleName).slice(0, -1);

      for (var i = 0; i < parentModulePath.length; i++) {
        var p = parentModulePath[i];
        if (!globalModules[p]) {
          globalModules.set(p, []);
          globalModules.get(p).created = true;
        }
        globalModules.get(p).contains[moduleName] = true;
      }

      globalModules[moduleName] = {
        dependencies: dependencies,
        contains: {}
      };
    },
    get: function getModule (moduleName) {
      return globalModules[moduleName];
    },
    getInstance: function getInstance (moduleName) {
      var levels = moduleName.split('.');
      var ns = global;

      while (levels.length) {
        var name = levels.shift();
        if (!ns[name]) return null;
        ns = ns[name];
      }

      if (ns == global) return null;
      return ns;
    }
  };

  function modulePath (moduleName) {
    var levels = moduleName.split('.');
    var modules = [];
    for (var i = 0; i < levels.length; i++) {
      var m = levels[i];
      var last = modules[modules.length - 1];
      modules.push((last ? [last, m] : [m]).join('.'));
    }

    return modules;
  }

  function hash2array (hash) {
    var arr = [];
    for (var p in hash) {
      if (hash.hasOwnProperty(p) && hash[p] != undefined) {
        arr.push(p);
      }
    }
    return arr;
  }

  function checkReady (namespaces) {
    for (var i = 0, len = namespaces.length; i < len; i++) {
      var ns = globalModules.get(namespaces[i]), contains;
      if (!ns || !ns.created) {
        return false;
      } else if ((contains = hash2array(ns.contains)).length > 0){
        return checkReady(contains);
      }
    }
    return true;
  }

  global.use = function (namespaces, callback) {

    var interval = setTimeout(function checkModuleReady() {
      var namespaceObjs = [];
      if (!checkReady(namespaces)) {
        interval = setTimeout(checkModuleReady, 0);
      } else {
        clearInterval(interval);
        for (var i = 0; i < namespaces.length; i++) {
          namespaceObjs.push(globalModules.getInstance(namespaces[i]));
        }
        callback && callback.apply(global, namespaceObjs);
      }
    }, 0);
  };

  global.define = function (moduleName, dependencies, callback) {
    globalModules.set(moduleName, dependencies);

    var levels = moduleName.split('.');
    var ns = global, container, mname;

    while (levels.length) {
      mname = levels.shift();
      ns[mname] = ns[mname] || {};
      ns = ns[mname];

      if (levels.length == 1) {
        container = ns;
      }
    }

    global.use(dependencies, function() {
      var params = [].slice.call(arguments);
      var cb = function (module) {
        container[mname] = module;
        globalModules[moduleName].created = true;
      };
      params.unshift(ns);
      params.push(cb);
      var ret = callback.apply(ns, params);

      if (ret || hash2array(ns).length > 0) {
        if (ret) {
          container[mname] = ret;
        }
        globalModules[moduleName].created = true;
      }
    });

  };
})(this);
