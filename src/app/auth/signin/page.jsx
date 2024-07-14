"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../../store/auth";
import { useForm } from "react-hook-form";
import "../../../styles/login.css";
import Image from "next/image";
import Loader from "@/components/Loader";


export default function LoginPage() {

  const router = useRouter();
  const storeSignIn = useAuthStore((state) => state.signIn);
  const [collages, setCollages] = React.useState([]);
  const { register, handleSubmit } = useForm();
  const { InternShip, InternhandleSubmit } = useForm();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const url = "https://script.google.com/macros/s/AKfycbzdFeQj6gX2rwWksBM5R8Ni9h1UhNispnJES3-m7iIc4hyfHbAzCrMvuduz5zR7VGih/exec";
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.collegeName && Array.isArray(data.collegeName) && data.collegeName.length > 0) {
          const collegeNames = data.collegeName.filter(Boolean);
          setCollages(collegeNames.sort());        
        } else {
          console.error("No data found or data is not in the expected format");
        }
      } catch (error) {
        console.error("Error fetching data or processing data:", error);
      }
    };

    fetchColleges();
  }, []);
  
  const AllColleges = collages.sort();

  const onLogin = async (user) => {
    try {
      setLoading(true);
  
      // Correctly wait for the Axios call to complete
      const response = await axios.post('/api/Login', {
        email: user.email,
        collegeName: user.collegeName,
        internshipName: user.internshipName
      });
  
      // Access the data property directly from the Axios response
      const data = response.data;
  
      // Assuming data contains the response in the format { success: true, data: { ... } }
      if (data.success && data.data) {
        console.log(data.data.data.teamDetails);
        storeSignIn(data.data.data.teamDetails);
        toast.success("Login success");
        router.push("/");
      } else {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.log("Login failed", error);
      toast.error("Login failed: " + (error.message || "Unknown Error"));
    } finally {
      setLoading(false);
    }
  };
  

  return loading ? (
    <div role="status">
      <svg
        aria-hidden="true"
        className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <>
      <div className="login-container">
        <div className="left-section">
          <div className="logo">
            <h2>
              <img
                src="https://www.skillsbuildcsrbox.in/assets/img/skillbuildlogo.png"
                className="w-64 p-4 mr-[25vh]"
                id="IBMLogo"
                alt="IBM Logo"
              />
            </h2>
          </div>
          <Image
            src="/iso-3-v2.png"
            alt="Illustration"
            className="img-fluid"
            width={720}
            height={360}
          />
        </div>
        <div className="right-section">
          <div className="logo">
            <h2>
            <h2>
              <img
                src="https://www.skillsbuildcsrbox.in/assets/img/skillbuildlogo.png"
                className="w-64 p-4 mr-[25vh]"
                id="IBMLogoRight"
                alt="IBM Logo"
              />
            </h2>
              <img
                src="https://csrbox.org/images/csrbox_logo.png"
                className="w-48 ml-[25vh]"
                alt="CSR Logo"
                id="csrLogo"
              />
            </h2>
          </div>

          <h4 className="font-bold text-xl">Welcome Students!</h4>
            <p className="font-bold text-5xl mb-2">
              Log In to your Team Dashboard
            </p>
          <form onSubmit={handleSubmit(onLogin)}>
            <div className="form-group font-bold">
              <label className="mb-4" htmlFor="email">
                Email ID
              </label>
              <input
                type="email"
                className="form-control border-primary w-[70%] bg-white text-black shadow-blue-500 shadow-md h-11"
                id="email"
                {...register("email", {
                  required: true,
                })}
              />
            </div>

            <div className="form-group bottom-10 top-10 flex-col">
              <label className="mb-2 font-bold" htmlFor="college">
                College Name
              </label>

              <select
                className="form-control border-primary  bg-white text-black shadow-blue-500 shadow-md h-12"
                id="college"
                {...register("collegeName", {
                  required: true,
                })}
              >
                <option value="Selected" disabled>Select a college</option>
                {AllColleges && AllColleges.length > 0 ? AllColleges.map((college) => (
                  <option id="collegeOption" className="text-xl" key={college} value={college}>
                    {college}
                  </option>
                )) : null}              
                </select>
            </div>

            <div className="form-group flex flex-col ">
              <label className="mb-2 font-bold " htmlFor="internship">
                Internship Name
              </label>

              <select
                className="form-control border-primary w-[70%] bg-white text-black shadow-blue-500 shadow-md h-11 text-sm"
                id="internship"
                {...register("internshipName", {
                  required: true,
                })}
              >
                  <option value="Front End Web Development">Front End Web Development</option>
                  <option value="Data Analytics">Data Analytics</option>
              </select>
            </div>

            <div className="w-full flex justify-center">
              <button type="submit" className="btn btn-primary px-4">
                LOG IN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
