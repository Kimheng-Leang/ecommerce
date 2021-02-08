
function postComment(){
    const formData = new FormData(document.querySelector('form'))
    let dataSubmit={};
    for(var pair of formData.entries()){
        dataSubmit[pair[0]]=pair[1];
    }
    axios.post('http://localhost:4000/Productpage/postComment',dataSubmit).then(result=>{
        const currentUrl="http://localhost:4000/Productpage";
        if(result.data.redirectUrl!=null){
            window.location=result.data.redirectUrl//+"?url="+currentUrl;
        }
        else{
            document.getElementById('text').value="";
            getComments();
            console.log(result);
        }
        
        
    }).catch(err=>{
        console.log(err);
    })
}
function getComments(){
    axios.get('http://localhost:4000/Productpage/postComments').then(results=>{
        console.log(results);
        const Comment=document.getElementById('getComment');
        let data="";
        results.data.forEach(elements => {
            data+=` <div class="Div6" style="margin-bottom:10px">
            <div class="Div7">
                <i class="fa fa-user-circle" aria-hidden="true"></i>
            </div>
            <div class="Div7">
                <p id="p3">${elements.userName}</p>
                <p  id="p4">${elements.commentTime}, ${elements.commentAt}</p>
            </div>
            <p id="p5">${elements.postComment}
            </p>
        </div>`
        });
        Comment.innerHTML=data
    }).catch(err=>{
        console.log(err);
    })
}
getComments();

function Discard(){
    document.getElementById('text').value='';
}

function getProducts(){
    axios.get('http://localhost:4000/getProducts').then(results=>{
        console.log(results);
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
                    <form action="http://localhost:4000/Purchase" method="POST">
                        <a href="http://localhost:4000/Productpage"><img src="${elements.Path}" alt="Clothes"></a><span class="class2">20%</span>
                        <p>
                            ${elements.Detail}
                        </p>
                        <hr>
                        <p class="Classp">$15 </p>
                        <p class="Classp1">$12 <span class="Classcart"><i class="fas fa-shopping-cart"></i><input type="submit" name="purchase" value=" Cart"></span></p>
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