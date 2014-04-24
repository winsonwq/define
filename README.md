# define

> simple and quick module definition library in web application.

## quick start

Only considering that all resources has loaded in `html` file.

```html
<!doctype html>
<!-- import define -->
<script type="text/javascript" src="./lib/define.js"></script>

<!-- load your libraries -->
<script type="text/javascript" src="./scripts/app.js"></script>
<script type="text/javascript" src="./scripts/a.js"></script>
<script type="text/javascript" src="./scripts/b.js"></script>
```

### dependencies

`a.js` is depending on `b.js`, and it's **loading before** `b.js`. And use `return` to define a module.

```js
define('module.a', ['module.b'], function (exports, b) {
  return {
    value: 'a' + b.value
  };
});
```

`b.js` is a standalone module. And use `exports.property` to extend module.

```js
define('module.b', [], function (exports, b) {
  exports.value = 'b';
});
```

but in `app.js`, it's depending on the container `module` **(not explicitly define in file)**.

```js
use(['module'], function (module) {
  console.log(module.a.value);
  console.log(module.b.value);
});
```

# License

> Copyright (c) 2013 Wang Qiu (winsonwq@gmail.com)
>
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation
> files (the "Software"), to deal in the Software without
> restriction, including without limitation the rights to use,
> copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the
> Software is furnished to do so, subject to the following
> conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
> OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
> HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
> WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
> FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
> OTHER DEALINGS IN THE SOFTWARE.
