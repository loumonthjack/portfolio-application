const router = require('../user/login');
const Stripe = require('../external/Stripe/index');
const Mongo = require('../internal/index');
const checkAccess = require('../validation/checkPermissions');


//GET CUSTOMER BY USER_ID IN SQUARE
router.get('/:user_id/customer', authorizeToken, async(req,res)=>{
    let user = req.params.user_id;
    const customer = await Stripe.getCustomer(user)
    res.send(customer[0])
});

router.get('/customers', authorizeToken, async(req,res)=>{
    const customers = await Stripe.getAllCustomers()
    res.send(customers)
});

router.get('/users', authorizeToken, async(req, res)=> {
   const users = await Mongo.getAllUsers()
   res.send(users)
})
module.exports = router;



/*
router.get('/:user_id', async(req, res)=>{
    let user = req.params.user_id;
    checkAccess(user).then((userAccess)=> {
        if(userAccess == 'basic'){
            //GET LESS THAN OR EQUAL TO 5 PROJECTS
            Project.find({userId: user}).exec().then(
                projects=> {
                    Education.find({userId: user}).exec().then(
                        educations=> {
                            Experience.find({userId:user}).then(
                                experiences => {
                                    return res.send(projects, educations, experiences)
                                })
                            })
                        })
                    }
                })
            })



// GET CARD IF EXIST, IF NOT CREATE CARD
router.post('/:user_id/upgrade/card', async(req, res)=>{
    let {billingAddress, cardholderName} = req.body
    if(billingAddress & cardholderName){
        client.cardsApi.createCard({
            card_nonce: uuidv4(),
            billing_address: {
                address_line_1: req.body.addressOne,
                address_line_2: req.body.addressTwo,
                locality: req.body.state,
                administrative_district_level_1: req.body.stateAbbr,
                postal_code: req.body.zipCode,
                country: req.body.country
            },
            cardholder_name: cardholderName
        })
    }

})


router.post('/:user_id/project/create', async (req, res) => {
    let user = req.params.user_id;
    checkAccess(user).then((userAccess)=> {
        if(userAccess == 'basic'){
            Project.find({userId: user}).exec().then(
                project=> {
                    if(project.length < 5) {
                        Project.create({
                            title: req.body.title,
                            description: req.body.description,
                            image: req.body.image,
                            source: req.body.source,
                            visit: req.body.visit,
                            userId: user
                        })
                        return res.send(project)
                    }else{
                        res.send({message: "Create Limit has been Reached!"})
                    }
                }
            )
        }else if(userAccess == 'plus'){
            Project.find({userId: user}).exec().then(
                project=> {
                    if(project.length < 25) {
                        Project.create({
                            title: req.body.title,
                            description: req.body.description,
                            image: req.body.image,
                            source: req.body.source,
                            visit: req.body.visit,
                            userId: user
                        })
                        return res.send(project)
                    }else{
                        res.send({message: "Create Limit has been Reached!"})
                    }
                }
            )
        }else if(userAccess == 'premium'){
            Project.find({userId: user}).exec().then(
                project=> {
                    if(project.length < 50) {
                        Project.create({
                            title: req.body.title,
                            description: req.body.description,
                            image: req.body.image,
                            source: req.body.source,
                            visit: req.body.visit,
                            userId: user
                        })
                        return res.send(project)
                    }else{
                        res.send({message: "Create Limit has been Reached!"})
                    }
                }
            )
        }
    })
})

router.delete('/:user_id/project/delete/:project_id', async (req, res) => {
    let user = req.params.user_id;
    let project = req.params.project_id;
    checkAccess(user).then((userAccess)=> {
        if(userAccess == ("basic" || "plus" || "premium"))
            Project.findByIdAndDelete({_id: project}).exec().then(
                project=> {
                    return res.send(project)
                }).catch(err=> {res.send(err)})
    })
})

router.post('/:user_id/education/create', async (req, res) => {
    let user = req.params.user_id;
    checkAccess(user).then((userAccess)=> {
        if(userAccess == 'basic'){
            Education.find({userId: user}).exec().then(
                education=> {
                    if(education.length < 5) {
                        Education.create({
                            school_title: req.body.title,
                            study_field: req.body.study_field,
                            degree: req.body.degree,
                            city: req.body.city,
                            state: req.body.state,
                            start_date: req.body.start_date,
                            end_date: req.body.end_date,
                            userId: user
                        })
                        return res.send(education)
                    }else{
                        res.send({message: "Create Limit has been Reached!"})
                    }
                }
            )
        }else if(userAccess == 'plus'){
            Education.find({userId: user}).exec().then(
                education=> {
                    if(education.length < 25) {
                        Education.create({
                            school_title: req.body.title,
                            study_field: req.body.study_field,
                            degree: req.body.degree,
                            city: req.body.city,
                            state: req.body.state,
                            start_date: req.body.start_date,
                            end_date: req.body.end_date,
                            userId: user
                        })
                        return res.send(education)
                    }else{
                        res.send({message: "Create Limit has been Reached!"})
                    }
                }
            )
        }else if(userAccess == 'premium'){
            Education.find({userId: user}).exec().then(
                education=> {
                    if(education.length < 50) {
                        Education.create({
                            school_title: req.body.title,
                            study_field: req.body.study_field,
                            degree: req.body.degree,
                            city: req.body.city,
                            state: req.body.state,
                            start_date: req.body.start_date,
                            end_date: req.body.end_date,
                            userId: user
                        })
                        return res.send(education)
                    }else{
                        res.send({message: "Create Limit has been Reached!"})
                    }
                }
            )
        }
    })
})
router.delete('/:user_id/education/delete/:education_id', async (req, res) => {
    let user = req.params.user_id;
    let education = req.params.education_id;
    checkAccess(user).then((userAccess)=> {
        if(userAccess == ("basic" || "plus" || "premium"))
            Education.findByIdAndDelete({_id: education}).exec().then(
                education=> {
                    return res.send(education)
                }).catch(err=> {res.send(err)})
    })
})
*/
