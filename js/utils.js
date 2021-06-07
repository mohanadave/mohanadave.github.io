// var url = 'https://civic-bruin-276701.ue.r.appspot.com/';
// var url = 'https://civic-bruin-276701.ue.r.appspot.com/';
var url;
var directoryName;
var LANGID=null;
var TWEET_ID=null;
if (window.location.href.indexOf('localhost') === -1) {
  // url = 'https://hasoc-annotation-backend.el.r.appspot.com/';
  url = 'https://shahbhavyan12-oxlf5aqfea-uc.a.run.app/';
  directoryName = 'https://mohanadave.github.io//';
} else {
  //url = 'http://127.0.0.1:8080/';
  url = 'https://shahbhavyan12-oxlf5aqfea-uc.a.run.app/'
  // url = 'https://hasoc-annotation-backend.el.r.appspot.com/';
  // url = "https://hasoc-backend-mgyikj6s3q-as.a.run.app/";
  // directoryName = '/annotationplatform.github.io/';
  directoryName = 'https://mohanadave.github.io//';
}

function checkLogin() {
  var user = localStorage.getItem('username');
  var role = localStorage.getItem('role');
  var currUrl = window.location.href;
  if (user === null && currUrl.indexOf('index.html') === -1) {
    // localStorage.setItem('not_logged_in','true');
    alert("User not logged in! \n Please login again");
    if (currUrl.indexOf('admin') !== -1) {
      // // console.log('herer 15');
      window.location.href = directoryName + '/index.html';
    }
    window.location.href = directoryName + '/index.html';
  } else {
    if (user != null && currUrl.indexOf('index.html') !== -1) {
      if (role === 'admin') {
        window.location.href = directoryName + 'admin/admin_home.html';
      } else {
        window.location.href = directoryName + 'home.html';
      }
    } else {
      var name = localStorage.getItem('name');
      // // console.log(name);
      $('#nav_username').html(name);
      $('#username').text(name);
    }
  }
}

function makeRequest(url, data = {}, method = "GET", auth_token = '', async=false, async_func) {
  if (async){
    $.ajax({
      url: url,
      data: data,
      dataType: 'json',
      type: method,
      headers: {
        "Authorization": "Basic " + btoa(auth_token + ":" + 'something')
      },
      async: async,
      beforeSend: function (x) {
        if (x && x.overrideMimeType) {
          x.overrideMimeType("application/j-son;charset=UTF-8");
        }
      },
      success: function (resp){
        async_func(resp);
      },
      fail: function (xhr, textStatus, errorThrown) {
        alert('request failed');
      }
    });
  } else{

    var resp = $.ajax({
      url: url,
      data: data,
      dataType: 'json',
      type: method,
      headers: {
        "Authorization": "Basic " + btoa(auth_token + ":" + 'something')
      },
      async: async,
      beforeSend: function (x) {
        if (x && x.overrideMimeType) {
          x.overrideMimeType("application/j-son;charset=UTF-8");
        }
      },
      success: function (resp) {
        // // console.log(resp);
      },
      fail: function (xhr, textStatus, errorThrown) {
        alert('request failed');
      }
    }).responseJSON;
    return resp;
  }

  // console.log('checking response...');
  // console.log(resp);
  // if (!resp) {
  //   alert('Something went wrong! Please login again!');
  //   logout('makeRequest');
  // }
  // if (resp && resp['code'] === 401) {
  //   alert('Unauthorized access to the resource!');
  //   logout('makeRequest');
  // }
  // if (resp && resp['code'] === 403) {
  //   alert(resp['message']);
  //   logout('makeRequest');
  // }

}

