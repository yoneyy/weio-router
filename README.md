<div align="center">
  <img src="https://yoneyy.gonghuolianmeng.com/2023-02-07-weio-router.png" alt="weio-router" style="zoom:30%;" />
</div>

<div align="center">
	<img src="https://img.shields.io/github/stars/yoneyy/weio-router?color=yellow" />
  <img src="https://img.shields.io/github/forks/yoneyy/weio-router" />
  <img src="https://img.shields.io/github/issues/yoneyy/weio-router" />
  <img src="https://img.shields.io/github/license/yoneyy/weio-router?logo=MIT" />
</div>


**Process Routing with Middleware for wechat miniprogram**

## How to install `weio-router` ?
```sh

  cd miniprogram

  # yarn
  yarn add weio-router -S --registry=https://registry.npmjs.org/

  # npm
  npm i weio-router -S --registry=https://registry.npmjs.org/
```

## How to use `weio-router` ?

安装完之后需在`微信开发者工具`在菜单栏中找到 `工具` --> `构建npm`

After installation, you need to find the build npm option under Tools in the `WeChat Developer Tools` menu bar

## Router Init

```ts
// esm
import WeioRouter from 'weio-router';

const router = new WeioRouter();

router.create();

router.go();
router.back();
router.tab();
router.redirect();
router.reLaunch();
```

```ts
// cjs
const WeioRouter = require('weio-router');

const router = new WeioRouter();
```

## API

- create
  - 创建一个WeioRouter实例
  - Create a WeioRouter instance
  - ```ts
    import WeioRouter from 'weio-router';
    const router = new WeioRouter();
    router.careate(); // Create a WeioRouter instance
    ```
- go
  - 跳转到应用内的某个页面
  - Jump to a page within the app
  - ```ts
    import WeioRouter from 'weio-router';
    const router = new WeioRouter();
    router.go({
      url: string;
      events: object;
      middleware: RouterMiddlewareFunction<T>[];
      ignoreMiddleware: string[];
      success: Function;
      complete: Function;
    })
    ```
  - [Document](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)
- back
  - 关闭当前页面，返回上一页面或多级页面
  - Close the current page, return to the previous page or multi-level page
  - ```ts
    import WeioRouter from 'weio-router';
    const router = new WeioRouter();
    router.back({
      delta: number;
      fail: Function;
      success: Function;
      complete: Function;
      middleware: RouterMiddlewareFunction<T>[];
      ignoreMiddleware: string[];
    })
    ```
  - [Document](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html)
- tab
  - 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
  - Jump to the tabBar page and close all other non-tabBar pages
  - ```ts
    import WeioRouter from 'weio-router';
    const router = new WeioRouter();
    router.tab({
      url: string;
      middleware: RouterMiddlewareFunction<T>[];
      ignoreMiddleware: string[];
      fail: Function;
      success: Function;
      complete: Function;
    })
    ```
  - [Document](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html)
- redirect
  - 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
  - Close the current page and jump to a page in the app. But jumping to the tabbar page is not allowed
  - ```ts
    import WeioRouter from 'weio-router';
    const router = new WeioRouter();
    router.redirect({
      url: string;
      middleware: RouterMiddlewareFunction<T>[];
      ignoreMiddleware: string[];
      fail: Function;
      success: Function;
      complete: Function;
    })
    ```
  - [Document](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html)
- reLaunch
  - 关闭所有页面，打开到应用内的某个页面
  - Close all pages, open to a page in the app
  - ```ts
    import WeioRouter from 'weio-router';
    const router = new WeioRouter();
    router.redirect({
      url: string;
      middleware: RouterMiddlewareFunction<T>[];
      ignoreMiddleware: string[];
      fail: Function;
      success: Function;
      complete: Function;
    })
    ```
  - [Document](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.reLaunch.html)

## Middleware

### Careate a Middleware
```ts
 // 示例：跳转页面时需要验证是否已经授权登录
 // Example: When jumping to the page, you need to verify whether you have authorized login

 // middleware.ts

 export default {
  key: 'authorized',
  action: async (ctx, next) => {
   const token = wx.getStoreSync('auth:token'); 
   if (string !== typeof token && token === '') {
    wx.showToast({
      icon: 'none',
      title: 'Please authorize login first',
    });
   }else await next();
  }
 }

 // router.ts
 import WeioRouter from 'weio-router';
 import authorized from './authorized.ts';
 const router = new WeioRouter();
 
 // middleware use global
 router.use(authorized);

 // or use block
 router.go({
  url:'/pages/main/main',
  middleware: [authorized],
 });
```

### Ignore Middleware
```ts
router.go({
  url:'/pages/login/login',
  ignoreMiddleware: ['authorized'],
})
```
