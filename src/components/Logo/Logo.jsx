import { Link } from 'react-router-dom';

import logo from '/logo/logo.svg';

import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Link to="/">
      <img className={styles.img} src={logo} alt="Logo" loading="lazy" />
    </Link>
  );
};

export default Logo;
