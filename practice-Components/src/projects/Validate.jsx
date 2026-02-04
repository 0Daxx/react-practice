import { useState } from "react";

import * as validator from "validator";
export function Validate() {
  const [password, setPassword] = useState("");

  function savePassword(event) {
    // const text = event.target.value;
    // console.log(text);
    setPassword(event.target.value);
    // verdict = (validator.isStrongPassword(text) ? "Strong password" : "Weak password");
  }
  return (
    <>
      <input type="text" onChange={savePassword} />
      <p> {password} </p>
      <p>
        Verdict :
        {password
          ? validator.isStrongPassword(password)
            ? "strong Password"
            : "weak Password"
          : ""}{" "}
      </p>
    </>
  );
}


/*
The Assignment: The "Pro-Level" Password Module
Task 1: The Logic Extraction (Custom Hooks)

Goal: Abstract all "brain power" out of the UI.

    Create a hook named usePasswordValidation.

    Challenge: It must return a score (0-4) and an object of requirements (e.g., { hasNumber: true, hasSpecial: false }).

    Constraint: Use useMemo to ensure the validator functions only run when the password string changes.

Task 2: The Performance Filter (Debouncing)

Goal: Prevent the "validation engine" from firing on every micro-keystroke.

    Implement a 500ms debounce using useEffect.

    Challenge: The strength state should only update after the user stops typing for half a second.

    Constraint: You must properly use a cleanup function (clearTimeout) to avoid "race conditions" where old validation results overwrite newer ones.

Task 3: The Architecture (Compound Components)

Goal: Use the Compound Component Pattern to make the UI flexible.

    Create a parent <PasswordProvider> that manages the state via React Context.

    Challenge: Create sub-components like <PasswordInput />, <StrengthIndicator />, and <ValidationHints /> that can be placed in any order by the user.

    Constraint: The sub-components should not accept props; they must "consume" the password data directly from the Context.

Task 4: The Developer Experience (Configurability)

Goal: Make the component "Library Grade."

    Allow the user to pass a config object to the hook or provider that overrides validator defaults (e.g., changing minLength from 8 to 12).

    Challenge: Use React.Children.map or forwardRef to ensure the input can still be used with standard HTML attributes like autoFocus or name.

    Constraint: Ensure that if a user doesn't provide a config, the component "falls back" to sensible defaults.

🧪 Success Criteria

You’ll know you’ve nailed it if:

    Your App.js looks clean and declarative (minimal logic in the return statement).

    You can change the UI layout without touching the validation logic.

    The console doesn't show "memory leak" warnings when you type rapidly.

*/