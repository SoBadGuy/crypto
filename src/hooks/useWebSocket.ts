import {Websocket} from "../websocket/websocket";
import {useEffect} from "react";


export const useWebSocket = (callback: any, link: string, activePair?: string) => {

    function connectWebsocket () {
        console.log(activePair)
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