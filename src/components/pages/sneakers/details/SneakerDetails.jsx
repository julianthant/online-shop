import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';
import QuantityControl from './QuantityControl';
import SelectColors from './SelectColors';
import InvalidPage from './InvalidPage';
import MinorDetails from './MinorDetails';
import SizeControl from './SizeControl';
import GeneratePrice from '../grid/GeneratePrice';

export default function SneakerDetails() {
  const { brandName, sneakerID } = useParams();
  const { getShoe, currentUser, addCart, setQuantity, quantity } = useAuth();
  const [sneaker, setSneaker] = useState(null);
  const [value, setValue] = useState(1);
  const [error, setError] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [items, setItems] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    getShoe(brandName, sneakerID, setSneaker, setError);
  }, [brandName, getShoe, sneakerID]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function addToCart(name, price, image, colors) {
    if (currentUser) {
      const cleanedName = name.replace(/\([^()]*\)/g, '');
      addCart(
        sneakerID,
        cleanedName,
        brandName,
        price ? price : GeneratePrice(sneakerID),
        image,
        colors,
        value
      );
      setQuantity(quantity + 1);
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
          <div className="bg-white shadow-md container rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className=" flex justify-center items-center border-[2rem] border-gray-100">
                <img
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
                <div className="flex flex-col gap-5 mt-3">
                  <QuantityControl value={value} setValue={setValue} />
                  <SizeControl ID={sneaker.id} sizing={sneaker.sizing} />
                  <SelectColors
                    value={sneaker}
                    setClick={setEnabled}
                    setItems={setItems}
                  />
                </div>
                <button
                  onClick={() =>
                    addToCart(
                      sneaker.name,
                      sneaker.price,
                      sneaker.image,
                      sneaker.colorway
                    )
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded-md mt-4"
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
