const { read } = require('fs');
const { get } = require('http');
fs = require('fs');
var last_id = read_id();
var data = [];
var results = [];
var search_data = [];
var radio_search_1 = false;
var radio_search_2 = false;
var radio_search_binary_1 = false;
var chain_main = false;

var namesChain1 = [];
var namesChain2 = [];
var namesChain3 = [];
var namesChain4 = [];
var namesChain5 = [];
var namesChain6 = [];
var namesChain7 = [];
var namesChain8 = [];

const forms = document.querySelectorAll('.needs-validation');
let scroll_t = document.getElementById("btn-back-to-top");

 // clear linear search and binary search {
document.getElementById("radio_search_2").style.display = "none";
document.getElementById("radio_search").style.display = "none";
document.getElementById("radio_search_binary").style.display = "none";
 // }

function save_to_file() {
  fs.writeFileSync('data.txt', JSON.stringify(data));
}

function read_from_file() {
  data = JSON.parse(fs.readFileSync('data.txt'));
  displayData();
}

forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('was-validated');
    
    if (!form.checkValidity()) {
        return;
    }

    let name = document.getElementById("name");
    let surname = document.getElementById("surname");
    let city = document.getElementById("city");
    let age = document.getElementById("age");
    let class_type = document.getElementById("class_type");
    let housed = document.getElementById("housed");
    let money = document.getElementById("money");
    if (housed.checked) {
      housed = true;
    } else {
      housed = false;
    }

    if (money.checked) {
      money = true;
    } else {
      money = false;
    }
    
    addRow(name.value, surname.value, city.value, Number(age.value), class_type.value, housed, money);

    name.value = "";
    surname.value = "";
    city.value = "";
    age.value = "";
    class_type.value = "";
    housed.value = false;
    money.value = false;
    form.classList.remove('was-validated');

  });
});

function read_id() {
  return JSON.parse(fs.readFileSync('id.txt'));
}

function save_id() {
  fs.writeFileSync('id.txt', JSON.stringify(last_id));
}

function addRow(name, surname, city, age, class_type, housed, money){
  const dataObj = new record(name, surname, city, age, class_type, housed, money);
  last_id.last_index += 1;
  save_id(); 
  data.push(dataObj);
  displayData();
}

function addRow_generate(name, surname, city, age, class_type, housed, money){
  const dataObj = new record(name, surname, city, age, class_type, housed, money);
  last_id.last_index += 1;
  data.push(dataObj);
}

function displayData(){
  const dataTable = document.getElementById('data_table');
  dataTable.innerHTML = '';
  for(let i=0; i<data.length; i++){
    const newRow = createTableRow(data[i]);
    dataTable.append(newRow);
  }
}

function display_search_data(arg){
  const dataTable = document.getElementById(arg);
  dataTable.innerHTML = '';
  for(let i = 0; i < search_data.length; i++){
    const newRow = createTableRow(search_data[i]);
    dataTable.append(newRow);
  }
}

function createTableRow(data){
  const row = document.createElement('tr');
  const col1 = document.createElement('td');
  const col2 = document.createElement('td');
  const col3 = document.createElement('td');
  const col4 = document.createElement('td');
  const col5 = document.createElement('td');
  const col6 = document.createElement('td');
  const col7 = document.createElement('td');
  const col8 = document.createElement('td');
  col1.innerHTML = data.id;
  col2.innerHTML = data.name;
  col3.innerHTML = data.surname;
  col4.innerHTML = data.age;
  col5.innerHTML = data.city;
  col6.innerHTML = data.class_type;
  col7.innerHTML = data.housed;
  col8.innerHTML = data.money;
  
  row.append(col1, col2, col3, col4, col5, col6, col7, col8);
  return row;
}

function createTableRowChain(data1,data2,data3,data4,data5,data6,data7,data8){
  const row = document.createElement('tr');
  const col1 = document.createElement('td');
  const col2 = document.createElement('td');
  const col3 = document.createElement('td');
  const col4 = document.createElement('td');
  const col5 = document.createElement('td');
  const col6 = document.createElement('td');
  const col7 = document.createElement('td');
  const col8 = document.createElement('td');
  col1.innerHTML = data8;
  col2.innerHTML = data1;
  col3.innerHTML = data2;
  col4.innerHTML = data3;
  col5.innerHTML = data4;
  col6.innerHTML = data5;
  col7.innerHTML = data6;
  col8.innerHTML = data7
  
  row.append(col1, col2, col2, col3, col4, col5, col6, col7, col8);
  return row;
}

