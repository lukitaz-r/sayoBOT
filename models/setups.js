const mongoose = require('mongoose')

const setupSchema = new mongoose.Schema({
    guildID: String,
    reaccion_roles: Array,
    sistema_tickets: {type: Object, default: {canal: "", mensaje: ""}},
    sugerencias: {type: String, default: ""},
})

const model = mongoose.model("Configuraciones", setupSchema)

module.exports = model
