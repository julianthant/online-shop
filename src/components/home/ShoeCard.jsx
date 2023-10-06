import { Link } from 'react-router-dom';
import shoeImage from '../../assets/NB550.jpg';

export default function ShoeCard() {
  return (
    <Link
      to="/shoe-details"
      className="w-[23.5rem] bg-white overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="relative">
        <div className="bg-gray-200">
          <img
            className="w-full h-auto px-4 pt-16 pb-10"
            src={shoeImage}
            alt="New Balance 550"
          />
        </div>
        <div className="absolute top-0 right-0 px-4 py-2 bg-emerald-900 text-white font-bold rounded-bl-lg">
          New
        </div>
      </div>
      <div className="p-4 font-[Poppins]">
        <h3 className="text-gray-900 text-xl font-semibold mb-2">
          New Balance 550
        </h3>
        <p className="text-gray-700 text-lg">$99.90</p>
        <p className="text-gray-600 mt-2">
          The New Balance 550 is a classic sneaker with a timeless design.
          It&apos;s perfect for both casual and athletic wear, offering comfort
          and style in one package.
        </p>
      </div>
    </Link>
  );
}
