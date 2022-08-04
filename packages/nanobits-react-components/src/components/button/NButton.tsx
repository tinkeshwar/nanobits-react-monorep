import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button, Spinner } from 'nanobits-react-ui'
import Icon from 'nanobits-react-icons'
import { ButtonProps } from 'nanobits-react-ui/dist/components/button/Button'

export interface NButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    loading?: boolean | undefined
    disabled?: boolean | undefined
    buttonVariant?: 'ghost' | 'outline'
    buttonText?: string | undefined
    buttonIconLeft?: string | undefined
    buttonIconRight?: string | undefined
}

export const NButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps & NButtonProps>((
    {
        className,
        loading,
        disabled,
        buttonVariant = 'ghost',
        buttonText,
        buttonIconLeft,
        buttonIconRight,
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
            className={_classname} 
            disabled={ disabled || loading || false }
            variant={buttonVariant}
            {...rest} 
            ref={ref}>
                {loading && <Spinner color={'danger'} size={'sm'}/>}
                {buttonIconLeft && <Icon type={'solid'} icon={buttonIconLeft} className={'mr-1'}/>} 
                &nbsp;{buttonText || ''}&nbsp; 
                {buttonIconRight && <Icon type={'solid'} icon={buttonIconRight} className={'ml-1'}/>}
        </Button>
    )
})

NButton.propTypes = {
    className: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    buttonVariant: PropTypes.oneOf(['ghost', 'outline']),
    buttonText: PropTypes.string,
    buttonIconLeft: PropTypes.string,
    buttonIconRight: PropTypes.string
}

NButton.displayName = 'NButton'
