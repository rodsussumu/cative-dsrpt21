const userController = require('../app/controllers/user-controller')
const capaController = require('../app/controllers/capa-controller')

const auth = require('../app/validations/auth')

module.exports = (app) => {
    ///// User /////
    app.post('/signup', userController.create)

    app.post('/signin', userController.login)

    app.put('/delete/:id', auth, userController.delete)

    app.put('/update/:id', auth, userController.update)


    ///// Capas /////
    app.put('/upload/:id', capaController.save)

    app.get('/capa/:id', capaController.get)

    app.put('/upload/update/:id', capaController.update)
}