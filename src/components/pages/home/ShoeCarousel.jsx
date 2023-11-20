import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import ResponsiveImages from '../../../utilities/ResponsiveImages';

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
          <ResponsiveImages
            src="https://i.ibb.co/M8LJRTs/Nike-Carousel.jpg"
            alt="Nike-Carousel"
          />
        </div>
        <div className="h-[680px]">
          <ResponsiveImages
            src="https://i.ibb.co/RhzV65y/Converse-Carousel.webp"
            alt="Converse-Carousel"
          />
        </div>
        <div className="h-[680px]">
          <ResponsiveImages
            src="https://i.ibb.co/1LB8M4m/Adidas-Carousel.webp"
            alt="Adidas-Carousel"
          />
        </div>
        <div className="h-[680px]">
          <ResponsiveImages
            src="https://i.ibb.co/GR9CJgW/NBCarousel.webp"
            alt="NBCarousel"
          />
        </div>
        <div className="h-[680px]">
          <ResponsiveImages
            src="https://i.ibb.co/Gt6V0PG/Vans-Carousel.webp"
            alt="Vans-Carousel"
          />
        </div>
      </Carousel>
    </div>
  );
}
