import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-2xl font-semibold mt-4">{recipe.title}</h3>
      <p className="text-gray-600 mt-2">Cooking Time: {recipe.time} mins</p>
      <p className="text-gray-600 mt-2">Rating: {recipe.rating}</p>
      <Link
        to={`/recipe/${recipe.id}`}
        className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
      >
        View Recipe
      </Link>
    </div>
  );
}

export default RecipeCard;
