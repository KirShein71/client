import React from 'react';
import events from '../events.json';

function EventAll() {
  const [eventIndex, setEventIndex] = React.useState(null);
  const onEventModal = (index) => {
    setEventIndex(index);
  };

  React.useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = eventIndex !== null ? 'hidden' : 'auto';
  }, [eventIndex]);
  return (
    <div className="event-all">
      <h2 className="event-all__title-mobile">Проведем для вас частное мероприятие</h2>
      <div className="event-all__content">
        {events.map((event, index) => (
          <React.Fragment key={index}>
            <div className="event-all__card" onClick={() => onEventModal(index)}>
              <div className="event-all__card-content">
                <div className="image-box">
                  <img src={event.img} alt="event" />
                  <div className="text-box">
                    <h3 className="event-all__card-title">{event.title}</h3>
                  </div>
                </div>
              </div>
            </div>
            {eventIndex === index && (
              <>
                <div className="overlay-modal">
                  <div class="modal__eventall">
                    <div class="card">
                      <button class="icon-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          onClick={() => setEventIndex(null)}>
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            fill="currentColor"
                            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                          />
                        </svg>
                      </button>
                      <div class="content-wrapper">
                        <h2 className="title-modal__eventall">{event.title}</h2>
                        <p>{event.description}</p>
                        <span className="span__event">
                          Подробная информация по телефонам:{' '}
                          <a href="tel:+79523813112">+79523813112</a>,{' '}
                          <a href="tel:+79213119849">+79213119849</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default EventAll;
