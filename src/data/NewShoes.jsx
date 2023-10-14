import NB550 from '../assets/NewShoes/NB550.webp';
import AJ4 from '../assets/NewShoes/AJ4.webp';
import Ultraboost from '../assets/NewShoes/Ultraboost.webp';
import AirMax90 from '../assets/NewShoes/AirMax90.webp';
import LowlandCC from '../assets/NewShoes/LowlandCC.webp';
import ChuckTaylorAllStar from '../assets/NewShoes/ChuckTaylorAllStar.webp';
import GenerateUniqueID from './GenerateUniqueID';

let NewShoes = [
  {
    id: GenerateUniqueID(),
    brand: 'Nike',
    name: 'AJ 4 Dior',
    price: 130.0,
    description:
      'The Nike AJ 4 is a classic sneaker known for its iconic design and high-flying style.',
    image: AJ4,
    tag: true,
    color: 'White/Gray',
  },
  {
    id: GenerateUniqueID(),
    brand: 'Adidas',
    name: 'Ultra Boost',
    price: 160.0,
    description:
      'The Adidas Ultra Boost offers unmatched energy return and a sleek, modern look.',
    image: Ultraboost,
    tag: true,
    color: 'Black/White',
  },
  {
    id: GenerateUniqueID(),
    brand: 'Vans',
    name: 'Lowland CC',
    price: 165.0,
    description:
      'The Vans Lowland CC is a classic skate shoe with a timeless design.',
    image: LowlandCC,
    tag: true,
    color: 'Blue/White',
  },
  {
    id: GenerateUniqueID(),
    brand: 'New Balance',
    name: '550',
    price: 175.0,
    description:
      'The New Balance 550 is a premium shoe known for its comfort and stability.',
    image: NB550,
    tag: true,
    color: 'Black/Red',
  },
  {
    id: GenerateUniqueID(),
    brand: 'Converse',
    name: 'Chuck Taylor All Star',
    price: 150.0,
    description:
      'The Converse Chuck Taylor All Star is an iconic and versatile canvas sneaker.',
    image: ChuckTaylorAllStar,
    tag: true,
    color: 'Red/White',
  },
  {
    id: GenerateUniqueID(),
    brand: 'Nike',
    name: 'Air Max 90',
    price: 200.0,
    description:
      'The Nike Air Max 90 is a classic sneaker known for its comfort and iconic design.',
    image: AirMax90,
    tag: true,
    color: 'Black/Gray',
  },
];

export default NewShoes;
