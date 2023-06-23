let registerUserFn = {
    validateUser: (req, res, next) => {
        // takes in req.body fields
        let fullName = req.body.fullName;
        let email = req.body.email;
        let password = req.body.password;

        // creating the regex checks
        // allows only alphanumeric upper and lower case
        let fullNameRegex = new RegExp(`^[a-zA-Z0-9\s]+$`);
        // allows valid email format only
        let emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`);
        // regex looks out for the any script tags whilst still ensuring special characters can be entered
        let passwordRegex = new RegExp(`^(?!.*<.*>)(?!.*[&"'<>]).*$`);

        if (fullNameRegex.test(fullName) && emailRegex.test(email) && passwordRegex.test(password)){
            // if all regex is passed then call the next regex
            next();
        }else{
            res.status(400);
            res.json("Invalid data recieved");
        }
    }
}

module.exports = registerUserFn;