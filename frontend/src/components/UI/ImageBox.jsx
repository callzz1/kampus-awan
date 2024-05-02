function ImageBox({ url = "", alt = "" }) {
    return (
        <img 
            src={ url } 
            alt={ alt } 
            className="small:self-center h-48 w-48 max-h-48 max-w-48 aspect-square bg-gray-300 rounded-lg object-cover" 
            loading="lazy" 
        />
    );
}

export default ImageBox;