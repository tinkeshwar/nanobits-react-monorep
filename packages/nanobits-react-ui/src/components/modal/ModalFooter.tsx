import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, ...rest }, ref) => {
    const _className = classNames('modal-footer','n-custom-modal-footer-class', className)

    return (
      <div className={_className} {...rest} ref={ref}>
        {children}
      </div>
    )
  },
)

ModalFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

ModalFooter.displayName = 'ModalFooter'
