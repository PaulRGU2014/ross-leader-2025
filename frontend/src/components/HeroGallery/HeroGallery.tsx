import styles from './HeroGallery.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import Image from '@/utils/ImageLoader/ImageLoader';
import Link from '@/utils/LinkWrapper/LinkWrapper';
import RichTextUtil from './../../utils/RichText/RichText'

interface HeroGalleryProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function HeroGallery({content}: HeroGalleryProps) {
  return(
    <InViewAnim><div className={styles.component}>
      <div className={styles.images}>
        <div className={styles.images_top}>
        {content.images.slice(0, Math.ceil(content.images.length / 2)).map((image: any, index: number) => (
          <Image
            key={`first-half-${index}`}
            className={styles.image}
            src={image?.asset?._ref}
            alt={image?.alt}
            objectFit="cover"
            objectPosition="center"
            priority={true}
          />
        ))}
        </div>
        <div className={styles.images_bottom}>
        {content.images.slice(Math.ceil(content.images.length / 2)).map((image: any, index: number) => (
          <Image
            key={`second-half-${index}`}
            className={styles.image}
            src={image?.asset?._ref}
            alt={image?.alt}
            objectFit="cover"
            objectPosition="center"
          />
        ))}
        </div>
      </div>
      <div className={styles.wrapper}>
        <RichTextUtil  html={content.body} className={styles.richtext}/>
      </div>
    </div></InViewAnim>
  );
}