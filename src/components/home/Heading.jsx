import background from '../../assets/homepage_background.webp';

export default function Heading() {
  return (
    <div className="pt-[4.07rem]">
      <div className="h-[30rem] flex items-center bg-gradient-to-r from-teal-600 to-emerald-800">
        <div className="flex container items-center">
          <div className="text-slate-50 grid gap-6 pr-12 max-lg:pr-0">
            <h1 className="text-5xl font-bold leading-[4rem]">
              Find Your Perfect Shoe
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
              quae distinctio eveniet impedit delectus? Enim vel cumque autem
              cupiditate temporibus libero sunt, iste saepe, explicabo quibusdam
              soluta voluptate quos rerum!
            </p>
            <button className="hover:shadow-2xl shadow-md bg-emerald-700 w-36 text-slate-50 py-2 rounded-md border-2 border-emerald-700 hover:border-emerald-900 transition-300 hover:bg-emerald-900">
              Shop Now
            </button>
          </div>
          <img
            src={background}
            loading="eager"
            className="h-[26rem] max-xl:h-[24rem] max-lg:h-[20rem] ml-auto max-lg:hidden"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
