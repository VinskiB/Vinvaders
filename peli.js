const peliAlue = document.getElementById('peliAlue');
const vuohi = document.createElement('div');
vuohi.textContent = '\uD83D\uDC10'; // Vuohi emoji unicode
vuohi.classList.add('hahmo');
vuohi.style.fontSize = '60px'; // Vuohi on kaksi kertaa isompi
peliAlue.appendChild(vuohi);

const pisteetElementti = document.getElementById('pisteet');
let pisteet = 0;

const vuohenNopeus = 5;
const kasvistenNopeus = 2;
const ammuksenNopeus = 8;
const kasvistenLuontiTaajuus = 1000; // 1 sekunti

let vuohenX = peliAlue.offsetWidth / 2 - 30; // Keskelle, vuohen uusi koko huomioitu
let ammukset = [];
let kasvikset = [];
const kasvisEmojis = ['\uD83E\uDD52', '\uD83E\uDD66', '\uD83E\uDD6C']; // Porkkana poistettu

vuohi.style.left = vuohenX + 'px';
vuohi.style.bottom = '0px';

function luoKasvis() {
    const kasvis = document.createElement('div');
    kasvis.textContent = kasvisEmojis[Math.floor(Math.random() * kasvisEmojis.length)]; // Satunnainen kasvis
    kasvis.classList.add('hahmo');
    peliAlue.appendChild(kasvis);

    const kasvisX = Math.random() * (peliAlue.offsetWidth - 30);
    kasvis.style.left = kasvisX + 'px';
    kasvis.style.top = '0px';

    kasvikset.push(kasvis);
}

function luoAmmus() {
    const ammus = document.createElement('div');
    ammus.textContent = '\uD83E\uDD55'; // Porkkana emoji unicode
    ammus.classList.add('hahmo');
    peliAlue.appendChild(ammus);

    ammus.style.left = (vuohenX + 20) + 'px'; // Vuohen uusi koko huomioitu
    ammus.style.bottom = '60px'; // Vuohen uusi koko huomioitu

    ammukset.push(ammus);
}

function paivitaPeli() {
    // Ammusten liikkuminen
    for (let i = 0; i < ammukset.length; i++) {
        ammukset[i].style.bottom = parseInt(ammukset[i].style.bottom) + ammuksenNopeus + 'px';
        if (parseInt(ammukset[i].style.bottom) > peliAlue.offsetHeight) {
            peliAlue.removeChild(ammukset[i]);
            ammukset.splice(i, 1);
            i--;
        }
    }

    // Kasvisten liikkuminen
    for (let i = 0; i < kasvikset.length; i++) {
        kasvikset[i].style.top = parseInt(kasvikset[i].style.top) + kasvistenNopeus + 'px';
        if (parseInt(kasvikset[i].style.top) > peliAlue.offsetHeight) {
            peliAlue.removeChild(kasvikset[i]);
            kasvikset.splice(i, 1);
            i--;
        }
    }

    //Törmäysten havaitseminen.
    for (let i = 0; i < ammukset.length; i++){
        for (let j = 0; j< kasvikset.length; j++){
            if (tormays(ammukset[i], kasvikset[j])){
                peliAlue.removeChild(ammukset[i]);
                ammukset.splice(i, 1);
                i--;
                peliAlue.removeChild(kasvikset[j]);
                kasvikset.splice(j, 1);
                j--;
                pisteet++;
                pisteetElementti.textContent = 'Pisteet: ' + pisteet;
                break;
            }
        }
    }

    requestAnimationFrame(paivitaPeli);
}

function tormays(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.right < rect2.left ||
        rect1.left > rect2.right);
}

//Kosketusohjaus.
peliAlue.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    vuohenX = touch.clientX - peliAlue.getBoundingClientRect().left - 30; // 30 on puolet vuohen leveydestä
    if (vuohenX < 0) {
        vuohenX = 0;
    } else if (vuohenX > peliAlue.offsetWidth - 60) { // Vuohen uusi koko huomioitu
        vuohenX = peliAlue.offsetWidth - 60;
    }
    vuohi.style.left = vuohenX + 'px';
});

peliAlue.addEventListener('touchend', ()=>{
    luoAmmus();
});

setInterval(luoKasvis, kasvistenLuontiTaajuus);
paivitaPeli();
