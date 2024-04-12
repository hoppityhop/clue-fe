import React, {useEffect, useState} from "react";
import {Container, Row, Col, Image, Button, Card, CardHeader, CardBody} from "react-bootstrap";
import updateService from "../../../services/updateService";
import characters from "./../../../data/characters.js";
import playerService from "../../../services/playerService";
import {useInfo} from "../context/InfoProvider";
import {useCookies} from "react-cookie";

const Hallway = (props) => {
    const [hallwayColor, setHallwayColor] = useState("#505050");
    const [cookies, removeCookie] = useCookies(['externalGameId', 'sessionId']);

    const hallwayKey = props.hKey;
    const middleRow = props.mid;
    const sessionId = cookies.sessionId;

    const hallwayInnerColor = "#8C8470";
    let hallwayTextColor = "#B0B0B0";

    //State from InfoProvider context.
    const {playerLocations, makeMove} = useInfo();

    //TODO color displays but is not changing back to default when state changes.



    useEffect(() => {

        setHallwayColor("#505050")

        if (playerLocations) {
            playerLocations.forEach((location) => {
                if (location.hallwayId == hallwayKey) {
                    setHallwayColor(location.characterColor);
                }
            })
        }
    }, [playerLocations]);


    return (
        <Col className={middleRow ? "d-flex align-items-between justify-content-center " : "d-flex align-items-center "}


        >
            <Button
                style={{
                    width: `${middleRow ? "40%" : "100%"}`,
                    height: `${middleRow ? "5rem" : "50%"}`,
                    cursor: "pointer",
                    marginLeft: `${middleRow ? "3rem" : "0"}`,
                    marginRight: `${middleRow ? "3rem" : "0"}`,
                    backgroundColor: hallwayInnerColor,
                    borderColor: hallwayColor,
                    borderWidth: "7px",
                }}

                key={hallwayKey}
                id = {"hall" + hallwayKey}
                onClick={() => {
                    makeMove(hallwayKey, false);
                    //console.log("*****HALLWAY MOVE REQUEST MADE*****");
                    //console.log("hallwayKey: " + hallwayKey);
                    //console.log("sessionId: " + sessionId);
                }}
            >
                <Card.Text
                    as="h1"
                    class="d-flex justify-content-center align-content-center flex-wrap"
                    style={{
                        verticalAlign: "middle",
                        textAlign: "middle",
                        color: hallwayTextColor,
                        font: "Jockey One",
                    }}
                >

                    {/*{hallwayKey}*/}

                </Card.Text>
            </Button>
        </Col>
    );
};


export default Hallway;