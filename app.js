const axios = require("axios");
const moment = require("moment");
const { scheduleJob } = require('node-schedule');

const { sendLineMsgBroadcast } = require('./line');

scheduleJob('30 12 * * *', async () => {
    try {
        const { data } = await axios.get('https://covid19.th-stat.com/api/open/today');

        const { 
            NewConfirmed, // จำนวนผู้ป่วยใหม่ของวันนี้
            Confirmed,    // จำนวนผู้ป่วยสะสมทั้งหมด
            Hospitalized, // จำนวนผู้ป่วยที่ยังรักษาอยู่ทั้งหมด
            NewRecovered, // จำนวนผู้ป่วยที่รักษาหายของวันนี้
            NewDeaths,    // จำนวนผู้เสียชีวิตของวันนี้
            UpdateDate    // วันที่และเวลาของข้อมูล
        } = data;

        await sendLineMsgBroadcast(
            [{
                "type": "flex",
                "altText": "This is a Flex Message reporting Covid-19 cases in Thailand",
                "contents": {
                    "type": "bubble",
                    "hero": {
                        "type": "image",
                        "url": "https://img.techpowerup.org/200411/covid-19-virus983.jpg",
                        "size": "full",
                        "aspectRatio": "20:13",
                        "aspectMode": "cover",
                        "action": {
                        "type": "uri",
                        "uri": "https://covid19.th-stat.com/th/share/dashboard"
                        }
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [
                        {
                            "type": "text",
                            "text": `${moment(UpdateDate, 'DD/MM/YYYY HH:mm').format('HH:mm')}`,
                            "weight": "bold",
                            "size": "xl"
                        },
                        {
                            "type": "text",
                            "text": `${moment(UpdateDate, 'DD/MM/YYYY HH:mm').locale("th").format('DD MMM YYYY')}`,
                            "weight": "bold",
                            "size": "xl"
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "margin": "lg",
                            "spacing": "sm",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "ผู้ป่วยใหม่วันนี้",
                                            "color": "#333232",
                                            "size": "lg",
                                            "flex": 5
                                        },
                                        {
                                            "type": "text",
                                            "text": `${NewConfirmed}`,
                                            "wrap": true,
                                            "color": "#363434",
                                            "size": "lg",
                                            "flex": 4,
                                            "weight": "bold",
                                            "align": "start"
                                        }
                                    ],
                                    "paddingTop": "8px"
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "ผู้ป่วยสะสม",
                                            "color": "#333232",
                                            "size": "lg",
                                            "flex": 5
                                        },
                                        {
                                            "type": "text",
                                            "text": `${Confirmed}`,
                                            "wrap": true,
                                            "color": "#363434",
                                            "size": "lg",
                                            "flex": 4,
                                            "weight": "bold",
                                            "align": "start"
                                        }
                                    ],
                                    "paddingTop": "8px"
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "ผู้ป่วยที่รักษาอยู่",
                                            "color": "#333232",
                                            "size": "lg",
                                            "flex": 5
                                        },
                                        {
                                            "type": "text",
                                            "text": `${Hospitalized}`,
                                            "wrap": true,
                                            "color": "#363434",
                                            "size": "lg",
                                            "flex": 4,
                                            "weight": "bold",
                                            "align": "start"
                                        }
                                    ],
                                    "paddingTop": "8px"
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "รักษาหายเพิ่มขึ้น",
                                            "color": "#333232",
                                            "size": "lg",
                                            "flex": 5
                                        },
                                        {
                                            "type": "text",
                                            "text": `${NewRecovered}`,
                                            "wrap": true,
                                            "color": "#363434",
                                            "size": "lg",
                                            "flex": 4,
                                            "weight": "bold",
                                            "align": "start"
                                        }
                                    ],
                                    "paddingTop": "8px"
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "เสียชีวิตเพิ่มขึ้น",
                                            "color": "#333232",
                                            "size": "lg",
                                            "flex": 5
                                        },
                                        {
                                            "type": "text",
                                            "text": `${NewDeaths}`,
                                            "wrap": true,
                                            "color": "#363434",
                                            "size": "lg",
                                            "flex": 4,
                                            "weight": "bold",
                                            "align": "start"
                                        }
                                    ],
                                    "paddingTop": "8px"
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": "ที่มา: กรมควบคุมโรค",
                                            "wrap": true,
                                            "color": "#333232",
                                            "size": "sm",
                                            "flex": 5,
                                            "align": "start",
                                        }
                                    ],
                                    "paddingTop": "10px"
                                },
                                {
                                    "type": "spacer",
                                    "size": "xs"
                                }
                            ]
                        }
                    ]
                    }
                } 
            }]
        );
    } catch (e) {
        console.log(e);
    }
})