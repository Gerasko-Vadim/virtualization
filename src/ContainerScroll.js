import React, { useEffect, useRef, useState } from "react"
import "./index.css"




const ContainerScroll = () => {
    const [scrollTop, setScrollTop] = useState(0)

    const rowHeight = 50
    const viewportHeight = 300;
    const amountRowsBuffered = 2;
    const amountRows = 1000;

    const ref = useRef()
    const arr = [];

    // auto scroll
    useEffect(() => {
        setInterval(function () {
            if (ref.current) {
                ref.current.scrollTop += rowHeight

            }
        }, 1000)
    }, [])

    
    // handler event scroll
    const onScroll = () => {
        setScrollTop(ref.current.scrollTop)
    }


    for (let index = 0; index < amountRows; index++) {
        arr.push({ index, text: `Post number ${index}`, top: index * rowHeight });
    }



    // start index
    const indexStart = Math.floor(scrollTop / rowHeight);
    // end index
    const indexEnd = Math.min(
        Math.ceil((scrollTop + viewportHeight) / rowHeight - 1) +
        amountRowsBuffered,
        amountRows - 1
    );

    return (
        <>
            <div
                ref={ref}
                onScroll={onScroll}
                className='block'
            >
                <div
                    className='rows'
                    style={{ height: amountRows * rowHeight }}
                >
                    {arr.slice(indexStart, indexEnd + 1).map((item, index) => (
                        <div key={item.index} style={{
                            position: "absolute",
                            top: item.top
                        }} >
                            {item.text}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ContainerScroll;