const fs = require('fs')
module.exports = (client) => {
    try {
        console.log(`
╔═════════════════════════════════════════════════════╗
║                                                     ║
║        Bienvenido al Handler  por  lukitaz_r        ║
║                                                     ║
╚═════════════════════════════════════════════════════╝`.yellow)
        let comandos = 0
        fs.readdirSync("./commands/").forEach((carpeta) => {
            const commands = fs.readdirSync(`./commands/${carpeta}`).filter((archivo) => archivo.endsWith(".js"))
            for (let archivo of commands){
                let comando = require(`../commands/${carpeta}/${archivo}`)
                if(comando.name) {
                    client.commands.set(comando.name, comando)
                    comandos++
                } else {
                    console.log(`COMANDO [/${carpeta}/${archivo}]`, `error => el comando no está configurado`.brightRed)
                    continue
                }
                if(comando.aliases && Array.isArray(comando.aliases)) comando.aliases.forEach((alias) => client.aliases.set(alias, comando.name))
            }
        })
        console.log(`${comandos} Comandos Cargados`.brightGreen)
    } catch(e){
        console.log(e)
    }
}
