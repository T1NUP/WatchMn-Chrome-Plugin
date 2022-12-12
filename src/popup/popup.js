const constants= {
  tagOfAll: "all",
  tagOfAvailable: "available",
  tagOfAway: "away",
  tagOfOut: "out",
  tagOfOther: "other",
  tagOfOffline: "offline"
}

var btnAll = document.getElementById("fetchAll");
var btnOn = document.getElementById("fetchOn");
var btnAw = document.getElementById("fetchAway");
var btnOf = document.getElementById("fetchOff");
var btnOth = document.getElementById("fetchOthr");
var btnOoo = document.getElementById("fetchO");
var list = document.getElementById("list");
var pane = document.getElementById("panel");

btnAll.addEventListener("click", () => {
  filterPageGuard(constants.tagOfAll);
});

btnOn.addEventListener("click", () => {
  filterPageGuard(constants.tagOfAvailable);
});

btnAw.addEventListener("click", () => {
  filterPageGuard(constants.tagOfAway);
});

btnOth.addEventListener("click", () => {
  filterPageGuard(constants.tagOfOther);
});

btnOoo.addEventListener("click", () => {
  filterPageGuard(constants.tagOfOut);
});

btnOf.addEventListener("click", () => {
  filterPageGuard(constants.tagOfOffline);
});

function filterPageGuard(type) {
  chrome.tabs.query(
    {
      url: "https://teams.microsoft.com/*",
    },
    (result) => {
      if (result[0]?.id) doGet(result[0].id, type);
      else {
        let error = "<h2>Sorry!! No teams app found!</h2>";
        pane.innerHTML = error;
      }
    }
  );
}

function doGet(data, type) {
  chrome.tabs.sendMessage(data, "HI from popup", (data) => {
    let online = [];
    let away = [];
    let offline = [];
    let ooo = [];
    let other = [];
    let showAll = data.status
      .map((item) => {
        let t = item.split("||");
        if (t[0]) {
          console.log(t[0]);
          if (t[1].split(" of")[1]) {
            if (t[0].trim() === "Offline") {
              offline.push(
                "<div class='card'>" +
                  t[1].split(" of")[1] +
                  "  " +
                  "<span>" +
                  t[0] +
                  "</span></div>"
              );
            } else if (t[0].trim() === "Available") {
              online.push(
                "<div class='card'>" +
                  t[1].split(" of")[1] +
                  "  " +
                  "<span>" +
                  t[0] +
                  "</span></div>"
              );
            } else if (t[0].trim() === "Away") {
              away.push(
                "<div class='card'>" +
                  t[1].split(" of")[1] +
                  "  " +
                  "<span>" +
                  t[0] +
                  "</span></div>"
              );
            } else if (t[0].trim() === "Out of Office") {
              ooo.push(
                "<div class='card'>" +
                  t[1].split(" of")[1] +
                  "  " +
                  "<span>" +
                  t[0] +
                  "</span></div>"
              );
            } else if (t[0].trim() === "Out of Office") {
              ooo.push(
                "<div class='card'>" +
                  t[1].split(" of")[1] +
                  "  " +
                  "<span>" +
                  t[0] +
                  "</span></div>"
              );
            } else {
              other.push(
                "<div class='card'>" +
                  t[1].split(" of")[1] +
                  "  " +
                  "<span>" +
                  t[0] +
                  "</span></div>"
              );
            }

            return (
              "<div class='card'>" +
              t[1].split(" of")[1] +
              "  " +
              "<span>" +
              t[0] +
              "</span></div>"
            );
          }
        }
      })
      .join("");
    console.log(showAll);

    if (type === constants.tagOfAll) {
      list.innerHTML = "<h3>All</h3>" + showAll;
    } else if (type === constants.tagOfAvailable) {
      list.innerHTML = "<h3>Online</h3>" + online.join("");
    } else if (type === constants.tagOfAway) {
      list.innerHTML = "<h3>Away</h3>" + away.join("");
    } else if (type === constants.tagOfOut) {
      list.innerHTML = "<h3>OOO</h3>" + ooo.join("");
    } else if (type === constants.tagOfOffline) {
      list.innerHTML = "<h3>Offline</h3>" + offline.join("");
    } else {
      list.innerHTML = "<h3>Others</h3>" + other.join("");
    }

    // console.log("Online, of,aw, ot, ooo", online, offline, away, other, ooo);
  });
}
