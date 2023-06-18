import FetchData from '../hooks/FetchData';
import { useParams } from 'react-router-dom';

import { toggleBookmark } from '../store/homeSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './details.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fetchDataFromApi from '../utils/fetchDataFromApi';

import pokeballImage from '../assets/pokeball.png';

function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [evolution, setEvolution] = useState()

  const { data, err, loading } = FetchData(`/pokemon/${id}`);
  const { data: evolData, err: evolError, loading: evolLoading } = FetchData(`pokemon-species/${id}`);
  const bookmarks = useSelector((state) => state.home.bookmarks);

  useEffect(() => {
    fetchDataFromApi(`/pokemon-species/${id}`)
      .then((res) => {
        fetchDataFromApi(`/evolution-chain/${res?.evolution_chain?.url.split('/').filter(Boolean).pop()}/`)
          .then((evolutionRes) => {
            setEvolution(evolutionRes);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  

  const isBookmarked = bookmarks.includes(data?.id);

  const handleBookmarkToggle = () => {
    dispatch(toggleBookmark({ id: data?.id, bookmarked: !isBookmarked }));
  };


  const getPokemonIdFromURL = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  };

  return (
    <div className="details_container">
         <img src={pokeballImage} alt="" />
      {!loading && data && (
        <div className="details">
          <div className="details_header">
            <div>
              <img src={data?.sprites?.other['official-artwork']['front_default']} alt="" />
            </div>
            <div className="details_content">
              <div>
                <h1>{data?.name}</h1>
                <button onClick={handleBookmarkToggle}>
                  {isBookmarked ? (
                  <svg height="30px" width="30px" version="1.1" id="Layer_1" viewBox="0 0 495 495" >
                  <g>
                      <path style={{"fill":"#C70024"}} d="M362.96,14.24c-49.72,0-92.95,27.53-115.46,68.13v398.39C284.67,452.84,495,288.55,495,146.28
                          C495,73.36,435.88,14.24,362.96,14.24z"/>
                      <path style={{"fill":"#FF0C38"}} d="M132.04,14.24C59.12,14.24,0,73.36,0,146.28c0,142.26,210.33,306.55,247.5,334.48V82.37
                          C224.99,41.77,181.76,14.24,132.04,14.24z"/>
                  </g>
                  </svg>
                  ) : (
                    <svg  height="30px" width="30px" version="1.1" id="Layer_1" viewBox="0 0 455 455">
                    <path d="M326.632,10.346c-38.733,0-74.991,17.537-99.132,46.92c-24.141-29.384-60.398-46.92-99.132-46.92
                        C57.586,10.346,0,67.931,0,138.714c0,55.426,33.05,119.535,98.23,190.546c50.161,54.647,104.728,96.959,120.257,108.626l9.01,6.769
                        l9.01-6.768c15.529-11.667,70.098-53.978,120.26-108.625C421.949,258.251,455,194.141,455,138.714
                        C455,67.931,397.414,10.346,326.632,10.346z M334.666,308.974c-41.259,44.948-85.648,81.283-107.169,98.029
                        c-21.52-16.746-65.907-53.082-107.166-98.03C61.236,244.592,30,185.717,30,138.714c0-54.24,44.128-98.368,98.368-98.368
                        c35.694,0,68.652,19.454,86.013,50.771l13.119,23.666l13.119-23.666c17.36-31.316,50.318-50.771,86.013-50.771
                        c54.24,0,98.368,44.127,98.368,98.368C425,185.719,393.763,244.594,334.666,308.974z"/>
                    </svg>
                  )}
                </button>
              </div>
              <div className="details_blocks">
                <div className="details_block1">
                  <div className="abilities">
                    abilities: {data?.abilities?.slice(0, 2).map((ability) => <span key={ability?.ability?.name}>{ability?.ability?.name}</span>)}
                  </div>
                  <div className="types">
                    type: {data?.types?.map((x) => <span key={x?.type?.name}>{x?.type?.name}</span>)}
                  </div>
                  <div>
                    species: <span>{data?.species?.name}</span>
                  </div>
                  <div>
                    height: <span>{data?.height}</span> weight: <span>{data?.weight}</span>
                  </div>
                </div>
                <div className="stat-progress">
                  {data?.stats?.map((stat) => (
                    <div key={stat.stat.name}>
                      <p>{stat.stat.name}</p>
                      <progress
                        className="progress-bar"
                        value={stat.base_stat}
                        max={100}
                      ></progress>
                      <span>{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='evolution'>
                    {evolution?.chain?.species && <div>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution?.chain?.species?.url.split('/').filter(Boolean).pop()}.png`}/>
                        <p>{evolution?.chain?.species?.name}</p>
                    </div>}
                    {evolution?.chain?.evolves_to?.[0] && <div>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution?.chain?.evolves_to?.[0]?.species?.url.split('/').filter(Boolean).pop()}.png`}/>
                        <p>{evolution?.chain?.evolves_to?.[0]?.species?.name}</p>
                    </div>}
                    {evolution?.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species && <div>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolution?.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species?.url.split('/').filter(Boolean).pop()}.png`}/>
                        <p>{evolution?.chain?.evolves_to?.[0]?.evolves_to?.[0]?.species?.name}</p>
                    </div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
