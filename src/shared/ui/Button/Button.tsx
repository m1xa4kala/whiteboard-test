import React from 'react'

import './Button.scss'

type ButtonProps = {
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className='button' {...props}>
      {children}
    </button>
  )
}
