import CourseList from "../../components/CourseList";
import Banner from "../../components/UI/Banner";
// import NoticeBox from "../../components/UI/NoticeBox";

function Home() {
    return (
        <>
            {/* <NoticeBox></NoticeBox> */}
            <Banner />
            <CourseList title="Rekomendasi untuk anda" query={{ sort: "random" }} />
            <CourseList title="Populer" query={{ order: "name", sort: "random" }} />
            <CourseList title="Baru ditambahkan" query={{ order:"createdAt", sort: "desc" }} />
            <CourseList title="Teknologi" query={{ order: "id", sort: "asc" }} />
            <CourseList title="Desain" query={{ order: "id", sort: "desc" }} />
            <CourseList title="Bisnis" query={{ order: "id", sort: "random" }} />        
        </>
    )
}

export default Home;