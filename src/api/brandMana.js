import axios from 'axios';
import { req,reqBody } from './axiosFun';

// 获取列表
export const getList = (data) => { 
    return reqBody("post", "/mall/pms-brand/page", data) 
};

// 新增
export const add = (data) => { 
    return reqBody("post", "/mall/pms-brand/add", data) 
};

//修改
export const edit = (data) => { 
    return reqBody("post", "/mall/pms-brand/edit", data) 
};


//删除
export const del = (data) => { 
    return reqBody("get", `/mall/pms-brand/del/${data.id}`) 
};

// 检索
export const getOne = (params) => { 
        return req("get", `/mall/pms-brand/one/${params}` ) };

export const getOneByPrId = (params) => { 
            return req("get", `/mall/pms-brand/getSubscribeProduct${params}` ) };
    