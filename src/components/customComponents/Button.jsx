import React from 'react';
import Loader from '../Loader';

export default function Button(props) {
  const { type = 'submit', variant = 'contained', className, children, isLoading, checkAuthLoading, ...rest } = props;

  const variantClasses = {
    text: 'bg-transparent text-gray-600',
    outlined: 'border border-gray-400 text-gray-600',
    contained: 'bg-blue-500 text-white',
    default: 'bg-gray-500 text-white',
  };

  const buttonClassNames = `
    px-3 py-2 text-sm font-medium text-center rounded-lg whitespace-nowrap ${
      isLoading ? 'opacity-50 cursor-not-allowed' : ''
    } ${className} ${variantClasses[variant] || ''}`;

  return (
    <button type={type} className={buttonClassNames} disabled={isLoading || checkAuthLoading} {...rest}>
      {isLoading ? (
        <div className='flex items-center justify-center'>
          <Loader color='white' height='20' isLoading={isLoading} />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
