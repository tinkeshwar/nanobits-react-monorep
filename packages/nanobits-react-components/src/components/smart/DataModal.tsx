import React, { forwardRef } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "nanobits-react-ui";
import { ModalProps } from "nanobits-react-ui/components/modal/Modal";
import PropTypes from 'prop-types'
import classNames from "classnames";
import Icon from "nanobits-react-icons";
import { NButton } from "../button";

export interface DataModalProps extends ModalProps{
    title: string
    visible: boolean
    children: React.ReactNode
    className?: string
    headerClassName?: string
    color?: 'primary' | 'danger' | 'info' | 'success' | 'warning' | 'dark'
    icon?: string
    buttons?: any
    setVisible: (value: boolean) => void
}

export const DataModal = forwardRef<HTMLDivElement, DataModalProps>((
    {
        title,
        children,
        visible,
        className,
        headerClassName,
        color,
        icon,
        buttons,
        setVisible,
        ...rest
    },
    ref
)=>{

    const _className = classNames(
        'n-custom-data-modal-class',
        className,
    )

    const _headerClassName = classNames(
        color ? `bg-${color} text-white` : '',
        'n-custom-data-modal-header-class',
        headerClassName
    )

    return (
        <Modal
            ref={ref}
            className={_className}
            visible={visible}
            onClose={() => setVisible(!visible)}
            {...rest}
        >
            <ModalHeader className={_headerClassName}>
                {title && <ModalTitle>{icon && <Icon icon={icon} type={"solid"}/>}&nbsp; {title}</ModalTitle>}
            </ModalHeader>
            {children && <ModalBody>{children}</ModalBody>}
            {buttons && <ModalFooter>
                {buttons.map((item: any, index: number) => {
                    return <NButton size={item.size} key={`modal-footer-button-${index}`} color={item.color} buttonText={item.text} buttonIconLeft={item.icon} onClick={item.handler}/>
                })}
            </ModalFooter>}
        </Modal>
    )
})

DataModal.prototype = {
    title: PropTypes.string,
    children: PropTypes.node,
    visible: PropTypes.bool,
    classNames: PropTypes.string,
    headerClassName: PropTypes.string,
    setVisible: PropTypes.func.isRequired,
    color: PropTypes.string,
    icon: PropTypes.string,
    buttons: PropTypes.any
}

DataModal.displayName = 'DataModal'