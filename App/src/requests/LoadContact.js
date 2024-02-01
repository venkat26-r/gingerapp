import Request from '../utils/Request';
import Promise from 'bluebird';

export default function LoadContact(contactId) {
    return new Promise((resolve, reject) => {
        Request.get(`/contacts/${contactId}`)
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
