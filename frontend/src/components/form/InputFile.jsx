import { useState } from "react";

function InputFile({ size = "full", loading, ...props }) {
    const [ fileName, setFileName ] = useState("No file uploaded!");
    const [ fileIsSubmited, setFileIsSubmited ] = useState(false);

    function handleChange(event) {
        event.preventDefault();

        const filename = event.target.files[0].name;

        setFileName(filename);
        setFileIsSubmited(true);
    } 

    const style = `
        flex relative justify-center items-center overflow-hidden gap-4 rounded-md backdrop-blur-md bg-white/20 bg-opacity-10 border-2 border-dashed border-gray-500/30 hover:border-gray-500/80 transition-all ease-linear shadow-custom-md shadow-black/5
        ${ size === "full" ? 'h-full w-full' : ' h-48 w-48' }
    `
    return (
        <div className={ style }>
            <div className={`absolute pointer-events-none m-4 ${ fileIsSubmited ? 'text-black' : 'text-gray-400'}` }>{ fileName }</div>
            <input 
                type="file"
                name="file"
                onChange={ handleChange }
                className="flex text-gray-400 p-4 items-center justify-center w-full h-full bg-transparent outline-none opacity-0"
                disabled={ loading && true }
                { ...props }
            />
        </div>
    );
}

export default InputFile;