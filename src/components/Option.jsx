import React from "react"
import { Checkbox } from "@web3uikit/core"

export const Option = ({ name, index, optionsArray }) => {
    const clickCheckbox = (index) => {
        console.log(index.index)
        optionsArray[index.index].clicked = !optionsArray[index.index].clicked
        console.log(optionsArray)
    }
    return (
        <div>
            <Checkbox
                id={name}
                label={name}
                name={name}
                onChange={() => clickCheckbox({ index })}
            />
        </div>
    )
}
