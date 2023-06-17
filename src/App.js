import { Route, Routes } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { useEffect } from "react";

import './App.css';
import fetchDataFromApi from './utils/fetchDataFromApi'
import { getabilities, getaTypes, getSpecies } from "./store/homeSlice";

import Home from './pages/Home'
import Lists from './pages/lists'
import Details from './pages/details'
import Bookmark from './pages/Bookmark'

// import PageNotFound from './pages/pagenotfound/PageNotFound'
// import Header from './components/header'
// import Footer from './components/footer'


function App() {

  const dispatch = useDispatch()
  const data = []
  const types = []
  const species = []

  useEffect(() => {
     
          fetchDataFromApi(`/ability/?limit=5000`)
          .then((res)=>{res.results.forEach((x)=>data.push({'value':x.name,'label':x.name}))})
          .then(()=>{ dispatch(getabilities(data))
          })
          .catch((err)=>{console.log(err.message);})

          fetchDataFromApi(`/type`)
          .then((res)=>{res.results.forEach((x)=>types.push({'value':x.name,'label':x.name}))})
          .then(()=>{ dispatch(getaTypes(types))
          })
          .catch((err)=>{console.log(err.message);})

          fetchDataFromApi(`/pokemon-species/?limit=5000`)
          .then((res)=>{res?.results.forEach((x)=>species.push({'value':x.name,'label':x.name}))})
          .then(()=>{dispatch(getSpecies(species))
          })
          .catch((err)=>{console.log(err.message);})
        
    },[])


  return (
    <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/bookmark" element={<Bookmark />}/>
          <Route path="/lists/:name" element={<Lists />}/>
          <Route path="/Details/:id" element={<Details />}/>
          {/* <Route path="*" element={<PageNotFound />}/> */}
        </Routes>
        {/* <Footer /> */}

    </div>
  );
}

export default App;
