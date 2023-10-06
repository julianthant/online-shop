import menShoes from '../../assets/men-shoes.jpg';
import womenShoes from '../../assets/women-shoes.jpg';

export default function PickShoesByGender() {
  const imageContainer =
    'w-1/2 md:w-[48%] h-[38rem] max-s:h-60 max-s:w-full crop-image-container relative';
  const imageClass = 'w-full h-full object-cover object-bottom';
  const imageButton =
    'tracking-widest bg-transparent text-sm text-white py-4 border-2 transition-300 hover:text-slate-950 font-[Inter] hover:bg-white';

  return (
    <div className="pb-16 md:px-16 pt-20">
      <div className="flex justify-between flex-wrap">
        <div className={imageContainer}>
          <img className={imageClass} src={menShoes} alt="" />
          <div className="absolute inset-0 flex flex-col gap-8 justify-center items-center">
            <p className="text-white font-[Poppins] text-[2.5rem] font-medium tracking-wider">
              Men
            </p>
            <button className={`${imageButton} w-[9.5rem]`}>SHOP MEN</button>
          </div>
        </div>
        <div className={imageContainer}>
          <img className={imageClass} src={womenShoes} alt="" />
          <div className="absolute inset-0 flex flex-col gap-8 justify-center items-center">
            <p className="text-white font-[Poppins] text-[2.5rem] font-medium tracking-wider">
              Women
            </p>
            <button className={`${imageButton} w-[11.5rem]`}>SHOP WOMEN</button>
          </div>
        </div>
      </div>
    </div>
  );
}
