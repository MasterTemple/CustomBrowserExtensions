/*
Created by Fluffy_User_0x06
I know there are better ways to toggle, but this works so it's fine :)
*/
window.addEventListener("load", () => {
  alert("load");
});
window.addEventListener("loadeddata", () => {
  alert("loadeddata");
});

document.addEventListener("keydown", function (event) {
  // ALT + T toggles hiding/showing Origin IDs
  if (event.altKey && event.key === "t") {
    // searching users
    try {
      [
        ...document.querySelectorAll(
          "li.l-origin-search-peoplelist-item > origin-home-discovery-tile-recfriends > div:nth-child(1) > div:nth-child(2) > h3:nth-child(1) > a:nth-child(1) > strong:nth-child(1)"
        ),
      ].forEach((element, index) => {
        if (element.textContent.includes("[")) {
          element.textContent = element.textContent.replace(/ \[\d+\]/gim, "");
        } else {
          element.textContent =
            element.textContent +
            " [" +
            document
              .querySelector(
                `.l-origin-search-peoplelist-item:nth-child(${
                  index + 1
                }) > origin-home-discovery-tile-recfriends`
              )
              .getAttribute("userid") +
            "]";
        }
      });
    } catch (error) {
      console.log(error);
    }
    // specific user
    try {
      let specificUserName =
        document.querySelector(".otktitle-page").textContent;
      if (specificUserName.includes("[")) {
        document.querySelector(".otktitle-page").textContent =
          specificUserName.replace(/ \[\d+\]/gim, "");
      } else {
        document.querySelector(".otktitle-page").textContent += ` [${document
          .querySelector(
            "#content > div:nth-child(1) > div:nth-child(1) > origin-profile-header:nth-child(1)"
          )
          .getAttribute("nucleusid")}]`;
      }
    } catch (error) {
      console.log(error);
    }
  }
});
