  let IsCaulating = false;
  let Temporary = JSON.parse(localStorage.getItem('BMIdatas')) || [];
  let DataList = document.querySelector('.DataList');
  Initialize();

  function Initialize() {
      RednerList();
  }

  function ResultBTN(event) {
      event.preventDefault();
      let BMIdata = {};
      let HeightInput = document.querySelector('#userH');
      let WeightInput = document.querySelector('#userW');

      BMIdata.Height = HeightInput.value;
      BMIdata.Weight = WeightInput.value;
      if (IsCaulating == true) {
          IsCaulating = false;
          HeightInput.value = "";
          WeightInput.value = "";
          RenderBMI("");
          return;
          // 重新清空資料
      };
      // console.log(BMIdata);
      let Block = true;
      if (BMIdata.Height == "" | BMIdata.Height > 250 || 11 > BMIdata.Height) {
          alert("請填寫正確高度，感謝");
          Block = false;
      }
      if (BMIdata.Weight == "" || BMIdata.Weight > 250 || 3 > BMIdata.Weight) {
          alert("請填寫正確重量，感謝");
          Block = false;
      }
      console.log('Block', Block);
      if (Block) { // BMI 計算
          IsCaulating = true
          BMIdata.BMI = BMI_Calculator(BMIdata.Height, BMIdata.Weight);
          BMIdata.Time = dayjs().format('YYYY-MM-DD HH 時 mm 分');
          RenderBMI(BMIdata.BMI);
          LocalStorageIO(BMIdata);
      } else {
          return;
      }

  }

  function BMI_Calculator(Height, Weight) {
      Height = Height / 100; // 公分轉為公尺
      let BMI = Math.round(Weight / (Height * Height) * 100) / 100; // 四捨五入至小數點第二位
      console.log(BMI);
      return BMI;
  }

  function LocalStorageIO(BMIdata) {
      console.log(BMIdata); // 沒存就是空陣列
      Temporary.unshift(BMIdata);
      localStorage.setItem('BMIdatas', JSON.stringify(Temporary));
      console.log(Temporary);
      RednerList()
  }

  function RenderBMI(BMI) {
      let BTNtext = "";
      let BTNcolor = "";
      let BMItext = document.querySelector('.BMItext');
      let RenderBTN = document.querySelector('.ResultBTN');
      if (IsCaulating == true) {
          if (BMI < 18.5) {
              BTNtext = "過輕";
              BTNcolor = "#31BAF9"
          } else if (BMI > 18.5 && BMI < 25) {
              BTNtext = "理想";
              BTNcolor = "#86D73F"
          } else if (BMI > 25 && BMI < 30) {
              BTNtext = "過重";
              BTNcolor = "#FF982D"
          } else if (BMI > 30 && BMI < 35) {
              BTNtext = "輕度肥胖";
              BTNcolor = "#FF6C03"
          } else if (BMI > 35) {
              BTNtext = "重度肥胖";
              BTNcolor = "#FF1200"
          }
      } else {
          BMItext.textContent = "";
          RenderBTN.innerHTML = `看結果<span><img src="./IMG/icons_loop.png"></span>`
          RenderBTN.style = "border: 6px solid #FFD366;   color: #424242; background: #FFD366;"
          console.log("恢復");
          return;
      }
      console.log(BTNtext);
      RenderBTN.innerHTML = `
        <h4>${BMI}</h4>
        <p>BMI<p>
        `
      BMItext.style = `color:${BTNcolor}`;
      RenderBTN.style = `border: 6px solid ${BTNcolor};background-color:transparent;color:${BTNcolor};box-shadow:none;`
      BMItext.textContent = BTNtext;
      console.log(RenderBTN.childNodes);
  }

  function RednerList() {
      Temporary = JSON.parse(localStorage.getItem('BMIdatas')) || []
      let TextList = "";
      let BTNcolor = "";
      Temporary.forEach((element, index, array) => {
          if (element.BMI < 18.5) {
              BTNcolor = "#31BAF9"
              TextList += `
                <li class="LightBMI" style="border-color:${BTNcolor}">
                    <h4>過輕</h4>
                    <p><span>BMI </span>${element.BMI}</p>
                    <p><span>weight </span>${element.Weight}</p>
                    <p><span>height </span>${element.Height}</p>
                    <span>${element.Time}</span>
                    <button data-num="${index}">刪除</button>
                </li>
                    `;
          } else if (element.BMI > 18.5 && element.BMI < 25) {
              BTNcolor = "#86D73F"
              TextList += `
                <li class="IdealBMI" style="border-color:${BTNcolor}">
                    <h4>理想</h4>
                    <p><span>BMI </span>${element.BMI}</p>
                    <p><span>weight </span>${element.Weight}</p>
                    <p><span>height </span>${element.Height}</p>
                    <span>${element.Time}</span>
                    <button data-num="${index}">刪除</button>
                </li>`;
          } else if (element.BMI > 25 && element.BMI < 30) {
              BTNcolor = "#FF982D"
              TextList += `
                <li class="IdealBMI" style="border-color:${BTNcolor}">
                    <h4>過重</h4>
                    <p><span>BMI </span>${element.BMI}</p>
                    <p><span>weight </span>${element.Weight}</p>
                    <p><span>height </span>${element.Height}</p>
                    <span>${element.Time}</span>
                    <button data-num="${index}">刪除</button>
                </li>`;
          } else if (element.BMI > 30 && element.BMI < 35) {
              BTNcolor = "#FF6C03"
              TextList += `
                <li class="HeavyBMI" style="border-color:${BTNcolor}">
                    <h4>輕度肥胖</h4>
                    <p><span>BMI </span>${element.BMI}</p>
                    <p><span>weight </span>${element.Weight}</p>
                    <p><span>height </span>${element.Height}</p>
                    <span>${element.Time}</span>
                    <button data-num="${index}">刪除</button>
                </li>`;
          } else if (element.BMI > 35) {
              BTNcolor = "#FF1200"
              TextList += `
                <li class="HeavyBMI" style="border-color:${BTNcolor}">
                    <h4>重度肥胖</h4>
                    <p><span>BMI </span>${element.BMI}</p>
                    <p><span>weight </span>${element.Weight}</p>
                    <p><span>height </span>${element.Height}</p>
                    <span>${element.Time}</span>
                    <button data-num="${index}">刪除</button>
                </li>`;
          }
          console.log(element);
      });
      DataList.innerHTML = TextList;
      // 將tempraray.foreach字串綁 data-set
      // 考慮將 Temporary 變成全域變數
  }

  function DeleteData(event) {
      event.preventDefault();
      console.log(event.target.dataset.num);
      console.log(event.target.nodeName);
      let DataNum = event.target.dataset.num;
      if (event.target.nodeName !== 'BUTTON') {
          return;
      } else if (event.target.nodeName == 'BUTTON') {
          Temporary.splice(DataNum, 1);
          localStorage.setItem('BMIdatas', JSON.stringify(Temporary));
          RednerList();
      }
      // let deleteNum = e.target.dataset.num;
      // event.target.nodeName!=='目標標籤'{return}
      // else if event.target.nodeName=="目標標籤"{ temporary[i]跟dateset.num比對刪除}
  }
  DataList.addEventListener('click', DeleteData);