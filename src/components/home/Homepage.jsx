import FeaturedBrands from './FeaturedBrands';
import Heading from './Heading';
import ShoeGrid from './ShoeGrid';
import PickShoesByGender from './PickShoesByGender';
import ShoeCarousel from './ShoeCarousel';

import NewShoes from '../../data/NewShoes';
import BestShoes from '../../data/BestShoes';
import ShoeBanner from './ShoeBanner';
import StoreServices from './StoreServices';
import Footer from '../main/Footer';

export default function Homepage() {
  return (
    <section className="bg-matte-black">
      <Heading />
      <FeaturedBrands />
      <ShoeCarousel />
      <ShoeGrid
        Heading="Latest Arrivals"
        Subheading="VIEW ALL NEW ARRIVALS"
        Data={NewShoes}
        ID="new-arrivals"
      />
      <PickShoesByGender />
      <ShoeGrid
        Heading="Best Sellers"
        Subheading="VIEW ALL BEST SELLERS"
        Data={BestShoes}
        ID="best-sellers"
      />
      <ShoeBanner />
      <StoreServices />
      <Footer />
    </section>
  );
}
