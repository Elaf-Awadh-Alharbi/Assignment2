
async function searchUniversities() {
  const input = document.getElementById("searchInput");
  const queryText = input.value.trim();

  
  if (!queryText) {
    document.getElementById("result").innerHTML =
      '<p class="no-results">Please type a title to search.</p>';
    return;
  }

  
  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(
    queryText
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById("result").innerHTML =
      '<p class="no-results">There was an error fetching data. Please try again.</p>';
  }
}


function displayData(list) {
  const container = document.getElementById("result");
  container.innerHTML = "";

  if (!list || list.length === 0) {
    container.innerHTML =
      '<p class="no-results">No results found. Try another title.</p>';
    return;
  }

  
  const header = document.createElement("h2");
  header.textContent = "Search Results";
  header.style.marginBottom = "15px";
  container.appendChild(header);

  list.forEach((item) => {
    const show = item.show;

    const card = document.createElement("div");
    card.className = "card";

    const imageUrl =
      show.image && show.image.medium ? show.image.medium : null;
    const language = show.language || "Unknown";
    const premiered = show.premiered || "Unknown";
    const link = show.officialSite || show.url || "#";

    const imageHtml = imageUrl
      ? `<img src="${imageUrl}" alt="Poster for ${show.name}" class="card-image" />`
      : "";

    card.innerHTML = `
      ${imageHtml}
      <div class="card-content">
        <h3>${show.name}</h3>
        <p>Language: ${language}</p>
        <p>Premiered: ${premiered}</p>
        ${
          link !== "#"
            ? `<a href="${link}" target="_blank">View Details</a>`
            : ""
        }
      </div>
    `;

    container.appendChild(card);
  });
}
