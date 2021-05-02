import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { login } from '../../redux/actions/appAction'
import { HOME } from '../../router/router'
import APIService from '../../core/api/APIService';
import { store } from '../../redux/store';

function Login({ handleLogin, currentUser }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    useEffect(() => {

    }, [])

    useEffect(() => {
        currentUser && history.push(HOME)
    }, [currentUser])

    const loginBtn = () => {
        handleLogin({ username, password })
    }

    return (
        <div className="App ">
            <br />
            <br />

            <h1>Please login</h1>

            <br />
            <br />

            <div className="mb-3">
                <label htmlFor="username" className="form-label">Email</label>
                <input type="text" className="form-control" id="username" placeholder="Please enter your email"
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Please enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <button type="button" onClick={loginBtn} className="btn btn-primary">Login</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.appReducers.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    handleLogin: (params) => dispatch(login(params))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Login);
