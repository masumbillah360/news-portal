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
        categoryList.innerHTML  = `
            <a onclick = "loadNews('${category.category_id}')" class="nav-link text-dark" href="#">${category.category_name}</a>
        `
        categoryContainer.appendChild(categoryList);
    })
}
const loadNews=async(id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    setNews(data);
}
const setNews = async(data)=>{
    console.log(data);
    const catCounter = document.getElementById('category-counter');
    catCounter.innerHTML = `
        <p>${data.data.length} Item's found on ${data.data.category_name}</p>
    `
}
categoriesLoader()
