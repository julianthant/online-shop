import FeaturedBrands from './FeaturedBrands';
import Heading from './Heading';
import NewArrivals from './NewArrivals';
import PickShoesByGender from './PickShoesByGender';

export default function Homepage() {
  return (
    <section className="bg-matte-black">
      <Heading />
      <FeaturedBrands />
      <PickShoesByGender />
      <NewArrivals />
    </section>
  );
}
