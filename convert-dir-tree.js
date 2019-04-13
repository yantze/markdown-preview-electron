const { dump } = require('dumper.js')
const data = {
    "entries": [
        {
            ".tag": "file",
            "name": "zhi yang - small.svg",
            "path_lower": "/source/zhi yang - small.svg",
            "path_display": "/source/zhi yang - small.svg",
            "client_modified": "2019-04-09T08:44:37Z",
            "server_modified": "2019-04-09T08:44:37Z",
            "size": 33334,
        },
        {
            ".tag": "file",
            "name": "abc.md",
            "path_lower": "/source/bbute/abc.md",
            "path_display": "/source/bbute/abc.md",
            "client_modified": "2019-04-11T02:17:21Z",
            "server_modified": "2019-04-13T02:53:02Z",
            "size": 12075,
        }
    ],
}

const get = (obj, p) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, obj)

function opera(item, tree, prefix = '') {
    if (item['.tag'] === 'folder') return

    const remainSplit = item.path_lower.substr(prefix === '/' && prefix === '' ? 1 : prefix.length).split('/')
    const prefixSplit = prefix === '/' ? [''] : prefix.substr(0, prefix.length-1).split('/')
    console.log('prefix:', prefix)
    console.log('remainSplit:', remainSplit)
    console.log('prefixSplit:', prefixSplit)
    let curTree = get(tree, prefixSplit)

    if (remainSplit.length === 1) {
        console.log('----------:', curTree)
        curTree.children.push(item)
    } else {
        const newPrefix = prefix + remainSplit[0] + '/'
        if (!curTree[remainSplit[0]]) {
            curTree[remainSplit[0]] = {
                prefix: newPrefix,
                children: [],
            }
        }
        console.log('--------------------------------------------------------------------')
        opera(item, tree, newPrefix)
    }
}

const tree = {
    '': {
        prefix: '/',
        children: [],

    }
}

for (const item of data.entries) {
    // console.log('---:', item.path_lower)
    console.log('====================================================================')
    opera(item, tree)
}

// dump(tree)
