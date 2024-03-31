import React, {useEffect} from "react";
import {Container, Row, Col, Button} from "react-bootstrap";
import PlayerRow from "./PlayerRow";
import {useParams} from "react-router-dom";
import playerService from "../../../services/playerService";
import {useWebSocket} from "../../../services/WebSocketProvider";

const PlayersList = ({currentPlayers}) => {
    const [players, setPlayers] =
        React.useState(currentPlayers);

    const {gameId} = useParams();
    const {stompClient} = useWebSocket();
    // console.log("Is the client connected? " + (stompClient != null));


    useEffect(() => {
        runEffect();
    }, [stompClient, players])

    // stompClient.subscribe('/game/' + gameId + '/public/joinNotice', onPlayerJoin);

    const runEffect = async () => {
        if (stompClient && stompClient.connected) {
            stompClient.subscribe('/game/' + gameId + '/public/joinNotice', onPlayerJoin);
        }
    }

    const onPlayerJoin = (payload) => {
        let payloadData = JSON.parse(payload.body);
        // console.log(payloadData);
        //I now want to append the new player to the list of players
        let newPlayer = payloadData;
        // console.log(newPlayer);
        //if the person already exists in the list, don't add them again
        let playerExists = false;
        players.forEach((player) => {
                if (player.playerName === newPlayer.playerName) {
                    playerExists = true;
                }
            }
        );
        if (playerExists) {
            return;
        }
        let newPlayers = [...players, newPlayer];
        console.log(newPlayers);
        setPlayers(newPlayers);
    }


    return (
        <>
            <div
                style={{
                    backgroundColor: "#737373",
                    bottom: "0",
                    width: "97%",
                    borderRadius: ".5em",
                    marginRight: "auto",
                    marginLeft: "auto",
                    height: "26%",
                    fontFamily: "Jockey One",
                    color: "white",
                    textAlign: "center",
                    boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",
                }}
            >
                {players.map((player) => {
                    return (
                        <PlayerRow
                            playerName={player.playerName}
                            characterName={player.characterName}
                            imageResource={player.imageResource}
                        />
                    )

                })}


            </div>
        </>
    )
}

export default PlayersList;