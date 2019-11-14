import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, 'パスワード', 'password');
    this._checkLength = this._checkLength.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkLength)
      .then(this._checkFormat)
      .then((res) => {
        return { success: true }; // Promise.resolve({ success: true })と同一
      })
      .catch(err => {
        return err; // Promise.resolve(err)と同一
      });
  }
  _checkLength() {
    if (this.val.length >= 8) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: 'password',
        message: 'パスワードが短すぎます。'
      });
    }
  }
  _checkFormat() {
    const re = /^[a-zA-Z0-9_.-@][A-Z+][_.-@+]*$/;
    const match = re.test(this.val); // マッチするならtrue、しないならfalseを返す。
    if (match) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: this.type,
        message: `${this.typeName}には半角英数字または@_-.の4つの記号のみを利用可能です。1文字以上の大文字のアルファベットと記号(_-.@)を含む必要があります。`
      })
    }
  }
}