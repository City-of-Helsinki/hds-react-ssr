export const getRequestFullUrl = (req) => req.protocol + "://" + req.get("host") + req.originalUrl;
