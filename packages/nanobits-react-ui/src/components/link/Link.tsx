import React, { AllHTMLAttributes, ElementType, forwardRef, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface LinkProps extends AllHTMLAttributes<HTMLElement> {
  /**
   * Toggle the active state for the component.
   */
  active?: boolean
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: string | ElementType
  /**
   * Toggle the disabled state for the component.
   */
  disabled?: boolean
  /**
   * The href attribute specifies the URL of the page the link goes to.
   */
  href?: string
}

export const Link = forwardRef<HTMLButtonElement | HTMLAnchorElement, LinkProps>(
  ({ children, active, className, component: Component = 'a', disabled, ...rest }, ref) => {
    // TODO: remove duplicated classes ex. `active active` in `<ListGroupItem>`
    const _className = classNames(className,'n-custom-link-class', { active, disabled })

    return (
      <Component
        className={_className}
        {...(active && { 'aria-current': 'page' })}
        {...(Component === 'a' && disabled && { 'aria-disabled': true, tabIndex: -1 })}
        {...((Component === 'a' || Component === 'button') && {
          onClick: (event: MouseEvent<HTMLElement>) => {
            event.preventDefault
            !disabled && rest.onClick && rest.onClick(event)
          },
        })}
        disabled={disabled}
        {...rest}
        ref={ref}
      >
        {children}
      </Component>
    )
  },
)

Link.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.elementType,
  disabled: PropTypes.bool,
}

Link.displayName = 'Link'
