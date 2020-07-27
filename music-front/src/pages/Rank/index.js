import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRankList } from './store/index';
import { filterIndex } from '../../api/utils';
import { Container, List, ListItem, SongList, EnterLoading } from './style';
import Scroll from '../../baseUI/scroll/index';
import Loading from '../../baseUI/loading/index';
import { renderRoutes } from 'react-router-config';

function Rank(props) {
    const { rankList: list, loading } = props;
    const { getRankListDataDispatch } = props;
    let rankList = list ? list.toJS() : [];

    let globalStartIndex = filterIndex(rankList);
    let officialList = rankList.slice(0, globalStartIndex);
    let globalList = rankList.slice(globalStartIndex);

    useEffect(() => {
        if (!rankList.length) {
            getRankListDataDispatch();
        }
        //eslint-disable-next-line
    }, []);

    const enterDetail = (detail) => {
        console.log(detail)
        props.history.push(`/rank/${detail.id}`)
    }

    // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
    const renderRankList = (list, global) => {
        return (
            <List globalRank={global}>
                {
                    list.map((item, index) => {
                        return (
                            <ListItem key={`${item.coverImgId}+${index}`} tracks={item.tracks} onClick={() => enterDetail(item)}>
                                <div className="img_wrapper">
                                    <img src={item.coverImgUrl} alt="" />
                                    <div className="decorate"></div>
                                    <span className="update_frequecy">{item.updateFrequency}</span>
                                </div>
                                {renderSongList(item.tracks)}
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    const renderSongList = (list) => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
                    })
                }
            </SongList>
        ) : null;
    }

    // 榜单数据未加载出来之前都给隐藏
    let displayStyle = loading ? { "display": "none" } : { "display": "" };

    return (
        <Container>
            <Scroll>
                <div>
                    <h1 className="offical" style={displayStyle}> 官方榜 </h1>
                    {renderRankList(officialList)}
                    <h1 className="global" style={displayStyle}> 全球榜 </h1>
                    {renderRankList(globalList, true)}
                    {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
                </div>
            </Scroll>
            {renderRoutes(props.route.routes)}
        </Container>
    );
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
    rankList: state.getIn(['rank', 'rankList']),
    loading: state.getIn(['rank', 'loading']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
    return {
        getRankListDataDispatch() {
            dispatch(getRankList());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));