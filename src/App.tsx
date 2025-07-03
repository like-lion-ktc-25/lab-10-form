import { useState } from "react";
import ReactLoginForm from "./form/reactLoginForm";
import ReactSignUpForm from "./form/reactSignupForm";
import "./index.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      <div className="login-card">
        <h1>{isLogin ? "Sign In" : "Sign Up"}</h1>

        {isLogin ? <ReactLoginForm /> : <ReactSignUpForm />}
        {/* {isLogin ? <FormikLoginForm /> : <FormikSignUpForm />} */}
        {/* {isLogin ? <HookFormLoginForm /> : <HookFormSignUpForm />} */}

        <div className="button-group">
          <button
            type="submit"
            form={isLogin ? "login-form" : "signup-form"}
            className="button-primary"
          >
            {isLogin ? "Login" : "Submit"}
          </button>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="button-secondary"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