function login() {
  var username = $('#username').val();
  var password = $('#password').val();
  var remember = $('#remember').prop('checked');
  // // console.log(remember);
  var endpoint = 'login'
  var data = {
    'username': username,
    'password': password
  };
  var method = 'POST';
  var resp = makeRequest(url + endpoint, data, method);
  // // console.log(resp);
  if (resp['code'] === 200) {
    var result = resp['result'];
    var name = result['name'];
    var auth_token = result['auth_token'];
    var roles = result['user_role'];
    if (remember) {
      localStorage.setItem('remember', remember);
    } else {
    }
    if (roles.includes('admin') && roles.length === 2) {
      localStorage.setItem('role', 'admin');
      localStorage.setItem('username', username);
      localStorage.setItem('name', name);
      localStorage.setItem('auth_token', auth_token);
      window.location.href = 'admin/admin_home.html';
    } else {
      localStorage.setItem('role', 'annotator');
      localStorage.setItem('username', username);
      localStorage.setItem('name', name);
      localStorage.setItem('auth_token', auth_token);
      window.location.href = 'home.html';
    }
  } else {
    alert(resp['message']);
  }
}
function temp(resp){
  var langId=LANGID;
  console.log(resp);
  if (resp['code'] === 200) {
    console.log("herer");
    var result = resp['result'];
    var total_annotated = result['total_annotated'];
    var total_reported = result['total_reported'];
    var total_remaining = result['total_remaining'];
    var agg_total_assigned = total_annotated + total_reported + total_remaining;

    var pbAnnotated = $('#progressbarAnnotated_' + langId);
    var pbReported = $('#progressbarReported_' + langId);
    var pbRemaining = $('#progressbarRemaining_' + langId);
    var percentageCard = $('#percentage_' + langId);
    console.log(pbAnnotated);

    var percentAnnotated = Math.round((total_annotated / agg_total_assigned) * 100) || 0;
    var percentReported = Math.round((total_reported / agg_total_assigned) * 100) || 0;
    var percentageCompleted = percentAnnotated + percentReported;
    var percentRemaining = Math.round((total_remaining / agg_total_assigned) * 100) || 0;

    // // console.log(percentAnnotated, percentReported, percentRemaining);
    // // console.log(total_annotated, total_reported, total_remaining);

    pbAnnotated.css({'width': `${percentAnnotated}%`});
    pbAnnotated.html(`${percentAnnotated}%`);
    pbAnnotated.attr('aria-valuenow', `${percentAnnotated}`);
    pbAnnotated.attr('data-original-title', `Total Annotated: ${total_annotated}`);
    console.log(pbAnnotated);

    pbReported.css({'width': `${percentReported}%`});
    pbReported.html(`${percentReported}%`);
    pbReported.attr('aria-valuenow', `${percentReported}`);
    pbReported.attr('data-original-title', `Total Reported: ${total_reported}`);

    pbRemaining.css({'width': `${percentRemaining}%`});
    pbRemaining.html(`${percentRemaining}%`);
    pbRemaining.attr('aria-valuenow', `${percentRemaining}`);
    pbRemaining.attr('data-original-title', `Total Remaining: ${total_remaining}`);

    percentageCard.html(`${percentageCompleted}%`);
  }
}
function updateProgressBar(langId = null) {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var data = {
    'language': langId
  };
  LANGID=langId;
  var endpoint = 'user/fetch_annotation_count';
  console.log("inside update")
  makeRequest(url + endpoint, data, method, auth_token, true, temp);
  // // console.log(resp);
  // console.log(resp);
  // if (resp['code'] === 200) {
  //   var result = resp['result'];
  //   var total_annotated = result['total_annotated'];
  //   var total_reported = result['total_reported'];
  //   var total_remaining = result['total_remaining'];
  //   var agg_total_assigned = total_annotated + total_reported + total_remaining;
  //
  //   var pbAnnotated = $('#progressbarAnnotated_' + langId);
  //   var pbReported = $('#progressbarReported_' + langId);
  //   var pbRemaining = $('#progressbarRemaining_' + langId);
  //   var percentageCard = $('#percentage_' + langId);
  //
  //   var percentAnnotated = Math.round((total_annotated / agg_total_assigned) * 100) || 0;
  //   var percentReported = Math.round((total_reported / agg_total_assigned) * 100) || 0;
  //   var percentageCompleted = percentAnnotated + percentReported;
  //   var percentRemaining = Math.round((total_remaining / agg_total_assigned) * 100) || 0;
  //
  //   // // console.log(percentAnnotated, percentReported, percentRemaining);
  //   // // console.log(total_annotated, total_reported, total_remaining);

  //
  //   pbAnnotated.css({'width': `${percentAnnotated}%`});
  //   pbAnnotated.html(`${percentAnnotated}%`);
  //   pbAnnotated.attr('aria-valuenow', `${percentAnnotated}`);
  //   pbAnnotated.attr('data-original-title', `Total Annotated: ${total_annotated}`);
  //
  //   pbReported.css({'width': `${percentReported}%`});
  //   pbReported.html(`${percentReported}%`);
  //   pbReported.attr('aria-valuenow', `${percentReported}`);
  //   pbReported.attr('data-original-title', `Total Reported: ${total_reported}`);
  //
  //   pbRemaining.css({'width': `${percentRemaining}%`});
  //   pbRemaining.html(`${percentRemaining}%`);
  //   pbRemaining.attr('aria-valuenow', `${percentRemaining}`);
  //   pbRemaining.attr('data-original-title', `Total Remaining: ${total_remaining}`);
  //
  //   percentageCard.html(`${percentageCompleted}%`);
  // }
}

