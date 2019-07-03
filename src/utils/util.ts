export function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好';
}

/**
 * 触发 window.resize，窗口自适应
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('resize', true, true);
  // event.eventType = 'message';
  window.dispatchEvent(event);
}
