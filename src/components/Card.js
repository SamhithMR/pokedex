import Img from './Img'
// import './components.css'
import { CircularProgressbar , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/search.css'

function Card({result}) {
  const navigate = useNavigate();

  return (
    <div className="card">
    <img src={result?.sprites?.front_default} alt="" />
    <h2>{result?.name}</h2>
    <div className="abilities">
    {result?.abilities?.slice(0, 2).map((ability) => (
            <div key={ability?.ability?.name}>{ability?.ability?.name}</div>
        ))}
    </div>
    <div className="types">
        {
            result?.types?.map((x)=>{
                return(<p>{x?.type?.name}</p>)
            })
        }
    </div>
    <div>
      {result?.species?.name}
    </div>
    <div>
      height: {result?.height} weight: {result?.weight}
    </div>
</div>
  );
}

export default Card;
