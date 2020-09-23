import React, { Suspense, lazy } from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../pages/Home/index';
const RecommendComponent = lazy(() => import('../pages/Recommend/index'));
const SingersComponent = lazy(() => import('../pages/Singers/index'));
const SingerComponent = lazy(() => import('../pages/Singer/index'));
const RankComponent = lazy(() => import('../pages/Rank/index'));
const AlbumComponent = lazy(() => import('../pages/Album/index'));
const SearchComponent = lazy(() => import('../pages/Search/index'));

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"} />
        )
      },
      {
        path: "/recommend",
        component: SuspenseComponent(RecommendComponent),
        routes: [
          {
            path: "/recommend/:id",
            component: SuspenseComponent(AlbumComponent)
          }
        ]
      },
      {
        path: "/singers",
        component: SuspenseComponent(SingersComponent),
        routes: [
          {
            path: "/singers/:id",
            component: SuspenseComponent(SingerComponent)
          }
        ]
      },
      {
        path: "/rank",
        component: SuspenseComponent(RankComponent),
        routes: [
          {
            path: "/rank/:id",
            component: SuspenseComponent(AlbumComponent)
          }
        ]
      },
      {
        path: "/album/:id",
        exact: true,
        key: "album",
        component: SuspenseComponent(AlbumComponent)
      },
      {
        path: "/search",
        exact: true, // 精准匹配?
        key: "search",
        component: SuspenseComponent(SearchComponent)
      }
    ]
  }
]