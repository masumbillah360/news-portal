const categoriesLoader = async(url)=>{
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        setCategories(data.data.news_category);
    } catch (error) {
        alert("Error is herer \n"+error)
    }
    
}
const setCategories = (categories)=>{
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category=>{
        // console.log(category)
        const categoryList = document.createElement('li');
        categoryList.classList.add('nav-item')
        // onclick = "loadNews('${category.category_id}')"  
        categoryList.innerHTML  = `
            <a class="cat-btn nav-link text-dark" onmouseover = "loadNews('${category.category_id}')" href="#">${category.category_name}</a>
        `
        categoryContainer.appendChild(categoryList);

    })

}
categoriesLoader()
// setCategories()

const loadNews=async(id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    const catBtn = document.getElementsByClassName('cat-btn');
    const catCounter = document.getElementById('category-counter');
    for(const btn of catBtn){
        btn.addEventListener("click",(e)=>{
            // console.log(btn);
            // console.log(e.target.innerText);
            catCounter.innerHTML = `
    <div class="alert alert-secondary" role="alert">
    <h6 class = " p-3 rounded bg-white">${data.data.length} Item's found for this ${e.target.innerText}</h6>
    </div>
    `;

    const newsContainer = document.getElementById('news-container');
    
    newsContainer.textContent = '';
    const newsData =  data.data;
    newsData.forEach(news=>{
        // console.log(news)
        const {title,rating, thumbnail_url,details,author,total_view} = news;
        const {name,published_date,img} = author;
        // console.log(published_date.length);
        const createNews = document.createElement('article');
        createNews.classList.add('card', 'my-3');
        createNews.innerHTML = `
        <div class = "row gx-0">
            <div class="col-md-4 text-center">
                <img src="${thumbnail_url?thumbnail_url:""}" class="img-fluid w-100 py-4 px-3 rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${title?title:"not Found"}</h5>
                    <p class="card-text pt-5">${details.length>450?details.slice(0,450)+"...":details}</p>
                    <div class=" card-footer mt-5 row row-cols-2 row-cols-lg-4  gx-2 gx-lg-3 align-items-center text-center">
                        <div class="col">
                            <div class="d-flex align-items-center">
                                <a class="navbar-brand" href="#">
                                    <img src="${img?img:"not Found"}" alt="" width="60" height="64" class = "rounded-circle">
                                </a>
                                <div class="">
                                    <span>${name?name:"not found"}</span>
                                    <span>${published_date? published_date.slice(0,11):"not found"}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <span><i class="fa-solid fa-eye"></i> ${total_view?total_view:"No View Yet"}</span>
                        </div>
                        <div class="col">
                        <span class="text-center d-block">${rating.number?rating.number:"no rating"}</span>
                        <i class="fa-solid fa-star text-warning"></i>
                        <i class="fa-solid fa-star text-warning"></i>
                        <i class="fa-solid fa-star text-warning"></i>
                        <i class="fa-solid fa-star text-warning"></i>
                        <i class="fa-solid fa-star-half-stroke text-warning"></i>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >See More <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
    
        `
        newsContainer.appendChild(createNews)
        
    })


        })
    }
}
// loadNews();
loadNews('08')
{/* <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star-half-stroke"></i>*/}