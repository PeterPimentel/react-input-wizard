import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.css'

const calculateDigit = (cpfBlock, multiplier) => {
  const result = cpfBlock.reduce((acc, curr) => (acc + curr * multiplier--), 0)
  const rest = result % 11
  let digit = 11 - rest
  if (digit > 9) {
    digit = 0
  }
  return digit
}

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

const validateCPF = (inputValue) => {
  if (!isNotNull(inputValue)) return false

  const blackList = [
    '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666',
    '77777777777', '88888888888', '99999999999',
    '00000000000'
  ]

  const CPF = inputValue.replace(/\D/g, '')

  if (CPF.length < 11 || CPF.length > 11) return false

  if (blackList.includes(CPF)) return false

  const blockA = CPF.substr(0, 9).split('')
  const firstVerificator = Number(CPF.charAt(9))
  const digitA = calculateDigit(blockA, 10)

  if (firstVerificator !== digitA) return false

  const blockB = CPF.substr(0, 10).split('')
  const secondVerificator = Number(CPF.charAt(10))
  const digitB = calculateDigit(blockB, 11)
  if (secondVerificator !== digitB) return false

  return true
}

const DEFAULT_RULES = {
  'required': validateRequired,
  'minLength': validateMinLength,
  'maxLength': validateMaxLength,
  'pattern': validatePattern,
  'email': validateEmail,
  'custom': validateCustomRule,
  'isNumber': validateIsNumber,
  'CPF': validateCPF
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
      <div className={`in-wizard-container ${styles.root}`}>
        <input
          {...rest}
          className={`in-wizard-item ${styles.input} ${errorClass} ${className}`}
          value={value}
          onChange={this.handleChange}
          onBlur={this.validate}
        />
        <div className={`in-wizard-item-explain ${styles.labelHasErro}`}>
          <span>{inputError.message}</span>
        </div>
      </div>
    )
  }
}
