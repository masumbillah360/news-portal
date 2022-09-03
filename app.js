const categoriesLoader = async(url)=>{
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        setCategories(data.data.news_category);
    
}
const setCategories = (categories)=>{
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category=>{
        // console.log(category)
        const categoryList = document.createElement('li');
        categoryList.classList.add('nav-item')
        // onclick = "loadNews('${category.category_id}')" 
        categoryList.innerHTML  = `
            <a class="cat-btn nav-link text-dark" onclick = "loadNews('${category.category_id}')" href="#">${category.category_name}</a>
        `
        categoryContainer.appendChild(categoryList);

    })

}
categoriesLoader()
// setCategories()

const loadNews=async(id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    setNews(data);
}
const setNews = async(data)=>{
    
    const catCounter = document.getElementById('category-counter');
    const newsContainer = document.getElementById('news-container');
    catCounter.innerHTML = `
        <p>${data.data.length} Item's found</p>
    `;
    newsContainer.textContent = '';
    const newsData =  await data.data;
    newsData.forEach(news=>{
        console.log(news)
        const {title,rating, thumbnail_url,details,author} = news;
        const {name,published_date,img} = author;
        // console.log(published_date.length);
        const createNews = document.createElement('article');
        createNews.classList.add('card', 'my-3');
        createNews.innerHTML = `
        <div class = "row gx-0">
            <div class="col-md-4">
                <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${title?title:"not Found"}</h5>
                    <p class="card-text">${details.length>250?details.slice(0,250)+"...":details}</p>
                    <div class="card-footer row row-cols-2 row-cols-lg-4 mt-5 gx-2 gx-lg-3 align-items-center text-center">
                        <div class="col">
                            <div class="d-flex align-items-center">
                                <a class="navbar-brand" href="#">
                                    <img src="${img?img:"not Found"}" alt="" width="60" height="64" class = "rounded-circle">
                                </a>
                                <div class="">
                                    <h6>${name?name:"not found"}</h6>
                                    <p>${published_date? published_date.slice(0,11):"not found"}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <h5><i class="fa-solid fa-eye"></i>1.5M</h5>
                        </div>
                        <div class="col">
                        <span class="text-center d-block">${rating.number?rating.number:"no rating"}</span>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>

                        
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-outline-danger">See More <i
                                    class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
    
        `
        newsContainer.appendChild(createNews)
        
    })
}


{/* <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star-half-stroke"></i>*/}