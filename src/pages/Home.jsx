import React from 'react';
import Banner from '../components/Banner';
import Event from '../components/Event';
import Promo from '../components/Promo';
import Information from '../components/Infirmation';
import Vinotheque from '../components/Vinotheque';
import AgeConfirm from '../components/AgeConfirm';

function Home({ onClosedAgePopup }) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [agePopUp, setAgePopUp] = React.useState(false);

  React.useEffect(() => {
    const isPopupOpen = localStorage.getItem('isPopupOpen');
    setTimeout(() => {
      if (!isPopupOpen) {
        setAgePopUp(true);
        localStorage.setItem('isPopupOpen', true);
      }
    }, 1000);
  }, []);

  onClosedAgePopup = () => {
    setAgePopUp(false);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 200);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Banner />
      {isMobile ? (
        <>
          <Promo />
          <Event />
        </>
      ) : (
        <>
          <Event />
          <Promo />
        </>
      )}
      <Information />
      {agePopUp && (
        <div className="overlay-modal">
          <AgeConfirm onClosedAgePopup={onClosedAgePopup} />
        </div>
      )}
      <Vinotheque />
    </>
  );
}

export default Home;
