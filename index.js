import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')
    const guildID = '934443243981123594'
    const guild = client.guilds.cache.get(guildID)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'ping/pong',
    })

    commands?.create({
        name: 'calculate',
        description: 'calculate an expression',
        options: [
            {
            name: 'expression',
            description: 'type the expression',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    })
})

client.on('interactionCreate',async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === 'ping'){
        interaction.reply({
            content: 'pong'
        })
    } else if (commandName == 'calculate'){
        const expression = options.getString('expression')
        var secExpression = expression

        const trigFunc = ['sin', 'cos', 'tan', 'sec', 'cot', 'csc', 'PI']

        for (var i =0; i<secExpression.length; i++){
            secExpression = secExpression.replaceAll(trigFunc[i], `Math.${trigFunc[i]}`)
        }

        interaction.reply({
            content: `${expression} = ${eval(secExpression)}`
        })
    }
})

client.login(process.env.TOKEN)

