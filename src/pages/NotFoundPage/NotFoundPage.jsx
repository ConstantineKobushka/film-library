import imgBg from '/not-found-page/not-found-page-bg.jpg';
import imgBg2x from '/not-found-page/not-found-page-bg@2x.jpg';

import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.bg}>
      <picture>
        <source
          media="(max-width: 1440px)"
          srcSet={`${imgBg} 1x, ${imgBg2x} 2x`}
          type="image/jpg"
        />
        <img src={imgBg} alt="Page not found" loading="lazy" />
      </picture>
    </div>
  );
};

export default NotFoundPage;
