define('module.b', ['module.a'], function (exports, a) {
  exports.value = a.value + 'b';
});
