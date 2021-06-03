import { dateformat } from "../../../../../equipment-board/equipment-board";

export const hisSetting = {
    mode: "inline",
    actions: {
      position: "right",
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      display: true,
      perPage: 2,
    },
    columns: {
      no: {
        title: "试验编号",
        filter: false,
      },
      entry: {
        title: "试验名称",
        filter: false,
      },
      executor: {
        title: "执行人",
        filter: false,
      },
      l_no: {
        title: "样件编号",
        filter: false,
        valuePrepareFunction:(value) => {
          return value? value.map(m => m.key).join(','):'';
        },
      },
      l_name: {
        title: "样件名称",
        filter: false,
        valuePrepareFunction:(value) => {
          return value? value.map(m => m.value).join(','):'';
        },
      },
      e_context: {
        title: "设备信息",
        filter: false,
      },
      createTime: {
        title: "创建时间",
        filter: false,
        valuePrepareFunction:(value) => {
          return dateformat(new Date(Date.parse(value)),'yyyy年MM月dd日hh时');
        },
        sort: true,
        sortDirection: 'desc'
      },
    }
}