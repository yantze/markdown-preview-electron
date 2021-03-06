// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fetch = require('node-fetch')

const logger = {
    debug: (...args) => console.log(...args),
}

class FileManager {
    constructor() {
        this.sourcePath = '/source'

        const Dropbox = require('dropbox').Dropbox
        this.dbx = new Dropbox({
            accessToken: process.env.DROPBOX_TOKEN,
            fetch,
        })
        // window.dbx = this.dbx

        // Create sourcePath if no exist for storing file
        this.dbx.filesListFolder({ path: '' }).then(listFolder => {
            const isExistSource = listFolder.entries.some(
                foldInfo => foldInfo.path_lower === this.sourcePath,
            )
            if (!isExistSource) {
                this.dbx
                    .filesCreateFolderV2({ path: this.sourcePath })
                    .catch(err => {
                        console.error(err)
                    })
            }
        })
    }

    async filesListFolder(dirPath) {
        if (!dirPath) dirPath = this.sourcePath
        const listFiles = await this.dbx.filesListFolder({
            path: dirPath,
            recursive: true,
        })
        let fileList = listFiles.entries.map(fileInfo => fileInfo)

        return fileList
    }

    async writeFile(filePath, content) {
        const timestamp = Date.now()
        // try {
        //     await this.dbx.filesGetMetadata({ path: filePath })
        //     await this.dbx.filesDeleteV2({ path: filePath })
        // } catch (e) {
        //     e
        // }

        await this.dbx.filesUpload({
            path: filePath,
            contents: content,
            mode: 'overwrite',
        })
        logger.debug('Write file cost:', Date.now() - timestamp, 'ms')
    }

    async directoryTree() {}
}

// async function demo() {
//     const fileManager = new FileManager()
//     fileManager.getFileList().then(console.log)

//     const content = 'bbbxx dddejjejxxxbbbb'
//     const time = Date.now()
//     await fileManager.writeFile('/source/test.md', content)
//     console.log('Write file cost:', Date.now() - time, 'ms')

//     // const fileListEntries = await fileManager.getFileList()
//     // console.log('fileList:', fileListEntries.map(e => e.path_display))
// }

module.exports = {
    fileManager: new FileManager(),
}
