import background from '../../../assets/shoe-footer.webp';
import { useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';

export default function ShoeBanner() {
  const navigate = useNavigate();
  const imageButton =
    'tracking-widest bg-slate-50 text-sm w-full text-black py-4 max-s:py-3 transition-300 hover:text-slate-50 font-[Inter] hover:bg-matte-black';

  const bannerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div id="shoe-banner" className="pb-10 pt-16 relative">
      <div
        style={bannerStyle}
        className="lg:h-[42rem] max-lg:h-[25rem] flex justify-center items-center"
      >
        <div className="absolute text-slate-50 text-center grid px-7">
          <h1 className="text-7xl max-lg:text-6xl max-md:text-5xl max-s:text-4xl font-medium font-[Poppins] leading-normal">
            Find your perfect sneakers
          </h1>
          <p className="pt-5 pb-8 text-lg font-[Poppins] max-lg:text-base max-s:text-sm">
            We got brands from all over the world. It&apos;s a matter of whether
            you can find one that suits you.
          </p>
          <div className="flex justify-center gap-5 max-s:flex-col items-center">
            <button
              onClick={() =>
                scroller.scrollTo('best-sellers', {
                  duration: 500,
                  smooth: true,
                })
              }
              className={`s:w-[11.5rem] ${imageButton}`}
            >
              SHOP FEATURED
            </button>
            <button
              onClick={() => navigate('/collections')}
              className={`s:w-[13.5rem] ${imageButton}`}
            >
              SHOP COLLECTIONS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
