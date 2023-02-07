/**
 * @file Middleware ReLaunch
 * 
 * @author yoneyy (y.tianyuan)
 */

export default {
  key: 'reLaunch',
  action: async (ctx: WechatMiniprogram.ReLaunchOption) => {
    wx.reLaunch(ctx);
  }
}