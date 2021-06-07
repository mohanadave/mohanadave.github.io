function loadNavBar(elemId) {
  var navbar = `

        <!-- Sidebar Toggle (Topbar) -->
        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
          <i class="fa fa-bars"></i>
        </button>

        <!-- Topbar Navbar -->
        <ul class="navbar-nav ml-auto">

          <!-- Nav Item - Alerts -->

          <div class="topbar-divider d-none"></div>

          <!-- Nav Item - User Information -->
          <li class="nav-item dropdown no-arrow">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              <span class="mr-2 d-none d-lg-inline small" id="nav_username">UNKNOWN USER</span>
              <i class="far fa-user-circle"></i>
            </a>
            <!-- Dropdown - User Information -->
            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>

        </ul>

      `;
  $('#' + elemId).html(navbar);
}

function loadLanguageNavContent(langId = null) {
  var content = `
  <div class="tab-pane fade pt-3" id="tab_${langId}">
            <div class="d-flex flex-row align-items-center mb-4" id="pb_card_${langId}">
              <div class="col-xl-3 mb-0 pl-0">
                <div class="card border-info shadow h-100 py-2  ">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Annotation activity for ${langId}</div>
                        <div class="row no-gutters align-items-center">
                          <div class="col-auto">
                            <div class="flex h5 mb-0 mr-3 font-weight-bold" id="percentage_${langId}">0%</div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm mr-2" style="height: 1.5vw">
                              <div id="progressbarAnnotated_${langId}"
                                   class="flex progress-bar progress-bar-striped progress-bar-animated bg-success"
                                   role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0"
                                   aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on annotated">0%
                              </div>
                              <div id="progressbarReported_${langId}"
                                   class="flex progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                   role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0"
                                   aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on reported">0%
                              </div>
                              <div id="progressbarRemaining_${langId}" class="flex progress-bar bg-secondary" role="progressbar"
                                   style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on remaining">0%
                              </div>
                            </div>
                          </div>
                          <!--                    <button id="tooltipTest" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="left" title="" data-original-title="Tooltip on left">Left</button>-->
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-clipboard-list fa-2x mt-3"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex">
              <div class="card shadow mb-4 border-primary">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold"><i class="fas fa-fw fa-table"></i>&nbsp;Annotation table ${langId}</h6>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-bordered table-hover  border-primary" id="dataTable_${langId}" width="100%"
                           cellspacing="0">
                      <thead class="table-primary">
                      <tr>
                        <th>Text id</th>
                        <th>Text</th>
                        <th>Judgement</th>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `;
  return content
}

function loadLanguageNavTabs(requestFrom = 'user', username = null) {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var data = {};
  var endpoint = 'user/fetch_user_langs';
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  var navTab = $('#langNav');
  var langTabContent = $('#langTabContent');
  if (resp['code'] === 200) {
    var result = resp['result'];
    var languages = result['languages']
    var langId = languages[0];
    var content = `
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#tab_${langId}">${langId}</a>
          </li>`;
    var tabContent = `
    <div class="tab-pane fade active show pt-3" id="tab_${langId}">
              <div class="d-flex flex-row align-items-center mb-4" id="pb_card_${langId}">
                <div class="col-xl-3 mb-0 pl-0">
                  <div class="card border-info shadow h-100 py-2  ">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Annotation activity for ${langId}</div>
                          <div class="row no-gutters align-items-center">
                            <div class="col-auto">
                              <div class="flex h5 mb-0 mr-3 font-weight-bold" id="percentage_${langId}">0%</div>
                            </div>
                            <div class="col">
                              <div class="progress progress-sm mr-2" style="height: 1.5vw">
                                <div id="progressbarAnnotated_${langId}"
                                     class="flex progress-bar progress-bar-striped progress-bar-animated bg-success"
                                     role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0"
                                     aria-valuemax="100"
                                     data-toggle="tooltip" data-placement="top" title=""
                                     data-original-title="Tooltip on annotated">0%
                                </div>
                                <div id="progressbarReported_${langId}"
                                     class="flex progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                     role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0"
                                     aria-valuemax="100"
                                     data-toggle="tooltip" data-placement="top" title=""
                                     data-original-title="Tooltip on reported">0%
                                </div>
                                <div id="progressbarRemaining_${langId}" class="flex progress-bar bg-secondary" role="progressbar"
                                     style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                     data-toggle="tooltip" data-placement="top" title=""
                                     data-original-title="Tooltip on remaining">0%
                                </div>
                              </div>
                            </div>
                            <!--                    <button id="tooltipTest" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="left" title="" data-original-title="Tooltip on left">Left</button>-->
                          </div>
                        </div>
                        <div class="col-auto">
                          <i class="fas fa-clipboard-list fa-2x mt-3"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <div class="card shadow mb-4 border-primary">
                  <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold"><i class="fas fa-fw fa-table"></i>&nbsp;Annotation table ${langId}</h6>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-bordered table-hover  border-primary" id="dataTable_${langId}" width="100%"
                             cellspacing="0">
                        <thead class="table-primary">
                        <tr>
                          <th>Text id</th>
                          <th>Text</th>
                          <th>Judgement</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `;
    var i;
    for (i = 1; i < languages.length; i++) {
      langId = languages[i];
      content += `
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#tab_${langId}">${langId}</a>
      </li>
      `;
      tabContent += loadLanguageNavContent(langId);

    }
    navTab.html(content);
    langTabContent.html(tabContent);
    for (i = 0; i < languages.length; i++) {
      var pbAnnotated = $('#progressbarAnnotated_' + langId);
      var pbReported = $('#progressbarReported_' + langId);
      var pbRemaining = $('#progressbarRemaining_' + langId);
      pbAnnotated.tooltip();
      pbReported.tooltip();
      pbRemaining.tooltip();
      langId = languages[i];
      fetchMoreTweets(langId);
    }

    // fetchMoreTweets(langId);
  }
}

