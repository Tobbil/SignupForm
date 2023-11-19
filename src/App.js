import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

const INPUTS = [
  {
    name: "First Name",
    id: "input-first-name",
    type: "text",
    placeholder: "First Name",
    errorMsg: "First Name cannot be empty",
  },
  {
    name: "Last Name",
    id: "input-last-name",
    type: "text",
    placeholder: "Last Name",
    errorMsg: "Last Name cannot be empty",
  },
  {
    name: "E-mail",
    id: "input-email",
    type: "email",
    placeholder: "E-mail Address",
    errorMsg: "Looks like this is not an e-mail!",
  },
  {
    name: "Password",
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
  const [hidden, setHidden] = useState(true);
  const methods = useForm();
  const onSubmit = methods.handleSubmit((data) => {
    setHidden(false);
    console.log(data);
  });

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} noValidate id="signup-form">
          {INPUTS.map((input) => {
            return (
              <>
                <Input
                  key={input.id}
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                />
                <div className="error-msg-container">
                  <p className="error-msg hidden">{input.errorMsg}</p>{" "}
                  {/* TODO: hidden dla poszczegolnych inputow */}
                </div>
              </>
            );
          })}
          <button
            onClick={onSubmit}
            type="submit"
            id="btn-claim-trial"
            className="btn btn-claim-trial"
          >
            CLAIM YOUR FREE TRIAL
          </button>
        </form>
      </FormProvider>
    </>
  );
}

function Input({ id, type, placeholder }) {
  return (
    <input
      className="input-field"
      id={id}
      type={type}
      placeholder={placeholder}
    ></input>
  );
}

export default App;
