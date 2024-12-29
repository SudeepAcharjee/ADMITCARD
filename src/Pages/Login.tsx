import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMathProblem, setShowMathProblem] = useState(false);
  const [mathProblem, setMathProblem] = useState<string>('');
  const [mathAnswer, setMathAnswer] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<number | ''>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a new math problem
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const problem = `${num1} + ${num2}`;
    setMathProblem(problem);
    setMathAnswer(num1 + num2);
  }, [showMathProblem]);

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      return setError('Email and password are required');
    }

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setShowMathProblem(true); // Show the math problem after successful login
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  };

  const handleSubmitMathProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer === mathAnswer) {
      navigate('/admin'); // Redirect to the admin page if the answer is correct
    } else {
      setError('Incorrect answer, please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Log In</h2>
        {error && <div className="text-red-600">{error}</div>}
        {!showMathProblem ? (
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                disabled={loading}
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Log In
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitMathProblem} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Solve this math problem:</label>
              <div className="text-lg font-medium">{mathProblem}</div>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(Number(e.target.value) || '')}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
