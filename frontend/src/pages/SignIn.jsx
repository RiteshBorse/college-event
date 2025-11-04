import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../utils/api';
import { saveUser } from '../utils/auth';
import toast from 'react-hot-toast';
import LoginImage from '../assets/login.jpg';

const SignIn = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Participant'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await loginUser({
          email: formData.email,
          password: formData.password
        });

        if (response.data.success) {
          saveUser(response.data.user);
          toast.success('Login successful!');
          
          // Redirect based on role
          if (response.data.user.role === 'Organiser') {
            navigate('/organiser/dashboard');
          } else {
            navigate('/participant/dashboard');
          }
        } else {
          toast.error('Invalid credentials');
        }
      } else {
        // Register
        const response = await registerUser(formData);

        if (response.data.success) {
          toast.success('Registration successful! Please login.');
          setIsLogin(true);
          setFormData({ ...formData, name: '', password: '' });
        } else {
          toast.error('Registration failed');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Image & Content */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={LoginImage}
              alt="Campus students collaborating"
              className="w-full h-[600px] object-cover transform hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
            
            {/* Overlay Content */}
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                🎓 Join Our Community
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Connect. Create. <span className="text-transparent bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text">Celebrate.</span>
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed">
                Be part of an exciting campus community where students organize, participate, and create unforgettable memories through amazing events and activities.
              </p>
              
              {/* Features List */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { icon: '🚀', text: 'Instant Access' },
                  { icon: '🔒', text: 'Secure Platform' },
                  { icon: '🎯', text: 'Personalized Events' },
                  { icon: '📱', text: 'Mobile Friendly' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-xl">{feature.icon}</span>
                    <span className="text-gray-200 text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Background Decorations */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500 rounded-full blur-xl opacity-20 z-0"></div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-500 rounded-full blur-xl opacity-20 z-0"></div>
        </div>

        {/* Right Side - Form */}
        <div className="relative">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-2xl relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-linear-to-r ${
                    isLogin ? 'from-blue-500 to-cyan-600' : 'from-purple-500 to-pink-600'
                  } flex items-center justify-center shadow-lg`}>
                    <span className="text-2xl">
                      {isLogin ? '🔐' : '👋'}
                    </span>
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-white mb-3">
                  {isLogin ? 'Welcome Back!' : 'Join Us Today'}
                </h2>
                <p className="text-gray-400 text-lg">
                  {isLogin ? 'Sign in to continue your journey' : 'Create your account and start exploring'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-500 focus:scale-[1.02] group-hover:border-gray-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-500 focus:scale-[1.02] group-hover:border-gray-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white focus:outline-none focus:border-blue-500 transition-all duration-300 placeholder-gray-500 focus:scale-[1.02] group-hover:border-gray-500"
                    placeholder="Enter your password"
                  />
                </div>

                {!isLogin && (
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      I want to...
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-900/50 border border-gray-600 rounded-2xl text-white focus:outline-none focus:border-blue-500 transition-all duration-300 focus:scale-[1.02] group-hover:border-gray-500 appearance-none cursor-pointer"
                    >
                      <option value="Participant">Participate in Events</option>
                      <option value="Organiser">Organize Events</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full px-6 py-4 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/25"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-700 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-300 group"
                >
                  {isLogin ? (
                    <>
                      Don't have an account? <span className="text-blue-400 group-hover:text-blue-300 font-semibold ml-1">Sign up now</span>
                    </>
                  ) : (
                    <>
                      Already have an account? <span className="text-blue-400 group-hover:text-blue-300 font-semibold ml-1">Sign in</span>
                    </>
                  )}
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="text-center text-gray-500 text-sm">
                  <p>By continuing, you agree to our <button className="text-blue-400 hover:text-blue-300">Terms</button> and <button className="text-blue-400 hover:text-blue-300">Privacy Policy</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;