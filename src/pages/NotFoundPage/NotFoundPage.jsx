import imgBg from '../../../public/img/not-found-page-bg.jpg';

import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.bg}>
      <img src={imgBg} alt='Page not found' />
    </div>
  );
};

export default NotFoundPage;
