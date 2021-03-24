// sql注入和特殊字符
export const special_sql = {
  special_str: /^[^`~!@$%&*?<>/\\|=+^{}\[\]\'\"【】‘’￥——、，。；：？《》！]*$/i,
  special_sql: /(\band\b)|(\bor\b)|(\bDELETE\b)|(\bUPDATE\b)|(\bINSERT\b)|(\bEXEC\b)|(\bEXECUTE\b)|(\blike\b)|(\bselect\b)|(\bset\b)|(\bcreate\b)|(\btable\b)|(\bexec\b)|(\bdeclare\b)|(\bmaster\b)|(\bbackup\b)|(\bmid\b)|(\bcount\b)|(\badd\b)|(\balter\b)|(\bdrop\b)|(\bfrom\b)|(\btruncate\b)|(\bunion\b)|(\bjoin\b)|(\script\b)|(\balert\b)|(\blink\b)/gi,
};

// 规则验证
export const Rule = {
  keyword: "^[a-zA-Z0-9_]$", // 可中文 关键词
  newmessage: "^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]$", // 可中文 自定义报警规则
  special_sql: special_sql, // sql 注入
};
