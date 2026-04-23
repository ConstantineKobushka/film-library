import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.menu}>
      <NavLink
        className={({ isActive }) =>
          clsx(styles.navLink, isActive && styles.active)
        }
        to="/"
      >
        Головна
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          clsx(styles.navLink, isActive && styles.active)
        }
        to="/movies"
      >
        Фільми
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          clsx(styles.navLink, isActive && styles.active)
        }
        to="/serials"
      >
        Серіали
      </NavLink>
    </nav>
  );
};

export default Navigation;
