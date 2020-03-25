import React from 'react'
import TextBox from './'
import { shallow } from 'enzyme'

const mockSetCustomValidity = jest.fn(error => error.message)

describe('[Input Wizard] - Testing REQUIRED validation ', () => {
  const component = shallow(
    <TextBox value=''
      rules={[ {name: 'required', message: 'This field is required'} ]}
    />
  )
  it('Empty value', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: '', setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[REQUIRED] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeTruthy()
    expect(component.state().inputError.message).toBe('This field is required')
  })

  it('Filled with blank space', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: '         ', setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[REQUIRED] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeTruthy()
    expect(component.state().inputError.message).toBe('This field is required')
  })

  it('Filled with null', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: null, setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[REQUIRED] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeTruthy()
    expect(component.state().inputError.message).toBe('This field is required')
  })

  it('Filled with a text', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: 'any_input_text', setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[REQUIRED] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeFalsy()
    expect(component.state().inputError.message).toBe('')
  })
})

// ----- Tests with minLenght Rule -----
describe('[Input Wizard] - Testing MINLENGTH validation ', () => {
  const component = shallow(
    <TextBox value=''
      rules={[ {name: 'minLength', value: 3, message: 'This field must have at least 3 letters'} ]}
    />
  )

  it('Empty value', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: '', setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[MINLENGTH] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeTruthy()
    expect(component.state().inputError.message).toBe('This field must have at least 3 letters')
  })

  it('Filled with text < rule value ', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: 'ab', setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[MINLENGTH] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeTruthy()
    expect(component.state().inputError.message).toBe('This field must have at least 3 letters')
  })

  it('Filled with numbers < rule value', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: 1, setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[MINLENGTH] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeTruthy()
    expect(component.state().inputError.message).toBe('This field must have at least 3 letters')
  })

  it('Filled with numbers > rule value', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: 123, setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[MINLENGTH] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeFalsy()
    expect(component.state().inputError.message).toBe('')
  })
})

// ----- Tests with maxLenght Rule -----
describe('[Input Wizard] - Testing MAXLENGTH validation ', () => {
  const component = shallow(
    <TextBox value=''
      rules={[ {name: 'maxLength', value: 5, message: 'This field must have less then 5 letters'} ]}
    />
  )

  it('Empty value', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: '', setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[MAXLENGTH] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeFalsy()
    expect(component.state().inputError.message).toBe('')
  })

  it('Filled with text > rule value ', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: 'abcdefg', setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[MAXLENGTH] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeTruthy()
    expect(component.state().inputError.message).toBe('This field must have less then 5 letters')
  })

  it('Filled with numbers < rule value', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: 123456, setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[MAXLENGTH] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeTruthy()
    expect(component.state().inputError.message).toBe('This field must have less then 5 letters')
  })

  it('Filled with text < rule value', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: 'abcd', setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[MAXLENGTH] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeFalsy()
    expect(component.state().inputError.message).toBe('')
  })
})

// ----- Tests with EMAIL Rule -----
describe('[Input Wizard] - Testing EMAIL validation ', () => {
  const component = shallow(
    <TextBox value=''
      rules={[ {name: 'email', message: 'This is not a valid email'} ]}
    />
  )

  it('Empty value', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: '', setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[EMAIL] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeTruthy()
    expect(component.state().inputError.message).toBe('This is not a valid email')
  })

  it('Filled with undefined', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: undefined, setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[EMAIL] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeTruthy()
    expect(component.state().inputError.message).toBe('This is not a valid email')
  })

  it('Filled with invalid email ', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: 'abcdefg@!a.com', setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[EMAIL] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeTruthy()
    expect(component.state().inputError.message).toBe('This is not a valid email')
  })

  it('Filled with valid email', () => {
    component.find('input').at(0).simulate('blur', {
      target: { value: 'teste@t.pt', setCustomValidity: mockSetCustomValidity }
    })
    console.log(`[EMAIL] State - ${JSON.stringify(component.state().inputError)}`)
    expect(component.state().inputError.status).toBeFalsy()
    expect(component.state().inputError.message).toBe('')
  })
})
