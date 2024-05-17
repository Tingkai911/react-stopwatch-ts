import React, {useRef, useEffect, useState} from "react";

function Stopwatch() {
    // Does rerender components
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    // Does not rerender components
    const intervalIdRef : React.MutableRefObject<number> = useRef<number>(0);
    const startTimerRef : React.MutableRefObject<number> = useRef<number>(0);

    // Any time the state of isRunning changes, useEffect will run and rerender the component
    useEffect(() => {
        // Every 10ms, we update the timer in the screen
        if(isRunning) {
            // Runs the function evey 10ms
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimerRef.current);
            }, 10);
        }

        // Cleanup function
        return () => {
            // Stop the function from running every 10ms
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimerRef.current = Date.now() - elapsedTime;
    }
    function stop() {
        setIsRunning(false);
    }
    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }
    function formatTime() : string {
        let hours : number | string= Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes : number | string = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds : number | string = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds: number | string = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button onClick={start} className="start-button">Start</button>
                <button onClick={stop} className="stop-button">Stop</button>
                <button onClick={reset} className="reset-button">Reset</button>
            </div>
        </div>
    )
}

export default Stopwatch;