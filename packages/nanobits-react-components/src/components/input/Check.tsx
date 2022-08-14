import React, { forwardRef, InputHTMLAttributes } from 'react';
import { FormCheck } from 'nanobits-react-ui';
import classNames from 'classnames';
import { Label } from 'nanobits-react-components';

interface CheckItems {
    value: string | number 
    label: string 
}

export interface CheckProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    label?: string
    required?: boolean
    name: string
    error?: string,
    items: CheckItems[],
    inline?: boolean
}

export const CheckInput = forwardRef<HTMLInputElement, CheckProps>((
    {
        className,
        label,
        required,
        name,
        items,
        inline
    },
    ref
) => {

    const _className = classNames(
        'n-custom-text-input-class',
        className
    )

    return (
        <React.Fragment>
            {label && <Label labelfor={name} label={label} required={required}/>}
            {items && items.length && items.map((item: CheckItems, index: number) => {
                return <FormCheck key={`for-${name}-${index}`} className={_className} ref={ref} inline={inline} id={`for-${name}-${index}`} value={item.value} label={item.label}/>
            })}
        </React.Fragment>
    )
})