function makeTransition(tweet_id, langId = null) {
  // console.log('#row_' + langId + '_id_' + tweet_id);
  var row_id = $('#row_' + langId + '_id_' + tweet_id).val();
  // console.log(row_id);
  var row = $('#' + row_id);
  var p = $('#p_' + tweet_id);
  var report_button = $('#report_button_' + tweet_id);
  var annot_table = $('#annot_table_' + tweet_id);
  var annot_table_head = $('#annot_table_head_' + tweet_id);
  var annot_table_row = $('#annot_table_row_' + tweet_id);
  var submit = $('#submit_' + tweet_id);
  var reset = $('#reset_' + tweet_id);
  var task_1 = $('input[name="task_1_' + tweet_id + '"]');
  var task_2 = $('input[name="task_2_' + tweet_id + '"]');
  var td_task_1 = $('#td_task_1_' + tweet_id);
  var td_task_2 = $('#td_task_2_' + tweet_id);
  var td_buttons = $('#td_buttons_' + tweet_id);
  var table = $('#dataTable_' + langId).DataTable();
  var info = table.page.info();
  // // console.log(info.length);
  // // console.log(info);
  // console.log('herer', info.length);
  var dataTableLength = info.length;
  var next_row_no = parseInt(row_id.split('_')[2]) + 1 || parseInt(row_id.split('_')[1]) + 1;
  row.addClass('table-secondary');
  row.addClass('text-white-50');
  p.addClass('bg-secondary');
  p.addClass('text-white-50');
  report_button.prop('disabled', true);
  report_button.addClass('text-white-50');
  annot_table.addClass('table-secondary');
  annot_table_head.addClass('table-secondary');
  annot_table_head.removeClass('table-primary');
  annot_table_row.removeClass('table-secondary');
  task_1.prop('disabled', true);
  task_2.prop('disabled', true);
  submit.prop('disabled', true);
  submit.addClass('text-white-50');
  reset.prop('disabled', true);
  reset.addClass('text-white-50');
  // annot_table.addClass('bg-secondary');
  annot_table.addClass('text-white-50');
  td_task_1.addClass('bg-secondary');
  td_task_1.addClass('text-white-50');
  td_task_2.addClass('bg-secondary');
  td_task_2.addClass('text-white-50');
  td_buttons.addClass('bg-secondary');
  td_buttons.addClass('text-white-50');
  var next_row = null;
  var last_row = false;
  if (next_row_no > info.recordsDisplay) {
    // console.log('last row');
    last_row = true;
  }
  if (last_row) {
    alert('Fetching more data');
    location.reload();
  }

  if ((next_row_no - 1) % dataTableLength === 0) {
    // console.log('last row annotated');
    table.page('next').draw('page');
    next_row = document.getElementById('row_' + langId + '_' + next_row_no);
    // console.log('if row_'+langId+'_' + next_row_no);
    // console.log(next_row_no, next_row);
    next_row.scrollIntoView({behavior: "smooth"});
  } else {
    next_row = document.getElementById('row_' + langId + '_' + next_row_no);
    // console.log('else row_'+langId+'_' + next_row_no);
    // console.log(next_row_no, next_row);
    next_row.scrollIntoView({behavior: "smooth"});
  }
}

function changeAnnotTable(tweet_id) {
  var task_1 = $('input[name="task_1_' + tweet_id + '"]:checked').val();
  var task_2 = $('input[name="task_2_' + tweet_id + '"]');
  if (task_1 === 'NOT') {
    task_2.prop('checked', false);
    task_2.attr('disabled', true);
  } else {
    task_2.attr('disabled', false);
  }
}

