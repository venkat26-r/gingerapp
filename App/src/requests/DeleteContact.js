import Request from '../utils/Request';
import Promise from 'bluebird';

export default function DeleteContact(contactId) {
    return new Promise((resolve, reject) => {
        Request.delete(`/contacts/${contactId}`)
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}
