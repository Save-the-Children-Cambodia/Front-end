import React, { useEffect, useState } from 'react';
import '../assets/style/Banner1.css';
import Slider from "react-slick";
import { db } from '../firebaseConfig.js';
import { collection, getDocs } from "firebase/firestore";


export default function Banner() {
  



  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };

  const [bannerUrls, setBannerUrls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const bannerCollection = collection(db, 'Banner');
                const querySnapshot = await getDocs(bannerCollection);
                const urls = querySnapshot.docs.map(doc => doc.data().url);
                setBannerUrls(urls);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching banners:', error);
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);
  
  return (
    <div className="slider-container">
    <Slider {...settings}>
<<<<<<< HEAD
      <div className="bn-banner-img">
        <img src="https://www.unicef.org/cambodia/sites/unicef.org.cambodia/files/styles/hero_tablet/public/nicksells.com%20HR_12252.jpg.webp?itok=CjVSYpKC" alt="" />
=======
        {bannerUrls.map((url, index) => (
            <div className="bn-banner-img" key={index}>
                <img src={url} alt={`Banner ${index + 1}`} />
            </div>
        ))}
      {/* {bannerUrls.map((url, index) => (
          <div className="banner-img" key={index}>
              <img src={url} alt={`Banner ${index + 1}`} />
          </div>
      ))} */}
      {/* <div className="bn-banner-img">
        <img src="https://i.pinimg.com/736x/d3/93/4c/d3934c4a108118c33d94263cecb9a746.jpg" alt="" />
>>>>>>> b458ab45cd805c025f381ad315cd8e248f8f4d26
      </div>
      <div className="bn-banner-img">
        <img src="https://www.worldbank.org/content/dam/photos/780x439/2020/jan/cambodia-parent-program.jpg" alt="" />
      </div>
      <div className="bn-banner-img">
        <img src="https://justbluedutch.files.wordpress.com/2016/01/filipino-children.jpg?w=640" alt="" />
      </div>
      <div className="bn-banner-img">
<<<<<<< HEAD
        <img src="https://static.wixstatic.com/media/90f9f5_d9dc8c4b36434f5aaa484cad43f7f3be~mv2.jpg/v1/fill/w_640,h_410,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/90f9f5_d9dc8c4b36434f5aaa484cad43f7f3be~mv2.jpg" alt="" />
      </div>
=======
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/8918b1120170073.60aca64d5b749.png" alt="" />
      </div>
      <div className="bn-banner-img">
        <img src="https://wallpapercave.com/wp/wp11268570.jpg" alt="" />
      </div>
      <div className="bn-banner-img">
        <img src="https://images3.alphacoders.com/132/1328547.png" alt="" />
      </div> */}
>>>>>>> b458ab45cd805c025f381ad315cd8e248f8f4d26
    </Slider>
    </div>
  );
}


