// const containerOrder = document.createElement('div')
// const order = document.createElement('div')

import {ml} from '../module/domElement.js'
import {getCookie} from "../module/cookie.js"

if(getCookie('costumer') != null){
    getOrder(getCookie('costumer'))
}else{
    window.location.replace('meja.html')
}

async function getOrder(cookie){
    // const url = new URL(`http://localhost/RPL_API/order/${cookie}`)
    const url = new URL(`https://rplcoffe.000webhostapp.com/order/${cookie}`)

    const response = await fetch(url)

    if(response.ok && response.status == 200){
        const responseData = await response.json()
        console.log(responseData);

        const target = document.querySelector('.table')
        let count = 0
        responseData.forEach(element => {
            let container = ml('div', {class: "my-order"}, [
                ml('div', {class: "order"}, [
                    ml('p', {}, `Meja: ${element.meja}`),
                    ml('p', {}, `Tanggal: ${element.date}`),
                    ml('p', {}, `Status:${element.status}`),
                ]), 
                ml('table', {id: 'table'}, [
                    ml('thead', {}, [
                        ml('th', {}, 'Menu'),
                        ml('th', {}, 'Qty'),
                        ml('th', {}, 'Total')
                    ]),
                    ml('tbody', {id: count},),
                    ml('tfoot', {}, [
                        ml('th', {}, 'Total'),
                        ml('th', {}, ),
                        ml('th', {}, `Rp. ${element.total}`)
                    ])
                ])
            ])
            if(element.status == 'waiting'){
                const link = document.createElement('a');
                link.setAttribute('href', `/payment.html?kode=${element.kode}`)
                link.setAttribute('style', 'float:right; padding-top: 10px;')
                link.innerText = 'Link Bayar';
                container.append(link)
            }
            target.append(container)

            element.order.forEach(e => {
                const idTarget = document.getElementById(count)
                const order_list = ml('tr', {}, [
                    ml('td', {}, [
                        ml('p', {}, e.nama),
                        ml('p', {}, ml('b', {}, e.ket))
                    ]),
                    ml('td', {}, `${e.qty}`),
                    ml('td', {}, `${e.harga * e.qty}`)
                ])
                idTarget.append(order_list)
            });

            count++
        });
    }else{
        const image = ml('div', {class: "image"}, [
            ml(),
            ml('img', {src: "img/list.gif"}, ),
            ml('h3', {}, "You haven't ordered anything yet")
        ])

        // const container = document.querySelector('.container')
        const table = document.getElementById('target')
        table.append(image)
    }
}