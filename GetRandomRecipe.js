import React, { useEffect, useState } from 'react';

  const GetRandomRecipe = () => {
    const [random, setRandom] = useState({});
    const apiKey = '8995b991f8cc4af0a26a018f7b9f0485';
    const apiURL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;
    
  // Fetch random recipe array
  
    const fetchRecipes = () => {
      fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRandom(data.recipes[0]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

  // Generate a random recipe whenever page is opened
  
    useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="random">
      <h1 className='header'>Random Recipe of the Day</h1>
      {random && (
        <div className='randomdisplay'>
          <img src={random.image} alt={random.title} />
          <p>{random.title}</p>
          <a href={random.sourceUrl} target="_blank" rel="noopener noreferrer">Link to Recipe</a>
        </div>
      )}
      <button className='another' onClick={fetchRecipes}>Get Another Random Recipe</button>
    </div>
  );
};
  
export default GetRandomRecipe;