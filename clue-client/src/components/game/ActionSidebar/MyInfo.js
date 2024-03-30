import {Card, Col, Tab, Tabs, Nav, Row} from "react-bootstrap";
import {useWebSocket} from "../../../services/WebSocketProvider";
import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";


const MyInfo = ({playerHand}) => {
    const [myInfo, setMyInfo] = useState({});
    const [cookies, setCookie, removeCookie] = useCookies(['sessionId', 'externalGameId']);
    const [tabKey, setTabKey] = useState("myHand");
    const {stompClient} = useWebSocket();

    useEffect(() => {
        if (stompClient && stompClient.connected) {
            stompClient.subscribe('/player/' + cookies.sessionId + '/myInfo', (payload) => {
                const info = JSON.parse(payload.body);
                setMyInfo(info);
            });
            stompClient.send("/app/player/" + cookies.externalGameId + "/myInfo/" + cookies.sessionId, {}, "");
        }
    }, []);


    return (
        <>
            <Card
                style={{
                    fontFamily: "Jockey One",
                    color: "white",
                    backgroundColor: "#444444",
                    margin: "1em",
                    height: "35vh",
                    width: "90%",
                    boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",
                }}>
                <Tab.Container defaultActiveKey="myHand">
                    <Card.Header

                        style={{
                            fontSize: "1.7em",
                        }}
                    >
                        <Nav variant={"tabs"} defaultActiveKey={"myHand"}

                        >
                            <Nav.Item>
                                <Nav.Link eventKey="myHand"
                                style={{
                                    color: "scarlet",

                                }}>
                                    My Hand
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="myInfo"
                                          style={{
                                              color: "scarlet",
                                          }}>
                                    My Info
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey="myInfo">
                                <Row>
                                    <Col
                                        style={{
                                            fontSize: "1.2em",
                                        }}>
                                        <div>
                                            {myInfo.playerName}
                                        </div>
                                        <br/>
                                        <div>
                                            {myInfo.characterName}
                                        </div>
                                    </Col>
                                    <Col>
                                        <img
                                            src={myInfo.characterImageResource}
                                            style={
                                                {
                                                    width: "90%",
                                                    borderRadius: "2em",
                                                    boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",
                                                }
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="myHand">
                                {playerHand ? (playerHand.map((card, index) => (
                                        <>
                                            <img
                                                key={index}
                                                style={{
                                                    width: "30%",
                                                    maxWidth: "33%",
                                                    borderRadius: "2em",
                                                    margin: ".3em",
                                                    boxShadow: "2px 4px 4px 3px rgba(0, 0, 0, 0.7) "

                                                }}
                                                src={card.imageResource}
                                                alt={card.name}/>
                                        </>)))
                                    : (<> </>)

                                }

                            </Tab.Pane>
                        </Tab.Content>
                    </Card.Body>
                </Tab.Container>
            </Card>
        </>
    )
}

export default MyInfo;


{/*<Card*/
}
{/*    style={{*/
}
{/*        width: '95%',*/
}
{/*        backgroundColor: "#444444",*/
}
{/*        color: "white",*/
}
{/*        fontFamily: "Jockey One",*/
}
{/*        fontSize: "1.7em",*/
}
{/*        boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",*/
}
{/*    }}*/
}
{/*>*/
}
{/*    <Tab.Container defaultActiveKey="myInfo">*/
}

{/*        <Card.Header>*/
}
{/*            <Nav variant={"tabs"} defaultActiveKey={"myInfo"}>*/
}
{/*                <Nav.Item>*/
}
{/*                    <Nav.Link eventKey="myInfo">My*/
}
{/*                        Info</Nav.Link>*/
}
{/*                </Nav.Item>*/
}
{/*                <Nav.Item>*/
}
{/*                    <Nav.Link eventKey={"myHand"}>My*/
}
{/*                        Hand</Nav.Link>*/
}
{/*                </Nav.Item>*/
}
{/*            </Nav>*/
}
{/*        </Card.Header>*/
}
{/*        <Tab.Pane eventKey="myInfo">*/
}
{/*            <Card.Body>*/
}

{/*                <Row>*/
}
{/*                    <Col>*/
}
{/*                        {myInfo.playerName}*/
}
{/*                        <br/>*/
}
{/*                        {myInfo.characterName}*/
}

{/*                    </Col>*/
}
{/*                    <Col>*/
}
{/*                        <Card.Img*/
}
{/*                            style={{*/
}
{/*                                width: "90%",*/
}
{/*                            }}*/
}
{/*                            src={myInfo ? myInfo.characterImageResource : ""}*/
}
{/*                        ></Card.Img>*/
}
{/*                    </Col>*/
}
{/*                </Row>*/
}
{/*            </Card.Body>*/
}

{/*        </Tab.Pane>*/
}

{/*        <Tab.Pane eventKey="myHand">*/
}
{/*            <Card.Body>*/
}
{/*                {playerHand ? (playerHand.map((card, index) => (*/
}
{/*                        <>*/
}
{/*                            <img*/
}
{/*                                key={index}*/
}
{/*                                style={{*/
}
{/*                                    width: "20%",*/
}
{/*                                    maxWidth: "33%",*/
}
{/*                                    borderRadius: "2em",*/
}
{/*                                    margin: ".3em",*/
}
{/*                                    boxShadow: "2px 4px 4px 3px rgba(0, 0, 0, 0.7) "*/
}

{/*                                }}*/
}
{/*                                src={card.imageResource}*/
}
{/*                                alt={card.name}/>*/
}
{/*                        </>)))*/
}
{/*                    : (<> </>)*/
}

{/*                }*/
}
{/*            </Card.Body>*/
}
{/*        </Tab.Pane>*/
}
{/*    </Tab.Container>*/
}

{/*</Card>*/
}