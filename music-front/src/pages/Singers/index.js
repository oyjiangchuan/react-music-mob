import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { categoryTypes, alphaTypes } from '../../api/config';
import Horizen from '../../baseUI/horizen-item/index';
import { NavContainer, List, ListItem, ListContainer } from './style';
import Scroll from '../../baseUI/scroll/index';
import LazyLoad, { forceCheck } from 'react-lazyload';
import {
    changeEnterLoading,
    changePageCount,
    changePullUpLoading,
    changePullDownLoading,
    getHotSingerList,
    refreshMoreHotSingerList,
    getSingerList,
    refreshMoreSingerList
} from './store/actionCreator';

function Singers(props) {
    //mock 数据
    /* const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
        return {
            picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
            name: "隔壁老樊",
            accountId: 277313426,
        }
    }); */

    const { singerList, pullUpLoading, pullDownLoading, pageCount } = props;
    const { getHotSingerDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props;

    useEffect(() => {
        if (!singerList.size) {
            getHotSingerDispatch()
        }
        //eslint-disable-next-line
    }, [])

    const singerListJS = singerList ? singerList.toJS() : []
    // 渲染函数，返回歌手列表
    const renderSingerList = () => {
        return (
            <List>
                {
                    singerListJS.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + "" + index}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                                        <img src={`${item.picUrl}?param=300*300`} width="100%" height="100%" alt="music" />
                                    </LazyLoad>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };

    let [category, setCategory] = useState('');
    let [alpha, setAlpha] = useState('');

    let handleUpdateAlpha = (val) => {
        setAlpha(val);
        updateDispatch(category, val);
    }

    let handleUpdateCatetory = (val) => {
        setCategory(val);
        updateDispatch(val, alpha);
    }

    const handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, category === '', pageCount);
    };

    const handlePullDown = () => {
        pullDownRefreshDispatch(category, alpha);
    };

    return (
        <div>
            <NavContainer>
                <Horizen list={categoryTypes} title={"分类 (默认热门):"} handleClick={val => handleUpdateCatetory(val)} oldVal={category}></Horizen>
                <Horizen list={alphaTypes} title={"首字母:"} handleClick={val => handleUpdateAlpha(val)} oldVal={alpha}></Horizen>
            </NavContainer>
            <ListContainer>
                <Scroll onScroll={forceCheck}
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading} >
                    {renderSingerList()}
                </Scroll>
            </ListContainer>
        </div>
    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),     //控制进场Loading
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),   //控制上拉加载动画
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']), //控制下拉加载动画
    pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getHotSingerDispatch() {
            dispatch(getHotSingerList())
        },
        // 点击不同分类重新请求数据
        updateDispatch(category, alpha) {
            dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
            dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
            dispatch(getSingerList(category, alpha));
        },
        // 滑到最底部刷新部分的处理
        pullUpRefreshDispatch(category, alpha, hot, count) { // category, alpha, hot, count参数的含义
            dispatch(changePullUpLoading(true));
            dispatch(changePageCount(count + 1));
            if (hot) {
                dispatch(refreshMoreHotSingerList());
            } else {
                dispatch(refreshMoreSingerList(category, alpha));
            }
        },
        // 顶部下拉刷新
        pullDownRefreshDispatch(category, alpha) {
            dispatch(changePullDownLoading(true));
            dispatch(changePageCount(0));//属于重新获取数据
            if (category === '' && alpha === '') {
                dispatch(getHotSingerList());
            } else {
                dispatch(getSingerList(category, alpha));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));