export default function GenerateDescriptions(shoeName, ID) {
  const templates = [
    `${shoeName} is a premium athletic shoe designed for ultimate performance and style. With its cutting-edge technology and sleek design, it's the perfect choice for athletes and fashion enthusiasts alike.`,
    `Introducing ${shoeName} - the pinnacle of comfort and style. Crafted with precision and attention to detail, these shoes are the ultimate expression of quality and sophistication.`,
    `Step up your game with ${shoeName}. These shoes are engineered for peak performance, providing unparalleled support, cushioning, and style. Elevate your athletic performance and make a statement with every step.`,
    `Experience the future of footwear with ${shoeName}. These shoes are a fusion of innovation and fashion, delivering superior comfort, durability, and aesthetics. Elevate your shoe game today!`,
    `Elevate your style with ${shoeName}. These shoes are designed to turn heads and make a lasting impression. Whether you're on the court or on the streets, you'll stand out in these.`,
    `${shoeName} is not just a shoe; it's a statement. With its bold design and unmatched performance features, it's the perfect choice for those who demand the best.`,
    `Unleash your potential with ${shoeName}. These shoes are built for champions, providing the support and comfort you need to reach new heights in your athletic journey.`,
    `Elevate your sneaker game with ${shoeName}. Designed with style and performance in mind, these shoes are a must-have for anyone who values quality and fashion.`,
    `Make a bold statement with ${shoeName}. These shoes are designed to command attention and reflect your unique style. Step into the future of footwear.`,
    `${shoeName} represents the intersection of innovation and elegance. These shoes combine cutting-edge technology with timeless design, making them a standout choice for athletes and trendsetters.`,
  ];

  let index;
  const firstChar = ID.match(/\d|[A-Z]/);

  if (firstChar) {
    if (/^[A-Z]$/.test(firstChar)) {
      index = ((firstChar.charCodeAt(0) - 'A'.charCodeAt(0) + 10) % 10) + 1;
    } else {
      index = parseInt(firstChar, 10);
    }
  } else {
    index = 1;
  }

  index = Math.min(Math.max(index, 1), templates.length);
  return templates[index - 1];
}
