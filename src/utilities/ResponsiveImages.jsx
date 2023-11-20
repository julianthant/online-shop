import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import Imgix from 'react-imgix';

const ResponsiveImage = ({ src, alt, className, height }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  // Define the sizes attribute based on screen size
  const sizes = isMobile
    ? '(max-width: 767px) 100vw'
    : isTablet
    ? '(min-width: 768px) and (max-width: 1023px) 100vw'
    : '100vw';

  // Specify widths and breakpoints for responsive images
  const widths = [320, 640, 1024, 2048]; // Add more as needed

  // Generate the srcSet attribute for responsive images
  const srcSet = widths
    .map((width) => `${src}?w=${width} ${width}w`)
    .join(', ');

  return (
    <Imgix
      src={src}
      className={className}
      sizes={sizes}
      srcSet={srcSet}
      aspectRatio="16:9"
      imgProps={{
        alt,
        loading: 'lazy',
        width: '100%',
        height: height || 'auto',
      }}
    />
  );
};

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  height: PropTypes.string,
};

export default ResponsiveImage;
