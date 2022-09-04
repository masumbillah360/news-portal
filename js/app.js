// load categories from api 
const categoriesLoader = async(url)=>{
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        setCategories(data.data.news_category);
    } catch (error) {
        alert(`Please Connect Your Network.${+error}`)
    }    
}
// set categories function on web page to get load categories function 
const setCategories = (categories)=>{
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category=>{
        const categoryList = document.createElement('li');
        categoryList.classList.add('nav-item')  
        categoryList.innerHTML  = `
            <a class="cat-btn nav-link text-dark" onclick = "loadNews('${category.category_id}','${category.category_name}')" href="#">${category.category_name}</a>
        `
        categoryContainer.appendChild(categoryList);
    })
}
categoriesLoader()

// Loading spinner function for web page 
const loadSpinner = (isLoading)=>{
    const loadSpinner = document.getElementById('loading-spinner');
    if (isLoading) {    
        loadSpinner.classList.remove('d-none')
    }
    else{
        loadSpinner.classList.add('d-none');
    }
}
// function for loading news from api 
const loadNews = async(id,name)=>{
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
        const data = await res.json();
        setNews(data,name); 
    } catch (error) {
        alert(`Please Connect Your Network and try agin ${error}`)
    }
}
const setNews = (data,name)=>{
    const catCounter = document.getElementById('category-counter');
    catCounter.innerHTML = `
        <div class="alert alert-secondary" role="alert">
        <h6 class = " p-3 rounded bg-white">${data.data.length} News found for ${name}</h6>
        </div>
    `
    loadSpinner(true);
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    const newsData =  data.data;
    newsData.sort((a,b)=>{
        return b.total_view - a.total_view;
    })
    newsData.forEach(news=>{
        const {title,rating, thumbnail_url,details,author,total_view,_id} = news;
        const {name,published_date,img} = author;

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
                    <div class=" mt-5 row row-cols-2 row-cols-lg-4  gx-2 gx-lg-3 align-items-center text-center">
                        <div class="col">
                            <div class="d-flex align-items-center">
                                <a class="" href="#">
                                    <img src="${img?img:"not Found"}" alt="not found" width="60" height="64" class = "rounded-circle">
                                </a>
                                <div class="">
                                    <span class="d-block">${name?name:"not found"}</span>
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
                            <button type="button" onclick="modalNews('${_id}')" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >See More <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
    
        `
        newsContainer.appendChild(createNews)
    })
    loadSpinner(false);
}

const modalNews = async(id)=>{
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        const data = await res.json();
        setModalNews(data);
    } catch (error) {
        alert(`Connect Your network ${error}`);
    }
}

const setModalNews =(newsModal)=>{
    // console.log(newsModal.data);
    newsModal.data.forEach(news=>{
        const {title, details, image_url,thumbnail_url,total_view,rating,author}= news;
        console.log(author);
        const modalTitle = document.getElementById('modal-title');
        modalTitle.innerText = title;
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
        
        <div class="card">
            <img src="${image_url?image_url:'no image'}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <p class="card-text">${details?details:"No Description for this news"}</p>

                <div class=" mt-5 row justify-content-center align-items-center text-center">
                <div class="col col-md-4 align-items-center justify-content-center">
                    <a class="" href="#">
                        <img src="${author.img?author.img:"no image found"}" alt="not found" width="60" height="64" class = "rounded-circle">
                    </a>
                    <div class="">
                        <span class="d-block">${author.name?author.name:"no name found"}</span>
                        <span>${author.published_date?author.published_date:"no published date"}</span>
                    </div>
                </div>
        
                <div class = "row justify-content-around align-items-center">
                <div class= "col-md-6">
                        <span><i class="fa-solid fa-eye"></i> ${total_view?total_view:"not view yet"}</span>
                    </div>
                    <div class = "col-md-6">
                        <span class="text-center d-block">${rating.number?rating.number:"no rating"}</span>
                        <i class="fa-solid fa-star text-warning"></i>
                        <i class="fa-solid fa-star text-warning"></i>
                        <i class="fa-solid fa-star text-warning"></i>
                        <i class="fa-solid fa-star text-warning"></i>
                        <i class="fa-solid fa-star-half-stroke text-warning"></i>
                    </div>
                </div>
            </div>
               
            </div>
        </div>

    `
    })
}
modalNews()

loadNews('01','Breaking News')