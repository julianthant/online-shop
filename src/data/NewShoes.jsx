import NB550 from '../assets/NewShoes/NB550.webp';
import AJ4 from '../assets/NewShoes/AJ4.webp';
import Ultraboost from '../assets/NewShoes/Ultraboost.webp';
import AirMax90 from '../assets/NewShoes/AirMax90.webp';
import LowlandCC from '../assets/NewShoes/LowlandCC.webp';
import ChuckTaylorAllStar from '../assets/NewShoes/ChuckTaylorAllStar.webp';

let NewShoes = [
  {
    id: '92AB',
    brandName: 'Jordan',
    name: 'AJ 4 Dior',
    initialPrice: 130.0,
    sizing: 'Unisex',
    description:
      'The Nike AJ 4 is a classic sneaker known for its iconic design and high-flying style.',
    image: AJ4,
    tag: true,
    sizes: [8, 9, 10, 11, 12],
    colorway: 'White/Gray',
  },
  {
    id: '63AB',
    brandName: 'Adidas',
    name: 'Ultra Boost',
    initialPrice: 160.0,
    sizing: 'Unisex',
    description:
      'The Adidas Ultra Boost offers unmatched energy return and a sleek, modern look.',
    image: Ultraboost,
    tag: true,
    sizes: [6, 7, 8, 9],
    colorway: 'Black/White',
  },
  {
    id: '54AB',
    brandName: 'Vans',
    name: 'Lowland CC',
    initialPrice: 165.0,
    sizing: 'Unisex',
    description:
      'The Vans Lowland CC is a classic skate shoe with a timeless design.',
    image: LowlandCC,
    tag: true,
    sizes: [6, 7, 8, 9],
    colorway: 'Blue/White',
  },
  {
    id: '85AB',
    brandName: 'New balance',
    name: '550',
    initialPrice: 175.0,
    sizing: 'Unisex',
    description:
      'The New Balance 550 is a premium shoe known for its comfort and stability.',
    image: NB550,
    tag: true,
    sizes: [7, 8, 9, 10],
    colorway: 'Black/Red',
  },
  {
    id: '69AB',
    brandName: 'Converse',
    name: 'Chuck Taylor All Star',
    initialPrice: 150.0,
    sizing: 'Unisex',
    description:
      'The Converse Chuck Taylor All Star is an iconic and versatile canvas sneaker.',
    image: ChuckTaylorAllStar,
    tag: true,
    sizes: [6, 7, 8, 9],
    colorway: 'Red/White',
  },
  {
    id: '88AB',
    brandName: 'Nike',
    name: 'Air Max 90',
    initialPrice: 200.0,
    sizing: 'Unisex',
    description:
      'The Nike Air Max 90 is a classic sneaker known for its comfort and iconic design.',
    image: AirMax90,
    tag: true,
    sizes: [6, 7, 8, 9, 10],
    colorway: 'Black/Gray',
  },
];

export default NewShoes;
