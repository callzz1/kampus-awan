function TextArea({ placeholder, icon, loading, rows = "10", ...props }) {

    return (
        <div className="flex items-center gap-4 p-2 px-4 rounded-md backdrop-blur-md bg-white/20 bg-opacity-10 border border-gray-500/30 focus-within:border-gray-500/80 transition-all ease-linear shadow-custom-md shadow-black/5">
            { icon }
            <textarea
                type="text" 
                className="bg-transparent w-full outline-none resize-none"
                placeholder={ loading ? 'Loading...' : placeholder }  
                disabled={ loading && true }
                rows={ rows }
                { ...props }
            ></textarea> 
        </div>
    );
}

export default TextArea;