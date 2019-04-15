const { dump } = require('dumper.js')
const data = {
    'entries':[ { '.tag': 'folder',
        name: 'source',
        path_lower: '/source',
        path_display: '/source',
        id: 'id:ys8ZiAJ35rAAAAAAAADuuQ' },
        { '.tag': 'folder',
            name: 'bbute',
            path_lower: '/source/bbute',
            path_display: '/source/bbute',
            id: 'id:ys8ZiAJ35rAAAAAAAADu1A' },
        { '.tag': 'file',
            name: 'zhi yang - small.svg',
            path_lower: '/source/zhi yang - small.svg',
            path_display: '/source/zhi yang - small.svg',
            id: 'id:ys8ZiAJ35rAAAAAAAADuug',
            client_modified: '2019-04-09T08:44:37Z',
            server_modified: '2019-04-09T08:44:37Z',
            rev: '015000000013b1efe60',
            size: 33334,
            content_hash:
            '2067c2741666174ac1d02e8d13c7947f0a9ab588adbc7f2e6348d2f20e11e2fb' },
        { '.tag': 'file',
            name: 'test.md',
            path_lower: '/source/test.md',
            path_display: '/source/test.md',
            id: 'id:ys8ZiAJ35rAAAAAAAADuwg',
            client_modified: '2019-04-10T13:18:19Z',
            server_modified: '2019-04-10T13:18:19Z',
            rev: '0114000000013b1efe60',
            size: 21,
            content_hash:
            'b90294423ce9bfefa99d5cbce8c76e73d1675e6ec39df043cce68ee19652fdc8' },
        { '.tag': 'file',
            name: 'abcd.md',
            path_lower: '/source/abcd.md',
            path_display: '/source/abcd.md',
            id: 'id:ys8ZiAJ35rAAAAAAAADuyQ',
            client_modified: '2019-04-11T03:26:56Z',
            server_modified: '2019-04-11T03:26:57Z',
            rev: '0133000000013b1efe60',
            size: 12129,
            content_hash:
            'c89ea031c368a9b26f0c0a3282357ef560be7b93576883d96a98fd254410bf61' },
        { '.tag': 'file',
            name: 'abc.svg',
            path_lower: '/source/abc.svg',
            path_display: '/source/abc.svg',
            id: 'id:ys8ZiAJ35rAAAAAAAADuzQ',
            client_modified: '2019-04-11T03:33:29Z',
            server_modified: '2019-04-11T03:33:29Z',
            rev: '0135000000013b1efe60',
            size: 12062,
            content_hash:
            'c21945d98ed92205fc2ea9092f6acde63296f63475b6d0114074733d6fdfa5bd' },
        { '.tag': 'file',
            name: 'abc.md',
            path_lower: '/source/bbute/abc.md',
            path_display: '/source/bbute/abc.md',
            id: 'id:ys8ZiAJ35rAAAAAAAADuxw',
            client_modified: '2019-04-11T02:17:21Z',
            server_modified: '2019-04-13T02:53:02Z',
            rev: '0139000000013b1efe60',
            size: 12075,
            content_hash:
            'cd04ff5b34eef6a5a53f4f9b57dd9cbe24667329e54af6c56100a83ec306bf34' } ]
}

const get = (obj, p) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, obj)

function splitPart(str, separator, num) {
    if (num === 0) return str
    const strSplit = str.split(separator, num)
    const tailStr = str.slice(strSplit.join(separator).length+1)
    return tailStr === '' ? strSplit : strSplit.concat(tailStr)
}

function opera(branch, tree, item) {
    const parts = splitPart(branch, '/', 1)
    if (parts.length === 1) {
        tree.files.push(item)
    } else {
        if (!tree[parts[0]]) {
            tree[parts[0]] = {
                files: []
            }
        }
        opera(parts[1], tree[parts[0]], item)
    }
}

const tree = {}
for (const item of data.entries) {
    opera(item.path_lower, tree, item)
}
dump(tree)

