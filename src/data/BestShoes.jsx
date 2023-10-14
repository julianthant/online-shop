import NB990v3 from '../assets/TopSneakers/NB990V3.webp';
import AJ1 from '../assets/TopSneakers/AJ1.webp';
import Chuck70VintageCanvas from '../assets/TopSneakers/Chuck70VintageCanvas.webp';
import VansAuthentic from '../assets/TopSneakers/VansAuthentic.webp';
import AdidasEQTCSG91 from '../assets/TopSneakers/EQT-CSG-91.webp';
import NB5740 from '../assets/TopSneakers/NB5740.webp';
import GenerateUniqueID from './GenerateUniqueID';

let BestShoes = [
  {
    id: GenerateUniqueID(),
    brand: 'New Balance',
    name: '990v3',
    price: 200.0,
    description:
      'The New Balance 990v3 is a classic and comfortable running shoe.',
    image: NB990v3,
    color: 'Grey',
  },
  {
    id: GenerateUniqueID(),
    brand: 'Nike',
    name: 'Air Jordan 1',
    price: 150.0,
    description:
      'The Nike Air Jordan 1 is an iconic and timeless basketball shoe.',
    image: AJ1,
    color: 'Red/Black',
  },
  {
    id: GenerateUniqueID(),
    brand: 'Converse',
    name: 'Chuck 70 Vintage Canvas',
    price: 130.0,
    description:
      'The Converse Chuck 70 Vintage Canvas offers a retro look and feel.',
    image: Chuck70VintageCanvas,
    color: 'Blue',
  },
  {
    id: GenerateUniqueID(),
    brand: 'Vans',
    name: 'Authentic',
    price: 60.0,
    description:
      'The Vans Authentic is a classic and versatile canvas sneaker.',
    image: VansAuthentic,
    color: 'Black/White',
  },
  {
    id: GenerateUniqueID(),
    brand: 'Adidas',
    name: 'EQT-CSG-91',
    price: 170.0,
    description: 'The Adidas EQT-CSG-91 combines style and performance.',
    image: AdidasEQTCSG91,
    color: 'Green/White',
  },
  {
    id: GenerateUniqueID(),
    brand: 'New Balance',
    name: '5740',
    price: 140.0,
    description:
      'The New Balance 5740 offers comfort and style for everyday wear.',
    image: NB5740,
    color: 'Navy/Grey',
  },
];

export default BestShoes;
