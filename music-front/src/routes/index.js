import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../pages/Home/index';
import Recommend from '../pages/Recommend/index';
import Singers from '../pages/Singers/index';
import Rank from '../pages/Rank/index';
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
        component: Recommend
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/rank",
        component: Rank
      }
    ]
  }
]