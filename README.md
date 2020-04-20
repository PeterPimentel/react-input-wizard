<p align="center">
    <img src="./docs/assets/wizard.png" alt="React chat logo" width="120"/>
</p>
<h1 align="center" style="border-bottom: none;">Input Wizard</h1>

<h4 align="center">A lightweight input validator built for ReactJS</h4>

[![NPM](https://img.shields.io/npm/v/react-input-wizard.svg)](https://www.npmjs.com/package/react-input-wizard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Remember it is only an input validator, you must handle form submit events.

- [Install](#install)
- [How to use](#basic-usage)
- [API](#api)
    - [TextBox](#textbox)
    - [Rules](#rules)
- [Style](#style)

[Codesandbox example](https://codesandbox.io/s/github/PeterPimentel/react-input-wizard/tree/master/example)

## <a name="install"></a>Install

```bash
npm install --save react-input-wizard
```
## <a name="basic-usage"></a>Basic Usage

```jsx
import React, { Component } from 'react'

import TextBox from 'input-wizard'

class InputExample extends Component {
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    return (
      <div>
        <div>Username</div>
        <TextBox
          //HTML input common parameters
          name="username"
          placeholder="Username"
          required
          //To controll the input value
          value={this.state.username}
          //A generic controll is all we need
          onChange={this.handleChange.bind(this)}
          //Rules that will be validated
          rules={[
            {
              name: 'minLength',
              value: 3,
              message: "Your username must have at least 3 letters"
            }
          ]}
        />
      </div>
    )
  }
}
```

## <a name="api"></a>API

### <a name="textbox"></a>TextBox

This component is like a simple input that can revice all common html props.


| Prop          | Type    | Default        | Description                                                                                                           |
| ------------- | ------- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| rules      | Array    | ```[{name, value, message}]``` | Pass the rules you want to be validated.<br><br> ```name:``` The name of the rule.<br>  ```value:``` A pattern or a data value for support the rule.<br> ```message:``` The custom message rule.||
| errorCallback (optional) | func  | undefined             | If passed will return the current error found in the input                                                                     |

### <a name="rules"></a>Rules

|Rule   |Format   |Description   |
|---|---|---|
|required   | ```{name:"required", message:"Your custom message here"}```|Check if the string has a length of zero or is empty|
|minLength   | ```{name:"minLength",value:the_length, message:"Your custom message here"}```|Check if the string's minimum length falls in the value passed. <br> ```value:``` The MIN String length.|
|maxLength   | ```{name:"maxLength",value:the_length, message:"Your custom message here"}```|Check if the string's max length falls in the value passed. <br> ```value:``` The MAX String length.|
|email   | ```{name:"email", message:"Your custom message here"}```|Check if the string is an email.|
| pattern| ```{name:"pattern",value:your_regex, message:"Your custom message here"}```|check if string matches the pattern.<br> Try it: ```/^\d{5}(?:[-\s]\d{4})?$/```|
|isNumber| ```{name:"isNumber", message:"Your custom message here"}```|Check if string is a number.|
|CPF| ```{name:"CPF", message:"Your custom message here"}```|Check if a CPF is valid.|
|custom| ```{name:"custom",value:YourValidator(input) => Boolean, message:"Your custom message here"}```|Create a custom validator here, your funtion must return ```true``` or ```false```.|

### <a name="style"></a>Style
We provid some css classes that will help you style your input as your wish.

- in-wizard-container
  - Root element: ```div```
- in-wizard-item
  - ```input```
- in-wizard-item-explain
  The ```div``` wrapping the error message  ```span```  

## License

MIT © [PeterPimentel](https://github.com/PeterPimentel)
