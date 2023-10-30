import cache from 'memory-cache';
import objectHash from 'object-hash';

function cacheMiddleware(durationInMinutes) {
    return (req, res, next) => {
        const bodyHash = objectHash(req.body);
        const key = `__express__${req.originalUrl || req.url}__${bodyHash}`;
        const cachedBody = cache.get(key);
        if (cachedBody) {
            console.log(`Returning cached result.`)
            res.send(cachedBody);
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                cache.put(key, body, durationInMinutes * 1000 * 60);
                res.sendResponse(body);
            };
            next();
        }
    };
}

export {
    cacheMiddleware
}