const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const jwtUtils = {};
jwtUtils.issuer = process.env.ISSUER;
jwtUtils.privateKEY = fs.readFileSync(path.join(__dirname,'../ssh/private.key'),'utf8')
jwtUtils.publicKEY = fs.readFileSync(path.join(__dirname,'../ssh/public.key'),'utf8')

/* create jwt secret tocken */
jwtUtils.createSecretTocken = (data) => {
    const tocken = jwt.sign(data, jwtUtils.privateKEY, {
        expiresIn: '7300d',
        issuer: jwtUtils.issuer,
        algorithm: 'RS256'
    });
    return tocken;
}

/* verify jwt tocken */
jwtUtils.verify = (tocken) => {
    let decoded = {};
    if(tocken) {
        try {
            decoded = jwt.verify(tocken,jwtUtils.publicKEY,{
                algorithms: ['RS256'],
                issuer: jwtUtils.issuer
            });
        } catch (error) {
            console.log(error);
        }
    }
    return decoded;
}

module.exports = jwtUtils;




