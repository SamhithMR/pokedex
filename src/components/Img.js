import LazyLoad from "react-lazy-load"
import noPoster from '../assets/no-poster.png'
import React, { useState } from "react";
import {ImgSkeleton} from './Skeleton'
import noPokemonImage from "../assets/noPokemon.png";

function Img({ url }) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
      {isLoading && (
        <img src={noPokemonImage} alt="Loading..." style={{ position: "absolute", top: 0, left: 0 }} />
      )}
      {imageError ? (
        <img src={noPokemonImage} alt="No poster available" />
      ) : (
        <img src={url} onLoad={handleImageLoad} onError={handleImageError} />
      )}
    </div>
  );
}

export default Img;
