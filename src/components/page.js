import Image from 'next/image';

import leftArrowIcon from '../images/left_arrow_icon.svg';
import leftArrow2Icon from '../images/left_arrow_icon2.svg';
import rightArrowIcon from '../images/right_arrow_icon.svg';
import rightArrow2Icon from '../images/right_arrow_icon2.svg';
import styles from '../styles/page.module.css';

const Page = () => {
  return (
    <nav className={styles.page}>
      <button className={styles.left2}>
        <Image src={leftArrow2Icon} alt='left arrow icon' />
      </button>
      <button className={styles.left}>
        <Image src={leftArrowIcon} alt='left arrow icon' />
      </button>
      <button className={styles.current}>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button className={styles.right}>
        <Image src={rightArrowIcon} alt='right arrow icon' />
      </button>
      <button className={styles.right2}>
        <Image src={rightArrow2Icon} alt='right arrow icon' />
      </button>
    </nav>
  );
};

export default Page;