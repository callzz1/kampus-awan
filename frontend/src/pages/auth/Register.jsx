import InputPassword from "../../components/form/InputPassword";
import InputText from "../../components/form/InputText";
import Submit from "../../components/form/Submit";
import InputFile from "../../components/form/InputFile";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() { 
    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        setLoading(() => true);

        try {
            const req = await fetch("/api/register", { 
                method: "POST",
                body: data
             });

            const res = await req.json();

            alert(res.message);

            if(!res.error) {
                navigate("/user/login")
            }
        } catch(e) {
            throw `Failed to create an account!`
        }

        setLoading(() => false);
    }

    return (
        <>
            <h1 className="text-3xl font-semibold">Register</h1>
            <form className="flex flex-col gap-2 w-full" method="POST" onSubmit={ handleSubmit }>
                <InputText placeholder="Username" name="username" required autoFocus loading={ loading } />
                <InputText placeholder="Email" name="email" required loading={ loading } />
                <InputPassword placeholder="Password" name="password" required loading={ loading } />
                <InputPassword placeholder="Confirm Password" name="confirm_password" required loading={ loading } />
                <label htmlFor="file">Foto profil (png, jpg, jpeg, webp) (max. 1mb)</label>
                <InputFile name="file" loading={ loading } />
                <Submit value="Register" loading={ loading } />          
                <p>
                    Sudah memiliki akun? <Link to="/user/login" className="text-blue-500 underline font-semibold">Login</Link>
                </p>      
            </form>
        </>
    )
}

export default Register;