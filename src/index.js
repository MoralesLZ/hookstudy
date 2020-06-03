import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';



const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}/`)
        .then(res => res.json())
        .then(data => data);
}

const useRequest = (request) => {
    const [ dataState, setDataState ] = useState(null);

    useEffect(() => {
       let cancelled = false;
       request()
           .then(data => !cancelled && setDataState(data));
       return () => cancelled = true;
    }, [ request ])
    return dataState;
}

const usePlanetInfo = (id) => {
    const request = () => getPlanet(id);
    return useRequest(request);
}

const PlanetInfo = ({id}) => {
    const data = usePlanetInfo(id);
    return (
        <div>{id} - {data && data.name}</div>
    );
}

const App = () => {
    const [value, setValue] = useState(1);
    return (
        <div>
            <button onClick={() => setValue((v) => v+1)}> + </button>
            <PlanetInfo id={value}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));