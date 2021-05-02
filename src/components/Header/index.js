import React from 'react'
import { Menu } from 'antd';
import Layout, { Header } from 'antd/lib/layout/layout';

function index() {
    return (
        <div>
            <Layout>
                <Header className = "header row">
                    <Menu className = "col-md-8" theme = "dark" mode = "horizontal">
                        <Menu.Item key="1">Home</Menu.Item>
                        <Menu.Item key="2">Topic</Menu.Item>
                        <Menu.Item key="3">Class</Menu.Item>
                        <Menu.Item key="4">Problem</Menu.Item>
                        <Menu.Item key="5">Challenge</Menu.Item>
                        <Menu.Item key="6">Your Account</Menu.Item>
                        <Menu.Item className = " btn-danger" key="7">Logout</Menu.Item>
                    </Menu>
                    {/* <button type = "button" className = "btn btn-danger col-md-1 offset-md-3">Logout</button> */}
                </Header>
            </Layout>
        </div>
    )
}

export default index
