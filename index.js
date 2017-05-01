// jQuery Datepicker
$(".datepicker").datepicker({
  defaultDate: null,
  prevText: "<",
  nextText: ">",
  changeMonth: true,
  changeYear: true,
  firstDay: 1,
  yearRange: "1930:2017",
  dateFormat: "dd.mm.yy",
     onSelect: function(dateText, inst) {
            $(".search").val(dateText);
        }
});
// const endpoint = 'filename.js';
// fetch(endpoint)
//     .then(blob => blob.json())
//     .then(people => people.map(elem => {
//                      elem.dateOfBirth = leading0(elem.dateOfBirth);
//                      return elem;
//    });


  const endpoint = 'https://api.myjson.com/bins/agowj';
  var people = [];
  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => people.push(...data))
    .then(() => people.map(function(elem){

      return elem.dateOfBirth = leading0(elem.dateOfBirth);

    }))

setTimeout(function(){ displayMatches(); }, 450);
setTimeout(function(){ sortTable("table1"); }, 600);

  function findMatches(wordToMatch, people) {

    return people.filter(person => {
      //here we need to figure out if the person matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return person.id.toString().match(regex) || person.firstName.match(regex) || person.lastName.match(regex) || person.dateOfBirth.toString().match(regex) || person.function.match(regex) || person.experience.toString().match(regex)
    });
  }

  function displayMatches() {
    const matchArray = findMatches(this.value, people);
    const html = matchArray.map(person => {
      return `
      <tr>
      <td>${person.id}</td>
      <td>${person.firstName}</td>
      <td>${person.lastName}</td>
      <td>${person.dateOfBirth}</td>
      <td>${person.function}</td>
      <td>${person.experience}</td>
      </tr>
      `;
    }).join('');
    suggestions.innerHTML = html;
  }

  // this part fires displayMatches function every time a keyboard button is pressed or the date is selected.
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches, true);
  searchInput.addEventListener('keyup', displayMatches, false);


  // sorting function
  let result = 1;
  $('th').on('click', function() {
    // figure out which column to sort
    let attrToSort = $(this).attr('rel');

    if(attrToSort === "dateOfBirth"){
      const ordered = people.sort((a, b) => {
        var x = new Date(parseDate(a.dateOfBirth)).getTime();
        var y = new Date(parseDate(b.dateOfBirth)).getTime();
        return x > y ? [result] : -[result]

    })}
    else {
      const ordered = people.sort((a, b) => a[attrToSort] > b[attrToSort] ? [result] : -[result]);
    }
    // reverse sorting when the table heading is clicked for the second time
    result = -result;
    // display result
    displayMatches();
    sortTable('table1');

  });


// Under this line there are functions that convert the date into timestamp and same format
function parseDate(string){
  var x = string.split(".");
  var newtab = [];

  Array.prototype.map.call(x, function(elem){
    return newtab.push(elem.length === 1 ? "0" + elem : elem)
  })

  var newtab = newtab.join(" ");
  var hour = newtab.slice(11);
  var new_date = newtab.slice(0, 10).split(" ").reverse().join(".") + " " + hour;

  return new_date;
}

function leading0(string) {
  var x = string.split(".");
  var newtab = [];

  Array.prototype.map.call(x, function(elem){
    return newtab.push(elem.length === 1 ? "0" + elem : elem)
  })

  var newtab = newtab.join(".");
  return newtab
}
