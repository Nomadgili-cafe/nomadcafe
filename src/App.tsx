import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Coffee, Menu as MenuIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Our Mission', id: 'mission' },
    { name: 'Menu', id: 'menu' },
  ];

  const HomePage = () => {
    // Gallery carousel state
    const galleryImages = [
      '/images/gallery/image1.jpg',
      '/images/gallery/image2.jpg',
      '/images/gallery/image3.jpg',
      '/images/gallery/image4.jpg',
    ];
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const goToNextImage = () => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    };

    const goToPrevImage = () => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
      );
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (touchStartX === null) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const swipeThreshold = 50;
      const swipeDistance = touchStartX - touchEndX;
      
      if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
          goToNextImage();
        } else {
          goToPrevImage();
        }
      }
      
      setTouchStartX(null);
    };

    return (
      <div className="min-h-screen font-clarendon">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/layout/Cafe.jpg)',
              filter: 'brightness(0.7)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-driftwood-900/40 to-sand-900/60" />
          
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <img 
              src="/images/layout/Logo.png" 
              alt="Nomad Cafe Logo" 
              className="w-32 h-32 mx-auto mb-8 rounded-full shadow-2xl border-4 border-sand-200/30"
            />
            <h1 className="text-6xl md:text-8xl font-clarendon font-black mb-6 text-shadow-lg">
              Nomad Cafe
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-clarendon font-normal leading-relaxed">
              Your tropical escape in the heart of Gili Islands
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('menu')}
                className="bg-sand-500 hover:bg-sand-600 text-white px-8 py-4 rounded-full text-lg font-clarendon font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View Menu
              </button>
              <button 
                onClick={() => setCurrentPage('mission')}
                className="border-2 border-white text-white hover:bg-white hover:text-driftwood-900 px-8 py-4 rounded-full text-lg font-clarendon font-bold transition-all duration-300 transform hover:scale-105"
              >
                Our Story
              </button>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-sand-400 rounded-full animate-pulse opacity-70" />
          <div className="absolute top-40 right-20 w-6 h-6 bg-driftwood-300 rounded-full animate-pulse opacity-60" />
          <div className="absolute bottom-32 left-20 w-3 h-3 bg-sand-500 rounded-full animate-pulse opacity-80" />
        </section>

        {/* Info Section */}
        <section className="py-20 bg-gradient-to-br from-sand-50 to-driftwood-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-sand-200">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-8 h-8 text-driftwood-600 mr-4" />
                    <h3 className="text-2xl font-clarendon font-bold text-driftwood-800">Location</h3>
                  </div>
                  <div className="mb-4">
                    <img 
                      src="/images/layout/Location.png" 
                      alt="Nomad Cafe Location Map" 
                      className="w-full h-48 object-cover rounded-lg shadow-md mb-3"
                    />
                  </div>
                  <p className="text-driftwood-700 text-lg leading-relaxed font-clarendon">
                    J2VJ+6CV Gili Indah, North-Lombok,<br />
                    West-Nusa Tenggara, Indonesia
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-sand-200">
                  <div className="flex items-center mb-4">
                    <Clock className="w-8 h-8 text-sand-600 mr-4" />
                    <h3 className="text-2xl font-clarendon font-bold text-driftwood-800">Opening Hours</h3>
                  </div>
                  <div className="space-y-2 text-driftwood-700 text-lg font-clarendon">
                    <div className="flex justify-between">
                      <span>Monday - Sunday</span>
                      <span className="font-semibold">7:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kitchen closes</span>
                      <span className="font-semibold">9:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div 
                  className="relative w-full h-96 rounded-2xl shadow-2xl bg-driftwood-100 overflow-hidden"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <img 
                    src={galleryImages[currentImageIndex]} 
                    alt={`Gallery image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  <button
                    onClick={goToPrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={goToNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-clarendon">
                    {currentImageIndex + 1} / {galleryImages.length}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-driftwood-900/40 to-transparent rounded-2xl pointer-events-none" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="text-2xl font-clarendon font-bold mb-2">Our Gallery</h4>
                    <p className="text-sand-100 font-clarendon">Moments from Nomad Cafe • Swipe or click to explore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-clarendon font-bold text-center mb-16 text-driftwood-800">
              Why Choose Nomad Cafe?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-sand-50 to-driftwood-50 border border-sand-200">
                <Coffee className="w-16 h-16 text-driftwood-600 mx-auto mb-6" />
                <h3 className="text-2xl font-clarendon font-bold mb-4 text-driftwood-800">Premium Coffee</h3>
                <p className="text-driftwood-700 leading-relaxed font-clarendon">
                  Freshly roasted beans from Indonesian highlands, expertly brewed to perfection
                </p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-sand-100 to-sand-50 border border-sand-300">
                <Users className="w-16 h-16 text-sand-600 mx-auto mb-6" />
                <h3 className="text-2xl font-clarendon font-bold mb-4 text-driftwood-800">Island Community</h3>
                <p className="text-driftwood-700 leading-relaxed font-clarendon">
                  A welcoming space where travelers and locals connect over great food and drinks
                </p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-driftwood-50 to-ocean-50 border border-ocean-200">
                <MapPin className="w-16 h-16 text-ocean-600 mx-auto mb-6" />
                <h3 className="text-2xl font-clarendon font-bold mb-4 text-driftwood-800">Perfect Location</h3>
                <p className="text-driftwood-700 leading-relaxed font-clarendon">
                  Steps away from pristine beaches with stunning sunset views every evening
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const MissionPage = () => (
    <div className="min-h-screen py-20 font-clarendon bg-gradient-to-br from-sand-50 to-driftwood-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-clarendon font-bold mb-6 text-driftwood-800">Our Mission</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-driftwood-500 to-sand-500 mx-auto mb-8" />
        </div>
        
        <div className="space-y-12">
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-sand-200">
            <h2 className="text-3xl font-clarendon font-bold mb-6 text-driftwood-800">Creating Island Connections</h2>
            <p className="text-lg text-driftwood-700 leading-relaxed mb-6 font-clarendon">
              At Nomad Cafe, we believe that the best travel experiences happen when cultures connect over shared meals and conversations. Nestled in the heart of Gili Trawangan, we've created more than just a cafe – we've built a bridge between the wandering spirit of travelers and the warm hospitality of Indonesian island culture.
            </p>
            <p className="text-lg text-driftwood-700 leading-relaxed font-clarendon">
              Our mission is to provide a sanctuary where digital nomads, backpackers, and locals can come together to share stories, work remotely, and experience the authentic flavors of Indonesia while enjoying world-class coffee and cuisine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-sand-50 to-driftwood-50 p-8 rounded-2xl border border-sand-200">
              <h3 className="text-2xl font-clarendon font-bold mb-4 text-driftwood-800">Sustainable Practices</h3>
              <p className="text-driftwood-700 leading-relaxed font-clarendon">
                We're committed to protecting the pristine beauty of the Gili Islands. From sourcing local ingredients to using eco-friendly packaging, every decision we make considers our environmental impact on this tropical paradise.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-sand-100 to-sand-50 p-8 rounded-2xl border border-sand-300">
              <h3 className="text-2xl font-clarendon font-bold mb-4 text-sand-800">Community First</h3>
              <p className="text-driftwood-700 leading-relaxed font-clarendon">
                We partner with local farmers and suppliers, ensuring that our success contributes to the prosperity of the Gili Islands community. Every cup of coffee and every meal supports local families and traditions.
              </p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-xl border border-sand-200">
            <h2 className="text-3xl font-clarendon font-bold mb-6 text-driftwood-800">The Nomad Experience</h2>
            <p className="text-lg text-driftwood-700 leading-relaxed mb-6 font-clarendon">
              Whether you're starting your day with a sunrise coffee, working on your laptop with ocean views, or winding down with friends over dinner, Nomad Cafe is designed to enhance every moment of your island adventure.
            </p>
            <p className="text-lg text-driftwood-700 leading-relaxed font-clarendon">
              We understand the nomadic lifestyle because we live it too. That's why we've created spaces that cater to both productivity and relaxation, with reliable WiFi, comfortable seating, and an atmosphere that inspires creativity and connection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const MenuPage = () => (
    <div className="min-h-screen py-20 font-clarendon bg-gradient-to-br from-sand-50 to-driftwood-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-clarendon font-bold mb-6 text-driftwood-800">Our Menu</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-driftwood-500 to-sand-500 mx-auto mb-8" />
          <p className="text-xl text-driftwood-700 font-clarendon">Taste the flavors of Indonesia with international favorites</p>
        </div>

        {/* Coffee Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-sand-200">
          <h2 className="text-3xl font-clarendon font-bold text-driftwood-800 mb-6 text-center">Coffee</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-clarendon font-semibold text-sand-700 mb-4">Hot</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Espresso</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Double Espresso</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 45.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Americano</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Cappuccino</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Macchiato</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Flat White</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Matcha</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Latte</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-clarendon font-semibold text-sand-700 mb-4">Cold</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Ice Americano</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Ice Cappuccino</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 60.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Ice Macchiato</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 60.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Ice Matcha</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 60.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Ice Latte</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 60.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Intense Coffee Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-sand-200">
          <h2 className="text-3xl font-clarendon font-bold text-driftwood-800 mb-6 text-center">Intense Coffee</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-clarendon font-semibold text-sand-700 mb-4">Hot</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Espresso</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 65.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Double Espresso</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 65.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Americano</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 65.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Cappuccino</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 65.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Macchiato</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 65.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Flat White</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 65.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Matcha</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 65.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Latte</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 65.000</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-clarendon font-semibold text-sand-700 mb-4">Cold</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Ice Americano</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 70.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Ice Cappuccino</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 70.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Ice Macchiato</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 70.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Ice Matcha</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 70.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Ice Latte</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 70.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tea Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-clarendon font-bold text-driftwood-800 mb-6 text-center">Tea</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-clarendon font-semibold text-sand-700 mb-4">Hot</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Black Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 30.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Green Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Matcha Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Jasmine Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Earl Grey Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">English Breakfast Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Moroccan Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 60.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Lemon Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 30.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Lemongrass Ginger Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-clarendon font-semibold text-sand-700 mb-4">Cold</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Black Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Green Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Matcha Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Jasmine Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Earl Grey Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">English Breakfast Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Moroccan Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 70.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Lemon Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-driftwood-700 font-clarendon">Lemongrass Ginger Tea</span>
                  <span className="font-clarendon font-semibold text-driftwood-600">Rp. 60.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Juice and Other Beverages */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-clarendon font-bold text-driftwood-800 mb-6 text-center">Juice</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Fresh Orange</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Watermelon</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Fresh Pineapple</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Sweet Mango</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Strawberry Delight</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Dragon Fruit</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 40.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Banana Smoothie</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Mango Smoothie</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Strawberry Smoothie</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Blueberry Smoothie</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Dragonfruit Smoothie</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 50.000</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-clarendon font-bold text-driftwood-800 mb-6 text-center">Other</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Coca Cola</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 25.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Coke Zero</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 30.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Mineral Water</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 15.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Fresh Coconut</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 35.000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Smoothie Bowl Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-clarendon font-bold text-driftwood-800 mb-6 text-center">Smoothie Bowl</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-clarendon font-semibold text-driftwood-800">Tropical Bliss Mango Bowl</h3>
                  <p className="text-sm font-clarendon text-driftwood-600">(Mango, Banana and Soy Milk)</p>
                </div>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 90.000</span>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-clarendon font-semibold text-driftwood-800">Berry Boost Strawberry Bowl</h3>
                  <p className="text-sm font-clarendon text-driftwood-600">(Strawberry, Banana and Soy Milk)</p>
                </div>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 80.000</span>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-clarendon font-semibold text-driftwood-800">Blueberry Madness Bowl</h3>
                  <p className="text-sm font-clarendon text-driftwood-600">(Blueberry, Banana and Soy Milk)</p>
                </div>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 85.000</span>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-clarendon font-semibold text-driftwood-800">Acai Bowl</h3>
                  <p className="text-sm font-clarendon text-driftwood-600">(Mango, Banana and Soy Milk)</p>
                </div>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 100.000</span>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-clarendon font-semibold text-driftwood-800">Green Goddess</h3>
                  <p className="text-sm font-clarendon text-driftwood-600">(Spinach, Avocado, Banana and Soy Milk)</p>
                </div>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 100.000</span>
              </div>
            </div>
            <div className="bg-sand-50 p-4 rounded-lg border border-sand-200">
              <p className="text-sm font-clarendon text-sand-800">
                <strong>Add topping:</strong> Sunflower seeds, Banana slice, Almond, Granola or Pumpkin Seeds - <span className="font-clarendon font-semibold">Rp. 15.000</span>
              </p>
            </div>
          </div>
        </div>

        {/* Desserts and Pastries */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-clarendon font-bold text-driftwood-800 mb-6 text-center">Cheesecakes</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Strawberry Cheesecake</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 55.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Blueberry Cheesecake</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 55.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Chocolate Cheesecake</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 55.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Matcha Cheesecake</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 55.000</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-clarendon font-bold text-driftwood-800 mb-6 text-center">Croissant</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Plain Croissant</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 30.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Chocolate Croissant</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 35.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Pistachio Croissant</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 35.000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breakfast Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-clarendon font-bold text-driftwood-800 mb-6 text-center">Breakfast</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Banana Pancake</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 60.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Strawberry Pancake</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 60.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Blueberry Pancake</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 60.000</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Scrambled Egg</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 30.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Omelette</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 35.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-driftwood-700 font-clarendon">Fruit Platter</span>
                <span className="font-clarendon font-semibold text-driftwood-600">Rp. 55.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  const renderPage = () => {
    switch (currentPage) {
      case 'mission':
        return <MissionPage />;
      case 'menu':
        return <MenuPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-amber-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-4 hover:opacity-80 transition-opacity duration-300"
              >
                <img 
                  src="/images/layout/Logo.png" 
                  alt="Nomad Cafe Logo" 
                  className="w-12 h-12 rounded-full shadow-md"
                />
                <span className="text-2xl font-clarendon font-bold text-driftwood-800">Nomad Cafe</span>
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-4 py-2 rounded-full font-clarendon font-semibold transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-driftwood-600 text-white shadow-lg'
                      : 'text-driftwood-700 hover:text-driftwood-600 hover:bg-sand-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-driftwood-700 hover:bg-sand-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-sand-200">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-clarendon font-semibold transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-driftwood-600 text-white'
                      : 'text-driftwood-700 hover:bg-sand-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-driftwood-900 to-sand-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src="/images/layout/Logo.png" 
                  alt="Nomad Cafe Logo" 
                  className="w-12 h-12 rounded-full"
                />
                <span className="text-2xl font-clarendon font-bold">Nomad Cafe</span>
              </div>
              <p className="text-sand-100 leading-relaxed font-clarendon">
                Your tropical escape in the heart of Gili Islands, where great coffee meets island paradise.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-clarendon font-bold mb-4">Location</h4>
              <p className="text-sand-100 leading-relaxed font-clarendon">
                J2VJ+6CV Gili Indah, North-Lombok,<br />
                West-Nusa Tenggara, Indonesia
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-clarendon font-bold mb-4">Hours</h4>
              <p className="text-sand-100 leading-relaxed font-clarendon">
                Monday - Sunday<br />
                7:00 AM - 10:00 PM<br />
                Kitchen closes at 9:30 PM
              </p>
            </div>
          </div>
          
          <div className="border-t border-sand-700 mt-8 pt-8 text-center">
            <p className="text-sand-200 font-clarendon">
              © 2025 Nomad Cafe. Made with ❤️ in the Gili Islands.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
