import React, {useEffect, useState} from "react";
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    Card,
    CardHeader,
    CardBody
} from "react-bootstrap";
import characters from "./../../../data/characters.js";
import playerService from "../../../services/playerService";
import {useInfo} from "../context/InfoProvider";
import {useCookies} from "react-cookie";

const Room = (props) => {
    const [roomColor, setRoomColor] = useState("#505050");
    const [cookies, removeCookie] = useCookies(['externalGameId', 'sessionId']);
    const [innerRoomColor, setInnerRoomColor] = useState(null);

    const roomName = props.name;
    const roomKey = props.rKey;
    const roomImage = props.image;
    const sessionId = cookies.sessionId;


    const {playerLocations, makeMove} = useInfo();

    useEffect(() => {
        setRoomColor("#505050")
        setInnerRoomColor(null)
        let numPlayersInRoom = 0;
        if (playerLocations) {
            playerLocations.forEach((location) => {
                if (location.roomId == roomKey && numPlayersInRoom < 1) {
                    setRoomColor(location.characterColor);
                    numPlayersInRoom++;
                } else if (location.roomId == roomKey && numPlayersInRoom >= 1) {
                    setInnerRoomColor(location.characterColor);
                }
            })
        }
    }, [playerLocations]);


    //console.log(stateInfo);
    return (
        <Button
            style={{
                backgroundColor: "#0F0F0F",
                borderColor: roomColor,
                height: "9rem",
                borderWidth: "5px",
                boxShadow: "5px 5px 5px #111111",
                outline: innerRoomColor ? "5px solid " + innerRoomColor : "none"
            }}
            key={roomKey}
            id={"room" + roomKey}
            onClick={() => {
                makeMove(roomKey, true);
                console.log("****ROOM MOVE REQUEST MADE****");
                console.log("sessionId: " + sessionId);
                console.log("roomKey: " + roomKey);
            }}
        >
            <Image key={roomName} src={roomImage} width={"100%"} rounded
                   height={"100%"}
                   object-fit={"cover"}
            />
        </Button>

    );
};

export default Room;