const { read } = require('fs');
fs = require('fs');
var last_id = read_id();
var data = [];
// console.log(last_id.last_index);
const forms = document.querySelectorAll('.needs-validation');
let scroll_t = document.getElementById("btn-back-to-top");


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
    let name = random_text(2);
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