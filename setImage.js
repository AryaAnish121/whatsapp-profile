const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const genImage = require("./genImage");

const client = new Client({
    puppeteer: {
        headless: false,
    },
    authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("Client is ready!");
});

module.exports = async () => {
    console.log("settings the profile picture");
    await client.initialize();
    setTimeout(async () => {
        await client.setProfilePicture({
            mimetype: "image/png",
            data: genImage(),
        });
        setTimeout(() => {
            console.log("killing the browser");
            client.destroy();
            console.log("done");
        }, 2000);
    }, 2000);
};
