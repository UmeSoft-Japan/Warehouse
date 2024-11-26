package com.gdpu.vo;

import com.gdpu.bean.Stock;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
public class StockVo extends Stock {
    private static final Long serialVersionUID = 1L;

    private Integer page = 1;

    private Integer limit = 10;
}
