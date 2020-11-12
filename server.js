const app = require('./src/config/express')

app.listen(process.env.PORT || 3333, () => {
    console.log("Backend executando na porta 3333! 🚀");
})