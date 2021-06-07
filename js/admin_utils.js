function makePieChart(elemId, data, labels, bgcolors, bghovercolors,) {
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
  var ctx = document.getElementById(elemId);
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: bgcolors,
        hoverBackgroundColor: bghovercolors,
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(33,32,32)",
        bodyFontColor: "#eeeeee",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          fontColor: "#ffffff",
        }
      },
      cutoutPercentage: 80,
    },
  });
}

function fetchLanguages() {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var data = {};
  var endpoint = 'user/fetch_user_langs';
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  if (resp && resp['code'] === 200) {
    var result = resp['result'];
    return result['languages'];
  } else {
    return false;
  }
}


function fetchAnnotationOverview() {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var endpoint = 'admin/fetch_annotation_overview';
  var languages = fetchLanguages();
  if (!languages) {
    alert('Something went wrong in fetching languages of admin!');
    return false;
  } else {
    var langId = languages[0];
    var content = ``;
    var tabContent = ``;
    var navTab = $('#langNav');
    var langTabContent = $('#langTabContent');
    var rowsStart = `<div class="tab-pane fade active show pt-3" id="tab_${langId}">`;
    var rowsEnd = `</div>`;
    var data = {
      'language': langId
    };
    var resp = makeRequest(url + endpoint, data, method, auth_token);
    var result = resp['result'];
    var annotation_info = result['annotation_info'];
    content += `
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#tab_${langId}">${langId}</a>
      </li>`;
    // tabContent+=`
    // <div class="tab-pane fade active show pt-3" id="tab_${langId}">
    // `;
    var allRows = rowsStart + '';
    for (var user in annotation_info) {
      if (annotation_info.hasOwnProperty(user)) {
        // // console.log(user);
        // // console.log(user, annotation_info[user]);
        var usr = annotation_info[user];
        var last_active = usr['last_active'];
        var last_active_date = last_active.split('2020')[0] + '2020';
        var last_active_time = last_active.split('2020')[1].split('GMT')[0] + '<small>(GMT+0)</small>';
        // console.log(last_active);
        var eachRow = null;

        var task_1 = null;
        var task_1_labels = null;

        var task_2 = null;
        var task_2_labels = null;

        var header = `
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-info"><i class="fas fa-chart-pie"></i> ${user}'s annotation chart for ${langId}</h6>
        </div>
      `;

        if (!usr['started_annotation']) {
          eachRow = `
         <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4 border-primary">
              <!-- Card Header - Dropdown -->
              ${header}
              <!-- Card Body -->
              <div class="card-body">
                <p class="bg-primary shadow rounded pl-1 mb-0">${user} has not started annotation yet!</p>
              </div>
              <div class="card-footer small text-light">
                <p class="mb-0">
                  Annotations not yet started by ${user}!
                </p>
              </div>
            </div>
          </div>
        </div>`;
        } else if (!usr['active']) {
          eachRow = `
         <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4 border-primary">
              <!-- Card Header - Dropdown -->
              ${header}
              <!-- Card Body -->
              <div class="card-body">
                <p class="bg-danger shadow rounded pl-1  mb-0">${user} temporarily deactivated!</p>
              </div>
              <div class="card-footer small text-light">
                <p class="mb-0">
                  ${user} not active!
                </p>
              </div>
            </div>
          </div>
        </div>`;
        } else {
          task_1 = Object.values(usr['task_1']);
          task_1_labels = Object.keys(usr['task_1']);

          task_2 = Object.values(usr['task_2']);
          task_2_labels = Object.keys(usr['task_2']);

          eachRow = `        
        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4 border-primary">
              <!-- Card Header - Dropdown -->
              ${header}
              <!-- Card Body -->
              <div class="card-body">
                <div class="row">
                  <div class="col-xl-6 col-lg-6">
                    <div class="card shadow mb-4 border-primary ">
                      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-info">Task 1</h6>
                      </div>
                      <div class="card-body">
                        <div class="chart-pie pt-4 pb-2">
                          <canvas id="${user}_task_1_${langId}"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6">
                    <div class="card shadow mb-4  border-primary">
                      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-info">Task 2</h6>
                      </div>
                      <div class="card-body">
                        <div class="chart-pie pt-4 pb-2">
                          <canvas id="${user}_task_2_${langId}"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer small text-light">
                <h6>
                  <a href="${directoryName}admin/admin_annotated_tweets_table.html?username=${user}">
                    Click Here
                  </a>
                  for detailed view of <b>${user}'s</b> annotation.
                </h6>
                <p class="mb-0">
                  Last annotated on ${last_active_date}
                  at ${last_active_time}
                </p>
              </div>
            </div>
          </div>
        </div>`;
        }
        allRows += eachRow;
        // containerFluid.append(eachRow);
      }
    }
    allRows += rowsEnd;
    for (var i = 1; i < languages.length; i++) {
      langId = languages[i];
      rowsStart = `<div class="tab-pane fade pt-3" id="tab_${langId}">`;
      var data = {
        'language': langId
      };
      var resp = makeRequest(url + endpoint, data, method, auth_token);
      var result = resp['result'];
      var annotation_info = result['annotation_info'];
      content += `
      <li class="nav-item">
        <a class="nav-link " data-toggle="tab" href="#tab_${langId}">${langId}</a>
      </li>`;
      // tabContent+=`
      // <div class="tab-pane fade active show pt-3" id="tab_${langId}">
      // `;
      allRows += rowsStart;
      for (var user in annotation_info) {
        if (annotation_info.hasOwnProperty(user)) {
          // // console.log(user);
          // // console.log(user, annotation_info[user]);
          var usr = annotation_info[user];
          var last_active = usr['last_active'];
          var last_active_date = last_active.split('2020')[0] + '2020';
          var last_active_time = last_active.split('2020')[1].split('GMT')[0] + '<small>(GMT+0)</small>';
          // console.log(last_active);
          var eachRow = null;

          var task_1 = null;
          var task_1_labels = null;

          var task_2 = null;
          var task_2_labels = null;

          var header = `
        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 class="m-0 font-weight-bold text-info"><i class="fas fa-chart-pie"></i> ${user}'s annotation chart for ${langId}</h6>
        </div>
      `;

          if (!usr['started_annotation']) {
            eachRow = `
         <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4 border-primary">
              <!-- Card Header - Dropdown -->
              ${header}
              <!-- Card Body -->
              <div class="card-body">
                <p class="bg-primary shadow rounded pl-1 mb-0">${user} has not started annotation yet!</p>
              </div>
              <div class="card-footer small text-light">
                <p class="mb-0">
                  Annotations not yet started by ${user}!
                </p>
              </div>
            </div>
          </div>
        </div>`;
          } else if (!usr['active']) {
            eachRow = `
         <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4 border-primary">
              <!-- Card Header - Dropdown -->
              ${header}
              <!-- Card Body -->
              <div class="card-body">
                <p class="bg-danger shadow rounded pl-1  mb-0">${user} temporarily deactivated!</p>
              </div>
              <div class="card-footer small text-light">
                <p class="mb-0">
                  ${user} not active!
                </p>
              </div>
            </div>
          </div>
        </div>`;
          } else {
            task_1 = Object.values(usr['task_1']);
            task_1_labels = Object.keys(usr['task_1']);

            task_2 = Object.values(usr['task_2']);
            task_2_labels = Object.keys(usr['task_2']);

            eachRow = `
        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="card shadow mb-4 border-primary">
              <!-- Card Header - Dropdown -->
              ${header}
              <!-- Card Body -->
              <div class="card-body">
                <div class="row">
                  <div class="col-xl-6 col-lg-6">
                    <div class="card shadow mb-4 border-primary ">
                      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-info">Task 1</h6>
                      </div>
                      <div class="card-body">
                        <div class="chart-pie pt-4 pb-2">
                          <canvas id="${user}_task_1_${langId}"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6">
                    <div class="card shadow mb-4  border-primary">
                      <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-info">Task 2</h6>
                      </div>
                      <div class="card-body">
                        <div class="chart-pie pt-4 pb-2">
                          <canvas id="${user}_task_2_${langId}"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer small text-light">
                <h6>
                  <a href="${directoryName}admin/admin_annotated_tweets_table.html?username=${user}">
                    Click Here
                  </a>
                  for detailed view of <b>${user}'s</b> annotation.
                </h6>
                <p class="mb-0">
                  Last annotated on ${last_active_date}
                  at ${last_active_time}
                </p>
              </div>
            </div>
          </div>
        </div>`;
          }
          allRows += eachRow;
        }
      }
      allRows += rowsEnd;
    }
    navTab.html(content);
    langTabContent.html(allRows);
    for (var i = 0; i < languages.length; i++) {
      langId = languages[i];
      var data = {
        'language': langId
      };
      var resp = makeRequest(url + endpoint, data, method, auth_token);
      var result = resp['result'];
      var annotation_info = result['annotation_info'];
      for (var user in annotation_info) {
        var usr = annotation_info[user];
        // console.log(`${user}_task_1_${langId}`);
        task_1 = Object.values(usr['task_1']);
        task_1_labels = Object.keys(usr['task_1']);
        // console.log(task_1, task_1_labels);
        task_2 = Object.values(usr['task_2']);
        task_2_labels = Object.keys(usr['task_2']);
        // console.log(task_2, task_2_labels);
        if (usr['active'] && usr['started_annotation']) {
          var bg_colors_task_1 = ['#e74c3c', '#00bc8c'];
          var bg_hover_colors_task_1 = ['#d62c1a', '#008966'];
          makePieChart(`${user}_task_1_${langId}`, task_1, task_1_labels, bg_colors_task_1, bg_hover_colors_task_1);

          var bg_colors_task_2 = ['#3498DB', '#adb5bd', '#e74c3c', '#F39C12'];
          var bg_hover_colors_task_2 = ['#217dbb', '#919ca6', '#d62c1a', '#c87f0a'];
          makePieChart(`${user}_task_2_${langId}`, task_2, task_2_labels, bg_colors_task_2, bg_hover_colors_task_2);
        }
      }
    }
  }
  // for (var user in annotation_info) {
  //   if (annotation_info.hasOwnProperty(user)) {
  //     // // console.log(user);
  //     // // console.log(user, annotation_info[user]);
  //     var usr = annotation_info[user];
  //     var last_active = usr['last_active'];
  //     var last_active_date = last_active.split('2020')[0] + '2020';
  //     var last_active_time = last_active.split('2020')[1].split('GMT')[0] + '<small>(GMT+0)</small>';
  //     // console.log(last_active);
  //     var eachRow = null;
  //
  //     var task_1 = null;
  //     var task_1_labels = null;
  //
  //     var task_2 = null;
  //     var task_2_labels = null;
  //
  //     var header = `
  //       <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
  //         <h6 class="m-0 font-weight-bold text-info"><i class="fas fa-chart-pie"></i> ${user}'s annotation chart</h6>
  //       </div>
  //     `;
  //
  //     if (!usr['started_annotation']) {
  //       eachRow = `
  //        <div class="row">
  //         <div class="col-xl-12 col-lg-12">
  //           <div class="card shadow mb-4 border-primary">
  //             <!-- Card Header - Dropdown -->
  //             ${header}
  //             <!-- Card Body -->
  //             <div class="card-body">
  //               <p class="bg-primary shadow rounded pl-1 mb-0">${user} has not started annotation yet!</p>
  //             </div>
  //             <div class="card-footer small text-light">
  //               <p class="mb-0">
  //                 Annotations not yet started by ${user}!
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>`;
  //     } else if (!usr['active']) {
  //       eachRow = `
  //        <div class="row">
  //         <div class="col-xl-12 col-lg-12">
  //           <div class="card shadow mb-4 border-primary">
  //             <!-- Card Header - Dropdown -->
  //             ${header}
  //             <!-- Card Body -->
  //             <div class="card-body">
  //               <p class="bg-danger shadow rounded pl-1  mb-0">${user} temporarily deactivated!</p>
  //             </div>
  //             <div class="card-footer small text-light">
  //               <p class="mb-0">
  //                 ${user} not active!
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>`;
  //     } else {
  //       task_1 = Object.values(usr['task_1']);
  //       task_1_labels = Object.keys(usr['task_1']);
  //
  //       task_2 = Object.values(usr['task_2']);
  //       task_2_labels = Object.keys(usr['task_2']);
  //
  //       eachRow = `
  //       <div class="row">
  //         <div class="col-xl-12 col-lg-12">
  //           <div class="card shadow mb-4 border-primary">
  //             <!-- Card Header - Dropdown -->
  //             ${header}
  //             <!-- Card Body -->
  //             <div class="card-body">
  //               <div class="row">
  //                 <div class="col-xl-6 col-lg-6">
  //                   <div class="card shadow mb-4 border-primary ">
  //                     <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
  //                       <h6 class="m-0 font-weight-bold text-info">Task 1</h6>
  //                     </div>
  //                     <div class="card-body">
  //                       <div class="chart-pie pt-4 pb-2">
  //                         <canvas id="${user}_task_1"></canvas>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <div class="col-xl-6 col-lg-6">
  //                   <div class="card shadow mb-4  border-primary">
  //                     <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
  //                       <h6 class="m-0 font-weight-bold text-info">Task 2</h6>
  //                     </div>
  //                     <div class="card-body">
  //                       <div class="chart-pie pt-4 pb-2">
  //                         <canvas id="${user}_task_2"></canvas>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //             <div class="card-footer small text-light">
  //               <h6>
  //                 <a href="${directoryName}/admin/admin_annotated_tweets_table.html?username=${user}">
  //                   Click Here
  //                 </a>
  //                 for detailed view of <b>${user}'s</b> annotation.
  //               </h6>
  //               <p class="mb-0">
  //                 Last annotated on ${last_active_date}
  //                 at ${last_active_time}
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>`;
  //     }
  //     containerFluid.append(eachRow);
  //     if (usr['active'] && usr['started_annotation']) {
  //       var bg_colors_task_1 = ['#e74c3c', '#00bc8c'];
  //       var bg_hover_colors_task_1 = ['#d62c1a', '#008966'];
  //       makePieChart(`${user}_task_1`, task_1, task_1_labels, bg_colors_task_1, bg_hover_colors_task_1);
  //
  //       var bg_colors_task_2 = ['#3498DB', '#adb5bd', '#e74c3c', '#F39C12'];
  //       var bg_hover_colors_task_2 = ['#217dbb', '#919ca6', '#d62c1a', '#c87f0a'];
  //       makePieChart(`${user}_task_2`, task_2, task_2_labels, bg_colors_task_2, bg_hover_colors_task_2);
  //     }
  //   }
  // }
}

function fetchAllAnnotatedTweets(langId) {
  var auth_token = localStorage.getItem('auth_token');
  var endpoint = 'admin/fetch_all_annotated_tweets';
  var method = 'GET';
  var data = {
    'language': langId
  }
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  var table = $('#allAnnotatedTweets_' + langId).DataTable({
    "dom": "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
      "<'row'<'col-sm-4'i>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'bottom'ip>",
    "autoWidth": true,
    // select: true,
    "aoColumns": [
      {"bSearchable": true, 'width': 100},
      {"bSearchable": true, "width": 100},
      {"bSearchable": true, "orderable": false, "width": 100},
    ]
  });
  // console.log(resp);
  if (resp['code'] === 200) {
    var result = resp['result'];
    var tweets = result['tweets'];
    for (var i = 0; i < tweets.length; i++) {
      var tweet = tweets[i];
      var tweet_id = tweet['tweet_id'];
      var text = tweet['text'];
      // var text = 'Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user\'s experience. For more help, checkSynchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user\'s experience. For more help, check';
      var judgements = tweet['judgement'];
      var conflict = tweet['conflict'];
      var col3 = ``;
      var bg_border = null;
      if (conflict) {
        bg_border = 'warning';
      } else {
        bg_border = 'success';
      }
      col3 += `<div hidden="true">conflict=${conflict}</div><div class="table-responsive table-bordered border-${bg_border}">
                    <table class="table" width="100%"
                    cellspacing="0">
                      <thead>
                        <tr class="table-${bg_border}">
                          <th>User</th>
                          <th>Task 1</th>
                          <th>Task 2</th>
                        </tr>
                      </thead>
                      <tbody>`;
      // console.log(judgements);
      var all_task_1 = new Set();
      var all_task_2 = new Set();

      var task_1_color = '';
      var task_2_color = '';
      for (var j = 0; j < judgements.length; j++) {
        all_task_1.add(judgements[j]['task_1']);
        all_task_2.add(judgements[j]['task_2']);
      }
      if (all_task_1.size > 1) {
        task_1_color = 'text-warning';
      }
      if (all_task_2.size > 1) {
        task_2_color = 'text-warning';
      }
      for (var k = 0; k < judgements.length; k++) {
        var judgement = judgements[k];
        var annotator = judgement['annotator'];
        var task_1 = judgement['task_1'];
        var task_2 = judgement['task_2'];
        // console.log(annotator);
        col3 += `
        <tr>
          <td>
          <b>${annotator}<b>
          </td>
          <td class="${task_1_color}">
          ${task_1}
          </td>
          <td class="${task_2_color}">
          ${task_2}
          </td>
        </tr>
        `;
      }
      col3 += `</tbody>
            </table>
          </div>`;
      var annotation_count = tweet['total_annotation'];
      var assigned_count = tweet['total_assigned'];

      var row = table.row.add([
        tweet_id,
        text,
        col3
      ]).draw().node();
    }
    table.columns.adjust().draw();
    // $('select[name=allAnnotatedTweets_length]').addClass('bg-dark');
    // $('select[name=allAnnotatedTweets_length]').attr('style','color:white;');
  }
}

function filterAllTweetsTable(conflict = "", langId = null) {
  var table = $('#allAnnotatedTweets_' + langId).DataTable();
  if (conflict.length > 0) {
    table.search(`conflict=${conflict}`);
  } else {
    table.search(``);
  }
  table.draw();
}

function fetchReportedTweetsAdmin(langId = null) {
  var auth_token = localStorage.getItem('auth_token');
  var endpoint = 'admin/fetch_reported_tweets';
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
      {"bSearchable": true, "orderable": false, "width": 100},
      {"bSearchable": true, "orderable": false, "width": 100}
    ]
  });
  // var table = $('#reportedTweets').DataTable();
  for (var i = 0; i < tweets.length; i++) {
    var tweet = tweets[i];
    var tweet_id = tweet['tweet_id'];
    // var text = 'Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user\'s experience. For more help, checkSynchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user\'s experience. For more help, check';
    var text = tweet['text'];
    var report = tweet['report']
    var col3 = `<div class="table-responsive align-items-center">
          <table class="table table-bordered table-striped border-primary"
                 cellspacing="0">
            <thead>
            <tr class="table-primary align-items-center">
              <th>
                User
              </th>
              <th>
                Reported at
              </th>`;
    for (var user in report) {
      if (report.hasOwnProperty(user)) {
        var colspan = 'colspan='
        col3 += `<tr>
                  <td class="align-items-center">
                    ${user}
                  </td>
                  <td class="align-items-center">
                    <small><small>${report[user]}</small></small>
                  </td>
                </tr>`;
      }
    }
    col3 += `</tr>
            </thead>
          </table>
        </div>`;
    table.row.add([
      tweet_id,
      text,
      col3
    ]).draw();
  }
  table.columns.adjust().draw();
}

function fetchStatistics(langId = null) {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var data = {
    'language': langId
  };
  var endpoint = 'admin/fetch_statistics';
  var resp = makeRequest(url + endpoint, data, method, auth_token);

  if (resp['code'] === 200) {
    var result = resp['result'];
    var statistics = result['statistics'];
    var singleAnnots = statistics['single_annotated'];
    var doubleOrMore = statistics['double_or_more'];
    var agreement = statistics['agreement'];
    var totalAnnots = singleAnnots + doubleOrMore;
    var task1Agreement = agreement['task_1'];
    var task2Agreement = agreement['task_2'];
    var totalTweets = statistics['all_tweets'];

    var totalRemaining = totalTweets - totalAnnots;
    // console.log(totalTweets);
    // console.log('remaining', totalRemaining);
    $('#totalAnnotation_' + langId).html(totalAnnots);
    $('#totalSingleAnnotation_' + langId).html(singleAnnots);
    $('#totalDoubleAnnotation_' + langId).html(doubleOrMore);
    $('#totalRemaining_' + langId).html(totalRemaining);

    var aggTask1 = $('#aggTask1_' + langId)
    var aggTask2 = $('#aggTask2_' + langId)
    aggTask1.html(task1Agreement + '%');
    aggTask2.html(task2Agreement + '%');
    if (task1Agreement < 70) {
      aggTask1.addClass('text-danger');
    } else {
      aggTask1.addClass('text-success');
    }
    if (task2Agreement < 70) {
      aggTask2.addClass('text-danger');
    } else {
      aggTask2.addClass('text-success');
    }
  }
}

function fetchUsers() {
  var auth_token = localStorage.getItem('auth_token');
  var endpoint = 'admin/fetch_users';
  var method = 'GET';
  var data = {}
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  // console.log(resp);
  var result = resp['result'];
  var users = result['users'];
  var table = $('#userTable').DataTable({
    "dom": "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
      "<'row'<'col-sm-4'i>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'bottom'ip>",
    "autoWidth": true,
    'select': 'multi',
    buttons: [
      'selectAll',
      'selectNone'
    ], language: {
      buttons: {
        selectAll: "Select all items",
        selectNone: "Select none"
      }
    },
    "aoColumns": [
      {"bSearchable": true, "width": 100},
      {"bSearchable": true, "orderable": false, "width": 100},
      {"bSearchable": true, "orderable": false, "width": 100},
      {"bSearchable": false, "orderable": false, "width": 10}
    ]
  });
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var username = user['username'];
    var col0 = `<input class="form-control check" type="checkbox" id="box_${username}">`
    var totalAssigned = user['total_assigned'];
    var totalAnnotated = user['total_annotated'];
    table.row.add([
      username,
      totalAssigned,
      totalAnnotated,
      col0
    ]).draw();
  }
  table.columns.adjust().draw();
}

function fetchTweetStatistics(langId = null) {
  var auth_token = localStorage.getItem('auth_token');
  var endpoint = 'admin/fetch_statistics';
  var method = 'GET';
  var data = {
    'language': langId
  }
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  // console.log(resp);
  if (resp['code'] === 200) {
    var result = resp['result'];
    var statistics = result['statistics'];
    var singleAnnots = statistics['single_annotated'];
    var doubleOrMore = statistics['double_or_more'];
    var reportedCount = statistics['reported_count'];
    var totalTweets = statistics['all_tweets'];

    // console.log(totalTweets);

    var pbSingle = $('#progressbarSingleAnnotated_' + langId);
    var pbSingleRemaining = $('#progressbarSingleRemaining_' + langId);
    var percentSingle = Math.round((singleAnnots / totalTweets) * 100) || 0;
    var percentSingleRemaining = Math.round(((totalTweets - singleAnnots) / totalTweets) * 100) || 0;
    pbSingle.css({'width': `${percentSingle}%`});
    pbSingle.html(`${percentSingle}%`);
    pbSingle.attr('aria-valuenow', `${percentSingle}`);
    pbSingle.attr('data-original-title', `Total Single Annotated: ${singleAnnots}`);
    pbSingleRemaining.css({'width': `${percentSingleRemaining}%`});
    pbSingleRemaining.html(`${percentSingleRemaining}%`);
    pbSingleRemaining.attr('aria-valuenow', `${percentSingleRemaining}`);
    pbSingleRemaining.attr('data-original-title', `Total remaining: ${totalTweets - singleAnnots}`);
    $('#singlePercentage_' + langId).text(`${percentSingle}%`);

    // console.log(singleAnnots, totalTweets - singleAnnots, totalTweets, percentSingle, percentSingleRemaining);

    var pbDouble = $('#progressbarDoubleAnnotated_' + langId);
    var pbDoubleRemaining = $('#progressbarDoubleRemaining_' + langId);
    var percentDouble = Math.round((doubleOrMore / totalTweets) * 100) || 0;
    var percentDoubleRemaining = Math.round(((totalTweets - doubleOrMore) / totalTweets) * 100) || 0;
    pbDouble.css({'width': `${percentDouble}%`});
    pbDouble.html(`${percentDouble}%`);
    pbDouble.attr('aria-valuenow', `${percentDouble}`);
    pbDouble.attr('data-original-title', `Total double or more Annotated: ${doubleOrMore}`);
    pbDoubleRemaining.css({'width': `${percentDoubleRemaining}%`});
    pbDoubleRemaining.html(`${percentDoubleRemaining}%`);
    pbDoubleRemaining.attr('aria-valuenow', `${percentDoubleRemaining}`);
    pbDoubleRemaining.attr('data-original-title', `Total remaining: ${totalTweets - doubleOrMore}`);
    $('#doublePercentage_' + langId).text(`${percentDouble}%`);

    var pbReported = $('#progressbarReported_' + langId);
    var pbReportedRemaining = $('#progressbarReportedRemaining_' + langId);
    var percentReported = Math.round((reportedCount / totalTweets) * 100) || 0;
    var percentReportedRemaining = Math.round(((totalTweets - reportedCount) / totalTweets) * 100) || 0;
    pbReported.css({'width': `${percentReported}%`});
    pbReported.html(`${percentReported}%`);
    pbReported.attr('aria-valuenow', `${percentReported}`);
    pbReported.attr('data-original-title', `Total Reported: ${reportedCount}`);
    pbReportedRemaining.css({'width': `${percentReportedRemaining}%`});
    pbReportedRemaining.html(`${percentReportedRemaining}%`);
    pbReportedRemaining.attr('aria-valuenow', `${percentReportedRemaining}`);
    pbReportedRemaining.attr('data-original-title', `Total remaining: ${totalTweets - reportedCount}`);
    $('#reportedPercentage_' + langId).text(`${percentReported}%`);
  }

}

//   // });
// }

// var users = []

function toogleButtonAttr(buttonId, disable = true, cls) {
  var button = $('#' + buttonId);
  if (!disable) {
    button.removeAttr('disabled');
    button.removeClass('btn-outline-' + cls);
    button.addClass('btn-' + cls);
  } else {
    button.attr('disabled', 'true');
    button.removeClass('btn-' + cls);
    button.addClass('btn-outline-' + cls);
  }
}


$(document).ready(function () {
  var table = $('#userTable').DataTable();
  var username;
  toogleButtonAttr('addUser', false, 'success');
  table.on('select', function (e, dt, type, indexes) {
    if (type === 'row') {
      // console.log(indexes);
      username = table.rows(indexes).data()[0][0];
      $('#box_' + username).prop('checked', true);
      toogleButtonAttr('addMoreTweets', false, 'info');
      toogleButtonAttr('removeTweets', false, 'warning');
      toogleButtonAttr('deactivate', false, 'danger');
      toogleButtonAttr('reactivate', false, 'success');
      // do something with the ID of the selected items
    }
  }).on('deselect', function (e, dt, type, indexes) {
    if (type === 'row') {
      username = table.rows(indexes).data()[0][0];
      $('#box_' + username).prop('checked', false);
      $('#checkAll').prop('checked', false);
      // addMoreTweets.attr('disabled', 'true');
      // addMoreTweets.removeClass('btn-info');
      // addMoreTweets.addClass('btn-outline-info');
      var numSelected = table.rows({selected: true}).count();
      if (numSelected == 0) {
        toogleButtonAttr('addMoreTweets', true, 'info');
        toogleButtonAttr('removeTweets', true, 'warning');
        toogleButtonAttr('deactivate', true, 'danger');
        toogleButtonAttr('reactivate', true, 'success');
      } else {

      }
    }
  });
});

function checkAll() {
  var status = $('#checkAll').is(':checked');
  // console.log(status);
  $('input:checkbox').prop('checked', status);
  var table = $('#userTable').DataTable();
  if (status) {
    table.rows().select('.odd');
  } else {
    table.rows().deselect('.odd');
  }
}

async function addTweetsUser() {
  // console.log('620 add tweets');
  var numAddTweets = parseInt($('#numAddTweets').val()) || null;
  // console.log(typeof (numAddTweets));
  if (numAddTweets != null) {
    var usernames = []
    var auth_token = localStorage.getItem('auth_token');
    var method = 'POST';
    var data = null;
    var endpoint = 'admin/add_more_tweets';
    $("input:checkbox[name=addTweets]:checked").each(function () {
      usernames.push($(this).val());
    });
    // console.log(usernames);
    for (var i = 0; i < usernames.length; i++) {
      var username = usernames[i];
      var languages = [];

      var checkLabel = $('#addTweetsCheck_' + username);
      var labelHtml = '';
      $(`input:checkbox[name=addTweets_${username}_check_languages]:checked`).each(function () {
        languages.push($(this).val());
      });
      for (var j = 0; j < languages.length; j++) {
        var language = languages[j];
        data = {
          'username': username,
          'count': numAddTweets,
          'language': language
        }
        // console.log(language);
        var loadingAnimation = $('#addTweetsLabelLoading_' + username + '_' + language);
        loadingAnimation.show();
        await new Promise(r => setTimeout(r, 500));
        var resp = makeRequest(url + endpoint, data, method, auth_token);
        var checkLabelTick = $('#addTweetsLabelTick_' + username + '_' + language);
        var checkLabelCross = $('#addTweetsLabelCross_' + username + '_' + language);
        if (resp['status']) {
          checkLabel.addClass('is-valid');
          checkLabelCross.hide();
          labelHtml = `<i class="far fa-check-circle"></i>`;
          checkLabelTick.html(labelHtml + `&nbsp; ${resp['message']}`);
          checkLabelTick.slideDown("slow");
          loadingAnimation.hide();
          // console.log(resp['message']);
        } else {
          checkLabel.addClass('is-invalid');
          checkLabelTick.hide();
          labelHtml = `<i class="far fa-times-circle"></i>`;
          checkLabelCross.html(labelHtml + `&nbsp; ${resp['message']}`);
          checkLabelCross.slideDown();
          loadingAnimation.hide();
          // console.log(resp['message']);
        }
      }
    }
  } else {

  }
  window.location.reload();
}

async function removeTweetsUser() {
  var numRemoveTweets = parseInt($('#numRemoveTweets').val()) || null;
  // console.log(typeof (numRemoveTweets));
  if (numRemoveTweets != null) {
    var usernames = []
    var auth_token = localStorage.getItem('auth_token');
    var method = 'POST';
    var data = null;
    var endpoint = 'admin/remove_tweets';
    $("input:checkbox[name=removeTweets]:checked").each(function () {
      usernames.push($(this).val());
    });
    // console.log(usernames);
    for (var i = 0; i < usernames.length; i++) {
      var username = usernames[i];
      var languages = [];

      var checkLabel = $('#removeTweetsCheck_' + username);
      var labelHtml = '';
      $(`input:checkbox[name=removeTweets_${username}_check_languages]:checked`).each(function () {
        languages.push($(this).val());
      });
      for (var j = 0; j < languages.length; j++) {
        var language = languages[j];
        data = {
          'username': username,
          'count': numRemoveTweets,
          'language': language
        }
        // console.log(language);
        var loadingAnimation = $('#removeTweetsLabelLoading_' + username + '_' + language);
        loadingAnimation.show();
        await new Promise(r => setTimeout(r, 500));
        var resp = makeRequest(url + endpoint, data, method, auth_token);
        var checkLabelTick = $('#removeTweetsLabelTick_' + username + '_' + language);
        var checkLabelCross = $('#removeTweetsLabelCross_' + username + '_' + language);
        if (resp['status']) {
          checkLabel.addClass('is-valid');
          checkLabelCross.hide();
          labelHtml = `<i class="far fa-check-circle"></i>`;
          checkLabelTick.html(labelHtml + `&nbsp; ${resp['message']}`);
          checkLabelTick.slideDown();
          loadingAnimation.hide();
          // console.log(resp['message']);
        } else {
          checkLabel.addClass('is-invalid');
          checkLabelTick.hide();
          labelHtml = `<i class="far fa-times-circle"></i>`;
          checkLabelCross.html(labelHtml + `&nbsp; ${resp['message']}`);
          checkLabelCross.slideDown();
          loadingAnimation.hide();
          // console.log(resp['message']);
        }
      }
    }
  } else {

  }
  window.location.reload();
}

// function checkValidity(eleId){
//   var element=$('#'+eleId);
//   var data=element.val();
//   console.log(720);
//   console.log(data);
//   if (data.length===0){
//     $('#'+eleId+'Feedback').slideDown();
//     element.removeClass('is-valid');
//     element.addClass('is-invalid');
//   } else{
//     $('#'+eleId+'Feedback').hide();
//     element.removeClass('is-invalid');
//     element.addClass('is-valid');
//   }
// }

function addUserAdmin() {
  var name_ele = $('#addUserName');
  var username_ele = $('#addUserUsername');
  var password_ele = $('#addUserPassword');

  var name = name_ele.val();
  var username = username_ele.val();
  var password = password_ele.val();
  var checkBoxesChecked = $("input:checkbox[name=addUser]:checked");

  var validated = false;

  if (name.length === 0) {
    $('#addUserNameFeedback').slideDown();
    name_ele.removeClass('is-valid');
    name_ele.addClass('is-invalid');
    validated = false;
  } else {
    $('#addUserNameFeedback').hide();
    name_ele.removeClass('is-invalid');
    name_ele.addClass('is-valid');
    validated = true;
  }

  if (username.length === 0) {
    $('#addUserUsernameFeedback').slideDown();
    username_ele.removeClass('is-valid');
    username_ele.addClass('is-invalid');
    validated = false;
  } else {
    $('#addUserUsernameFeedback').hide();
    username_ele.removeClass('is-invalid');
    username_ele.addClass('is-valid');
    validated = true;
  }

  if (password.length === 0) {
    $('#addUserPasswordFeedback').slideDown();
    password_ele.removeClass('is-valid');
    password_ele.addClass('is-invalid');
    validated = false;
  } else {
    $('#addUserPasswordFeedback').hide();
    password_ele.removeClass('is-invalid');
    password_ele.addClass('is-valid');
    validated = true;
  }
  if (validated) {
    var langs = [];
    checkBoxesChecked.each(function () {
      langs.push($(this).val());
    });
    console.log(langs);
    var auth_token = localStorage.getItem('auth_token');
    var method = 'POST';
    var data = {
      'name': name,
      'username': username,
      'password': password,
      'languages': JSON.stringify(langs)
    };
    var endpoint = 'admin/add_user';
    var resp = makeRequest(url + endpoint, data, method, auth_token);
    if (resp['status']) {
      alert(resp['message']);
      location.reload();
    } else {
      alert(resp['message']);
    }

  } else {
    // console.log('invalid');
  }
  window.location.reload();
}

function checkAtleastOne(name, end = 'user', successMessage = 'Add Tweet') {
  // var usernames=[]
  // console.log(718);
  var checkBoxes = $("input:checkbox[name=" + name + "]");
  var checkBoxesChecked = $("input:checkbox[name=" + name + "]:checked");
  var checked = checkBoxesChecked.length;
  // console.log(checked);
  checkBoxes.each(function () {
    $(this).removeClass('is-valid');
  });
  var button = $(`#${name}Submit`);
  var buttonSpan = $(`#${name}SubmitSpan`);
  if (checked === 0) {
    button.attr('disabled', true);
    buttonSpan.attr('data-original-title', `Please select at least one ` + end);

  } else {
    button.removeAttr('disabled');
    buttonSpan.attr('data-original-title', successMessage);
  }
}

