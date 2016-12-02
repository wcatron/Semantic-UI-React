import React, { PropTypes } from 'react'
import cx from 'classnames'

import {
  createShorthandFactory,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
  useKeyOnly,
} from '../../lib'
import Image from '../../elements/Image'

import ModalDescription from './ModalDescription'

function ModalContent(props) {
  const { children, className, content, image } = props
  const classes = cx(
    className,
    useKeyOnly(image, 'image'),
    'content'
  )
  const rest = getUnhandledProps(ModalContent, props)
  const ElementType = getElementType(ModalContent, props)

  if (children) {
    return <ElementType {...rest} className={classes}>{children}</ElementType>
  }

  const imageElement = Image.create(image, { wrapped: true })

  if (imageElement) {
    return (
      <ElementType {...rest} className={classes}>
        {imageElement}
        <ModalDescription>{content}</ModalDescription>
      </ElementType>
    )
  }

  return <ElementType {...rest} className={classes}>{content}</ElementType>
}

ModalContent._meta = {
  name: 'ModalContent',
  type: META.TYPES.MODULE,
  parent: 'Modal',
}

ModalContent.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for Image or just adds the image class if boolean. */
  image: PropTypes.oneOfType([
    PropTypes.bool,
    customPropTypes.itemShorthand,
  ]),
}

ModalContent.create = createShorthandFactory(ModalContent, content => ({ content }))

export default ModalContent
