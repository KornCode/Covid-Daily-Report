const axios = require('axios');
require('dotenv').config();

const channelAccessToken = process.env.channelAccessToken;

module.exports = {
    sendLineMsgBroadcast: async (messages, token = channelAccessToken) => {
        try {
            const reply = await axios({
                method: 'post',
                url: 'https://api.line.me/v2/bot/message/broadcast',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: { messages }
            });
    
            return reply.status;
        } catch (e) {
            return e
        }
    }
};