async function fileUpload(langId) {
  var form = new FormData();
  var fileInput = document.getElementById("file_upload_" + langId);
  var uploadBtn = $("#upload_" + langId);
  var filename = fileInput.files[0].name;
  if (!filename.endsWith(".csv")) {
    alert("invalid file type");
    return false;
  }
  form.append("fileName", fileInput.files[0], filename);
  form.append("language", langId);
  if(confirm(`Are you sure ${filename} contains all ${langId} tweets?`)){
    // console.log(fileInput.files.length,);
    uploadBtn.html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>Uploading file...');
    await new Promise(r => setTimeout(r, 500));

    var auth_token = localStorage.getItem('auth_token');
    var settings = {
      "url": "http://127.0.0.1:8080/admin/upload_more_tweets",
      "method": "POST",
      "timeout": 30000,
      "headers": {
        "Authorization": "Basic " + btoa(auth_token + ":" + 'something')
      },
      "processData": false,
      "mimeType": "multipart/form-data",
      "contentType": false,
      "data": form,
      "async": false
    };
    // console.log(filename);

    $.ajax(settings).done(function (response) {
      // console.log(response);
      response = JSON.parse(response);
      if (response['code'] === 200) {
        alert(response["message"]);
        window.location.reload();
      } else {
        alert(response["message"]);
      }
    });
    uploadBtn.html('<i class="fa fa-upload"></i>&nbsp;Upload');
  } else{
    uploadBtn.html('<i class="fa fa-upload"></i>&nbsp;Upload');
    return false;
  }
  window.location.reload();

}

// var form = new FormData();
// var endpoint = "admin/file_upload";
// var auth_token = localStorage.getItem('auth_token');
// var fileInput = document.getElementById("file_upload_" + langId);
// var filename = fileInput.files[0].name;
// form.append("fileName", fileInput.files[0], filename);
// var resp = makeRequest(url + endpoint, form, "POST", auth_token);
// console.log(resp);