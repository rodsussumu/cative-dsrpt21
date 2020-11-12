const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if(!authHeader) return response.json({error: {message: "Token não informado"}})

    const parts = authHeader.split(' ');
    if(!parts.length === 2) return response.json({error: {message: "Token error"}})

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))  return response.json({error: {message: "Token com formato inválido"}});

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return response.json({error: {message: "Token inválido"}})
        request.userId = decoded.id;
    }) 
    next();
}