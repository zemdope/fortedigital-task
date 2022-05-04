import React from 'react';
import './Button.css';

const handleClick = (event) => {
  const button = event.currentTarget;
  const pos = button.getBoundingClientRect();

  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (pos.left + radius)}px`;
  circle.style.top = `${event.clientY - (pos.top + radius)}px`;
  circle.classList.add('ripple');

  const ripple = button.getElementsByClassName('ripple')[0];
  ripple && ripple.remove();

  button.appendChild(circle);
};

const Button = (props) => {
  return <button {...props} onClick={handleClick} />;
};

export default Button;
