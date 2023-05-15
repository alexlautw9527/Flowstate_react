function FormInput({ children, htmlFor, inputType, onInputChange }) {
  return (
    <div className="mb-5">
      <label htmlFor={htmlFor} className="font-pixel block">
        <p>{children}</p>
        <input
          type={inputType}
          id={htmlFor}
          name={htmlFor}
          className="block w-full"
          onChange={(e) => {
            onInputChange(e, htmlFor);
          }}
        />
      </label>
    </div>
  );
}

function SignIn({ onSignInClick, isSignInSuccess, onInputChange }) {
  return (
    <div className="font-pixel container">
      <h1 className="mb-10 text-5xl text-center">Login?</h1>

      <div className="w-full md:w-1/3 mx-auto flex flex-col">
        <FormInput
          htmlFor="email"
          inputType="email"
          onInputChange={onInputChange}
        >
          {" "}
          EMAIL{" "}
        </FormInput>
        <FormInput
          htmlFor="password"
          inputType="password"
          onInputChange={onInputChange}
        >
          {" "}
          PASSWORD{" "}
        </FormInput>
        {isSignInSuccess === "login fail" && (
          <p className="mb-5">Please check.</p>
        )}
        <div
          onClick={onSignInClick}
          className="border-2 border-primary inline-block p-3 text-center mx-auto cursor-pointer hover:text-secondary hover:bg-primary"
        >
          Enter
        </div>
      </div>
    </div>
  );
}

export default SignIn;
