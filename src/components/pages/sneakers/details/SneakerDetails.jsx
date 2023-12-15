import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import { showStatus } from '../../../../utilities/ShowStatus';
import { useQuantity } from '../../../../hooks/useQuantity';
import { getShoe } from '../../../../utilities/ShoeDisplay';
import { addCart } from '../../../../utilities/CartFunctions';

import QuantityControl from './QuantityControl';
import SelectColors from './SelectColors';
import InvalidPage from './InvalidPage';
import MinorDetails from './MinorDetails';
import SizeControl from './SizeControl';
import GeneratePrice from '../grid/GeneratePrice';
import BestShoes from '../../../../data/BestShoes';
import NewShoes from '../../../../data/NewShoes';
import ResponsiveImage from '../../../../utilities/ResponsiveImages';

export default function SneakerDetails() {
  const [sneaker, setSneaker] = useState(null);

  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [invalid, setInvalid] = useState('');
  const [success, setSuccess] = useState('');

  const [value, setValue] = useState(1);
  const [items, setItems] = useState(0);

  const [error, setError] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const { brandName, sneakerID } = useParams();
  const { currentUser } = useAuth();
  const { setQuantity, quantity } = useQuantity();
  const navigate = useNavigate();

  useEffect(() => {
    const matchingSneaker = [...BestShoes, ...NewShoes].find(
      (sneaker) => sneaker.id === sneakerID
    );

    if (matchingSneaker) {
      // If there's a match, set the sneaker state to the matching sneaker
      setSneaker(matchingSneaker);
      setError(false); // Reset the error state
    } else {
      // If there's no match, fetch the sneaker details as before
      getShoe(brandName, sneakerID, setSneaker, setError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandName, sneakerID]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function addToCart(name, price, image) {
    if (currentUser) {
      if (size && color) {
        const cleanedName = name.replace(/\([^()]*\)/g, '');
        addCart(
          sneakerID,
          cleanedName,
          brandName,
          price ? price : GeneratePrice(sneakerID),
          image,
          value,
          size,
          color,
          currentUser
        );
        setQuantity(quantity + 1);
        showStatus('Item has been added to cart.', setSuccess);
        navigate('/collections');
      } else {
        showStatus(
          'You need to select both the size and color to add to cart.',
          setInvalid
        );
      }
    } else {
      navigate(
        '/login?Message=Please%20login%20to%20add%20items%20into%20cart'
      );
    }
  }

  const paddingBottomStyle =
    viewportWidth < 1024 && enabled && items > 3
      ? `${items * 1.8}rem`
      : viewportWidth > 1024 && enabled && items > 4
      ? `${items * 1.8}rem`
      : '3rem';

  return (
    <section
      className={`min-h-screen bg-matte-black font-[Montserrat] pt-[7rem] xl:pt-[8rem]`}
      style={{
        paddingBottom: paddingBottomStyle,
      }}
    >
      {sneaker ? (
        <div className="container">
          <div className="bg-white shadow-md container  p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className=" flex justify-center items-center lg:border-r-[1px] border-gray-200 p-6">
                <ResponsiveImage
                  src={sneaker.image}
                  alt={sneaker.name}
                  className="mx-auto p-5 max-lg:h-[65%] max-[1023.2px]:h-[100%]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <MinorDetails
                  value={sneaker}
                  setValue={setSneaker}
                  ID={sneakerID}
                />
                <div className="flex flex-col gap-5 mt-3 mb-4">
                  <QuantityControl value={value} setValue={setValue} />
                  <SizeControl sizes={sneaker.sizes} setSize={setSize} />
                  <SelectColors
                    value={sneaker}
                    setClick={setEnabled}
                    setItems={setItems}
                    setColor={setColor}
                  />
                </div>
                {invalid && (
                  <p className="text-red-700 text-md mb-3">{invalid}</p>
                )}
                {success && (
                  <p className="text-green-700 text-md mb-3">{success}</p>
                )}
                <button
                  onClick={() => s}
                  className="bg-gray-800 text-white px-4 py-2 rounded-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <InvalidPage />
      ) : (
        <h1 className="text-slate-50 text-4xl font-bold font-[Montserrat] py-3 text-center">
          Loading Sneaker Details
          <span className="text-emerald-900 pl-[0.35rem] tracking-[0.3rem]">
            ....
          </span>
        </h1>
      )}
    </section>
  );
}
