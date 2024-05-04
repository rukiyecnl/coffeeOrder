const base_url = "assets/json";
const orderContent = qs(".order-content");
const orderCategories = qs(".order-categories");
// const categoryTitles = qsAll(".category-title h2");


const firstAnswer = qs(".first-answer");
const secondAnswer = qs(".second-answer");
const thirdAnswer = qs(".third-answer");
const fourthAnswer = qs(".fourth-answer");
const fifthAnswer = qs(".fifth-answer");


function qs(selector){
    const element = document.querySelector(selector);
    return element;
}

function qsAll(selector){
    const element = document.querySelectorAll(selector);
    return element;
}

function bindEventsAll(selector, eventType, cbFunction){
    const elements = qsAll(selector);
    for (const element of elements) {
        element.addEventListener(eventType, cbFunction);
    }
}

function bindEvents(selector, eventType, cbFunction){
    const element = qs(selector);
    element.addEventListener(eventType, cbFunction); 
}

async function getQuestions(endpoint){
    const response = await fetch(`${base_url}/${endpoint}`);
    const data = await response.json();
    return data;
}
let id = 0 ;
async function showQuestions(){
    const questionsData = await getQuestions("data.json");
    for (const questionData of questionsData) {
        orderCategories.innerHTML += `
        <div class="category-title">
            <h2>${questionData.question}</h2>

            <div class="category-type" data-id=${id}>
                
            </div>

        </div>`;

        id++;
    }

    const categoryTypes = qsAll(".category-type");
    for (let k = 0; k < questionsData.length; k++) {
        // console.log(questionsData[k]);
        for (const categoryType of categoryTypes) {
            
            if (k == categoryType.dataset.id) {

                for (const answer of questionsData[k].answers) {

                    categoryType.innerHTML += `
                        <div class="category">
                            <h3>${answer.title}</h3>
                            <p>${answer.description}</p>
                        </div>`;
                }

            }

        }
        
    }

    bindEventsAll(".category-title h2", "click", handleCategoryTitles);

    bindEventsAll(".category", "click", handleCategory);

}

function handleCategory(){
    if (this.parentElement.classList.contains("choosed-main")) {
        // this.parentElement.classList.remove("choosed-main");
        if (this.classList.contains("choosed")) {
            this.parentElement.classList.remove("choosed-main");
            this.classList.remove("choosed");

        }
        
        this.classList.remove("category-type-chosed");
        this.classList.add("category");
    }
    else {
        this.classList.add("choosed");
        this.parentElement.classList.add("choosed-main");
        this.classList.add("category-type-chosed");
        this.classList.remove("category");

        addOrder(this);
    }  


}

function addOrder(element){
    if(element.parentElement.dataset.id == 0 && element.classList.contains("choosed")) {
        firstAnswer.innerHTML = `${element.firstElementChild.innerHTML}`;
    }
    if(element.parentElement.dataset.id == 1 && element.classList.contains("choosed")) {
        secondAnswer.innerHTML = `${element.firstElementChild.innerHTML}`;
    }
    if(element.parentElement.dataset.id == 2 && element.classList.contains("choosed")) {
        thirdAnswer.innerHTML = `${element.firstElementChild.innerHTML}`;
    }
    if(element.parentElement.dataset.id == 3 && element.classList.contains("choosed")) {
        fourthAnswer.innerHTML = `${element.firstElementChild.innerHTML}`;
    }
    if(element.parentElement.dataset.id == 4 && element.classList.contains("choosed")) {
        fifthAnswer.innerHTML = `${element.firstElementChild.innerHTML}`;
    }
}


function handleCategoryTitles(){
    if (this.classList.contains("active")) {
        this.classList.remove("active");
        this.nextElementSibling.classList.remove("category-type-after");
    }
    else {
        this.classList.add("active");
        this.nextElementSibling.classList.add("category-type-after");

    }

}
function init(){
    // bindCategoryTitles();
    showQuestions();
}

init();