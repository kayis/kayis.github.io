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
var people = [];
fetch('sluzba.json')
  .then(blob => blob.json())
  .then(data => people.push(...data))
  .then(() => people.map(function(elem){

    return elem.dateOfBirth = leading0(elem.dateOfBirth);

  }))


setTimeout(function(){ displayMatches(); }, 450);
setTimeout(function(){ sortTable("table1"); }, 500);

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
};

// pagination functions below!
var	$table,
$n,
$pageCount,
$rows,
$s,
$rowCount,
$firstRow,
$hasHead,
$tr = [],
$i,
$ii,
$j,
$th;

function sortTable(table1) {

	$table = document.getElementById(table1);
	$rowCount = $table.rows.length;
	$firstRow = $table.rows[0].firstElementChild.tagName;
	$hasHead = ($firstRow === "TH");
	$tr = [];
	$j = ($hasHead) ? 1 : 0;
	$th = ($hasHead?$table.rows[(0)].outerHTML:"");
	$rowCount -= ($hasHead ? 1 : 0);

	for ($i = $j,$ii = 0; $i < ($rowCount+$j); $i++, $ii++) {
		$tr[$ii] = $table.rows[($i)].outerHTML;
	}

	$table.insertAdjacentHTML("afterend","<div id='buttons'></div>");

	setNum(5);
}
function setNum(n) {
			$n = n;
			$pageCount = Math.ceil($rowCount / n);
			sort(1,$n);
	}

function sort($p,nn) {
		$rows = $th,$s = ((nn * $p)-nn);

		for ($i = $s;($i < ($s+nn)) && ($i < $tr.length); $i++)
			$rows += $tr[$i];

		$table.innerHTML = $rows;
		let buttonCheck = document.getElementsByTagName("input");
    //this if statement below is written only to fix my issue with sorting function (line 73 - every click added more and more buttons.)
	if (buttonCheck.length <= $pageCount) {
		document.getElementById("buttons").innerHTML = pageButtons($pageCount,$p);
} else {
	//do nothing!
}

}

function pageButtons($pCount,$cur) {

	if ($pCount > 1 ) {
	var	$prevDis = ($cur == 1)?"disabled":"",
		$nextDis = ($cur == $pCount)?"disabled":"",
		$buttons = "<input type='button' value='<<' onclick='sort("+($cur - 1)+","+$n+")' "+$prevDis+">";
	for ($i=1; $i<=$pCount;$i++)
		$buttons += "<input type='button' id='id"+$i+"'value='"+$i+"' onclick='sort("+$i+","+$n+")'>";
	$buttons += "<input type='button' value='>>' onclick='sort("+($cur + 1)+","+$n+")' "+$nextDis+">";
	return $buttons;
	} else {return "";}
};
