import { useState, useEffect } from 'react';
import ListItem from '../List/ListItem';

function Dashboard() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched recipes:', data);
        setRecipes(data);
      })
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/recipes/${id}`, {
      method: 'DELETE', 
    })
      .then(() => setRecipes(recipes.filter((recipe) => recipe.id !== id)));
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <h2>Recipe List</h2>
      <ul className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <ListItem key={recipe.id} recipe={recipe} onDelete={handleDelete} />
          ))
        ) : (
          <p>Loading recipes...</p>
        )}
      </ul>
    </div>
  );
}

export default Dashboard;

