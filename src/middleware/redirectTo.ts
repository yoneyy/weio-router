/**
 * @file Middleware RedirectTo
 * 
 * @author yoneyy (y.tianyuan)
 */

export default {
  key: 'redirectTo',
  action: async (ctx: WechatMiniprogram.RedirectToOption) => {
    wx.redirectTo(ctx);
  }
}