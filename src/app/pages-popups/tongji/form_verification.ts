// 主要是针对弹窗窗口中的表单进行验证！

// 官方默认的有：required(必填)、phone(手机号)、email(邮箱)、url(网址)、number(数字)、date(日期)、identity(身份证)

/*
1、新增、编辑 设备
设备编号 验证：deviceno character(100)
    设备编号 验证：deviceno character(20)
    设备名称 验证：devicename character(20)
    设备类型 验证：type character(50)
    设备ID 验证：deviceid character(50)
    存放地点 验证：location character(50)
    科室 验证：groups character(50)
    归属人 验证：belonged character(50)
    供应商 验证：supplier character(50)
    设备ABC分类: 验证：linklevel character(50)
    设备统计归类 验证：devicetype character(50)

*/

// sql注入和特殊字符
export const special_sql = {
    special_str: /^[^`~!@$%&*?<>/\\|=+^{}\[\]\'\"【】‘’￥——、，。；：？《》！]*$/i,
    special_sql: /(\band\b)|(\bor\b)|(\bDELETE\b)|(\bUPDATE\b)|(\bINSERT\b)|(\bEXEC\b)|(\bEXECUTE\b)|(\blike\b)|(\bselect\b)|(\bset\b)|(\bcreate\b)|(\btable\b)|(\bexec\b)|(\bdeclare\b)|(\bmaster\b)|(\bbackup\b)|(\bmid\b)|(\bcount\b)|(\badd\b)|(\balter\b)|(\bdrop\b)|(\bfrom\b)|(\btruncate\b)|(\bunion\b)|(\bjoin\b)|(\script\b)|(\balert\b)|(\blink\b)/gi,
}

// 1台架设备;2移动资产;3举升机  '设备状态，1在用；2封存；3停用；4闲置'


export const Device =  {
    deviceno: "[\u4e00-\u9fa5\\s·]{1,100}$",  // 数字、字母、下划线、短线、() 设备编号
    devicename: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·#m³,]{1,50}$",       // 可中文

    
    supplier: "^[a-zA-Z_\u4e00-\u9fa5\\s·]{1,50}$",       // 可中文
    // location: "^[a-zA-Z0-9_]{1,50}$",       // 可中文
    department: "^[a-zA-Z\u4e00-\u9fa5\\s·]{1,50}$",       // 可中文  部门改为 deviceid eim设备编号
    deviceid: "^[\u4e00-\u9fa5\\s·]{1,50}",                // 不能为中文！
    groups: "^[a-zA-Z\u4e00-\u9fa5\\s·]{1,50}$",       // 可中文
    belonged: "^[a-zA-Z\u4e00-\u9fa5\\s·]{1,50}$",       // 可中文
    devicetype: "^[1-4]{1,4}$",       //数字
    createdby: "^[a-zA-Z\u4e00-\u9fa5\\s·]{1,50}$",       // 可中文

    createdon: "^[a-zA-Z0-9_@]{1,50}$",       //时间

    special_sql: special_sql, // sql 注入

    linklevel: "^[a-cA-C]{1}$"

}

// 新增试验任务信息！
export const Tesk_Info = {
    special_sql: special_sql, // sql 注入
    tasknum: "^WT[0-9]{4}-[0-9]{6}", // 试验任务编号
    exemplarnumbers: '^YP-[0-9]{4}-[0-9]{6}', // 样件编号
    taskitemnumbers: '^[0-9]{3}', // 试验条目编号
    devicetaskname: "[^0-9]+", // 试验名称
    executor:"[^0-9]+", // 试验执行人

    exemplarchildnumbers: "", // 样件三级编号
    exemplarname: "", // 样件名称
}

// 