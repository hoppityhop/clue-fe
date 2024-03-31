const GameInfo = ({joinCode, gameName}) => {
   return (
      <div
         style={{
            width: "97%",
            backgroundColor: "#737373",
            borderRadius: ".5em",
            marginTop: ".5em",
            marginRight: "auto",
            marginLeft: "auto",
            marginBottom: "1em",
            fontFamily: "Jockey One",
            color: "white",
            overflow: "hidden", // prevent text from overflowing
            boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.7) ",
         }}
         id="gameInfo"
      >
         <span
            style={{
               marginLeft: "1em",
               fontSize: "2vw", // responsive font size
            }}
            id="gameName"
         >
            Game:  &nbsp; &nbsp;{gameName}
         </span>{" "}
         <br />
         <span
            style={{
               marginLeft: "1em",
               fontSize: "2vw", // responsive font size
            }}
            // id="joinCode"
         >
             Join Code: &nbsp; &nbsp; <span id="joinCode">{joinCode}</span>
         </span>{" "}
      </div>
   );
};

export default GameInfo;
