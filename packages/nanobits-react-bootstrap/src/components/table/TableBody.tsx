import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Colors, colorPropType } from '../Types'

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
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
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, color, ...rest }, ref) => {
    const _className = classNames(
      {
        [`table-${color}`]: color,
      },
      className,
    )

    return (
      <tbody className={_className ? _className : undefined} {...rest} ref={ref}>
        {children}
      </tbody>
    )
  },
)

TableBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
}

TableBody.displayName = 'TableBody'
