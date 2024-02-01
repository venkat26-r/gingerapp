import Request from '../utils/Request';
import Promise from 'bluebird';

export default function GetContacts() {
    return new Promise((resolve, reject) => {
        Request.get('/contacts')
            .then(res => {
                if (res && res.data) {
                    resolve(res.data);
                } else {
                    reject(res);
                }
            })
            .catch(err => reject(err));
    });
}
