const constants={
  rootTag: "ts-skype-status"
}

chrome.runtime.onMessage.addListener((message, sender, response) => {
  let status = statusFun();
  response({ status });
});

const statusFun = () => {
  let x = document.getElementsByClassName(constants.rootTag);

  let y = Array.from(x).map((item) => {
    if (item)
      return (
        item.parentElement.firstElementChild.nextElementSibling?.title +
        " || " +
        item.parentElement.firstElementChild.firstElementChild.firstElementChild
          .ariaLabel
      );
  });
  return y;
};


