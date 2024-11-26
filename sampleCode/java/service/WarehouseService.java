package com.gdpu.service;

import com.gdpu.bean.Warehouse;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.annotation.Resource;

public interface WarehouseService extends IService<Warehouse> {

    Integer getMaximumId();
}
