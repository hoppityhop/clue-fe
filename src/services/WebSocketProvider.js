import React, {createContext, useState, useRef, useEffect, useContext} from 'react';
import SockJS from 'sockjs-client';
import {over} from 'stompjs';
import {useCookies} from "react-cookie";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";

const WebSocketContext = createContext(null);

const API = process.env.REACT_APP_API_URL;

export const useWebSocket = () => {
    return useContext(WebSocketContext);
}


const WebSocketProvider = ({children}) => {
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies([]);


    useEffect(() => {

        const initSocket = async () => {
            if (stompClient && stompClient.connected) {
                console.log("Already connected");
                return
            }


            let Sock = new SockJS(API + '/ws');
            let client = over(Sock);
            client.debug = () => {};
            await client.connect({}, () => {
                setStompClient(client);
            });


        }

        initSocket().then(r => console.log("Socket initialized"));


        return () => {
            if (stompClient && stompClient.connected) {
                console.log("Closing connection");
                stompClient.disconnect();
            }
        }


    }, []);

    return (
        <WebSocketContext.Provider value={{stompClient}}>
            {children}
        </WebSocketContext.Provider>
    );
};

WebSocketProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default WebSocketProvider;