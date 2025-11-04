import { Link } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      const role = getUserRole();
      if (role === 'Organiser') {
        navigate('/organiser/dashboard');
      } else {
        navigate('/participant/dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="bg-linear-to-br from-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative container mx-auto px-4 text-center max-w-6xl">
          <div className="flex justify-center mb-6">
            <div className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold animate-pulse">
              🎉 Join 50+ Colleges Worldwide
            </div>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Elevate Your
            <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}Campus Experience
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform college events with our all-in-one platform. Create, discover, and engage in unforgettable campus experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/signin"
              className="group relative px-10 py-5 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-blue-500/25"
            >
              <span className="relative z-10">Start Your Journey →</span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-700 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </Link>
            
            <button className="px-10 py-5 border-2 border-gray-600 hover:border-blue-400 text-white text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '10K+', label: 'Active Students' },
              { number: '500+', label: 'Events Monthly' },
              { number: '100+', label: 'College Partners' },
              { number: '98%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Everything You Need for
              <span className="bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"> Campus Events</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful tools for organizers, seamless experience for participants
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '🎯',
                title: 'For Organisers',
                description: 'Create and manage events with powerful dashboard tools, real-time analytics, and automated participant tracking.',
                features: ['Event Creation', 'Analytics Dashboard', 'Participant Management'],
                gradient: 'from-purple-500 to-pink-600'
              },
              {
                icon: '🎓',
                title: 'For Participants',
                description: 'Discover events tailored to your interests, register with one click, and get timely notifications and updates.',
                features: ['Smart Discovery', 'Easy Registration', 'Personal Calendar'],
                gradient: 'from-blue-500 to-cyan-600'
              },
              {
                icon: '⚡',
                title: 'Smart Platform',
                description: 'AI-powered recommendations, real-time collaboration, and seamless integration with campus systems.',
                features: ['AI Recommendations', 'Real-time Updates', 'Campus Integration'],
                gradient: 'from-orange-500 to-red-600'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-linear-to-br from-gray-800 to-gray-900 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className={`text-4xl mb-6 w-16 h-16 rounded-2xl bg-linear-to-r ${feature.gradient} flex items-center justify-center shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Explore Diverse
              <span className="bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Event Categories</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From technical hackathons to cultural festivals, find events that match your passion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Technical',
                icon: '💻',
                description: 'Hackathons, Workshops, Tech Talks',
                events: '200+ Events',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                name: 'Cultural',
                icon: '🎭',
                description: 'Music, Dance, Art Festivals',
                events: '150+ Events',
                color: 'from-purple-500 to-pink-500'
              },
              {
                name: 'Sports',
                icon: '⚽',
                description: 'Tournaments, Matches, Fitness',
                events: '100+ Events',
                color: 'from-green-500 to-emerald-500'
              },
              {
                name: 'Workshop',
                icon: '📚',
                description: 'Learning Sessions, Skill Development',
                events: '180+ Events',
                color: 'from-orange-500 to-red-500'
              }
            ].map((category, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${category.color} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{category.name}</h3>
                  <p className="text-gray-400 mb-4">{category.description}</p>
                  <div className="text-sm text-blue-400 font-semibold">{category.events}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-5xl font-bold text-white mb-6">
                About <span className="bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Our Mission</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                We're revolutionizing campus life by creating a unified platform that bridges the gap between event organizers and participants. Our vision is to make every college event accessible, engaging, and memorable.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Founded by students for students, we understand the challenges of campus event management and have built the perfect solution to bring your campus community closer together.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { value: 'Innovation', desc: 'Cutting-edge event technology' },
                  { value: 'Community', desc: 'Building campus connections' },
                  { value: 'Excellence', desc: 'Quality in every feature' },
                  { value: 'Growth', desc: 'Helping students thrive' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-semibold text-white">{item.value}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="px-8 py-4 border-2 border-gray-600 hover:border-blue-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                Learn More About Us
              </button>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Campus event"
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Student collaboration"
                  className="rounded-2xl shadow-2xl mt-8 transform hover:scale-105 transition duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-60"></div>
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-linear-to-r from-green-400 to-blue-500 rounded-2xl blur-xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-linear-to-br from-gray-800 to-gray-900 rounded-3xl p-12 border border-gray-700 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Campus Events?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students and organizers already using our platform to create unforgettable campus experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signin"
                className="px-12 py-5 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25"
              >
                Get Started Free
              </Link>
              
              <button className="px-12 py-5 border-2 border-gray-600 hover:border-blue-400 text-white text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105">
                Contact Sales
              </button>
            </div>
            
            <p className="text-gray-400 mt-6 text-sm">
              No credit card required • Free forever for basic features
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;