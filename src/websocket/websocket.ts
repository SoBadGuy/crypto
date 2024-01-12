export class Websocket {
    static socket: WebSocket
    static socketApi(link: string) {
        this.socket = new WebSocket(`wss://fstream.binance.com/ws/${link}`)
    }
}