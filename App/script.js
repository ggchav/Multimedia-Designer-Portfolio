const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

const menu = qs(".menu");
const menuIcon = qs(".menuIcon");
const menuCloser = qs(".menuCloser");
const menuLinks = qsa(".menu a");

const toggleMenu = () => {
  [menuIcon, menuCloser, menu].forEach((el) => el.classList.toggle("active"));
};

menuIcon.addEventListener("click", toggleMenu);
menuCloser.addEventListener("click", toggleMenu);
menuLinks.forEach((link, index) => {
  if (index < 4) link.addEventListener("click", toggleMenu);
});

const setScrollProperty = () => {
  document.body.style.setProperty("--scroll", window.pageYOffset / 300);
};

window.addEventListener("scroll", setScrollProperty, false);

const articles = qsa(".contentGrid article");
let screenMid = window.innerHeight / 2;

const setScreenMid = () => {
  screenMid = window.innerHeight / 2;
};

window.addEventListener("resize", setScreenMid);

const setArticleOpacity = (article) => {
  const bounds = article.getBoundingClientRect();
  let opacity = 1;

  if ((bounds.y + bounds.height) <= 0 || bounds.y >= window.innerHeight) {
    opacity = 0.25;
    const video = article.querySelector("video");
    if (video) video.pause();
  } else if ((bounds.y + bounds.height) < screenMid) {
    opacity = 0.25 + (bounds.y + bounds.height) / screenMid;
  } else if (bounds.y > screenMid) {
    opacity = 2.25 - bounds.y / screenMid;
  }

  article.style.opacity = opacity;
};

window.addEventListener("scroll", () => {
  articles.forEach(setArticleOpacity);
});
