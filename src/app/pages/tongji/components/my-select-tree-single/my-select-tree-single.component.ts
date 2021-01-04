import { Component, OnInit, Input } from '@angular/core';
declare let $;
declare let layui;
@Component({
  selector: 'ngx-my-select-tree-single',
  templateUrl: './my-select-tree-single.component.html',
  styleUrls: ['./my-select-tree-single.component.scss']
})
export class MySelectTreeSingleComponent implements OnInit {
  @Input("placeholder")placeholder:any;

  // 下拉 icon
  xialaicon = "arrow-ios-downward-outline"
  placeholder_title;

  // el5
  single_tree_el5s;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.placeholder_title = this.placeholder;
    $("[name='single_tree_title']").attr("placeholder", this.placeholder_title);
    // $(".tree_isShow").hide();
  }
  ngOnDestroy(){
    this.dropselect();
  }
  

  tree_data; // 树结构数据
  // 下拉树示例
  init_select_tree(data){
    var that = this;
    that.tree_data = data;
    var single_tree_el5s;
    layui.use(['eleTree',],function(){
      var eleTree = layui.eleTree;
      $("[name='single_tree_title']").on("click",function (e) {
        if (that.xialaicon === "arrow-ios-upward-outline"){
          that.xialaicon = "arrow-ios-downward-outline"
        }else{
          that.xialaicon = "arrow-ios-upward-outline";
        }
        e.stopPropagation();
        if(!single_tree_el5s){
          single_tree_el5s=eleTree.render({
            elem: '.single_tree_ele5',
            data: data,
            defaultExpandAll: false,
            showCheckbox: false,
            expandOnClickNode: false,
            highlightCurrent: true,
            // defaultCheckedKeys: [], // 默认勾选
            // defaultCheckedKeys: that.defaultCheckedKeys, // 默认勾选
            checkOnClickNode: true, // 点击节点时选中节点！
          });
          that.single_tree_el5s = single_tree_el5s;
        }
        $(".single_tree_ele5").toggle();
      })
      
      // 节点被选择
      // var select_data = that.select_data; //[{id: 3, label: "nvh"},]
      // var select_label_list = that.select_label_list;
      eleTree.on("nodeClick(single_tree_data5)",function(d) {
        console.error("select_data",d.data.currentData)
        $("[name='single_tree_title']").val(d.data.currentData.label);
        $(".single_tree_ele5").hide();
    })
    $(document).on("click",function() {
          $(".single_tree_ele5").hide();
          that.xialaicon = "arrow-ios-downward-outline";
      })
    })
  }
  
  getselect(){
    return $("[name='single_tree_title']").val();
  }
  // 删除选择的
  delselect(){
    $("[name='single_tree_title']").val("");
  }
  // 清空下拉数据
  dropselect(){
    this.delselect();
    console.log("清空下拉数据",$("[name='single_tree_title']").val());
    var select = this.single_tree_el5s?.getChecked();
    this.single_tree_el5s?.reload({data:this.tree_data}); // 重新加载树
    // this.single_tree_el5s?.unCheckNodes() //取消所有选中的节点

  }

}
