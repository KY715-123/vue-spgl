import axios from 'axios';
import { req,reqBody } from './axiosFun';

// 获取列表
export const getList = (data) => { 
    return reqBody("post", "/mall/pms-product-category/page", data) 
};

// 新增
export const add = (data) => { 
    return reqBody("post", "/mall/pms-product-category/add", data) 
};

//修改
export const edit = (data) => { 
    return reqBody("post", "/mall/pms-product-category/edit", data) 
};


//删除
export const del = (data) => { 
    return reqBody("get", `/mall/pms-product-category/del/${data.id}`) 
};
