import { FiPlus, FiMinus, FiCheck } from "react-icons/fi";

const CartItem = ({
  image,
  title,
  price,
  badge,
  shipping,
  extra,
}) => {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-xl shadow-sm">
      {/* Image */}
      <div className="w-28 shrink-0">
        <img src={image} alt={title} className="rounded-lg" />
        {badge && (
          <span className="inline-block mt-2 text-xs bg-black text-white px-2 py-1 rounded">
            {badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-red-500 font-bold mt-2">${price}</p>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-3">
          <button className="border rounded p-1">
            <FiMinus />
          </button>
          <span>1</span>
          <button className="border rounded p-1">
            <FiPlus />
          </button>
        </div>

        {/* Meta */}
        <div className="flex gap-3 items-center mt-3 text-sm">
          {shipping && (
            <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
              {shipping}
            </span>
          )}
          {extra && (
            <span className="text-red-500 bg-red-50 px-2 py-1 rounded">
              {extra}
            </span>
          )}
          <span className="flex items-center gap-1 text-green-600">
            <FiCheck /> In stock
          </span>
        </div>
      </div>

      {/* Color dots */}
      <div className="flex gap-2">
        <span className="w-4 h-4 bg-gray-200 rounded-full" />
        <span className="w-4 h-4 bg-pink-200 rounded-full" />
      </div>
    </div>
  );
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <CartItem
            image="https://via.placeholder.com/150"
            title="SROK Smart Phone 128GB, OLED Retina"
            price="579.00"
            shipping="FREE SHIPPING"
          />

          <CartItem
            image="https://via.placeholder.com/150"
            title="aPod Pro Tablet 2023 LTE + Wifi, 12.9 Inch, 512GB"
            price="979.00"
            badge="NEW"
            shipping="$2.98 SHIPPING"
          />

          <CartItem
            image="https://via.placeholder.com/150"
            title="Samsung Galaxy X6 Ultra LTE 4G/128GB"
            price="659.00"
            badge="NEW"
            shipping="FREE SHIPPING"
            extra="FREE GIFT"
          />
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl border-2 border-green-500 h-fit">
          <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Sub Total:</span>
              <span className="font-semibold">$1,000.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping estimate:</span>
              <span className="font-semibold">$600.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax estimate:</span>
              <span className="font-semibold">$137.00</span>
            </div>
          </div>

          <div className="border-t my-4" />

          <div className="flex justify-between font-bold">
            <span>ORDER TOTAL:</span>
            <span>$1,737.00</span>
          </div>

          <button className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
