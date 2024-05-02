import { useNavigate } from "react-router-dom";
import InputText from "./InputText";
import { RiSearchLine  as SearchIcon } from "react-icons/ri";

function SearchBar({ placeholder = "Search" }) {    
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        const value = event.target.searchbar.value;
        
        // replace / to prevent routing error
        const cleanValue = value.replace("/", "");

        navigate(`/search/${ cleanValue }`);
    }

    return (
        <form onSubmit={ handleSubmit } method="POST" className="h-auto w-full">
            <InputText 
                icon={ <SearchIcon className="text-gray-400" /> } 
                placeholder={ placeholder } 
                name="searchbar"
            ></InputText>
        </form>
    )
}

export default SearchBar;