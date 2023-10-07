import nike from '../../assets/nike.svg';
import adidas from '../../assets/adidas.svg';
import newBalance from '../../assets/new-balance.svg';
import converse from '../../assets/converse.svg';
import vans from '../../assets/vans.svg';

export default function FeaturedBrands() {
  return (
    <div id="featured-brands" className="container text-slate-50 pt-20 pb-12">
      <h2 className="text-3xl pb-8 text-center font-medium font-[Poppins]">
        Featured Brands
      </h2>
      <div className="flex flex-wrap gap-8 max-lg:gap-6 max-xs:gap-2 justify-around">
        <div className="w-44 max-xs:w-36 h-40 grid place-items-center">
          <img className="w-[8.5rem] max-xs:w-[7.5rem]" src={nike} alt="" />
        </div>
        <div className="w-44 max-xs:w-36 h-40 grid place-items-center">
          <img className="w-[7.5rem] max-xs:w-[6.5rem]" src={adidas} alt="" />
        </div>
        <div className="w-44 max-xs:w-36 h-40 grid place-items-center">
          <img
            className="w-[10.5rem] max-xs:w-[9rem]"
            src={newBalance}
            alt=""
          />
        </div>
        <div className="w-44 max-xs:w-36 h-40 grid place-items-center">
          <img className="w-[8.4rem] max-xs:w-[6.6rem]" src={converse} alt="" />
        </div>
        <div className="w-44 max-xs:w-36 h-40 grid place-items-center">
          <img className="w-[8.5rem] max-xs:w-[7rem]" src={vans} alt="" />
        </div>
      </div>
    </div>
  );
}
