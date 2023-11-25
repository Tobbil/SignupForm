import { useState } from "react";
import { validateEmail, validateName, validatePassword } from "./helpers.js";

const INPUTS = [
  {
    id: "input-first-name",
    errorId: "input-first-name-error",
    type: "text",
    placeholder: "First Name",
  },
  {
    id: "input-last-name",
    errorId: "input-last-name-error",
    type: "text",
    placeholder: "Last Name",
  },
  {
    id: "input-email",
    errorId: "input-email-error",
    type: "email",
    placeholder: "E-mail Address",
  },
  {
    id: "input-password",
    errorId: "input-password-error",
    type: "password",
    placeholder: "Password",
  },
];

function App() {
  return (
    <>
      <ColumnLeft />
      <ColumnRight>
        <Form />
      </ColumnRight>
    </>
  );
}

function ColumnLeft() {
  return (
    <div id="column-left" className="column column-left">
      <div id="column-left-text">
        <h1>Learn to code by watching others</h1>
        <p>
          See how experienced developers solve problems in real-time. Watching
          scripted tutorials is great, but understanding how developers think is
          invaluable.
        </p>
      </div>
    </div>
  );
}

function ColumnRight(props) {
  return (
    <div id="column-right" className="column column-right">
      <div id="column-right-header">
        <button type="buton" id="button-try" className="btn btn-try">
          <strong>Try it free 7 days</strong> then $20/month
        </button>
      </div>
      <div id="column-right-content">{props.children}</div>
    </div>
  );
}

function Form() {
  // STATES
  const [hiddenErrFname, setHiddenErrFname] = useState(true);
  const [hiddenErrLname, setHiddenErrLname] = useState(true);
  const [hiddenErrEmail, setHiddenErrEmail] = useState(true);
  const [hiddenErrPass, setHiddenErrPass] = useState(true);

  const [firstNameErrMsg, setFirstNameErrMsg] = useState("");
  const [lastNameErrMsg, setLastNameErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const [firstNameState, setFirstNameState] = useState("");
  const [lastNameState, setLastNameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const inputStates = [
    firstNameState,
    lastNameState,
    emailState,
    passwordState,
  ];

  const inputStateSetters = [
    setFirstNameState,
    setLastNameState,
    setEmailState,
    setPasswordState,
  ];

  const errorStates = [
    hiddenErrFname,
    hiddenErrLname,
    hiddenErrEmail,
    hiddenErrPass,
  ];

  const errorMsgStates = [
    firstNameErrMsg,
    lastNameErrMsg,
    emailErrMsg,
    passwordErrMsg,
  ];

  // HANDLE SUBMIT
  const submitHandler = (event) => {
    event.preventDefault();
    const [isFnameValid, isLnameValid, isEmailValid, isPassValid] =
      inputStates.map((input) => input !== "");
    setHiddenErrFname(isFnameValid);
    setHiddenErrLname(isLnameValid);
    setHiddenErrEmail(isEmailValid);
    setHiddenErrPass(isPassValid);

    // VALIDATE FIRST NAME
    validateName(firstNameState, setFirstNameErrMsg, setHiddenErrFname);
    // VALIDATE LAST NAME
    validateName(lastNameState, setLastNameErrMsg, setHiddenErrLname);
    // VALIDATE EMAIL
    validateEmail(emailState, setEmailErrMsg, setHiddenErrEmail);
    // VALIDATE PASSWORD
    validatePassword(passwordState, setPasswordErrMsg, setHiddenErrPass);

    if ((isFnameValid, isLnameValid, isEmailValid, isPassValid)) {
      console.log(`Form submitted successfully\n
            First Name: ${firstNameState}\n
            Last Name: ${lastNameState}\n
            Email: ${emailState}\n
            Password: ${passwordState}`);
    } else {
      console.log(`Not all fields are valid\n
            First Name: ${isFnameValid}\n
            Last Name: ${isLnameValid}\n
            Email: ${isEmailValid}\n
            Password: ${isPassValid}`);
    }
  };

  return (
    <>
      <div>
        <form id="signup-form" onSubmit={submitHandler} noValidate>
          {INPUTS.map((input, index) => {
            return (
              <Input
                key={input.id}
                id={input.id}
                errorId={input.errorId}
                type={input.type}
                placeholder={input.placeholder}
                errorMsgState={errorMsgStates[index]}
                errorHidden={errorStates[index]}
                value={inputStates[index]}
                setInputState={inputStateSetters[index]}
              />
            );
          })}
          <button id="btn-claim-trial" className="btn btn-claim-trial">
            <strong>CLAIM YOUR FREE TRIAL</strong>
          </button>
        </form>
        <p className="terms-and-conditions">
          By clicking the button, you are agreeing to our{" "}
          <a href="https://www.google.com">Terms and Conditions</a>
        </p>
      </div>
    </>
  );
}

function Input({
  id,
  errorId,
  type,
  placeholder,
  errorMsgState,
  errorHidden,
  inputState,
  setInputState,
}) {
  return (
    <>
      <input
        className={
          errorHidden ? "input-field" : "input-field input-field-invalid"
        }
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={(event) => {
          setInputState(event.target.value);
        }}
        value={inputState}
      ></input>
      <div className="error-msg-container">
        <p
          id={errorId}
          className={errorHidden ? "error-msg hidden" : "error-msg"}
        >
          <em>{errorMsgState}</em>
        </p>
      </div>
    </>
  );
}

export default App;
