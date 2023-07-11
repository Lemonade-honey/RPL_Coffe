import {getCookie} from '../module/cookie.js'
console.log(getCookie('costumer'));

if(getCookie('costumer') == null){
    window.location.replace('meja.html')
}else{
    getAllMenu()
    // getStorage()
}



async function getAllMenu(){
    // const url = new URL('http://localhost/API/RPL/menu')
    const url = new URL('https://rplcoffe.000webhostapp.com/menu')
    const response = await fetch(url)

    if(response.ok){
        const data = await response.json()
        // fungsi penampilan data ke html
        displayLoopingData(data.data)
        console.log(data);
    }
}

function displayLoopingData(menuObj){
    const conatainerMakanan = document.getElementById('container-makanan')
    const conatainerMinuman = document.getElementById('container-minuman')

    for(let i in menuObj){
        if(menuObj[i].type === 'makanan'){
            // JS DOM, Tag a
            const aTag = document.createElement('a')
            aTag.setAttribute('href', `http://127.0.0.1:3000/menu-display.html?nama=${menuObj[i].nama}&id=${menuObj[i].id}`)
            aTag.setAttribute('class', 'menu-card')

            // image inside tag a
            const image = document.createElement('img')
            image.setAttribute('src', 'https://rplcoffe.000webhostapp.com/img/' + menuObj[i].img)
            image.setAttribute('alt', menuObj[i].kode)
            image.setAttribute('loading', 'lazy')
            aTag.appendChild(image)

            // deskripsi tag
            const deskripsi = document.createElement('div')
            deskripsi.setAttribute('class', 'deskripsi')

            // nama inside deskripsi -> tag a
            const nama = document.createElement('p')
            nama.innerHTML = menuObj[i].nama
            deskripsi.appendChild(nama)

            // harga inside deskripsi -> tag a
            const harga = document.createElement('p')
            harga.innerHTML = "Rp. " + menuObj[i].harga
            deskripsi.appendChild(harga)

            // display class deskripsi
            aTag.appendChild(deskripsi)

            // display -> container makanan
            conatainerMakanan.appendChild(aTag)
        }else if(menuObj[i].type === 'minuman'){
            // JS DOM, Tag a
            const aTag = document.createElement('a')
            aTag.setAttribute('href', `http://127.0.0.1:3000/menu-display.html?nama=${menuObj[i].nama}&id=${menuObj[i].id}`)
            aTag.setAttribute('class', 'menu-card')

            // image inside tag a
            const image = document.createElement('img')
            image.setAttribute('src', 'https://rplcoffe.000webhostapp.com/img/' + menuObj[i].img)
            image.setAttribute('alt', menuObj[i].kode)
            image.setAttribute('loading', 'lazy')
            aTag.appendChild(image)

            // deskripsi tag
            const deskripsi = document.createElement('div')
            deskripsi.setAttribute('class', 'deskripsi')

            // nama inside deskripsi -> tag a
            const nama = document.createElement('p')
            nama.innerHTML = menuObj[i].nama
            deskripsi.appendChild(nama)

            // harga inside deskripsi -> tag a
            const harga = document.createElement('p')
            harga.innerHTML = "Rp. " + menuObj[i].harga
            deskripsi.appendChild(harga)

            // display class deskripsi
            aTag.appendChild(deskripsi)

            // dispay container -> minuman
            conatainerMinuman.appendChild(aTag)
        }
    }
}

// function getStorage(){
//     const listOrder = window.localStorage.getItem('list-order')
//     const listOrderObj = JSON.parse(listOrder)

//     let totalHarga = 0
//     if(listOrder != null && listOrderObj.order.length != 0){
//         // console.table(listOrderObj);
//         for(let i =0; i < listOrderObj.order.length; i++){
//             totalHarga += (listOrderObj.order[i].harga * listOrderObj.order[i].qty)
//         }
//         const item = document.getElementById('item')
//         item.innerHTML = (listOrderObj.order.length) + " item"

//         const harga = document.getElementById('total-harga')
//         harga.innerHTML = "Rp. " +  new Intl.NumberFormat().format(totalHarga)
//     }else{
//         document.getElementById('barang').style.display = 'none'
//     }
// }