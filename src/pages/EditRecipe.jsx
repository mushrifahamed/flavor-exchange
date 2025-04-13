import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function EditRecipe() {
  const { id } = useParams();
  const { fetchRecipes, updateRecipe } = useContext(AppContext);
  const [recipe, setRecipe] = useState(null);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipe = async () => {
      const recipes = await fetchRecipes();
      const foundRecipe = recipes.find((r) => r.id.toString() === id);
      if (foundRecipe) {
        setRecipe(foundRecipe);
        setTitle(foundRecipe.title);
        setIngredients(foundRecipe.ingredients.join(','));
        setInstructions(foundRecipe.instructions.join('.'));
        setImage(foundRecipe.image);
      }
    };

    getRecipe();
  }, [id, fetchRecipes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      id: parseInt.toString(id),
      title,
      time: 30, // Mock cooking time
      rating: 4.5, // Mock rating
      image,
      ingredients: ingredients.split(','),
      instructions: instructions.split('.'),
    };

    await updateRecipe(updatedRecipe); 
    navigate(`/recipe/${id}`);
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg">Recipe Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-lg">Ingredients</label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="instructions" className="block text-lg">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-lg">Recipe Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
}

export default EditRecipe;
