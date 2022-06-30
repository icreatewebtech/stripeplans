const bcrypt = require('bcrypt');
const utils = {};

/* hash password */
utils.hash = (data) => {
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    const hash = bcrypt.hashSync(data,salt);
    return hash;
}

utils.empty = (mixedVar) => {
    const emptyValues = ['undefined',undefined,null,0,'0','',false];
    for (let i = 0; i < emptyValues.length; i++) {
        if (mixedVar === emptyValues[i]) {
            return true;
        }
    }
    if (typeof mixedVar === 'object') {
        for (let key in mixedVar) {
            return false;
        }
        return true;
    }
    return false;
}

/* match password */
utils.compare = (data, hash) => {
    return bcrypt.compareSync(data,hash);
}

module.exports =  utils;