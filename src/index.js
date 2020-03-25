import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.css'

const isNotNull = value => value !== undefined && value !== null
const validateRequired = (inputValue) => isNotNull(inputValue) && inputValue.trim() !== ''
const validateMinLength = (inputValue, size) => isNotNull(inputValue) && String(inputValue).length >= size
const validateMaxLength = (inputValue, size) => isNotNull(inputValue) && String(inputValue).length <= size
const validatePattern = (inputValue, pattern) => new RegExp(pattern).test(inputValue)
const validateCustomRule = (inputValue, fn) => fn(inputValue)
const validateIsNumber = (inputValue) => !Number.isNaN(Number(inputValue)) // null returns 0

const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

const DEFAULT_RULES = {
  'required': validateRequired,
  'minLength': validateMinLength,
  'maxLength': validateMaxLength,
  'pattern': validatePattern,
  'email': validateEmail,
  'custom': validateCustomRule,
  'isNumber': validateIsNumber
}

export default class TextBox extends Component {
  static propTypes = {
    rules: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.any
        ])
      })
    ),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onChange: PropTypes.func,
    className: PropTypes.string,
    errorCallback: PropTypes.func
  }

  static defaultProps = {
    rules: []
  }

  constructor(props) {
    super(props)
    this.state = {
      inputError: {
        hasError: false,
        message: ''
      }
    }
  }

  validate = (e) => {
    const { rules } = this.props
    const errorRule = rules.find(rule => DEFAULT_RULES[rule.name](e.target.value, rule.value) === false)
    // Find a validation error
    if (errorRule) {
      // Inform to HTML that we found a error on the input
      e.target.setCustomValidity(errorRule.message)
      if (typeof this.props.errorCallback === 'function') {
        this.props.errorCallback({
          ...errorRule,
          inputValue: e.target.value
        })
      }
      this.setState({
        inputError: {
          status: true,
          message: errorRule.message
        }
      })
    } else {
      // cleaning Errors
      e.target.setCustomValidity('')
      this.setState({
        inputError: {
          status: false,
          message: ''
        }
      })
    }
  }

  handleChange = (e) => {
    this.validate(e)
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e)
    }
  }

  render() {
    const {
      className,
      value,
      errorCallback,
      ...rest
    } = this.props

    const { inputError } = this.state
    const errorClass = inputError.status ? styles.inputHasErro : ''
    return (
      <div className={`invtr-container ${styles.root}`}>
        <input
          {...rest}
          className={`invtr-item ${styles.input} ${errorClass} ${className}`}
          value={value}
          onChange={this.handleChange}
          onBlur={this.validate}
        />
        <div className={`invtr-item-explain slide-in-top ${styles.labelHasErro}`}>
          <span>{inputError.message}</span>
        </div>
      </div>
    )
  }
}
