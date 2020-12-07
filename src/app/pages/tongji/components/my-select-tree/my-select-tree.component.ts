import { Component, OnInit, Input } from '@angular/core';
declare let $;
declare let layui;

@Component({
  selector: 'ngx-my-select-tree',
  templateUrl: './my-select-tree.component.html',
  styleUrls: ['./my-select-tree.component.scss']
})
export class MySelectTreeComponent implements OnInit {
  @Input("placeholder")placeholder:any;

  // 下拉 icon
  xialaicon = "arrow-ios-downward-outline"
  placeholder_title;
  select_type = [];

  // el5
  el5;

  constructor() { 
    
  }

  


  ngOnInit(): void {
    // 科室/功能组
    var data =  [
        {
            "id": 1,
            "label": "安徽省",
            "children": [
                {
                    "id": 2,
                    "label": "马鞍山市",
                    "disabled": false,
                    "children": [
                        {
                            "id": 3,
                            "label": "和县"
                        },
                        {
                            "id": 4,
                            "label": "花山区",
                            "checked": false
                        }
                    ]
                },
                {
                    "id": 22,
                    "label": "淮北市",
                    "children": [
                        {
                            "id": 23,
                            "label": "濉溪县"
                        },
                        {
                            "id": 24,
                            "label": "相山区",
                            "checked": false
                        }
                    ]
                }
            ]
        },
        {
            "id": 5,
            "label": "河南省",
            "children": [
                {
                    "id": 6,
                    "label": "郑州市"
                }
            ]
        },
        {
            "id": 10,
            "label": "江苏省",
            "children": [
                {
                    "id": 11,
                    "label": "苏州市"
                },
                {
                    "id": 12,
                    "label": "南京市",
                    "children": [
                        {
                            "id": 13,
                            "label": "姑苏区"
                        },
                        {
                            "id": 14,
                            "label": "相城区"
                        }
                    ]
                }
            ]
        }
    ];
    // this.init_select_tree(this.groups);
  }
  
  ngAfterViewInit(){
    this.placeholder_title = this.placeholder;
    $("[name='title']").attr("placeholder", this.placeholder_title);
    $(".tree_isShow").hide();
  }
  
  // 下拉树示例
  init_select_tree(data){
    var that = this;
    // data存在-显示，否则不显示
    if(data.length >0){
      $(".tree_isShow").show()
    }else{
      // $(".tree_isShow").hide()
    }
    var el5;
    layui.use(['eleTree',],function(){
      var eleTree = layui.eleTree;
      $("[name='title']").on("click",function (e) {
        
        if (that.xialaicon === "arrow-ios-upward-outline"){
          that.xialaicon = "arrow-ios-downward-outline"
        }else{
          that.xialaicon = "arrow-ios-upward-outline";
        }

        e.stopPropagation();
        if(!el5){
          el5=eleTree.render({
            elem: '.ele5',
            data: data,
            defaultExpandAll: false,
            showCheckbox: true,
            expandOnClickNode: false,
            highlightCurrent: true,
            defaultCheckedKeys: [], // 默认勾选
            checkOnClickNode: true, // 点击节点时选中节点！
          });
          that.el5 = el5;
        }
        $(".ele5").toggle();
      })
      
      // 节点被选择
      var select_data = []; //[{id: 3, label: "nvh"},]
      var select_label_list = [];
      eleTree.on("nodeChecked(data5)",function(d) {
        console.log(d.data);    // 点击节点对应的数据 
        console.log(d.isChecked);   // input是否被选中
        // -----------------多选，科室功能组
        if (d.isChecked){
          select_data.push(d.data.currentData);// {id: 3, label: "nvh"}
          select_label_list.push(d.data.currentData.label);
          that.select_type.push(d.data.currentData.id);
        }else{
          var index = select_label_list.indexOf(d.data.currentData.label);
          if( index != -1){
            select_label_list.splice(index, 1); // 删除取消的
            that.select_type.splice(index, 1);
          }
        }
        $("[name='title']").val(select_label_list.join(';'));

        // console.log(d.node);    // 点击的dom节点
        // console.log(this);      // input对应的dom
    })
    $(document).on("click",function() {
          $(".ele5").hide();
          that.xialaicon = "arrow-ios-downward-outline";
      })
    })
  }
  

  getselect(){
    return $("[name='title']").val();
  }
  // 删除选择的
  delselect(){
    $("[name='title']").val("");
    this.select_type = [];
  }
  // 清空下拉数据
  dropselect(){
    this.delselect();
    this.el5.unCheckNodes() //取消所有选中的节点
  }

  

}
