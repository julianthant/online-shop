import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import Imgix from 'react-imgix';

const ResponsiveImage = ({ src, alt, className }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  return (
    <Imgix
      src={src}
      className={className}
      sizes={
        isMobile
          ? '(max-width: 767px) 100vw'
          : isTablet
          ? '(min-width: 768px) and (max-width: 1023px) 100vw'
          : '100vw'
      }
      imgProps={{ alt }}
    />
  );
};

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ResponsiveImage;
