import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import SuggestionButton from "../components/game/ActionSidebar/actions/SuggestionButton";
import WebSocketProvider from "../services/WebSocketProvider";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/SuggestionButton">
                <SuggestionButton/>
            </ComponentPreview>
            <ComponentPreview path="/WebSocketProvider">
                <WebSocketProvider/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews