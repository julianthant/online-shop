import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import NikeCarousel from '../../../assets/Carousel/NikeCarousel.jpg';
import ConverseCarousel from '../../../assets/Carousel/ConverseCarousel.webp';
import AdidasCarousel from '../../../assets/Carousel/AdidasCarousel.webp';
import NBCarousel from '../../../assets/Carousel/NBCarousel.webp';
import VansCarousel from '../../../assets/Carousel/VansCarousel.webp';

export default function ShoeCarousel() {
  return (
    <div id="shoe-display" className="pb-10 md:px-16">
      <Carousel
        autoPlay
        infiniteLoop
        dynamicHeight
        showThumbs={false}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title="Previous"
              className="custom-arrow prev-arrow"
            >
              &lt;
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title="Next"
              className="custom-arrow next-arrow"
            >
              &gt;
            </button>
          )
        }
      >
        <div className="h-[680px]">
          <img rel="preload" src={NikeCarousel} alt="Nike" />
        </div>
        <div className="h-[680px]">
          <img rel="preload" src={ConverseCarousel} alt="Converse" />
        </div>
        <div className="h-[680px]">
          <img rel="preload" src={AdidasCarousel} alt="Adidas" />
        </div>
        <div className="h-[680px]">
          <img rel="preload" src={NBCarousel} alt="New Balance" />
        </div>
        <div className="h-[680px]">
          <img rel="preload" src={VansCarousel} alt="Vans" />
        </div>
      </Carousel>
    </div>
  );
}
