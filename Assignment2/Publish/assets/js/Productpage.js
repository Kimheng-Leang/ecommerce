

function getDetailProduct(){
    let location=window.location.search;
    //console.log(location);
    let url=new URLSearchParams(location);
    let id=url.get("ID");
    axios.get('http://localhost:4000/'+id).then(result=>{
        //console.log(result);
        const parent= document.getElementById('parent');
    let data=`<td id="Td7">
    <table id="layout3">
            <tr>
                <td id="Td5">
                    <img  id="img1" src="${result.data.Path}" alt="Clothes"><span class="class2">20%</span>
                    <div class="class3">
                        <div>
                            <img src="${result.data.Path}" alt="Clothes">
                    </div>
                    <div>
                            <img src="${result.data.Path}" alt="Clothes">
                    </div>
                    <div>
                            <img src="${result.data.Path}" alt="Clothes">
                    </div>
                    </div>
                </td>
                <td id="Td6">
                    <div id="Div2">
                        <div id="Div3">
                            <p>${result.data.productName}</p>
                        </div>
                        <div id="Div4">
                            <hr>
                            <p >  $15 </p>
                        </div>
                        <div id="Div5">
                            <p >  $12  </p>
                        </div>
                        
                    </div>
                    <p id="p1">${result.data.Detail}
                    </p>
                    <form action="http://localhost:4000/Purchase/${result.data._id}" method="POST">
                    <span class="Classcart"><i class="fas fa-shopping-cart"></i><input type="submit" value=" Cart"></span>
                    </form>
                    <p id="p2">
                        <span>Male T-Shirt</span>
                        <span>Single Color</span>
                    </p>
                </td>
            </tr>
        
    </table>
</td> `;
    parent.innerHTML=data;
    }).catch(err=>{
        console.log(err);
    })
}
getDetailProduct();

function postComment(){
    const formData = new FormData(document.querySelector('form'))
    let dataSubmit={};
    for(var pair of formData.entries()){
        dataSubmit[pair[0]]=pair[1];
    }
    axios.post('http://localhost:4000/Productpage/postComment',dataSubmit).then(result=>{
        // const currentUrl="http://localhost:4000/Productpage";
        if(result.data.redirectUrl!=null){
            window.location=result.data.redirectUr//+"?url="+currentUrl;
        }
        else{
            document.getElementById('text').value="";
            getComments();
            //console.log(result);
        }
        
        
    }).catch(err=>{
        console.log(err);
    })
}
function getComments(){
    axios.get('http://localhost:4000/Productpage/postComments').then(results=>{
        //console.log(results);
        
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
