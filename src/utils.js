export function parseQuery(query) { 
  let res = {}
  query.split("&").forEach(function (part) {
    let item = part.split("=")
    if(item[0] === "") return
    res[item[0].slice(1)] = decodeURIComponent(item[1])
  })
  return res
}