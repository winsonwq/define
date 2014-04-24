define('module.a', ['module.b'], function (exports, b) {
  return {
    value: 'a' + b.value
  };
});
