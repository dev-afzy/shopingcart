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
    // this.pop = function(item, id){
    //     var storedItem = this.items[id];
    //     if(!storedItem){
    //         storedItem = this.items[id] = {item: item, qty: 0, price: 0};
    //     }
    //     if(storedItem.qty !== 0){
    //         storedItem.qty--;
    //         storedItem.price = storedItem.item.price*storedItem.qty;
    //         this.totalQty--;
    //         this.totalPrice -= storedItem.item.price;   
    //     }
    // };
    // this.remove = function(id){
    //     this.totalQty -= this.item[id].qty;
    //     this.totalPrice -= this.items[id].price;
    //     delete this.items[id];
    // }
    this.reduceByOne = (id)=>{
        var storeditem = this.items[id]
        console.log(storeditem.qty)
        storeditem.qty--
        storeditem.price -=storeditem.item.price
        this.totalqty--
        this.totalprice -= storeditem.item.price

        if(this.items[id].qty <= 0){
            delete this.items[id]
        }

    }

    this.reduceitem = (id)=>{
        var storeditem = this.items[id]
        this.totalprice -= storeditem.item.price
        this.totalqty -= storeditem.item.qty
        delete this.items[id]
    }
    this.generatearray = ()=>{
        const arr = []
        for (var id in this.items){
            arr.push(this.items[id])
        }
        return arr
    }
}