function resetForm(tweet_id) {
  var task_1 = $('input[name="task_1_' + tweet_id + '"]');
  var task_2 = $('input[name="task_2_' + tweet_id + '"]');
  task_1.prop('checked', false);
  task_2.prop('checked', false);
  task_2.attr('disabled', false);
  $('#td_task_2_' + tweet_id).removeClass('text-light');

}

// User and Admin dashboard functions
function fetchMoreTweets(langId = null) {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var data = {
    'language': langId
  };
  var endpoint = 'user/fetch_tweets';
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  var result = resp['result'];
  var tweets = result['tweets'];
  var agg_total_assigned = result['agg_total'];
  var total_annotated = result['total_annotated'];
  var total_reported = result['total_reported'];
  var total_remaining = agg_total_assigned - (total_annotated + total_reported);
  // console.log(langId);
  var table = $('#dataTable_' + langId).DataTable({
    "dom": "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
      "<'row'<'col-sm-4'i>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'bottom'ip>",
    "autoWidth": true,
    "aaSorting": [],
    "aoColumns": [
      {"bSearchable": true, "orderable": false, "width": 100},
      {"bSearchable": true, "orderable": false, "width": 100, "className": "td_pos"},
      {"bSearchable": false, "orderable": false, "width": 100}
    ]
  });
  var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
  var tweetIds = [];
  for (var i = 0; i < tweets.length; i++) {
    tweetIds.push(tweets[i]['tweet_id']);
  }
  // console.log(tweetIds.sort(collator.compare));
  for (var i = 0; i < tweets.length; i++) {
    var tweet_id = tweets[i]['tweet_id'];
    var text = tweets[i]['text'];
    // console.log('hello');
    var row_id = i + 1;
    row_id = 'row_' + langId + '_' + row_id;
    // console.log(tweet_id, row_id);
    var col3 = `<div class="table-responsive table-bordered border-primary">
          <table class="table" cellspacing="0" id="annot_table_${tweets[i]['tweet_id']}">
            <thead>
            <tr class="table-primary" id="annot_table_head_${tweets[i]['tweet_id']}">
              <th>Task 1</th>
              <th>Task 2</th>
              <th>Submit</th>
            </tr>
            </thead>
            <tbody>
            <tr id="annot_table_row_${tweets[i]['tweet_id']}">
              <td id="td_task_1_${tweets[i]['tweet_id']}">
              <div class="form-group">
                <input type="hidden" id="row_${langId}_id_${tweet_id}" value="${row_id}">
                <div class="custom-control custom-radio">
                  <input type="radio" name="task_1_${tweets[i]['tweet_id']}" value="NOT" required id="not_${tweets[i]['tweet_id']}" onchange="changeAnnotTable('${tweets[i]['tweet_id']}')" class="custom-control-input">
                  <label class="custom-control-label" for="not_${tweets[i]['tweet_id']}">NOT</label>
                </div>
                <hr class="bg-primary">
                <div class="custom-control custom-radio">
                  <input type="radio" name="task_1_${tweets[i]['tweet_id']}" value="HOF" required id="hof_${tweets[i]['tweet_id']}" onchange="changeAnnotTable('${tweets[i]['tweet_id']}')" class="custom-control-input">
                  <label class="custom-control-label" for="hof_${tweets[i]['tweet_id']}">HOF</label>
                </div>
               </div>
              </td>
              <td id="td_task_2_${tweets[i]['tweet_id']}">
                <div class="custom-control custom-radio">
                  <input type="radio" name="task_2_${tweets[i]['tweet_id']}" value="HATE" required="" id="hate_${tweets[i]['tweet_id']}" onchange="changeAnnotTable('${tweets[i]['tweet_id']}')" class="custom-control-input">
                  <label class="custom-control-label" for="hate_${tweets[i]['tweet_id']}">HATE</label>
                </div>
                <hr class="bg-primary">
                <div class="custom-control custom-radio">
                  <input type="radio" name="task_2_${tweets[i]['tweet_id']}" value="OFFN" required="" id="offn_${tweets[i]['tweet_id']}" onchange="changeAnnotTable('${tweets[i]['tweet_id']}')" class="custom-control-input">
                  <label class="custom-control-label" for="offn_${tweets[i]['tweet_id']}">OFFN</label>
                </div>
                <hr class="bg-primary">
                <div class="custom-control custom-radio">
                  <input type="radio" name="task_2_${tweets[i]['tweet_id']}" value="PRFN" required="" id="prfn_${tweets[i]['tweet_id']}" onchange="changeAnnotTable('${tweets[i]['tweet_id']}')" class="custom-control-input">
                  <label class="custom-control-label" for="prfn_${tweets[i]['tweet_id']}">PRFN</label>
                </div>
              </td>
              <td rowspan="3" id="td_buttons_${tweets[i]['tweet_id']}" align="center">
                <button class="btn btn-outline-success" id="submit_${tweets[i]['tweet_id']}" name="annot"
                        onclick="annotate('${tweets[i]['tweet_id']}', '${langId}')">Submit
                </button>
                <hr class="bg-primary">
                <button class="btn btn-outline-light" id="reset_${tweets[i]['tweet_id']}" name="reset" onclick="resetForm(${tweets[i]['tweet_id']})">&nbsp;Reset&nbsp;
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>`;
    var reportButton = `<small class="btm_left" id="report_${tweets[i]['tweet_id']}"><button id="report_button_${tweets[i]['tweet_id']}" class="btn btn-sm btn-link" onclick="reportTweet('${tweets[i]['tweet_id']}', '${langId}')">Cannot decide? Report here.</button></small>`
    var col2 = `<p id="tweet_${tweets[i]['tweet_id']}">${tweets[i]['text']}</p>${reportButton}`
    table.row.add([
      tweets[i]['tweet_id'],
      col2,
      col3
    ]).node().id = row_id;
    table.draw();
  }
  table.columns.adjust().draw();
  updateProgressBar(langId);

}
// function annotate_success(resp){
//   var langId=LANGID;
//   if (resp['code'] === 200) {
//     updateProgressBar(langId);
//   }
// }
function nothing(){}

