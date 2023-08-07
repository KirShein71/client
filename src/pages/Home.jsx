import React from 'react';
import Banner from '../components/Banner';
import Event from '../components/Event';
import Promo from '../components/Promo';
import Information from '../components/Infirmation';
import Vinotheque from '../components/Vinotheque';
import AgeConfirm from '../components/AgeConfirm';

function Home({ onClosedAgePopup }) {
  const [agePopUp, setAgePopUp] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    let pop_status = localStorage.getItem('pop_status');
    setTimeout(() => {
      if (!pop_status) {
        setAgePopUp(false);
        localStorage.setItem('pop_status', 1);
      }
    }, 1000);
  }, []);

  onClosedAgePopup = () => {
    setAgePopUp(false);
  };
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
      <Vinotheque />
      {agePopUp && (
        <div className="overlay">
          <AgeConfirm onClosedAgePopup={onClosedAgePopup} />
        </div>
      )}
    </>
  );
}

export default Home;