class record{
  constructor(name, surname, city, age, class_type, housed, money){
    this.name = name;
    this.surname = surname;
    this.city = city;
    this.age = age;
    this.class_type = class_type;
    this.housed = housed;
    this.money = money;
    this.id = last_id.last_index + 1;
  };
}

const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function random_text(arg){
  const alphabet = 'abcdefghijklmnoprstuwz';
  const length = alphabet.length;
  let text = '';
  for(let i = 0; i < arg; i++){
    const index = Math.round(Math.random() * length);
    const char = alphabet.charAt(index);
    text+=char;
  }
  return text;
}

function generate() {
  quantity = document.getElementById("generate_quantity_value").value;
  for (let i = 0; i < quantity; i++) {
    let name = random_text(4);
    let surname = random_text(2);
    let city = random_text(3);
    let age = Math.round(Math.random() * ( 80 - 18 ) ) + 18;
    let class_type = random_text(5);

    let housed = Math.round(Math.random() + 1);
    if (housed % 2 == 0) {
      housed = true;
    } else { housed = false; }
    
    let money = Math.round(Math.random() + 1);
    if (money % 2 == 0) {
      money = true;
    } else { money = false; }
    
    addRow_generate(capitalize(name), capitalize(surname), capitalize(city), age, capitalize(class_type), housed, money);
  }
  save_id();
  displayData();
}

function delete_row() {
  const id = Number(document.getElementById('delete_id').value);
  for (let i = 0; i < data.length; i++) {
    if (Number(data[i].id) == id) {
      data.splice(i, 1);
      displayData();
      return;
    }
  }
}

window.onscroll = () => {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) scroll_t.style.display = "block"; 
  else scroll_t.style.display = "none";
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
scroll_t.addEventListener("click", backToTop);

function delete_n() {
  let n = Number(document.getElementById('delete-n_id').value);
  n -= 1;
  for (let i = 0; i < data.length; i++) {
    if (i % n == 0) {
      data.splice(i, 1);
    }
  }
  displayData();
}

// linear search swap start

function swap_search(arg) {
  if (arg) {
    if (document.getElementById("user_first_select").value == "housed" || document.getElementById("user_first_select").value == "money") {
      document.getElementById("radio_search").style.display = "block";
      document.getElementById("def_search").style.display = "none";
      radio_search_1 = true;
      return;
    }
  
    if (document.getElementById("user_first_select").value != "housed" && document.getElementById("user_first_select").value != "money") {
      document.getElementById("radio_search").style.display = "none";
      document.getElementById("def_search").style.display = "block";
      radio_search_1 = false;

      return;
    }
  }

  else {
    if (document.getElementById("user_second_select").value == "housed" || document.getElementById("user_second_select").value == "money") {
      document.getElementById("radio_search_2").style.display = "block";
      document.getElementById("def_search_2").style.display = "none";
      radio_search_2 = true;

      return;
    }

    if (document.getElementById("user_second_select").value != "housed" && document.getElementById("user_second_select").value != "money") {
      document.getElementById("radio_search_2").style.display = "none";
      document.getElementById("def_search_2").style.display = "block";
      radio_search_2 = false;

      return;
    }
  }

}

// linear search swap end

// linear search start

function linear_search() {
  search_data = [];
  const clear = document.getElementById("search_table").getElementsByTagName("tr");
  while (clear.length > 0) {
    clear[0].parentNode.removeChild(clear[0]);
  }
  let match_1, match_2, node_1, node_2;

  if (!radio_search_1) {
    match_1 = document.getElementById("def_search").value;
    node_1 = document.getElementById("user_first_select").value;
  }

  if (!radio_search_2) {
    match_2 = document.getElementById("def_search_2").value;
    node_2 = document.getElementById("user_second_select").value;

  }

  if (radio_search_1) {
    match_1 = false;
    node_1 = document.getElementById("user_first_select").value;
    if (node_1[0].checked) match_2 = true;
    // var match_content_1 = document.getElementById("def_search").innerHTML;
  }

  if (radio_search_2) {
    match_1 = false;
    node_2 = document.getElementById("user_first_select").value;
    if (node_2[0].checked) match_2 = true;
    // var match_content_1 = document.getElementById("def_search").innerHTML;
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i][node_1] == match_1 && data[i][node_2] == match_2) {

      search_data.push(data[i]);
    }
  }
  display_search_data('search_table');
};
// linear search end