function annotate(tweet_id, langId = null) {
  var task_1_val = $('input[name="task_1_' + tweet_id + '"]:checked').val();
  var task_2_val = $('input[name="task_2_' + tweet_id + '"]:checked').val();
  var flag = true;
  LANGID=langId;
  if (!task_1_val) {
    alert('Task 1 annotation required for tweet id: ' + tweet_id);
    flag = false;
    return;
  }
  if (task_1_val === 'HOF' && !task_2_val) {
    alert('Task 2 annotation required for tweet id: ' + tweet_id);
    flag = false;
    return;
  }
  if (task_1_val === 'NOT' && !task_2_val) {
    task_2_val = "NONE";
    flag = true;
  }
  if (flag) {
    // console.log(task_1_val, task_2_val);
    var auth_token = localStorage.getItem('auth_token')
    var endpoint = 'user/annotate';
    var method = 'POST';
    var data = {
      'task_1': task_1_val,
      'task_2': task_2_val,
      'tweet_id': tweet_id
    }
    makeRequest(url + endpoint, data, method, auth_token, true, nothing);
    updateProgressBar(langId);
    makeTransition(tweet_id, langId);
    // console.log(resp);


  }
}

function reportTweet(tweet_id, langId) {
  tweet_id = tweet_id.trim();
  var data = {
    'tweet_id': tweet_id
  };
  var method = 'POST';
  var endpoint = 'user/report';
  var auth_token = localStorage.getItem('auth_token');
  // var resp = makeRequest(url + endpoint, data, method, auth_token);
  // console.log(resp);
  // if (resp['code'] === 200) {
  //   updateProgressBar(langId);
  //   makeTransition(tweet_id, langId);
  // }
  makeRequest(url + endpoint, data, method, auth_token, true, nothing);
  updateProgressBar(langId);
  makeTransition(tweet_id, langId);

}

//User History function

