import React from 'react';
import { Tooltip } from 'react-tooltip';

function ReactToolTip() {
  return (
    <Tooltip id="winery-tooltip" place="top" effect="solid">
      <div className="winery-tooltip-content">
        <div id="winery-tool" className="tooltip">
          Подсказка
        </div>
      </div>
    </Tooltip>
  );
}

export default ReactToolTip;
