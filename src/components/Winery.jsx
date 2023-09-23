import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { AppContext } from './AppContext';
import { Tooltip } from 'react-tooltip';

const Winery = observer(() => {
  const { product } = React.useContext(AppContext);
  const [popupWinery, setPopupWinery] = React.useState(false);
  const navigate = useNavigate();
  const wineryRef = React.useRef();

  const handleClickWinery = (wineryId) => {
    if (wineryId === product.winery) {
      product.winery = null;
    } else {
      product.winery = wineryId;
    }
    // при каждом клике добавляем в историю браузера новый элемент
    const params = {};
    if (product.category) params.category = product.category;
    if (product.winery) params.winery = product.winery;
    if (product.year) params.year = product.year;
    if (product.page > 1) params.page = product.page;
    navigate({
      pathname: '/catalog',
      search: '?' + createSearchParams(params),
    });
    setPopupWinery(false);
  };

  React.useEffect(() => {
    const hadleClickOutside = (e) => {
      if (wineryRef.current && !wineryRef.current.contains(e.target)) {
        setPopupWinery(false);
      }
    };

    document.body.addEventListener('click', hadleClickOutside);

    return () => {
      document.body.removeEventListener('click', hadleClickOutside);
    };
  });

  return (
    <div className="wineries" ref={wineryRef}>
      <div className="wineries__title" onClick={() => setPopupWinery(!popupWinery)}>
        Винодельня:
      </div>
      {popupWinery && (
        <div className="wineries__popup">
          <ul>
            {product.wineries.map((wineries) => (
              <li
                key={wineries.id}
                active={wineries.id === product.winery}
                onClick={() => handleClickWinery(wineries.id)}
                data-tooltip-id="winery-tooltip"
                data-tooltip-content={`${wineries.description}`}
                data-tooltip-place="right">
                {wineries.name}
              </li>
            ))}
          </ul>
          <Tooltip id="winery-tooltip" style={{ width: '50%' }} />
        </div>
      )}
      {product.winery && (
        <div className="wineries__selected">
          {product.wineries.find((winery) => winery.id === product.winery).name}
        </div>
      )}
    </div>
  );
});

export default Winery;
