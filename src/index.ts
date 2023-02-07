/*
 * @Author: Yoneyy (y.tianyuan) 
 * @Date: 2023-02-07 16:59:37 
 * @Last Modified by: Yoneyy (y.tianyuan)
 * @Last Modified time: 2023-02-07 17:17:47
 */

import reLaunch from './middleware/reLaunch';
import switchTab from './middleware/switchTab';
import redirectTo from './middleware/redirectTo';
import navigateTo from './middleware/navigateTo';
import navigateBack from './middleware/navigateBack';
import { compose, getMiddlewaresInContext } from './shared';
import {
  RouterMiddlewares,
  MiddlewareBaseContext,
  RouterMiddlewareFunction,
} from './typings';

class Router {

  private middlreware: RouterMiddlewares<unknown> = [];

  use(fn: RouterMiddlewareFunction<unknown>) {
    this.middlreware.push(fn);
    return this;
  }

  /**
   * 创建新的 Router 实例
   * Create a WeioRouter instance
   * 
   * @author yoneyy (y.tianyuan)
   */
  create() {
    return new Router();
  }

  /**
   * 保留当前页面，跳转到应用内的某个页面
   * Jump to a page within the app
   * 
   * @param ctx 
   * @author yoneyy (y.tianyuan)
   */
  go<T extends WechatMiniprogram.NavigateToOption>(ctx: T & MiddlewareBaseContext<T>) {
    compose(getMiddlewaresInContext(ctx, this.middlreware, navigateTo))(ctx);
  }

  /**
   * 关闭当前页面，返回上一页面或多级页面
   * Close the current page, return to the previous page or multi-level page
   * 
   * @param ctx
   * @author yoneyy (y.tianyuan) 
   */
  back<T extends WechatMiniprogram.NavigateBackOption>(ctx: T & MiddlewareBaseContext<T>) {
    compose(getMiddlewaresInContext(ctx, this.middlreware, navigateBack))(ctx);
  }

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   * Jump to the tabBar page and close all other non-tabBar pages
   * 
   * @param ctx 
   * @author yoneyy (y.tianyuan) 
   */
  tab<T extends WechatMiniprogram.SwitchTabOption>(ctx: T & MiddlewareBaseContext<T>) {
    compose(getMiddlewaresInContext(ctx, this.middlreware, switchTab))(ctx);
  }

  /**
   * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
   * 
   * @param ctx 
   * @author yoneyy (y.tianyuan) 
   */
  redirect<T extends WechatMiniprogram.SwitchTabOption>(ctx: T & MiddlewareBaseContext<T>) {
    compose(getMiddlewaresInContext(ctx, this.middlreware, redirectTo))(ctx);
  }

  /**
   * 关闭所有页面，打开到应用内的某个页面
   * 
   * @param ctx 
   * @author yoneyy (y.tianyuan) 
   */
  reLaunch<T extends WechatMiniprogram.SwitchTabOption>(ctx: T & MiddlewareBaseContext<T>) {
    compose(getMiddlewaresInContext(ctx, this.middlreware, reLaunch))(ctx);
  }
}

export default Router;