const User = require('../models/user-model')
const formidable = require('formidable');
const path = require('path')
const fs = require('fs');
const { get } = require('http');
const { update } = require('../../config/db/connection');

module.exports = {
    async save(req, res) {
        const id = req.params.id
        try {
            const user = await User.query().select().where('id', id).first()

            if(!user) return res.status(400).send({error: "Usuário não encontrado."})

            const form = formidable({multiples: true});
            await form.parse(req, async(err, fields, files) => {
                if(err) {
                    next(err)
                    return;
                }

                const json = files.capa
                const readFile = fs.readFileSync(json.path)
                const jsonDecoded = JSON.parse(readFile)

                await User.query().update({
                    capaPath: fs.readFileSync(json.path),
                }).where('id', id)
                .then(resp => {
                    return res.status(200).send({success: "Capa adicionada com sucesso."})
                })

            })
        }catch(err) {
            return res.status(500).send(err)
        }
    },

    async get(req, res) {
        const id = req.params.id
        try {
            const user = await User.query().where('id', id).first()
            const json = JSON.parse(user.capaPath)
            return res.status(200).send(json)
        }catch(err) {
            return res.status(500).send(err)
        }
    },

    async update(req, res) {
        const id = req.params.id
        try {
            const user = await User.query().select().where('id', id).first()

            if(!user) return res.status(400).send({error: "Usuário não encontrado."})

            const form = formidable({multiples: true});
            await form.parse(req, async(err, fields, files) => {
                if(err) {
                    next(err)
                    return;
                }

                const json = files.capa
                const readFile = fs.readFileSync(json.path)
                const jsonDecoded = JSON.parse(readFile)

                await User.query().update({
                    capaPath: fs.readFileSync(json.path),
                }).where('id', id)
                .then(resp => {
                    return res.status(200).send({success: "Capa adicionada com sucesso."})
                })

            })
        }catch(err) {
            return res.status(500).send(err)
        }
    },
}