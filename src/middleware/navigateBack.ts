/**
 * @file Middleware NavigateBack
 * 
 * @author yoneyy (y.tianyuan)
 */

export default {
  key: 'navigateBack',
  action: async (ctx: WechatMiniprogram.NavigateBackOption) => {
    wx.navigateBack(ctx);
  }
}