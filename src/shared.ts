/**
 * @file Router Shared
 * 
 * @author yoneyy (y.tianyuan)
 */

import { ComposeMiddleware, Middlewares, NavigateComposeOption, RouterMiddlewares } from "./typings";

/**
 * compose middleware
 * 
 * @param middleware 
 * @author yoneyy (y.tianyuan)
 */
export function compose<T>(middleware: Middlewares<T>): ComposeMiddleware<T> {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
  }

  return function (context: T) {
    function dispatch(index: number): Promise<any> {
      const fn = middleware[index];
      if (
        fn === undefined
        || index >= middleware.length
      ) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, index + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return dispatch(0);
  }
}

/**
 * 抽离 middleware
 * 
 * @param middleware 
 * @author yoneyy (y.tianyuan)
 */
export function detachment<T>(middleware: RouterMiddlewares<T>): Middlewares<T> {
  return middleware.map(m => m.action);
}

/**
 * 忽略某个 middleware
 * 
 * @param middleware 
 * @param keys 
 * @author yoneyy (y.tianyuan)
 */
export function ignore<T>(middleware: RouterMiddlewares<T>, keys: string[]): RouterMiddlewares<T> {
  return middleware.filter(m => keys.indexOf(m.key) === -1);
}

/**
 * 从context中获取中间件并进行成compose函数可使用的中间件
 * 
 * @param context 
 * @param midways 
 * @author yoneyy (y.tianyuan)
 */
export function getMiddlewaresInContext<T = NavigateComposeOption>(
  context: NavigateComposeOption,
  beforMidways: RouterMiddlewares<T> = [],
  ...afterMidways: RouterMiddlewares<T>
) {
  const { middleware = [], ignoreMiddleware = [] } = context;
  const middlewares = detachment(ignore([...beforMidways, ...middleware, ...afterMidways], ignoreMiddleware));
  Reflect.deleteProperty(context, "middleware");
  Reflect.deleteProperty(context, "ignoreMiddleware");
  return middlewares;
}