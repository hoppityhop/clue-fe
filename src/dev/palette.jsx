import {Fragment} from "react"
import {
    Category,
    Component,
    Variant,
    Palette,
} from "@react-buddy/ide-toolbox"
import {Alert} from "react-bootstrap/cjs";

export const PaletteTree = () => (
    <Palette>
        <Category name="App">
            <Component name="Loader">
                <Variant>
                    <ExampleLoaderComponent/>
                </Variant>
            </Component>
        </Category>
        <Category name="Bootstrap">
            <Component name="Alert">
                <Variant>
                    <Alert
                    variant={"secondary"}
                    />
                </Variant>
            </Component>
        </Category>
    </Palette>
)

export function ExampleLoaderComponent() {
    return (
        <Fragment>Loading...</Fragment>
    )
}