window.onload = function () {
    let btnAuthor = document.getElementById("sortAuthor-btn");
    let btnTitle = document.getElementById("sortTitle-btn");
    let articles;


    // Function for creating elements that you pass in the parameter
    function createNode(element) {
        return document.createElement(element);
    }
    // Function for appending the second parameter to the first
    function append(parent, el) {
        return parent.appendChild(el)
    }

    // Function that takes a string and change it to a valid data for date
    function parseDate (date) {
        var d = '';
        var t = date.indexOf('T');
        let index = date.indexOf('-');
        
        if(index === -1 && t === 8){
            d += date.substring(0, 4) + '-';
            d += date.substring(4, 6) + '-';
            d += date.substring(6, 8) + date.substr(8);
        } else if (index > -1 && t === 10) {
            return date;
        } else {
            console.error('invalid date');
            return null;
        }
        return d;
    }

    //Function for sorting articles by Author
    function sortAuthor(a, b) {
        if (a.author < b.author) {
            return -1;
        }
        if (a.author > b.author) {
            return 1;
        }
        return 0;
    }

    // Function for sorting articles by Titles
    function sortTitle(a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }





    const news = document.getElementById('news-container')

    const url = 'https://s3.eu-west-2.amazonaws.com/enfo-test-resources/api/articles.json';

    function createAndAppendMarkup() {
    return articles.forEach(function(article) { // Map through the results and for each run the code below
        let titles = createNode ('div'), // Create the elements we need 
            title = createNode('h3'),
            img = createNode ('img'),
            author = createNode('div'),
            description = createNode('div'),
            origin = createNode('div'),
            published = createNode('div');
        if (!article.title || article.title == null ) { // Checks if object title: is null or empty runs if not writs it out.
        title.innerHTML = `Title: missing`
        } else {
        title.innerHTML = ` ${ article.title }`;   
        }
        if ( article.author == null ) {
        author.innerHTML = `Author: missing`
        } else {
        author.innerHTML = `Author: ${ article.author }`;
        }
        if (article.urlToImage == null) {
        img.innerHTML = `Picture: missing`
        } else {
        img.src = article.urlToImage;
        }
        if ( article.description == null ) {
        description.innerHTML = `Description: missing`
        } else {
        description.innerHTML = ` Description: ${ article.description }`;
        }
        if ( article.url == null ) {
        origin.innerHTML = `Url: missing`
        } else {
        origin.innerHTML = `Url: ${ article.url }`;
        }
        let date = new Date(parseDate(article.publishedAt));
        if ( article.publishedAt == null ) {
        published.innerHTML = `Url: missing`
        } else {
        published.innerHTML = date.toString();
        }
        titles.className = "article-container"; // Add className to the created elements
        author.className = "author";
        description.className = "description";
        origin.className = "origin";
        published.className = 'published';
        append(titles, title); // Append all our elements
        append(titles, img);
        append(titles, author);
        append(titles, description);
        append(titles, origin);
        append(titles, published);
        append(news, titles);

    })
    }

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {                                      
        articles = data.articles; 
        return createAndAppendMarkup();
    })
    .catch(function(error) { // Catches any error and writes it out in the console
    console.log(error);
    }); 

    btnAuthor.onclick = function handleSortAuthor () {
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {                                      
            articles = data.articles; 
        })
        document.getElementById('news-container').innerHTML = "";
        articles.sort(sortAuthor);

        return createAndAppendMarkup(); 
    };

    btnTitle.onclick = function handleSortTitleClick () { // onClick function for generating the articles in order of there Titles
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {                                      
            articles = data.articles; 
        })
        document.getElementById('news-container').innerHTML = ""; // Clear out all content inside "news-container" div
        articles.sort(sortTitle);
        return createAndAppendMarkup();
    };
};

