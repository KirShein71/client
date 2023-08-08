import React from 'react';
import { AppContext } from './AppContext';
import { observer } from 'mobx-react-lite';
import { fetchAllBanners } from '.././http/productApi';

const SliderShow = observer(() => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { banner } = React.useContext(AppContext);
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    fetchAllBanners().then((data) => {
      banner.banners = data;
      setImages(
        data.map((bannerItem) => (
          <img src={process.env.REACT_APP_IMG_URL + bannerItem.image} alt="Banner" />
        )),
      );
    });
  }, [banner]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => {
        const res = current === images.length - 1 ? 0 : current + 1;
        return res;
      });
    }, 9000);
    return () => clearInterval(interval);
  }, [images]);

  const prevImgIndex = activeIndex ? activeIndex - 1 : images.length - 1;
  const nextImgIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;

  return (
    <div className="slidershow">
      <div className="slider">
        <div className="slider-img slider-img-prev" key={prevImgIndex}>
          {images[prevImgIndex]}
        </div>
        <div className="slider-img" key={activeIndex}>
          {images[activeIndex]}
        </div>
        <div className="slider-img slider-img-next" key={nextImgIndex}>
          {images[nextImgIndex]}
        </div>
      </div>
    </div>
  );
});

export default SliderShow;
