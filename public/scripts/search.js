// Will filter through the value being typed into the input and only show those that match
let searchFormInput = document.getElementById('search-form-input');
let searchResults = document.querySelectorAll('.search-result-instance');

console.log(searchFormInput);
searchFormInput.addEventListener('input',(e)=>{
    let query = e.target.value;
    console.log(query);
    // Match if title matches search query
    searchResults.forEach(result=>{
        // Get the results on the page currently

        // Get the title from the container id name
        let title = result.id.split('-')[0].toLowerCase();
        // Get the author
        let author = result.id.split('-')[1].toLowerCase();

        // If the substring the length of the query matches with author or title
        if(title.substring(0,query.length).includes(query.toLowerCase()) ||
            author.substring(0, query.length).includes(query.toLowerCase())){
            // If the book is in the query, then show it
            result.classList.add('search-result-instance');
            result.classList.remove('search-instance-hidden');
        }else{
            // If doesnt match then hide the results
            result.classList.add('search-instance-hidden');
            result.classList.remove('search-result-instance');
        }
        if(query==''){
            // If there is nothing typed then hide the results
            result.classList.add('search-instance-hidden');
            result.classList.remove('search-result-instance');
        }
    })

})