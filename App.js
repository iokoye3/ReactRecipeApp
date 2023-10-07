import React from 'react';
import './App.css';
import GetRecipes from './components/GetRecipes';
import RandomRecipes from './components/GetRandomRecipe';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='nav'>
        <nav>
          <ul>
            <li>
              <Link style={{
                textDecoration: 'none',
                color: 'red'
              }} to="/getRecipe">Get Recipes</Link>
            </li>
            <li>
              <Link style={{
                textDecoration: 'none',
                color: 'red'
              }} to="/randomRecipe">Get a Random Recipe</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/getRecipe" element={<GetRecipes />} />
          <Route path="/randomRecipe" element={<RandomRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
