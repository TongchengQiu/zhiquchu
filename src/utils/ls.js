export default {
  /**
   * @param key (String)
   * @param val (String)
   */
  set(key, val) {
    const myVal = JSON.stringify(val);
    window.localStorage.setItem(key, myVal);
    return true;
  },
  /**
   * @param key (String)
   * @param value (String)
   */
  get(key) {
    const myVal = window.localStorage.getItem(key);
    if (myVal === undefined) {
      return '';
    }
    return JSON.parse(myVal);
  },
  /**
   * @param key (String)
   */
  delete(key) {
    return window.localStorage.removeItem(key);
  },
  clear() {
    return window.localStorage.clear();
  }
};
