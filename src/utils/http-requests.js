import axios from 'axios'

url = 'http://192.168.1.249:3000'

/**
 * Execute the callbacks on axios HTTP request promise. Should not be used separately.
 * @param {*} request Request promise
 * @param {*} callbacks Callbacks object with onSuccess, onError and onCompletion functions
 */
async function executeRequestCallbacks(request, callbacks) {
  return request
    .then((response) => {
      try {
        callbacks.onSuccess(response)
      } catch (callbackError) {}
    })
    .catch((error) => {
      try {
        callbacks.onError(error.response)
      } catch (callbackError) {}
    })
    .then(() => {
      try {
        callbacks.onCompletion()
      } catch (error) {}
    })
}

/**
 * Post given data and execute the given callback based on the result.
 * @param {*} data Object that includes user data for registration.
 * @param {*} requestUrl The specific route that the request is made to.
 * @param {*} callbacks Object with optional callback functions named onSuccess, onError and onCompletion.
 */
async function postData(data, requestUrl, callbacks) {
  await executeRequestCallbacks(axios.post(url + requestUrl, data), callbacks)
}

export { postData }
