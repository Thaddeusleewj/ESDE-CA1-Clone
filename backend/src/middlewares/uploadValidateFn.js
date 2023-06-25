let uploadValidateFn = {
    // function to validate the user inputs
    validateSubmission: (req, res, next) => {
        // takes in the req.body fields of processUpdateOneDesign
        // fileID my be unnecessary as fileID cannot be changed 
        let fileID= req.body.fileId;
        let titleInput = req.body.designTitle;
        let descriptionInput = req.body.designDescription;

        // creating the regex checks
        // matches one or more occurences of word characters, whitespace and punctuation characters
        let titleRegex = new RegExp(`^[\\w\\s]+$`);
        // matches one or more occurances of word characters, digits, punctuation and special characters
        let descriptionRegex = new RegExp(`^[\\w\\s]+$`);

        if (titleRegex.test(titleInput) && descriptionRegex.test(descriptionInput)){
            // if passed all regex test, call next middleware
            next();
        }else {
            res.status(400);
            res.json("Invalida data recieved");
        }
    }
}

module.exports = uploadValidateFn;