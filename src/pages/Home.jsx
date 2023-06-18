import React, { useEffect, useState } from "react"
import FetchData from '../hooks/FetchData'
import {BannerSkeleton} from '../components/Skeleton'
import {useNavigate} from 'react-router-dom'
import './home.css'
import axios from "axios"

function Home(){
    const { data, err, loading } = FetchData(`/pokemon?limit=1000`)
    const [image, setImage]=useState('')
    const [value, setValue] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        let url = data && data.results && data.results[Math.floor(Math.random() * data.results.length)]?.url;
        const id = url && url.match(/\/(\d+)\//)?.[1];
        setImage(id)
      }, [data]);
      
    
    return (
            <div className="banner">
            {(loading || err) ? 
                <img src={`../assets/noPokemon.png`}/>
                : 
                <img 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${image}.png`} 
                />
                }
        <div className="mask"></div>
        <div className="banner_contents">
            <h2>welcome.</h2>
            <p>search your pokemon</p>
            <form className="input_feild" onSubmit={(e) => {e.preventDefault();navigate(`/lists/${value}`); setValue("")}}>
                <input placeholder=" type your pokemon" value={value} onChange={(e) => (setValue(e.target.value.toLowerCase()))}></input>
                <button type="submit">search</button>
            </form>
        </div>
    </div>)
}
export default Home