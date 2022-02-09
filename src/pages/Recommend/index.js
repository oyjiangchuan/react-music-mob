import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Slider from '../../components/slider/index';
import * as actionTypes from './store/actionCreator';
import RecommendList from '../../components/list/index';
import { Content } from './style';
import Scroll from '../../baseUI/scroll/index';
import { forceCheck } from 'react-lazyload'; // 可以使滚动的页面也支持懒加载效果
import Loading from '../../baseUI/loading/index';

function Recommend(props) {
    const { songsCount } = props;
    const { bannerList, recommendList, enterLoading } = props;
    const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

    useEffect(() => {
        // 如果页面有数据，则不发请求
        //immutable 数据结构中长度属性 size
        if (!bannerList.size) {
            getBannerDataDispatch();
        }
        if (!recommendList.size) {
            getRecommendListDataDispatch();
        }
        //eslint-disable-next-line
    }, []);

    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : [];

    return (
        <Content play={songsCount.size}> {/* 将songsCount变量传入样式中 */}
            <Scroll className="list" onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerListJS}></Slider>
                    <RecommendList recommendList={recommendListJS}></RecommendList>
                </div>
            </Scroll>
            {enterLoading ? <Loading></Loading> : null}
            {/* 将目前所在路由的下一层子路由加以渲染 */}
            {renderRoutes(props.route.routes)}
        </Content>
    )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
    // 不要在这里将数据 toJS
    // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn(['recommend', 'enterLoading']),
    songsCount: state.getIn(['player', 'playList']), // 尽量减少 toJS 操作，直接取 size 属性就代表了 list 的长度
})

const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actionTypes.getBannerList());
        },
        getRecommendListDataDispatch() {
            dispatch(actionTypes.getRecommendList());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));