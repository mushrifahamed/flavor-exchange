import { useState } from 'react';
import RecipeCard from './RecipeCard'; // We'll create this component next

const mockRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    time: 30,
    rating: 4.5,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    title: "Margherita Pizza",
    time: 40,
    rating: 4.8,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    title: "Chicken Alfredo",
    time: 35,
    rating: 4.2,
    image: "https://via.placeholder.com/300",
  },
  // Add more mock recipes as needed
];

function RecipeFeed() {
  const [search, setSearch] = useState('');

  // Filter recipes based on search query
  const filteredRecipes = mockRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-md"
          placeholder="Search recipes by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipeFeed;