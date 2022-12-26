const weeks = ['日', '月', '火', '水', '木', '金', '土']
const date = new Date()
let year = date.getFullYear()
let month = date.getMonth() + 1
const config = {
    show: 1,
}

function showCalendar(year, month) {
    for ( i = 0; i < config.show; i++) {
        const calendarHtml = createCalendar(year, month)
        const sec = document.createElement('section')
        sec.innerHTML = calendarHtml
        document.querySelector('#calendar').appendChild(sec)

        month++
        if (month > 12) {
            year++
            month = 1
        }
    }
}

function createCalendar(year, month) {
    const startDate = new Date(year, month - 1, 1) // 月の最初の日を取得
    const endDate = new Date(year, month,  0) // 月の最後の日を取得
    const endDayCount = endDate.getDate() // 月の末日
    const lastMonthEndDate = new Date(year, month - 1, 0) // 前月の最後の日の情報
    const lastMonthendDayCount = lastMonthEndDate.getDate() // 前月の末日
    const startDay = startDate.getDay() // 月の最初の日の曜日を取得
    let dayCount = 1 // 日にちのカウント
    let calendarHtml = '' // HTMLを組み立てる変数

    calendarHtml += '<h1>' + year  + '年' + month +'月'+ '</h1>'
    calendarHtml += '<table>'


// 曜日の行を作成
for (var i = 0; i < weeks.length; i++) {
    calendarHtml += "<td class='youbi'>" + weeks[i] + "</td>"
}

for (var w = 0; w < 6; w++) {
    calendarHtml += '<tr>';

    for (let d = 0; d < 7; d++) {
        if (w == 0 && d < startDay) {
            // 1行目で先月の末日
            let num = lastMonthendDayCount - startDay + d + 1;
            calendarHtml += '<td class="gray">' + num + '</td>';
        } else if (dayCount > endDayCount) {
            // 末尾の日数を超えた分
            let num = dayCount - endDayCount;
            calendarHtml += '<td class="gray">' + num + '</td>';
            dayCount++;
        } else {
            //それ以外の今月分の日付け
            let num=dayCount;
            dayCount++;
            //当日の日付は背景ピンクに
                if(year == date.getFullYear() && month == (date.getMonth()+1) && dayCount == date.getDate()+1){
                    calendarHtml += "<td class='today'>" + num+ "</td>";
            //それ以外は背景無
                }else{
                    calendarHtml += "<td>" + num + "</td>";
                }
            
            }
        }
        calendarHtml += '</tr>'
    }
    calendarHtml += '</table>'

    return calendarHtml
}

function moveCalendar(e) {
    document.querySelector('#calendar').innerHTML = ''

    if (e.target.id === 'prev') {
        month--

        if (month < 1) {
            year--
            month = 12
        }
    }

    if (e.target.id === 'next') {
        month++

        if (month > 12) {
            year++
            month = 1
        }
    }

    showCalendar(year, month)
}

document.querySelector('#prev').addEventListener('click', moveCalendar)
document.querySelector('#next').addEventListener('click', moveCalendar)

showCalendar(year, month)

    

   












