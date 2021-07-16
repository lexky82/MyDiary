import React, { useState, useCallback, useEffect } from "react";
import { Link, RouteChildrenProps } from 'react-router-dom';
import axios from 'axios'
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

/* Components */
import { Container, Header } from "./styles";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from 'antd';
import openNotification from "../../components/Notification";

type props = RouteChildrenProps;

const SignUp = ({ history }: props ) => {
  const { data } = useSWR('/api/users/auth', fetcher);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('')

  useEffect(() => {
    if (data && data.isAuth) {
      openNotification("로그인 성공", "로그인 성공하였습니다", true);
      history.push("/");
    }
  }, [data]);

  const emailCheck = useCallback(email => {    
    const regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email !== '' && email !== 'undefined' && regex.test(email)); 
  }, [])

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [])

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, [])

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    setMismatchError(e.target.value !== passwordCheck)
  }, [passwordCheck])

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setMismatchError(e.target.value !== password)
  }, [password])

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    
    if(!mismatchError && name && emailCheck(email) && !(password.length < 6)){
      setSignUpError('')

      let dataToSubmit = {
        email: email,
        password: password,
        name: name,
      };

      axios.post('/api/users/register', dataToSubmit)
      .then((resonse) => {
        if(resonse.data.success){
          openNotification('회원가입 성공' ,'회원가입을 성공하였습니다.', true);
          history.push('/login')
        }
        else {
          openNotification('회원가입 실패', '회원가입에 실패했습니다.', false)
        }
      })
      .catch((err) => {
        openNotification('회원가입 오류', err.toString(), false);
      })
    }
  }, [email, emailCheck, mismatchError, name, password])

  return (
    <Container> 
      <Header>회원가입</Header>
      <Form onSubmitCapture={onSubmit}>
        <Form.Item required>
          <Input
            id="email"
            placeholder="email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            prefix={<MailOutlined className="site-form-item-icon" />}
          />
          {!emailCheck(email) && <div>이메일 형식을 입력하세요!</div>}
          </Form.Item>
          
          <Form.Item required>
          <Input
            id="name"
            placeholder="닉네임"
            type="text"
            value={name}
            onChange={onChangeName}
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
          {!name && <div>닉네임을 입력해주세요!</div>}
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
          {password.length < 6 && <div>비밀번호를 6자리 이상</div>}
          </Form.Item>

          <Form.Item required>
          <Input
            id="passwordCheck"
            placeholder="비밀번호 확인"
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
          {mismatchError && <div>비밀번호가 일치하지 않습니다.</div>}
          </Form.Item>

          {signUpError && <div>{signUpError}</div>}
        <Button type="primary" style={{ minWidth: '100%' }} onClick={onSubmit} >
          회원가입
        </Button>
      </Form>
      <div>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </div>
    </Container>
  )
  
};

export default SignUp