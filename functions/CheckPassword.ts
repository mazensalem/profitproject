export default function checkepassword(password: string) {
  let hasLowercase = false;
  let hasUppercase = false;
  let hasnumber = false;
  let hasspectialchar = false;
  let spectialchars = ["!", "@", "#", "$", "%", "^", "&", "*"];
  for (var i = 0; i < password.length; i++) {
    if (Number(password[i]) || Number(password[i]) === 0) {
      hasnumber = true;
    }
    if (spectialchars.includes(password[i])) {
      hasspectialchar = true;
    } else {
      if (password[i].toUpperCase() === password[i]) {
        hasUppercase = true;
      }
      if (password[i].toLowerCase() === password[i]) {
        hasLowercase = true;
      }
    }
  }

  if (password.length < 8) {
    return "8 characters minimum";
  }
  if (!hasspectialchar) {
    return "has at least 1 of the special characters - !@#$%^&*";
  }
  if (!hasLowercase) {
    return "has at least 1 lowercase letter";
  }
  if (!hasUppercase) {
    return "has at least 1 uppercase letter";
  }
  if (!hasnumber) {
    return "has at least 1 number";
  }
  return "done password";
}