function loadLanguageNavContentAnnotatedTweets(langId = null) {
  var content = `
        <div class="tab-pane fade pt-3" id="tab_${langId}">
            <div class="d-flex">
              <div class="card shadow mb-4 border-primary">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold"><i class="fas fa-fw fa-table"></i>Annotated tweets in ${langId}</h6>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-bordered table-striped border-primary" id="annotatedTweets_${langId}" width="100%"
                           cellspacing="0">
                      <thead class="table-primary">
                      <tr>
                        <th>Text id</th>
                        <th>Text</th>
                        <th>Judgement</th>
                        <th>Annotated at</th>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>        
        </div>
  `;
  return content
}

function loadLanguageNavTabsAnnotatedTweets(requestFrom = 'user', username = null) {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var data = {};
  var endpoint = 'user/fetch_user_langs';
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  var navTab = $('#langNav');
  var langTabContent = $('#langTabContent');
  if (resp['code'] === 200) {
    var result = resp['result'];
    var languages = result['languages']
    var langId = languages[0];
    var content = `
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#tab_${langId}">${langId}</a>
          </li>`;
    var tabContent = `
    <div class="tab-pane fade active show pt-3" id="tab_${langId}">
            <div class="d-flex">
              <div class="card shadow mb-4 border-primary">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold"><i class="fas fa-fw fa-table"></i>&nbsp;Annotated tweets in ${langId}</h6>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-bordered table-striped border-primary" id="annotatedTweets_${langId}" width="100%"
                           cellspacing="0">
                      <thead class="table-primary">
                      <tr>
                        <th>Text id</th>
                        <th>Text</th>
                        <th>Judgement</th>
                        <th>Annotated at</th>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>        
        </div>
    `;
    var i;
    for (i = 1; i < languages.length; i++) {
      langId = languages[i];
      content += `
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#tab_${langId}">${langId}</a>
      </li>
      `;
      tabContent += loadLanguageNavContentAnnotatedTweets(langId);

    }
    navTab.html(content);
    langTabContent.html(tabContent);
    for (i = 0; i < languages.length; i++) {
      langId = languages[i];
      fetchAnnotatedTweets(requestFrom, username, langId);
    }
  }
}

function loadLanguageNavContentReportedTweets(langId = null) {
  var content = `
        <div class="tab-pane fade pt-3" id="tab_${langId}">
            <div class="d-flex">
              <div class="card shadow mb-4 border-primary">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold"><i class="fas fa-fw fa-table"></i>&nbsp;Reported tweets in ${langId}</h6>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-bordered table-striped border-primary" id="reportedTweets_${langId}" width="100%"
                           cellspacing="0">
                      <thead class="table-primary">
                      <tr>
                        <th>Text id</th>
                        <th>Text</th>
                        <th>Reported at</th>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>        
        </div>
  `;
  return content
}

function loadLanguageNavTabsReportedTweets() {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var data = {};
  var endpoint = 'user/fetch_user_langs';
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  var navTab = $('#langNav');
  var langTabContent = $('#langTabContent');
  if (resp['code'] === 200) {
    var result = resp['result'];
    var languages = result['languages']
    var langId = languages[0];
    var content = `
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#tab_${langId}">${langId}</a>
          </li>`;
    var tabContent = `
    <div class="tab-pane fade active show pt-3" id="tab_${langId}">
            <div class="d-flex">
              <div class="card shadow mb-4 border-primary">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold"><i class="fas fa-fw fa-table"></i>&nbsp;Reported tweets in ${langId}</h6>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-bordered table-striped border-primary" id="reportedTweets_${langId}" width="100%"
                           cellspacing="0">
                      <thead class="table-primary">
                      <tr>
                        <th>Text id</th>
                        <th>Text</th>
                        <th>Reported at</th>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>        
        </div>
    `;
    var i;
    for (i = 1; i < languages.length; i++) {
      langId = languages[i];
      content += `
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#tab_${langId}">${langId}</a>
      </li>
      `;
      tabContent += loadLanguageNavContentReportedTweets(langId);

    }
    navTab.html(content);
    langTabContent.html(tabContent);
    for (i = 0; i < languages.length; i++) {
      langId = languages[i];
      fetchReportedTweets(langId);
    }
  }
}

