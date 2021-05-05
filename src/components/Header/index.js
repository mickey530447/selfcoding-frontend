import React from 'react';
import { Menu } from 'antd';
import Layout, { Header } from 'antd/lib/layout/layout';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logOut } from '../../redux/actions/appAction';
import * as PageRoutes from '../../router/router';

function MainHeader({ handleLogOut }) {
  const history = useHistory();
  const handleClickHeader = (data) => {
    if (data.key === PageRoutes.LOGOUT) {
      handleLogOut();
      sessionStorage.removeItem('mytoken');
      sessionStorage.removeItem('email');
      history.push(PageRoutes.LOGIN);
      return;
    }
    history.push(data.key);
  };

  return (
    <div>
      <Layout>
        <Header className="header row">
          <Menu
            onClick={handleClickHeader}
            className="col-md-8"
            theme="dark"
            mode="horizontal"
          >
            <Menu.Item key={PageRoutes.HOME}>Home</Menu.Item>
            <Menu.Item key={PageRoutes.TOPIC_LIST}>Topic</Menu.Item>
            <Menu.Item key={PageRoutes.CLASSROOM}>Class</Menu.Item>
            <Menu.Item key={PageRoutes.PROBLEM}>Problem</Menu.Item>
            <Menu.Item key={PageRoutes.CHALLENGE}>Challenge</Menu.Item>
            <Menu.Item key={PageRoutes.YOUR_ACCOUNT}>Your Account</Menu.Item>
            <Menu.Item key={PageRoutes.LOGOUT} className="btn-danger">
              Logout
            </Menu.Item>
          </Menu>
          {/* <button type = "button" className = "btn btn-danger col-md-1 offset-md-3">Logout</button> */}
        </Header>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducers,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogOut: (params) => dispatch(logOut(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MainHeader);
