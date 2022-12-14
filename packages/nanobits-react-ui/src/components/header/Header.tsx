import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Defines optional container wrapping children elements.
   */
  container?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid'
  /**
   * Place header in non-static positions.
   */
  position?: 'fixed' | 'sticky'
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ children, className, container, position, ...rest }, ref) => {
    const _className = classNames('header','n-custom-header-class', { [`header-${position}`]: position }, className)

    let content
    if (container) {
      content = (
        <div className={`container${container !== true ? '-' + container : ''}`}>{children}</div>
      )
    } else {
      content = children
    }

    return (
      <div className={_className} {...rest} ref={ref}>
        {content}
      </div>
    )
  },
)

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  container: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid'>([
      'sm',
      'md',
      'lg',
      'xl',
      'xxl',
      'fluid',
    ]),
  ]),
  position: PropTypes.oneOf(['fixed', 'sticky']),
}

Header.displayName = 'Header'
