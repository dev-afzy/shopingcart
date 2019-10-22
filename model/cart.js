module.exports = function cart(oldcart){
    items = oldcart.InitItem
    totalprice = oldcart.totalprice
    totalqty = oldcart.totalqty

    this.add = (item, id)=>{
        var storeditem = this.items.id
        if(!storeditem){
            storeditem = this.items[id]={items:item, qty:0, price:0 }
        }
        storeditem.qty++
        storeditem.price = storeditem.item.price * storeditem.qty;
        this.totalqty++
        this.totalprice += storeditem.price 
    }
    var generatearray = ()=>{
        const arr = []
        for (var id in this.items){
            arr.push(this.items[id])
        }
        return arr
    }
}