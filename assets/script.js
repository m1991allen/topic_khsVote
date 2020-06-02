// get news api
function ajax_news() {
    $.ajax({
        url: 'https://ftvnews-api2.azurewebsites.net/API/FtvGetNewsWeb.aspx?Cate=%E9%9F%93%E5%9C%8B%E7%91%9C&Page=1&sp=9', //json
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let html_read = `
            <a href="{{link}}" target="_blank">
                <div class="col_box">
                    <div class="cover_news">
                        <img src="{{url}}">
                    </div>
                    <h5>{{title}}</h5>
                    <p><i class="far fa-clock"></i> {{date}}</p>
                </div>
            </a>
            `;

            for (let i = 0; i < 9; i++) {
                let html_reading = html_read.replace('{{title}}', limitUploadFileName())
                    .replace('{{url}}', data.ITEM[i].Image)
                    .replace('{{date}}', data.ITEM[i].CreateDate)
                    .replace('{{link}}', data.ITEM[i].WebLink)
                    ;

                function limitUploadFileName() {
                    let newsTitle = data.ITEM[i].Title
                    let len = newsTitle.length;
                    let str = "";

                    if (len > 22) {
                        str = newsTitle.substring(0, 22) + "......";
                    }
                    else {
                        return newsTitle;
                    }
                    return str;
                };

                $('#reading').append(html_reading);
            };
        }
    });
} ajax_news();


// get Google Sheet API
function ajax_gsheet() {
    $.ajax({
        url: 'https://spreadsheets.google.com/feeds/cells/1Vx9OEa9_m1tZp7ZM_jfEvS39fmFt90OSfQXDmqmaOy4/1/public/full?alt=json',
        type: 'GET',
        dataType: 'json',
        success: function data_sheet(data) {
            var data_ag = data.feed.entry[3].content.$t;
            var data_dag = data.feed.entry[4].content.$t;
            var data_suk = data.feed.entry[5].content.$t;

            document.getElementById('agree').innerText = data_ag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' 票';
            document.getElementById('disagree').innerText = data_dag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' 票';
            document.getElementById('suck').innerText = data_suk.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' 票';
            document.getElementById('voteSum').innerText = data_ag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' / 575,091票';

            // Vote total percent 
            let percent_data_total = parseInt(data_ag / 575091 * 100);
            if (percent_data_total > 100) {
                document.getElementById('total').innerText = 100 + ' ％';
            } else {
                document.getElementById('total').innerText = percent_data_total + ' ％';
            }

            $('#total').css('width', percent_data_total + '%');
        }
    });

    setInterval(function () {
        $.ajax({
            url: 'https://spreadsheets.google.com/feeds/cells/1Vx9OEa9_m1tZp7ZM_jfEvS39fmFt90OSfQXDmqmaOy4/1/public/full?alt=json',
            type: 'GET',
            dataType: 'json',
            success: function data_sheet(data) {
                var data_ag = data.feed.entry[3].content.$t;
                var data_dag = data.feed.entry[4].content.$t;
                var data_suk = data.feed.entry[5].content.$t;

                document.getElementById('agree').innerText = data_ag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' 票';
                document.getElementById('disagree').innerText = data_dag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' 票';
                document.getElementById('suck').innerText = data_suk.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' 票';
                document.getElementById('voteSum').innerText = data_ag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' / 575,091票';

                // Vote total percent 
                let percent_data_total = parseInt(data_ag / 575091 * 100);
                if (percent_data_total > 100) {
                    document.getElementById('total').innerText = 100 + ' ％';
                } else {
                    document.getElementById('total').innerText = percent_data_total + ' ％';
                }

                $('#total').css('width', percent_data_total + '%');
            }
        });
    }, 3000);
} ajax_gsheet();

// countdown
var second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
var countDown = new Date('Jun 6, 2020 08:00:00').getTime(),
    x = setInterval(function () {
        var now = new Date().getTime(), distance = countDown - now;
        document.getElementById('days').innerText = Math.floor(distance / (day)),
            document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

        var leftDay = document.getElementById('days').innerText;
        var leftHours = document.getElementById('hours').innerText;
        var leftMinutes = document.getElementById('minutes').innerText;
        var leftseconds = document.getElementById('seconds').innerText;

        if (leftDay === '0' && leftHours === '0' && leftMinutes === '0' && leftseconds === '0') {
            var startTxt = document.getElementById('clock');
            startTxt.querySelector("ul").innerText = '開票中！';
            window.clearInterval(x);
        }

    }, second);


$('.goToTop').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
});


// scroll to target
// var anchor = document.querySelector('.bannerBtn')
// var target = document.getElementById('start')
// anchor.addEventListener('click', function (e) {
//     if (window.scrollTo) {
//         e.preventDefault()
//         window.scrollTo({ 'behavior': 'smooth', 'top': target.offsetTop })
//     }
// })

// kaohsiung
$("path").mousemove(function (e) {
    $(".hovertext").text($(this).attr('title'));
    $(".hovertext").css({
        'top': e.pageY + 20,
        'left': e.pageX
    }).fadeIn();
});
$("path").mouseleave(function () {
    $(".hovertext").css('display', 'none')
});

// $('#mapKhs').html(mapObj1.map);
$('#btn1').click(function () {
    $('#btn1').addClass('actived');
    $('#btn2').removeClass('actived');
    $('.mapInfo li:nth-child(1)').text(mapObj1.vote[0]);
    $('.mapInfo li:nth-child(2)').text(mapObj1.vote[1]);
    $('.mapInfo li:nth-child(3)').text(mapObj1.vote[2]);
    $('.mapInfo li:nth-child(4)').text(mapObj1.vote[3]);
    $('#han18').css('display', 'block');
    $('#han20').css('display', 'none');
})

$('#btn2').click(function () {
    $('#btn2').addClass('actived');
    $('#btn1').removeClass('actived');
    $('.mapInfo li:nth-child(1)').text(mapObj2.vote[0]);
    $('.mapInfo li:nth-child(2)').text(mapObj2.vote[1]);
    $('.mapInfo li:nth-child(3)').text(mapObj2.vote[2]);
    $('.mapInfo li:nth-child(4)').text(mapObj2.vote[3]);
    $('#han18').css('display', 'none');
    $('#han20').css('display', 'block')

})

$('#han20').css('display', 'none')
