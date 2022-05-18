import { useState, useEffect } from 'react';

export default function useCounter() {
    const [isActive, setIsActive] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let timer = null;
        if(isActive){
        timer = setInterval(() => {
            setSeconds((seconds) => seconds + 1);
        }, 1000);
        }
        return () => {
        clearInterval(timer);
        };
    });

    const start = () => {
        if(isActive) return;
        setIsActive(true);
    }

    const clear = () => {
        setIsActive(false);
        setSeconds(0);
    }

    return {seconds, start, clear};
}