const { dump } = require('dumper.js')
const data = {
    "entries": [
        {
            ".tag": "file",
            "name": "zhi yang - small.svg",
            "path_lower": "source/zhi yang - small.svg",
            "path_display": "/source/zhi yang - small.svg",
            "id": "id:ys8ZiAJ35rAAAAAAAADuug",
            "client_modified": "2019-04-09T08:44:37Z",
            "server_modified": "2019-04-09T08:44:37Z",
            "rev": "015000000013b1efe60",
            "size": 33334,
            "content_hash": "2067c2741666174ac1d02e8d13c7947f0a9ab588adbc7f2e6348d2f20e11e2fb"
        },
        {
            ".tag": "file",
            "name": "abc.md",
            "path_lower": "source/bbute/abc.md",
            "path_display": "/source/bbute/abc.md",
            "id": "id:ys8ZiAJ35rAAAAAAAADuxw",
            "client_modified": "2019-04-11T02:17:21Z",
            "server_modified": "2019-04-13T02:53:02Z",
            "rev": "0139000000013b1efe60",
            "size": 12075,
            "content_hash": "cd04ff5b34eef6a5a53f4f9b57dd9cbe24667329e54af6c56100a83ec306bf34"
        }
    ],
}

const get = (obj, p) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, obj)

function opera(item, tree, prefix = null) {
    if (item['.tag'] === 'folder') return

    const remainSplit = item.path_lower.substr(prefix ? prefix.length : 0).split('/')
    if (!prefix && remainSplit.length > 1) {
        prefix = remainSplit[0] + '/'
        remainSplit.shift()
    }

    const prefixSplit = prefix === '' ? [''] : prefix.substr(0, prefix.length-1).split('/')
    let curTree = get(tree, prefixSplit)
    if (!curTree) {
        tree[prefixSplit[0]] = {
            prefix,
            children: [],
        }
        curTree = get(tree, prefixSplit)
    }

    if (remainSplit.length === 1) {
        curTree.children.push(item)
    } else {
        const newPrefix = prefixSplit.concat([remainSplit[0], '']).join('/')
        if (!curTree[remainSplit[0]]) {
            curTree[remainSplit[0]] = {
                prefix: newPrefix,
                children: [],
            }
        }
        opera(item, tree, newPrefix)
    }
}

const tree = {}
for (const item of data.entries) {
    opera(item, tree)
}

dump(tree)
