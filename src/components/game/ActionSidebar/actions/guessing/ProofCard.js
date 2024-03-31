import React, {useEffect} from "react";
import {Card} from "react-bootstrap";


const ProofCard = ({imagePath, proofName, proofBody, matches}) => {

    let cardColor = null;
    if (matches) {
        cardColor = "green";
    }
    else if (matches === false) {
        cardColor = "red";
    }

    return (
        <Card style={{
            width: '15rem',
            borderWidth: "5px",
            borderColor: cardColor
        }}>
            <Card.Img variant="top" src={imagePath}
            style={{
                width: "100%",
                height: "auto"


            }}/>
            <Card.Body>
                <Card.Title>{proofName}</Card.Title>
                <Card.Text>
                    {proofBody}
                </Card.Text>
            </Card.Body>
        </Card>

    )
}

export default ProofCard;