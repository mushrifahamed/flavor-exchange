import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RecipeCard from '../components/RecipeCard'; 

function Home() {
  const [search, setSearch] = useState('');
  const { user, addToFavorites, fetchRecipes } = useContext(AppContext);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); 
    }

    const getRecipes = async () => {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
    };

    getRecipes();
  }, [user, fetchRecipes, navigate]);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">

      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Flavor Exchange</h1>

        <div>
          {user ? (
            <div className="flex items-center">
              <span className="mr-4">Hello, {user}!</span>
              <Link to="/profile" className="mr-4">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="rounded-full"
                />
              </Link>
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
          ) : (
            <div>
              <Link
                to="/login"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-4"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Banner Section */}
      <section className="bg-primary text-primary-foreground text-center p-12 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">Welcome to Flavor Exchange</h2>
        <p className="text-lg mb-4">Share, explore, and discover new recipes. Join our community of food lovers!</p>
        {user && (
          <Link
            to="/create-recipe"
            className="inline-block px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-primary"
          >
            Share Your Recipe
          </Link>
        )}
      </section>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-md"
          placeholder="Search recipes by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Recipe Feed Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id}>
            <RecipeCard recipe={recipe} />
            {user && (
              <button
                onClick={() => addToFavorites(recipe)}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add to Favorites
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;