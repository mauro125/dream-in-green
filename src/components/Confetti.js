import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default () => {
    const { width, height } = useWindowSize()
    return (
        <Confetti
            width={width}
            height={height}
            numberOfPieces={300}
            recycle={false}
            gravity={.09}
        />
    )
}