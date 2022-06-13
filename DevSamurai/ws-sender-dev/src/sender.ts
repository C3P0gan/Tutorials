import { create, Whatsapp, Message, SocketState } from "venom-bot";
import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";


export type QRCode = {

    base64Qr: string,
    attempts: number;
};

class Sender {

    // Property
    private client: Whatsapp
    private connected: boolean;
    private qr: QRCode;

    get isConnected(): boolean {

        return this.connected;
    };

    get qrCode(): QRCode {
        
        return this.qr;
    }
    constructor() {

        this.initialize();
    };


    async sendText(to: string, body: string) {

        // 554199999999@c.us
        if (!isValidPhoneNumber(to, "BR")) {

            throw new Error('This number is not valid');
        };

        let phoneNumber = parsePhoneNumber(to, "BR")
            ?.format("E.164")
            ?.replace("+", "") as string;

        phoneNumber = phoneNumber.includes("@c.us")
            ? phoneNumber
            : `${phoneNumber}@c.us`;

        console.log("phoneNumber", phoneNumber);

        await this.client.sendText(to, body);
    };

    private initialize() {

        const qr = (base64Qr: string, asciiQR: string, attempts: number) => {

            this.qr = { base64Qr, attempts };
        };

        const status = (statusSession: string) => {
           //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat 

            this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable"].includes(statusSession);
        };

        const start = (client: Whatsapp) => {

            this.client = client;

            client.onStateChange((state) => {

                this.connected = state === SocketState.CONNECTED;
            });
            // this.sendText("5541992321502@c.us", "Olá! Esta mensagem é um teste.");
        };

        create("ws-sender-dev", qr, status)
            .then((client) => start(client))
            .catch((error) => console.error(error));
    };
};

export default Sender;
