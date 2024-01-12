import {Websocket} from "../websocket/websocket";
import {useEffect} from "react";


export const useWebSocket = (callback: any, link: string) => {

    function connectWebsocket () {
        try {
            Websocket.socketApi(link)
            Websocket.socket.onmessage = (el) => {
                const response = JSON.parse(el.data)
                callback(response)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        connectWebsocket()

        return () => {
            Websocket.socket.close()
        }
    }, [link]);
}