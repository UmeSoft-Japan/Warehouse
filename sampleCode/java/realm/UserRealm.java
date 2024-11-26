package com.gdpu.realm;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.gdpu.bean.TbUser;
import com.gdpu.common.ActiveUser;
import com.gdpu.service.TbUserService;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;

import javax.annotation.Resource;

public class UserRealm extends AuthorizingRealm {


    @Resource
    private TbUserService tbUserService;

    @Override
    public String getName() {
        return this.getClass().getSimpleName();
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        return null;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        QueryWrapper<TbUser> queryWrapper = new QueryWrapper();
        queryWrapper.eq("account",token.getPrincipal().toString());
        TbUser tbUser = tbUserService.getOne(queryWrapper);
        if(null != tbUser){
            ActiveUser activeUser = new ActiveUser();
            activeUser.setTbUser(tbUser);
            ByteSource credentials = ByteSource.Util.bytes(tbUser.getSalt());
            System.out.println("credentials = " + credentials);
            SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(activeUser, tbUser.getPassword(),credentials,this.getName());
            return info;
        }
        return null;
    }
}
