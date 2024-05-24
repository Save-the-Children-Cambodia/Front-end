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
      <div className="bn-banner-img">
        <img src="https://www.unicef.org/cambodia/sites/unicef.org.cambodia/files/styles/hero_tablet/public/nicksells.com%20HR_12252.jpg.webp?itok=CjVSYpKC" alt="" />
        {bannerUrls.map((url, index) => (
            <div className="bn-banner-img" key={index}>
                <img src={url} alt={`Banner ${index + 1}`} />
            </div>
        ))}
      </div>
    </Slider>
    </div>
  );
}


