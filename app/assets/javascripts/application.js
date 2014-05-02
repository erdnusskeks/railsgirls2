// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_self
//= require_tree .
//= require masonry.pkgd.js

//4 zeilen, 6 spalten

window.onload = function() {
    erzeugeMemoryFelder();
    neuesSpiel();

    // document.getElementById('neuesSpiel').addEventListener("click", neuesSpiel(), false);
};


var buchstaben = new Array(24);
var orientierung = new Array(24);
var img;
var bildname = "tile";
var dateiEndung = ".gif";


var aufgedeckt = 0;                 // am Anfang ist noch nichts aufgedeckt
var bild1;
var bild2;

var karte1;
var karte2;

var anzahlVersuche = 0;



function neuesSpiel() {
    aufgedeckt = 0;
    anzahlVersuche = 0;
    document.getElementById('anzVersuche').value = 0;
    for (var i = 0; i < 24; ++i) {
        buchstaben[i] = parseInt(i / 2) + 1;               // Array mit 24 Elementen. Zum Ergebnis von parseInt wird 1 addiert (keine weiteren Klammern nötig)
        // buchstaben[i] = Math.floor(i / 2) +1;          // Math.floor(); => Nachkommastellen werden abgeschnitten
        orientierung[i] = Math.round(Math.random() * 2);
    }

    var temp;

    for (var x = 0; x < buchstaben.length; ++x) {
        img = document.getElementById("memory").getElementsByTagName("img");
        img[x].src = "/assets/" + bildname + orientierung[x] + "_D" + dateiEndung;

        var zufall = Math.round(Math.random() * 23);
        temp = buchstaben[x];
        buchstaben[x] = buchstaben[zufall];
        buchstaben[zufall] = temp;
    }
}


function erzeugeMemoryFelder() {
    var zaehler = 0;
    var div = document.getElementById("memory");
    var h1 = document.createElement("h1");
    var text = document.createTextNode("Memory-Spiel");
    h1.appendChild(text);
    div.appendChild(h1);

    var tab = document.createElement("table");
    tab.setAttribute("style", "margin-bottom:50px");   // gängige Schreibweise, wird von allen Browsern unterstützt.

    div.appendChild(tab);
    for (var zeile = 0; zeile < 4; ++zeile) {
        var tr = document.createElement("tr");
        tab.appendChild(tr);

        for (var spalte = 0; spalte < 6; ++spalte) {
            var td = document.createElement("td");
            var a_Ele = document.createElement("a");
            a_Ele.setAttribute("href", "#");            // oder: a_Ele.href="#";
            td.appendChild(a_Ele);

            var img = document.createElement("img");
            img.setAttribute("src", "");

            a_Ele.appendChild(img);
            // img.addEventListener("click",function(){test();},false);  // Reihenfolge bei addEventListener("click"[o. "mouseover" etc.],funktionsname[ohne 'function' und '();' ],true[oder false]) - ohne Event.
            img.addEventListener("click", testKarte, false);                   // test = Funktionsaufruf / false = von innen nach außen, true = von außen nach innen. Funktioniert nicht bei allen Browsern!!!

            // img.param=zaehler;                                          // param ist eine Eigenschaft, die den Wert zaehler zugewiesen bekommt. Eigenschaft kann jeden beliebigen Namen haben
            img.setAttribute("param", zaehler);                      // die Eigenschaft kann selbstdefiniert oder vordefiniert sein
            zaehler++;

            tr.appendChild(td);
        }
    }
}

function testKarte(evt) {
    // var id = evt.currentTarget.param;
    // alert(id);
    var karte = evt.currentTarget.attributes.param.value;                    // wenn oben setAttribute verwendet wird, dann diese Schreibweise anwenden:
    // var id = evt.currentTarget.attributes['param'].value;              // Alternative zur Zeile davor



    if (aufgedeckt === 2) {
        aufgedeckt = 0;
        testPaare();
    } else if (buchstaben[karte] !== -1) {
        img[karte].src = "/assets/" + bildname + orientierung[karte] + "_" + buchstaben[karte] + dateiEndung;

        if ((aufgedeckt === 1) && (karte1 !== karte)) {
            aufgedeckt = 2;
            bild2 = buchstaben[karte];
            karte2 = karte;
            anzahlVersuche++;
            document.getElementById('anzVersuche').value = anzahlVersuche;
        }

        if (aufgedeckt === 0) {
            aufgedeckt = 1;
            bild1 = buchstaben[karte];
            karte1 = karte;
        }
    }
}

function testPaare() {
    if (bild1 === bild2) {
        img[karte1].src = "/assets/tile0_0.gif";
        img[karte2].src = "/assets/tile0_0.gif";
        buchstaben[karte1] = -1;
        buchstaben[karte2] = -1;
    } else {
        img[karte1].src = "/assets/" + bildname + orientierung[karte1] + "_D" + dateiEndung;
        img[karte2].src = "/assets/" + bildname + orientierung[karte2] + "_D" + dateiEndung;
    }
}


