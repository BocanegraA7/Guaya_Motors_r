const authMiddleware = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            mensaje: "401 Unauthorized: Requieres un Token para acceder al API."
        })
    }

    if (!authHeader.startsWith('Bearer ')){
        return response.status(401).json({
            mensaje: "401 Unauthorized: Formato del Token inválido."
        })
    }

    const token = authHeader.split(' ')[1];

    if (token !== process.env.API_TOKEN){
        return response.status(401).json({
            mensaje: "401 Unauthorized: Token Invalido."
        })
    }

    next();
}

module.exports = authMiddleware;