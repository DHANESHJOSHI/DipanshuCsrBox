"use client";

import "../styles/home.css";
import { useAuthStore } from "../store/auth";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const [inputValue, setInputValue] = useState([]);
  const auth = useAuthStore((state) => state.auth.user);
  const [isClient, setIsClient] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const { register, handleSubmit } = useForm();
  const storeSignIn = useAuthStore((state) => state.signIn);
  const updateTeamMembers = useAuthStore((state) => state.updateTeamMembers);
  const storeSignout = useAuthStore((state) => state.signOut);

  useEffect(() => {
    setIsClient(true);
    // Set initialLoadComplete to true after the first render
    setInitialLoadComplete(false);
  }, []);

  useEffect(() => {
    // Reload the page only if initialLoadComplete is true
    if (initialLoadComplete) {
      window.location.reload();
    }
  }, [initialLoadComplete]);

  const handleSignout = () => {
    storeSignout();
  };

  if (!isClient) return null;

  return (
    <>
      <main className="bg-[url('/2306_30_IDL_gallery.jpg')] bg-cover bg-no-repeat bg-center flex items-center justify-center py-4">
        <div className="bg-white rounded-tl-3xl rounded-tr-3xl shadow-xl text-center w-[90vw] md:w-[60vw] p-4">
          <div className="flex flex-col md:flex-row justify-between gap-2 items-center px-2">
            <div className="flex flex-row-reverse">
              <h2>
                <img
                  src="https://www.skillsbuildcsrbox.in/assets/img/skillbuildlogo.png"
                  className="w-48 md:w-64 p-4"
                  id="IBMLogo"
                  alt=""
                />
              </h2>
            </div>
            <div>
              <button
                className="transition ease-in-out delay-150 text-sm transform hover:-translate-y-1 mt-4 md:mt-0 hover:scale-110 duration-300 py-2 px-4 text-white rounded-lg bg-[#002d9c]"
                onClick={handleSignout}
              >
                Signout
              </button>
            </div>
            <div className="flex flex-row-reverse">
              <h2>
                <img
                  src="https://csrbox.org/images/csrbox_logo.png"
                  className="w-32 md:w-48"
                  alt=""
                  id="csrLogo"
                />
              </h2>
            </div>
          </div>
          <div className="text-xl md:text-3xl text-[#002d9c] font-bold py-4">
            <h1>IBM SkillsBuild Internship Program 2024</h1>
          </div>

          <div>
            <div className="p-4">
              <div className="student-details">
                <div className="flex flex-col mt-3">
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-row gap-2">
                      <h5 className="text-[#002d9c] font-bold">
                        Welcome Team :{" "}
                        <b className="text-[#4f5050]">{auth?.teamName}</b>
                      </h5>
                    </div>
                    <div className="flex flex-row gap-2">
                      <h4 className="text-[#002d9c] font-bold">UniqueID</h4> :
                      <p className="text-[#4f5050]">{auth?.uniqueID}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <h4 className="text-[#002d9c] font-bold">College Name</h4> :
                      <p className="text-[#4f5050]">{auth?.members[0].collegeName}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <h4 className="text-[#002d9c] font-bold">Total Members</h4> :
                      <p className="text-[#4f5050]">{auth?.totalMembers}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                      <h4 className="text-[#002d9c] font-bold">Female Members</h4> :
                      <p className="text-[#4f5050]">{auth?.femaleMembers}</p>
                    </div>

                    <div className="flex flex-row gap-8 mb-1">
                      <button
                        className="transition ease-in-out delay-150 text-sm transform hover:-translate-y-1 mt-4 md:mt-0 hover:scale-110 duration-300 py-2 px-4 text-white rounded-lg bg-[#002d9c]"
                        onClick={() => window.open(auth?.finalDeliverable, "_blank")}
                      >
                        SUBMIT DELIVERABLES
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="block overflow-y-auto h-48 md:h-64 lg:h-96">
                    <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
                            No
                          </th>
                          <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
                            Name
                          </th>
                          <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
                            Team Name
                          </th>
                          <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
                            Number
                          </th>
                          <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
                            College
                          </th>
                          <th scope="col" className="px-2 py-1 md:px-6 md:py-3">
                            Course Completion
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-left rtl:text-right font-bold text-black dark:text-white">
                        {auth?.members?.map((item, index) => (
                          <tr
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            key={index}
                          >
                            <td className="px-2 py-1 md:px-6 md:py-4">{index + 1}</td>
                            <td className="px-2 py-1 md:px-6 md:py-4">{item.name}</td>
                            <td className="px-2 py-1 md:px-6 md:py-4">{auth.teamName || 'No Team Name'}</td>
                            <td className="px-2 py-1 md:px-6 md:py-4">{item.number}</td>
                            <td className="px-2 py-1 md:px-6 md:py-4">{auth.collegeName || 'No Unique ID'}</td>
                            <td className="px-2 py-1 md:px-6 md:py-4">
                              {typeof item.percentage === 'string' && (item.percentage.startsWith('http://') || item.percentage.startsWith('https://')) ? (
                                <button
                                  className="transition ease-in-out delay-150 text-sm transform hover:-translate-y-1 hover:scale-110 duration-300 py-2 px-4 md:px-5 text-white rounded-lg bg-[#246fca]"
                                  onClick={() => window.open(item.percentage, "_blank")}
                                >
                                  Fill This Form
                                </button>
                              ) : (
                                <span>{`${item.percentage|| "PercentageNotSet" }%`}</span> //updated
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
