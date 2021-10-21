;(function(){

let myMap;

const init = () => {

    myMap = new ymaps.Map("map", {

        center: [59.938951, 30.315635],
        zoom: 12,
        


    });

    const coords = [

        [59.944859, 30.224832],
        [59.930534,30.348935],
        [59.889354,30.367970]



    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {

        draggable: false,
        iconLayout: 'default#image',
       
        iconImageHref: './img/marker.png',
        iconImageSize: [58, 73],
        iconImageOffset: [-58, -73]

    } );

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);
    myMap.behaviors.disable('scrollZoom');
    


}

ymaps.ready(init);


})()