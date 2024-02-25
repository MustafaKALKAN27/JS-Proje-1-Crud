// Gerekli HTML Elementlerini Seç
const form = document.querySelector(".grocery-form");//form elemanını sınıf ile seç
const grocery = document.getElementById("grocery");// input text elemanın id ile seç
const container = document.querySelector(".grocery-container"); //sınıf ile grocery kapsayıcısını seç
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");//sınıfı alert olan p etiketi
const submitBtn = document.querySelector(".submit-btn");// submit butono seç
const clearBtn = document.querySelector(".clear-btn");//clear butonu seç

// Düzenleme Seçenekleri
let editElement;
let editFlag = false; // Düzenleme modunda olup olmadığını belirtir.
let editID = ""; // Düzenleme yapılan öğenin benzersiz kimliği
let control=0;//clear butonu kontrol

//! Olay İzleyicileri
form.addEventListener("submit", addItem);//formun içinde sbumit olayını dinle ve addItem at.

// Fonksiyonlar

function displayAlert(text, action) {
  console.log(text, action);
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

function addItem(e) {
  e.preventDefault(); // Formun otomatik olarak gönderilmesini engelle
  const value = grocery.value; // form içerisinde bulunan inputun değerini alma
  const id = new Date().getTime().toString(); // benzersiz bir id oluşturduk

  // Eğer değer boş değilse ve düzenleme modunda değilse
  if (value !== "" && !editFlag) {
    const element = document.createElement("article"); // yeni bir "article" ögesi oluşturur
    let attr = document.createAttribute("data-id"); // yeni bir veri kimliği oluşturur.
    attr.value = id;
    element.setAttributeNode(attr); // oluşturduğumuz id'yi elemente ekledik
    element.classList.add("grocery-item"); // oluşturduğumuz elemente class ekledik
    element.innerHTML = `
        <p class="title">${value}</p>
        <div class="btn-container">
        <button type="button" class="edit-btn">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fa-solid fa-trash"></i>
        </button>
        </div>
    
    `;
    control=control+1;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
    clearBtn.addEventListener("click",listeyiTemizle);

    // kapsayıcıya ekleme yapma
    list.appendChild(element);//article elementimizi grocery-list in içine ekle
    displayAlert("Başarıyla Eklendi", "success");
    container.classList.add("show-container");
    clearBtn.classList.add("clear-show");
    // içerik kısmını sıfırlama
    grocery.value = "";
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Değer Değiştirildi", "success");
    //Değer değiştirlidikten sonra içerik sıfırla
    editFlag = false;
    grocery.value = "";
    submitBtn.textContent = "Ekle";
  } else {
    displayAlert("Lütfen Bir Ürün Ekleyiniz", "danger");
  }
}

// silme fonksiyonu
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  console.log(element);
  const id = element.dataset.id;
  list.removeChild(element);//grocery-list içindeki ilgili article yi sil
  control=control-1;
  //Eğer öğe kalmadıysa clear butonunu gizle
  if(control == 0){
    clearBtn.classList.remove("clear-show");
  }

  displayAlert("Öğe Kaldırıldı", "danger");
}

// düzenleme fonksiyonu
function editItem(e) {
  console.log(e);
  const element = e.currentTarget.parentElement.parentElement;
  // düzenleme yapılan öğeyi seç
  editElement = e.currentTarget.parentElement.previousElementSibling;
  console.log(editElement);
  // form içerisinde bulunan inputun değerini düzenlenen öğenin metniyle doldur.
  grocery.value = editElement.innerHTML;

  editFlag = true;
  console.log(element.dataset);
  editID = element.dataset.id; // düzenlen öğenin kimliği
  submitBtn.textContent = "Düzenle";
}
//Tüm Öğeleri Silme
function listeyiTemizle(e){
  list.innerHTML="";
  control=0;
  clearBtn.classList.remove("clear-show");
  displayAlert("Öğeler Kaldırıldı", "danger");

}
