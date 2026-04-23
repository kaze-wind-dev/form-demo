export default class Observer {
  constructor(input, callback, options) {
      this.io = null;
      const defaultOptions = {
          root: null,
          rootMargin: '0px',
          threshold: 0,
          once: true,
      };
      // 様々な入力形式に対応
      this.els = this.normalizeElements(input);
      this.callback = callback;
      this.options = { ...defaultOptions, ...options };
      if (this.els.length > 0) {
          this.init();
      }
  }
  /**
   * 様々な入力形式をElement配列に正規化
   */
  normalizeElements(input) {
      if (typeof input === 'string') {
          // セレクタ文字列の場合
          return Array.from(document.querySelectorAll(input));
      }
      else if (input instanceof NodeList) {
          // NodeListの場合
          return Array.from(input);
      }
      else if (input instanceof Element) {
          // 単一のElementの場合
          return [input];
      }
      else if (Array.isArray(input)) {
          // Element配列の場合
          return input;
      }
      return [];
  }
  init() {
      const { once, ...observerOptions } = this.options;
      const cb = (entries, observer) => {
          this.callback(entries, observer);
          if (once) {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      observer.unobserve(entry.target);
                  }
              });
          }
      };
      this.io = new IntersectionObserver(cb, observerOptions);
      this.els.forEach(el => {
          this.io.observe(el);
      });
      return this;
  }
  /**
   * 監視を破棄
   */
  destroy() {
      this.disconnect();
      this.els = [];
      this.callback = () => { };
      this.options = { once: true };
      this.io = null;
  }
  /**
   * 監視を再開
   */
  reconnect() {
      this.init();
  }
  /**
   * 監視を停止
   */
  disconnect() {
      if (this.io) {
          this.io.disconnect();
          this.io = null;
      }
  }
  /**
   * 監視を再開
   */
  observe() {
      this.els.forEach(el => {
          this.io.observe(el);
      });
  }
  unobserve() {
      this.els.forEach(el => {
          this.io.unobserve(el);
      });
  }
  /**
   * 監視中の要素を取得
   */
  getElements() {
      return this.els;
  }
}
//# sourceMappingURL=observer.js.map