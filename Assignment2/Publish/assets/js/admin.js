
const Detail=document.getElementById('Detail')
const btn=document.getElementById('btn')
const innerLayout=document.getElementById('innerLayout');
const formInput = document.getElementById('formInput')
// btn.addEventListener('click',addProduct);
// function addProduct(){
//     const formData = new FormData(document.querySelector('form'))
//     let dataSubmit={};
//     for(var pair of formData.entries()){
//         dataSubmit[pair[0]]=pair[1];
//     }
//     console.log(dataSubmit);
//     axios.post('http://localhost:4000/admin/addProduct',dataSubmit).then(result=>{
//         getProducts();
//         document.getElementById('input1').value="";
//         document.getElementById('input2').value="";
//         document.getElementById('input3').value="";
//         document.getElementById('input4').value="";
//         //console.log(result);
//     }).catch(err=>{
//         console.log(err);
//     })
// }
function Product(){
    const layout=`<div class="col-sm-1"  >
    </div>
    <div class="col-sm-2 display-flex" id="col-sm-2">
        <b id="Name">Name</b>
        <b><i class="fa fa-caret-up" aria-hidden="true"></i></b>
    </div>
    <div class="col-sm-1 display-flex" >
        <b>Qty</b>
        <div>
            <b class="display-col"><i class="fa fa-caret-up" aria-hidden="true"></i><i class="fa fa-caret-down" aria-hidden="true"></i></b>
        </div>
    </div>
    <div class="col-sm-3"  >
        <b>Detail</b>
    </div>
    <div class="col-sm-2 display-flex" >
        <b>Instock At</b>
        <b><i class="fa fa-caret-up" aria-hidden="true"></i></b>
    </div>
    <div class="col-sm-2"  >
        <b>Category</b>
    </div>
    <div class="col-sm-1"  >
        <b>Action</b>
    </div>`;
    innerLayout.innerHTML=layout
    btn.style.display="initial";
    Detail.innerHTML="All Product in stock";
    formInput.style.display="flex"
    getProducts();
    // document.getElementById('productLayout').style.display="initial";
    // document.getElementById('userLayout').style.display="none"
}
function Users(){
    const layout=`<div class="col-sm-1"  >

    </div>
    <div class="col-sm-2 display-flex" id="col-sm-2">
        <b id="Name">Username</b>
        <b><i class="fa fa-caret-up" aria-hidden="true"></i></b>
    </div>
    <div class="col-sm-5"  >
        <b>Email</b>
    </div>
    <div class="col-sm-4 display-flex" >
        <b>RegisterAt</b>
        <b><i class="fa fa-caret-up" aria-hidden="true"></i></b>
    </div>
    `
    innerLayout.innerHTML=layout
    Detail.innerHTML="All User"
    btn.style.display="none";
    formInput.style.display="none";
    getUsers();
    // document.getElementById('productLayout').style.display="none";
    // document.getElementById('userLayout').style.display="initial"
}
function PurchaseOrder(){
    
}
function History(){
    
}
function getProducts(){
    axios.get('http://localhost:4000/admin/getProducts').then(results=>{
        console.log(results);
        const Products=document.getElementById('getData');
        let data="";
        let changeColor=1;
        results.data.forEach(elements => {
            let backGround_Color="rgb(226, 222, 222)";
            if(changeColor%2==0){
                backGround_Color="white";
            }
            data+=`
            <div class="row" style="margin:0%;background-color:${backGround_Color};" id=${elements._id} >
            <div class="col-sm-1"  >
                <img src="${elements.Path}" alt="">
            </div>
            <div class="col-sm-2" >
                <b>${elements.productName}</b>
            </div>
            <div class="col-sm-1 " >
                <b>${elements.Quantity}</b>
            </div>
            <div class="col-sm-3" >
                <b>${elements.Detail}</b>
            </div>
            <div class="col-sm-2" >
                <b>${elements.InstockAt}</b>
            </div>
            <div class="col-sm-2">
                <b>${elements.Category}</b>
            </div>
            <div class="col-sm-1 display-flex" >
                <button type="button" style="border:none" id=${elements._id} onclick="getOneProduct(this.id)"><i class="fa fa-wrench" aria-hidden="true"></i></button>
                <button type="button" style="border:none" id=${elements._id} onclick="deleteProduct(this.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                
            </div>
        </div>
        `;
        changeColor++;
        })
        Products.innerHTML=data;
    }).catch(err=>{
        console.log(err);
    })
}
getProducts();

function getUsers(){
    axios.get('http://localhost:4000/admin/getUsers').then(results=>{
        console.log(results);
        const Users=document.getElementById('getData');
        let data="";
        results.data.forEach(elements => {
            data+=`<div class="row" style="margin:0%;background-color:rgb(226, 222, 222);">
            <div class="col-sm-1 " style="justify-content:center" >
                <i class="fa fa-user" aria-hidden="true"></i>
            </div>
            <div class="col-sm-2" >
                <b>${elements.username}</b>
            </div>
            <div class="col-sm-5 " >
                <b>${elements.email}</b>
            </div>
            <div class="col-sm-4" >
                <b>${elements.registerAt}</b>
            </div>
            
        </div>`;
        })
        Users.innerHTML=data;
    }).catch(err=>{
        console.log(err);
    })
}
function deleteProduct(ID){
    axios.delete('http://localhost:4000/admin/'+ID).then(()=>{
        getProducts();
    })
    .catch(err=>{
        console.log(err);
    })
}
function getOneProduct(ID){
    axios.get('http://localhost:4000/admin/'+ID).then(result=>{
        console.log(result);
        const editProduct=`
        <div class="col-sm-1"  >
        <img src="${result.data.Path}" alt="">
        </div>
        <div class="col-sm-2" >
        <textarea  class="form-control-sm" name="productName" id="input1"  rows="1" placeholder="Write here">${result.data.productName}</textarea>
        </div>
        <div class="col-sm-1 " >
        <textarea  class="form-control-sm" name="Quantity" id="input2"  rows="1" placeholder="...">${result.data.Quantity}</textarea>
        </div>
        <div class="col-sm-3" >
        <textarea  class="form-control-sm" name="Detail" id="input3"  rows="1" placeholder="Write here">${result.data.Detail}</textarea>
        </div>
        <div class="col-sm-2" >
        </div>
        <div class="col-sm-2">
        <textarea  class="form-control-sm" name="Category" id="input4"  rows="1" placeholder="Write here">${result.data.Category}</textarea>
        </div>
        <div class="col-sm-1 display-flex" >
        <button type="button" style="border:none" id=${result.data._id} onclick="updateProduct(this.id)"><i class="fa fa-save"></i></button>
        <button type="button" style="border:none" id=${result.data._id} onclick="deleteProduct(this.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
        `
        document.getElementById(result.data._id).innerHTML=editProduct;
    }).catch(err=>{
        console.log(err);
    })
}
function updateProduct(ID){
    let dataSubmit={};
    dataSubmit={
        productName:document.getElementById('input1').value,
        Quantity:document.getElementById('input2').value,
        Detail:document.getElementById('input3').value,
        Category:document.getElementById('input4').value
    }
    console.log(dataSubmit);
    axios.patch('http://localhost:4000/admin/'+ID,dataSubmit).then(()=>{
        getProducts();

    }).catch(err=>{
        console.log(err);
    })
}