// binary search and swap start

function dynamicSort(property) {
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result;
  }
}

function swap_search_binary() {
  if (document.getElementById("user_first_select_binary").value == "housed" || document.getElementById("user_first_select_binary").value == "money") {
    document.getElementById("radio_search_binary").style.display = "block";
    document.getElementById("def_search_binary").style.display = "none";
    radio_search_binary_1 = true;
    return;
  }
  
  if (document.getElementById("user_first_select_binary").value != "housed" && document.getElementById("user_first_select_binary").value != "money") {
    document.getElementById("radio_search_binary").style.display = "none";
    document.getElementById("def_search_binary").style.display = "block";
    radio_search_binary_1 = false;
    return;
  }
}

function binary_search(sort_data, left, right, target, node) {
   let target_index = -1;
  //  console.log(target);
  //  console.log(sort_data[14].id);


   while (left < right) {
      let mid = left + Math.trunc((right - left) / 2);

      if (sort_data[mid][node] == target) {
          target_index = mid;
          right = mid - 1;
      } else if (sort_data[mid][node] < target) {
          left = mid + 1;
      } else {
          right = mid - 1;
      }
    }

  return target_index;
}

function pre_binary_search() {
  search_data = [];
  let sort_data = data;
  const clear = document.getElementById("search_table").getElementsByTagName("tr");
  while (clear.length > 0) {
    clear[0].parentNode.removeChild(clear[0]);
  }
  let match_1 = 0, node_1;

  if (!radio_search_binary_1) {
    match_1 = document.getElementById("def_search_binary").value;
    node_1 = document.getElementById("user_first_select_binary").value;
  }

  else if (radio_search_binary_1) {
    match_1 = false;
    node_1 = document.getElementsByName("bool_search_binary");
    if (node_1[0].checked) match_1 = true;
    node_1 = document.getElementById("user_first_select_binary").value;

  }

  else {
    console.log("FATAL ERROR!");
    console.log(radio_search_binary_1);
    return;
  }

  sort_data.sort(dynamicSort(node_1));
  let high = binary_search(sort_data, 0, sort_data.length, match_1, node_1);
  // console.log("w " + high);
  // console.log(" 1 " + high);

  if (high != -1) {
    for (let i = high; i < sort_data.length; i++) {
      if (sort_data[i][node_1] == match_1) {
        search_data.push(sort_data[i]);
      }
    }
    display_search_data('search_table_binary');
  }

};

// binary search and swap end

// chain search start

function chain_search(name) {
  
  namesChainIdx1 = [];
  namesChainIdx2 = [];
  namesChainIdx3 = [];
  namesChainIdx4 = [];
  namesChainIdx5 = [];
  namesChainIdx6 = [];
  namesChainIdx7 = [];
  let currentIdx = namesBeginingsTable.get(name);

  if(currentIdx == null)  {
    return results;
  }

  while(currentIdx !== -1) {
    results.push(currentIdx);
    currentIdx = namesChain1[currentIdx];
  }

  console.log({results});
  return results;
}

