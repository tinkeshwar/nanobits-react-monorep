import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Colors, colorPropType } from '../Types'

export interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Sets the color context of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  color?: Colors
  /**
   * Sets if the color of text should be colored for a light or dark dark background.
   */
  colorScheme?: 'dark' | 'light'
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: string | ElementType
  /**
   * Defines optional container wrapping children elements.
   */
  container?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid'
  /**
   * Defines the responsive breakpoint to determine when content collapses.
   */
  expand?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * Place component in non-static positions.
   */
  placement?: 'fixed-top' | 'fixed-bottom' | 'sticky-top'
}

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
  (
    {
      children,
      className,
      color,
      colorScheme,
      component: Component = 'nav',
      container,
      expand,
      placement,
      ...rest
    },
    ref,
  ) => {
    const _className = classNames(
      'navbar',
      'n-custom-navbar-class',
      {
        [`bg-${color}`]: color,
        [`navbar-${colorScheme}`]: colorScheme,
        [typeof expand === 'boolean' ? 'navbar-expand' : `navbar-expand-${expand}`]: expand,
      },
      placement,
      className,
    )

    let content
    if (container) {
      content = (
        <div className={`container${container !== true ? '-' + container : ''}`}>{children}</div>
      )
    } else {
      content = children
    }

    return (
      <Component className={_className} {...rest} ref={ref}>
        {content}
      </Component>
    )
  },
)

Navbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
  colorScheme: PropTypes.oneOf(['dark', 'light']),
  component: PropTypes.elementType,
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
  expand: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(['sm', 'md', 'lg', 'xl', 'xxl']),
  ]),
  placement: PropTypes.oneOf(['fixed-top', 'fixed-bottom', 'sticky-top']),
}

Navbar.displayName = 'Navbar'
