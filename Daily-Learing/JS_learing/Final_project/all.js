    let currentInfos = [];
    let currentLocation = document.querySelector('.currentLocation');
    let select = document.querySelector('.location');
    let infos = [];
    let districtsResult;
    let place;
    let hotspot_list = document.querySelector('.hotspot-list');
    let cardList = document.querySelector('.card-list');
    let pageList = document.querySelector('.page-list');
    let xhr = new XMLHttpRequest();
    // 取變數 xhr 準備取資料回來
    xhr.open('get', 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json', true);
    // 利用 open 這個 method 來 get the data from the api
    xhr.send(null);
    // send null back to access the data;
    xhr.onload = function() {
        // then creat the function after the data was the onloaded satuts
        let responseStr = JSON.parse(xhr.responseText);
        // creat the variable to contain the data which gets from api, and use the JSON.parse method to turn the data to a JS object;
        infos = responseStr.result.records;
        // creat the variable to contain the data I need;
        // use the console to check whether the  data is ture or not;
        districts()
        optionChange()
        console.log('info', infos);
    };

    function districts() {
        let options = `<option disabled>- -請選擇行政區- -</option>` + `<option>全部行政區</option>`;
        //用變數組字串
        let fliterDistricts = [];
        //來裝各區的變數
        infos.forEach(element => {
            fliterDistricts.push(element.Zone);
        });
        // 將區域利用 forEach 塞進變數
        districtsResult = fliterDistricts.filter(function(element, index, array) {
            return array.indexOf(element) === index;
        })

        // 這邊的意思是只要有相同的區域名字就用 return 篩掉
        console.log('districtsrrrrr', districtsResult);
        districtsResult.forEach(element => {
            options += `<option value='${element}'>${element}</option>`;
            select.innerHTML = options;
        });
    }

    function optionChange() {
        place = select.value;
        console.log(place);
        render_place();
        render_list();
    }

    function hotspotBTN(event) {
        console.log(event)
        event.preventDefault();
        if (event.target.nodeName === "INPUT") {
            place = event.target.value;
            select.value = place;
            console.log(place);
            render_place();
            render_list();
        }
    }

    function render_place() {
        currentInfos = [];
        infos.forEach(element => {
            if (element.Zone == place) {
                let currentPlace = `<h2 class="currentPlace">${place}</h2>`
                currentLocation.innerHTML = currentPlace;
                currentInfos.push(element);
            } else if ('全部行政區' == place) {
                let currentPlace = `<h2 class="currentPlace">${place}</h2>`
                currentLocation.innerHTML = currentPlace;
                currentInfos.push(element);
            }
        });
        pagenation()
    }

    function pagenation() {
        let newpages = "";
        console.log(currentInfos.length);
        let Totalpage = Math.ceil(currentInfos.length / 6);
        for (let page = 1; page < Totalpage; page++) {
            newpages += `<button onclick="render_list(${page})">${page}</button>`;
        }
        pageList.innerHTML = newpages;
        console.log(newpages);
    }
    render_list(currentpage = 1)

    function render_list(currentpage = 1) {
        let finalCount = (currentpage * 6) - 1; //  抓取的最終比數
        let initCount = (currentpage * 6) - 6; // 抓取的初始比數
        let demandCount = []; // 需要抓取的 card
        let cardstr = '';
        for (var i = initCount; i <= finalCount; i++) {
            demandCount.push(i);
        }
        demandCount.forEach(element => {
            if (currentInfos[element] != undefined) {
                cardstr += `<li class="card">
                <div class="pic" style="background-image: url(${currentInfos[element].Picture1});">
                    <h3>${currentInfos[element].Name}</h3><h4>${currentInfos[element].Zone}</h4>
                    </div>
                    <div class="card-text">
                        <p><img src='./img/icons_clock.png'>${currentInfos[element].Opentime}</p>
                        <p><img src='./img/icons_pin.png'>${currentInfos[element].Add}</p></div>
                        <div class="card-text-bottom"><p><img src='./img/icons_phone.png'>${currentInfos[element].Tel}</p><p><img src='./img/icons_tag.png'>${currentInfos[element].Ticketinfo}</p></div>
                </li>`
            }
        });
        cardList.innerHTML = cardstr;
        console.log('demandCount', demandCount);
        console.log("currentInfos", currentInfos);
    }
    let scrollTop = document.querySelector('.scrollToTopBTN')

    function scrollToTop(event) {
        event.preventDefault();
        //改用 window 也可以
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    // 篩行政區
    // 一個陣列裝符合行政區的景點
    // 一個變數要裝裝符合行政區的景點/一頁要顯示的資料 = 總共需要得頁數
    // 觸發前一頁或後一頁
    scrollTop.addEventListener('click', scrollToTop, false);
    hotspot_list.addEventListener('click', hotspotBTN, false);
    select.addEventListener('onchange', optionChange, false);