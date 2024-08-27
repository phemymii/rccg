const videosPerPage = 10;
let currentPage = 1;
let videos = []; // Define globally so it's accessible in other functions

function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getUTCDate();
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  let daySuffix = "th";
  if (day === 1 || day === 21 || day === 31) daySuffix = "st";
  else if (day === 2 || day === 22) daySuffix = "nd";
  else if (day === 3 || day === 23) daySuffix = "rd";
  return `${day}${daySuffix} of ${month}, ${year}`;
}

function renderVideos(page) {
  const start = (page - 1) * videosPerPage;
  const end = start + videosPerPage;
  const paginatedVideos = videos.slice(start, end);

  const videoGrid = document.getElementById("video");
  videoGrid.innerHTML = ""; // Clear previous videos

  paginatedVideos.forEach((item) => {
    const videoId = item.videoId;
    const videoTitle = item.snippet.title;
    const publishTime = item.snippet.publishedAt;
    const formattedDate = formatDate(publishTime);
    const liveBroadcastContent = item.snippet.liveBroadcastContent;

    const colDiv = document.createElement("div");
    colDiv.className = "col-12 col-md-6 col-lg-4 card";
    colDiv.innerHTML = `
                        <iframe src="https://www.youtube.com/embed/${videoId}" 
                                class="video-iframe"
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                        </iframe>
                        <div class="card-body">
                            <div class="card-title"><span>Title:</span> ${videoTitle}</div>
                            ${
                              liveBroadcastContent !== "none"
                                ? `<div class="card-title"><img src="images/live.png" alt="Live" width="50px" /></div>`
                                : ""
                            }
                        </div>
                `;
    videoGrid.appendChild(colDiv);
  });
}
{
  /* <div class="card-title"><span>Date:</span> ${formattedDate}</div> */
}
function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item";

    const div = document.createElement("div");
    div.className =
      "page-circle" + (i === currentPage ? " active-background" : "");
    div.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;

    li.appendChild(div);
    pagination.appendChild(li);
  }
}

function changePage(page) {
  currentPage = page;
  renderVideos(currentPage);
  renderPagination(Math.ceil(videos.length / videosPerPage));
}

// Fetch and initialize data
document.addEventListener("DOMContentLoaded", () => {
  fetch("/youtube-videos")
    .then((response) => response.json())
    .then((data) => {
      // Assuming data is in the expected format
      videos = data?.items?.map((i) => ({
        videoId: i.id.videoId,
        snippet: i.snippet,
      }));
      renderVideos(currentPage);
      renderPagination(Math.ceil(videos.length / videosPerPage));
    })
    .catch((error) => console.error("Error fetching videos:", error));
});
