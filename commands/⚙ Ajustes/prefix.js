const schema = require(`${process.cwd()}/models/server.js`)
module.exports = {
    name: "prefix",
    aliases: ["prefijo", "cambiarprefijo", "cambiarprefix"],
    desc: "Sirve para cambiar el Preijo del Bot en el Servidor",
    permisos: ["Administrator"],
    run: async (client, message, args) => {
        if(!args[0]) return message.reply(client.la["comandos"]["ajustes"]["prefix"]["variable1"])
        await schema.findOneAndUpdate({guildID: message.guild.id}, {
            prefijo: args[0]
        })
        return message.reply(eval(client.la["comandos"]["ajustes"]["prefix"]["variable2"]))
    }
}
