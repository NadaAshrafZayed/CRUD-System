/*
CRUD
Create => Add new
Read => Display
Update => Update
Delete => Delete

Sometimes : Search
*/

///////////////////////////////////////  Storing Data in Variables  ///////////////////////////////////////
var productName = document.getElementById('pn');
var productPrice = document.getElementById('pp');
var productCategory = document.getElementById('pc');
var productDescription = document.getElementById('pd');
var formButton = document.getElementById('formbtn');
var searchedValue = document.getElementById('searchedValue');
var currentProductIndex = 0;

var allProducts = [];


if (localStorage.getItem("allProducts") != null) {
    allProducts = JSON.parse(localStorage.getItem("allProducts"));
    displayAllProducts();
}


///////////////////////////////////////  Add or Update??  ///////////////////////////////////////
// Since line 16 here
formButton.onclick = function(){
    if (formButton.innerHTML == 'Add') {
        addNewProduct();
    } else { // 'Update'
        updateThisProduct(currentProductIndex);
    }

    localStorage.setItem('allProducts', JSON.stringify(allProducts));
}


///////////////////////////////////////  Add Product  ///////////////////////////////////////
function addNewProduct() {

    //Name, price,, category and description you give are all related to 
    //one component =>> (One OBJECT)
    var newProduct = {
        proName: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value
    }

    allProducts.push(newProduct);
    
    localStorage.setItem("allProducts", JSON.stringify(allProducts));

    // Clear the form inputs
    clearForm();
    //display the products
    displayAllProducts();

}


///////////////////////////////////////  Clear Form  ///////////////////////////////////////
function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";

    document.getElementById('formbtn').innerHTML = "Add";
}


///////////////////////////////////////  Display in Table  ///////////////////////////////////////
function displayAllProducts() {
    var cartona = "";

    for (var i = 0; i < allProducts.length; i++) {
        cartona += `<tr>
                        <td>${allProducts[i].proName}</td>
                        <td>${allProducts[i].price}</td>
                        <td>${allProducts[i].category}</td>
                        <td>${allProducts[i].description}</td>
                        <td>
                            <button onclick="updateForm(${i})" class="green-btn btn">Update</button>
                        </td>
                        <td>
                            <button onclick="deleteThisProduct(${i})" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>`;
    }

    document.getElementById('tbody').innerHTML = cartona;
}


///////////////////////////////////////  Delete Product  ///////////////////////////////////////
function deleteThisProduct(index) {
    allProducts.splice(index, 1);
    
    displayAllProducts();

    localStorage.setItem("allProducts", JSON.stringify(allProducts));
}


///////////////////////////////////////  Update Product  ///////////////////////////////////////
// This function to return the current data in the form inputs
function updateForm(index) {
    currentProductIndex = index;

    productName.value = allProducts[index].proName;
    productPrice.value = allProducts[index].price;
    productCategory.value = allProducts[index].category;
    productDescription.value = allProducts[index].description;
    
    document.getElementById('formbtn').innerHTML = "Update";
}

function updateThisProduct(index) {
    var updatedProduct = {
        proName: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value
    }
    // console.log(updatedProduct.description);

    // Replace the old row with the new row having the new data
    allProducts.splice(index, 1, updatedProduct);
    
    clearForm();
    displayAllProducts();
    
    document.getElementById('formbtn').innerHTML = "Add";

}


///////////////////////////////////////  SEARCH  ///////////////////////////////////////
var searchType = '';


function handleSearchBy(selectedSearchBy){ // called when choose from the Radiobutton
    if (selectedSearchBy.value == 'name') {
        // console.log("NAME");
        searchType = 'name';
    }else if (selectedSearchBy.value == 'category'){
        // console.log("CATEGORY");
        searchType = 'category';

    }
}


function search(){ // called at the moment of typing in the search-bar

    if(searchType == 'name'){
        searchByName();
    }else{ //category
        searchByCategory();
    }
    
}


function searchByName() {
    var cartonaSearchedProducts = '';

    for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].proName.toLowerCase().includes(searchedValue.value.toLowerCase())) {
            cartonaSearchedProducts += `<tr>
                                            <td>${allProducts[i].proName}</td>
                                            <td>${allProducts[i].price}</td>
                                            <td>${allProducts[i].category}</td>
                                            <td>${allProducts[i].description}</td>
                                            <td>
                                                <button onclick="updateForm(${i})" class="green-btn btn">Update</button>
                                            </td>
                                            <td>
                                                <button onclick="deleteThisProduct(${i})" class="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>`;
        }
    }

    document.getElementById('tbody').innerHTML = cartonaSearchedProducts;
}


function searchByCategory() {
    var cartonaSearchedProducts = '';

    for (var i = 0; i < allProducts.length; i++) {
        if ( allProducts[i].category.toLowerCase().includes(searchedValue.value.toLowerCase()) ) {
            cartonaSearchedProducts += `<tr>
                                            <td>${allProducts[i].proName}</td>
                                            <td>${allProducts[i].price}</td>
                                            <td>${allProducts[i].category}</td>
                                            <td>${allProducts[i].description}</td>
                                            <td>
                                                <button onclick="updateForm(${i})" class="green-btn btn">Update</button>
                                            </td>
                                            <td>
                                                <button onclick="deleteThisProduct(${i})" class="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>`;
        }
    }

    document.getElementById('tbody').innerHTML = cartonaSearchedProducts;
}


///////////////////////////////////////  VALIDATIONS  /////////////////////////////////////// 

// To add the styles to this div
document.getElementById('pp').addEventListener('input', function(){
    var inputValue = this.value;

    var errorMessage = document.getElementById('error-message');

    // Check if input value contains letters
    if (/[^0-9]/.test(inputValue)) {
        errorMessage.style.display = 'block'; //appear

        errorMessage.offsetHeight;
        errorMessage.style.opacity = '1'; // to make the div visible
    } else {
        errorMessage.style.opacity = '0'; // Set opacity to 0 to hide it

        setTimeout(function () {
            errorMessage.style.display = 'none';
        }, 500); // Adjust the delay as needed
    }
});