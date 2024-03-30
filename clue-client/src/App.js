import {
    BrowserRouter as Router,
    Routes,
    Route,
    Switch,
    useParams,
    useNavigate
} from "react-router-dom";

import GameSession from "./components/game/GameSession";
import Home from "./components/home/Home";
import backgroundImage from "./images/wood3.webp";
import {useEffect, useState} from "react";


function App() {
    const [bgImage, setBgImage] = useState(null);

    useEffect(() => {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => {
            setBgImage(backgroundImage);
        }
    })

    return (
        <>
            <div style={
                {
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    height: "100vh",
                    width: "100vw"
                }
            }>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/game/:gameId" element={<GameSession/>}/>
                    </Routes>
                </Router>
            </div>
        </>
    );
}

export default App;
