import SocialIcons from '../../data/SocialIcons';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

export default function Footer() {
  const sections = [
    { id: 'heading', label: 'Heading', duration: 1000 },
    { id: 'featured-brands', label: 'Featured Brands', duration: 900 },
    { id: 'shoe-display', label: 'Shoes Display', duration: 800 },
    { id: 'new-arrivals', label: 'New Arrivals', duration: 700 },
    { id: 'best-sellers', label: 'Best Sellers', duration: 600 },
    { id: 'shoe-banner', label: 'Shoe Banner', duration: 500 },
  ];

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
            <Link className={linkClass}>Shop Men</Link>
            <Link className={linkClass}>Shop Women</Link>
            <Link className={linkClass}>Featured</Link>
            <Link className={linkClass}>Collections</Link>
            <Link className={linkClass}>Search</Link>
          </nav>
        </div>
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
        <div className="flex flex-col gap-10 max-s:items-center">
          <h2 className="text-2xl text-slate-50 font-medium max-s:text-center">
            Need Help?
          </h2>
          <nav
            className="grid text-[#909090] gap-2 font-light text-lg"
            aria-label="footer-navigation"
          >
            <Link className={linkClass}>FAQs</Link>
            <Link className={linkClass}>Shipping & Returns</Link>
            <Link className={linkClass}>Shoe Care</Link>
            <Link className={linkClass}>Size Chart</Link>
            <Link className={linkClass}>Contact Us</Link>
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
