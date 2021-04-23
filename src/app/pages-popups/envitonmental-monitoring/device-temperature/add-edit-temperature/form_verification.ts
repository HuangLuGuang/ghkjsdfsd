// 主要是针对弹窗窗口中的表单进行验证！

// 官方默认的有：required(必填)、phone(手机号)、email(邮箱)、url(网址)、number(数字)、date(日期)、identity(身份证)

/*
1、新增、编辑  环境监测模块
传感器序列号  验证：deviceno character(50)
房间号  验证：room character(255)
*/

// sql注入和特殊字符
export const special_sql = {
  special_str: /^[^`~!@$%&*?<>/\\|=+^{}\[\]\'\"【】‘’￥——、，。；：？《》！]*$/i,
  special_sql: /(\band\b)|(\bor\b)|(\bDELETE\b)|(\bUPDATE\b)|(\bINSERT\b)|(\bEXEC\b)|(\bEXECUTE\b)|(\blike\b)|(\bselect\b)|(\bset\b)|(\bcreate\b)|(\btable\b)|(\bexec\b)|(\bdeclare\b)|(\bmaster\b)|(\bbackup\b)|(\bmid\b)|(\bcount\b)|(\badd\b)|(\balter\b)|(\bdrop\b)|(\bfrom\b)|(\btruncate\b)|(\bunion\b)|(\bjoin\b)|(\script\b)|(\balert\b)|(\blink\b)/gi,
};

export const Temperature = {
  // deviceno: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]{1,50}$", // 不能为中文！
  deviceno: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]{1,50}$", // 不能为中文！
  room: "^[a-zA-Z0-9\u4e00-\u9fa5\\s·]{1,255}$", // 可中文
  busid: "^[\u4e00-\u9fa5\\s·]{1,255}$", // 不能为中文！
  deviceid: "^[\u4e00-\u9fa5\\s·]{1,255}$", // 不能为中文！
  special_sql: special_sql, // sql 注入
};
