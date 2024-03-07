import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    
      <div className="bg-indigo-950 flex h-screen relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10">
          <h1 className="absolute mt-56 text-white ml-36 text-8xl">
            My Project
          </h1>
          <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white absolute mt-36 right-0 mr-36 ">
            <h2 className="text-2xl font-bold pb-5">Sign In</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                  placeholder="abcd@gmail.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                  placeholder="*********"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <button
                  type="submit"
                  className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
                >
                  Submit
                </button>
                <div className="flex items-center text-sm">
                  <p>New here?</p>
                  <Link to="/reg" className="underline cursor-pointer ml-1">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Signup;