function fetchAnnotatedTweets(requestFrom = 'user', username = null, langId) {
  var auth_token = localStorage.getItem('auth_token');
  var endpoint = 'user/fetch_annotated_tweets';
  var method = 'GET';
  var data = {
    'language': langId
  }
  if (requestFrom === 'admin') {
    data['username'] = username;
    data['requestFrom'] = requestFrom;
  } else {
    data['username'] = username;
    data['requestFrom'] = requestFrom;
  }
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  // console.log(resp);
  var result = resp['result'];
  var tweets = result['annotated_tweets'];
  var table = $('#annotatedTweets_' + langId).DataTable({
    "dom": "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
      "<'row'<'col-sm-4'i>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'bottom'ip>",
    "autoWidth": true,
    "aoColumns": [
      {"bSearchable": true, "width": 100},
      {"bSearchable": true, "width": 100, "className": "td_pos"},
      {"bSearchable": false, "orderable": false, "width": 100},
      {"bSearchable": true, "orderable": true, "width": 100}
    ]
  });
  // var table = $('#annotatedTweets').DataTable();

  for (var i = 0; i < tweets.length; i++) {
    var tweet = tweets[i];
    var tweet_id = tweet['tweet_id'];
    var text = tweet['text'];
    var annotation_info = tweet['annotation'];
    var annotated_at = annotation_info['annotated_at'];
    var task_1 = annotation_info['task_1'];
    var task_2 = annotation_info['task_2'];
    var col_3_not = null;
    var col_3_hof = null;
    var col_3_hate = null;
    var col_3_offn = null;
    var col_3_prfn = null;
    if (task_1 === 'NOT') {
      col_3_not = `<input type="radio" name="task_1_${tweet_id}" value="NOT" id="not_${tweet_id}" class="custom-control-input" checked disabled>`;
      col_3_hof = `<input type="radio" name="task_1_${tweet_id}" value="HOF" id="hof_${tweet_id}" class="custom-control-input" disabled>`;
      col_3_hate = `<input type="radio" name="task_2_${tweet_id}" value="HATE" id="hate_${tweet_id}" class="custom-control-input" disabled>`;
      col_3_offn = `<input type="radio" name="task_2_${tweet_id}" value="OFFN" id="offn_${tweet_id}" class="custom-control-input" disabled>`;
      col_3_prfn = `<input type="radio" name="task_2_${tweet_id}" value="PRFN" id="prfn_${tweet_id}" class="custom-control-input" disabled>`;
    } else if (task_1 === 'HOF' && task_2 === 'HATE') {
      col_3_not = `<input type="radio" name="task_1_${tweet_id}" value="NOT" id="not_${tweet_id}" class="custom-control-input" disabled>`;
      col_3_hof = `<input type="radio" name="task_1_${tweet_id}" value="HOF" id="hof_${tweet_id}" class="custom-control-input" checked disabled>`;
      col_3_hate = `<input type="radio" name="task_2_${tweet_id}" value="HATE" id="hate_${tweet_id}" class="custom-control-input" checked disabled>`;
      col_3_offn = `<input type="radio" name="task_2_${tweet_id}" value="OFFN" id="offn_${tweet_id}" class="custom-control-input" disabled>`;
      col_3_prfn = `<input type="radio" name="task_2_${tweet_id}" value="PRFN" id="prfn_${tweet_id}" class="custom-control-input" disabled>`;
    } else if (task_1 === 'HOF' && task_2 === 'OFFN') {
      col_3_not = `<input type="radio" name="task_1_${tweet_id}" value="NOT" id="not_${tweet_id}" class="custom-control-input" disabled>`;
      col_3_hof = `<input type="radio" name="task_1_${tweet_id}" value="HOF" id="hof_${tweet_id}" class="custom-control-input" checked disabled>`;
      col_3_hate = `<input type="radio" name="task_2_${tweet_id}" value="HATE" id="hate_${tweet_id}" class="custom-control-input" disabled>`;
      col_3_offn = `<input type="radio" name="task_2_${tweet_id}" value="OFFN" id="offn_${tweet_id}" class="custom-control-input" checked disabled>`;
      col_3_prfn = `<input type="radio" name="task_2_${tweet_id}" value="PRFN" id="prfn_${tweet_id}" class="custom-control-input" disabled>`;
    } else if (task_1 === 'HOF' && task_2 === 'PRFN') {
      col_3_not = `<input type="radio" name="task_1_${tweet_id}" value="NOT" id="not_${tweet_id}" class="custom-control-input" disabled>`;
      col_3_hof = `<input type="radio" name="task_1_${tweet_id}" value="HOF" id="hof_${tweet_id}" class="custom-control-input" checked disabled>`;
      col_3_hate = `<input type="radio" name="task_2_${tweet_id}" value="HATE" id="hate_${tweet_id}" class="custom-control-input" disabled>`;
      col_3_offn = `<input type="radio" name="task_2_${tweet_id}" value="OFFN" id="offn_${tweet_id}" class="custom-control-input" disabled>`;
      col_3_prfn = `<input type="radio" name="task_2_${tweet_id}" value="PRFN" id="prfn_${tweet_id}" class="custom-control-input" checked disabled>`;
    }
    var col3 = `<div class="table-responsive">
          <table class="table table-bordered border-primary" cellspacing="0">
            <thead>
            <tr class="table-primary">
              <th>Task 1</th>
              <th>Task 2</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
              <div class="form-group">
                <input type="hidden">
                <div class="custom-control custom-radio">
                  ${col_3_not}
                  <label class="custom-control-label" for="not_${tweets[i]['tweet_id']}">NOT</label>
                </div>
                <hr class="bg-primary">
                <div class="custom-control custom-radio">
                  ${col_3_hof}
                  <label class="custom-control-label" for="hof_${tweets[i]['tweet_id']}">HOF</label>
                </div>
               </div>
              </td>
              <td id="td_task_2_${tweets[i]['tweet_id']}">
                <div class="custom-control custom-radio">
                  ${col_3_hate}
                  <label class="custom-control-label" for="hate_${tweets[i]['tweet_id']}">HATE</label>
                </div>
                <hr class="bg-primary">
                <div class="custom-control custom-radio">
                  ${col_3_offn}
                  <label class="custom-control-label" for="offn_${tweets[i]['tweet_id']}">OFFN</label>
                </div>
                <hr class="bg-primary">
                <div class="custom-control custom-radio">
                  ${col_3_prfn}
                  <label class="custom-control-label" for="prfn_${tweets[i]['tweet_id']}">PRFN</label>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>`;
    var col2 = `<p id="tweet_${tweets[i]['tweet_id']}">${text}</p>`;
    table.row.add([
      tweets[i]['tweet_id'],
      col2,
      col3,
      annotated_at
    ]).draw();
  }
  table.columns.adjust().draw();
  // console.log(resp);
  if (requestFrom === 'admin') {
    $('#table_header').html('Annotation table for ' + username);
    $('#header_nav').html(username);
  }
}

