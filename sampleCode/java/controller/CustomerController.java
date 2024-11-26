package com.gdpu.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.gdpu.bean.Customer;
import com.gdpu.common.DataGridView;
import com.gdpu.common.ResultObj;
import com.gdpu.service.CustomerService;
import com.gdpu.vo.CustomerVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Resource
    private CustomerService customerService;

    //顧客検索
    @RequestMapping("loadAllCustomer")
    public DataGridView loadAllProvider(CustomerVo customerVo){
        IPage<Customer> page = new Page<Customer>(customerVo.getPage(),customerVo.getLimit());
        QueryWrapper<Customer> queryWrapper = new QueryWrapper();
        queryWrapper.eq(null != customerVo.getCustomerId() && customerVo.getCustomerId()!=0,"customer_id",customerVo.getCustomerId());
        queryWrapper.like(StringUtils.isNotBlank(customerVo.getManager()),"manager",customerVo.getManager());
        queryWrapper.like(StringUtils.isNotBlank(customerVo.getTalePhone()),"tale_phone",customerVo.getTalePhone());
        customerService.page(page,queryWrapper);
        return new DataGridView(page.getTotal(),page.getRecords());
    }

    //顧客追加
    @RequestMapping("addCustomer")
    public ResultObj addCustomer(CustomerVo customerVo){
        try {
            customerService.save(customerVo);
            return ResultObj.ADD_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.ADD_ERROR;
        }
    }

    //顧客変更
    @RequestMapping("updateCustomer")
    public ResultObj updateCustomer(CustomerVo customerVo){
        try {
            customerService.updateById(customerVo);
            return ResultObj.UPDATE_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.UPDATE_ERROR;
        }
    }

    //顧客削除
    @RequestMapping("deleteCustomer")
    public ResultObj deleteCutomer(Integer id){
        try {
            customerService.removeById(id);
            return ResultObj.DELETE_SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return ResultObj.DELETE_ERROR;
        }
    }

    //顧客プルダウンリスト生成
    @RequestMapping("loadAllCustomerForSelect")
    public DataGridView loadAllCutomerForSelect(){
        QueryWrapper<Customer> queryWrapper = new QueryWrapper<Customer>();
        List<Customer> list = customerService.list(queryWrapper);
        return new DataGridView(list);
    }
}

