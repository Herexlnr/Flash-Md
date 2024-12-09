const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0lvdmwycU5LdjlZcnI0UFQ3RDlMOU9qSGRCK2o0UjZScVFDdzhKbktHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRlM1M3dUVTk4ZzFjMk1oTE5aOVFYNm45WmVNR1dRZWdGMVdyYlFob2ltUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvSmVyQ3RNN2YwK1BzbkI2Zm1aVW1BSVFVY080bDRibGVWdnpUcTdPNG5FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLVHpOak1rZHAxWjFDUjRBU1RRQ2xCUzBuSjVybjQ5aCtPK2YyWGRONnpVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVObUhrTmJJZk9IVFFhd2M3clFzeFdOUHFxaUNsSC9nSVdmcGM1bXZGa1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imh5YUtjd01UWkM5MGl6SzlhcFdFbHNyblJLM0NxMUdtZHVRc3Z6K04rQ1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUp2UzkyUFNYRkFPa0x3cXhMejRoRzNFVkRkMG1sRHk4WkVxTTM0SWRXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZk9NbStEd0gyeGJVOVp2U2hnVnZMQzQyMnl6b3dpM3FOdmIvdWovSVBtZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJBNW5LWkYvTnRFcGxPVWVqK3R0YUhXV0dDV1NIczBuSXZBYXdYYzZmYUxkVzlEWE4xY0UyMVg2dWFzdGwvSFVKUEc3VzhaaUR5dlVseVZQM2dBM0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzAsImFkdlNlY3JldEtleSI6IkV0MWswSk9qMmc3NjhDalp5d3VTcWovekxxL3BRTDhVNVNtYjByZ0FPQlk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjJmLVZ4Z1BDVFktVHBtbVozdkkwR0EiLCJwaG9uZUlkIjoiMmY1YjQ2NzktOThlZi00OTBiLWFjYWItNTYyOThkOTdkODg5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InMzNnc5K1EwN1ZPSE4yWEswNCtiQktyd1JRRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuL0l3NGQ5bzk2UVJ0OUxlWmtOK0wzczB0cHM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUTNKQk1ZM04iLCJtZSI6eyJpZCI6IjI2MzcxMzQ2ODExNDo0QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNSFUrWTBCRUkyRzNib0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ4dXJhcDcvOWZsdDQxeCtydlEvN09ueWFjaDBVUUtQRUFzMVQ3VlcyT1ZRPSIsImFjY291bnRTaWduYXR1cmUiOiI4UlliQzlIY2x0dG1UbzQrendGbWJ4UW1GVHk5Z1BkR3h1eDNOZllmRXVlMXhoMWsrcHk4QU8zamI2TzJlQm5qUnVWakx2c2xscEg3RHVVZjJzL09BUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTXZkM0x2VzV2YWlEQW5hajFlNFFRUlM1cjNEOGpNOSt4T0ZtUkJpL2RoNDBPK3VPeUpLN3hvekxGRGg5MllTQllxYyt6czRLc2lSZGpSb082TndSQ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTM0NjgxMTQ6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjYnEycWUvL1g1YmVOY2ZxNzBQK3pwOG1uSWRGRUNqeEFMTlUrMVZ0amxVIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMzNzcyMDU5fQ==',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
