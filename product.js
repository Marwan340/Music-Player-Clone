document.addEventListener("DOMContentLoaded", function(){
    const getdata=document.getElementById("submit");
    const productinput=document.getElementById("search");
    const table=document.getElementById("table");

    getdata.addEventListener("click",()=>{
        const productname=productinput.value;
        if (productname===""){alert("Enter product name.")
    return;}
    clearTable(table);
fetch("products.xml")
.then(Response=>Response.text())
.then(data => {
        const parser=new DOMParser();
        const xmldoc=parser.parseFromString(data, "text/xml");
        const product=xmldoc.getElementsByTagName("product");
        
        for (let i=0;i<product.length;i++)   
        {const name=product[i].getElementsByTagName("name")[0].firstChild.nodeValue;
        
        const price=product[i].getElementsByTagName("price")[0].firstChild.nodeValue;

        const quantity=product[i].getElementsByTagName("quantity")[0].firstChild.nodeValue;

        const desc=product[i].getElementsByTagName("description")[0].firstChild.nodeValue;
        if (name.toLowerCase()===productname.toLowerCase()){
            displaypi(table, name, price, quantity, desc);
            return
        }
        }
        alert("Product not found");
    })})
        function displaypi(table, name, price, quantity, desc){
            const row=table.insertRow();
            const cellname=row.insertCell(0);
            const cellprice=row.insertCell(1);
            const cellquantity=row.insertCell(2);
            const celldescr=row.insertCell(3);

            cellname.innerHTML=name;
            cellprice.innerHTML=price;
            cellquantity.innerHTML=quantity;
            celldescr.innerHTML=desc;
        }
        function clearTable(table){
            const numrows=table.rows.length;
            for (let i=numrows-1;i>0;i--){
                table.deleteRow(i);
            }
        }
    })
