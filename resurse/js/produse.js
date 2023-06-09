window.addEventListener("load",function(){


    let iduriProduse=localStorage.getItem("cos_virtual");
    iduriProduse=iduriProduse?iduriProduse.split(","):[];      //["3","1","10","4","2"]

    for(let idp of iduriProduse){
        let ch = document.querySelector(`[value='${idp}'].select-cos`);
        if(ch){
            ch.checked=true;
        }
        else{
            console.log("id cos virtual inexistent:", idp);
        }
    }

    //----------- adaugare date in cosul virtual (din localStorage)
    let checkboxuri= document.getElementsByClassName("select-cos");
    for(let ch of checkboxuri){
        ch.onchange=function(){
            let iduriProduse=localStorage.getItem("cos_virtual");
            iduriProduse=iduriProduse?iduriProduse.split(","):[];

            if( this.checked){
                iduriProduse.push(this.value)
            }
            else{
                let poz= iduriProduse.indexOf(this.value);
                if(poz != -1){
                    iduriProduse.splice(poz,1);
                }
            }

            localStorage.setItem("cos_virtual", iduriProduse.join(","))
        }
        
    }
    
    document.getElementById("inp-pret").onchange=function(){
        document.getElementById("infoRange").innerHTML=`(${this.value})`;
    }

    document.getElementById("filtrare").onclick = function(){

        //input-uri
        let val_nume=document.getElementById("inp-nume").value.toLowerCase();

        let pagini = document.getElementsByName("gr_rad");
        let val_pagini;
        for(let r of pagini){
            if(r.checked){
                val_pagini=r.value;
            }
        }
        
        if(val_pagini!="toate"){
            [cal_a, cal_b] = val_pagini.split(":"); //le desparte dar sunt stringuri
           var cal_a = parseInt(cal_a);
           var cal_b = parseInt(cal_b); // convertim din string in int
        }
        //var le face disponibile oriunde
        //let le face disponibile doar in blocul curent de instructiuni

        let val_pret=document.getElementById("inp-pret").value;

        let val_categ=document.getElementById("inp-categorie").value;

        var produse=document.getElementsByClassName("produs");
        for(let prod of produse){
            prod.style.display="none";

            //valori din produs
            let nume=prod.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase();

            let cond1=(nume.startsWith(val_nume));

            let prod_pagini=parseInt(prod.getElementsByClassName("val-pagini")[0].innerHTML);
            let cond2=(val_pagini=="toate" || cal_a <= prod_pagini && prod_pagini < cal_b);
            
            let pret=parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);
            let cond3=(val_pret <= pret)

            let categorie=prod.getElementsByClassName("val-categorie")[0].innerHTML;
            let cond4=(val_categ=="toate" || val_categ==categorie);

            if(cond1 && cond2 && cond3 && cond4){
                prod.style.display="block";
            }
        }
    }

    document.getElementById("resetare").onclick= function(){
       
        if (confirm("Esti sigur ca vrei sa resetezi toate filtrele?")){
        document.getElementById("inp-nume").value="";
       
        document.getElementById("inp-pret").value=document.getElementById("inp-pret").min;
        document.getElementById("inp-categorie").value="toate";
        document.getElementById("i_rad4").checked=true;
        var produse=document.getElementsByClassName("produs");
 
        for (let prod of produse){
            prod.style.display="block";
        }
    }

    }

    function sortare(semn){
        var produse=document.getElementsByClassName("produs");
        var v_produse=Array.from(produse);

        v_produse.sort(function(a,b){
            var pret_a=parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML);
            var pret_b=parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML);

            if(pret_a==pret_b)
            {
                var nume_a=a.getElementsByClassName("val-nume")[0].innerHTML;
                var nume_b=b.getElementsByClassName("val-nume")[0].innerHTML;

                return semn*nume_a.localeCompare(nume_b);
            }

            return semn*(pret_a-pret_b);
        })

        for(let prod of v_produse){
            prod.parentElement.appendChild(prod);
        }
    }

    document.getElementById("sortCrescNume").onclick=function(){
        sortare(1);
    }

    document.getElementById("sortDescrescNume").onclick=function(){
        sortare(-1);
    }

    window.onkeydown= function(e){
        if(e.key == "c" && e.altKey == true)
            {
                if(document.getElementById("info-suma"))
                    return;
                var produse = document.getElementsByClassName("produs");
                let suma = 0;
                for(let prod of produse)
                    if(prod.style.display!="none")
                    {
                    
                        let pret = parseFloat(prod.getElementsByClassName("val-pret")[0].innerHTML);
                        suma += pret;
                     }
               
                let p = document.createElement("p");
                p.innerHTML = suma;
                p.id="info-suma";
                ps = document.getElementById("p-suma");
                container = ps.parentNode;
                frate = ps.nextElementSibling;
                container.insertBefore(p, frate);

                setTimeout(function(){
                    let info = document.getElementById("info-suma");
                    if(info)
                        info.remove();
                },1000);
            }

    }
});