function build_chain() {
  let k = data.length - 1;
  namesChain1 = [];
  namesChain2 = [];
  namesChain3 = [];
  namesChain4 = [];
  namesChain5 = [];
  namesChain6 = [];
  namesChain7 = [];
  namesChain8 = [];
  namesBeginingsTable = new Map();
  namesBeginingsTable2 = new Map();
  namesBeginingsTable3 = new Map();
  namesBeginingsTable4 = new Map();
  namesBeginingsTable5 = new Map();
  namesBeginingsTable6 = new Map();
  namesBeginingsTable7 = new Map();
  namesBeginingsTable8 = new Map();


  for (let idx = k; idx >= 0; idx--) {

    let currentNameValue = data[idx].name;
    if (namesBeginingsTable.has(currentNameValue)) {
      namesChain1[idx] = namesBeginingsTable.get(currentNameValue);
      namesBeginingsTable.set(currentNameValue, idx);

    } else {
        namesBeginingsTable.set(currentNameValue, idx);
        namesChain1[idx] = -1;
    }

    currentNameValue = data[idx].surname;
    if (namesBeginingsTable2.has(currentNameValue)) {
      namesChain2[idx] = namesBeginingsTable2.get(currentNameValue);
      namesBeginingsTable2.set(currentNameValue, idx);

    } else {
        namesBeginingsTable2.set(currentNameValue, idx);
        namesChain2[idx] = -1;
    }

    currentNameValue = data[idx].age;
    if (namesBeginingsTable3.has(currentNameValue)) {
      namesChain3[idx] = namesBeginingsTable3.get(currentNameValue);
      namesBeginingsTable3.set(currentNameValue, idx);

    } else {
        namesBeginingsTable3.set(currentNameValue, idx);
        namesChain3[idx] = -1;
    }

    currentNameValue = data[idx].city;
    if (namesBeginingsTable4.has(currentNameValue)) {
      namesChain4[idx] = namesBeginingsTable4.get(currentNameValue);
      namesBeginingsTable4.set(currentNameValue, idx);

    } else {
        namesBeginingsTable4.set(currentNameValue, idx);
        namesChain4[idx] = -1;
    }

    currentNameValue = data[idx].class_type;
    if (namesBeginingsTable5.has(currentNameValue)) {
      namesChain5[idx] = namesBeginingsTable5.get(currentNameValue);
      namesBeginingsTable5.set(currentNameValue, idx);

    } else {
        namesBeginingsTable5.set(currentNameValue, idx);
        namesChain5[idx] = -1;
    }

    currentNameValue = data[idx].housed;
    if (namesBeginingsTable6.has(currentNameValue)) {
      namesChain6[idx] = namesBeginingsTable6.get(currentNameValue);
      namesBeginingsTable6.set(currentNameValue, idx);

    } else {
        namesBeginingsTable6.set(currentNameValue, idx);
        namesChain6[idx] = -1;
    }

    currentNameValue = data[idx].money;
    if (namesBeginingsTable7.has(currentNameValue)) {
      namesChain7[idx] = namesBeginingsTable7.get(currentNameValue);
      namesBeginingsTable7.set(currentNameValue, idx);

    } else {
        namesBeginingsTable7.set(currentNameValue, idx);
        namesChain7[idx] = -1;
    }

    currentNameValue = data[idx].id;
    if (namesBeginingsTable8.has(currentNameValue)) {
      namesChain8[idx] = namesBeginingsTable8.get(currentNameValue);
      namesBeginingsTable8.set(currentNameValue, idx);

    } else {
        namesBeginingsTable8.set(currentNameValue, idx);
        namesChain8[idx] = -1;
    }
  }
}

function display_chain() {
  const dataTable = document.getElementById("search_table_chain");
  dataTable.innerHTML = '';
  results = [];
  const searchValue = document.getElementById('search_chain').value;
  build_chain();
  results = chain_search(searchValue);

  for(let i = 0; i < results.length; i++){
    const idx_rec = results[i];
    const newRow = createTableRow(data[idx_rec]);
    dataTable.append(newRow);
  }
}

function swap_chain() {
  const dataTable = document.getElementById("search_table_chain");
  dataTable.innerHTML = '';

  for(let i = 0; i < results.length; i++){
    let j = results[i]
    const newRow = createTableRowChain(namesChain1[j],namesChain2[j],namesChain3[j],namesChain4[j],namesChain5[j],namesChain6[j],namesChain7[j],namesChain8[j]);
    dataTable.append(newRow);
  }
}

// chain search end

function swap_chain_main() {
  if (chain_main) {
    displayData();
    chain_main = false;
    return;
  }
  build_chain();
  const dataTable = document.getElementById("data_table");
  dataTable.innerHTML = '';

  for(let j = 0; j < data.length; j++){
    const newRow = createTableRowChain(namesChain1[j],namesChain2[j],namesChain3[j],namesChain4[j],namesChain5[j],namesChain6[j],namesChain7[j],namesChain8[j]);
    dataTable.append(newRow);
  }
  chain_main = true;
  console.log(typeof data[0].housed);
}