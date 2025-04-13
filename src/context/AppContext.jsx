import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const apiUrl = 'http://localhost:5000/recipes'; // Mock API URL for recipes

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (storedUser) {
      setUser(storedUser);
    }

    setFavorites(storedFavorites);
  }, []);

  // Fetch recipes from the mock API
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(apiUrl);
      setRecipes(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }
  };

  // Function to create a new recipe
  const createRecipe = async (newRecipe) => {
    try {
      const response = await axios.post(apiUrl, newRecipe);
      setRecipes((prevRecipes) => [...prevRecipes, response.data]);
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  // Function to update a recipe
  const updateRecipe = async (updatedRecipe) => {
    try {
      const response = await axios.put(`${apiUrl}/${updatedRecipe.id}`, updatedRecipe);
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === updatedRecipe.id ? response.data : recipe
        )
      );
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  // Function to delete a recipe
  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  // Adding a recipe to favorites
  const addToFavorites = (recipe) => {
    const newFavorites = [...favorites, recipe];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Removing a recipe from favorites
  const removeFromFavorites = (recipeId) => {
    const newFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <AppContext.Provider value={{
      user, favorites, fetchRecipes, createRecipe, updateRecipe, addToFavorites, removeFromFavorites, deleteRecipe
    }}>
      {children}
    </AppContext.Provider>
  );
};
