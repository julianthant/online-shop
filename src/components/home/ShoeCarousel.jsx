import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import NikeCarousel from '../../assets/Carousel/NikeCarousel.jpg';
import ConverseCarousel from '../../assets/Carousel/ConverseCarousel.jpg';
import AdidasCarousel from '../../assets/Carousel/AdidasCarousel.jpg';
import NBCarousel from '../../assets/Carousel/NBCarousel.jpg';
import VansCarousel from '../../assets/Carousel/VansCarousel.jpg';

export default function ShoeCarousel() {
  return (
    <div className="pb-10 md:px-16">
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
          <img loading="eager" src={NikeCarousel} alt="Nike" />
        </div>
        <div className="h-[680px]">
          <img loading="lazy" src={ConverseCarousel} alt="Converse" />
        </div>
        <div className="h-[680px]">
          <img loading="lazy" src={AdidasCarousel} alt="Adidas" />
        </div>
        <div className="h-[680px]">
          <img loading="lazy" src={NBCarousel} alt="New Balance" />
        </div>
        <div className="h-[680px]">
          <img loading="lazy" src={VansCarousel} alt="Vans" />
        </div>
      </Carousel>
    </div>
  );
}
