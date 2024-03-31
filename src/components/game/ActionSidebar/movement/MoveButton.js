import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const MoveButton = (props) => {
   const handleClick = () => {
      console.log("clicked");
   };

   return (
      <div style={{width:"20%"}}>
         <Container style={{ width: "80%" }}>
            <Row>
               <Col></Col>
               <Col style={{ margin: "0 10px" }}>
                  <Button
                     onClick={handleClick}
                     variant="primary"
                     size="lg"
                     block
                  >
                     Up
                  </Button>
               </Col>
               <Col></Col>
            </Row>
            <Row>
               <Col style={{ margin: "10px 0" }}>
                  <Button
                     onClick={handleClick}
                     variant="primary"
                     size="lg"
                     block
                  >
                     Left
                  </Button>
               </Col>
               <Col></Col>
               <Col style={{ margin: "10px 0" }}>
                  <Button
                     onClick={handleClick}
                     variant="primary"
                     size="lg"
                     block
                  >
                     Right
                  </Button>
               </Col>
            </Row>
            <Row>
               <Col></Col>
               <Col style={{ margin: "0 10px" }}>
                  <Button
                     onClick={handleClick}
                     variant="primary"
                     size="lg"
                     block
                  >
                     Down
                  </Button>
               </Col>
               <Col></Col>
            </Row>
         </Container>
      </div>
   );
};

export default MoveButton;
