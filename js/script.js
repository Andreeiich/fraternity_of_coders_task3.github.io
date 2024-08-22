const table = document.getElementById('table');
const tableBody = document.getElementById('table-body');
const searchInput = document.getElementById('search');

let data = [];

//делаем запрос и парсим JSON
const xhr = new XMLHttpRequest(); 
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
xhr.onload = function() {
  if (xhr.status === 200) {
    data = JSON.parse(xhr.responseText);
   makeTable();
  }
};
xhr.send();

// функция создания таблицы
function  makeTable() {
  tableBody.innerHTML = '';
  data.forEach((item) => {
    if (!item.hidden) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.userId}</td>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.body}</td>
      `;
      tableBody.appendChild(row);
    }
  });
}

let sortedColumn = null;
let sortOrder = 1; //по умолчанию сортировка по возрастанию,иначе,если -1 то, по убыванию


table.addEventListener('click', (e) => {
  if (e.target.tagName === 'TH') { // сравниваем имя тега HTML-элемента явл. ли ячейков в заголовке, на который кликнули мышью в заголовке таблицы.
    const column = e.target.id; // получаем id тега HTML-элемента, на который кликнули мышью.
   
    if (sortedColumn === column) {//сравниваем,является ли текущий столбец тем же, который был отсортирован ранее. Если да, то меняет порядок сортировки
      sortOrder = -sortOrder;
    } else {
      sortedColumn = column;// если текущий столбец не был отсортирован ранее, то устанавливаем его как отсортированный столбец таблицы
      sortOrder = 1;// устанавливаем порядок сортировки на 1
      }

      //сортирует массив (data) по столбцу, на который был клик. 
      //Функция сортировки сравнивает значения в столбце и возвращает значение, которое определяет порядок сортировки.
    data.sort((a, b) => {
      if (a[column] < b[column]) return -sortOrder;  // если значение в столбце a меньше значения в столбце b, то возвращает значение -sortOrder. Это означает, что если sortOrder равен 1, то сортировка будет по возрастанию, а если sortOrder равен -1, то сортировка будет по убыванию.
      if (a[column] > b[column]) return sortOrder; // если значение в столбце a больше значения в столбце b, то возвращает значение sortOrder. Это означает, что если sortOrder равен 1, то сортировка будет по возрастанию, а если sortOrder равен -1, то сортировка будет по убыванию.
      return 0; // если значения в столбце a и b равны, то возвращает значение 0, что означает, что порядок сортировки не меняется.
    });
   makeTable();
  }
});

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.trim();// получаем введенные данные
  
  if (searchTerm.length >= 3) {
    data.forEach((item) => {
      const match = Object.values(item).some((value) => value.toString().includes(searchTerm)); //получаем массив значений и проверяем содержит ли данный массив введенные данные.
      
      if (!match) { //  если значение не найдено, то скрываем элементы
        item.hidden = true;
      } else { // показываем элементы,если значение найдено
        item.hidden = false;
      }
    });
   makeTable();
  } else {
    data.forEach((item) => {
      item.hidden = false; //все элементы отображаем, так как введено меньше 3 букв
    });
   makeTable();
  }
});


