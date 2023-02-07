/**
 * @file Middleware SwitchTab
 * 
 * @author yoneyy (y.tianyuan)
 */

export default {
  key: 'switchTab',
  action: async (ctx: WechatMiniprogram.SwitchTabOption) => {
    wx.switchTab(ctx);
  }
}