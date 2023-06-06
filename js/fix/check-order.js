import { getCookie } from "../module/cookie.js"

const listOrder = window.localStorage.getItem('list-order')
const listOrderObj = JSON.parse(listOrder)
let globalHarga = 0

getOrderFromStorage()

function getOrderFromStorage(){
    const table = document.querySelector('.table')
    const image = document.querySelector('.image')
    const listContainer = document.getElementById('order-list')
    

    let totalHarga = 0, totalOrder = 0
    if(listOrder != null && listOrderObj.order.length != 0){
        image.style.display = 'none'
        listOrderObj.order.forEach(element => {
            const tagTr = document.createElement('tr')
            const tagTd1 = document.createElement('td')
            const tagTd2 = document.createElement('td')
            const tagTd3 = document.createElement('td')
            const menu = document.createElement('p')
            const note = document.createElement('p')

            menu.innerHTML = element.nama
            if(element.ket != null){
                note.innerHTML = "<span>Note : </span>" + element.ket
            }

            tagTd1.append(menu, note)
            tagTd2.innerHTML = Number(element.qty)
            tagTd3.innerHTML = Number(element.qty * element.harga)

            totalOrder += Number(element.qty)
            totalHarga += Number(element.qty * element.harga)

            tagTr.append(tagTd1, tagTd2, tagTd3)
            listContainer.appendChild(tagTr)

        });

        const harga = document.getElementById('harga-total')
        harga.innerHTML = new Intl.NumberFormat().format(totalHarga)

        // global total harga
        globalHarga = totalHarga

        const qty = document.getElementById('qty-total')
        qty.innerHTML = totalOrder
    }else{
        table.style.display = 'none'
    }

}

/**
 * Submit Order function
 */



const btnSubmit = document.getElementById('submit-btn')
btnSubmit.addEventListener('click', () => {
    
    Swal.fire({
        title: 'Are you sure ?',
        text: "Menu yang dipesan tidak dapat diubah !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes'
    }).then((result) => {
        if(result.isConfirmed){
            orderAction()
            Swal.fire('anjay')
        }
    })
})

async function orderAction(){
    // const url = new URL('http://localhost/API/RPL/order.php')
    const url = new URL('https://rplcoffe.000webhostapp.com/order.php')
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            idCostumer: getCookie('costumer'),
            meja: Number(getCookie('costumer', 1)),
            order: listOrderObj.order,
            total: Number(globalHarga)
        })
    })
    // const responseMassage = await response.text()
    // console.log(response);
    if(response.ok && response.status == 201){
        Swal.fire({
            icon: 'success',
            text: 'Pesananmu sukses dibuat',
            timer: 3000,
            timerProgressBar: true
        }).then(() => {
            window.localStorage.removeItem('list-order')
            window.location.replace('/')
        })
    }else{
        Swal.fire({
            title: 'ERROR!',
            icon: 'error',
            text: 'Terdapat kesalahan dalam pembuatan pesanan Anda, silahkan dicoba lagi'
        })
    }
}