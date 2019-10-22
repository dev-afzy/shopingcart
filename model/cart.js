module.exports = function Cart(oldcart){
    this.items = oldcart.items || {}
    this.totalprice = oldcart.totalprice || 0
    this.totalqty = oldcart.totalqty || 0

    this.add = (item, id)=>{
        var storeditem = this.items[id]
        if(!storeditem){
            storeditem = this.items[id] = {item: item, qty: 0, price: 0 }
        } 
        storeditem.qty++
        storeditem.price = storeditem.item.price * storeditem.qty;
        this.totalqty++
        this.totalprice += storeditem.item.price 
    }
    this.generatearray = ()=>{
        const arr = []
        for (var id in this.items){
            arr.push(this.items[id])
        }
        return arr
    }
}