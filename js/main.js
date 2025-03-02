let content = document.getElementById("content");
let timeNow = document.getElementById("timeNow");
let dateNow = document.getElementById("dateNow");
let dayRamadan = document.getElementById("dayRamadan");
let iftTime = document.getElementById("iftTime");
let iftTimeRest = document.getElementById("iftTimeRest");
let imsTime = document.getElementById("imsTime");
let imsTimeRest = document.getElementById("imsTimeRest");
let nextSal = document.getElementById("nextSal");
let timeNextSal = document.getElementById("timeNextSal");
let dashIft = document.getElementById("dashIft");
let dashIms = document.getElementById("dashIms");
let imsLabel = document.getElementById("imsLabel");
let contentMain = document.querySelector(".content");
let t = document.querySelectorAll(".t");

let cont = "";
cont = `<table>`;
cont += `<tr class="font-color-yellow font-size-small trHeader">`;
for (let i = 0; i < header.length; i++) {
  cont += ` <td class="tHeader">${header[i]}</td>`;
}

cont += `</tr>`;
for (let i = 0; i < data.length; i++) {
  cont += `<tr>`;
  for (let j = 0; j < 10; j++) {
    cont += ` <td>${data[i][j]}</td>`;
  }
  cont += `</tr>`;
}
cont += `</table>`;

content.innerHTML = cont;

now = new Date();

function convertFormatDate(dateC) {
  let d = dateC.getDate() >= 10 ? "" + dateC.getDate() : "0" + dateC.getDate();
  let m =
    dateC.getMonth() >= 10
      ? "" + (dateC.getMonth() + 1)
      : "0" + (dateC.getMonth() + 1);
  let y =
    dateC.getFullYear() >= 10
      ? "" + dateC.getFullYear()
      : "0" + dateC.getFullYear();
  let fDate = d + "/" + m + "/" + y;
  return fDate;
}
function convToHMS(date) {
  let rst = date % 86400;
  let ho = rst / 3600;
  let rst2 = date % 3600;
  let min = rst2 / 60;
  let rst3 = date % 60;
  let sec = rst3;

  let h = Math.floor(ho);
  let m = Math.floor(min);
  let s = Math.floor(sec);

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  return h + ":" + m + ":" + s;
}

function comparTime(time,tpl = 0) {
  let t = time.split(":");
  let pt1;
  let pt2;
  let pt3;
  if (t[0][0] == "0") {
    pt1 = Number(t[0][1]);
  } else {
    pt1 = Number(t[0]);
  }

  if (t[1][0] == "0") {
    pt2 = Number(t[1][1]);
  } else {
    pt2 = Number(t[1]);
  }

  if (time.split(":").length == 3) {
    if (t[2][0] == "0") {
      pt3 = Number(t[2][1]);
    } else {
      pt3 = Number(t[2]);
    }
  } else {
    pt3 = 0;
  }

  let tm = pt1 * 3600 + pt2 * 60 + pt3;

  if (tpl != 0) {
    tm += tpl;
  }

  let now = new Date();

  let dat =
    tm -  (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());

  if (dat < 0) {
    dat = 0;
  }
  let dateConv = convToHMS(dat);
  return {
    formateTime: dateConv,
    convertTime: tm,
  };
}

setInterval(settim, 1000);

