const peliAlue = document.getElementById('peliAlue');
const vuohi = document.createElement('div');
vuohi.textContent = '\uD83D\uDC10';
vuohi.classList.add('hahmo');
vuohi.style.fontSize = '60px';
peliAlue.appendChild(vuohi);

const pisteetElementti = document.getElementById('pisteet');
let pisteet = 0;
let peliKaynnissa = true;

const vuohenNopeus = 5;
const kasvistenNopeus = 2;
const ammuksenNopeus = 8;
const kasvistenLuontiTaajuus = 1000;
const tahtienLuontiTaajuus = 50;
const leijonanLuontiTaajuus = 5000;

let vuohenX = peliAlue.offsetWidth / 2 - 30;
let ammukset = [];
let kasvikset = [];
let leijonat = [];
const kasvisEmojis = ['\uD83E\uDD52', '\uD83E\uDD66', '\uD83E\uDD6C'];

vuohi.style.left = vuohenX + 'px';
vuohi.style.bottom = '0px';

function luoTahti() {
    const tahti = document.createElement('div');
    tahti.classList.add('tahti');
    peliAlue.appendChild(tahti);

    const tahtiX = Math.random() * peliAlue.offsetWidth;
    const tahtiY = Math.random() * peliAlue.offsetHeight;
    tahti.style.left = tahtiX + 'px';
    tahti.style.top = tahtiY + 'px';
}

function luoKasvis() {
    if (!peliKaynnissa) return;
    const kasvis = document.createElement('div');
    kasvis.textContent = kasvisEmojis[Math.floor(Math.random() * kasvisEmojis.length)];
    kasvis.classList.add('hahmo');
    peliAlue.appendChild(kasvis);

    const kasvisX = Math.random() * (peliAlue.offsetWidth - 30);
    kasvis.style.left = kasvisX + 'px';
    kasvis.style.top = '0px';

    kasvikset.push(kasvis);
}

function luoLeijona() {
    if (!peliKaynnissa) return;
    const leijona = document.createElement('div');
    leijona.textContent = '\uD83E\uDD81';
    leijona.classList.add('hahmo');
    peliAlue.appendChild(leijona);

    const leijonaX = Math.random() * (peliAlue.offsetWidth - 30);
    leijona.style.left = leijonaX + 'px';
    leijona.style.top = '0px';

    leijonat.push(leijona);
}

function luoAmmus() {
    if (!peliKaynnissa) return;
    const ammus = document.createElement('div');
    ammus.textContent = '\uD83E\uDD55';
    ammus.classList.add('hahmo');
    peliAlue.appendChild(ammus);

    ammus.style.left = (vuohenX + 20) + 'px';
    ammus.style.bottom = '60px';

    ammukset.push(ammus);
}

function paivitaPeli() {
    if (!peliKaynnissa) return;
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

    // Leijonien liikkuminen
    for (let i = 0; i < leijonat.length; i++) {
        leijonat[i].style.top = parseInt(leijonat[i].style.top) + kasvistenNopeus + 'px';
        if (parseInt(leijonat[i].style.top) > peliAlue.offsetHeight) {
            peliAlue.removeChild(leijonat[i]);
            leijonat.splice(i, 1);
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
                pisteetElementti.textContent = 'Points: ' + pisteet;
                break;
            }
        }
    }

    //Törmäys leijonan kanssa
    for (let i = 0; i < leijonat.length; i++){
        if (tormays(vuohi, leijonat[i])){
            peliKaynnissa = false;
            alert("Peli lopp
