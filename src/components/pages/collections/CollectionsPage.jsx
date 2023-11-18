import Footer from '../../main/Footer';
import SneakerGrid from '../sneakers/grid/SneakerGrid';

export default function CollectionsPage() {
  const collection_sections = [
    { id: '/', label: 'Homepage' },
    { id: '/collections', label: 'Collections' },
    { id: '/cart', label: 'Cart' },
    { id: '/dashboard', label: 'Profile' },
    { id: '/dashboard?mode=Order', label: 'Orders' },
  ];

  return (
    <section className="bg-matte-black">
      <h1 className="text-slate-50 text-center pt-[9rem] text-6xl font-[Poppins]">
        Collections
      </h1>
      <SneakerGrid />
      <Footer sections={collection_sections} type="others" />
    </section>
  );
}
