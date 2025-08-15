import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Search, Menu, X, Filter } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  bestseller?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Batom 'Mentirinha Rosa'",
    price: 89.90,
    originalPrice: 120.00,
    image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    reviews: 1247,
    category: "Lábios",
    description: "Para quando você quer parecer natural, mas gastou 2 horas se arrumando",
    bestseller: true
  },
  {
    id: 2,
    name: "Base 'Photoshop Líquido'",
    price: 156.90,
    image: "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    reviews: 892,
    category: "Rosto",
    description: "Porque filtro do Instagram na vida real é possível, sim!",
    bestseller: true
  },
  {
    id: 3,
    name: "Máscara de Cílios 'Drama Queen'",
    price: 67.90,
    originalPrice: 89.90,
    image: "https://images.pexels.com/photos/2533269/pexels-photo-2533269.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    reviews: 654,
    category: "Olhos",
    description: "Para quem acha que cílio natural é coisa do passado"
  },
  {
    id: 4,
    name: "Paleta 'Cores que não Combinam'",
    price: 234.90,
    image: "https://images.pexels.com/photos/2533327/pexels-photo-2533327.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    reviews: 423,
    category: "Olhos",
    description: "Porque combinar cores é mainstream"
  },
  {
    id: 5,
    name: "Blush 'Vergonha Alheia'",
    price: 78.90,
    image: "https://images.pexels.com/photos/3785800/pexels-photo-3785800.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.5,
    reviews: 789,
    category: "Rosto",
    description: "Tom perfeito para quando você mente que acordou assim"
  },
  {
    id: 6,
    name: "Gloss 'Fake Confidence'",
    price: 45.90,
    originalPrice: 65.90,
    image: "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.4,
    reviews: 567,
    category: "Lábios",
    description: "Brilho que dá aquela autoestima emprestada"
  },
  {
    id: 7,
    name: "Primer 'Realidade Aumentada'",
    price: 123.90,
    image: "https://images.pexels.com/photos/3785804/pexels-photo-3785804.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    reviews: 345,
    category: "Rosto",
    description: "Para criar uma versão melhorada de você mesma"
  },
  {
    id: 8,
    name: "Delineador 'Linha do Tempo'",
    price: 56.90,
    image: "https://images.pexels.com/photos/2533270/pexels-photo-2533270.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.3,
    reviews: 234,
    category: "Olhos",
    description: "Porque desenhar uma linha reta é uma arte perdida"
  }
];

const categories = ["Todos", "Rosto", "Olhos", "Lábios"];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredProducts = selectedCategory === "Todos" 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Fake It Beauty
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-pink-500 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-pink-500 transition-colors">Produtos</a>
              <a href="#" className="text-gray-700 hover:text-pink-500 transition-colors">Sobre</a>
              <a href="#" className="text-gray-700 hover:text-pink-500 transition-colors">Contato</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Search className="h-5 w-5 text-gray-600 hover:text-pink-500 cursor-pointer transition-colors" />
              <Heart className="h-5 w-5 text-gray-600 hover:text-pink-500 cursor-pointer transition-colors" />
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Home</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Produtos</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Sobre</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Contato</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Fake It Till You Make It
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Produtos de beleza para quem não tem tempo para ser autêntica
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105">
              Descobrir Produtos
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold text-gray-900">Nossos Produtos</h3>
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.bestseller && (
                  <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                    Bestseller
                  </div>
                )}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-pink-500" />
                </button>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-pink-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Carrinho ({cartItemsCount})</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Seu carrinho está vazio</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-pink-600 font-semibold">R$ {item.price.toFixed(2)}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="border-t p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-pink-600">
                    R$ {cartTotal.toFixed(2)}
                  </span>
                </div>
                <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-md font-semibold transition-colors">
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Fake It Beauty
            </h3>
            <p className="text-gray-400 mb-6">
              Porque ser falsa nunca foi tão autêntico
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">TikTok</a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">YouTube</a>
            </div>
            <p className="text-gray-500 text-sm mt-8">
              © 2025 Fake It Beauty. Todos os direitos (supostamente) reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;