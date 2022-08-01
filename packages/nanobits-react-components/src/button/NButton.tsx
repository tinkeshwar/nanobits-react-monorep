import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button, Spinner } from 'nanobits-react-ui'
import Icon from 'nanobits-react-icons'


export interface NButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    loading?: boolean | undefined
    disabled?: boolean | undefined
    buttonText?: string | undefined
    buttonIconLeft?: string | undefined
    buttonIconRight?: string | undefined
    onClick: () => void
}

export const NButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, NButtonProps>((
    {
        className,
        buttonText,
        type,
        loading,
        disabled,
        buttonIconLeft,
        buttonIconRight,
        onClick,
        ...rest
    },
    ref
)=> {
    const _classname = classNames(
        'n-custom-button-class',
        className
    )

    return (
        <Button
            type={type}
            className={_classname} 
            disabled={ disabled || loading || false }
            onClick={onClick}
            {...rest} 
            ref={ref}>
                {loading && <Spinner color={'danger'} size={'sm'}/>}
                {buttonIconLeft && <Icon type={'solid'} icon={buttonIconLeft} className={'mr-1'}/>} 
                {buttonText || ''} 
                {buttonIconRight && <Icon type={'solid'} icon={buttonIconRight} className={'ml-1'}/>}
        </Button>
    )
})

NButton.propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    buttonText: PropTypes.string,
    buttonIconLeft: PropTypes.string,
    buttonIconRight: PropTypes.string
}

NButton.displayName = 'NButton'
