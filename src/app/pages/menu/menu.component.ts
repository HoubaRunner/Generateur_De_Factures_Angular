import { createAotUrlResolver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  constructor(private service: OrderDetailsService) { }
  foodData: any;

  ngOnInit(): void {
    this.foodData = this.service.foodDetails;
  };

  handleDisabled(e: any) {
    if (e.target.title == "enable") {
      e.target.title = "disable"
      e.target.src = "../assets/image/hidden.png"
      e.target.parentNode.children[0].style.opacity = 0.4
      e.target.parentNode.children[1].disabled = true

    }
    else {
      e.target.title = "enable"
      e.target.src = "../assets/image/eye.png"
      e.target.parentNode.children[0].style.opacity = 1
      e.target.parentNode.children[1].disabled = false
    }
  };

  handleTimbre(e: any) {
    var timbreValue = "0.600"
    if (e.target.innerText == "- Timbre fiscal") {
      e.target.innerText = "+ Ajouter le timbre fiscal"
      e.target.colSpan = "2"
      e.target.parentNode.children[1].style.display = "none"
      this.calculTotaux()
    }
    else {
      e.target.innerText = "- Timbre fiscal"
      e.target.colSpan = "1"
      if (e.target.parentNode.children[1]) {
        e.target.parentNode.children[1].style.display = "flex"
      }
      else {
        const td = document.createElement("td")
        td.innerText = timbreValue + " DT"
        e.target.parentNode.appendChild(td)
      }
      this.calculTotaux(0.6)
    }
  };

  handleMenu() {
    document.querySelector(".hideMenu")?.classList.toggle("hideM")
  };

  addSep(e = null, id2 = null) {

    const container = document.getElementById("custom_select_result")
    const newElement = document.createElement("tr")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const div = document.createElement("div")
    td1.colSpan = 6
    newElement.appendChild(td1)
    td1.classList.add("sep")
    td1.appendChild(div)
    const image = document.createElement("img")
    image.src = "./image/delete.png"
    image.classList.add("iconForm", "eye")
    td2.appendChild(image)
    image.onclick = () => {
      newElement.remove()

    }
    newElement.appendChild(td2)
    container?.appendChild(newElement)
  };

  addSousTotal(e = null, value = "0.000 DT", id2 = null) {
    var id = id2 || this.generateID(5)
    const container = document.getElementById("custom_select_result")
    const newElement = document.createElement("tr")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const td3 = document.createElement("td")
    const td4 = document.createElement("td")
    td1.classList.add("sepGray")
    td2.classList.add("sepGray")
    td3.classList.add("sepGray")
    td1.colSpan = 4
    newElement.appendChild(td1)
    td2.style.whiteSpace = "nowrap"
    td2.innerText = "Sous total: "
    td2.classList.add("st")
    newElement.appendChild(td2)
    td3.innerText = value
    newElement.appendChild(td3)
    const image = document.createElement("img")
    image.classList.add("iconForm", "eye")
    image.src = "./image/delete.png"
    image.onclick = () => {
      newElement.remove()
    }
    td4.appendChild(image)
    td4.style.whiteSpace = "nowrap"
    newElement.appendChild(td4)
    container?.appendChild(newElement)
    this.calculSousTotal()
  };

  closeMenu(label: any) {
    document.querySelector(".hideMenu")?.classList.add("hideM")
    if (label == "Ajouter un produit") this.addProduct()
    else if (label == "Ajouter un séparateur") this.addSep()
    else if (label == "Ajouter un sous-total") this.addSousTotal()
  };


  logo: any;
  inputImage: any;
  HandleInput() {
    this.logo = document.getElementById("Logo")
    this.inputImage = document.getElementById("imageInput")

    const defaultImage = "../assets/image/logo.jpg"

    this.logo.addEventListener("click", () => {
      this.inputImage.click()
    })

    this.inputImage.addEventListener("input", () => {
      if (this.inputImage.files[0]) {
        this.logo.src = URL.createObjectURL(this.inputImage.files[0])
        document.querySelector(".deleteIconPhoto")?.classList.remove("hideM")
      }
      else {
        this.logo.src = defaultImage
        document.querySelector(".deleteIconPhoto")?.classList.add("hideM")
      }
    })
    document.querySelector(".deleteIconPhoto")?.addEventListener("click", () => {
      this.inputImage.value = ""
      this.logo.src = defaultImage
      document.querySelector(".deleteIconPhoto")?.classList.add("hideM")
    })
  };

  deleteImage() {
    this.inputImage = document.getElementById("imageInput")
    this.logo = document.getElementById("Logo")
    const defaultImage = "../assets/image/logo.jpg"
    this.logo.src = defaultImage
    document.querySelector(".deleteIconPhoto")?.classList.add("hideM")
    this.inputImage.value = ""
    const old = JSON.parse(localStorage.fact)[0]
    old.logo = ""
    var table = JSON.parse(localStorage.fact);
    table.splice(0, 1, old)
    localStorage.fact = JSON.stringify(table)
  };


  generateID(number: number) {
    var id = ""
    for (let index = 0; index < number; index++) {
      id += Math.floor(Math.random() * 10)
    }
    return id
  };
  // **********************************
  //**************************

  addProduct(e = null, ref = "", des = "", quantity = 0, prixUni = 0, Tva = 0, total = "0.000 DT", id2 = null) {
    var id = id2 || this.generateID(5)
    const container = document.getElementById("custom_select_result")
    const container2 = document.createElement("tr")
    const tr = document.createElement("tr")
    const td = document.createElement("td")
    const image = document.createElement("img")
    image.src = "./image/delete.png"
    image.classList.add("iconForm", "eye")
    td.appendChild(image)
    tr.appendChild(td)


    /*td input reference*/
    const tdRef = document.createElement("td")
    const inputRef = document.createElement("input")
    inputRef.classList.add("form-control")
    inputRef.placeholder = "Référence"
    tdRef.appendChild(inputRef)
    inputRef.value = ref
    inputRef.oninput = (e) => {

    }
    /*td input PS*/
    const tdPS = document.createElement("td")
    const inputPS = document.createElement("input")
    inputPS.classList.add("form-control")
    inputPS.placeholder = "Produit / Service"
    tdPS.appendChild(inputPS)
    inputPS.value = des
    inputPS.oninput = (e) => {

    }
    /*td input Quantity*/
    const tdQuantity = document.createElement("td")
    const inputQuantity = document.createElement("input")
    inputQuantity.type = "number"
    inputQuantity.classList.add("form-control")
    inputQuantity.style.width = "100px"
    inputQuantity.value = quantity + ""
    tdQuantity.appendChild(inputQuantity)
    /*td input Unitaire*/
    const tdUnitaire = document.createElement("td")
    const inputUnitaire = document.createElement("input")
    inputUnitaire.type = "number"
    inputUnitaire.classList.add("form-control")
    inputUnitaire.style.width = "170px"
    inputUnitaire.value = prixUni + ""
    tdUnitaire.appendChild(inputUnitaire)
    /*td select*/
    const tdSelect = document.createElement("td")
    const select = document.createElement("select")
    select.classList.add("form-select")
    select.innerHTML = `<option value="0">0%</option>
                            <option value="7">7%</option>
                            <option value="13">13%</option>
                            <option value="19">19%</option>`
    tdSelect.appendChild(select)
    const result = document.createElement("td")
    select.value = Tva + ""
    /*result*/
    result.innerText = total
    container2.appendChild(tdRef)
    container2.appendChild(tdPS)
    container2.appendChild(tdQuantity)
    container2.appendChild(tdUnitaire)
    container2.appendChild(tdSelect)
    container2.appendChild(result)
    container2.appendChild(td)
    container?.appendChild(container2)


    /*add to result */

    const tableResult = document.getElementById("tableResult")
    const trTableResult = document.createElement("tr")
    const tva = document.createElement("td")
    const base = document.createElement("td")
    const montant = document.createElement("td")
    tva.innerText = Tva + "%"
    base.innerText = total
    montant.innerText = ((Number(select.value) * Number(inputUnitaire.value) * Number(inputQuantity.value)) / 100).toFixed(3) + " DT"
    tva.classList.add("textCenter")
    base.classList.add("textCenter")
    montant.classList.add("textCenter")

    trTableResult.appendChild(tva)
    trTableResult.appendChild(base)
    trTableResult.appendChild(montant)
    tableResult?.appendChild(trTableResult)
    select.oninput = () => {

      tva.innerText = select.value + "%"
      montant.innerText = ((Number(select.value) * Number(inputUnitaire.value) * Number(inputQuantity.value)) / 100).toFixed(3) + " DT"
      this.calculTVAAfterChange()
      this.calculTotaux()
    }
    select.classList.add("form-control")
    inputUnitaire.oninput = (e) => {

      base.innerText = (Number(inputUnitaire.value) * Number(inputQuantity.value)).toFixed(3) + " DT"
      montant.innerText = ((Number(select.value) * Number(inputUnitaire.value) * Number(inputQuantity.value)) / 100).toFixed(3) + " DT"
      result.innerText = (Number(inputUnitaire.value) * Number(inputQuantity.value)).toFixed(3) + " DT"
      var mb = ((Number(inputUnitaire.value) * Number(inputQuantity.value)).toFixed(3))
      this.lst[0] = this.lst[0] + Number(mb)
      this.calculTotalAfterChange()
      this.calculTotaux()
      this.calculSousTotal()
    }
    inputQuantity.oninput = (e) => {

      base.innerText = (Number(inputUnitaire.value) * Number(inputQuantity.value)).toFixed(3) + " DT"
      montant.innerText = ((Number(select.value) * Number(inputUnitaire.value) * Number(inputQuantity.value)) / 100).toFixed(3) + " DT"
      result.innerText = (Number(inputUnitaire.value) * Number(inputQuantity.value)).toFixed(3) + " DT"
      this.calculTotalAfterChange()
      this.calculTotaux()
      this.calculSousTotal()
    }
    image.onclick = () => {
      container2.remove()
      trTableResult.remove()
      this.calculTotalAfterChange()
      this.calculTVAAfterChange()
      this.calculTotaux()
      this.calculSousTotal()
    }
    this.calculSousTotal()
    this.calculTotalAfterChange()
    this.calculTVAAfterChange()
    this.calculTotaux()
  };

  pt3: any;
  lst: number[] = [0];

  calculTotalAfterChange() {
    const tableResult = document.getElementById("tableResult")
    const trTable = document.querySelectorAll("#tableResult tr")
    var result = 0
    trTable.forEach((element, index) => {
      if (index != 0) {
        const td = element.childNodes
        result += Number(td[1].textContent?.split(" ")[0])
      }
    })
    document.getElementById("TT1")!.innerHTML = parseFloat(result + '').toFixed(3) + " DT"

    // const ajoutTimbre = document.getElementById("ajoutTimbre")
    // ajoutTimbre.innerText = "+ Ajouter le timbre fiscal"
    // ajoutTimbre.style.textAlign = "center"
    // ajoutTimbre.colSpan = "2"
    // ajoutTimbre.parentNode.children[1].style.display = "none"
  };

  // calculSousTotal() {
  //   const trs = document.querySelectorAll("#custom_select_result tr")
  //   var result = 0

  //   trs.forEach((element, index) => {
  //     const tds = element.childNodes
  //     if (tds[5]) {
  //       result += Number(tds[5].textContent)
  //     }
  //     else {
  //       if (tds[1].nodeName == "st") {
  //         tds[2].textContent = (result).toFixed(3) + " DT"
  //         result = 0
  //       }
  //     }
  //   })
  // };
  calculSousTotal() {
    const trs = document.querySelectorAll("#custom_select_result tr")
    var result = 0

    trs.forEach((element, index) => {
      const tds = element.children
      if (tds[5]) {
        result += Number(tds[5].textContent?.split(" ")[0])
      }
      else {
        if (tds[1].classList.contains("st")) {
          tds[2].textContent = (result).toFixed(3) + " DT"
          result = 0
        }
      }
    })
  };

  pt4: any;


  calculTotaux(nbr = 0) {
    var result = 0
    const trTable = document.querySelectorAll("#tabOfTotal tr")
    trTable.forEach((element, index) => {

      const td = element.children
      if (trTable.length - 1 != index) {
        if (index == 2) {
          if (nbr) {
            console.log(element)
            result += Number(td[1].textContent?.split(" ")[0])
          }
        }
        else {
          result += Number(td[1].textContent?.split(" ")[0])
        }
      }
    })
    var bel = document.getElementById("finalResult")
    bel!.innerHTML = parseFloat(result + "").toFixed(3) + " DT"
    // this.pt4 = document.getElementById("finalResult")
    // this.pt4.innerHTML = parseFloat(result).toFixed(3) + " DT"
  };



  pt2: any;
  calculTVAAfterChange() {
    const tableResult = document.getElementById("tableResult")
    const trTable = document.querySelectorAll("#tableResult tr")
    var result = 0
    trTable.forEach((element, index) => {
      if (index != 0) {
        const td = element.childNodes
        result += Number(td[2].textContent?.split(" ")[0])
      }
    })
    document.getElementById("TT2")!.innerHTML = parseFloat(result + "").toFixed(3) + " DT"

    // const ajoutTimbre = document.getElementById("ajoutTimbre")
    // ajoutTimbre.innerText = "+ Ajouter le timbre fiscal"
    // ajoutTimbre.style.textAlign = "center"
    // ajoutTimbre.colSpan = "2"
    // ajoutTimbre.parentNode.children[1].style.display = "none"
  };
}
