// covid19.ddc.moph.go.th

const fetchAPI = async (link) => {
    const option = {
        method: "GET",
        hearder: {
            "Content-Type": "application/json"
        }
    }
    const data = await fetch(link , option)
        .then(res => res.json())
        .then(data => data)
        .catch(rej => console.error(rej));
    // console.log(data);
    return data;
}

const getData = fetchAPI('https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces');
export { fetchAPI , getData };