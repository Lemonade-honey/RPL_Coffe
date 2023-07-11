const queryUrl = window.location.search;
const paramUrl = new URLSearchParams(queryUrl);

if(paramUrl.get('kode') == null){
    window.location.replace('index.html')
}

async function fetchData(){

    const url = `https://rplcoffe.000webhostapp.com/pembayaran/${paramUrl.get('kode')}`;

    const response = await fetch(url);
    if(response.ok){
        const data = await response.json()
        console.log(data);
        DOMElement(data.data)
    }
}

fetchData()

// DOM
const harga = document.getElementById('harga')
const kode = document.getElementById('kode-pembayaran')
const status = document.getElementById('status');
const target = document.getElementById('link-payment')

function DOMElement(data){
    harga.innerText = 'Rp.' + data.harga;
    kode.innerHTML = data.kode_bayar;
    status.innerHTML = data.status

    const link = document.createElement('a');
    link.setAttribute('href', `https://rplcoffe.000webhostapp.com/payment-gateway.php?kode=${data.kode_bayar}`)
    // target.appendChild(link);
    target.innerHTML = "<a href=" + `https://rplcoffe.000webhostapp.com/payment-gateway.php?kode=${data.kode_bayar}>Bayar Sekarang</a>` 

    // qrcode, CDN
    const qrcode = new QRCode(document.getElementById("qrcode"), {
        text: data.kode_bayar,
        width: 208,
        height: 208,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}
