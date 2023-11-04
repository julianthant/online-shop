import Footer from '../../main/Footer';
import SneakerGrid from '../sneakers/grid/SneakerGrid';

export default function CollectionsPage() {
  return (
    <section className="bg-matte-black">
      <h1 className="text-slate-50 text-center pt-[9rem] text-6xl font-[Poppins]">
        Collections
      </h1>
      <SneakerGrid />
      <Footer />
    </section>
  );
}
