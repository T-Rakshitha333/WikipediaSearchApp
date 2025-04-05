let search = document.getElementById("searchInput");
let resultsEl = document.getElementById("searchResults");
let loding = document.getElementById("spinner");

function appendresults(results) {
    loding.classList.add("d-none");
    resultsEl.classList.remove("d-none");
    let {
        title,
        link,
        description
    } = results;
    let divEl = document.createElement("div");
    divEl.classList.add("result-item");
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    divEl.appendChild(titleEl);
    let titlebrEl = document.createElement("br");
    divEl.appendChild(titlebrEl);
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.textContent = link;
    divEl.appendChild(urlEl);
    let linebr = document.createElement("br");
    divEl.appendChild(linebr);
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    divEl.appendChild(descriptionEl);
    resultsEl.appendChild(divEl);

}

function displayresults(search_results) {
    for (let results of search_results) {
        appendresults(results);
    }
}
search.addEventListener("keydown", function(event) {
    let input = search.value;
    if (event.key === "Enter") {
        loding.classList.remove("d-none");
        resultsEl.classList.add("d-none");
        let options = {
            method: "GET"
        }
        fetch("https://apis.ccbp.in/wiki-search?search=" + input, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayresults(search_results);
            });
    }
});
