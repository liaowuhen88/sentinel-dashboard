"use strict";var app;angular.module("sentinelDashboardApp",["oc.lazyLoad","ui.router","ui.bootstrap","angular-loading-bar","ngDialog","ui.bootstrap.datetimepicker","ui-notification","rzTable","angular-clipboard","selectize","angularUtils.directives.dirPagination"]).factory("AuthInterceptor",["$window","$state",function(t,r){return{responseError:function(e){return 401===e.status&&(t.localStorage.removeItem("session_sentinel_admin"),r.go("login")),e},response:function(e){return e},request:function(e){return e},requestError:function(e){return e}}}]).config(["$stateProvider","$urlRouterProvider","$ocLazyLoadProvider","$httpProvider",function(e,t,r,a){a.interceptors.push("AuthInterceptor"),r.config({debug:!1,events:!0}),t.otherwise("/dashboard/home"),e.state("login",{url:"/login",templateUrl:"app/views/login.html",controller:"LoginCtl",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/login.js"]})}]}}).state("dashboard",{url:"/dashboard",templateUrl:"app/views/dashboard/main.html",resolve:{loadMyDirectives:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/directives/header/header.js","app/scripts/directives/sidebar/sidebar.js","app/scripts/directives/sidebar/sidebar-search/sidebar-search.js"]})}]}}).state("dashboard.home",{url:"/home",templateUrl:"app/views/dashboard/home.html",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/main.js"]})}]}}).state("dashboard.flowV1",{templateUrl:"app/views/flow_v1.html",url:"/flow/:app",controller:"FlowControllerV1",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/flow_v1.js"]})}]}}).state("dashboard.flow",{templateUrl:"app/views/flow_v2.html",url:"/v2/flow/:app",controller:"FlowControllerV2",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/flow_v2.js"]})}]}}).state("dashboard.paramFlow",{templateUrl:"app/views/param_flow.html",url:"/paramFlow/:app",controller:"ParamFlowController",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/param_flow.js"]})}]}}).state("dashboard.clusterAppAssignManage",{templateUrl:"app/views/cluster_app_assign_manage.html",url:"/cluster/assign_manage/:app",controller:"SentinelClusterAppAssignManageController",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/cluster_app_assign_manage.js"]})}]}}).state("dashboard.clusterAppServerList",{templateUrl:"app/views/cluster_app_server_list.html",url:"/cluster/server/:app",controller:"SentinelClusterAppServerListController",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/cluster_app_server_list.js"]})}]}}).state("dashboard.clusterAppClientList",{templateUrl:"app/views/cluster_app_client_list.html",url:"/cluster/client/:app",controller:"SentinelClusterAppTokenClientListController",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/cluster_app_token_client_list.js"]})}]}}).state("dashboard.clusterSingle",{templateUrl:"app/views/cluster_single_config.html",url:"/cluster/single/:app",controller:"SentinelClusterSingleController",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/cluster_single.js"]})}]}}).state("dashboard.authority",{templateUrl:"app/views/authority.html",url:"/authority/:app",controller:"AuthorityRuleController",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/authority.js"]})}]}}).state("dashboard.degrade",{templateUrl:"app/views/degrade.html",url:"/degrade/:app",controller:"DegradeCtl",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/degrade.js"]})}]}}).state("dashboard.degradeV2",{templateUrl:"app/views/degrade_v2.html",url:"/v2/degrade/:app",controller:"DegradeControllerV2",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/degrade_v2.js"]})}]}}).state("dashboard.system",{templateUrl:"app/views/system.html",url:"/system/:app",controller:"SystemCtl",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/system.js"]})}]}}).state("dashboard.machine",{templateUrl:"app/views/machine.html",url:"/app/:app",controller:"MachineCtl",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/machine.js"]})}]}}).state("dashboard.identity",{templateUrl:"app/views/identity.html",url:"/identity/:app",controller:"IdentityCtl",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/identity.js"]})}]}}).state("dashboard.gatewayIdentity",{templateUrl:"app/views/gateway/identity.html",url:"/gateway/identity/:app",controller:"GatewayIdentityCtl",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/gateway/identity.js"]})}]}}).state("dashboard.metric",{templateUrl:"app/views/metric.html",url:"/metric/:app",controller:"MetricCtl",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/metric.js"]})}]}}).state("dashboard.gatewayApi",{templateUrl:"app/views/gateway/api.html",url:"/gateway/api/:app",controller:"GatewayApiCtl",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/gateway/api.js"]})}]}}).state("dashboard.gatewayFlow",{templateUrl:"app/views/gateway/flow.html",url:"/gateway/flow/:app",controller:"GatewayFlowCtl",resolve:{loadMyFiles:["$ocLazyLoad",function(e){return e.load({name:"sentinelDashboardApp",files:["app/scripts/controllers/gateway/flow.js"]})}]}})}]),(app=angular.module("sentinelDashboardApp")).filter("range",[function(){return function(e,t){if(isNaN(t)||t<=0)return[];e=[];for(var r=1;r<=t;r++)e.push(r);return e}}]),(app=angular.module("sentinelDashboardApp")).service("VersionService",["$http",function(e){this.version=function(){return e({url:"/version",method:"GET"})}}]),(app=angular.module("sentinelDashboardApp")).service("AuthService",["$http",function(t){this.check=function(){return t({url:"/auth/check",method:"POST"})},this.login=function(e){return t({url:"/auth/login",params:e,method:"POST"})},this.logout=function(){return t({url:"/auth/logout",method:"POST"})}}]),(app=angular.module("sentinelDashboardApp")).service("AppService",["$http",function(e){this.getApps=function(){return e({url:"app/briefinfos.json",method:"GET"})}}]),(app=angular.module("sentinelDashboardApp")).service("FlowServiceV1",["$http",function(a){function t(e){return void 0===e||""===e||isNaN(e)||e<=0}this.queryMachineRules=function(e,t,r){return a({url:"/v1/flow/rules",params:{app:e,ip:t,port:r},method:"GET"})},this.newRule=function(e){e.resource,e.limitApp,e.grade,e.count,e.strategy,e.refResource,e.controlBehavior,e.warmUpPeriodSec,e.maxQueueingTimeMs,e.app,e.ip,e.port;return a({url:"/v1/flow/rule",data:e,method:"POST"})},this.saveRule=function(e){var t={id:e.id,resource:e.resource,limitApp:e.limitApp,grade:e.grade,count:e.count,strategy:e.strategy,refResource:e.refResource,controlBehavior:e.controlBehavior,warmUpPeriodSec:e.warmUpPeriodSec,maxQueueingTimeMs:e.maxQueueingTimeMs};return a({url:"/v1/flow/save.json",params:t,method:"PUT"})},this.deleteRule=function(e){var t={id:e.id,app:e.app};return a({url:"/v1/flow/delete.json",params:t,method:"DELETE"})},this.checkRuleValid=function(e){return void 0===e.resource||""===e.resource?(alert("资源名称不能为空"),!1):void 0===e.count||e.count<0?(alert("限流阈值必须大于等于 0"),!1):void 0===e.strategy||e.strategy<0?(alert("无效的流控模式"),!1):1!=e.strategy&&2!=e.strategy||void 0!==e.refResource&&""!=e.refResource?void 0===e.controlBehavior||e.controlBehavior<0?(alert("无效的流控整形方式"),!1):1==e.controlBehavior&&t(e.warmUpPeriodSec)?(alert("预热时长必须大于 0"),!1):2==e.controlBehavior&&t(e.maxQueueingTimeMs)?(alert("排队超时时间必须大于 0"),!1):!e.clusterMode||void 0!==e.clusterConfig&&void 0!==e.clusterConfig.thresholdType||(alert("集群限流配置不正确"),!1):(alert("请填写关联资源或入口"),!1)}}]),(app=angular.module("sentinelDashboardApp")).service("FlowServiceV2",["$http",function(a){function t(e){return void 0===e||""===e||isNaN(e)||e<=0}this.queryMachineRules=function(e,t,r){return a({url:"/v2/flow/rules",params:{app:e,ip:t,port:r},method:"GET"})},this.newRule=function(e){return a({url:"/v2/flow/rule",data:e,method:"POST"})},this.saveRule=function(e){return a({url:"/v2/flow/rule/"+e.id,data:e,method:"PUT"})},this.deleteRule=function(e){return a({url:"/v2/flow/rule/"+e.id,method:"DELETE"})},this.checkRuleValid=function(e){return void 0===e.resource||""===e.resource?(alert("资源名称不能为空"),!1):void 0===e.count||e.count<0?(alert("限流阈值必须大于等于 0"),!1):void 0===e.strategy||e.strategy<0?(alert("无效的流控模式"),!1):1!=e.strategy&&2!=e.strategy||void 0!==e.refResource&&""!=e.refResource?void 0===e.controlBehavior||e.controlBehavior<0?(alert("无效的流控整形方式"),!1):1==e.controlBehavior&&t(e.warmUpPeriodSec)?(alert("预热时长必须大于 0"),!1):2==e.controlBehavior&&t(e.maxQueueingTimeMs)?(alert("排队超时时间必须大于 0"),!1):!e.clusterMode||void 0!==e.clusterConfig&&void 0!==e.clusterConfig.thresholdType||(alert("集群限流配置不正确"),!1):(alert("请填写关联资源或入口"),!1)}}]),(app=angular.module("sentinelDashboardApp")).service("DegradeService",["$http",function(a){this.queryMachineRules=function(e,t,r){return a({url:"degrade/rules.json",params:{app:e,ip:t,port:r},method:"GET"})},this.newRule=function(e){var t={id:e.id,resource:e.resource,limitApp:e.limitApp,count:e.count,timeWindow:e.timeWindow,grade:e.grade,app:e.app,ip:e.ip,port:e.port};return a({url:"/degrade/new.json",params:t,method:"GET"})},this.saveRule=function(e){var t={id:e.id,resource:e.resource,limitApp:e.limitApp,grade:e.grade,count:e.count,timeWindow:e.timeWindow};return a({url:"/degrade/save.json",params:t,method:"GET"})},this.deleteRule=function(e){var t={id:e.id,app:e.app};return a({url:"/degrade/delete.json",params:t,method:"GET"})},this.checkRuleValid=function(e){return void 0===e.resource||""===e.resource?(alert("资源名称不能为空"),!1):void 0===e.grade||e.grade<0?(alert("未知的降级策略"),!1):void 0===e.count||""===e.count||e.count<0?(alert("降级阈值不能为空或小于 0"),!1):void 0===e.timeWindow||""===e.timeWindow||e.timeWindow<=0?(alert("降级时间窗口必须大于 0"),!1):!(1==e.grade&&1<e.count)||(alert("异常比率超出范围：[0.0 - 1.0]"),!1)}}]),(app=angular.module("sentinelDashboardApp")).service("DegradeServiceV2",["$http",function(a){this.queryMachineRules=function(e,t,r){return a({url:"v2/degrade/rules.json",params:{app:e,ip:t,port:r},method:"GET"})},this.newRule=function(e){var t={id:e.id,resource:e.resource,limitApp:e.limitApp,count:e.count,timeWindow:e.timeWindow,grade:e.grade,app:e.app,ip:e.ip,port:e.port};return a({url:"/v2/degrade/new.json",params:t,method:"GET"})},this.saveRule=function(e){var t={id:e.id,resource:e.resource,limitApp:e.limitApp,grade:e.grade,count:e.count,timeWindow:e.timeWindow};return a({url:"/v2/degrade/save.json",params:t,method:"GET"})},this.deleteRule=function(e){var t={id:e.id,app:e.app};return a({url:"/v2/degrade/delete.json",params:t,method:"GET"})},this.checkRuleValid=function(e){return void 0===e.resource||""===e.resource?(alert("资源名称不能为空"),!1):void 0===e.grade||e.grade<0?(alert("未知的降级策略"),!1):void 0===e.count||""===e.count||e.count<0?(alert("降级阈值不能为空或小于 0"),!1):void 0===e.timeWindow||""===e.timeWindow||e.timeWindow<=0?(alert("降级时间窗口必须大于 0"),!1):!(1==e.grade&&1<e.count)||(alert("异常比率超出范围：[0.0 - 1.0]"),!1)}}]),(app=angular.module("sentinelDashboardApp")).service("SystemService",["$http",function(a){this.queryMachineRules=function(e,t,r){return a({url:"system/rules.json",params:{app:e,ip:t,port:r},method:"GET"})},this.newRule=function(e){var t={app:e.app,ip:e.ip,port:e.port};return 0==e.grade?t.highestSystemLoad=e.highestSystemLoad:1==e.grade?t.avgRt=e.avgRt:2==e.grade?t.maxThread=e.maxThread:3==e.grade?t.qps=e.qps:4==e.grade&&(t.highestCpuUsage=e.highestCpuUsage),a({url:"/system/new.json",params:t,method:"GET"})},this.saveRule=function(e){var t={id:e.id};return 0==e.grade?t.highestSystemLoad=e.highestSystemLoad:1==e.grade?t.avgRt=e.avgRt:2==e.grade?t.maxThread=e.maxThread:3==e.grade?t.qps=e.qps:4==e.grade&&(t.highestCpuUsage=e.highestCpuUsage),a({url:"/system/save.json",params:t,method:"GET"})},this.deleteRule=function(e){var t={id:e.id,app:e.app};return a({url:"/system/delete.json",params:t,method:"GET"})}}]),(app=angular.module("sentinelDashboardApp")).service("MachineService",["$http","$httpParamSerializerJQLike",function(a,o){this.getAppMachines=function(e){return a({url:"app/"+e+"/machines.json",method:"GET"})},this.removeAppMachine=function(e,t,r){return a({url:"app/"+e+"/machine/remove.json",method:"POST",headers:{"Content-type":"application/x-www-form-urlencoded; charset=UTF-8"},data:o({ip:t,port:r})})}}]),(app=angular.module("sentinelDashboardApp")).service("IdentityService",["$http",function(a){this.fetchIdentityOfMachine=function(e,t,r){return a({url:"resource/machineResource.json",params:{ip:e,port:t,searchKey:r},method:"GET"})},this.fetchClusterNodeOfMachine=function(e,t,r){return a({url:"resource/machineResource.json",params:{ip:e,port:t,type:"cluster",searchKey:r},method:"GET"})}}]),(app=angular.module("sentinelDashboardApp")).service("MetricService",["$http",function(n){this.queryAppSortedIdentities=function(e){return n({url:"/metric/queryTopResourceMetric.json",params:e,method:"GET"})},this.queryByAppAndIdentity=function(e){return n({url:"/metric/queryByAppAndResource.json",params:e,method:"GET"})},this.queryByMachineAndIdentity=function(e,t,r,a,o){var i={ip:e,port:t,identity:r,startTime:a.getTime(),endTime:o.getTime()};return n({url:"/metric/queryByAppAndResource.json",params:i,method:"GET"})}}]),angular.module("sentinelDashboardApp").service("ParamFlowService",["$http",function(a){function o(e){return!("int"!==(r=e.classType)&&"double"!==r&&"float"!==r&&"long"!==r&&"short"!==r||void 0!==(t=e.object)&&""!==t&&!isNaN(t))||(!!("byte"===e.classType&&(a=e.object,o=-128,i=127,void 0===a||""===a||isNaN(a)||a<o||i<a))||(void 0===e.object||void 0===e.classType||(void 0===(n=e.count)||""===n||isNaN(n)||n<0)));var t,r,a,o,i,n}this.queryMachineRules=function(e,t,r){return a({url:"/paramFlow/rules",params:{app:e,ip:t,port:r},method:"GET"})},this.addNewRule=function(e){return a({url:"/paramFlow/rule",data:e,method:"POST"})},this.saveRule=function(e){return a({url:"/paramFlow/rule/"+e.id,data:e,method:"PUT"})},this.deleteRule=function(e){return a({url:"/paramFlow/rule/"+e.id,method:"DELETE"})},this.checkRuleValid=function(e){if(!e.resource||""===e.resource)return alert("资源名称不能为空"),!1;if(1!=e.grade)return alert("未知的限流模式"),!1;if(e.count<0)return alert("限流阈值必须大于等于 0"),!1;if(void 0===e.paramIdx||""===e.paramIdx||isNaN(e.paramIdx)||e.paramIdx<0)return alert("热点参数索引必须大于等于 0"),!1;if(void 0!==e.paramFlowItemList)for(var t=0;t<e.paramFlowItemList.length;t++){var r=e.paramFlowItemList[t];if(o(r))return alert("热点参数例外项不合法，请检查值和类型是否正确：参数为 "+r.object+", 类型为 "+r.classType+", 限流阈值为 "+r.count),!1}return!0}}]),angular.module("sentinelDashboardApp").service("AuthorityRuleService",["$http",function(a){this.queryMachineRules=function(e,t,r){return a({url:"/authority/rules",params:{app:e,ip:t,port:r},method:"GET"})},this.addNewRule=function(e){return a({url:"/authority/rule",data:e,method:"POST"})},this.saveRule=function(e){return a({url:"/authority/rule/"+e.id,data:e,method:"PUT"})},this.deleteRule=function(e){return a({url:"/authority/rule/"+e.id,method:"DELETE"})},this.checkRuleValid=function(e){return void 0===e.resource||""===e.resource?(alert("资源名称不能为空"),!1):void 0===e.limitApp||""===e.limitApp?(alert("流控针对应用不能为空"),!1):void 0!==e.strategy||(alert("必须选择黑白名单模式"),!1)}}]),angular.module("sentinelDashboardApp").service("ClusterStateService",["$http",function(a){this.fetchClusterUniversalStateSingle=function(e,t,r){return a({url:"/cluster/state_single",params:{app:e,ip:t,port:r},method:"GET"})},this.fetchClusterUniversalStateOfApp=function(e){return a({url:"/cluster/state/"+e,method:"GET"})},this.fetchClusterServerStateOfApp=function(e){return a({url:"/cluster/server_state/"+e,method:"GET"})},this.fetchClusterClientStateOfApp=function(e){return a({url:"/cluster/client_state/"+e,method:"GET"})},this.modifyClusterConfig=function(e){return a({url:"/cluster/config/modify_single",data:e,method:"POST"})},this.applyClusterFullAssignOfApp=function(e,t){return a({url:"/cluster/assign/all_server/"+e,data:t,method:"POST"})},this.applyClusterSingleServerAssignOfApp=function(e,t){return a({url:"/cluster/assign/single_server/"+e,data:t,method:"POST"})},this.applyClusterServerBatchUnbind=function(e,t){return a({url:"/cluster/assign/unbind_server/"+e,data:t,method:"POST"})}}]),(app=angular.module("sentinelDashboardApp")).service("GatewayApiService",["$http",function(a){this.queryApis=function(e,t,r){return a({url:"/gateway/api/list.json",params:{app:e,ip:t,port:r},method:"GET"})},this.newApi=function(e){return a({url:"/gateway/api/new.json",data:e,method:"POST"})},this.saveApi=function(e){return a({url:"/gateway/api/save.json",data:e,method:"POST"})},this.deleteApi=function(e){var t={id:e.id,app:e.app};return a({url:"/gateway/api/delete.json",params:t,method:"POST"})},this.checkApiValid=function(e,t){if(void 0===e.apiName||""===e.apiName)return alert("API名称不能为空"),!1;if(null==e.predicateItems||0===e.predicateItems.length)return alert("至少有一个匹配规则"),!1;for(var r=0;r<e.predicateItems.length;r++){var a=e.predicateItems[r].pattern;if(void 0===a||""===a)return alert("匹配串不能为空，请检查"),!1}return-1===t.indexOf(e.apiName)||(alert("API名称("+e.apiName+")已存在"),!1)}}]),(app=angular.module("sentinelDashboardApp")).service("GatewayFlowService",["$http",function(a){this.queryRules=function(e,t,r){return a({url:"/gateway/flow/list.json",params:{app:e,ip:t,port:r},method:"GET"})},this.newRule=function(e){return a({url:"/gateway/flow/new.json",data:e,method:"POST"})},this.saveRule=function(e){return a({url:"/gateway/flow/save.json",data:e,method:"POST"})},this.deleteRule=function(e){var t={id:e.id,app:e.app};return a({url:"/gateway/flow/delete.json",params:t,method:"POST"})},this.checkRuleValid=function(e){if(void 0===e.resource||""===e.resource)return alert("API名称不能为空"),!1;if(null!=e.paramItem&&(2==e.paramItem.parseStrategy||3==e.paramItem.parseStrategy||4==e.paramItem.parseStrategy)){if(void 0===e.paramItem.fieldName||""===e.paramItem.fieldName)return alert("当参数属性为Header、URL参数、Cookie时，参数名称不能为空"),!1;if(""===e.paramItem.pattern)return alert("匹配串不能为空"),!1}return!(void 0===e.count||e.count<0)||(alert((1===e.grade?"QPS阈值":"线程数")+"必须大于等于 0"),!1)}}]);