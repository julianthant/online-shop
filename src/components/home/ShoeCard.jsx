import shoeImage from '../../assets/NB550.jpg';

export default function ShoeCard() {
  return (
    <div>
      <div className="w-[23.5rem] pb-4 bg-slate-50">
        <div className="pt-16 py-4 bg-[#c2bebe69]">
          <img className="px-6 max-w-full max-h-full" src={shoeImage} alt="" />
        </div>
        <div className="font-[Inter] pt-4 flex flex-col items-center gap-3">
          <h3 className="text-slate-950 text-center font-semibold text-lg">
            New Balance 550
          </h3>
          <p className="text-slate-950 text-center font-semibold text-lg">
            $99.90
          </p>
        </div>
      </div>
    </div>
  );
}
