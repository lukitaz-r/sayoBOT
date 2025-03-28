const config = require(`${process.cwd()}/config/config.json`)
const serverSchema = require(`${process.cwd()}/models/server.js`)
const { asegurar_todo } = require(`${process.cwd()}/utils/functions.js`)
module.exports = async (client, message) => {
    if (!message.guild || !message.channel || message.author.bot) return
    await asegurar_todo(message.guild.id, message.author.id)
    let data = await serverSchema.findOne({guildID: message.guild.id})

    //si el bot es mencionado, devolvemos un mensaje de respuesta indicando el prefijo establecido en el servidor
    /*if(message.content.includes(client.user.id) && config.koi.includes(message.author.id)){     
        return message.reply(config.mensajesKoi[Math.floor(Math.random() * config.mensajesKoi.length)]) 
     } else */if (message.content.includes(client.user.id)) { 
        return message.reply(config.mensajes[Math.floor(Math.random() * config.mensajes.length)]) 
      }

    if (!message.content.startsWith(data.prefijo)) return
    const args = message.content.slice(data.prefijo.length).trim().split(" ")
    const cmd = args.shift()?.toLowerCase()
    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd))
    if (command) {
        if(command.permisos_bot){
            if(!message.guild.members.me.permissions.has(command.permisos_bot)) return message.reply(`❌ **No tengo suficientes permisos para ejecutar este comando!**\nNecesito los siguientes permisos ${command.permisos_bot.map(permiso => `\`${permiso}\``).join(", ")}`)
        }

        if(command.permisos){
            if(!message.member.permissions.has(command.permisos)) return message.reply(`❌ **No tienes suficientes permisos para ejecutar este comando!**\nNecesitas los siguientes permisos ${command.permisos.map(permiso => `\`${permiso}\``).join(", ")}`)
        }

        //ejecutar el comando
        command.run(client, message, args, data.prefijo, data.idioma)
    } else {
        //opcional
        return message.reply("❌ No he encontrado el comando que me has especificado!")
    }

}
