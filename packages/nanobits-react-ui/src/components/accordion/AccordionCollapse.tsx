import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Collapse, CollapseProps } from '../collapse/Collapse'

export const AccordioCollapse = forwardRef<HTMLDivElement, Omit<CollapseProps, 'horizontal'>>(
  ({ children, ...props }, ref) => {
    return (
      <Collapse className="accordion-collapse" {...props} ref={ref}>
        {children}
      </Collapse>
    )
  },
)

AccordioCollapse.propTypes = {
  children: PropTypes.node,
}

AccordioCollapse.displayName = 'AccordioCollapse'
