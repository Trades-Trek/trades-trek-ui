import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { supportService } from "../../services/support.service";
import Footer from "../Footer/Footer";

const HelpSupport = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const [data, setData] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    supportService
      .createSupport(data)
      .then((res) => {
        if (res.success) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          reset({
            title:"",
            description:""
          })
          setSuccess(true);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        setError(true);
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="card-no-gap p--20 pageHeight">
        {success ? (
          <div className="small--block">
            <div className="block--title block--back--link text--center mb--32">
              <img src="/images/email-verify-icon.svg" />
              <h1>Thanks for reaching out</h1>
              <p>Someone will get back to you soon</p>
              <Link href="#">
                <a onClick={() => setSuccess(false)}>Go Back</a>
              </Link>
            </div>
          </div>
        ) : (
          <div className="small--block">
            <div className="block--title block--back--link text--center mb--32">
              <h1>Help & Support</h1>
            </div>

            {error && (
              <div
                className=""
                style={{ border: "1px solid red", margin: "20px" }}
              >
                <p
                  style={{ textAlign: "center", padding: "10px", color: "red" }}
                >
                  {errorMessage}
                </p>
              </div>
            )}
            <form className="site--form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form--item">
                <div style={{ display: "flex" }}>
                  <input
                    style={{ width: "100%" }}
                    className={`form--control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    type="text"
                    id="title"
                    placeholder="Enter Title"
                    {...register("title", {
                      required: true,
                      minLength: 10,
                      maxLength: 30,
                    })}
                  />
                </div>
                <label className="form--label" htmlFor="title">
                  Title
                </label>
                <div className="invalid-feedback">
                  {errors.title?.type === "required" && "Title is required"}
                  {errors.title?.type === "minLength" &&
                    "Title should be atleast 10 characters"}
                  {errors.title?.type === "maxLength" &&
                    "Title should be less than 30 characters"}
                </div>
              </div>

              <div className="form--item">
                <textarea
                  style={{ width: "100%" }}
                  className={`form--control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="description"
                  placeholder="Description"
                  {...register("description", {
                    required: true,
                    maxLength: 200,
                    minLength: 10,
                  })}
                />

                <label className="form--label" htmlFor="description">
                  Description
                </label>
                <div className="invalid-feedback">
                  {errors.description?.type === "required" &&
                    "Description is required"}
                  {errors.description?.type === "minLength" &&
                    "Description should be atleast 10 characters"}
                  {errors.description?.type === "maxLength" &&
                    "Description should be less than 200 characters"}
                </div>
              </div>

              <div className="form--actions">
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default HelpSupport;
