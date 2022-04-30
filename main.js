let news = [];
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);
const getLatestNews = async () => {
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=5`
  );
  let header = new Headers({
    "x-api-key": "mq7AfahUuQLPwY4_WhXjc9YCjgQKkKz6KhZvMbEDthE",
  });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  console.log(news);
  render();
};

const getNewsByTopic = (event) => {
  console.log("클림됨", event.target.textContent);
  let topic = event.target.textContent.toLowerCase();
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topic}&page_size=5`
  );
  console.log("uuu", url);
};

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((newsitem) => {
      return `<div class="row news">
    <div class="col-lg-4">
      <img
        class="news-img-size"
        src="${newsitem.media}"
      />
    </div>
    <div class="col-lg-8">
      <h4>${newsitem.title}</h4>
      <p>${newsitem.summary}</p>
      <div>${newsitem.rights}*${newsitem.published_date}</div>
    </div>
  </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};
getLatestNews();
