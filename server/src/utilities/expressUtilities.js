
/**
 * Wrapper function to handle asynchronous calls with ExpressJS.
 * @param {function} callback - The async function to be wrapped.
 */
export function asyncWrapper(callback) {
    return function(request, response, next) {
        callback(request, response, next).catch(next);
    }
}