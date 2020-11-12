const userController = require('../app/controllers/user-controller')

const auth = require('../app/validations/auth')

module.exports = (app) => {
    app.post('/signup', userController.create)

    app.post('/signin', userController.login)

    app.put('/delete/:id', auth, userController.delete)

    app.put('/update/:id', auth, userController.update)
}