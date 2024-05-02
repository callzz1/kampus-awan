import { useContext, useState } from "react";
import { GlobalContext } from "../../App";
import InputText from "../../components/form/InputText";
import InputPassword from "../../components/form/InputPassword";
import Submit from "../../components/form/Submit";
import { Link, useNavigate } from "react-router-dom";

function Login() { 
    const { setIsLoggedIn } = useContext(GlobalContext);
    
    const navigate = useNavigate();

    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        
        const username = event.target.username.value;
        const userpassword = event.target.userpassword.value;

        setLoading(() => true);

        try {
            const req = await fetch("/api/login", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    userpassword: userpassword
                })
             });

            const res = await req.json();

            alert(res.message);
            
            if(!res.error) {
                setIsLoggedIn(() => true);
                navigate("/");
            }            
        } catch(err) {
            console.log("Failed authenticate user!");
            throw err;
        }

        setLoading(() => false);
    }

    return (
        <>
            <h1 className="text-3xl font-semibold">Login</h1>
            <form className="flex flex-col gap-2 w-full" method="POST" onSubmit={ handleSubmit }>
                <InputText placeholder="Username" name="username" required autoFocus loading={ loading } />
                <InputPassword placeholder="Password" name="userpassword" required loading={ loading } />
                <Submit value="Login" loading={ loading } />
                <p>
                    Belum memiliki akun? <Link to="/user/register" className="text-blue-500 underline font-semibold">Register</Link>
                </p>
            </form>
        </>
    )
}

export default Login;