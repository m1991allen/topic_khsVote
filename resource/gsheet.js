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
            document.getElementById('voteSum').innerText = data_ag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' / 574,996票';

            // Vote total percent 
            let percent_data_total = parseInt(data_ag / 574996 * 100);
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
                document.getElementById('voteSum').innerText = data_ag.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' / 574,996票';

                // Vote total percent 
                let percent_data_total = parseInt(data_ag / 574996 * 100);
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
