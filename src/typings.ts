/**
 * @file Router Typings
 * 
 * @author yoneyy (y.tianyuan)
 */

export type MiddlewareFunctionNext = () => Promise<void>;
export type MiddlewareFunction<T> = (context: T, next: MiddlewareFunctionNext) => any;
export type ComposeMiddleware<T> = (context: T, next?: MiddlewareFunctionNext) => Promise<void>;
export type Middlewares<T> = Array<MiddlewareFunction<T>>;

export type MiddlewareBaseContext<T> = { middleware?: RouterMiddlewares<T>; ignoreMiddleware?: string[]; }

export type RouterMiddlewareFunction<T> = {
  key: string;
  action: (context: T, next: MiddlewareFunctionNext) => any;
}

export type RouterMiddlewares<T> = Array<RouterMiddlewareFunction<T>>;


export type NavigateComposeOption<T = any> =
  (
    | WechatMiniprogram.NavigateToOption
    | WechatMiniprogram.NavigateBackOption
    | WechatMiniprogram.SwitchTabOption
    | WechatMiniprogram.ReLaunchOption
    | WechatMiniprogram.RedirectToOption
  ) & MiddlewareBaseContext<T>;