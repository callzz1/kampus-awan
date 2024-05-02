function Submit({ icon, type = "submit", value = "Submit", loading = false, ...props }) {

    return (
        <div className={ `flex items-center gap-4 p-2 rounded-md backdrop-blur-md transition-all ease-linear shadow-custom-md shadow-black/5 ${ loading ? 'bg-gray-400 text-gray-600' : 'bg-blue-500 hover:bg-blue-600 text-white'  }`}>
            { icon }
            <input 
                type={ type } 
                className="bg-transparent w-full outline-none font-semibold"
                value={ value }
                disabled={ loading && true }
                { ...props }
            />
        </div>
    );
}

export default Submit;