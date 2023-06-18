import Img from './Img'
// import './components.css'
import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/search.css'
import { useDispatch, useSelector } from "react-redux";
import { toggleBookmark } from "../store/homeSlice";

import { abilityColors, typeColors } from '../assets/source';

function Card({result}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.home.bookmarks);

  const isBookmarked = bookmarks.includes(result?.id);

  const handleBookmarkToggle = () => {
    dispatch(toggleBookmark({ id: result?.id, bookmarked: !isBookmarked }));
  };

  


  return (
    <div className="card" >
      <img src={result?.sprites?.front_default} alt="" onClick={()=>navigate(`/details/${result?.id}`)}/>
      <button onClick={handleBookmarkToggle}>
          {isBookmarked ? <svg viewBox="0 0 50 50" width="50px" height="50px"><path d="M 37 48 C 36.824219 48 36.652344 47.953125 36.496094 47.863281 L 25 41.15625 L 13.503906 47.863281 C 13.195313 48.042969 12.8125 48.046875 12.503906 47.867188 C 12.191406 47.6875 12 47.359375 12 47 L 12 3 C 12 2.449219 12.449219 2 13 2 L 37 2 C 37.554688 2 38 2.449219 38 3 L 38 47 C 38 47.359375 37.808594 47.6875 37.496094 47.867188 C 37.34375 47.957031 37.171875 48 37 48 Z"/></svg>:<svg viewBox="0 0 50 50" width="50px" height="50px"><path d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z"/></svg>}
      </button>
      <div className="abilities" onClick={()=>navigate(`/details/${result?.id}`)}>
      {result?.abilities?.slice(0, 2).map((ability) => {
       return( <p key={ability?.ability?.name} 
                  style={{background: abilityColors[ability?.ability?.name]}}
                >{ability?.ability?.name}</p>)
      }
        )}
      </div>
        <h2 onClick={()=>navigate(`/details/${result?.id}`)}>{result?.name}</h2>
      <div className="types">
          {
              result?.types?.map((x)=>{
                  return(<p
                    key={x.type.name}
                    style={{ backgroundColor: typeColors[x.type.name] }}
                  >
                    {x.type.name}
                  </p>)
              })
          }
      </div>
      <div className='species'>
        {result?.species?.name}
      </div>
    </div>
  );
}

export default Card;
