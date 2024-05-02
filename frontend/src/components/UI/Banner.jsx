import BannerImage from "../../../public/image/Banner.png";

function Banner() {
    const image = BannerImage;

    return (
        <img src={ image } className="flex h-48 w-full aspect-square rounded-md object-cover bg-gray-400">
        </img>
    );
}

export default Banner;