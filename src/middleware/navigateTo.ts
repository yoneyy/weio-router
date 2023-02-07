/**
 * @file Middleware NavigateTo
 * 
 * @author yoneyy (y.tianyuan)
 */

export default {
  key: 'navigateTo',
  action: async (ctx: WechatMiniprogram.NavigateToOption) => {
    wx.navigateTo(ctx);
  }
}