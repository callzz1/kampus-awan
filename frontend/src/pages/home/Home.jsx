import CourseList from "../../components/CourseList";
import Banner from "../../components/UI/Banner";

function Home() {
    return (
        <div className="flex flex-col gap-8">         
            <Banner />
            <CourseList title="Rekomendasi untuk anda" query={{ sort: "random", limit: 6 }} />
            <CourseList title="Populer" query={{ order: "name", sort: "random", limit: 6  }} />
            <CourseList title="Baru ditambahkan" query={{ order:"createdAt", sort: "desc", limit: 6  }} />
        </div>
    )
}

export default Home;