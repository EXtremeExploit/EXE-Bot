const request = require('superagent');
class Api {
    constructor() {
        this.baseUrl = 'http://random.cat';
    }
    apiCall(endpoint) {
        return new Promise((resolve, reject) => {
            request.get(this.baseUrl + endpoint)
                .end((error, response) => {
                    if (!error && response.status === 200)
                        resolve(response.body);
                    else
                        reject(new Error(error.status || error.response));
                });
        });
    }
    getCat() {
        return this.apiCall('/meow');
    }
}
module.exports = Api;