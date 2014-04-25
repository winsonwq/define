define('module.c', ['module.a', 'module.b'], function (exports, a, b, callback) {
  setTimeout(function () {
    callback({ value: a.value + b.value + 'c' });
  }, 1000);
});
