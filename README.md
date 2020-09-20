
<p align="center"><b>一个酷酷的 3d 球</b></p>

# 目录

- [快速入门](#快速入门)
  - [安装](#安装)
  - [依赖](#依赖)
  - [用法](#用法)
- [维护者](#维护者)

## 快速入门

### 安装

```bash
$ npm i duo-3d-sphere --save             # install duo-3d-sphere   
```

### 依赖

[→ three.js](https://threejs.org/)

[→ tween.js](http://www.createjs.cc/tweenjs/)

### 用法

#### main.js 文件：

```js

import duo3dSphere from 'duo-3d-sphere'

Vue.use(duo3dSphere)

```
#### 使用：

```vue
<template>
  <div>
   <duo-3d-sphere
      :table="table"
      :starSize="starSize"
      :starTail="starTail"
      :starAlpha="starAlpha"
      :starAmount="starAmount"
      :sphereSkin="sphereSkin"
      :spherePositionX="spherePositionX"
      :spherePositionY="spherePositionY"
      :spherePositionZ="spherePositionZ"
      :starSpeedReciprocal="starSpeedReciprocal"
      :starsDiameterReciprocal="starsDiameterReciprocal"
      :starIsClockwiseRotation="starIsClockwiseRotation"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: [], // 3d 球体中卡片展示的数据
      starSize: 4, // canvas 背景星星尺寸
      starTail: 0.5, // canvas 背景星星的小尾巴
      starAlpha: 20, // canvas 背景星星的透明度值
      starAmount: 200, // canvas 背景星星的数量
      spherePositionX: 50, // 3d 球体 X 轴的值
      spherePositionY: 50, // 3d 球体 Y 轴的值
      sphereSkin: "shallowBlue", // 3d 球体中卡片的颜色: violet | deepBlue | shallowBlue | 自定义
      spherePositionZ: 2500, // 3d 球体 Z 轴的值
      starSpeedReciprocal: 20, // canvas 背景星星的速度(反比)
      starsDiameterReciprocal: 2, // canvas 背景星星的扩展范围(反比)
      starIsClockwiseRotation: true, // 是否显示 canvas 背景
    };
  },
  mounted() {
    this.generateData();
  },
  methods: {
    generateData() {
      let data = [],
        firstNames = "赵钱孙李周吴郑王",
        lastNames = "云鹤九霄龙腾四海";

      for (let i = 0; i < 100; i++) {
        let f = parseInt(Math.random() * firstNames.length),
          l = parseInt(Math.random() * lastNames.length),
          name = firstNames[f] + lastNames[l];
        data.push({
          title: `${name}`,
          details: "10",
        });
      }
      this.table = data;
    },
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
</style>
```

[→ simple demo](https://duofuni.github.io/duo-3d-sphere/)

## 维护者

- [duofuni](https://github.com/duofuni)