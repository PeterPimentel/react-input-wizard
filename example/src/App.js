import React, { Component } from 'react'

import TextBox from 'react-input-wizard'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      username: "",
      age: "",
      zipCode: ""
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAge(value) {
    return value >= 23 && value <= 140
  }

  render() {
    return (
      <div className="container">
        <div className="box">
          <h2>Basic Form validations</h2>
          <hr className="divider" />
          <form>

            <div>
              <div className="input-label">Username:*</div>
              <TextBox
                name="username"
                placeholder="Username"
                required
                value={this.state.username}
                onChange={this.handleChange.bind(this)}
                rules={[
                  {
                    name: 'minLength',
                    value: 3,
                    message: "Your username must have at least 3 letters"
                  },
                  {
                    name: 'maxLength',
                    value: 7,
                    message: "Your username must have less then 7 letters"
                  }
                ]}
              />
            </div>
            <div>
              <div className="input-label">Email:*</div>
              <TextBox
                name="email"
                placeholder="Email"
                required
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
                rules={[
                  {
                    name: 'required',
                    message: "Required field"
                  },
                  {
                    name: 'email',
                    message: "This is not a valid email"
                  }
                ]}
              />
            </div>
            <div>
              <div className="input-label">Age:</div>
              <TextBox
                name="age"
                placeholder="Age"
                value={this.state.age}
                onChange={this.handleChange.bind(this)}
                rules={[
                  {
                    name: 'isNumber',
                    message: "This is not a valid age"
                  },
                  {
                    name: 'custom',
                    value: this.handleAge.bind(this),
                    message: "You should be 23 or above and less than 140"
                  }
                ]}
              />
            </div>
            <div>
              <div className="input-label">Zip Code</div>
              <div>Ex: 12345 OR 12345-6789</div>
              <TextBox
                name="zipCode"
                placeholder="Zip Code"
                required
                value={this.state.zipCode}
                onChange={this.handleChange.bind(this)}
                rules={[
                  {
                    name: 'required',
                    message: "Required field"
                  },
                  {
                    name: 'pattern',
                    value: /^\d{5}(?:[-\s]\d{4})?$/,
                    message: "This is not a valid Zip Code"
                  }
                ]}
              />
            </div>
            <button className="submit-button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
