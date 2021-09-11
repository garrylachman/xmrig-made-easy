import React from 'react';
import { ImSpinner9 } from 'react-icons/im';

const Spinner = () => <ImSpinner9 className="animate-spin ease-out" />;
const FixedCenteredSpinner = () => (
  <div className="fixed w-full h-full flex place-content-around place-items-center text-8xl text-gray-900 animate-bounce ease-in">
    <Spinner />
  </div>
);

export { Spinner, FixedCenteredSpinner };
