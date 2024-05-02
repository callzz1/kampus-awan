import { useState } from "react";
import { RiEyeFill as EyeIcon, RiEyeOffFill as EyeCloseIcon } from "react-icons/ri";
function InputPassword({ icon, placeholder, loading, ...props }) {
    const [ peek, setPeek ] = useState(false);
    
    function handleClick(event) {
        event.preventDefault();

        console.log(event.type)
        setPeek((peek) => !peek);
    }
    return (
        <div className="flex items-center gap-4 p-2 px-4 rounded-md backdrop-blur-md bg-white/20 bg-opacity-10 border border-gray-500/30 focus-within:border-gray-500/80 transition-all ease-linear shadow-custom-md shadow-black/5">
            { icon }
            <input 
                type={ peek ? "text" : "password" }
                className="bg-transparent w-full outline-none"
                placeholder={ loading ? 'Loading...' : placeholder }  
                disabled={ loading && true }
                { ...props }
            />
            <button onMouseDown={ handleClick }>
                {
                    peek ?
                    <EyeCloseIcon /> :
                    <EyeIcon />   
                }
            </button>
        </div>
    );
}

export default InputPassword;