function settim() {
  let check = [];
  let nw = new Date();
  let tm = nw.getHours() * 3600 + nw.getMinutes() * 60 + nw.getSeconds();

  now = new Date();

  let h = now.getHours() >= 10 ? "" + now.getHours() : "0" + now.getHours();
  let m =
    now.getMinutes() >= 10 ? "" + now.getMinutes() : "0" + now.getMinutes();
  let s =
    now.getSeconds() >= 10 ? "" + now.getSeconds() : "0" + now.getSeconds();

  let timeNowData = h + ":" + m + ":" + s;
  let dateNowData = convertFormatDate(now);
  timeNow.innerHTML = timeNowData;
  dateNow.innerHTML = dateNowData;
  let indexOfArray;

  for (let i = 0; i < data.length; i++) {
    if (data[i][8] == dateNowData) {
      check.push(false)
      indexOfArray = i;
      dayRamadan.innerHTML = data[i][9];
      iftTime.innerHTML = data[i][1];
      imsTime.innerHTML = data[i][7];
      let iftTimeRestConv = comparTime(data[i][1]);
      let imsTimeRestConv = comparTime(data[i][7]);
      if (tm > comparTime(data[i][1]).convertTime) {
        let compTmOl = convToHMS(comparTime(comparTime("23:59:59",comparTime(data[i+1][7]).convertTime).formateTime).convertTime);
        imsTimeRest.innerHTML = compTmOl;
        iftTimeRest.innerHTML = "مستمر";
        imsTimeRest.className = "font-ar font-color-yellow";
        iftTimeRest.className = "font-ar font-color-yellow";
        dashIft.innerHTML = "-";
        imsTime.innerHTML = data[i+1][7]
        imsLabel.innerHTML = `<span class="font-ar font-color-yellow pr-1">غدا</span>
         - الإمساك`;
      } else if (
        tm < comparTime(data[i][1]).convertTime &&
        tm > comparTime(data[i][7]).convertTime
      ) {
        iftTimeRest.innerHTML = iftTimeRestConv.formateTime;
        imsTimeRest.className = "font-ar font-color-yellow";
        imsTimeRest.innerHTML = "مستمر";
        imsTimeRest.className = "font-ar font-color-yellow";
        iftTimeRest.className = "font-ar font-color-yellow";
      } else if (tm < comparTime(data[i][7]).convertTime) {
        imsTimeRest.innerHTML = imsTimeRestConv.formateTime;
        iftTimeRest.innerHTML = "مستمر";
        imsTimeRest.className = "font-en font-color-yellow";
        iftTimeRest.className = "font-ar font-color-yellow";
      }
      for (let j = 0; j < t.length; j++) {
        if (j > 0) {
          t[j].innerHTML = data[i][j + 1];
        } else {
          t[j].innerHTML = data[i][j];
        }
      }
    } else {
      check.push(true);
    }
  }

  if (!check.includes(false)) {
    contentMain.innerHTML = `
    <div class="hidden">
        <div class="container flex-center">
          <div class="itemH">
            <div
              class="font-color-white font-en font-weight text-center font-size-small flex-center"
            >
              <span class="font-ar font-color-yellow border-bottom-white m-2">
                 المحتوى غير متوفر للأسف 
              </span>
            </div>
            <div
              class="font-color-white font-ar font-weight text-center font-size-extraSmall flex-center mt-3"
              
            >
              يعرض هذا المحتوى إمساكية شهر رمضان المبارك للسنة الهجرية 1445، وبما أن الشهر الفضيل انتهى لم يعد هذا المحتوى متوفرا
            </div>
            <div class="m-4">
              <div class="text-center copSize">
                <!-- <span class="font-en font-color-yellow resp">Ramadan Calendar </span> -->
                <span class="font-en font-color-white">
                  Designed and Developed by
                </span>
                <a href="mailto:medmokhtarbouna@gmail.com">
                  <span class="font-en font-color-yellow cursor-pointer"
                    >medmokhtarbouna@gmail.com</span
                  ></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function findNearestTime(bigArray, indexOfArray, selectedItems) {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();
    const currentTimeInSeconds =
      currentHours * 3600 + currentMinutes * 60 + currentSeconds;

    let minDifference = Infinity;
    let nearestTimeInSeconds;
    let indx;
    const timesArray = bigArray[indexOfArray];
    for (let j = 0; j < selectedItems.length; j++) {
      const index = selectedItems[j];
      const [hours, minutes] = timesArray[index].split(":").map(Number);
      const totalSeconds = hours * 3600 + minutes * 60;
      const differenceInSeconds = totalSeconds - currentTimeInSeconds;
      if (differenceInSeconds > 0 && differenceInSeconds < minDifference) {
        minDifference = differenceInSeconds;
        nearestTimeInSeconds = totalSeconds;
        indx = index;
      }
    }

    if (!nearestTimeInSeconds && bigArray[indexOfArray + 1]) {
      const [hours, minutes] = bigArray[indexOfArray + 1][0]
        .split(":")
        .map(Number);
      nearestTimeInSeconds = hours * 3600 + minutes * 60;
      minDifference = 24 * 3600;
    }
    let tmcom;
    if (minDifference >= 86399) {
      if (currentTimeInSeconds > nearestTimeInSeconds) {
        tmcom = findNearestTime([["23:59:59"]], 0, [0]).minDif;
        minDifference =
          tmcom + comparTime(bigArray[indexOfArray + 1][6]).convertTime;
        indx = 6;
      }
    }
    return { minDif: minDifference, idx: indx, tmcm: tmcom };
  }

  const selectedItems = [0, 2, 3, 4, 6];
  const differenceInSeconds = findNearestTime(
    data,
    indexOfArray,
    selectedItems
  );
  timeNextSal.innerHTML = convToHMS(differenceInSeconds.minDif);
  nextSal.innerHTML = header[differenceInSeconds.idx];
}
