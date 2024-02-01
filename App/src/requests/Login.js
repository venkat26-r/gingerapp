import Request from '../utils/Request';
import Promise from 'bluebird';

export default function Login(username, password) {
    return new Promise((resolve, reject) => {
        Request.post('/auth', {
            username,
            password,
        })
            .then(res => {
                if (res && res.data && res.data.token && res.data.user) {
                    window.localStorage.setItem('token', res.data.token);
                    Request.defaults.headers = {
                        Authorization: res.data.token
                    };
                    resolve(res.data.user);
                } else {
                    reject();
                }
            })
            .catch(err => reject(err));
    });
}
