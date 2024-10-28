"use client"
import React , {useState} from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function Registerpage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { data: session } = useSession();
    if (session) redirect("welcome");


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setError("Password do not match");
            return;
        }

        if (!name || !email || !password || !confirmPassword) {
            setError("Please complete all inputs");
            return;
        }

        try{
            
            const resUserExists = await fetch("http://localhost:3000/api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
            
            const { user } = await resUserExists.json();
            
            if (user) {
                setError("User already exists.");
                return;
            }



            const res = await fetch("http://localhost:3000/api/register" , {
                method: "POST" ,
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    name , email , password
                })
            }) 

            if (res.ok){
                const form = e.target;
                setError("")
                setSuccess("User regitered successfully.")
                form.reset();
            }
        }catch(error){
            console.log("Error during register " , error);
        }
            
            

    
    
    }

  return (
    <div>
        <Navbar />
            <div className='flex-grow'>
                <div className='flex justify-center items-center'>
                    <div className='w-[400px] shadow-xl p-10 mt-5 rounded-xl'>
                        <h3 className='text-3xl'>Register</h3>
                        <hr className='my-3' />
                        <form onSubmit={handleSubmit}>
                            
                       

                            <input type="text" onChange={(e) => setName(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your name' />
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your email' />
                            <input type="password"  onChange={(e) => setPassword(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Enter your password' />
                            <input type="password"  onChange={(e) => setConfirmPassword(e.target.value)} className='w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2' placeholder='Confirm your password' />
                            <button className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2' type='submit'>Sign Up</button>
                            {error && (
                                <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
                                    {success}
                                </div>
                            )}
                            <hr className='my-3' />
                            <p>
                                Already have an account? Go go <Link href="/login" className='text-blue-500 hover:underline'>Login</Link> Page
                            </p>
                            
                        </form>
                    </div>
                </div>
            </div>
    </div>
  )
}
export default Registerpage