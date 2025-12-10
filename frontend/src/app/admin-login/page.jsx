'use client'
import { axiosInstance, notify } from '@/library/helper';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function AdminLoginPage() {
    const router = useRouter()
    function loginHandler(e) {
        e.preventDefault()

        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        axiosInstance.post("admin/login", data, { withCredentials: true }).then((response) => {
            notify(response.data.message, response.data.success)
            if (response.data.success) {
                router.push("/admin")
                console.log(response.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center p-4">
            <div className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">

                <h1 className="text-3xl font-bold text-center text-white mb-8">
                    Admin Login
                </h1>

                <form className="space-y-6" method="POST" onSubmit={loginHandler}>
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            name='email'
                            className="w-full rounded-xl bg-white/10 border border-white/20 text-gray-100 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full rounded-xl bg-white/10 border border-white/20 text-gray-100 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-200"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-400 text-xs mt-6">
                    © Admin Panel — Secure Access
                </p>
            </div>
        </div>
    );
}
