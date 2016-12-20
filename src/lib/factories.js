import _ from 'lodash'
import cx from 'classnames'
import React, { cloneElement, isValidElement } from 'react'

// ============================================================
// Factories
// ============================================================

/**
 * A more robust React.createElement. It can create elements from primitive values.
 *
 * @param {function|string} Component A ReactClass or string
 * @param {function} mapValueToProps A function that maps a primitive value to the Component props
 * @param {string|object|function} val The value to create a ReactElement from
 * @param {object|function} [defaultProps={}] Default props object or function (called with regular props).
 * @param {boolean} generateKey Whether or not to generate a child key, useful for collections.
 * @returns {object|null}
 */
export function createShorthand(Component, mapValueToProps, val, defaultProps = {}, generateKey = false) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthandFactory() Component must be a string or function.')
  }
  // short circuit for disabling shorthand
  if (val === null) return null
  const valIsString = _.isString(val)
  const valIsNumber = _.isNumber(val)

  const isReactElement = isValidElement(val)
  const isPropsObject = _.isPlainObject(val)
  const isPrimitiveValue = valIsString || valIsNumber || _.isArray(val)

  // ----------------------------------------
  // Build up props
  // ----------------------------------------
  let finalProps = {}

  // User's props
  const usersProps = isReactElement && { ...val.props }
    || isPropsObject && { ...val }
    || isPrimitiveValue && mapValueToProps(val)

  // Default props
  if (_.isFunction(defaultProps)) {
    defaultProps = _.isFunction(defaultProps) ? defaultProps(usersProps) : defaultProps

    // Merge props
    finalProps = { ...defaultProps, ...usersProps }

    // Merge className
    if (usersProps.className && defaultProps.className) {
      finalProps.className = cx(defaultProps.className, usersProps.className)
    }

    // Merge style
    if (usersProps.style && defaultProps.style) {
      finalProps.style = { ...defaultProps.style, ...usersProps.style }
    }
  }

  // ----------------------------------------
  // Get key
  // ----------------------------------------

  // Use key, childKey, or generate key
  if (!finalProps.key) {
    const { childKey } = finalProps

    if (childKey) {
      finalProps.key = typeof childKey === 'function' ? childKey(finalProps) : childKey
    } else if (generateKey && (valIsString || valIsNumber)) {
      finalProps.key = val
    }
  }

  // ----------------------------------------
  // Create Element
  // ----------------------------------------

  // Clone ReactElements
  if (isReactElement) return cloneElement(val, finalProps)

  // Create ReactElements from built up props
  if (isPrimitiveValue || isPropsObject) return <Component {...finalProps} />

  // Otherwise null
  return null
}

// ============================================================
// Factory Creators
// ============================================================

export function createShorthandFactory(Component, mapValueToProps, generateKey) {
  if (typeof Component !== 'function' && typeof Component !== 'string') {
    throw new Error('createShorthandFactory() Component must be a string or function.')
  }

  return (val, defaultProps) => {
    return createShorthand(Component, mapValueToProps, val, defaultProps, generateKey)
  }
}

// ============================================================
// HTML Factories
// ============================================================
export const createHTMLImage = createShorthandFactory('img', value => ({ src: value }))
export const createHTMLInput = createShorthandFactory('input', value => ({ type: value }))
export const createHTMLLabel = createShorthandFactory('label', value => ({ children: value }))
