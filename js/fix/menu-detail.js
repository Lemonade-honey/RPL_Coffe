import { getCookie } from "../module/cookie.js";
const queryUrl = window.location.search;
const paramUrl = new URLSearchParams(queryUrl);

if(getCookie('costumer') != null){
    if(!isNaN(paramUrl.get('id'))){
        getSelectedMenu()
        displayOrderSelected(paramUrl.get('id'))
    }else{
        window.location.replace('/')
    }
}else{
    window.location.replace('meja.html')
}

async function getSelectedMenu(){
    // const url = `http://localhost/API/RPL/menu/${paramUrl.get('id')}`
    const url = `https://rplcoffe.000webhostapp.com/menu/${paramUrl.get('id')}`
    const response = await fetch(url)

    if(response.ok){
        const data = await response.json()
        displayMenu(data.data)
        submitOrder(data.data)
    }else{
        console.log('menu tidak ad');
    }
}

function displayMenu(menuObj){
    const nama = document.getElementById('nama')
    nama.innerHTML = menuObj.nama

    const keterangan = document.getElementById('keterangan')
    keterangan.innerHTML = menuObj.keterangan

    const gambarContainer = document.getElementById('gambar')
    const gambar = document.createElement('img')
    gambar.setAttribute('src', "https://rplcoffe.000webhostapp.com/img/" + menuObj.img)
    gambar.setAttribute('loading', 'lazy')
    gambarContainer.appendChild(gambar)

    const harga = document.getElementById('harga')
    harga.innerHTML = "Rp. " + menuObj.harga
}

function submitOrder(menuObj){
    const button = document.getElementById('btn-submit')
    button.addEventListener('click', () => {
        const qty = document.getElementById('qty').value
        const keteranganContainer = document.getElementById('textarea-container')
        let keterangan = null
        if(keteranganContainer.children.length > 0){
            keterangan = document.getElementById('textarea').value
        }
        let orderMenuObj = {
            id : Number(menuObj.id),
            nama: String(menuObj.nama),
            harga: Number(menuObj.harga),
            qty : Number(qty),
            ket : keterangan
        }

        console.log(orderMenuObj);
        pushOrderStorage(orderMenuObj)
        // console.log(validateDataStorage(orderMenuObj));
        window.location.replace('index.html')
    })
}

function pushOrderStorage(data){
    const listOrder = window.localStorage.getItem('list-order')
    const listOrderObj = JSON.parse(listOrder)

    if(listOrder == null || listOrder == '' || listOrderObj.order.length < 0){
        if(data.qty != 0){
            let Obj = {
                order : [data]
            }
            window.localStorage.setItem('list-order', JSON.stringify(Obj))
        }
    }else{
        // console.log('sudah ada sesuatu di storage')
        if(validateDataStorage(data) == true){
            for(let i = 0; i < listOrderObj.order.length; i++){
                if(listOrderObj.order[i].id == data.id){
                    if(data.qty > 0){
                        listOrderObj.order[i] = data
                        break
                    }else{
                        listOrderObj.order[i] = listOrderObj.order[i + 1]
                        listOrderObj.order.pop()
                        break
                    }
                }
            }
            console.log(data);
            // console.log();
            console.log('masuk push order menu sama');
        }else{
            console.log('menu baru');
            listOrderObj.order.push(data)
        }

        
        let Obj = {
            order : listOrderObj.order
        }
        // console.log(Obj);
        window.localStorage.setItem('list-order', JSON.stringify(Obj))
    }
}

function validateDataStorage(data){
    const listOrder = window.localStorage.getItem('list-order')
    let validate = false
    if(listOrder != null){
        const listOrderObj = JSON.parse(listOrder)
        // console.table(listOrderObj);
        for(let i = 0; i < listOrderObj.order.length; i++){
            if(listOrderObj.order[i].id == data.id){
                validate = true
            }
        }
    }

    console.log("hasil validasi " + validate);
    return validate
}

function displayOrderSelected(paramId){
    const listOrder = window.localStorage.getItem('list-order')
    if(listOrder != null){
        const listOrderObj = JSON.parse(listOrder)
        for(let i = 0; i < listOrderObj.order.length; i++){
            if(listOrderObj.order[i].id == paramId){
                // new JS DOM
                const qtyInput = document.getElementById('qty')
                if(listOrderObj.order[i].ket != null){
                    const keteranganContainer = document.getElementById('textarea-container')
                    const buttonKet = document.getElementById('button')
                    const textarea = document.createElement('textarea')
                    textarea.setAttribute('id', 'textarea');
                    textarea.setAttribute('rows', '5');
                    textarea.setAttribute('class', 'box-input')
                    textarea.innerHTML = listOrderObj.order[i].ket
                    buttonKet.innerHTML = '-'
                    keteranganContainer.appendChild(textarea)
                    console.log('textarea ada isi');
                }

                qtyInput.value = listOrderObj.order[i].qty
                break
            }
        }
    }
}