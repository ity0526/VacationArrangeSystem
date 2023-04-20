const infoForm = document.querySelector("#info-form");
const infoInput = document.querySelector("#info-input");
const dateSet = document.querySelector("#datelist");
const removeButton = document.querySelector("#remove-button");
removeButton.addEventListener("click", onRemoveMode);
const finishButton = document.querySelector("#finish");
finishButton.addEventListener("click", offRemoveMode);
const dateList = [];

function submitInfo() {
  event.preventDefault();
  const soldier = infoInput.value;
  const mainStay = soldier.substr(3).split("(")[1].split(")")[0];
  const departure = mainStay.split("~")[0];
  const arrival = mainStay.split("~")[1];
  
  if(arrival.indexOf(" ") === -1) {           //띄어쓰기가 있는 경우 구분
    clearArrival = arrival.split(" ")[0];
  }
  else {
    clearArrival = arrival.split(" ")[1];
  }

  const vacationInfo = {                     //휴가 정보 객체
    rankName : soldier.split(" ")[0],
    name : soldier.split(" ")[1].split("(")[0],
    clearDeparture : departure.split(" ")[0],
    clearArrival : clearArrival,
    departureDay : departure.split(" ")[0].split(".")[1]
  };

  if(dateList.includes(vacationInfo.clearDeparture)) {  //휴가 출발
    fillDeparture(vacationInfo);
  }
  else {
    makeDate(vacationInfo.clearDeparture);
    dateList.push(vacationInfo.clearDeparture);

    fillDeparture(vacationInfo);
  }

  if(dateList.includes(vacationInfo.clearArrival)) { // 휴가 복귀
    fillArrival(vacationInfo);
  }
  else {
    makeDate(vacationInfo.clearArrival);
    dateList.push(vacationInfo.clearArrival);

    fillArrival(vacationInfo);
  }
  infoInput.value = "";                    //입력 후 input value 초기화
	
	sortDate();
}

function sortDate() {
	dateList.sort();
	dateList.forEach(function(date) {
		let ul = document.getElementById(date); //왜 getElementById이고 querySelector는 안될까?
		dateSet.append(ul);
	})
}

function makeDate(date) {
  const ul = document.createElement("ul");
  ul.setAttribute("id", `${date}`);
  dateSet.appendChild(ul);

  const dateLi = document.createElement("li");
  dateLi.setAttribute("class", "date");
  ul.appendChild(dateLi);
  dateLi.innerText = `${date}`;
  
  const departureLi = document.createElement("li");
  departureLi.setAttribute("class", "departure");
  ul.appendChild(departureLi);
  departureLi.innerText = "출발 :";
  
  const arrivalLi = document.createElement("li");
  arrivalLi.setAttribute("class", "arrival");
  ul.appendChild(arrivalLi);
  arrivalLi.innerText = "복귀 :";
	
	const li = document.createElement("li");
	const br = document.createElement("br");
	ul.appendChild(li);
	li.appendChild(br);
}

function fillDeparture(nameInfo) {
  const ul = document.getElementById(`${nameInfo.clearDeparture}`);
  const departureLi = ul.getElementsByClassName("departure");
	const span = document.createElement("span");
	span.setAttribute("class", `${nameInfo.name}`);
  span.innerText =` ${nameInfo.rankName} ${nameInfo.name}(~${nameInfo.clearArrival}),`;
	const button = document.createElement("button");
	button.addEventListener("click", remove);
	button.innerText = "❌";
	button.className = "hidden";
	
	departureLi[0].appendChild(span);
	span.appendChild(button);
}

function fillArrival(nameInfo) {
  const ul = document.getElementById(`${nameInfo.clearArrival}`);
  const arrivalLi = ul.getElementsByClassName("arrival");
	const span = document.createElement("span");
	span.setAttribute("class", `${nameInfo.name}`);
	span.innerText = `${nameInfo.rankName} ${nameInfo.name}`;
  const button = document.createElement("button");
	button.addEventListener("click", remove);
	button.innerText = "❌";
	button.className = "hidden";
	
	arrivalLi[0].appendChild(span);
	span.appendChild(button);
}

function onRemoveMode() {
	const removeButtons = dateSet.getElementsByTagName("button");
	
	for(let i=0; i<removeButtons.length; i++){
		removeButtons[i].className = "";
	}
	removeButton.className = "hidden";
	finishButton.className  = "";
}

function offRemoveMode() {
	const removeButtons = dateSet.getElementsByTagName("button");
	console.log(1);
	for(let i=0; i<removeButtons.length; i++){
		removeButtons[i].className = "hidden";
	}
	removeButton.className = "";
	finishButton.className = "hidden";
}

function remove(event) {
	const target = event.target.parentNode;
	target.parentNode.removeChild(target);
}

infoForm.addEventListener("submit", submitInfo);