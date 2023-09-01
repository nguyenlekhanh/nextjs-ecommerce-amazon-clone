import sliderImg_1 from "@/images/slider/sliderImg_1.jpg";
import sliderImg_2 from "@/images/slider/sliderImg_2.jpg";
import sliderImg_3 from "@/images/slider/sliderImg_3.jpg";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative">
      <div>
        <Image priority src={sliderImg_1} alt="sliderImg" />
      </div>
      <div className="w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20"></div>
    </div>
  );
};

export default Banner;
