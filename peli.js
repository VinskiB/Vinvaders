const peliAlue = document.getElementById('peliAlue');
const vuohi = document.createElement('div');
vuohi.textContent = '';
vuohi.classList.add('hahmo');
peliAlue.appendChild(vuohi);

const vuohenNopeus = 5;
const kasvistenNopeus = 2;
const ammuksenNopeus = 8;
const kasvistenLuontiTaajuus = 1000; // 1 sekunti

let vuohenX = 350;
let ammukset = [];
let kasvikset = [];

vuohi.style.left = vuohenX + 'px';
vuohi.style.bottom = '0px';

function luoKasvis() {
    const kasvis = document.createElement('div');
    kasvis.textContent = '';
    kasvis.classList.add('hahmo');
    peliAlue.appendChild(kasvis);

    const kasvisX = Math.random() * 750;
    kasvis.style.left = kasvisX + 'px';
    kasvis.style.top = '0px';

    kasvikset.push(kasvis);
}

function luoAmmus() {
    const ammus = document.createElement('div');
    ammus.textContent = ''; //Ammus nyt porkkana.
    ammus.classList.add('hahmo');
    peliAlue.appendChild(ammus);

    ammus.style.left = (vuohenX + 10) + 'px';
    ammus.style.bottom = '30px';

    ammukset.push(ammus);
}

function paivitaPeli() {
    // Ammusten liikkuminen
    for (let i = 0; i < ammukset.length; i++) {
        ammukset[i].style.bottom = parseInt(ammukset[i].style.bottom) + ammuksenNopeus + 'px';
        if (parseInt(ammukset[i].style.bottom) > 600) {
            peliAlue.removeChild(ammukset[i]);
            ammukset.splice(i, 1);
            i--;
        }
    }

    // Kasvisten liikkuminen
    for (let i = 0; i < kasvikset.length; i++) {
        kasvikset[i].style.top = parseInt(kasvikset[i].style.top) + kasvistenNopeus + 'px';
        if (parseInt(kasvikset[i].style.top) > 600) {
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
    vuohenX = touch.clientX - peliAlue.offsetLeft - 15; // 15 on puolet vuohen leveydestä
    if (vuohenX < 0) {
        vuohenX = 0;
    } else if (vuohenX > 750) {
        vuohenX = 750;
    }
    vuohi.style.left = vuohenX + 'px';
});

peliAlue.addEventListener('touchend', ()=>{
    luoAmmus();
});

setInterval(luoKasvis, kasvistenLuontiTaajuus);
paivitaPeli();
