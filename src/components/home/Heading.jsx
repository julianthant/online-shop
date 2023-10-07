import background from '../../assets/homepage_background.webp';

export default function Heading() {
  return (
    <div id="heading" className="pt-[4.07rem]">
      <div className="h-[30rem] flex items-center bg-gradient-to-r from-teal-600 to-emerald-800">
        <div className="flex container items-center">
          <div className="text-slate-50 grid gap-6 pr-12 max-lg:pr-0">
            <h1 className="text-5xl font-bold leading-[4rem]">
              Find Your Perfect Shoe
            </h1>
            <p className="leading-loose">
              Welcome to Solesteals. In our store we provide an endless variety
              of shoes for you to pick out and purchase. If you have feet, we
              got you your sneaks. Have fun shopping!
            </p>
            <button className="hover:shadow-2xl shadow-md bg-emerald-700 w-36 text-slate-50 py-2 rounded-md border-2 border-emerald-700 hover:border-emerald-900 transition-300 hover:bg-emerald-900">
              Shop Now
            </button>
          </div>
          <img
            src={background}
            rel="preload"
            className="h-[26rem] max-xl:h-[24rem] max-lg:h-[20rem] ml-auto max-lg:hidden"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
