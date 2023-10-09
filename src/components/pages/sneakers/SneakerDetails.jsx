import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

import QuantityControl from './QuantityControl';

import SelectColors from './SelectColors';
import InvalidPage from './InvalidPage';
import MinorDetails from './MinorDetails';
import SizeControl from './SizeControl';

export default function SneakerDetails() {
  const { brandName, sneakerID } = useParams();
  const { getShoe } = useAuth();
  const [sneaker, setSneaker] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [items, setItems] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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

  const paddingBottomStyle =
    viewportWidth < 1024 && enabled && items > 3
      ? `${items * 1.8}rem`
      : viewportWidth > 1024 && enabled && items > 5
      ? `${items * 1.8}rem`
      : '3rem';

  return (
    <section
      className={`min-h-screen bg-matte-black font-[Montserrat] pt-[7rem]`}
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
                <MinorDetails value={sneaker} setValue={setSneaker} />
                <div className="flex flex-col gap-5 mt-3">
                  <QuantityControl value={quantity} setValue={setQuantity} />
                  <SizeControl ID={sneaker.id} sizing={sneaker.sizing} />
                  <SelectColors
                    value={sneaker}
                    setClick={setEnabled}
                    setItems={setItems}
                  />
                </div>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-md mt-4">
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
          Loading Seaker Details
          <span className="text-emerald-900 pl-[0.35rem] tracking-[0.3rem]">
            ....
          </span>
        </h1>
      )}
    </section>
  );
}
