import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../pages/Home/index';
import Recommend from '../pages/Recommend/index';
import Singers from '../pages/Singers/index';
import Singer from '../pages/Singer/index';
import Rank from '../pages/Rank/index';
import Album from '../pages/Album/index';
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
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            component: Album
          }
        ]
      },
      {
        path: "/singers",
        component: Singers,
        routes: [
          {
            path: "/singers/:id",
            component: Singer
          }
        ]
      },
      {
        path: "/rank",
        component: Rank,
        routes: [
          {
            path: "/rank/:id",
            component: Album
          }
        ]
      }
    ]
  }
]