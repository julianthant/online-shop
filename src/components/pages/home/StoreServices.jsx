import DeliveryTruck from '../../../assets/delivery-truck.svg';
import RefreshArrows from '../../../assets/refresh-arrows.svg';
import Lock from '../../../assets/lock-icon.svg';

export default function StoreServices() {
  const iconsContainer =
    'flex justify-center items-center h-14 sm:h-32 sm:px-3';
  const icons =
    'max-sm:pl-[0.7rem] max-sm:w-[2.3rem] w-[2rem] max-lg:w-[1.8rem] max-md:w-[1.6rem]';
  const iconsLabel =
    'text-slate-50 max-lg:text-base max-md:text-sm font-medium text-lg whitespace-nowrap font-[Inter]';
  const verticalLine = 'sm:border-r sm:border-gray-300 sm:h-12 sm:mx-2';
  const centerFlex = 'flex flex-1 justify-center';

  return (
    <div className="bg-[#1B1B1B] mt-6 max-sm:py-4 container flex max-sm:flex-col items-center px-0">
      <div className={centerFlex}>
        <div className={iconsContainer}>
          <img
            className="w-[2.9rem] max-lg:w-[2.6rem] max-md:[w-[2.3rem]"
            loading="lazy"
            src={Lock}
            alt=""
          />
          <p className={`pl-1 ${iconsLabel}`}>Secure Payment</p>
        </div>
      </div>
      <div className={verticalLine}></div>
      <div className={centerFlex}>
        <div className={iconsContainer}>
          <img className={icons} loading="lazy" src={DeliveryTruck} alt="" />
          <p className={`pl-4 ${iconsLabel}`}>Express Shipping</p>
        </div>
      </div>
      <div className={verticalLine}></div>
      <div className={centerFlex}>
        <div className={iconsContainer}>
          <img className={icons} loading="lazy" src={RefreshArrows} alt="" />
          <p className={`pl-4 ${iconsLabel}`}>Free Returns</p>
        </div>
      </div>
    </div>
  );
}
