import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../context/auth.context";

const SignUpBiz = ({ redirect = "/" }) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, createUser, login } = useAuth();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string()
        .min(8)
        .max(1024)
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_])(?=(.*\d){4,})[a-zA-Z!@%$#^&*\-_\d]{8,}$/
        )
        .required()
        .messages({
          "string.pattern.base":
            'The "Password" must contain at least 8 Characters, and include 1 Upper-Case letter, 1 Lower-Case letter, 1 Special Symbol(!@%$#^&*-_) and 4 digits(0-9).',
        }),
      name: Joi.string().min(2).max(255).required(),
    }),

    async onSubmit(values) {
      try {
        await createUser({ ...values, biz: true });
        await login({ email: values.email, password: values.password });
        navigate("/sign-in");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader
        title="Sign Up  as Business with Real App"
        description="Open a new account, it is free"
      />
      <form onSubmit={form.handleSubmit} noValidate>
        {error && <div className="alert alert-danger">{error}</div>}

        <Input
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          error={form.touched.email && form.errors.email}
          required
        />
        <Input
          {...form.getFieldProps("password")}
          type="password"
          label="Password"
          error={form.touched.password && form.errors.password}
          required
        />
        <Input
          {...form.getFieldProps("name")}
          type="text"
          label="Name"
          error={form.touched.name && form.errors.name}
          required
        />

        <div className="my-2">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};
export default SignUpBiz;
