let news = [];
let page = 1;
let total_pages = 0;
let menus = document.querySelectorAll(".menus button");
let searchBtn = document.getElementById("search-btn");
//console.log("서치버튼클릭", searchBtn);
let url;

menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": "mq7AfahUuQLPwY4_WhXjc9YCjgQKkKz6KhZvMbEDthE",
    });
    let response = await fetch(url, { headers: header });
    let data = await response.json();
    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error("검색된 결괏값이 없습니다!!!");
      }
      console.log("receive data는", data);
      news = data.articles;
      total_pages = data.total_pages;
      page = data.page;
      console.log(news);
      render();
      pagenation();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("잡힌 에러는", error.message);
    errorRender(error.message);
  }
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

const errorRender = (message) => {
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">
${message}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const pagenation = () => {
  let pagenationHTML = ``;
  //total_page
  //page
  //pageGroup
  let pageGroup = Math.ceil(page / 5);
  //last
  let last = pageGroup * 5;
  //fiest
  let first = last - 4;
  //first~lst page print
  for (let i = first; i <= last; i++) {
    pagenationHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
  }
  document.querySelector(".pagination").innerHTML = pagenationHTML;
};

searchBtn.addEventListener("click", getNewsByKeyword);
getLatestNews();