function loadLanguageNavContentAdminAllAnnotatedTweets(langId = null) {
  var content = `
        <div class="tab-pane fade pt-3" id="tab_${langId}">
            <div class="d-flex">
              <div class="card shadow mb-4 border-primary">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold"><i class="fas fa-fw fa-table"></i>&nbsp;All annotations</h6>
          </div>
          <div class="card-body">
            <table class="table table-bordered w-auto">
              <tr>
                <td>
                  <button class="btn btn-primary" onclick="filterAllTweetsTable('', '${langId}');">Show all tweets</button>
                </td><td>
                  <button class="btn btn-success" onclick="filterAllTweetsTable('false', '${langId}');">Show non conflicting tweets</button>
                </td><td>
                  <button class="btn btn-warning" onclick="filterAllTweetsTable('true', '${langId}');">Show conflicting tweets</button>
                </td>
              </tr>
            </table>
            <div class="table-responsive">
              <table class="table table-bordered table-hover border-primary" id="allAnnotatedTweets_${langId}" width="100%"
                     cellspacing="0" data-click-to-select="true">
                <thead class="table-primary">
                <tr>
                  <th>Text id</th>
                  <th>Text</th>
                  <th>Judgement</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot class="table-primary">
                <tr>
                  <th>Text id</th>
                  <th>Text</th>
                  <th>Judgement</th>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
            </div>        
        </div>
  `;
  return content
}

function loadLanguageNavTabsAdminAllAnnotatedTweets() {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var data = {};
  var endpoint = 'user/fetch_user_langs';
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  var navTab = $('#langNav');
  var langTabContent = $('#langTabContent');
  if (resp['code'] === 200) {
    var result = resp['result'];
    var languages = result['languages']
    var langId = languages[0];
    var content = `
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#tab_${langId}">${langId}</a>
          </li>`;
    var tabContent = `
    <div class="tab-pane fade active show pt-3" id="tab_${langId}">
      <div class="card shadow mb-4 border-primary">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold"><i class="fas fa-fw fa-table"></i>&nbsp;All annotations</h6>
          </div>
          <div class="card-body">
            <table class="table table-bordered w-auto">
              <tr>
                <td>
                  <button class="btn btn-primary" onclick="filterAllTweetsTable('', '${langId}');">Show all tweets</button>
                </td><td>
                  <button class="btn btn-success" onclick="filterAllTweetsTable('false','${langId}');">Show non conflicting tweets</button>
                </td><td>
                  <button class="btn btn-warning" onclick="filterAllTweetsTable('true','${langId}');">Show conflicting tweets</button>
                </td>
              </tr>
            </table>
            <div class="table-responsive">
              <table class="table table-bordered table-hover border-primary" id="allAnnotatedTweets_${langId}" width="100%"
                     cellspacing="0" data-click-to-select="true">
                <thead class="table-primary">
                <tr>
                  <th>Text id</th>
                  <th>Text</th>
                  <th>Judgement</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot class="table-primary">
                <tr>
                  <th>Text id</th>
                  <th>Text</th>
                  <th>Judgement</th>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>         
    </div>
    `;
    var i;
    for (i = 1; i < languages.length; i++) {
      langId = languages[i];
      content += `
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#tab_${langId}">${langId}</a>
      </li>
      `;
      tabContent += loadLanguageNavContentAdminAllAnnotatedTweets(langId);

    }
    navTab.html(content);
    langTabContent.html(tabContent);
    for (i = 0; i < languages.length; i++) {
      langId = languages[i];
      fetchAllAnnotatedTweets(langId);
    }
  }
}

function loadLanguageNavContentAdminReportedTweets(langId = null) {
  var content = `
        <div class="tab-pane fade pt-3" id="tab_${langId}">
          <div class="d-flex">
            <div class="card shadow mb-4 border-primary">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold"><i class="fas fa-fw fa-table"></i>&nbsp;Reported tweets in ${langId}</h6>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-bordered table-hover border-primary" id="reportedTweets_${langId}" width="100%"
                         cellspacing="0">
                    <thead class="table-primary">
                    <tr>
                      <th>Text id</th>
                      <th>Text</th>
                      <th>Reported by</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>        
        </div>
  `;
  return content
}

