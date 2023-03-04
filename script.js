const menuIcon = document.querySelector(".menuIcon");
const menuCloser = document.querySelector(".menuCloser");
const menuLinks = document.querySelectorAll(".menu a");
const menu = document.querySelector(".menu");

const toggleMenu = () => {
  menuIcon.classList.toggle("active");
  menuCloser.classList.toggle("active");
  menu.classList.toggle("active");
};

menuIcon.addEventListener("click", toggleMenu);
menuCloser.addEventListener("click", toggleMenu);
menuLinks.forEach((link, index) => {
  if (index < 4)
    link.addEventListener("click", toggleMenu);
});


window.addEventListener(
  "scroll",
  () => {
    document.body.style.setProperty("--scroll", window.pageYOffset / 300);
  },
  false
);

const articles = document.querySelectorAll(".contentGrid article");
let screenMid = window.innerHeight / 2; // calculate the center of the screen

window.addEventListener("resize", () => {
  screenMid = window.innerHeight / 2; // recalculate the center of the screen on resize
});

window.addEventListener("scroll", () => {
  articles.forEach((article) => {
    if (
      article.getBoundingClientRect().bottom < 0 ||
      article.getBoundingClientRect().top > window.innerHeight
    )
      return;

    const articleMid =
      (article.getBoundingClientRect().top +
        article.getBoundingClientRect().bottom) /
      2; // get the top position of each article
    const distance = Math.abs(screenMid - articleMid); // calculate the distance of the article from the center
    let opacity = 1.50 - distance / screenMid; // calculate the opacity based on the distance

    if (opacity > 1) opacity = 1;
    // set opacity to 1 if it's greater than 1
    else if (opacity < 0.25) {
      opacity = 0.25;
      const video = article.querySelector('video');
      if (video) video.pause();
    }
    // prevent the opacity from going below 0.25 and pause any video with an opacity of 0.25


    article.style.opacity = opacity; // set the opacity of the article
  });
});