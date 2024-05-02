import { useContext } from "react";
import { RiPlayFill as BookIcon, RiVerifiedBadgeFill as VerifiedIcon, RiSparkling2Fill as SparklingIcon, RiRobot2Fill as RobotIcon } from "react-icons/ri";
import { GlobalContext } from "../../App";

function Subscribe() {
    const { isLoggedIn, user, setUser } = useContext(GlobalContext);
    
    const products = [
        {
            icon: <BookIcon className="text-white w-full h-auto p-8"/>,
            title: "Akses terhadap semua konten pembelajaran."
        },
        {
            icon: <SparklingIcon className="text-white w-full h-auto p-8"/>,
            title: "Jaminan kualitas pembelajaran."
        },
        {
            icon: <VerifiedIcon className="text-white w-full h-auto p-8"/>,
            title: "Sertifikat pembelajaran yang diakui."
        },
        {
            icon: <RobotIcon className="text-white w-full h-auto p-8"/>,
            title: "Akses terhadap Chatbot pembelajaran AI."
        }
    ];

    async function handleBuy() {
        if(!isLoggedIn) {
            return alert("Kamu harus login terlebih dahulu untuk berlangganan membership!")
        }

        try {
            const request = await fetch("/api/subscribe");
            const result = await request.json();

            alert(result.message);

            if(!result.error) {
                setUser((prev) => {
                    return {
                        ...prev, 
                        is_subscribed : true 
                    }
                });
            }
        } catch(err) {
            console.log("Gagal berlangganan membership Kampus Awan!");
            throw err;
        }
    }
    return (
        <div className="flex h-full w-full flex-col items-center gap-8">
            <div className="text-3xl font-semibold bg-gradient-to-br from-indigo-300 to-blue-500 text-transparent bg-clip-text text-center">
                <h1>Jelajahi pembelajaran tak terbatas</h1>
                <h1>Hanya Rp. 199.000,00-/Bulan</h1>
            </div>

            <h1 className="font-semibold">Keuntungan yang akan anda dapatkan dengan berlangganan membership di Kampus Awan</h1>

            <div className="grid grid-cols-4 w-full gap-4 small:gap-4 small:grid-cols-2">
                {
                    products.map((product, key) => {
                        return (
                            <div key={ key } className="flex flex-col gap-4">
                                <div key={ key } className="w-full h-auto aspect-square bg-gradient-to-br from-blue-500 to-indigo-300 rounded-xl col-span-1 p-4">
                                    { product.icon }
                                </div>
                                <h1 className="text-center">
                                    { product.title }
                                </h1>
                            </div>
                        )
                    })
                }
            </div>   

            <div className="flex justify-center small:pb-4">
                {
                    !user.is_subscribed ?
                    <button  onClick={ handleBuy } className="w-full h-fit p-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold text-white text-center">
                        Berlangganan Membership
                    </button> :
                    <button disabled={ true } className="w-full h-fit p-2 px-4 bg-gray-400 text-gray-600 rounded-md font-semibold text-center">
                        Kamu telah berlangganan
                    </button>
                }
            </div>         
        </div>
    );
}

export default Subscribe;