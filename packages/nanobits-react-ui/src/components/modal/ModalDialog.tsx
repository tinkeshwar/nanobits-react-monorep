import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface ModalDialogProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Align the modal in the center or top of the screen.
   */
  alignment?: 'top' | 'center'
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Set modal to covers the entire user viewport.
   */
  fullscreen?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * Does the modal dialog itself scroll, or does the whole dialog scroll within the window.
   */
  scrollable?: boolean
  /**
   * Size the component small, large, or extra large.
   */
  size?: 'sm' | 'lg' | 'xl'
}

export const ModalDialog = forwardRef<HTMLDivElement, ModalDialogProps>(
  ({ children, alignment, className, fullscreen, scrollable, size, ...rest }, ref) => {
    const _className = classNames(
      'modal-dialog',
      'n-custom-modal-dialog-class',
      {
        'modal-dialog-centered': alignment === 'center',
        [typeof fullscreen === 'boolean'
          ? 'modal-fullscreen'
          : `modal-fullscreen-${fullscreen}-down`]: fullscreen,
        'modal-dialog-scrollable': scrollable,
        [`modal-${size}`]: size,
      },
      className,
    )

    return (
      <div className={_className} {...rest} ref={ref}>
        {children}
      </div>
    )
  },
)

ModalDialog.propTypes = {
  alignment: PropTypes.oneOf(['top', 'center']),
  children: PropTypes.node,
  className: PropTypes.string,
  fullscreen: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(['sm', 'md', 'lg', 'xl', 'xxl']),
  ]),
  scrollable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg', 'xl']),
}

ModalDialog.displayName = 'ModalDialog'
