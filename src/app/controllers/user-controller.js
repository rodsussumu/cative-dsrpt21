const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const authConfig = require('../config/auth.json')
const jwt = require('jsonwebtoken')

module.exports = {

    async create(req, res) {
        const {email, password } = req.body
        try {
            if(!email || !password) return res.status(400).send({error: "Preencha todos os campos"})

            const userFromDb = await User.query().select().where('email', email).whereNull('deletedAt').first()

            if(userFromDb) return res.status(400).send({error: "Email já cadastrado"})

            const hash = bcrypt.hashSync(password, 10)

            User.query().insert({
                email: email,
                password: hash,
            }).then(resp => {
                const token = jwt.sign({id: resp.id}, authConfig.secret, {
                    expiresIn: 86400,
                })
                return res.status(201).send({message: "Cadastrado com sucesso", id: resp.id, email: resp.email, token: token})
            })
        }catch(err) {
            console.log(err)
            return res.send(err)
        }
    },

    async login(req, res) {
        const {email, password} = req.body
        try {
            if(!email || !password) return res.status(400).send({error : "Preencha todos os campos"})

            const userFromDb = await User.query().select().where('email', email).whereNull('deletedAt').first()

            if(!userFromDb) return res.status(400).send({error : 'Usuário não encontrado'})

            if(!bcrypt.compareSync(password, userFromDb.password)) return res.status(400).send({error: {message: "Email ou Senha incorreta"}})

            const token = jwt.sign({id: userFromDb.id}, authConfig.secret, {
                expiresIn: 86400,
            })

            return res.status(200).send({
                message: "Logado com sucesso",
                id: userFromDb.id,
                email: userFromDb.email,
                token: token
            })
        }catch(err) {
            console.log(err)
            return res.status(400).send(err)
        }
    },

    async delete(req, res) {
        const {id} = req.params
        try {
            const userFromDb = await User.query().select().where('id', id).whereNull('deletedAt').first()

            if(!userFromDb) return res.status(400).send({error : 'Usuário não encontrado'})

            await User.query().update({
                deletedAt: new Date()
            }).where('id', id)
            return res.status(200).send({message: "Deletado com sucesso"})
        }catch(err) {
            return res.send(err)
        }
    },

    async update(req, res) {
        const {id} = req.params
        const { email, password } = req.body
        try {
            const userFromDb = await User.query().select().where('id', id).whereNull('deletedAt').first()

            if(!userFromDb) return res.status(400).send({error : 'Usuário não encontrado'})

            const hash = bcrypt.hashSync(password, 10)

            await User.query().update({
                email: email,
                password: hash,
                updatedAt: new Date()
            }).where('id', id)
            return res.status(200).send({message: "Atualizado com sucesso"})
        }catch(err) {
            return res.status(500).send(err)
        } 
    }
}