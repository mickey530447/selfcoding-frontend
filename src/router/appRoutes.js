import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as AppRoutes from './router';
import Login from '../Pages/Login';
import TopicPage from '../Pages/TopicPage';
import Home from '../Pages/Home';
import Classroom from '../Pages/Classroom';
import Challenge from '../Pages/Challenge';
import Problem from '../Pages/Problem';
import ProblemDetail from '../Pages/ProblemDetail';
import YourAccount from '../Pages/YourAccount';

const ROUTES = [
  {
    path: AppRoutes.LOGIN,
    exact: true,
    component: <Login />,
    title: 'login',
  },
  {
    path: AppRoutes.TOPIC_LIST,
    exact: true,
    component: <TopicPage />,
    title: 'Topic List',
  },
  {
    path: AppRoutes.HOME,
    exact: true,
    component: <Home />,
    title: 'Home',
  },
  {
    path: AppRoutes.PROBLEM,
    exact: true,
    component: <Problem />,
    title: 'Problem',
  },
  {
    path: `${AppRoutes.PROBLEM}/:problem_id`,
    exact: true,
    component: <ProblemDetail />,
    title: 'Problem',
  },
  {
    path: AppRoutes.YOUR_ACCOUNT,
    exact: true,
    component: <YourAccount />,
    title: 'Your Account',
  },
  {
    path: AppRoutes.CLASSROOM,
    exact: true,
    component: <Classroom />,
    title: 'Class room',
  },
  {
    path: AppRoutes.CHALLENGE,
    exact: true,
    component: <Challenge />,
    title: 'Challenge',
  },
];

const StudentRoutes = () => {
  return (
    <Switch>
      {ROUTES.map((route, i) => (
        <Route key={i} path={route.path} exact={route.exact}>
          <Helmet>
            <title>{route.title}</title>
          </Helmet>
          {route.component}
        </Route>
      ))}
    </Switch>
  );
};

export default StudentRoutes;
