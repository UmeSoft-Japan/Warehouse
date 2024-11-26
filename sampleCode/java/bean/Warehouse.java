package com.gdpu.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class Warehouse implements Serializable {

    private static final long serialVersionUID=1L;

    @TableId(value = "house_id", type = IdType.INPUT)
    private Integer houseId;

    private String name;

    private String address;
}
