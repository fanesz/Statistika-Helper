function buttonMouseover_left() {
  document.getElementById("button-left").style = 'background-color: #008300;'
}
function buttonMouseout_left() {
  document.getElementById("button-left").style = 'background-color: #00B012;'
}
function buttonMouseover_right() {
  document.getElementById("button-right").style = 'background-color: #830000;'
}
function buttonMouseout_right() {
  document.getElementById("button-right").style = 'background-color: #B00000;'
}


function reset() {
  document.getElementById("main-table").remove()
  defaultTabel()

  document.getElementById('num-display').innerText = ''
  document.getElementById('num-display-sorted').innerText = ''
  document.getElementById('other-display').innerText = ''

  document.getElementById('inputtext').value = ''

}

function defaultTabel() {

  let table = document.createElement("table");
  table.id = "main-table";
  document.getElementById('table-place').appendChild(table);

  //tr1
  let tr1 = document.createElement("tr");
  tr1.id = "a"
  document.getElementById("main-table").appendChild(tr1)

  let td1a = document.createElement("td");
  let td2a = document.createElement("td");
  let td3a = document.createElement("td");
  let td4a = document.createElement("td");
  td1a.innerText = "Nilai"
  td2a.innerText = "Frekuensi"
  td3a.innerText = "Kumulatif"
  td3a.id = "table-kumulatif"
  td4a.innerText = "Relatif"
  td4a.id = "table-relatif"
  document.getElementById("a").appendChild(td1a)
  document.getElementById("a").appendChild(td2a)
  document.getElementById("a").appendChild(td3a)
  document.getElementById("a").appendChild(td4a)

  //tr2
  let tr2 = document.createElement("tr");
  tr2.id = "end"
  document.getElementById("main-table").appendChild(tr2)

  let td1b = document.createElement("td");
  let td2b = document.createElement("td");
  td1b.innerText = "Jumlah"
  td2b.id = "jumlah"
  document.getElementById("end").appendChild(td1b)
  document.getElementById("end").appendChild(td2b)



}

defaultTabel()




// document.getElementById('inputtext').value = "65,66,67,68,69,70,70,70,70,71,71,71,72,72,72,72,72,72,73,73,73,74,74,74,74,74,74,74,75,75,75,75,75,76,77,78,79,79,80,82"
document.getElementById('inputtext').value = "70,79,35,81,74,91,49,83,70,73,93,48,73,74,68,82,74,74,97,72,78,81,43,95,85,70,95,86,80,57,71,87,68,53,65,92,80,92,71,93,38,80,93,77,83,56,84,76,63,86"
// document.getElementById('inputtext').value = "5,3,7,5,2,7,8,9,6,6,6,4,7,5,5,9,9,8,9,9,11,12,11"

let datas = document.getElementById('inputtext').value
let sorted;


  datas = datas.replaceAll('.', ',').replaceAll('\n', '  ').replaceAll('  ', ' ').replaceAll(' ', ',').replaceAll(',,', ',')

if (datas.endsWith(',')) { datas = datas.slice(0, -1).split(',') }
else (datas = datas.split(','))
datas = datas.map(function(str) { return parseInt(str) })

if (datas.length > 1) { main() }


