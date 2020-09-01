import React, { FC, useContext } from 'react';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';

import { signupSchema, notify } from '../../../util';
import { Input, Button } from '..';
import { useRegisterUser } from '../../../hooks';
import { AuthContext } from '../../../context';


interface SignupSchema {
  name: string;
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const [userSignup, { reset }] = useRegisterUser();
  const { setUser, isAuthenticated } = useContext(AuthContext);

  const schemaValues: SignupSchema = {
    name: '',
    email: '',
    password: ''
  }

  const handleError = () => {
    notify('Invalid credentials. Try again', 'error');
    reset();
  }

  return (
    <>
      {isAuthenticated() && <Redirect to='/' />}
      <Formik
        initialValues={schemaValues}
        validationSchema={signupSchema}
        onSubmit={async(
          { name, email, password }: SignupSchema,
          { setSubmitting }
        ) => {
          setSubmitting(true);
          const userProfile = await userSignup({ name, email, password });
          if(!userProfile) {
            handleError();
            setSubmitting(false);
          } else {
            setSubmitting(false);
            notify('Signup Successful', 'success', 500);
            setTimeout(() => setUser(userProfile), 800);
          }
        }}
      >
        {({ isSubmitting, errors, isValid }) => (
          <>
            <Form>
              <Input
                label="Name"
                name="name"
                placeholder="Enter your full name"
                errorText={errors.name}
              />
              <Input
                label="Email"
                name="email"
                placeholder="Enter a valid email address"
                errorText={errors.email}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                errorText={errors.password}
              />
              <Button type="submit" disabled={isSubmitting || !isValid}>
                SIGNUP
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;