const videos = [
  {
    link: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FRccgOpenHeavensHalifax%2Fvideos%2F1358225668259344%2F&show_text=false&width=560&t=0",
    by: "Best Agho",
  },
  {
    link: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FRccgOpenHeavensHalifax%2Fvideos%2F674941480843484%2F&show_text=false&width=560&t=0",
    by: "Best Agho",
  },
  {
    link: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FRccgOpenHeavensHalifax%2Fvideos%2F542440644105645%2F&show_text=false&width=560&t=0",
    by: "Best Agho",
  },
  {
    link: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FRccgOpenHeavensHalifax%2Fvideos%2F3184968661813610%2F&show_text=false&width=560&t=0",
    by: "Best Agho",
  },
  {
    link: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FRccgOpenHeavensHalifax%2Fvideos%2F1086452808709893%2F&show_text=false&width=560&t=0",
    by: "Best Agho",
  },
];

const container = document.getElementById("video");
videos.forEach((video) => {
  const div = document.createElement("div");
  div.className = "video-in";
  const content =
    "<iframe src=" +
    video.link +
    ' width="50%" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>';
  div.innerHTML += content;
  container.append(div);
});
