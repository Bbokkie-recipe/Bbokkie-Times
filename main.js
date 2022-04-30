let news = [];
let menus = document.querySelectorAll(".menus button");
let searchBtn = document.getElementById("search-btn");
//console.log("서치버튼클릭", searchBtn);
let url;

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

const getNews = async () => {
  let header = new Headers({
    "x-api-key": "mq7AfahUuQLPwY4_WhXjc9YCjgQKkKz6KhZvMbEDthE",
  });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  console.log(news);
  render();
};

const getLatestNews = async () => {
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=5`
  );
  getNews();
};

const getNewsByTopic = async (event) => {
  //console.log("클림됨", event.target.textContent);
  let topic = event.target.textContent.toLowerCase();
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topic}&page_size=5`
  );
  //console.log("uuu", url);
  getNews();
};

//1. 검색 키워드 읽어보기 2. url에 검색 키워드 붙이기 3.헤더준비 4. url 부르기 5. 데이터 가져오기 6. 데이터보여주기
const getNewsByKeyword = async () => {
  console.log("getNewsByKeyword()");
  //1. 검색 키워드 읽기
  let keyword = document.getElementById("search-input").value;
  //console.log("입력데이터", keyword);

  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&countries=KR&page_size=5`
  );
  getNews();
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
      <div><br></div>
      <p>${newsitem.summary.substring(0, 300) + "..."}</p>
      <div>${newsitem.rights}*${newsitem.published_date}</div>
    </div>
  </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

searchBtn.addEventListener("click", getNewsByKeyword);
getLatestNews();
