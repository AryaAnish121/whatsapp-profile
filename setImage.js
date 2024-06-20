import wwebjs from "whatsapp-web.js";
import { MongoStore } from "wwebjs-mongo";
import mongoose from "mongoose";
import qrcode from "qrcode-terminal";
import getImage from "./getImage.js";

const { Client, RemoteAuth } = wwebjs;
const store = new MongoStore({ mongoose: mongoose });
const client = new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new RemoteAuth({
    store,
    backupSyncIntervalMs: 300000,
  }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

const setImage = () => {
  return new Promise(async (resolve, reject) => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("settings the profile picture");
    await client.initialize();
    setTimeout(async () => {
      await client.setProfilePicture({
        mimetype: "image/png",
        data: await getImage(),
      });
      setTimeout(() => {
        console.log("killing the browser");
        client.destroy();
        console.log("done");
        resolve();
      }, 2000);
    }, 2000);
  });
};

export default setImage;
