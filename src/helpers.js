export function validateName(name, setMsgState, setHiddenErrState) {
  if (!name.length) {
    setMsgState("This field cannot be empty");
    setHiddenErrState(false);
  } else if (name.length < 3 || name.length > 20) {
    setMsgState("Length must be between 3 and 20 characters");
    setHiddenErrState(false);
  } else if (!/^[a-zA-Z]+$/.test(name)) {
    setMsgState("This field must contain only A-Z characters");
    setHiddenErrState(false);
  }
}

export function validateEmail(email, setMsgState, setHiddenErrEmail) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;
  if (!email.length) {
    setMsgState("This field cannot be empty");
    setHiddenErrEmail(false);
  } else if (!emailRegex.test(email)) {
    setMsgState("E-mail is invalid");
    setHiddenErrEmail(false);
  }
}

export function validatePassword(password, setMsgState, setHiddenErrPass) {
  if (!password.length) {
    setMsgState("This field cannot be empty");
    setHiddenErrPass(false);
  } else if (password.length < 3 || password.length > 20) {
    setMsgState("Password must be between 3 and 20 characters long");
    setHiddenErrPass(false);
  } else if (/^[a-z]*$/.test(password)) {
    setMsgState("Must contain at least one uppercase letter and one number");
    setHiddenErrPass(false);
  } else if (/^[a-zA-Z]*$/.test(password)) {
    setMsgState("Must contain at least one number");
    setHiddenErrPass(false);
  } else if (/^[a-z0-9]*$/.test(password)) {
    setMsgState("Must contain at least one uppercase letter");
    setHiddenErrPass(false);
  }
}
