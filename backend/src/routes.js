// Import controlers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');
const checkUserFnSolution = require('./middlewares/checkUserFnSolution');
const uploadValidateFn = require("./middlewares/uploadValidateFn");
const registerUserFn = require("./middlewares/registerUserFn");

// Match URL's with controllers
exports.appRoute = router => {  

    router.post('/api/user/login', authController.processLogin);
    router.post('/api/user/register', registerUserFn.validateUser, authController.processRegister);
    // router.post('/api/user/register', authController.processRegister);
    router.post('/api/user/process-submission', checkUserFn.getClientUserId, userController.processDesignSubmission);
    router.put('/api/user/',userController.processUpdateOneUser);
    router.put('/api/user/design/', uploadValidateFn.validateSubmission, userController.processUpdateOneDesign);
    router.post('/api/user/processInvitation/',checkUserFn.getClientUserId, userController.processSendInvitation);

    // this is the route for 4
    router.get('/api/user/process-search-design/:pagenumber/:search?', checkUserFn.getClientUserId, userController.processGetSubmissionData);
    router.get('/api/user/process-search-user/:pagenumber/:search?', checkUserFnSolution.checkForValidAdmin, checkUserFn.getClientUserId, userController.processGetUserData);
    // router.get('/api/user/process-search-user/:pagenumber/:search?', checkUserFn.getClientUserId, userController.processGetUserData);
    router.get('/api/user/process-search-user-design/:pagenumber/:search?', userController.processGetSubmissionsbyEmail);
    router.get('/api/user/:recordId', userController.processGetOneUserData);
    router.get('/api/user/design/:fileId', userController.processGetOneDesignData);
};