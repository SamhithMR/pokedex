import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchData from '../hooks/FetchData';
import { useParams } from "react-router-dom";
import { CardSkeletons } from "../components/Skeleton";
import Card from '../components/Card';
import { MultiSelect } from "react-multi-select-component";
import './search.css';
import './home.css';
import axios from "axios";
import { useSelector } from 'react-redux'
import { toggleBookmark } from "../store/homeSlice";

function Bookmark() {
  const { name } = useParams();
  const [lists, setLists] = useState([]);
  const [items, setItems] = useState([]);
  const [loadedCardCount, setLoadedCardCount] = useState(10);
  const bookmarks = useSelector((state) => state.home.bookmarks);

  const [selectedFilters, setSelectedFilters] = useState({
    abilities: [],
    types: [],
    species: []
  });

  const { data: pokelists, loading: pokelistsLoading } = fetchData(`/pokemon?limit=5000`);

  const options = useSelector((state) => state.home.ability);
  const typesOptions = useSelector((state) => state.home.types);
  const speciesOptions = useSelector((state) => state.home.species);

//   useEffect(() => {
//     if (!pokelistsLoading && pokelists) {
//       const filteredList = pokelists.results.filter((pokemon) => pokemon.name.includes(name));
//       setLists(filteredList);
//     }
//   }, [pokelists, pokelistsLoading, name]);

  useEffect(() => {
    async function fetchDataFromApi(name) {
      try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setItems((prevItems) => {
          // Check if data already exists in the array
          const isDataExists = prevItems.some((item) => item.id === data.id);
          if (!isDataExists) {
            return [...prevItems, data];
          }
          return prevItems;
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    setItems([]);
    console.log(bookmarks);
    bookmarks.forEach((pokemon) => fetchDataFromApi(pokemon));
  }, [bookmarks]);

  const loadMoreCards = () => {
    setLoadedCardCount((prevCount) => prevCount + 10);
  };

  const handleFilterChange = (selected, filterType) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selected
    }));
  };

  // Filter items based on selected filters
  const filteredItems = items.filter((item) => {
    const abilitiesMatch = selectedFilters.abilities.length === 0 || item?.abilities.some((ability) =>
      selectedFilters.abilities.some((filter) => filter.value === ability.ability.name)
    );

    const typesMatch = selectedFilters.types.length === 0 || item?.types.some((type) =>
      selectedFilters.types.some((filter) => filter.value === type.type.name)
    );

    const speciesMatch = selectedFilters.species.length === 0 || selectedFilters.species.some((filter) =>
      filter.value === item?.species?.name
    );

    return abilitiesMatch && typesMatch && speciesMatch;
  });

  
  useEffect(() => {
    document.querySelector(".multi-select.abilities .gray").innerText = "Select Abilities";
    document.querySelector(".multi-select.types .gray").innerText = "Select Types";
    document.querySelector(".multi-select.species .gray").innerText = "Select Species";
  }, []);

  return (
    <div className="listContainer">
      <div className="filters">
        <MultiSelect
          options={options}
          value={selectedFilters.abilities}
          onChange={(selected) => handleFilterChange(selected, "abilities")}
          labelledBy="Select Abilities"
          className="multi-select abilities"
        />
        <MultiSelect
          options={typesOptions}
          value={selectedFilters.types}
          onChange={(selected) => handleFilterChange(selected, "types")}
          labelledBy="Select Types"
          className="multi-select types"
        />
        <MultiSelect
          options={speciesOptions}
          value={selectedFilters.species}
          onChange={(selected) => handleFilterChange(selected, "species")}
          labelledBy="Select Species"
          className="multi-select species"
        />

      </div>
      <div className="lists">
        {filteredItems?.map((x) => {
          return <Card result={x} />;
        })}
      </div>
      {loadedCardCount < lists.length && (
        <InfiniteScroll
          dataLength={loadedCardCount}
          next={loadMoreCards}
          hasMore={true}
          loader={<CardSkeletons />}
          className="infinite-scroll"
        ></InfiniteScroll>
      )}
      {pokelistsLoading && <div className="loader">Loading...</div>}
      {items.length <= 0  && <div className="resultNotFound">Sorry, there are no bookmarks</div>}
    </div>
  );

 

}

export default Bookmark;
