/* 0.50 mis */

const apikey = "aa7333f4c3d24750b502b4a04c22d643";
const blogContainer = document.getElementById("blog-container");
const searchField=document.getElementById("search-input");
const searchBtn=document.getElementById("search-button");

async function fetchRandomNews() {
    try {
          const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apikey}`;  
        
         
        
       
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log(data)
        return data.articles; // Return articles array
    } catch (error) {
        console.log({ message: error.message });
        return []; // Return empty array in case of error
    }
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        await displayBlogs(articles);
    } catch (error) {
        console.log({ message: error.message });
    }
})();

 searchBtn.addEventListener("click",async()=>{
    const query=searchField.value.trim();
    if (query !=="") {
        try{
            const articles=await fetchQuery(query);
            displayBlogs(articles)
        }
        catch(error){
            console.log({message:error.message})
        }
    }

});
const fetchQuery =async(query)=>{
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apiKey=${apikey}`; 
        
       
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log(data)
        return data.articles; // Return articles array
    }
    catch(error){
        console.log({message:error.message})

    }
}

const displayBlogs = async (articles) => {
    blogContainer.innerHTML = "";
    articles.map((item) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        
       
            const img = document.createElement("img");
            img.src = item.urlToImage;
            const title=document.createElement("h2")
          /*   title.textContent=item.title; */
          const truncatedTitle=item.title.length >30 ? item.title.slice(0,30)+"..." :item.title;
          title.textContent=truncatedTitle;
            const des=document.createElement("p");
           /*  des.textContent=item.description; */
           const truncatedDes=item.description?.length >50 ? item.description.slice(0,50)+"....":item.description;
           des.textContent=truncatedDes;

            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(des);
            blogCard.addEventListener("click",()=>{
                window.open(item.url,"_blank")
            })
        
        
        blogContainer.appendChild(blogCard);
    });
};

