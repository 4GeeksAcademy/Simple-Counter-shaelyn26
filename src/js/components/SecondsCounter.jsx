import React, {useState, useRef, useEffect} from "react";

export const SecondsCounter = ()=> {
    const [time, setTime] = useState(0)
    const [counting, setCounting] = useState(true)
    const secondsCounter= useRef()
    // this variable is a container to hold the timer ID, to stop it later

    useEffect(()=>{
        if(counting) {
            secondsCounter.current = setInterval(() => {
            setTime((pre)=> pre + 1)  
            }, 1000);
        }
        return () => clearInterval(secondsCounter.current)
    }, [counting])
    // the useEffect is used when rendering live page, when counting is set to true a timer is set to setinterval()
    // after each second it adds a one second to the timer using setTime (line 12)
    // the return is what will clear the old timer, a restart (line 15)
    
    const format =(time) => {
        // 'format' from (line 35) had to be called

        let hours = Math.floor((time / 60 / 60) % 24 )
        let minutes = Math.floor((time / 60 ) % 60 )
        let seconds = Math.floor((time ) % 60 )
    // (line 24) converts time [in seconds]into 'hours', using Math.floor rounds # down to nearest integer. % aka modulus operator is used for #24 to keep it within the day, 24hr day. 
    // (line 25) converts time [in seconds]into 'minutes', using Math.floor rounds # down to nearest integer. % aka modulus operator is used for #60 to keep within minutes (60min)
    // (line 26) converts time [in seconds]into 'seconds', using Math.floor rounds # down to nearest integer. % aka modulus operator is used for #60 to keep within seconds (60secs)
        hours = hours < 10 ? "0" + hours : hours 
        minutes = minutes < 10 ? "0" + minutes : minutes 
        seconds = seconds < 10 ? "0" + seconds : seconds
        // (lines 30,31,32) if hours/minutes/seconds is less than 10; add a 0; otherwise keep as is [1:15pm -- 01:15pm]
        return hours + ":" + minutes + ":" + seconds
        // returns the formatted time as a string 
    }
    
    return(
        <div className="container">
            <div>
                <p>My Timer{format(time)}</p>
                <button onClick={()=> setTime(0)}>Reset Button</button>
                {/* once button is clicked that resets the timer to 0 by calling setTime function with 0 inside */}

                <button onClick={() => {
                    if(counting) clearInterval(secondsCounter.current);
                    setCounting(!counting)
                }}> {counting ? "stop": "continue"}</button>
                {/* this button toggles between starting and stopping the time  */}
            </div>
        </div>
    )
}