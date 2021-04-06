const { key, secret } = require('../keys/sc.json')
const {OAuth} = require('oauth')
const apiBase = 'https://api.schoology.com/v1'

const oauth = new OAuth(
    `${apiBase}/oauth/request_token`,
    `${apiBase}/oauth/access_token`,
    key,
    secret,
    '1.0',
    null,
    'HMAC-SHA1'
)



oauth.setClientOptions({
    requestTokenHttpMethod: 'GET',
    accessTokenHttpMethod: 'GET',
    followRedirects: true
})

// node-oauth uses callbacks òAó
function promiseify (fn) {
    return (...args) => new Promise((resolve, reject) => {
        fn(...args, (err, ...out) => {
            if (err) {
                err.args = args
                err.out = out
                //console.error(err, out)
                reject(err)
            } else {
                resolve(out)
            }
        })
    })
}

oauth.getOAuthRequestToken = promiseify(oauth.getOAuthRequestToken.bind(oauth))
oauth.getOAuthAccessToken = promiseify(oauth.getOAuthAccessToken.bind(oauth))
oauth.get = promiseify(oauth.get.bind(oauth))


module.exports = oauth;
