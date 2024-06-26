const rented = document.querySelector(".rented-list"),
      cars = document.querySelector(".cars"),
    rentCar = document.querySelector("#rentCar")


    //eventlisteners
    eventListeners()
    function eventListeners() {
        // add info to cart
        cars.addEventListener("click",addToCart)
        //remove car
        rented.addEventListener("click",removeCar)
        // read rented car from storage
        document.addEventListener("DOMContentLoaded",readFromStorage)
    }
    // functions

    function addToCart(e) {
        e.preventDefault()
        if (e.target.classList.contains("btn-drive")) {
            const info = e.target.parentElement.parentElement 
            addToCard(info) 
        }
        
    }
    // adding info to the cart
    function addToCard(info) {
    const driveInfo = {
        image: info.querySelector("img").src,
        name: info.querySelector("h3").textContent,
        price: info.querySelector(".btn-drive").textContent,
        dataId: info.querySelector(".btn-drive").getAttribute("data-id")

    }
    createCard(driveInfo)
    }
    // create html card
    function createCard(dInfo) {
        let row = document.createElement("tr")
        row.innerHTML = `
        <tr>
            <td>
                <img src = "${dInfo.image}" width = "100px">
            </td>
            <td>${dInfo.name}</td>
            <td>${dInfo.price}</td>
            <td>
            <a data-id = "${dInfo.dataId}" class= "remove">X</a>
            </td>
        </tr>
        `
        rented.appendChild(row)
        addToLocalStorage(dInfo)
    }
    //add to localstorage
    function addToLocalStorage(car) {
        //get cars from storage
        let getCar = getFromLocalStorage()
        // push car to localstorage
        getCar.push(car)
        localStorage.setItem("cars",JSON.stringify(getCar))
    }
    // get from localstorage
    function getFromLocalStorage() {
        let car;
        if (localStorage.getItem('cars')) {
            car = JSON.parse(localStorage.getItem("cars"))
        }else{
            car = []
        }
        return car
    }
    //remove car from rented list
    function removeCar(e) {
        let carItem , carId
        if (e.target.classList.contains("remove")) {
            e.target.parentElement.parentElement.remove()
            carItem =  e.target.parentElement.parentElement
            carId = carItem.querySelector('a').getAttribute('data-id')
        }
        removeFromLocalStorage(carId)
    }
    // remove from localstorage
    function removeFromLocalStorage(id) {
        getLS = getFromLocalStorage()
        // let ids = 
        getLS.forEach((car,index) => {
            if (car.dataId === id) {
                getLS.splice(index,1)
            }
            localStorage.setItem('cars',JSON.stringify(getLS))
        });
    }
    //read form storage
    function readFromStorage() {
        getFromLs = getFromLocalStorage()
        getFromLs.forEach(car => {
            let row = document.createElement("tr")
        row.innerHTML = `
        <tr>
            <td>
                <img src = "${car.image}" width = "100px">
            </td>
            <td>${car.name}</td>
            <td>${car.price}</td>
            <td>
            <a data-id = "${car.dataId}" class= "remove">X</a>
            </td>
        </tr>
        `
        rented.appendChild(row)
        });
    }