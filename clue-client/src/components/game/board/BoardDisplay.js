import React, {useEffect, useState} from "react";
import {Container, Row, Col, Button, Card, CardHeader, CardBody} from "react-bootstrap";
import {useParams} from "react-router-dom";
import rooms from "../../../data/rooms";
import Room from "./Room";
import Hallway from "./Hallway";


import gameService from "../../../services/gameService";
//TODO: Handle what this will display when the game has not yet
//started
const BoardDisplay = (props) => {
    const ROOMS = rooms.rooms;
    const hallR2 = [3, 4, 5];
    const hallR4 = [8, 9, 10];
    const [turnStateInfo, setTurnStateInfo] = useState([]);
    const {gameId} = useParams();

    const processCharInfo = () => {
        return null;
    }

    var {id} = useParams();

    const handleClick = (e) => {
        const value = e.currentTarget.getAtribute("value");
        alert(e.currentTarget);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            locationSetup(gameId);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const locationSetup = async () => {
        const stateInfo = "bloop";
        setTurnStateInfo("boop");

    }

    return (
        <div class="d-flex justify-content-center align-content-center flex-wrap"
             style={{
                 width: "47vw",
                 height: "97vh",
                 backgroundColor: "#222222",
                 borderRadius: "2em",
                 margin: ".5em",
                 marginRight: "2%",
                 marginLeft: "2%",
                 float: "left",
                 boxShadow: "10px 10px 30px #111111"
             }}
        >
            <div
                style={{
                    borderRadius: "em",
                    margin: ".5em",
                    marginRight: "2%",
                    marginLeft: "2%",
                    padding: '0.5rem',
                    zIndex: "1",
                    top: "50%",

                }}
            >


                <Container>
                    <Row xs={5} lg={5}>
                        <Room name="Classroom" rKey={1} image="../room-images/classroom.png" states={turnStateInfo}/>
                        <Hallway hKey={1} states={turnStateInfo}/>
                        <Room name="Hall" rKey={2} image="../room-images/Hall.png" states={turnStateInfo}/>
                        <Hallway hKey={2} states={turnStateInfo}/>
                        <Room name="Auditorium" rKey={3} image="../room-images/auditorium.jpg" states={turnStateInfo}/>
                    </Row>
                    <Row xs={3} lg={3}>
                        {hallR2.map((hall) => (
                            <Hallway hKey={hall} mid={true} states={turnStateInfo}/>
                        ))}
                    </Row>
                    <Row xs={5} lg={5}>
                        <Room name="Library" rKey={4} image="../room-images/library.jpg" states={turnStateInfo}/>
                        <Hallway hKey={6} states={turnStateInfo}/>
                        <Room name="Cafeteria" rKey={5} image="../room-images/cafeteria.jpg"
                              states={turnStateInfo}/>
                        <Hallway hKey={7} states={turnStateInfo}/>
                        <Room name="Dining Room" rKey={6} image="../room-images/Dining Room.png"
                              states={turnStateInfo}/>
                    </Row>
                    <Row xs={3} lg={3}>
                        {hallR4.map((hall) => (
                            <Hallway hKey={hall} mid={true} states={turnStateInfo}/>
                        ))}
                    </Row>
                    <Row xs={5} lg={5}>
                        <Room name="Conservatory" rKey={7} image="../room-images/Conservatory.png"
                              states={turnStateInfo}/>
                        <Hallway hKey={11} states={turnStateInfo}/>
                        <Room name="Ballroom" rKey={8} image="../room-images/Ballroom.png" states={turnStateInfo}/>
                        <Hallway hKey={12} states={turnStateInfo}/>
                        <Room name="Boiler Room" rKey={9} image="../room-images/boiler.jpg" states={turnStateInfo}/>
                    </Row> </Container>


            </div>
        </div>

    )

}

export default BoardDisplay;