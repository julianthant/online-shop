import ShoeCard from './ShoeCard';

export default function NewArrivals() {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center">
        <h2 className="font-[Poppins] text-2xl text-slate-50">New Arrivals</h2>
        <a className="underline underline-offset-[6px] decoration-emerald-600 text-slate-50 hover:decoration-slate-50 transition-300 text-md tracking-[0.2rem] cursor-pointer">
          VIEW ALL NEW ARRIVALS
        </a>
      </div>
      <div className="pt-10 flex gap-y-16 justify-between flex-wrap">
        <ShoeCard />
        <ShoeCard />
        <ShoeCard />
        <ShoeCard />
        <ShoeCard />
        <ShoeCard />
      </div>
    </div>
  );
}
