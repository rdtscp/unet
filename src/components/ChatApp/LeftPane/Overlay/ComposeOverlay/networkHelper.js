import axios from 'axios';


const network = {

    // Gets a CSRF token from API, and returns it in a callback.
    getCSRF: function(cb) {
        return (
            axios({
                method:'GET',
                url:'http://api.localhost:1337/csrfToken',
                withCredentials: true,
                contentType: 'json',
            })
            .then((response) => {
                return cb(response.data._csrf);
            })
        );
    },

    // Posts a request to check if a DeviceToken is valid, and returns result in a callback.
    tokenValid: function(token, csrf, cb) {
        return (
            axios({
                method:'POST',
                url:'http://api.localhost:1337/unet/device/get',
                data: {
                  _csrf: csrf,
                  token: token
                },
                withCredentials: true,
                contentType: 'json',
            })
            .then((response) => {
                return cb(response.data.tokenValid);
            })
        );
    }

}

export default network;