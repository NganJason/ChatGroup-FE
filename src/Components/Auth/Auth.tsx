import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ChatGroupQueryKey } from "../../_shared/queries/chat_group";

import { Button, message } from "antd";
import Text from "../../_shared/Components/Text/Text";


import { useLogin, useSignup } from "../../_shared/mutations/chat_group";
import { User } from "../../_shared/apis/chat_group";
import { useQueryClient } from "react-query";

enum inputID {
    email = "email",
    password = "password"
}

const Auth = (): JSX.Element => {
    const [ isSignup ] = useState(
      window.location.pathname === "/signup"
    )
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (e.target.id === inputID.email) {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const onSubmitHandler = async (): Promise<void> => {
        if (isSignup) {
          signup({
            username: email,
            password: password
          })
        } else {
          login({
            username: email,
            password: password
          })
        }
    }

    const {
      mutate: login,
    } = useLogin(
      {
        onSuccess: (resp: User): void => {
          queryClient.invalidateQueries(ChatGroupQueryKey.VALIDATE_AUTH);
          navigate("/");
        },
        onError: (err: any): void => {
          message.error(err.message);
        }
      }
    )

    const {
      mutate: signup,
      isLoading: isSignupLoading,
    } = useSignup(
      {
        onSuccess: (resp: User): void => {
          queryClient.invalidateQueries(ChatGroupQueryKey.VALIDATE_AUTH);
          navigate("/");
        },
        onError: (err: any): void => {
          message.error(err.message);
        }
      }
    )

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