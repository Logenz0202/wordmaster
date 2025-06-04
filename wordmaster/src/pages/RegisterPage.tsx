import React from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/customStyles.css';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
      .required('Required'),
  });

  const handleRegister = async (values: typeof initialValues, { setSubmitting, setErrors }: any) => {
    const { email, password } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'The email address is already in use by another account.' });
      } else {
        setErrors({ email: 'Error registering. Please try again.' });
      }
      console.error('Error registering', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="alert alert-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="alert alert-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <Field type="password" name="confirmPassword" className="form-control" />
              <ErrorMessage name="confirmPassword" component="div" className="alert alert-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;