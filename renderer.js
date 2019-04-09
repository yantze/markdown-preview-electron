// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


class FileManager {
    constructor() {
        this.sourcePath = '/source'

        const Dropbox = require('dropbox').Dropbox
        this.dbx = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN })

        this.dbx.filesListFolder({path: ''}).then(listFolder => {
            const isExistSource = listFolder.entries.some(foldInfo => foldInfo.path_lower === this.sourcePath)
            if (!isExistSource) {
                this.dbx.filesCreateFolderV2({path: this.sourcePath}).catch(err => {
                    console.error(err)
                })
            }
        })
    }

    async getFileList() {
        const listFiles = await this.dbx.filesListFolder({path: this.sourcePath})
        let fileList = listFiles.entries.map(fileInfo => fileInfo)

        return fileList
    }

    async writeFile(filePath, content) {
        await this.dbx.filesUpload({path: filePath, contents: content})
    }
}

async function demo() {

    const fileManager = new FileManager()
    fileManager.getFileList().then(console.log)

    const content = 'bbbxx dddejjej'
    fileManager.writeFile('/source/test.md', content)

}

demo()

