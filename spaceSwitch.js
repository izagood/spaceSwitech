$(document).ready(function () {

    const hi = '연결 성공';
    console.log(hi);

    const list = ['권시연', '김예은', '김예진', '김재영', '노유림', '민지홍', '박윤재', '이소현', '이재빈', '이지현', '임정환', '정우리'];
    let randomList = [];

    const orderPick = function () {
        renderList(list);
    }

    const renderList = function (renderlist) {
        for (const renderlistNum in renderlist) {
            $('li').eq(renderlistNum).text(list[renderlistNum]);
        }
    }

    // 만약 min = 0 , max = 3 이면 0,1,2가 나옴
    const randomIntMinMax = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    const randomIntMax = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    // 1분단 -> 2,3 분단 / 2분단 -> 1,3분단 / 3분단 -> 1,2분단
    const rangeRandom = function (i) {
        // 1분단 0123
        // 2분단 4567
        // 3분단 89,10,11
        if (i >= 0 && i <= 3) {
            return randomIntMinMax(4, 12);
        }

        if (i >= 4 && i <= 7) {
            if (randomIntMax(12) % 2 == 0) {
                return randomIntMax(4)
            } else {
                return randomIntMinMax(8, 12)
            }
        }

        if (i >= 8 && i <= 11) {
            return randomIntMax(8);
        }
    }

    const emptyList = function (targetList) {
        let returnemptyList = [];
        let countNum = 0;
        for(const i in targetList){
            if(targetList[i] == undefined){
                returnemptyList[countNum] = i;
                countNum++;
            }
        }
        return returnemptyList
    };

    const shuffleList = function () {
        for (const i in list) {
            let randomNum = rangeRandom(i);

            // 비어있으면
            if (randomList[randomNum] == undefined) {
                randomList[randomNum] = list[i];
            } else { // 비어있지 않으면 남은 숫자 중에 임으로 들어간다.
                const emptyRandomList = emptyList(randomList);
                const pickOne = randomIntMax(emptyRandomList.length);
                
                randomList[emptyRandomList[pickOne]] = list[i];
            }
        }
        console.log(randomList);
        renderList(randomList);
        randomList = [];
    };

    $("#setSeat").on("click", function () {
        orderPick();
    });

    $("#randomSeat").on("click", function () {
        shuffleList();
    });
});