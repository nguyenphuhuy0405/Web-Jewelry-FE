import Fuse from 'fuse.js'

const fuseSearch = (items, options, search) => {
    const fuse = new Fuse(items, options)
    const result = fuse.search(search)
    const searchItems = result.map((item) => item.item)
    return searchItems
}
export default fuseSearch
