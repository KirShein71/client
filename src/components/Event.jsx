import React from 'react';

import EventToday from './EventToday';
import EventAll from './EventAll';

function Event() {
  return (
    <div className="event" id="event">
      <div className="container">
        <div className="event__title">
          <h2 className="event__today-title">Ближайшие мероприятия</h2>
          <h2 className="event-all__title">Проведем для вас частное мероприятие</h2>
        </div>
        <div className="event__content">
          <EventToday />
          <EventAll />
        </div>
      </div>
    </div>
  );
}

export default Event;
