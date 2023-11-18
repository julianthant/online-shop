import SocialIcons from '../../data/SocialIcons';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import PropTypes from 'prop-types';

export default function Footer({ sections, type }) {
  const linkClass =
    'hover:text-emerald-600 transition-300 max-s:text-center cursor-pointer';

  return (
    <footer className="pt-20 font-[Inter]">
      <div className="container lg:flex lg:justify-between max-lg:grid max-lg:grid-cols-2 max-lg:gap-y-16 max-lg:gap-x-44 max-s:grid-cols-1 max-s:place-items-center">
        <div className="grid gap-10 max-w-[18rem] s:pr-5 max-s:items-center">
          <h1 className="tracking-[0.15em] text-2xl text-slate-50 font-bold max-s:text-center">
            SOLESTEALS
          </h1>
          <p className="text-light-gray text-[1.07rem] leading-loose max-s:text-center">
            Thanks for visiting solesteals! Our store has almost every shoe that
            exists in this world along with excellent customer service. Feel
            free to naviage to any part of our store to search for sneakers.
          </p>
          <SocialIcons />
        </div>
        <div className="flex flex-col gap-10 max-s:items-center">
          <h2 className="text-2xl text-slate-50 font-medium max-s:text-center">
            Shop
          </h2>
          <nav
            className="grid text-light-gray gap-2 font-light text-lg"
            aria-label="footer-navigation"
          >
            <Link to={'/collections?gender=men'} className={linkClass}>
              Shop Men
            </Link>
            <Link to={'/collections?gender=women'} className={linkClass}>
              Shop Women
            </Link>
            <Link to={'/collections?gender=unisex'} className={linkClass}>
              Shop Unisex
            </Link>
          </nav>
        </div>
        {type === 'homepage' && (
          <div className="flex flex-col gap-10 max-s:items-center">
            <h2 className="text-2xl text-slate-50 font-medium max-s:text-center">
              Homepage
            </h2>
            <nav
              className="grid text-light-gray gap-2 font-light text-lg"
              aria-label="footer-navigation"
            >
              {sections.map((section) => (
                <ScrollLink
                  key={section.id}
                  to={section.id}
                  smooth={true}
                  duration={section.duration}
                  className={linkClass}
                >
                  {section.label}
                </ScrollLink>
              ))}
            </nav>
          </div>
        )}
        {type === 'others' && (
          <div className="flex flex-col gap-10 max-s:items-center">
            <h2 className="text-2xl text-slate-50 font-medium max-s:text-center">
              Navigation
            </h2>
            <nav
              className="grid text-light-gray gap-2 font-light text-lg"
              aria-label="footer-navigation"
            >
              {sections.map((section) => (
                <Link key={section.id} to={section.id} className={linkClass}>
                  {section.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
        <div className="flex flex-col gap-10 max-s:items-center">
          <h2 className="text-2xl text-slate-50 font-medium max-s:text-center">
            Need Help?
          </h2>
          <nav
            className="grid text-[#909090] gap-2 font-light text-lg"
            aria-label="footer-navigation"
          >
            <Link to={'/faq'} className={linkClass}>
              FAQs
            </Link>
            <Link to={'/faq?question=returns'} className={linkClass}>
              Shipping & Returns
            </Link>
            <Link to={'/faq?question=size_chart'} className={linkClass}>
              Size Chart
            </Link>
            <Link to={'/contacts'} className={linkClass}>
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
      <div className="bg-[#2525254e] h-16 mt-14 flex items-center justify-center">
        <h3 className="text-slate-50 text-sm tracking-wider font-light">
          Solesteals © 2023. All Rights Reserved.
        </h3>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      duration: PropTypes.number,
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
};
