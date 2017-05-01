<<<<<<< HEAD
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
	$j = ($hasHead)?1:0;
	$th = ($hasHead?$table.rows[(0)].outerHTML:"");
	$rowCount -= ($hasHead?1:0);

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
		document.getElementById("buttons").innerHTML = pageButtons($pageCount,$p);

		//
		document.getElementById("id"+$p).setAttribute("class"," countmein");
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
=======
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
	$j = ($hasHead)?1:0;
	$th = ($hasHead?$table.rows[(0)].outerHTML:"");
	$rowCount -= ($hasHead?1:0);

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
		document.getElementById("buttons").innerHTML = pageButtons($pageCount,$p);

		//
		document.getElementById("id"+$p).setAttribute("class"," countmein");
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
>>>>>>> b1c3c5132aa46fa3fe0b749485829761705d9b1f
