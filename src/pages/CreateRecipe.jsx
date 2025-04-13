import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function CreateRecipe() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');
  const { createRecipe } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      title,
      time: 30,
      rating: 4.5,
      image,
      ingredients: ingredients.split(','),
      instructions: instructions.split('.'),
    };

    await createRecipe(newRecipe);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg">Recipe Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter recipe title"
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
            placeholder="Enter ingredients, separated by commas"
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
            placeholder="Enter instructions, separated by periods"
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
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
