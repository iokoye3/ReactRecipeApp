import React, { useEffect, useState } from 'react';

const GetRecipes = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [shownRecipes, setShownRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showMore, setShowMore] = useState(12);
  const showMoreIncrement = 12;

  const apiKey = '8995b991f8cc4af0a26a018f7b9f0485';
  const apiURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=1000&addRecipeInformation=true`;
  const autoURL = `https://api.spoonacular.com/recipes/autocomplete?apiKey=${apiKey}&query=${query}&number=100`
  
  // Fetch recipe data from spoonacular API (variables available on spoonacular)
  
  const fetchRecipes = () => {
    setRecipes([]);
    setShownRecipes([]);
    setSuggestions([]);
    setShowMore(12);
    setLoading(true);
    setSubmitted(true);
    
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setRecipes(data.results);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error);
      });
  };
  
  // Fetch autocomplete data from spoonacular API
  
  const handleAutoComplete = (change) => {
    if(change) {
      fetch(autoURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const choices = data.map((e) => e.title);
        setSuggestions(choices);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    else {
      setSuggestions([]);
    }
  }

  // Update autocomplete suggestions with each character addition/removal (not perfect)

  const handleChange = (e) => {
    const change = e.target.value;
    setQuery(change);
    handleAutoComplete(change);
  }
  
  const handleClick = (suggestion) => {
      setQuery(suggestion);
      setSuggestions([]);
  }

  // Next 2 functions used to show fetched recipes in groups of 12
  
  const handleShowMore = () => {
    setShowMore(showMore + showMoreIncrement);
  }
  
  useEffect(() => {
    const moreRecipes = recipes.slice(0, showMore);
    setShownRecipes(moreRecipes);
  }, [showMore, recipes])

  // Order of the autocomplete suggestions, input, and buttons matter
  // Keep suggestions and input in their own div within the larger div

  return (
    <div className="recipes">
      <div className="recipesinput">
        <div className='recipesdrop'>
          {suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion) => (
                  <li onClick={() => handleClick(suggestion)}>
                      {suggestion}
                  </li>
              ))}
            </ul>
          )}
          <input
            type='text'
            placeholder='Enter Food'
            value={query}
            onChange={handleChange}
          />
        </div>
        <button onClick={fetchRecipes}>Find Recipes</button>
      </div>
      {loading ? (<span className='empty'>Loading.....</span>) : (recipes.length > 0 ? (
        <>
          {shownRecipes.map((recipe) => (
            <div key={recipe.id} className='recipedisplay'>
                <img src={recipe.image} alt={recipe.title} />
                <p>{recipe.title}</p>
                <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">Link to Recipe</a>
            </div>
          ))} 
          {showMore < recipes.length && (
            <div className='showmore'>
              <button onClick={handleShowMore}>↓ SHOW MORE ↓</button>
            </div>
          )}
        </>
      ) : null )}
      {submitted && !loading && recipes.length === 0 ? (<p className='empty'>No Recipes</p>) : null}
    </div>
  );
}

export default GetRecipes;