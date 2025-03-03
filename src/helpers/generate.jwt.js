import jwt from "jsonwebtoken"

export const generateJWT = (uid = " ") => {
    return new Promise((resolver, reject) => {
        const payload = {uid}

        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: "99h"
            },
            (err, token) => {
                if(err){
                    reject({
                        success: false,
                        massage: er.message
                    })
                }else{
                    resolver({
                        success: true,
                        token
                    })
                }
            }
        )
    })
}