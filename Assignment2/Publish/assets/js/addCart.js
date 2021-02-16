
let Qty=document.getElementById('value');

let Total = document.getElementById('total');

// function getImg(){
//     let location=window.location.search;
//     //console.log(location);
//     let url=new URLSearchParams(location);
//     let id=url.get("ID");
//     axios.get('http://localhost:4000/'+id).then(result=>{
//         console.log(result);
//         const img=document.getElementById('img');
//         let data=`<img src="${result.data.Path}" alt="" style="width: 30%;">`;
//         img.innerHTML=data;
//     }).catch(err=>{
//         console.log(err);
//     })
// }
// getImg();

function Plus(){
    if(Qty.value<10){
        Qty.value=parseInt(Qty.value)+1;
    }
    Total.innerHTML="$"+Qty.value*12;
}
function Minus(){
    if(Qty.value>1){
        Qty.value=parseInt(Qty.value)-1;
    }
    Total.innerHTML="$"+Qty.value*12;
}
