import { TweenLite } from 'gsap';

export default class Splite {
  /**
   * @param {HTMLElement} el スプライトアニメーションさせるDOM
   * @param {number} interval アニメーションの間隔
   * @param {number} limitX  フレームの横の数(0から始める)
   * @param {number} limitY フレームの縦の数(0から始める)
   */
  constructor(el, interval, limitX, limitY) {
    this._$$el = el; // spliteアニメーションさせるDOM
    this._time = Date.now(); // 現在の時間
    this._timer = -1; // requestAnimationのタイマー
    this._interval = interval; // 間隔
    this._count = 0; // 何度発火したかカウント

    // アニメーションさせるためのデータ
    this._data = {
      w: this._$$el.clientWidth,
      h: this._$$el.clientHeight,
      limitX, // 横に移動する数(0から始める)
      limitY // 縦に移動する数(0から始める)
    };
  }

  init() {
    this._ticker();
    this._onLister();
  }

  _onLister() {
    window.addEventListener('resize', this._resize.bind(this));
  }

  // ここで処理を走らせてる
  _ticker() {
    this._timer = window.requestAnimationFrame(() => this._ticker());

    // 間引き処理
    if (this._time + this._interval - Date.now() < 0) {
      this._time = new Date().getTime();

      // 横の数よりカウントが多い場合0に戻す
      this._count = this._count >= this._data.limitX ? 0 : this._count + 1;

      // 画像を移動
      TweenLite.set(this._$$el, {
        'background-position': `-${this._data.w * this._count}px -${this._data
          .h * this._data.limitY}px`
      });
    }
  }

  _resize() {
    this._data.w = this._$$el.clientWidth;
    this._data.h = this._$$el.clientHeight;
  }
}
