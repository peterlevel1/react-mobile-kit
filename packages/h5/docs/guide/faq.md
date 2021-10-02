# FAQ

### 为什么从 v2 直接跳跃到了 v5？v3 和 v4 跑到哪里去了？

v2 已经是很久之前发布的版本了，最近两年在公司内部，我们开发了 v3 v4 两个版本，但最终并未发布到社区上，此次 v5 版本我们将同步发布到社区。

### 我应该现在开始使用 v5 版本吗？

如果你有足够的精力去关注 v5 的[更新日志](https://github.com/ant-design/ant-design-mobile/releases)，并持续跟进升级版本，那么现在开始接入 v5 是没有问题的。

对于旧项目，我们建议根据实际情况谨慎考虑是否要在现在进行升级；而对于新项目，我们更推荐直接使用 v5 版本，可以在未来避免二次升级的成本。

### umi 项目安装 antd-mobile v5 后报错如何解决？

如果你在 umi 项目中引入 antd-mobile 时出现了类似下面这样的报错：

```
These dependencies were not found:

* antd-mobile/es/button in ./src/pages/home-my/index.tsx
* antd-mobile/es/button/style in ./src/pages/home-my/index.tsx
...
```

那么可以尝试在 `config.js` 中增加以下配置：

```js
{
  antd: { mobile: false }
}
```

### 从 v2 如何迁移到 v5？

v5 是完全重写的一个版本，所以 v2 和 v5 的差异非常之大，迁移意味着可能需要做大量的组件替换。

为了降低迁移成本，你可以通过别名的方式来安装 antd-mobile v5，同时保留 v2 版本：

```bash
$ npm install --save antd-mobile-v5@npm:antd-mobile@next
# or
$ yarn add antd-mobile-v5@npm:antd-mobile@next
```

对应的 package.json 为：

```json
{
  "antd-mobile": "^2.3.2",
  "antd-mobile-v5": "npm:antd-mobile@next"
}
```

这样可以做到两个版本临时并存，从而可以逐步的替换组件。

```js
import { Button } from 'antd-mobile' // v2
import { Button } from 'antd-mobile-v5' // v5
```

### 兼容哪些浏览器？

目前的兼容性标准为 iOS >= 10 和 Android >= 5。
