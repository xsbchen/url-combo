# url-combo
可以通过为script和link增加data-combo属性把页面中多个js、css请求combo为一个或者多个（根据data-combo的属性值）。

## 配置说明
* `basePath` 默认 `/c/=`
* `separator` 默认 `,`
* `maxlength` 默认为空，若传入{maxlength: 500}，则当combo的时候src的url长度超过500时会分成多个script标签
