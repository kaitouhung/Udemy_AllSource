import axios from 'axios';
import { URI_FETCH } from '../constants';
import STORE from '../stores';
import Axios from 'axios';
export const loginRequest = ({ username, password, history }) => {
    console.log({ username, password })
    return dispatch => {
        dispatch({
            type: 'USER_REQUEST_LOGIN',
            payload: null
        });

        return axios.post(`${URI_FETCH}/login`, { username, password })
            .then(resp => {
                const respt = resp.data;
                if (respt.error) {
                    dispatch({
                        type: 'USER_LOGIN_ERROR',
                        payload: {
                            message: respt.message
                        }
                    });
                } else if (!respt.error) {
                    localStorage.setItem('token', respt.data.token);
                    dispatch({
                        type: 'LOGIN_SUCCESSED',
                        payload: {
                            username: respt.data.username,
                            token: respt.data.token
                        }
                    });
                    history.push('/dashboard');
                }
            }).catch(err => {
                dispatch({
                    type: 'USER_LOGIN_ERROR',
                    payload: {
                        message: err.message
                    }
                });
            })
    }
}

export const refreshApp = () => {
    let token = localStorage.getItem('token');
    if (!token)
        return STORE.dispatch({
            type: 'CLEAR_STATE_USER',
            payload: null
        });
    Axios.get(`${URI_FETCH}/refresh-token/${token}`)
        .then(resp => {
            let respt = resp.data;
            return STORE.dispatch({
                type: 'LOGIN_SUCCESSED',
                payload: {
                    username: respt.data.username,
                    token   : respt.data.token
                }
            });
        })
        .catch(err => console.log({ err: err.message }));
}

export const logout = (history) => {
    localStorage.removeItem('token');
    STORE.dispatch({
        type: 'CLEAR_STATE_USER',
        payload: null
    });
    return history.push('/');
}