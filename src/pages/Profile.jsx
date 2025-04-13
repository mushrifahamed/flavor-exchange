import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';

function Profile() {
  const { user, favorites, removeFromFavorites } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/')}
        className="text-blue-500 hover:text-blue-700 mb-6"
      >
        Back to Home
      </button>

      <h1 className="text-4xl font-bold text-center mb-8">Welcome, {user}!</h1>
      <p className="text-xl text-center mb-4">Your Favorite Recipes</p>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">You haven't saved any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <div key={recipe.id}>
              <RecipeCard recipe={recipe} />
              <button
                onClick={() => removeFromFavorites(recipe.id)}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Logout Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => {
            localStorage.removeItem('username');
            localStorage.removeItem('favorites');
            navigate('/login');
          }}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