function fetchReportedTweets(langId = null) {
  var auth_token = localStorage.getItem('auth_token');
  var endpoint = 'user/fetch_reported_tweets';
  var method = 'GET';
  var data = {
    'language': langId
  }
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  // console.log(resp);
  var result = resp['result'];
  var tweets = result['reported_tweets'];
  var table = $('#reportedTweets_' + langId).DataTable({
    "dom": "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
      "<'row'<'col-sm-4'i>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'bottom'ip>",
    "autoWidth": true,
    "aoColumns": [
      {"bSearchable": true, "width": 100},
      {"bSearchable": true, "width": 100},
      {"bSearchable": true, "orderable": true, "width": 100}
    ]
  });
  for (var i = 0; i < tweets.length; i++) {
    var tweet = tweets[i];
    var tweet_id = tweet['tweet_id'];
    var text = tweet['text'];
    var reported_at = tweet['reported_at'];
    table.row.add([
      tweet_id,
      text,
      reported_at
    ]).draw();
  }
  table.columns.adjust().draw();
}


// Show scroll to top button
$(document).ready(function () {
  $("#content-wrapper").scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });
});

function logout(callFrom = null) {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var data = {};
  var endpoint = 'logout';
  if (!callFrom) {
    var resp = makeRequest(url + endpoint, data, method, auth_token);
    if (resp && resp['status']){
      alert(resp['message']);
    }
  }
  // alert(resp);
  localStorage.clear();
  if (callFrom) {
    window.location.href = directoryName + 'index.html';
  }
  // console.log(resp);
}

function scrollToTop() {
  var pb_card = document.getElementById('page-heading');
  pb_card.scrollIntoView({behavior: "smooth"});
}
