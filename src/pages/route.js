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
      indexRoute: MembersList,
      childRoutes: [
        {
          path: 'new',
          module: MembersNew,
          authRequire: true,
        }
      ]
    },
    {
      path: 'activitys',
      module: Activitys,
      authRequire: true,
      indexRoute: ActivitysOverview,
      childRoutes: [
        {
          path: 'list',
          module: ActivitysList,
          authRequire: true,
          childRoutes: [
            {
              path: ':id',
              module: ActivitysDetail,
              authRequire: true,
              childRoutes: [
                {
                  path: 'graphic',
                  module: ActivitysGraphic,
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
      indexRoute: UsersOverview,
      childRoutes: [
        {
          path: 'list',
          module: UsersList,
          authRequire: true,
          childRoutes: [
            {
              path: ':id',
              module: UsersDetail,
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
      indexRoute: {
        onEnter: (nextState, replace) => (replace('/consumptions/list'))
      },
      childRoutes: [
        {
          path: 'list',
          module: ConsumptionsList,
          authRequire: true,
          childRoutes: [
            {
              path: ':id',
              module: ConsumptionsDetail,
              authRequire: true,
            },
          ]
        },
        {
          path: 'refund',
          module: ConsumptionsRefund,
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
