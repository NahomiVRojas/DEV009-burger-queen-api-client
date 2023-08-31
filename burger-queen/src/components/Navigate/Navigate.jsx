import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from '../Navigate/Navigate.module.css';

export default function Navigate({ path, children }) {
    return (
        <Link to={path} className={style.link}>
            {children}
        </Link>
    );
}

Navigate.propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
