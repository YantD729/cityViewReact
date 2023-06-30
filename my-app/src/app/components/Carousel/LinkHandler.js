export function extractPageFromLink(link) {
    const regex = /[?&]page=(\d+)/
    const match = regex.exec(link)
    if (match) {
      return parseInt(match[1])
    }
    return null
  }
  
function extractLink(links, rel) {
    const regex = new RegExp(`<([^>]+)>;\\s*rel="${rel}"`, "i");
    const match = regex.exec(links);
    if (match) {
        return match[1];
    }
    return null;
}

export function extractPage(links, rel) {
    return extractPageFromLink(extractLink(links, rel));
}

export function changePageInLink(link, newPage) {
    const regex = /(&|\?)page=\d+/
    return link.replace(regex, `$1page=${newPage}`)
}