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
  render();
};

const render = () => {
  let newsHTML = "";
  newsHTML = news.map((news) => {
    return `<div class="row news">
    <div class="col-lg-4">
      <img
        class="news-img-size"
        src="https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_302/104_%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.jpg"
      />
    </div>
    <div class="col-lg-8">
      <h2>오드아이 고양이</h2>
      <p>고양이가 세상을 구했다고 한다</p>
      <div>출처 : 내 마음</div>
    </div>
  </div>`;
  });

  document.getElementById("news-board").innerHTML = newsHTML;
};
getLatestNews();
