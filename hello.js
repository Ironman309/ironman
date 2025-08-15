function ent(event) {
  if (event.key === "Enter") {
    searchGoogle();
  }
}

const API_KEY = "AIzaSyDTzNrFTfKIXW2BPjYO2P1OwOGm3MHXvrI";
const CX = "3642f627d5f57465e";

function searchGoogle() {
    const query = document.querySelector(".ser-box").value.trim();
    if (!query) return;

    // Animate UI
    document.querySelector(".big-logo").classList.add("hide");
    document.querySelector(".bottom").classList.add("search-active");
    document.getElementById("results").style.display = "block";

    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";

            if (data.items) {
                data.items.forEach(item => {
                    const resultItem = document.createElement("div");
                    resultItem.style.display = "flex";
                    resultItem.style.alignItems = "center";
                    resultItem.style.marginBottom = "20px";
                    resultItem.style.gap = "10px";

                    // Image (if available)
                    let imgUrl = null;
                    if (item.pagemap && item.pagemap.cse_image && item.pagemap.cse_image.length > 0) {
                        imgUrl = item.pagemap.cse_image[0].src;
                    }
                    if (imgUrl) {
                        const img = document.createElement("img");
                        img.src = imgUrl;
                        img.alt = item.title;
                        img.style.width = "80px";
                        img.style.height = "80px";
                        img.style.objectFit = "cover";
                        img.style.borderRadius = "8px";
                        resultItem.appendChild(img);
                    }

                    // Link & title
                    const link = document.createElement("a");
                    link.href = item.link;
                    link.textContent = item.title;
                    link.target = "_blank";
                    link.classList.add("out");
                    link.style.flex = "1";

                    resultItem.appendChild(link);
                    resultsDiv.appendChild(resultItem);
                });
            } else {
                resultsDiv.textContent = "No results found.";
            }
        })
        .catch(error => console.error("Error:", error));
}
