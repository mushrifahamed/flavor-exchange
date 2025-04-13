import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      navigate('/');
    }
  }, [navigate]);

  const handleSignup = (e) => {
    e.preventDefault();
    const userCredentials = { username, password };
    localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
    localStorage.setItem('username', username);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-lg">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
