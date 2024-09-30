import { useEffect, useState } from "react";

//"state" is data that can change over time. 
//The useState hook returns two things: the current state value and a function to update that value.
//useEffect is used for running side effects (like API calls or timers) after the component renders.


// The useDate hook in your React code provides the current date and time, and it updates every minute.
export const useDate = () => {
    const locale = 'en'; // Locale set to English
    const [today, setDate] = useState(new Date()) // Initialize 'today' with the current date and time

    useEffect(() => {
        const timer = setInterval(() => {
            //The setDate function is called every 60 seconds to update the today state.
            setDate(new Date())// Updates the 'today' state every minute
        }, 60*1000) //Sets a timer to run every 60 seconds (1 minute)

        return () => {
           //When the component unmounts, the interval is cleared to avoid memory leaks.
            clearInterval(timer) // Cleans up the timer when the component unmounts
        }
    },[])
 
    //long -- Returns the full name of the weekday (e.g., "Monday").

    const day = today.toLocaleDateString(locale, {weekday: 'long'})
    const date = `${day}, ${today.getDate()}, ${today.toLocaleDateString(locale, {month: 'long'})}\n\n`
    const time = today.toLocaleDateString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' })


    return {
        //The hook returns an object containing the date and time strings.
        date, time
    }
}