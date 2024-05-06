import CourseList from "../../components/CourseList";
import Banner from "../../components/UI/Banner";
import NoticeBox from "../../components/UI/NoticeBox";

function Home() {
    return (
        <div className="flex flex-col gap-8">

            <NoticeBox 
                title="Notice: Karena adanya limitasi free tier vercel, fetching data mungkin akan terjadi timeout gateway!"
            />            
            <Banner />
            <CourseList title="Rekomendasi untuk anda" query={{ sort: "random", limit: 5 }} />
            <CourseList title="Populer" query={{ order: "name", sort: "random", limit: 5  }} />
            <CourseList title="Baru ditambahkan" query={{ order:"createdAt", sort: "desc", limit: 5  }} />
        </div>
    )
}

export default Home;