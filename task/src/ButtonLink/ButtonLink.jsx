import React from 'react';
import { NavLink } from 'react-router-dom';
import './ButtonLink.css';

const ButtonLink = ({ space, icon, className, children, ...props }) => {
  return (
    <NavLink {...props} className={className + ' button-link'}>
      <img src={icon} alt="" style={{ marginRight: space ?? 12 }} />
      {children}
    </NavLink>
  );
};

export default ButtonLink;
