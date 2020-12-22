import React, {useEffect ,useState } from "react"; 
import Recipe from './Recipe';
import "./App.css"




function App(){
  
  const APP_ID = '4e73637e';
  const APP_KEY = '025b21abb3540fde5e17eeeae9756b4c';
  
  const [recipes,setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('banana')

  useEffect( ()=>{
    getRecipes();
  },[query]);
  
  const getRecipes = async () => {
    const reponse = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await reponse.json();
    setRecipes(data.hits);
    console.log(data.hits);  
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const  getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }


  return(
    <div className="app">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
         </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key = {recipe.recipe.label}
        title={recipe.recipe.label} 
        calories = {recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>


  )};

export default App
