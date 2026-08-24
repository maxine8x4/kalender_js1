const datum = new Date();     

document.title = "Kalenderblatt vom " + datum.toLocaleDateString("de-DE", { day: "2-digit",
        day: "2-digit",
        month: "long",
        year: "numeric"
});

const datumText = datum.toLocaleDateString("de-DE", {         
    day: "2-digit",
    month: "long",
    year: "numeric"
});

let monatsName = datum.toLocaleDateString("de-DE", {
    month: "long"    
});

let wochentagsname = datum.toLocaleDateString("de-DE", {
    weekday: "long"    
})

const tage = document.querySelectorAll("td");

tage.forEach(function(tag) {
    if (tag.textContent == datum.getDate()) {
        tag.classList.add("heute");
    }
});

let wochentage = [      
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
];

let monate = [      
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
];

let nummern = [     
    "",
    "erste",
    "zweite",
    "dritte",
    "vierte",
    "fünfte"
];


const day = datum.getDate();      
const month = datum.getMonth() +1 ;         
const year = datum.getFullYear();      



                //  0   1   2   3   4   5   6   7   8   9  10   11         
let tageImMonat = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let anzahlTageImMonat = tageImMonat[datum.getMonth()];
        if (datum.getMonth() === 1 && istSchaltjahr(year)) {
                anzahlTageImMonat++;
        }


// Berechnung wieviele Tage im Jahr
function istSchaltjahr(jahr) {
        if (jahr % 400 == 0) {
                return true;
        }
        if (jahr % 4 == 0 && jahr % 100 !=0) {
                return true; 
        }
        return false;
}

function berechneTageSeitJahresbeginn(date) {
        let days = 0;
        for (let monthNo = 0; monthNo < date.getMonth(); monthNo++) {
            days += tageImMonat [monthNo];    
        }
        days += date.getDate(); // days = days + date.date;
        // days += istSchaltjahr(date.year) ? 1 : 0
        if (istSchaltjahr(date.getFullYear())  && date.getMonth() > 1) {
                days++;
        }
        return days;
}

// schaltjahr:
// jahr % 400 == 0 oder jahr % 4 == 0 und jahr % 100 !=0 -> schaltjahr

// 31 + 28 + (wenn schaltjahr, dann noch +1) + tag im märz

const tagImJahr = berechneTageSeitJahresbeginn(datum);

// Berechnung wievielter Wochentag
const wievielterWochentag = Math.ceil(day / 7);         // Berechnung, welcher Wochentag im Monat es ist (1. bis 7.)


// Berechnung der verbleibenden Tage bis zum Jahresende
const jahresende = new Date(year, 11, 31);    
const unterschiedEnde = jahresende - datum;     // Berechnung der Differenz zwischen dem aktuellen Datum und dem Jahresende in Millisekunden
const verbleibendeTage = Math.ceil(unterschiedEnde / (1000 * 60 * 60 * 24));     // Berechnung der verbleibenden Tage bis zum Jahresende
       

const text = "Es ist der " + nummern[wievielterWochentag] + " " + wochentagsname + " im Monat.";       // Erstellung des Textes, der den Wochentag im Monat beschreibt



// Gesetzliche Feiertage in Deutschland

let neujahr = day === 1 && month === 1;               
let tagDerDeutschenEinheit = day === 3 && month === 10;     
let ersterWeihnachtsfeiertag = day === 25 && month === 12;   
let zweiterWeihnachtsfeiertag = day === 26 && month === 12;    
   


if (neujahr) {
        document.getElementById("info5").textContent = "Heute ist 'Neujahr', was in Deutschland ein gesetzlicher Feiertag ist.";
}
else if (tagDerDeutschenEinheit) {
        document.getElementById("info5").textContent = "Heute ist 'der Tag der Deutschen Einheit', was in Deutschland ein gesetzlicher Feiertag ist.";
}
else if (ersterWeihnachtsfeiertag) {
        document.getElementById("info5").textContent = "Heute ist 'der erste Weihnachtsfeiertag', was in Deutschland ein gesetzlicher Feiertag ist.";
}
else if (zweiterWeihnachtsfeiertag) {
        document.getElementById("info5").textContent = "Heute ist 'der zweite Weihnachtsfeiertag', was in Deutschland ein gesetzlicher Feiertag ist.";
}
else {
    document.getElementById("info5").textContent = "Heute ist kein gesetzlicher Feiertag in Deutschland.";
}


document.getElementById("titel").textContent = "Kalenderblatt vom " + datumText;
document.getElementById("info1").textContent = "Der " + day + ". " + monatsName + " ist der " + nummern[wievielterWochentag] + " " + wochentagsname + " im Monat ";
document.getElementById("info2").textContent = "Es handelt sich um den " + tagImJahr + ". Tag des Jahres " + year + ", was bedeutet, dass es noch " + verbleibendeTage + " Tage bis zum Jahresende sind.";
document.getElementById("info4").textContent = "Der Monat " + monatsName + " hat insgesamt 31 Tage";
document.getElementById("aktuellerMonat").textContent = monatsName;
document.getElementById("h3").textContent = "Historische Ereignisse am " + day + "." + monatsName;