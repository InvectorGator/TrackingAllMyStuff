import { Request, Response } from "express";

/**
 * Wrapper function to handle asynchronous calls with ExpressJS.
 * @param callback - The async function to be wrapped.
 * @returns Wrapped function understandable by ExpressJS.
 */
export function asyncWrapper(callback: Function) {
    return function(request: Request, response: Response, next: Function | undefined) {
        callback(request, response, next).catch(next);
    }
}