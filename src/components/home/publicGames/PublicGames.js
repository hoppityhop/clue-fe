import React, {useState} from "react";
import {Button, Form, Modal, Container, Row, Col} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import updateService from "../../../services/updateService";
import CharacterSelectModal from "../characterSelect/CharacterSelectModal";
import characterService from "../../../services/characterService";
import SimpleBar from "simplebar-react";

import PublicGameInfo from "./PublicGameInfo";


import 'simplebar-react/dist/simplebar.min.css';

const PublicGames = () => {
    const [publicGames, setPublicGames] = useState([]);


    return (
        <div
            className="p-4"
            style={{
                borderRadius: "1em",
                backgroundColor: "#222222",
                height: "26rem",
                maxHeight: "27rem",
                width: "90%",
                margin: "auto",
                textAlign: "center",
                boxShadow: "10px 10px 30px #111111",
                color: "white",
                fontSize: "3em",
                overflow: "hidden"

            }}
        >
            Public Games (Coming Soon)
            <br/>


            <SimpleBar
                style={{
                    backgroundColor: "#223132",
                    width: "90%",
                    maxHeight: "80%",
                    margin: "auto",
                    borderRadius: ".5em",
                    textAlign: "center",
                    boxShadow: "10px 10px 30px #111111",
                    color: "white",
                    overflowY: "auto",
                    boxSizing: "content-box",
                }}
            >
                <PublicGameInfo/>

            </SimpleBar>

        </div>
    )
}

export default PublicGames;