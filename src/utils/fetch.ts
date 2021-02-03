export const fetchData = (url: string) => (endPoint: string) => (cb: Function) =>
  fetch(`${url}/${endPoint}`)
    .then(res => res.json())
    .then(res => cb(res))
    .catch(err => console.error(err))
