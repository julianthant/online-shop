import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import Imgix from 'react-imgix';

const ResponsiveImage = ({ src, alt, className, height }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  // Adjust these sizes based on your content and design
  const mobileSizes = [320, 480, 640];
  const tabletSizes = [768, 1024, 1280];
  const desktopSizes = [1024, 1280, 1920, 2560];

  const sizes = isMobile
    ? `(max-width: 767px) ${mobileSizes.join('px, ')}px, 100vw`
    : isTablet
    ? `(min-width: 768px) and (max-width: 1023px) ${tabletSizes.join(
        'px, '
      )}px, 100vw`
    : `${desktopSizes.join('px, ')}px, 100vw`;

  const srcSet = (
    isMobile ? mobileSizes : isTablet ? tabletSizes : desktopSizes
  )
    .map((width) => `${src}?w=${width} ${width}w`)
    .join(', ');

  return (
    <Imgix
      src={src}
      className={className}
      sizes={sizes}
      srcSet={srcSet}
      aspectRatio="16:9"
      disableQualityByDPR
      htmlAttributes={{
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
