

    let btnAdd = document.querySelector("#btnchk");
let result = document.querySelector("td.td1");
btnAdd.addEventListener('click', () => {
    let checkbox = document.querySelector('["td.t1"]:checked');
   // result.innerText = checkbox.value;
   result.innerText = checkbox.parentElement.textContent;
}); 