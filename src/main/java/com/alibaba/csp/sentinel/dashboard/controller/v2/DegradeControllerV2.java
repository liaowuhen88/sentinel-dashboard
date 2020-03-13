/*
 * Copyright 1999-2018 Alibaba Group Holding Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.alibaba.csp.sentinel.dashboard.controller.v2;

import com.alibaba.csp.sentinel.dashboard.auth.AuthAction;
import com.alibaba.csp.sentinel.dashboard.auth.AuthService.PrivilegeType;
import com.alibaba.csp.sentinel.dashboard.controller.DegradeController;
import com.alibaba.csp.sentinel.dashboard.datasource.entity.rule.DegradeRuleEntity;
import com.alibaba.csp.sentinel.dashboard.domain.Result;
import com.alibaba.csp.sentinel.dashboard.rule.DynamicRuleProvider;
import com.alibaba.csp.sentinel.dashboard.rule.DynamicRulePublisher;
import com.alibaba.csp.sentinel.dashboard.util.IdWorkerUtils;
import com.alibaba.csp.sentinel.slots.block.RuleConstant;
import com.alibaba.csp.sentinel.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author leyou
 */
@Controller
@RequestMapping(value = "/v2/degrade", produces = MediaType.APPLICATION_JSON_VALUE)
public class DegradeControllerV2 {
    private final Logger logger = LoggerFactory.getLogger(DegradeController.class);

    @Autowired
    @Qualifier("degradeRuleZookeeperProvider")
    private DynamicRuleProvider<List<DegradeRuleEntity>> ruleProvider;

    @Autowired
    @Qualifier("degradeRuleZookeeperPublisher")
    private DynamicRulePublisher<List<DegradeRuleEntity>> rulePublisher;

    @ResponseBody
    @RequestMapping("/rules.json")
    @AuthAction(PrivilegeType.READ_RULE)
    public Result<List<DegradeRuleEntity>> queryMachineRules(String app, String ip, Integer port) {

        if (StringUtil.isEmpty(app)) {
            return Result.ofFail(-1, "app can't be null or empty");
        }
        if (StringUtil.isEmpty(ip)) {
            return Result.ofFail(-1, "ip can't be null or empty");
        }
        if (port == null) {
            return Result.ofFail(-1, "port can't be null");
        }
        try {
            List<DegradeRuleEntity> rules = ruleProvider.getRules(getRealPath(app));
            return Result.ofSuccess(rules);
        } catch (Throwable throwable) {
            logger.error("queryApps error:", throwable);
            return Result.ofThrowable(-1, throwable);
        }
    }

    @ResponseBody
    @RequestMapping("/new.json")
    @AuthAction(PrivilegeType.WRITE_RULE)
    public Result<DegradeRuleEntity> add(String app, String ip, Integer port, String limitApp, String resource,
                                         Double count, Integer timeWindow, Integer grade) throws Exception {
        if (StringUtil.isBlank(app)) {
            return Result.ofFail(-1, "app can't be null or empty");
        }

        if (StringUtil.isBlank(limitApp)) {
            return Result.ofFail(-1, "limitApp can't be null or empty");
        }
        if (StringUtil.isBlank(resource)) {
            return Result.ofFail(-1, "resource can't be null or empty");
        }
        if (count == null) {
            return Result.ofFail(-1, "count can't be null");
        }
        if (timeWindow == null) {
            return Result.ofFail(-1, "timeWindow can't be null");
        }
        if (grade == null) {
            return Result.ofFail(-1, "grade can't be null");
        }
        if (grade < RuleConstant.DEGRADE_GRADE_RT || grade > RuleConstant.DEGRADE_GRADE_EXCEPTION_COUNT) {
            return Result.ofFail(-1, "Invalid grade: " + grade);
        }
        DegradeRuleEntity entity = new DegradeRuleEntity();
        entity.setApp(app.trim());
        entity.setIp(ip.trim());
        entity.setPort(port);
        entity.setLimitApp(limitApp.trim());
        entity.setResource(resource.trim());
        entity.setCount(count);
        entity.setTimeWindow(timeWindow);
        entity.setGrade(grade);
        Date date = new Date();
        entity.setGmtCreate(date);
        entity.setGmtModified(date);
        List<DegradeRuleEntity> rules = addFlowRuleEntity(entity);
        publishRules(app, rules);
        return Result.ofSuccess(entity);
    }

