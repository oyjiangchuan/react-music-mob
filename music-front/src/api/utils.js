const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
}
// 防抖函数
const debounce = (fn, delay) => {
  let timer;
  return function (...args) { // 这里拿到args是fn中输入的参数
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};

export { getCount, debounce };