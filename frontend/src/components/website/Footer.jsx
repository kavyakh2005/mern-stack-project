import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About / Logo */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-500 mb-3">ShopLogo</h2>
          <p className="text-gray-400">
            Your one-stop shop for amazing products. Quality guaranteed and fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-indigo-500">Home</a></li>
            <li><a href="#" className="hover:text-indigo-500">Shop</a></li>
            <li><a href="#" className="hover:text-indigo-500">About</a></li>
            <li><a href="#" className="hover:text-indigo-500">Contact</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-indigo-500">FAQ</a></li>
            <li><a href="#" className="hover:text-indigo-500">Shipping</a></li>
            <li><a href="#" className="hover:text-indigo-500">Returns</a></li>
            <li><a href="#" className="hover:text-indigo-500">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
          <p className="text-gray-400 mb-3">Subscribe to get our latest offers.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
            <button className="bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600 text-white">
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-indigo-500"><FaFacebook className="h-6 w-6"/></a>
            <a href="#" className="hover:text-indigo-500"><FaTwitter className="h-6 w-6"/></a>
            <a href="#" className="hover:text-indigo-500"><FaInstagram className="h-6 w-6"/></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 text-gray-400 text-center py-4">
        &copy; {new Date().getFullYear()} ShopLogo. All rights reserved.
      </div>
    </footer>
  );
}
