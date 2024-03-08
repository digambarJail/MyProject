import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [name, setName] = useState('');
    const [checkPass, setCheckPass] = useState(false);
    const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
    const [userExist, setUserExist] = useState(false);

    const handleCheckBoxClick = () => {
        setIsCheckBoxChecked(!isCheckBoxChecked);
    }

    useEffect(() => {
        setCheckPass(password === confPassword);
    }, [password, confPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!checkPass) {
            alert('Passwords should match!');
            return;
        }

        if (!isCheckBoxChecked) {
            alert('Please accept the terms and conditions');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, name })
            });

            if (!response.ok) {
                if (response.status === 400) {
                    alert("Email already exists!");
                    setUserExist(true);
                    return;
                }
            }

            const data = await response.json();
            const { token } = data;

            localStorage.setItem('token', token);
            navigate('/posts');
        } catch (error) {
            console.error("Error in fetching:", error);
        }
    };

    return (
        <div className="bg-indigo-900 min-h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-md shadow-md w-96">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} action="/profile" method="post" encType="multipart/form-data">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Your email<span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="abcd@gmail.com"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {userExist && <p className="text-red-500 mb-2">Email already exists!</p>}

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Password<span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="*********"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confPassword" className="block text-sm font-medium mb-2">
                            Confirm Password<span className="text-red-500"> *</span>
                        </label>
                        <input
                            type="password"
                            name="confPassword"
                            className="border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="*********"
                            value={confPassword}
                            required
                            onChange={(e) => setConfPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {!checkPass && <p className="text-red-500 mb-2">Passwords do not match</p>}

                    <label className="flex items-center mb-4">
                        <input type="checkbox" className="mr-2" checked={isCheckBoxChecked} onChange={handleCheckBoxClick} />
                        <span className="text-sm">Accept Terms and Conditions</span>
                    </label>

                    {!isCheckBoxChecked && <p className="text-red-500 mb-2">Please accept Terms & Conditions</p>}

                    <button
                        type="submit"
                        className="bg-indigo-600 text-white rounded-lg py-2.5 px-6 w-full transition duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;


