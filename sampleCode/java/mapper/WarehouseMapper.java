package com.gdpu.mapper;

import com.gdpu.bean.Warehouse;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface WarehouseMapper extends BaseMapper<Warehouse> {

    public Integer getMaximumId();
}
