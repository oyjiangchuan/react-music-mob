import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import { debounce } from '../../api/utils'; // 防抖函数
// 样式
const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: ${style["theme-color"]};
  .icon-back {
    font-size: 24px;
    color: ${style["font-color-light"]};
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: ${style["theme-color"]};
    color: ${style["highlight-background-color"]};
    font-size: ${style["font-size-m"]};
    outline: none;
    border: none;
    border-bottom: 1px solid ${style["border-color"]};
    &::placeholder {
      color: ${style["font-color-light"]};
    }
  }
  .icon-delete {
    font-size: 16px;
    color: ${style["background-color"]};
  }
`

const SearchBox = (props) => {
  const queryRef = useRef();
  const [query, setQuery] = useState('');
  // 从父组件热门搜索中拿到的新关键词
  const { newQuery } = props;
  // 父组件针对搜索关键字发送请求相关的处理
  const { handleQuery } = props;
  // 根据关键字是否存在决定清空按钮的显示/隐藏
  const displayStyle = query ? { display: 'block' } : { display: 'none' };
  // 搜索框内容改变时的逻辑
  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
  };
  // 清空框内容的逻辑
  const clearQuery = () => {
    setQuery('');
    queryRef.current.focus();
  };
  // 缓存方法
  let handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);

  // 进入组件时输入框出现光标
  useEffect(() => {
    queryRef.current.focus();
  }, [])
  // query改变时 执行父组件传来的搜索方法
  useEffect(() => {
    // 注意防抖
    handleQueryDebounce(query);
    // eslint-disable-next-line
  }, [query]);
  // 父组件点了热门搜索的关键字 newQuery、query更新 立即根据新的关键词去搜索
  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery);
    }
    // eslint-disable-next-line
  }, [newQuery]);
  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => props.back()}>&#xe655;</i>
      <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange} />
      <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe600;</i>
    </SearchBoxWrapper>
  )
}

export default SearchBox;