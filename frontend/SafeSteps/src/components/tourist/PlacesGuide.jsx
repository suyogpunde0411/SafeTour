import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Shield, Navigation, Phone, Camera, Heart, Filter, Search, Users } from 'lucide-react';

const PlacesGuide = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const categories = [
    { id: 'all', label: 'All Places', icon: MapPin, color: 'bg-gray-500' },
    { id: 'attractions', label: 'Attractions', icon: Camera, color: 'bg-purple-500' },
    { id: 'restaurants', label: 'Restaurants', icon: Heart, color: 'bg-red-500' },
    { id: 'shopping', label: 'Shopping', icon: Users, color: 'bg-blue-500' },
    { id: 'hotels', label: 'Hotels', icon: Shield, color: 'bg-green-500' },
    { id: 'transport', label: 'Transport', icon: Navigation, color: 'bg-yellow-500' },
    { id: 'emergency', label: 'Emergency', icon: Phone, color: 'bg-red-600' }
  ];

  // Mock places data
  const mockPlaces = [
    {
      id: 1,
      name: 'Central Museum',
      category: 'attractions',
      rating: 4.5,
      distance: '0.8 km',
      safetyRating: 'High',
      description: 'Historic museum with local artifacts and cultural exhibits.',
      address: '123 Museum Street, Downtown',
      phone: '+1-555-MUSEUM',
      hours: '9:00 AM - 6:00 PM',
      price: '$12 entry',
      image: 'museum.jpg',
      features: ['Wheelchair Accessible', 'Audio Guide', 'Gift Shop'],
      safetyNotes: 'Well-lit area with security guards. Tourist police nearby.'
    },
    {
      id: 2,
      name: 'Golden Gate Restaurant',
      category: 'restaurants',
      rating: 4.7,
      distance: '0.3 km',
      safetyRating: 'High',
      description: 'Authentic local cuisine with tourist-friendly menu.',
      address: '456 Food Avenue, Central District',
      phone: '+1-555-FOOD',
      hours: '11:00 AM - 10:00 PM',
      price: '$$$ (25-40 per person)',
      image: 'restaurant.jpg',
      features: ['English Menu', 'Credit Cards', 'WiFi'],
      safetyNotes: 'Popular with tourists, well-maintained area.'
    },
    {
      id: 3,
      name: 'SafeStay Hotel',
      category: 'hotels',
      rating: 4.3,
      distance: '1.2 km',
      safetyRating: 'High',
      description: 'Tourist-friendly hotel with 24/7 security.',
      address: '789 Hotel Row, Tourist Zone',
      phone: '+1-555-HOTEL',
      hours: '24/7 Reception',
      price: '$89/night',
      image: 'hotel.jpg',
      features: ['24/7 Security', 'English Staff', 'Tourist Info'],
      safetyNotes: 'Secure building with keycard access and CCTV.'
    },
    {
      id: 4,
      name: 'Tourist Police Station',
      category: 'emergency',
      rating: 5.0,
      distance: '0.5 km',
      safetyRating: 'Maximum',
      description: 'Dedicated tourist police for visitor assistance.',
      address: '321 Safety Boulevard',
      phone: '+1-800-TOURIST',
      hours: '24/7',
      price: 'Free service',
      image: 'police.jpg',
      features: ['Multilingual Staff', 'Emergency Response', 'Lost & Found'],
      safetyNotes: 'Primary emergency contact for tourists.'
    },
    {
      id: 5,
      name: 'Central Market',
      category: 'shopping',
      rating: 4.2,
      distance: '0.6 km',
      safetyRating: 'Medium',
      description: 'Traditional market with local crafts and souvenirs.',
      address: '654 Market Street',
      phone: '+1-555-MARKET',
      hours: '8:00 AM - 8:00 PM',
      price: 'Varies',
      image: 'market.jpg',
      features: ['Bargaining Expected', 'Cash Only', 'Local Crafts'],
      safetyNotes: 'Busy area - watch for pickpockets. Stay in main aisles.'
    },
    {
      id: 6,
      name: 'Metro Station Hub',
      category: 'transport',
      rating: 4.0,
      distance: '0.4 km',
      safetyRating: 'High',
      description: 'Main transportation hub with multiple transit options.',
      address: 'Transport Plaza, City Center',
      phone: '+1-555-METRO',
      hours: '5:00 AM - 12:00 AM',
      price: '$2-5 per trip',
      image: 'metro.jpg',
      features: ['Tourist Cards', 'English Signs', 'Information Desk'],
      safetyNotes: 'Well-patrolled area with emergency buttons.'
    }
  ];

  useEffect(() => {
    setPlaces(mockPlaces);
    setFilteredPlaces(mockPlaces);
  }, []);

  useEffect(() => {
    let filtered = places;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(place =>
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPlaces(filtered);
  }, [selectedCategory, searchQuery, places]);

  const toggleFavorite = (placeId) => {
    setFavorites(prev =>
      prev.includes(placeId)
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  const getSafetyColor = (rating) => {
    switch (rating) {
      case 'Maximum': return 'bg-green-600 text-white';
      case 'High': return 'bg-green-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      case 'Low': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStarRating = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getCategoryData = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl mb-6 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <MapPin className="w-8 h-8 text-teal-600 mr-3" />
                Tourist Places Guide
              </h1>
              <p className="text-gray-600">Discover safe and verified locations for tourists</p>
            </div>
            <div className="mt-4 md:mt-0 bg-teal-100 px-4 py-2 rounded-full">
              <span className="text-teal-800 font-semibold">{filteredPlaces.length} Places Found</span>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-3xl shadow-xl mb-6 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition ${
                      selectedCategory === category.id
                        ? `${category.color} text-white`
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => {
            const categoryData = getCategoryData(place.category);
            const IconComponent = categoryData.icon;
            
            return (
              <div
                key={place.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedPlace(place)}
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-cyan-200 to-teal-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryData.color} text-white`}>
                      {categoryData.label}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(place.id);
                      }}
                      className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(place.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSafetyColor(place.safetyRating)}`}>
                      {place.safetyRating} Safety
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{place.name}</h3>
                    <div className="flex items-center space-x-1">
                      {getStarRating(place.rating)}
                      <span className="text-sm text-gray-600 ml-1">({place.rating})</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{place.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Navigation className="w-4 h-4 mr-2" />
                      <span>{place.distance} away</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{place.hours}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-semibold">{place.price}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {place.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {place.features.length > 2 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                        +{place.features.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl font-semibold transition flex items-center justify-center space-x-2">
                      <Navigation className="w-4 h-4" />
                      <span>Directions</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `tel:${place.phone}`;
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition"
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredPlaces.length === 0 && (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No places found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Place Details Modal */}
        {selectedPlace && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedPlace.name}</h2>
                  <button
                    onClick={() => setSelectedPlace(null)}
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
                  >
                    <span className="text-xl">&times;</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {getStarRating(selectedPlace.rating)}
                      <span className="text-sm text-gray-600">({selectedPlace.rating})</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSafetyColor(selectedPlace.safetyRating)}`}>
                      {selectedPlace.safetyRating} Safety
                    </span>
                  </div>

                  <p className="text-gray-600">{selectedPlace.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{selectedPlace.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{selectedPlace.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{selectedPlace.hours}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedPlace.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Safety Information
                    </h4>
                    <p className="text-yellow-700 text-sm">{selectedPlace.safetyNotes}</p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center space-x-2">
                      <Navigation className="w-5 h-5" />
                      <span>Get Directions</span>
                    </button>
                    <button
                      onClick={() => window.location.href = `tel:${selectedPlace.phone}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center space-x-2"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Call</span>
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedPlace.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(selectedPlace.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesGuide;