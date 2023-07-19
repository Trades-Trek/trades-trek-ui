import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import { userService } from "../../services/user.service";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Transaction from "../Table/Transaction";
import { setUser } from "../../actions/users";
import banks from "./bankDetails";
import BankComboBox from "./ComboBox";

export default function RequestAmount() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [userAmount, setUserAmount] = useState(0);
  const { user } = useSelector((state) => state.userWrapper);
  const [transactionList, setTransactionList] = useState();
  const [bankList, setBankList] = useState(banks);
  const [bankCodeAndName, setBankCodeAndName] = useState({
    bankName: "",
    bankCode: "",
  });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const typedInAccountNumber = watch('accountNumber')


  const onSubmit = (data) => {
    userService
      .addTransaction({
        accountName: data.accountName,
        accountNumber: data.accountNumber,
        bankName: data.bankName,
        reqAmount: data.amount,
      })
      .then((res) => {
        if (res?.success === true) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          reset({
            accountName: "",
            accountNumber: "",
            bankName: "",
            amount: "",
          });
          getTransactionList();
          userInfo();
        } else {
          setError(true);
          setErrorMessage(res.message);
        }
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.message);
      });
  };
  const getTransactionList = () => {
    userService
      .getTransaction()
      .then((res) => {
        if (res.success) {
          setTransactionList(res.data);
        }
      })
      .catch((err) => console.log("errr", err.message));
  };
  useEffect(() => {
    setUserAmount(user?.user?.walletAmount);
    getTransactionList();
    bankDetail();
    getBanks();
  }, [user]);

  const getBanks = () => {
    userService
      .getBanks()
      .then((res) => {
        if (res.status) {
          setBankList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userInfo = () => {
    userService
      .userInfo()
      .then((res) => {
        if (res.success) {
          dispatch(setUser(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const bankDetail = () => {
    userService
      .getBankDetail()
      .then((res) => {
        if (res.success) {
          reset({
            bankName: res?.data?.bankName,
            accountName: res?.data?.accountName,
            accountNumber: res?.data?.accountNumber,
          });
          // console.log('bank',res.data)
          // setTransactionList(res.data);
        }
      })
      .catch((err) => console.log("errr", err.message));
  };

  const allowOnlyNumbers = (event) => {
    const keyCode = event.which || event.keyCode;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^\d+$/; // Regex pattern to match only digits
  
    if (!regex.test(keyValue)) {
      event.preventDefault();
    }
  };
  
  const handleAccountNumberBlur = () => {
    if (typedInAccountNumber >= 10 && bankCodeAndName.bankCode) {
      // Make the API request to verify the account number
      userService
        .verifyAccountNumber({
          account_number: accountNumber,
          bank_code: bankCodeAndName.bankCode,
        })
        .then((res) => {
          console.log(res,  '..............')
          // Handle the response as needed
        })
        .catch((error) => {
          console.log(error)
          // Handle the error as needed
        });
    }
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
        <div className="referralWidth">
          <div className="block--title block--back--link text--center mb--32">
            <h1>Bank Info</h1>
          </div>

          {error && (
            <div
              className=""
              style={{ border: "1px solid red", margin: "20px" }}
            >
              <p style={{ textAlign: "center", padding: "10px", color: "red" }}>
                {errorMessage}
              </p>
            </div>
          )}
          <form className="site--form" onSubmit={handleSubmit(onSubmit)}>
            <BankComboBox
              bankList={bankList}
              setBankCodeAndName={setBankCodeAndName}
            />

            {bankCodeAndName.bankCode && (
              <div className="form--item">
                <input
                onKeyPress={allowOnlyNumbers}
                onBlur={() => {
                 console.log('hello')
                }}
                  style={{ width: "100%" }}
                  className={`form--control ${
                    errors.accountNumber ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="accountNumber"
                  placeholder="Enter Account Number"
                  {...register("accountNumber", {
                    required: true,
                    pattern: /^\d{10}$/, // Regex pattern for exactly 10 digits
                  })}
                />
                <label className="form--label" htmlFor="accountNumber">
                  Account Number
                </label>
                <div className="invalid-feedback">
                  {errors.accountNumber?.type === "required" &&
                    "Account Number is required"}
                  {errors.accountNumber?.type === "pattern" &&
                    "Account Number should be exactly 10 digits"}
                </div>
              </div>
            )}

            <div className="form--item">
              <input
                disabled
                style={{ width: "100%", borderTop: 'none !important' }}
                className={`form--control  !important ${
                  errors.accountName ? "is-invalid" : ""
                }`}
                type="text"
                id="accountName"
                placeholder="Account Name"
                {...register("accountName", {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                })}
              />

              <label className="form--label" htmlFor="accountName">
                Account Name
              </label>
              <div className="invalid-feedback">
                {errors.accountName?.type === "required" &&
                  "Account name is required"}
                {errors.accountName?.type === "minLength" &&
                  "Account name should be atleast 3 characters"}
                {errors.accountName?.type === "maxLength" &&
                  "Account name should be less than 30 characters"}
              </div>
            </div>

       
            <div className="form--item">
              <input
                style={{ width: "100%" }}
                className={`form--control ${errors.amount ? "is-invalid" : ""}`}
                type="text"
                id="amount"
                placeholder="Enter amount"
                {...register("amount", {
                  required: true,
                  pattern: {
                    value: /^[0-9]+$/,
                  },
                  min: 1,
                  validate: (value) => {
                    if (userAmount < value) {
                      return "Insufficient balance";
                    }
                  },
                })}
              />

              <label className="form--label" htmlFor="amount">
                Amount
              </label>
              <div className="invalid-feedback">
                {errors.amount?.type === "required" && "Amount is required"}
                {errors.amount?.type === "validate" && errors.amount?.message}

                {errors.amount?.type === "min" && "Amount is greater then 0"}
              </div>
            </div>

            <div className="form--actions">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="transactionTable">
          {transactionList && <Transaction transactionList={transactionList} />}
        </div>
      </div>
      <Footer />
    </>
  );
}
