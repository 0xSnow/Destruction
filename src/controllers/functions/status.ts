import axios from 'axios';
import keys from '../../keys';
import { EmbedBuilder, WebhookClient } from 'discord.js';

const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/1068773969253122118/z2x91oxISAJdodxeYdicHv9u605wDZFUgDBAFmbZinXz-zTbESRGhYBig3bwJp31WYGy' });

async function getCartels() {
    try {
        const response = await axios.get('https://stats.olympus-entertainment.com/api/v3.0/cartels/', {
            headers: {
                Authorization: keys.olympusToken
            }
        }).then(res => {
            return res.data
        });

        return response
    } catch (err) {
        return err
    }
}
async function getPlayers() {
    try {
        const response = await axios.get('https://stats.olympus-entertainment.com/api/v3.0/servers/', {
            headers: {
                Authorization: keys.olympusToken
            }
        }).then(res => {
            return res.data[0]
        });

        return response
    } catch (err) {
        return err
    }
}

function updateStatus() {
    setTimeout(async function() {
        let cartels   = await getCartels()
        let players   = await getPlayers()

        if (cartels[0]["gang_name"] != null && players["civ"] != null) {
            let arms      = { gang_name: cartels[0]["gang_name"], progress: cartels[0]["progress"] }
            let meth      = { gang_name: cartels[1]["gang_name"], progress: cartels[1]["progress"] }
            let moonshine = { gang_name: cartels[2]["gang_name"], progress: cartels[2]["progress"] }
            let civilians = players["civ"]
            let cops      = players["cop"]
            let meds      = players["med"]
            let embed     = new EmbedBuilder()
                .setColor(0xff8a1c)
                .setTitle("Olympus Status")
                .addFields(
                    { name: 'Civilians', value: '```diff\n! ' + civilians  + ' !\n```', inline: true },
                    { name: 'Cops', value: '```md\n# '+  cops + ' #\n```', inline: true },
                    { name: 'Meds', value: '```diff\n- ' + meds + ' -\n```', inline: true },
                    { name: 'Arms', value: 'ㅤ\n**Gang Name**\n```ini\n[ ' + arms["gang_name"] + ' ]\n```\n**Progress**\n**```win\n' + arms["progress"] + '%\n```**', inline: true },
                    { name: 'Meth', value: 'ㅤ\n**Gang Name**\n```ini\n[ ' + meth["gang_name"] + ' ]\n```\n**Progress**\n**```win\n' + meth["progress"] + '%\n```**', inline: true },
                    { name: 'Moonshine', value: 'ㅤ\n**Gang Name**\n```ini\n[ ' + moonshine["gang_name"] + ' ]\n```\n**Progress**\n**```win\n' + moonshine["progress"] + '%\n```**', inline: true }
                )
                .setImage("https://i.imgur.com/gcLd49q.jpg")
                .setTimestamp()

            await webhook.editMessage('1068835942229618768', {
                embeds: [embed]
            });
        }

        updateStatus();
    }, 62000)
}

export default updateStatus