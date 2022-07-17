import React, { useState } from "react"

import { Button } from "antd";
import Text from "../../_shared/Components/Text/Text";
import { useNavigate } from "react-router-dom";

type AuthProps = {
    isSignup?: boolean;
}

enum inputID {
    email = "email",
    password = "password"
}

const Auth = (props: AuthProps): JSX.Element => {
    const { isSignup } = props
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const navigate = useNavigate();

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (e.target.id === inputID.email) {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const onSubmitHandler = (): void => {
        navigate("/")
    }

    return (
      <div className="auth bg-two">
        <div className="container">
          <div className="header">
            <Text size="1.8rem" bd="800" mgTop="1" color="secondary">
              {isSignup ? "Join us now" : "Welcome back"}
            </Text>
          </div>

          <div className="input-container">
            <input 
                type="text" 
                placeholder="Email" 
                id={inputID.email} 
                value={email}
                onChange={onInputChange}
            />

            <input 
                type="password" 
                placeholder="Password" 
                id={inputID.password} 
                value={password}
                onChange={onInputChange}
            />
          </div>

          <div className="redirect-container">
            <Text color="primary" size="0.9rem">
              {isSignup ? (
                <a href="/login">Click here to login</a>
              ) : (
                <a href="/signup">Dont have an account yet?</a>
              )}
            </Text>
          </div>

          <div className="submit">
            <Button type="primary" onClick={onSubmitHandler}>
              {isSignup ? "Sign up" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    );
}

export default Auth;