import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface ListGroupProps extends HTMLAttributes<HTMLDivElement | HTMLUListElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: string | ElementType
  /**
   * Remove some borders and rounded corners to render list group items edge-to-edge in a parent component (e.g., `<Card>`).
   */
  flush?: boolean
  /**
   * Specify a layout type.
   */
  layout?:
    | 'horizontal'
    | 'horizontal-sm'
    | 'horizontal-md'
    | 'horizontal-lg'
    | 'horizontal-xl'
    | 'horizontal-xxl'
}

export const ListGroup = forwardRef<HTMLDivElement | HTMLUListElement, ListGroupProps>(
  ({ children, className, component: Component = 'ul', flush, layout }, ref) => {
    const _className = classNames(
      'list-group',
      'n-custom-list-group-class',
      {
        'list-group-flush': flush,
        [`list-group-${layout}`]: layout,
      },
      className,
    )

    return (
      <Component className={_className} ref={ref}>
        {children}
      </Component>
    )
  },
)

ListGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.elementType,
  flush: PropTypes.bool,
  layout: PropTypes.oneOf([
    'horizontal',
    'horizontal-sm',
    'horizontal-md',
    'horizontal-lg',
    'horizontal-xl',
    'horizontal-xxl',
  ]),
}

ListGroup.displayName = 'ListGroup'
