# Layer 层

<code src="./demos/index.jsx"></code>

# API

## Layer

| 属性          | 说明   | 类型  | 默认值  |
| ------------ | ----- | ----- | ------ |
| controllerId | LayerController的id，不填内部会自动生成id | `string` | - |
| active       | 激活状态下，Layer默认出现在 body 下的最后一个字节点 | `boolean` | `false` |
| component    | Layer承载的组件，默认组件为 通用层 LayerGeneral 组件 | `Element` | `null` |