function loadLanguageNavTabsAdminReportedTweets() {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var data = {};
  var endpoint = 'user/fetch_user_langs';
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  var navTab = $('#langNav');
  var langTabContent = $('#langTabContent');
  if (resp['code'] === 200) {
    var result = resp['result'];
    var languages = result['languages']
    var langId = languages[0];
    var content = `
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#tab_${langId}">${langId}</a>
          </li>`;
    var tabContent = `
    <div class="tab-pane fade active show pt-3" id="tab_${langId}">
      <div class="d-flex">
        <div class="card shadow mb-4 border-primary">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold"><i class="fas fa-fw fa-table"></i>&nbsp;Reported tweets in ${langId}</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered table-hover border-primary" id="reportedTweets_${langId}" width="100%"
                     cellspacing="0">
                <thead class="table-primary">
                <tr>
                  <th>Text id</th>
                  <th>Text</th>
                  <th>Reported by</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    var i;
    for (i = 1; i < languages.length; i++) {
      langId = languages[i];
      content += `
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#tab_${langId}">${langId}</a>
      </li>
      `;
      tabContent += loadLanguageNavContentAdminReportedTweets(langId);

    }
    navTab.html(content);
    langTabContent.html(tabContent);
    for (i = 0; i < languages.length; i++) {
      langId = languages[i];
      fetchReportedTweetsAdmin(langId);
    }
  }
}

function loadLanguageNavContentAdminStatistics(langId = null) {
  var content = `
        <div class="tab-pane fade pt-3" id="tab_${langId}">
          <div class="jumbotron pb-2 pt-2 pl-1 breadcrumb-item active">
            <ul>
            <li>
              <h5>Total tweets annotated: <span id="totalAnnotation_${langId}">NaN</span></h5>
            </li>
            <ul>
              <li>
                <h6>Total tweets annotated once: <span id="totalSingleAnnotation_${langId}">NaN</span></h6>
              </li>
              <li>
                <h6>Total tweets annotated TWICE or more: <span id="totalDoubleAnnotation_${langId}">NaN</span></h6>
              </li>
            </ul>
            <hr class="bg-light w-25 ml-0">
            <li>
              <h5>Total tweets with ZERO annotations: <span id="totalRemaining_${langId}">NaN</span></h5>
            </li>
            <hr class="bg-light w-25 ml-0">
            <li>
              <h5>Inter annotator agreement:- </h5>
              <ul>
                <li>
                  <h6>Task 1: <span id="aggTask1_${langId}">NaN</span></h6>
                </li>
                <li>
                  <h6>Task 2: <span id="aggTask2_${langId}">NaN</span></h6>
                </li>
              </ul>
            </li>
          </ul>
        </div>        
        </div>
  `;
  return content
}

function loadLanguageNavTabsAdminStatistics() {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var data = {};
  var endpoint = 'user/fetch_user_langs';
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  var navTab = $('#langNav');
  var langTabContent = $('#langTabContent');
  if (resp['code'] === 200) {
    var result = resp['result'];
    var languages = result['languages']
    var langId = languages[0];
    var content = `
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#tab_${langId}">${langId}</a>
          </li>`;
    var tabContent = `
    <div class="tab-pane fade active show pt-3" id="tab_${langId}">
      <div class="jumbotron pb-2 pt-2 pl-1 breadcrumb-item active">
        <ul>
        <li>
          <h5>Total tweets annotated: <span id="totalAnnotation_${langId}">NaN</span></h5>
        </li>
        <ul>
          <li>
            <h6>Total tweets annotated once: <span id="totalSingleAnnotation_${langId}">NaN</span></h6>
          </li>
          <li>
            <h6>Total tweets annotated TWICE or more: <span id="totalDoubleAnnotation_${langId}">NaN</span></h6>
          </li>
        </ul>
        <hr class="bg-light w-25 ml-0">
        <li>
          <h5>Total tweets with ZERO annotations: <span id="totalRemaining_${langId}">NaN</span></h5>
        </li>
        <hr class="bg-light w-25 ml-0">
        <li>
          <h5>Inter annotator agreement:- </h5>
          <ul>
            <li>
              <h6>Task 1: <span id="aggTask1_${langId}">NaN</span></h6>
            </li>
            <li>
              <h6>Task 2: <span id="aggTask2_${langId}">NaN</span></h6>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    </div>
    `;
    var i;
    for (i = 1; i < languages.length; i++) {
      langId = languages[i];
      content += `
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#tab_${langId}">${langId}</a>
      </li>
      `;
      tabContent += loadLanguageNavContentAdminStatistics(langId);

    }
    navTab.html(content);
    langTabContent.html(tabContent);
    for (i = 0; i < languages.length; i++) {
      langId = languages[i];
      fetchStatistics(langId);
    }
  }
}

function loadLanguageNavContentAdminManage(langId = null) {
  var content = `
        <div class="tab-pane fade pt-3" id="tab_${langId}">
          <div class="card shadow mb-4 border-primary">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold"><i class="fab fa-twitter"></i><sup><i class="fas fa-cog"></i></sup> &nbsp;Tweet
              Management for ${langId}</h6>
          </div>
          <div class="card-body">
            <div class="row align-items-center mb-4 pl-1" id="tweets_pb_card_${langId}">
              <div class="col-xl-4 mb-0 pl-0">
                <div class="card border-info shadow h-100 py-2  ">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total single annotated</div>
                        <div class="row no-gutters align-items-center">
                          <div class="col-auto">
                            <div class="flex h5 mb-0 mr-3 font-weight-bold" id="singlePercentage_${langId}">0%</div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm mr-2" style="height: 1.5vw">
                              <div id="progressbarSingleAnnotated_${langId}"
                                   class="flex progress-bar progress-bar-striped progress-bar-animated bg-info"
                                   role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0"
                                   aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on single annotated">0%
                              </div>
                              <div id="progressbarSingleRemaining_${langId}" class="flex progress-bar bg-secondary"
                                   role="progressbar"
                                   style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on remaining">0%
                              </div>
                            </div>
                          </div>
                          <!--                    <button id="tooltipTest" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="left" title="" data-original-title="Tooltip on left">Left</button>-->
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-check fa-2x mt-3"></i>
                        <!--                        <i class="fas fa-clipboard-list fa-2x mt-3"></i>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 mb-0 pl-0">
                <div class="card border-success shadow h-100 py-2  ">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total double (or more)
                          annotated
                        </div>
                        <div class="row no-gutters align-items-center">
                          <div class="col-auto">
                            <div class="flex h5 mb-0 mr-3 font-weight-bold" id="doublePercentage_${langId}">0%</div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm mr-2" style="height: 1.5vw">
                              <div id="progressbarDoubleAnnotated_${langId}"
                                   class="flex progress-bar progress-bar-striped progress-bar-animated bg-success"
                                   role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0"
                                   aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on annotated">0%
                              </div>
                              <div id="progressbarDoubleRemaining_${langId}" class="flex progress-bar bg-secondary"
                                   role="progressbar"
                                   style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on remaining">0%
                              </div>
                            </div>
                          </div>
                          <!--                    <button id="tooltipTest" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="left" title="" data-original-title="Tooltip on left">Left</button>-->
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-check-double fa-2x mt-3"></i>
                        <!--                        <i class="fas fa-clipboard-list fa-2x mt-3"></i>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 mb-0 pl-0">
                <div class="card border-warning shadow h-100 py-2  ">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total reported</div>
                        <div class="row no-gutters align-items-center">
                          <div class="col-auto">
                            <div class="flex h5 mb-0 mr-3 font-weight-bold" id="reportedPercentage_${langId}">0%</div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm mr-2" style="height: 1.5vw">
                              <div id="progressbarReported_${langId}"
                                   class="flex progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                   role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0"
                                   aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on annotated">0%
                              </div>
                              <div id="progressbarReportedRemaining_${langId}" class="flex progress-bar bg-secondary"
                                   role="progressbar"
                                   style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on remaining">0%
                              </div>
                            </div>
                          </div>
                          <!--                    <button id="tooltipTest" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="left" title="" data-original-title="Tooltip on left">Left</button>-->
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="far fa-flag fa-2x mt-3"></i>
                        <!--                        <i class="fas fa-clipboard-list fa-2x mt-3"></i>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-0 pl-1">
              <div class="col-4 mb-0 pl-0">
                <div class="card border-info shadow">
                  <div class="card-header font-weight-bold">
                    <i class="fas fa-sync-alt"></i> &nbsp;Distribute <span
                      class="text-uppercase">unassigned tweets</span>
                  </div>
                  <div class="card-body">
                    To distribute all <span class="text-info text-uppercase">unassigned tweets</span>,&nbsp;<a href="#">Click
                    here</a>

                  </div>
                  <div class="card-footer">
                    <small class="">Note: This will distribute the unassigned tweets amongst all <b>ACTIVE</b> the
                      users.</small>
                  </div>
                </div>
              </div>
              <div class="col-4 mb-0 pl-0">
                <div class="card border-warning shadow">
                  <div class="card-header font-weight-bold">
                    <i class="far fa-flag"></i> &nbsp;Distribute <span class="text-uppercase">reported tweets</span>
                  </div>
                  <div class="card-body">
                    To distribute all <span class="text-warning text-uppercase">reported tweets</span>,&nbsp;<a
                      href="#">Click here</a>
                  </div>
                  <div class="card-footer">
                    <small class="">Note: This will re-distribute all the reported tweets amongst all <b>ACTIVE</b> the
                      users.</small>
                  </div>
                </div>
              </div>
              <div class="col-4 mb-0 pl-0">
                <div class="card border-success shadow h-100">
                  <div class="card-header font-weight-bold">
                    <i class="far fa-edit"></i> &nbsp;Update minimum annotations for a tweet
                  </div>
                  <div class="card-body">
                  </div>
                  <div class="card-footer">
                    <small class="">Note: This will re-distribute all the reported tweets amongst all <b>ACTIVE</b> the
                      users.</small>
                  </div>
                </div>
              </div>
            </div>   
            <div class="row  mt-2">
            <div class="col-12">
            <form onsubmit="return false;">
              <div class="custom-file">            
              <input type="file" id="file_upload_${langId}" class="custom-file-input">
              <label class="custom-file-label btn-primary" for="file_upload">Choose a file to upload. (Only CSV allowed)</label>
              </div>
              <button id="upload_${langId}" class="w-100 btn btn-primary mt-1" onclick="fileUpload('${langId}')"><i class="fa fa-upload"></i>&nbsp;Upload</button>
            </form>
            </div>
            </div>
          </div>
        </div>    
            
        </div>
  `;
  return content
}

function loadLanguageNavTabsAdminManage() {
  var auth_token = localStorage.getItem('auth_token');
  var method = 'GET';
  var data = {};
  var endpoint = 'user/fetch_user_langs';
  var resp = makeRequest(url + endpoint, data, method, auth_token);
  var navTab = $('#langNav');
  var langTabContent = $('#langTabContent');
  if (resp['code'] === 200) {
    var result = resp['result'];
    var languages = result['languages']
    var langId = languages[0];
    var content = `
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#tab_${langId}">${langId}</a>
          </li>`;
    var tabContent = `
    <div class="tab-pane fade active show pt-3" id="tab_${langId}">
      <div class="card shadow mb-4 border-primary">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold"><i class="fab fa-twitter"></i><sup><i class="fas fa-cog"></i></sup> &nbsp;Tweet
              Management for ${langId}</h6>
          </div>
          <div class="card-body">
            <div class="row align-items-center mb-4 pl-1" id="tweets_pb_card_${langId}">
              <div class="col-xl-4 mb-0 pl-0">
                <div class="card border-info shadow h-100 py-2  ">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total single annotated</div>
                        <div class="row no-gutters align-items-center">
                          <div class="col-auto">
                            <div class="flex h5 mb-0 mr-3 font-weight-bold" id="singlePercentage_${langId}">0%</div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm mr-2" style="height: 1.5vw">
                              <div id="progressbarSingleAnnotated_${langId}"
                                   class="flex progress-bar progress-bar-striped progress-bar-animated bg-info"
                                   role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0"
                                   aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on single annotated">0%
                              </div>
                              <div id="progressbarSingleRemaining_${langId}" class="flex progress-bar bg-secondary"
                                   role="progressbar"
                                   style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on remaining">0%
                              </div>
                            </div>
                          </div>
                          <!--                    <button id="tooltipTest" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="left" title="" data-original-title="Tooltip on left">Left</button>-->
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-check fa-2x mt-3"></i>
                        <!--                        <i class="fas fa-clipboard-list fa-2x mt-3"></i>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 mb-0 pl-0">
                <div class="card border-success shadow h-100 py-2  ">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total double (or more)
                          annotated
                        </div>
                        <div class="row no-gutters align-items-center">
                          <div class="col-auto">
                            <div class="flex h5 mb-0 mr-3 font-weight-bold" id="doublePercentage_${langId}">0%</div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm mr-2" style="height: 1.5vw">
                              <div id="progressbarDoubleAnnotated_${langId}"
                                   class="flex progress-bar progress-bar-striped progress-bar-animated bg-success"
                                   role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0"
                                   aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on annotated">0%
                              </div>
                              <div id="progressbarDoubleRemaining_${langId}" class="flex progress-bar bg-secondary"
                                   role="progressbar"
                                   style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on remaining">0%
                              </div>
                            </div>
                          </div>
                          <!--                    <button id="tooltipTest" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="left" title="" data-original-title="Tooltip on left">Left</button>-->
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-check-double fa-2x mt-3"></i>
                        <!--                        <i class="fas fa-clipboard-list fa-2x mt-3"></i>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 mb-0 pl-0">
                <div class="card border-warning shadow h-100 py-2  ">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total reported</div>
                        <div class="row no-gutters align-items-center">
                          <div class="col-auto">
                            <div class="flex h5 mb-0 mr-3 font-weight-bold" id="reportedPercentage_${langId}">0%</div>
                          </div>
                          <div class="col">
                            <div class="progress progress-sm mr-2" style="height: 1.5vw">
                              <div id="progressbarReported_${langId}"
                                   class="flex progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                   role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0"
                                   aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on annotated">0%
                              </div>
                              <div id="progressbarReportedRemaining_${langId}" class="flex progress-bar bg-secondary"
                                   role="progressbar"
                                   style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                   data-toggle="tooltip" data-placement="top" title=""
                                   data-original-title="Tooltip on remaining">0%
                              </div>
                            </div>
                          </div>
                          <!--                    <button id="tooltipTest" type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="left" title="" data-original-title="Tooltip on left">Left</button>-->
                        </div>
                      </div>
                      <div class="col-auto">
                        <i class="far fa-flag fa-2x mt-3"></i>
                        <!--                        <i class="fas fa-clipboard-list fa-2x mt-3"></i>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-0 pl-1">
              <div class="col-4 mb-0 pl-0">
                <div class="card border-info shadow">
                  <div class="card-header font-weight-bold">
                    <i class="fas fa-sync-alt"></i> &nbsp;Distribute <span
                      class="text-uppercase">unassigned tweets</span>
                  </div>
                  <div class="card-body">
                    To distribute all <span class="text-info text-uppercase">unassigned tweets</span>,&nbsp;<a href="#">Click
                    here</a>

                  </div>
                  <div class="card-footer">
                    <small class="">Note: This will distribute the unassigned tweets amongst all <b>ACTIVE</b> the
                      users.</small>
                  </div>
                </div>
              </div>
              <div class="col-4 mb-0 pl-0">
                <div class="card border-warning shadow">
                  <div class="card-header font-weight-bold">
                    <i class="far fa-flag"></i> &nbsp;Distribute <span class="text-uppercase">reported tweets</span>
                  </div>
                  <div class="card-body">
                    To distribute all <span class="text-warning text-uppercase">reported tweets</span>,&nbsp;<a
                      href="#">Click here</a>
                  </div>
                  <div class="card-footer">
                    <small class="">Note: This will re-distribute all the reported tweets amongst all <b>ACTIVE</b> the
                      users.</small>
                  </div>
                </div>
              </div>
              <div class="col-4 mb-0 pl-0">
                <div class="card border-success shadow h-100">
                  <div class="card-header font-weight-bold">
                    <i class="far fa-edit"></i> &nbsp;Update minimum annotations for a tweet
                  </div>
                  <div class="card-body">
                  </div>
                  <div class="card-footer">
                    <small class="">Note: This will re-distribute all the reported tweets amongst all <b>ACTIVE</b> the
                      users.</small>
                  </div>
                </div>
              </div>
            </div>
            <div class="row  mt-2">
            <div class="col-12">
            <form onsubmit="return false;">
              <div class="custom-file">            
              <input type="file" id="file_upload_${langId}" class="custom-file-input">
              <label class="custom-file-label btn-primary" for="file_upload">Choose a file to upload. (Only CSV allowed)</label>
              </div>
              <button id="upload_${langId}" class="w-100 btn btn-primary mt-1" onclick="fileUpload('${langId}')"><i class="fa fa-upload"></i>&nbsp;Upload</button>
            </form>
            </div>
            </div>
          </div>
        </div>
    </div>
    `;
    // var tabContent=loadLanguageNavContentAdminManage(langId);
    var i;
    for (i = 1; i < languages.length; i++) {
      langId = languages[i];
      content += `
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#tab_${langId}">${langId}</a>
      </li>
      `;
      tabContent += loadLanguageNavContentAdminManage(langId);

    }
    navTab.html(content);
    langTabContent.html(tabContent);
    for (i = 0; i < languages.length; i++) {
      langId = languages[i];
      fetchTweetStatistics(langId);
    }
  }
}


function loadSidebarAdmin(elemId, active = null) {
  var elem;
  console.log(directoryName)
  var items = {
    'Home': {
      'icon': '<i class="fas fa-home"></i>&nbsp;',
      'list': [
        {
          'name': 'Dashboard',
          'url': directoryName + 'admin/admin_home.html',
          'icon': '<i class="fas fa-fw fa-tachometer-alt"></i>',
          'active': true
        }
      ]
    },
    'History': {
      'icon': '<i class="fas fa-history"></i>&nbsp;',
      'list': [
        {
          'name': 'Annotated tweets',
          'url': directoryName + 'admin/admin_annotated_tweets_graphical.html',
          'icon': '<i class="fas fa-tasks"></i>',
          'active': false
        },
        {
          'name': 'Reported tweets',
          'url': directoryName + 'admin/admin_reported_tweets.html',
          'icon': '<i class="far fa-flag"></i>',
          'active': false
        },
        {
          'name': 'Statistics',
          'url': directoryName + 'admin/admin_statistics.html',
          'icon': '<i class="fas fa-chart-bar"></i>',
          'active': false
        }
      ]
    }
    ,
    'Management': {
      'icon': '<i class="fas fa-cogs"></i>',
      'list': [
        {
          'name': 'Users and tweets',
          'url': directoryName + 'admin/admin_manage.html',
          'icon': '<i class="fas fa-user-cog"></i>',
          'active': false
        }
      ]
    }
  }
  var sidebar = `
    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="${directoryName}/admin/admin_home.html">
      <div class="sidebar-brand-icon">
        <i class="far fa-newspaper"></i>
      </div>
      <div class="sidebar-brand-text mx-3">HASOC<sup>2020</sup></div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->`;
  for (var heading in items) {
    if (items.hasOwnProperty(heading)) {
      var icon = items[heading]['icon'];
      // // console.log(icon);
      var lst = items[heading]['list'];
      if (heading.length > 0) {
        var head = `
      <hr class="sidebar-divider d-none d-md-block">
      <div class="sidebar-heading">
        ${icon}&nbsp;${heading}
      </div>`;
        sidebar += head;
      }
      for (var i = 0; i < lst.length; i++) {
        var item = lst[i];
        var item_icon = item['icon'];
        if (item['name'].toLowerCase() === active) {
          elem = `
            <li class="nav-item active">
              <a class="nav-link" href="${item['url']}">
              ${item_icon}&nbsp;
              <span>${item['name']}</span></a>
            </li> 
          `;
          sidebar += elem;
        } else {
          elem = `
            <li class="nav-item">
              <a class="nav-link" href="${item['url']}">
              ${item_icon}&nbsp;
              <span>${item['name']}</span></a>
            </li> 
          `;
          sidebar += elem;
        }

      }

    }
  }

  var closing = `
    <hr class="sidebar-divider d-none d-md-block">
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>`;
  sidebar += closing
  $('#' + elemId).html(sidebar);
}

function loadSidebarUser(elemId, active = null) {
  var elem;
  var items = {
    'Home': {
      'icon': '<i class="fas fa-home"></i>&nbsp;',
      'list': [
        {
          'name': 'Dashboard',
          'url': directoryName + 'home.html',
          'icon': '<i class="fas fa-fw fa-tachometer-alt"></i>',
          'active': true
        }
      ]
    },
    'History': {
      'icon': '<i class="fas fa-history"></i>&nbsp;',
      'list': [
        {
          'name': 'Annotated tweets',
          'url': directoryName + 'annotated_tweets.html',
          'icon': '<i class="fas fa-tasks"></i>',
          'active': false
        },
        {
          'name': 'Reported tweets',
          'url': directoryName + 'reported_tweets.html',
          'icon': '<i class="far fa-flag"></i>',
          'active': false
        }
      ]
    },
    'Logout': {
      'icon': '<i class="fas fa-sign-out-alt"></i>&nbsp;',
      'list': []

    }
  }
  var sidebar = `
    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="${directoryName}/frontend/home.html">
      <div class="sidebar-brand-icon">
        <i class="far fa-newspaper"></i>
      </div>
      <div class="sidebar-brand-text mx-3">HASOC<sup>2020</sup></div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->`;
  for (var heading in items) {
    if (items.hasOwnProperty(heading)) {
      var icon = items[heading]['icon'];
      // // console.log(icon);
      var lst = items[heading]['list'];
      if (heading.length > 0) {
        var head = `
      <hr class="sidebar-divider d-none d-md-block">
      <div class="sidebar-heading">
        ${icon}&nbsp;${heading}
      </div>`;
        sidebar += head;
      }
      for (var i = 0; i < lst.length; i++) {
        var item = lst[i];
        var item_icon = item['icon'];
        if (item['name'].toLowerCase() === active) {
          elem = `
            <li class="nav-item active">
              <a class="nav-link" href="${item['url']}">
              ${item_icon}&nbsp;
              <span>${item['name']}</span></a>
            </li> 
          `;
          sidebar += elem;
        } else {
          elem = `
            <li class="nav-item">
              <a class="nav-link" href="${item['url']}">
              ${item_icon}&nbsp;
              <span>${item['name']}</span></a>
            </li> 
          `;
          sidebar += elem;
        }
      }

    }
  }
  sidebar += `
  <li class="nav-item">
    <a class="nav-link" href="#" data-toggle="modal" data-target="#logoutModal">
    <i class="fas fa-sign-out-alt "></i>&nbsp;
    <span>Logout</span></a>
  </li> 
  `;
  var closing = `
    <hr class="sidebar-divider d-none d-md-block">
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>`;
  sidebar += closing
  $('#' + elemId).html(sidebar);
}

function loadFooter(elemId) {
  var footer = `
      <div class="container my-auto">
        <div class="copyright text-center my-auto">
          <span>Copyright &copy; <a href="mailto:dbp2298@gmail.com"
                            target="_blank">Daksh Patel <small>(Dalhousie University)</small></a></span></span>
        </div>
      </div>`;
  $('#' + elemId).html(footer);
}

function loadLogoutModal(elemId) {
  var logoutModal = `<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
      <div class="modal-footer">
        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
        <a class="btn btn-primary" href="${directoryName}index.html" onclick="logout()">Logout</a>
      </div>
    </div>
  </div>`;
  $('#' + elemId).html(logoutModal);
}
