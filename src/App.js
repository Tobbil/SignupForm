import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

const INPUTS = [
  {
    id: "input-first-name",
    type: "text",
    placeholder: "First Name",
    errorMsg: "First Name cannot be empty",
  },
  {
    id: "input-last-name",
    type: "text",
    placeholder: "Last Name",
    errorMsg: "Last Name cannot be empty",
  },
  {
    id: "input-email",
    type: "email",
    placeholder: "E-mail Address",
    errorMsg: "Looks like this is not an e-mail!",
  },
  {
    id: "input-password",
    type: "password",
    placeholder: "Password",
    errorMsg: "Password cannot be empty",
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
          <strong>Try it free 7 days</strong> then $20/mo. thereafter
        </button>
      </div>
      <div id="column-right-content">{props.children}</div>
    </div>
  );
}

function Form() {
  const [hiddenErrFname, setHiddenErrFname] = useState(true);
  const [hiddenErrLname, setHiddenErrLname] = useState(true);
  const [hiddenErrEmail, setHiddenErrEmail] = useState(true);
  const [hiddenErrPass, setHiddenErrPass] = useState(true);

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

  const methods = useForm();
  const onSubmit = methods.handleSubmit(() => {
    console.log(firstNameState, lastNameState, emailState, passwordState);
    inputStateSetters.map((setter) => setter(""));
    setHiddenErrFname(false);
  });

  return (
    <>
      <FormProvider {...methods}>
        <form id="signup-form" onSubmit={(e) => e.preventDefault()} noValidate>
          {INPUTS.map((input, index) => {
            return (
              <Input
                key={input.id}
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                errorMsg={input.errorMsg}
                errorHidden={errorStates[index]}
                value={inputStates[index]}
                setInputState={inputStateSetters[index]}
              />
            );
          })}
          <button
            onClick={onSubmit}
            type="submit"
            id="btn-claim-trial"
            className="btn btn-claim-trial"
          >
            <strong>CLAIM YOUR FREE TRIAL</strong>
          </button>
        </form>
        <p class="terms-and-conditions">
          By clicking the button, you are agreeing to our
          <a href="https://www.google.com">Terms and Conditions</a>
        </p>
      </FormProvider>
    </>
  );
}

function Input({
  id,
  type,
  placeholder,
  errorMsg,
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
          console.log(inputState);
          setInputState(event.target.value);
        }}
        value={inputState}
      ></input>
      <div className="error-msg-container">
        <p className={errorHidden ? "error-msg hidden" : "error-msg"}>
          <em>{errorMsg}</em>
        </p>
      </div>
    </>
  );
}

export default App;
