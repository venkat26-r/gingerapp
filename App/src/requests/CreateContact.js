import Request from '../utils/Request';
import Promise from 'bluebird';

export default function CreateContact(contactData) {
    return new Promise((resolve, reject) => {
        Request.post('/contacts', contactData)
            .then(res => {
                if (res && res.data && res.data.id) {
                    resolve(res.data);
                } else {
                    reject();
                }
            })
            .catch(err => reject(err));
    });
}
