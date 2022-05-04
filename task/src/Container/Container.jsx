import React from 'react';
import ButtonLink from '../ButtonLink';
import './Container.css';

const Container = ({ children, title, backTo, backToText, backToIcon }) => {
  return (
    <div className="container">
      {backTo && (
        <ButtonLink icon={backToIcon} className="navlink" to={backTo}>
          {backToText}
        </ButtonLink>
      )}

      <div className="inner-container">
        <h1 className="form-title">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default Container;
