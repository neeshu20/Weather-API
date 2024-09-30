import { useContext, createContext, useState, useEffect } from "react";
//createContext is used to create a context object, which allows the state to be shared across components without 
//prop drilling.
//useContext is used to access the context.
import axios from 'axios'; //libraray for fetching data from api calling (npm i axios)


//createContext() creates a new context object called StateContext, which will hold the shared state 
//and provide access to it across the app.
const StateContext = createContext()

//weather: Stores the current weather data for the location.
//values: Stores an array of weather data values (could represent hourly or daily forecasts).
//place: Represents the city or location the user is looking up (initialized to 'Jaipur').
//thisLocation: Stores the formatted name of the location returned by the API.

//supply the shared state to any child components.
export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('Jaipur')
    const [thisLocation, setLocation] = useState('')

    // fetch api from visual crossing weather 
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place, //name of the place (city) to fetch weather for.
                contentType: 'json',
                unitGroup: 'metric', //Uses metric units for temperature (Celsius).
                shortColumnNames: 0,
            },
            headers: { //to authenticate with rapid api 
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        }

        try {
            //This block tries to make the API request. If the request is successful, it:
            const response = await axios.request(options);
            console.log(response.data) // Logs the API response.
            const thisData = Object.values(response.data.locations)[0] //Extracts the weather data for the specified location from the API response.
            setLocation(thisData.address)
            setValues(thisData.values) //ets the array of weather data values.
            setWeather(thisData.values[0]) //Sets the current weather conditions (usually the most recent data point).
        } catch (e) {
            console.error(e);
            // if the api throws error.
            alert('This place does not exist')
        }
    }

    //This effect runs the fetchWeather function whenever the value of place changes. 
    //It updates the weather data based on the new location (city).
    useEffect(() => {
        fetchWeather()
    }, [place])
    
    //This effect logs the weather data (values) to the console every time the values array is updated. 
    useEffect(() => {
        console.log(values)
    }, [values])

    return (
        //This component makes the state (weather, setPlace, values, thisLocation, place) available to all 
        //child components of StateContextProvider.
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)