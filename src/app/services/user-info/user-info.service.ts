import { Injectable } from '@angular/core';
import { PublicmethodService } from '../publicmethod/publicmethod.service';


import { SSOUSERINFO } from '../../appconfig';
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {


  constructor(private cryto: PublicmethodService,) { }

  // 获取登录后的用户信息
  private getUserInfo() {
    const userInfo = localStorage.getItem(SSOUSERINFO);
    return userInfo ? this.cryto.uncompileStr(userInfo) : null;
  }

  // 获取用户登录, loginName,
  getLoginName() {
    // 例如：admin
    const userinfo = this.getUserInfo();
    return userinfo ? JSON.parse(userinfo)['loginname'] : null;
  }

  getName() {
    const userinfo = this.getUserInfo();
    console.log("--userinfo------", userinfo)
    return userinfo ? JSON.parse(userinfo)['name'] : null;
  }


  getEmployeeNo() {
    const userinfo = this.getUserInfo();
    return userinfo ? JSON.parse(userinfo)['employeeno'] : null;
  }

  // 获取员工ID
  getEmployeeID() {
    // 例如：100000166
    const userinfo = this.getUserInfo();
    return userinfo ? JSON.parse(userinfo)['employeeid'] : null;
  }

  // 获取员工角色id
  getEmployeeRoleID(){
    const userinfo = this.getUserInfo();
    var roles = JSON.parse(userinfo)["roles"];
    var roles_lsit = [];
    roles.forEach(item => {
      roles_lsit.push(item["roleid"]);
    });
    return roles_lsit
  }

  // 获取集团名称
  getDivision() {
    return "中国中车";
  }

  // 获取公司名称
  getCompany() {
    return "中车唐山";
  }

  // 获取工厂名称
  getFacility() {
    // 例如：ISF
    const userinfo = this.getUserInfo();
    return userinfo ? JSON.parse(userinfo)['facility'] : null;
  }

  // 获取部门名称
  getDepartment() {
    // 例如：生产部
    const userinfo = this.getUserInfo();
    return userinfo ? JSON.parse(userinfo)['department'] : null;
  }

  // 获取接口本机ip
  getSourceid() {
    // 例如：192.168.1.12
    const userinfo = this.getUserInfo();
    return userinfo ? JSON.parse(userinfo)['sourceid'] : null;
  }

  // 获取客户端ip
  getClientip(){
    const userinfo = this.getUserInfo();
    return userinfo ? JSON.parse(userinfo)['clintip'] : null;
  }

  // 获取真实的用户ip
  getUserip(){
    const userinfo = this.getUserInfo();
    return userinfo? JSON.parse(userinfo)['user_ip']:null
  }

  
}
