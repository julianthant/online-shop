import Footer from '../../main/Footer';
import PickShoesByGender from '../home/PickShoesByGender';
import Brands from './Brands';

export default function CollectionsPage() {
  return (
    <section className="bg-matte-black">
      <h1 className="text-slate-50 text-center pt-[9rem] text-6xl font-[Poppins]">
        Collections
      </h1>
      <PickShoesByGender />
      <Brands />
      <Footer />
    </section>
  );
}