    @ResponseBody
    @RequestMapping("/save.json")
    @AuthAction(PrivilegeType.WRITE_RULE)
    public Result<DegradeRuleEntity> updateIfNotNull(Long id, String app, String limitApp, String resource,
                                                     Double count, Integer timeWindow, Integer grade) throws Exception {
        if (id == null) {
            return Result.ofFail(-1, "id can't be null");
        }
        if (grade != null) {
            if (grade < RuleConstant.DEGRADE_GRADE_RT || grade > RuleConstant.DEGRADE_GRADE_EXCEPTION_COUNT) {
                return Result.ofFail(-1, "Invalid grade: " + grade);
            }
        }
        DegradeRuleEntity entity = getDegradeRuleEntity(app, id);
        if (entity == null) {
            return Result.ofFail(-1, "id " + id + " dose not exist");
        }

        if (StringUtil.isNotBlank(app)) {
            entity.setApp(app.trim());
        }

        if (StringUtil.isNotBlank(limitApp)) {
            entity.setLimitApp(limitApp.trim());
        }
        if (StringUtil.isNotBlank(resource)) {
            entity.setResource(resource.trim());
        }
        if (count != null) {
            entity.setCount(count);
        }
        if (timeWindow != null) {
            entity.setTimeWindow(timeWindow);
        }
        if (grade != null) {
            entity.setGrade(grade);
        }
        Date date = new Date();
        entity.setGmtModified(date);
        List<DegradeRuleEntity> rules = addFlowRuleEntity(entity);
        publishRules(entity.getApp(), rules);

        return Result.ofSuccess(entity);
    }

    @ResponseBody
    @RequestMapping("/delete.json")
    @AuthAction(PrivilegeType.DELETE_RULE)
    public Result<Long> delete(String app, Long id) throws Exception {
        if (id == null) {
            return Result.ofFail(-1, "id can't be null");
        }

        DegradeRuleEntity oldEntity = getDegradeRuleEntity(app, id);
        if (oldEntity == null) {
            return Result.ofSuccess(null);
        }
        List<DegradeRuleEntity> ruls = deleteFlowRuleEntity(app, id);
        publishRules(oldEntity.getApp(), ruls);
        return Result.ofSuccess(id);
    }

    private void publishRules(String app, List<DegradeRuleEntity> rules) throws Exception {
        rulePublisher.publish(getRealPath(app), rules);
        //return sentinelApiClient.setDegradeRuleOfMachine(app, ip, port, rules);
    }

    private List<DegradeRuleEntity> addFlowRuleEntity(/*@NonNull*/ DegradeRuleEntity entity) throws Exception {
        //需要设置id
        List<DegradeRuleEntity> rules = ruleProvider.getRules(getRealPath(entity.getApp()));
        Map<Long, DegradeRuleEntity> map = rules.stream().collect(
                Collectors.toMap(DegradeRuleEntity::getId, (p) -> p));
        if (null == entity.getId()) {
            entity.setId(IdWorkerUtils.nextId());
        }
        map.put(entity.getId(), entity);

        return new ArrayList<>(map.values());
    }

    private DegradeRuleEntity getDegradeRuleEntity(String app, Long id) throws Exception {
        //需要设置id
        List<DegradeRuleEntity> rules = ruleProvider.getRules(getRealPath(app));
        Map<Long, DegradeRuleEntity> map = rules.stream().collect(
                Collectors.toMap(DegradeRuleEntity::getId, (p) -> p));
        return map.get(id);
    }

    private List<DegradeRuleEntity> deleteFlowRuleEntity(/*@NonNull*/ String app, Long id) throws Exception {
        //需要设置id
        List<DegradeRuleEntity> rules = ruleProvider.getRules(getRealPath(app));
        rules.removeIf(p -> id.equals(p.getId()));//过滤30岁以上的求职者
        return rules;
    }

    private String getRealPath(String app) {
        return app + "/degradeRule";
    }

}
