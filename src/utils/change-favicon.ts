export default function changeFavicon() {
  const favicon = document.getElementById("favicon");

  if (favicon) {
    document.head.removeChild(favicon);
  }

  const newFavicon = document.createElement("link");
  newFavicon.id = "favicon";
  newFavicon.rel = "icon";
  newFavicon.type = "image/png";
  newFavicon.href = "favicon2.png";

  document.head.appendChild(newFavicon);
}
