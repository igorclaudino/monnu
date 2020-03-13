import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Malformatted token' });

    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Invalid token' });

        req.userId = decoded.id;
        return next();
    });

};