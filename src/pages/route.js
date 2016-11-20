import Root from './Root';
import Login from './Login';
import NotFound from './NotFound';

import Members from './Members';
import MembersList from './Members/List';
import MembersNew from './Members/New';

import Activitys from './Activitys';
import ActivitysList from './Activitys/List';
import ActivitysDetail from './Activitys/Detail';
import ActivitysGraphic from './Activitys/Graphic';
import ActivitysOverview from './Activitys/Overview';

import Users from './Users';
import UsersList from './Users/List';
import UsersDetail from './Users/Detail';
import UsersOverview from './Users/Overview';

import Consumptions from './Consumptions';
import ConsumptionsList from './Consumptions/List';
import ConsumptionsDetail from './Consumptions/Detail';
import ConsumptionsRefund from './Consumptions/Refund';

const redirectToHome = (nextState, replace) => {
  replace('/members');
};

export default {
  path: '/',
  key: 'root',
  module: Root,
  indexRoute: {
    onEnter: redirectToHome
  },
  childRoutes: [
    {
      path: 'members',
      module: Members,
      authRequire: true,
      key: 'members',
      indexRoute: MembersList,
      childRoutes: [
        {
          path: 'new',
          module: MembersNew,
          key: 'members',
          authRequire: true,
        }
      ]
    },
    {
      path: 'activitys',
      module: Activitys,
      authRequire: true,
      indexRoute: ActivitysOverview,
      key: 'activitys',
      childRoutes: [
        {
          path: 'list',
          module: ActivitysList,
          key: 'activitys',
          authRequire: true,
          childRoutes: [
            {
              path: ':id',
              module: ActivitysDetail,
              key: 'activitys',
              authRequire: true,
              childRoutes: [
                {
                  path: 'graphic',
                  module: ActivitysGraphic,
                  key: 'activitys',
                  authRequire: true,
                },
              ]
            },
          ]
        },
      ]
    },
    {
      path: 'users',
      module: Users,
      authRequire: true,
      key: 'users',
      indexRoute: UsersOverview,
      childRoutes: [
        {
          path: 'list',
          module: UsersList,
          authRequire: true,
          key: 'users',
          childRoutes: [
            {
              path: ':id',
              module: UsersDetail,
              key: 'users',
              authRequire: true,
            },
          ]
        },
      ]
    },
    {
      path: 'consumptions',
      module: Consumptions,
      authRequire: true,
      key: 'consumptions',
      indexRoute: {
        onEnter: (nextState, replace) => (replace('/consumptions/list'))
      },
      childRoutes: [
        {
          path: 'list',
          module: ConsumptionsList,
          authRequire: true,
          key: 'consumptions',
          childRoutes: [
            {
              path: ':id',
              module: ConsumptionsDetail,
              key: 'consumptions',
              authRequire: true,
            },
          ]
        },
        {
          path: 'refund',
          module: ConsumptionsRefund,
          key: 'consumptions',
          authRequire: true,
        }
      ]
    },
    {
      path: 'login',
      module: Login,
    },
    {
      path: '404',
      module: NotFound,
    },
    {
      path: '*',
      key: 'notFound',
      module: NotFound,
      indexRoute: {
        onEnter: (nextState, replace) => {
          replace('/404');
        }
      },
    }
  ]
};
