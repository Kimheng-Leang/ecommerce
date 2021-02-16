
function getProducts(){
    axios.get('http://localhost:4000/getProducts').then(results=>{
        //console.log(results);
        const parent = document.getElementById('layout2');
        let data=""
        let child=""
        let sub_child="";
        let count=0;
        results.data.forEach(elements=>{
            if(count==3){
                sub_child=`<tr > 
                <td class="Td5">
                ${data}
                </td>
                </tr>`;
                data="";
                count=0;
            }
            data+=`
                <div>
                    <form action="http://localhost:4000/Productpage?ID=${elements._id}" method="POST">
                    <button type="submmit" id="${elements._id}" style="display:contents"><img src="${elements.Path}" alt="Clothes"><span class="class2">20%</span></button>
                    </form>
                    <p>
                    ${elements.Detail}
                    </p>
                    <hr>
                    <p class="Classp">$15 </p>
                    <form action="http://localhost:4000/Purchase/${elements._id}" method="Post">
                    <p class="Classp1">$12 <span class="Classcart"><i class="fas fa-shopping-cart"></i><input type="submit" name="purchase" value=" Cart" data-toggle="modal" data-target="#myModal"></span></p>
                    </form>
                </div>
                `
            count++;
            child=sub_child+`<tr > 
                <td class="Td5">
                ${data}
                </td>
                </tr>`;
        })
        parent.innerHTML=child;
        
    }).catch(err=>{
        console.log(err);
    })
}
getProducts();

// function getOneProduct(ID){
//     axios.get('http://localhost:4000/'+ID).then(result=>{
//         console.log(result);
//         imgPath=result.data.result.Path;
//         window.location=result.data.url;
        
//     }).catch(err=>{
//         console.log(err);
//     })
// }

