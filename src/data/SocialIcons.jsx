import FacebookIcon from '../assets/SocialsIcons/facebookIcon';
import InstagramIcon from '../assets/SocialsIcons/instagramIcon';
import TwitterIcon from '../assets/SocialsIcons/twitterIcon';
import TiktokIcon from '../assets/SocialsIcons/tiktokIcon';

export default function SocialIcons() {
  const socialIcons = 'text-black transition-colors';
  const socialLinks = [
    { id: 'instagram-link', icon: <InstagramIcon /> },
    { id: 'facebook-link', icon: <FacebookIcon /> },
    { id: 'twitter-link', icon: <TwitterIcon /> },
    { id: 'tiktok-link', icon: <TiktokIcon /> },
  ];

  return (
    <div className="flex gap-8 items-center max-s:justify-center">
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={`${socialIcons} inline-block`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
