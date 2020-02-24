let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

let readOnlyInputs = $$("input:read-only");

const copyOnClick = event => {
    const { target } = event;
    target.select();
    document.execCommand("copy");
}

for (let input of readOnlyInputs) {
    input.addEventListener("click", copyOnClick);
}