function main() {
  document.getElementById("main-table").remove()
  defaultTabel()

  document.getElementById('num-display').innerText = ''
  document.getElementById('num-display-sorted').innerText = ''
  document.getElementById('other-display').innerText = ''

  datas = document.getElementById('inputtext').value

  datas = datas.replaceAll('.', ',').replaceAll('\n', '  ').replaceAll('  ', ' ').replaceAll(' ', ',').replaceAll(',,', ',')
  
  if (datas.endsWith(',')) { datas = datas.slice(0, -1).split(',') }
  else (datas = datas.split(','))
  console.log(datas);
  datas = datas.map(function(str) { return parseInt(str) })
  sorted = [...datas].sort((a, b) => {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  });



  let dik_lowest = sorted[0]
  let dik_highest = sorted[sorted.length - 1]
  let dik_R = dik_highest - dik_lowest
  let dik_k = Math.round(Math.log10(datas.length) * 3.322 + 1)
  let dik_c = Math.round(dik_R / dik_k)


  // console.log('Banyak data (n) \t= ' + datas.length);
  // console.log('Jangkauan (R) \t\t= ' + dik_R);
  // console.log('Banyak kelas (k) \t= ' + dik_k);
  // console.log('Panjang Inverval (c) \t= ' + dik_c);
  // console.log('Nilai Tertinggi \t= ' + dik_highest);
  // console.log('Nilai Terendah \t\t= ' + dik_lowest);

  let result = [];
  let temp_dik_lowest = dik_lowest
  let frekuensi_list = [];
  let kumulatif = 0;

  for (let i = 0; i <= dik_k - 1; i++) {
    let result_temp1 = '';
    let result_temp2 = [];
    let frekuensi = 0;
    while (result_temp2.length != dik_c && temp_dik_lowest <= dik_highest) {
      result_temp2.push(temp_dik_lowest)
      temp_dik_lowest++
    }
    result_temp1 = (`${result_temp2[0]} - ${result_temp2[result_temp2.length - 1]}`)


    for (let j = 0; j <= sorted.length - 1; j++) {
      for (let k = 0; k <= result_temp2.length - 1; k++) {

        if (sorted[j] == result_temp2[k]) {
          frekuensi++
        }

      }
    }

    result.push([result_temp1[0], frekuensi])
    frekuensi_list.push(frekuensi)
    let newEle = document.createElement("tr");
    let newEle2 = document.createElement("td");
    let newEle3 = document.createElement("td");
    let newEle4 = document.createElement("td");
    let newEle5 = document.createElement("td");

    newEle.id = "b" + i
    newEle2.innerText = result_temp1
    newEle3.innerText = frekuensi
    // newEle4.innerText = 
    //     frekuensi_list.length == 1 ? 0 : frekuensi_list[i-1]

    if (frekuensi_list.length == 1) {
      newEle4.innerText = 0
    } else {
      newEle4.innerText = frekuensi_list[i - 1] + kumulatif
      kumulatif = frekuensi_list[i - 1] + kumulatif
    }
    newEle5.innerText = parseInt(frekuensi / datas.length * 100) + ' %'


    let getEle = document.getElementById("end");
    getEle.parentNode.insertBefore(newEle, getEle);

    let getEle2 = document.getElementById("b" + i);
    getEle2.parentNode.insertBefore(newEle2, getEle2.nextSibling);
    getEle2.parentNode.insertBefore(newEle5, newEle2.nextSibling);
    getEle2.parentNode.insertBefore(newEle4, newEle2.nextSibling);
    getEle2.parentNode.insertBefore(newEle3, newEle2.nextSibling);
  }


  let getEle = document.getElementById("jumlah");
  let newEle = document.createElement('td')
  getEle.parentNode.insertBefore(newEle, newEle.nextSibling);
  newEle.innerText = kumulatif + frekuensi_list[frekuensi_list.length - 1]
  // newEle.id = 'tabel-total'

  let getEle2 = document.getElementById("jumlah");
  let newEle2 = document.createElement('td')
  getEle2.parentNode.insertBefore(newEle2, newEle2.nextSibling);
  newEle2.innerText = 100 + ' %'
  // newEle2.id = 'tabel-total'




  // console.table(result);
  document.getElementById("jumlah").innerText = datas.length

  if (document.getElementById('num-display').innerText == '') {
    let data_display = datas.join(' ')
    let num_display = document.createElement("span");
    num_display.id = "main-num_display";
    num_display.innerText = data_display
    document.getElementById('num-display').appendChild(num_display);
  }

  if (document.getElementById('num-display-sorted').innerText == '') {
    let data_display = sorted.join(' ')
    let num_display = document.createElement("span");
    num_display.id = "main-num_display-sorted";
    num_display.innerText = data_display
    document.getElementById('num-display-sorted').appendChild(num_display);
  }

  if (document.getElementById('other-display').innerText == '') {
    let num_display = document.createElement("span");
    num_display.id = "main-num_display-sorted";
    num_display.innerText =
      'Banyak data (n) = ' + datas.length + '\n' +
      'Jangkauan (R) = ' + dik_R + '\n' +
      'Banyak kelas (k) = ' + dik_k + '\n' +
      'Panjang Inverval (c) = ' + dik_c + '\n' +
      'Nilai Tertinggi = ' + dik_highest + '\n' +
      'Nilai Terendah = ' + dik_lowest
    document.getElementById('other-display').appendChild(num_display);
  }

}