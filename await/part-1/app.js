let url = "http://numbersapi.com"
let favNum = 11
async function num() {
    let data = await axios.get(`${url}/${favNum}/?json`)
    console.log(data.data.text)
}

let favNums = [11, 22, 42]

async function nums() {
    let data = await axios.get(`${url}/${favNums}/?json`)
    console.log(data.data[11])
    console.log(data.data[22])
    console.log(data.data[42])
}

async function repeat() {
    let facts = await Promise.all([
        axios.get(`${url}/${favNum}/?json`),
        axios.get(`${url}/${favNum}/?json`),
        axios.get(`${url}/${favNum}/?json`),
        axios.get(`${url}/${favNum}/?json`)]
    )
    for (let i = 0; i < facts.length; i++) {
        console.log(facts[i].data.text)
    }
}