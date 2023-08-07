import React from "react";

function WineCard ({image, name, price}) {
   
    return(
        <div className="winecard">
            <div className="winecard__content">
                
                  
                    <div className="wibecrad__img">
                    <img width={119} height={289} src={image} alt="wine"/>
                </div>
                <div className="winecard__title">{name}</div>
                <div className="winecard__price">{price} ₽</div>
                
                
            </div>
        </div>
    )
}

export default WineCard;