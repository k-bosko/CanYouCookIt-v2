function getUnique(arr, index) {
  const unique = arr
    .map((e) => e[index])

    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter((e) => arr[e])
    .map((e) => arr[e]);

  return unique;
}

function removeHtmlTags(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

const INGREDIENTS_PER_PAGE = 3;

export { getUnique, removeHtmlTags, INGREDIENTS_PER_PAGE };
