
 
    var lat= 34.9946197;
    var lng= 38.0127698;
    
    var bounds = L.latLngBounds([44.00, 46.201], [33.00, 23.954]);
    var map = L.map('map',{
        center: bounds.getCenter(),
        maxBounds: bounds,
        maxBoundsViscosity: 1.0
      }).setView([lng, lat], 7);

    map.options.minZoom = 7;
    map.options.maxZoom = 14;
	
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    	subdomains: 'abcd',
    	maxZoom: 17,
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);
    

    var markerlar = L.geoJSON(data, {
    	onEachFeature: sehirFeature,
        style:style
    }).addTo(map);

    function sehirFeature(feature, layer) {        
        layer.bindTooltip(feature.properties.name,
            {permanent: true, direction:"center"}
        ).openTooltip();
	    layer.bindPopup("<a style='font-size: 15px;'><b>" + feature.properties.name + "</b></a>"+
        "<br><table class='infoTable'>" +
        "<tbody><tr><td>Vaka Sayısı</td><td>" + feature.properties.vaka_sayisi + "</td></tr>"+
        "<tr><td>Ölü Sayısı</td><td>" + feature.properties.vefat_sayisi + "</td></tr>"+
        //"<tr><td>İyileşen Sayısı</td><td>" +feature.properties.iyilesen_sayisi + "</td></tr>"+
        "<tr><td>Son güncelleme tarihi</td><td>" +feature.properties.guncelleme_tarihi + "</td></tr></tbody>"+
        "</b><br>", {
            maxWidth: "auto"
        } );
    }

function getColor(d) {
    return d > 10   ? '#800026' :
           d > 1    ? '#FC4E2A' :
           d > 0.5  ? '#FD8D3C' :
           d > 0.25 ? '#FEB24C' :
           d > 0.05 ? '#FED976' :
                      '#FFEDA0' ;
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0.05, 0.25, 0.5, 1, 10],
        labels = [];
    div.innerHTML +='<b>Yoğunluk</b><br>';
    
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
