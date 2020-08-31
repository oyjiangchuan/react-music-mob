import React from 'react';
import { renderRoutes } from 'react-router-config';
//renderRoutes 这个方法只渲染一层路由，之前 Home 处于数组第一层，后面的功能组件在第二层，当然不能正常渲染啦。其实要解决这个问题也非常简单，只需在 Home 中再次调用 renderRoutes 即可
import { Top, TabItem, Tab } from './style';
import { NavLink } from 'react-router-dom'; // 利用 NavLink 组件进行路由跳转
import Player from '../Player/index';

function Home(props) {
    const { route } = props
    return (
        <div>
            <div>
                <Top>
                    <span className="iconfont menu">&#xe65c;</span>
                    <span className="title">WebApp</span>
                    <span className="iconfont search">&#xe62b;</span>
                </Top>
                <Tab>
                    <NavLink to="/recommend" activeClassName="selected"><TabItem><span> 推荐 </span></TabItem></NavLink>
                    <NavLink to="/singers" activeClassName="selected"><TabItem><span> 歌手 </span></TabItem></NavLink>
                    <NavLink to="/rank" activeClassName="selected"><TabItem><span> 排行榜 </span></TabItem></NavLink>
                </Tab>
            </div>
            {renderRoutes(route.routes)}
            <Player></Player>
        </div>
    )
}

export default React.memo(Home);