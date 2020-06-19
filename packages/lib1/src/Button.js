import React from 'react';

const Button = () => (
  <button
    onClick={() => {
      console.log('pressed');
    }}
  >
    Button from Lib1
  </button>
);

export default Button;
