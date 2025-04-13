import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';I

function RecipeDetail() {
  const { id } = useParams();
  const { fetchRecipes, deleteRecipe, addToFavorites, removeFromFavorites } = useContext(AppContext);
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      const recipes = await fetchRecipes();

      const foundRecipe = recipes.find((r) => r.id.toString() === id);

      console.log("Found Recipe:", foundRecipe);

      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        console.error("Recipe not found with ID:", id);
      }
    };

    getRecipe();
  }, [id, fetchRecipes]);

  const handleDelete = async () => {
    await deleteRecipe(id);
    window.location.href = '/';
  };

  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      await removeFromFavorites(id);
    } else {
      await addToFavorites(recipe);
    }
    setIsFavorite(!isFavorite);
  };

  if (!recipe) return <p className="text-center text-lg text-gray-500">Recipe not found</p>;

  return (
    <div className="p-8 bg-recipe-light min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-recipe-dark mb-6">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-72 object-cover rounded-lg shadow-xl mb-6"
      />
      <div className="text-center text-recipe-dark mb-4">
        <p className="text-xl mb-2">Cooking Time: {recipe.time} mins</p>
        <p className="text-xl mb-4">Rating: {recipe.rating}</p>
      </div>

      <div className="w-full md:w-3/4 lg:w-1/2 bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-recipe-dark mb-4">Ingredients</h2>
        <ul className="list-disc pl-6 text-lg text-gray-700 mb-6">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold text-recipe-dark mb-4">Instructions</h2>
        <ol className="list-decimal pl-6 text-lg text-gray-700">
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      <div className="flex justify-center space-x-6">
        <button
          onClick={handleFavoriteToggle}
          className={`px-6 py-2 ${isFavorite ? 'bg-destructive' : 'bg-primary'} text-white rounded-md shadow-md hover:bg-opacity-80 transition`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
        </button>

        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-primary text-white rounded-md shadow-md hover:bg-opacity-80 transition"
        >
          Delete Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeDetail;
