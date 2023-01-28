import dotenv from 'dotenv';

dotenv.config();

interface Keys {
    discordToken: string;
    olympusToken: string;
}

const keys: Keys = {
    discordToken: process.env.DISCORD_TOKEN ?? 'nil',
    olympusToken: process.env.OLYMPUS_API_TOKEN ?? 'nil'
};

export default keys