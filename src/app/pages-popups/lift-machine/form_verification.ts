// 主要是针对弹窗窗口中的表单进行验证！

// 官方默认的有：required(必填)、phone(手机号)、email(邮箱)、url(网址)、number(数字)、date(日期)、identity(身份证)

/*
1、新增、编辑 设备
设备ID 验证：deviceid character(20)
设备名称 验证：devicename character(20)

IMEI号 验证：imei character(50) 15
SIM号 验证：sim character(50)
负责人 验证：belonged character(50)

存放地点 验证：location character(50)
创建人 验证：createdby character(50)
*/

// sql注入和特殊字符
export const special_sql = {
  special_str: /^[^`~!@$%&*?<>/\\|=+^{}\[\]\'\"【】‘’￥——、，。；：？《》！]*$/i,
  special_sql: /(\band\b)|(\bor\b)|(\bDELETE\b)|(\bUPDATE\b)|(\bINSERT\b)|(\bEXEC\b)|(\bEXECUTE\b)|(\blike\b)|(\bselect\b)|(\bset\b)|(\bcreate\b)|(\btable\b)|(\bexec\b)|(\bdeclare\b)|(\bmaster\b)|(\bbackup\b)|(\bmid\b)|(\bcount\b)|(\badd\b)|(\balter\b)|(\bdrop\b)|(\bfrom\b)|(\btruncate\b)|(\bunion\b)|(\bjoin\b)|(\script\b)|(\balert\b)|(\blink\b)/gi,
};

export const Device = {
  deviceid: "^[\u4e00-\u9fa5\\s·]{1,50}", // 不能为中文！
  devicename: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·#m³,]{1,50}$", // 可中文
  detectorid: "^[0-9]{1,50}$",
  location: "^[a-zA-Z0-9_]{1,50}$", // 可中文
  groups: "^[a-zA-Z\u4e00-\u9fa5\\s·]{1,50}$", // 可中文
  belonged: "^[a-zA-Z\u4e00-\u9fa5\\s·]{1,50}$", // 可中文
  special_sql: special_sql, // sql 注入
};
