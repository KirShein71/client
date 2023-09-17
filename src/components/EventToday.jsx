import React from 'react';
import { AppContext } from './AppContext';
import { observer } from 'mobx-react-lite';
import { fetchAllEvents } from '.././http/productApi';

const EventToday = observer(() => {
  const { event } = React.useContext(AppContext);
  const [selectedEventIndex, setSelectedEventIndex] = React.useState(null);

  const onOpenEventModal = (index) => {
    setSelectedEventIndex(index);
  };

  React.useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = selectedEventIndex !== null ? 'hidden' : 'auto';
  }, [selectedEventIndex]);

  React.useEffect(() => {
    fetchAllEvents().then((data) => (event.events = data));
  }, [event]);

  return (
    <div className="event__today">
      <h2 className="event__today-title">Ближайшие мероприятия</h2>
      <div className="event__today-content">
        {event.events.map((eventItem, index) => (
          <React.Fragment key={index}>
            <div onClick={() => onOpenEventModal(index)} className="event__today-image">
              <img src={process.env.REACT_APP_IMG_URL + eventItem.image} alt="event__today" />
            </div>
            {selectedEventIndex === index && (
              <>
                <div className="overlay-modal">
                  <div class="modal">
                    <article class="modal-container">
                      <button class="icon-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          onClick={() => setSelectedEventIndex(null)}>
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            fill="currentColor"
                            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                          />
                        </svg>
                      </button>
                      <header class="modal-container-header">
                        <h1 class="modal-container-title">{eventItem.name}</h1>
                      </header>
                      <section class="modal-container-body rtf">
                        <h2>{eventItem.place}</h2>
                        <h2>{eventItem.date}</h2>
                        <pre>{eventItem.description}</pre>
                        <p className="modal__ticket">
                          Бронь билетов:{' '}
                          <a href={eventItem.link} className="event-today__modal-link">
                            {eventItem.link}
                          </a>
                        </p>
                        <p className="modal__ticket">
                          WhatsApp:{' '}
                          <a href={eventItem.whatsapp} className="event-today__modal-link">
                            {eventItem.whatsapp}
                          </a>
                        </p>
                        <p className="modal__ticket">
                          Telegram:{' '}
                          <a href={eventItem.telegram} className="event-today__modal-link">
                            {eventItem.telegram}
                          </a>
                        </p>
                        <p className="event-today__modal-text">{eventItem.responsible}</p>
                      </section>
                    </article>
                  </div>
                </div>
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

export default EventToday;
