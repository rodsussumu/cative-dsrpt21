const User = require('../models/user-model')
const formidable = require('formidable');
const path = require('path')
const fs = require('fs');
const util = require('util')

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

                const uploadDir = path.resolve('capas')
                const extension = files.capa.name.substr(files.capa.name.lastIndexOf("."));
                const newPath = uploadDir+ '/' + Date.now() + extension;

                fs.renameSync(files.capa.path, newPath)

                await User.query().update({
                    capaPath: newPath,
                }).where('id', id)

            })
        }catch(err) {
            return res.status(500).send(err)
        }
    },

    async get(req, res) {
        const id = req.params.id
        try {
            const user = await User.query().where('id', id).first()
            const rawdata = fs.readFileSync(user.capaPath)
            const json = JSON.parse(rawdata)
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

                const uploadDir = path.resolve('capas')
                const extension = files.capa.name.substr(files.capa.name.lastIndexOf("."));
                const newPath = uploadDir+ '/' + Date.now() + extension;

                // await fs.renameSync(files.capa.path, newPath)

                let readStream = fs.createReadStream(files.capa.path)
                let writeStream = fs.createWriteStream(newPath);

                util.pump(readStream, writeStream, function() {
                    fs.unlinkSync(files.capa.path);
                });

                await User.query().update({
                    capaPath: newPath,
                }).where('id', id)

            })
        }catch(err) {
            return res.status(500).send(err)
        }
    },
}