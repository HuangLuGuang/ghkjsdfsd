// 主要是针对弹窗窗口中的表单进行验证！

// 视频集成服务器管理界面表单，新增、修改 表单验证!
/*
1、新增、编辑 设备
    科室 验证： group character(225)
    设备名称 验证： devicename character(50)
    设备ID 验证： deviceid character(50)
    
    摄像头IP 验证： cameraip character(50)
    负责区域 验证： territory character(50)
    摄像头唯一标识符 验证： cameraindexcode character(50)

    描述 验证： description character(50)
    视频服务器状态 验证： videoservicestatus character(50)
    IP地址 验证： ipaddress character(50)

    摄像头名称 验证： cameraname character(50)

*/

// sql注入和特殊字符
export const special_sql = {
  // special_str: /^[^`~!@$%&*?<>/\\|=+^{}\[\]\'\"【】‘’￥——、，。；：？《》！]*$/i,
  special_str: /^[^`~!@$%&*?<>/\\|=+^{}\'\"【】‘’￥——、，。；：？《》！]*$/i,
  special_sql:
    /(\band\b)|(\bor\b)|(\bDELETE\b)|(\bUPDATE\b)|(\bINSERT\b)|(\bEXEC\b)|(\bEXECUTE\b)|(\blike\b)|(\bselect\b)|(\bset\b)|(\bcreate\b)|(\btable\b)|(\bexec\b)|(\bdeclare\b)|(\bmaster\b)|(\bbackup\b)|(\bmid\b)|(\bcount\b)|(\badd\b)|(\balter\b)|(\bdrop\b)|(\bfrom\b)|(\btruncate\b)|(\bunion\b)|(\bjoin\b)|(\script\b)|(\balert\b)|(\blink\b)/gi,
};

export const VideoIntegration = {
  special_sql: special_sql, // sql 注入
  group: "^[-\u4e00-\u9fa5\\s·]{1,225}$", // 可中文
  devicename: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·#m³,]{1,50}$", // 可中文
  deviceid: "^[a-zA-Z0-9]{1,50}", // 不能为中文！
  cameraip:
    "^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$",

  territory: "^[a-zA-Z0-9#,\u4e00-\u9fa5\\s·]{1,225}$", // 可中文
  cameraindexcode: "^[a-z0-9]{1,50}$",
  description: "^[a-zA-Z0-9#,\u4e00-\u9fa5\\s·]{1,50}$", // 可中文
  ipaddress:
    "^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$",
  cameraname: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·#m³,]{1,50}$", // 可中文
};
