import React from 'react'
import { Menu } from 'antd';
import Layout, { Header } from 'antd/lib/layout/layout';
import {useHistory} from 'react-router-dom'
import * as PageRoutes from '../../router/router';

function MainHeader() {
    const history = useHistory();
    const handleClickHeader = (data) => {
        history.push(data.key);
    }
    
    return (
        <div>
            <Layout>
                <Header className = "header row">
                    <Menu onClick={handleClickHeader} className = "col-md-8" theme = "dark" mode = "horizontal">
                        <Menu.Item key={PageRoutes.HOME}>Home</Menu.Item>
                        <Menu.Item key={PageRoutes.TOPIC_LIST}>Topic</Menu.Item>
                        <Menu.Item key={PageRoutes.CLASSROOM}>Class</Menu.Item>
                        <Menu.Item key={PageRoutes.PROBLEM}>Problem</Menu.Item>
                        <Menu.Item key={PageRoutes.CHALLENGE}>Challenge</Menu.Item>
                        <Menu.Item key={PageRoutes.YOURACCOUNT}>Your Account</Menu.Item>
                        <Menu.Item className = " btn-danger" key="7">Logout</Menu.Item>
                    </Menu>
                    {/* <button type = "button" className = "btn btn-danger col-md-1 offset-md-3">Logout</button> */}
                </Header>
            </Layout>
        </div>
    )
}

export default MainHeader
