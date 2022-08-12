import { w3cwebsocket, w3cwebsocket as W3CWebSocket } from "websocket";

const baseUrl = process.env.REACT_APP_SOCKET_HOST;

var client: w3cwebsocket | undefined

const initSocket = () => {
    if (client) {
        return
    }

    let url = baseUrl + "socket/create";

    const c = new W3CWebSocket(url);

    c.onopen = () => {
      console.log("socket initiated");
    };

    client = c
}

export const getSocket = () => {
    if (!client) {
        initSocket()
    }

    return client
}

export const closeSocket = () => {
    if (!client) {
        return
    }

    client.close()
    client = undefined
}