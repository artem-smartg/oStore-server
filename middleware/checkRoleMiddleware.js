
const jwt = require('jsonwebtoken')

module.exports = function(role){
    return function(req, res, next){
        if(req.method === "OPTIONS"){
            next()
        }
        try{
            const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
            console.log(token)
            if(!token){
                return res.status(401).json({message:"Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log(decoded.role)
            // if( toString(decoded.role) !== role){
                if(decoded.role !== role){
                console.log('if')
                return res.status(403).json({message:"У вас нет доступа"})
            }
            req.user = decoded
            next()
        }
        catch(e){
            res.status(401).json({message: "Не авторизован"})
        }
    }

}































