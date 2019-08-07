import React from 'react';
import { withFormik, Form, Field } from 'formik';

const LoginForm = () => {

  return (
    <div className="loginForm">
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        <Field type="email" name="email" placeholder="Email" />
        <Field type="password" name="password" placeholder="Password" />
        <label >
          Confirm you have read our <a>terms of service</a>:
          <Field type="checkbox" name="tos" />
        </label>
        <button>Submit</button>
      </Form>
    </div>
  )
}

const FormikLoginForm = withFormik({

  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  handleSubmit(values) {
    console.log(values);
  }

})(LoginForm);

export default FormikLoginForm;