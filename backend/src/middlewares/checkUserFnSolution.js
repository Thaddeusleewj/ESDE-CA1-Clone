const { request } = require('http');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports.checkForValidUserRoleUser = (req, res, next) => {
    //If the token is valid, the logic extracts the user id and the role information.
    //If the role is not user, then response 403 UnAuthorized
    //The user id information is inserted into the request.body.userId
    console.log('http header - user ', req.headers['user']);
    if (typeof req.headers.authorization !== "undefined") {
        // Retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split(' ')[1];
        //console.log('Check for received token from frontend : \n');
        //console.log(token);
        jwt.verify(token, config.JWTKey, (err, data) => {
            console.log('data extracted from token \n', data);
            if (err) {
                console.log(err);
                return res.status(403).send({ message: 'Unauthorized access' });
            }
            else {
                req.body.userId = data.id;
                next();
            }
        })

    } else {
        res.status(403).send({ message: 'Unauthorized access' });
    }
} //End of checkForValidUserRoleUser

module.exports.checkForValidAdmin = (req, res, next) => {

    console.log('http header - user', req.headers['user']);
    console.log('http header', req.headers);
    console.log('http header - authorization', req.headers['authorization']);
    
    // exracting userid and role information
    if(typeof req.headers.authorization != "undefined"){
        // Recieve authorization header and parse out JWT
        let authToken = req.headers.authorization.split(' ')[1];
        // check for token recieved
        console.log ('Token recieved', authToken);
        jwt.verify(authToken, config.JWTKey, (err, data) => {
            console.log('data role', data.role);
            console.log('data extracted from token', data);
            if (err){
                console.log(err);
                return res.status(403).send({message: 'Unauthorized Access1'});
            }else{
                if(data.role != "admin"){
                    console.log("Not admin");
                    return res.status(403).send({message: 'Unauthorized Access2'});
                }
                // controller to know the userid of admin 
                req.body.userId = data.id;
                console.log("Auth", req.path)
                next();
            }
        })
    }else{
        return res.status(403).send({message: 'Unauthorized Access3', message2: typeof req.headers.authorization});
    }
}