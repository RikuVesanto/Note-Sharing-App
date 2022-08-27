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
 * Register new user with given data.
 * @param {*} data Object that includes user data for registration.
 * @param {*} callbacks Object with optional callback functions named onSuccess, onError and onCompletion
 */
async function register(data, callbacks) {
  await executeRequestCallbacks(
    axios.post(`${url}/users/register`, data),
    callbacks
  )
}

export { register }
