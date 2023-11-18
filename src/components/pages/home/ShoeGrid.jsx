import { Link } from 'react-router-dom';
import ShoeCard from './ShoeCard';
import PropTypes from 'prop-types';

export default function ShoeGrid({ Heading, Subheading, Data, ID }) {
  return (
    <div id={ID} className="container py-8">
      <div className="flex justify-between items-center">
        <h2 className="font-[Poppins] text-2xl text-slate-50">{Heading}</h2>
        <Link
          to={'/collections'}
          className="underline underline-offset-[6px] max-s:hidden decoration-emerald-600 text-slate-50 hover:decoration-slate-50 transition-300 text-md tracking-[0.2rem] cursor-pointer"
        >
          {Subheading}
        </Link>
        <a className="underline underline-offset-[6px] s:hidden decoration-emerald-600 text-slate-50 hover:decoration-slate-50 transition-300 text-md tracking-[0.2rem] cursor-pointer">
          VIEW ALL
        </a>
      </div>
      <div className="pt-10 shoe-grid">
        {Data.map((shoe, index) => (
          <ShoeCard
            key={index}
            id={shoe.id}
            brand={shoe.brandName}
            name={shoe.name}
            price={shoe.initialPrice}
            colors={shoe.colorway}
            description={shoe.description}
            size={shoe.sizes}
            image={shoe.image}
            tag={shoe.tag}
          />
        ))}
      </div>
    </div>
  );
}

ShoeGrid.propTypes = {
  Heading: PropTypes.string.isRequired,
  Subheading: PropTypes.string.isRequired,
  Data: PropTypes.arrayOf(
    PropTypes.shape({
      brandName: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      initialPrice: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      tag: PropTypes.bool,
    })
  ).isRequired,
  ID: PropTypes.string.isRequired,
};
