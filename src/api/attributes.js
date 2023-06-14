import axios from 'axios';
import { req,reqBody } from './axiosFun';

// 获取列表
export const getList = (data) => { 
    return reqBody("post", "/mall/pms-product-attribute/page", data) 
};

// 新增
export const add = (data) => { 
    return reqBody("post", "/mall/pms-product-attribute/add", data) 
};

//修改
export const edit = (data) => { 
    return reqBody("post", "/mall/pms-product-attribute/edit", data) 
};


//删除
export const del = (data) => { 
    return reqBody("get", `/mall/pms-product-attribute/del/${data.id}`) 
};

// 检索
export const getOne = (params) => { 
        return req("get", `/mall/pms-product-attribute/one/${params}` ) };
