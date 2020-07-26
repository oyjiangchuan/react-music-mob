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

// 处理数据，找出第一个没有歌名的排行榜的索引
const filterIndex = rankList => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

// 处理歌手列表拼接歌手名字
const getName = list => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

// 判断一个对象是否为空
export const isEmptyObject = obj => !obj || Object.keys(obj).length === 0;

export { getCount, debounce, filterIndex, getName };