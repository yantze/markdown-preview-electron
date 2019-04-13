const R = require('./renderer.js')


async function demo() {

    async function getList() {
        const filesList = await R.fileManager.filesListFolder()
        const dirObj = []
        for (let unit of filesList) {
            const item = {
                path: unit.path_lower,
                name: unit.name,
                size: unit.size,
                type: unit['.tag'],
            }
            dirObj.push(item)
        }
        return dirObj
    }

    const ret = await getList()
    console.log('ret:', ret)

}
// demo()

R.fileManager.filesListFolder().then(data => {
    console.log('data:', data)
    window.data = data
}).catch(e => {
    console.log('e:', e)
})
