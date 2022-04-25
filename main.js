let news = [];
const getLatestNews = async () => {
  let url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=5`
  );
  let header = new Headers({
    "x-api-key": "",
  });
  let response = await fetch(url, { headers: header });
  let data = await response.json();
  news = data.articles;
  console.log(news);
};

const render = () => {
  let newsHTML = "";

  document.getElementById("news-board").innerHTML = newsHTML;
};
getLatestNews();
