import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function SneakerCard({ id, brand, name, image }) {
  const navigate = useNavigate();
  const cleanedName = name.replace(/\([^()]*\)/g, '');

  return (
    <div>
      <div
        className="rounded-lg bg-white overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        onClick={() => navigate(`/sneaker-grid/${brand}/${id}`)}
      >
        <div className="bg-white h-[18rem] flex items-center justify-center">
          <img src={image} alt={`${cleanedName}`} className="w-80 px-4" />
        </div>
      </div>
      <div className="py-4 font-[montserrat]">
        <h2 className="text-white text-lg font-semibold mb-2 capitalize">
          {cleanedName}
        </h2>
      </div>
    </div>
  );
}

SneakerCard.propTypes = {
  id: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
};
