export default function findIndexFun(list,id) {
    const index = list.findIndex(el => {
        if(el.id === id) {
            return true
        }
        return false
    })
    return index
}