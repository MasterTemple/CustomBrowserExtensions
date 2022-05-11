// always puts translation in ESV so I don't need to change if I clicked on a link that was not in ESV

let newUrl = window.location
  .toString()
  .replace(/(?<=version\=)[^\&]+/gi, "ESV");

if (
  newUrl.toLocaleLowerCase() != window.location.toString().toLocaleLowerCase()
) {
  window.location = newUrl;
}
