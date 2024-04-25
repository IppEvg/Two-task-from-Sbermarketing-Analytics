import {encoded, translations} from './data.js'
const translationsArr = Object.entries(translations)
const uniqId = []
let decoded = encoded.map(objectItem=>{
    for(let el in objectItem){
        const decodedItem = translationsArr.find(item=>item[0]==objectItem[el])
        // проверяю все id не входящие в translations. Без уточнения не понял, нужно ли было 
        // проверять уникальность на повторения во всех объектах друг с другом или только 
        // сравнивая с translations..
        if((/\w+Id/).test(el) && !decodedItem && !uniqId.includes(objectItem[el])){
            uniqId.push(objectItem[el])
        }
        if(el==='groupId' || el==='service' || el==='formatSize' || el==='ca'){
        } else {
            objectItem[el]=decodedItem?decodedItem[1]:objectItem[el]
        }
    }
    return objectItem
})

console.log("Let's rock")
console.log(encoded, translations)
console.log(decoded,'\n',`Список id, не входящие в translations: ${uniqId}`)
