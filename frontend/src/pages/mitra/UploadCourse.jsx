import { GlobalContext } from "../../App";
import { useContext, useState } from "react";
import InputText from "../../components/form/InputText";
import TextArea from "../../components/form/TextArea";
import Submit from "../../components/form/Submit";
import InputFile from "../../components/form/InputFile";
import { backendUrl } from "../../utils/backendUrl";

function UploadCourse() { 
    const { user } = useContext(GlobalContext);

    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        form.append("user_id", user.id);

        setLoading(() => true);

        try {
            const req = await fetch(`${ backendUrl }/api/courses`, { 
                method: "POST",
                body: form
             });

            const res = await req.json();
            
            alert(res.message);

        } catch(e) {
            throw `Gagal membuat pembelajaran!`
        }

        event.target.course_name.value = "";
        event.target.course_description.value  = "";
        event.target.file.value = "";

        setLoading(() => false);
    }

    return (
        <>
            <form className="flex flex-col gap-2 w-full" method="POST" onSubmit={ handleSubmit }>
                <label htmlFor="course_name">Informasi Pembelajaran</label>
                <InputText 
                    placeholder="Nama Course" 
                    name="course_name"
                    required
                    autoFocus
                    loading={ loading }
                ></InputText>
                <TextArea 
                    placeholder="Deskripsi Course"
                    name="course_description"
                    required
                    rows="10"
                    loading={ loading }
                />
                <label htmlFor="course_image">Foto pembelajaran (png, jpg, jpeg, webp) (max. 1mb)</label>
                <InputFile 
                    name="file"
                    required
                    loading={ loading }
                />
                <Submit 
                    value="Create Course"
                    loading={ loading }   
                />
            </form>
        </>
    )
}

export default UploadCourse;