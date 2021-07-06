import React, { useState, useCallback, useEffect } from "react";
import {
  Link,
  RouteChildrenProps,
  withRouter,
} from "react-router-dom";

/* Lib */
import axios from "axios";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

/* Components */
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox } from "antd";
import { Header, Container } from "../SignUp/styles";
import openNotification from "../../utils/Notification";

type init = string | undefined | null;
type props = RouteChildrenProps;

const LogIn = ({ history }: props) => {
  const { data, error, revalidate, mutate } = useSWR(
    "/api/users/auth",
    fetcher
  );

  useEffect(() => {
    if (data && data.isAuth) {
      history.push("/");
    }
  }, [data]);

  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const initialEmail: init = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const emailCheck = useCallback((email) => {
    const regex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return email !== "" && email !== "undefined" && regex.test(email);
  }, []);

  const handleRememberMe = useCallback(
    (e) => {
      setRememberMe(!rememberMe);
    },
    [rememberMe]
  );

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (emailCheck(email) && password) {
        setLoginError("");

        let dataToSubmit = {
          email: email,
          password: password,
        };

        axios
          .post("/api/users/login", dataToSubmit)
          .then((response) => {
            if (response.data.loginSuccess) {
              openNotification("로그인 성공", "로그인 성공하였습니다", true);
              mutate(response.data, false);
            } else {
              openNotification("로그인 실패", response.data.message, false);
            }
          })
          .catch((err) => {
            openNotification("로그인 오류", err.toString(), false);
          });
      }
    },
    [email, emailCheck, password, mutate]
  );

  return (
    <Container>
      <Header>로그인</Header>

      <Form onSubmitCapture={onSubmit}>
        <Form.Item required>
          <Input
            id="email"
            placeholder="email"
            type="email"
            value={email?.toString()}
            onChange={onChangeEmail}
            prefix={<MailOutlined className="site-form-item-icon" />}
          />
          {!emailCheck(email) && <div>이메일 형식을 입력하세요!</div>}
        </Form.Item>

        <Form.Item required>
          <Input
            id="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onChangePassword}
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        {loginError && <div>{loginError}</div>}
        <Checkbox
          id="rememberMe"
          onChange={handleRememberMe}
          checked={rememberMe}
        >
          이메일 저장
        </Checkbox>

        <Button type="primary" style={{ minWidth: "100%" }} onClick={onSubmit}>
          로그인
        </Button>
      </Form>
      <div>
        회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하기</Link>
      </div>
    </Container>
  );
};

export default withRouter(LogIn);
