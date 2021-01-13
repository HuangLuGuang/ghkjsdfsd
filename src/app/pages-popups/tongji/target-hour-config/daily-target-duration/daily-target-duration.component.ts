import { Component, OnInit,Input } from '@angular/core';
declare let $;
declare let layui;
@Component({
  selector: 'ngx-daily-target-duration',
  templateUrl: './daily-target-duration.component.html',
  styleUrls: ['./daily-target-duration.component.scss']
})
export class DailyTargetDurationComponent implements OnInit {
  @Input("placeholder")placeholder:any;
  // 下拉 icon
  xialaicon = "arrow-ios-downward-outline"
  placeholder_title;


  // el5
  daily_target_duration_el5s;

  constructor() { }

  ngOnInit(): void {
    var data = [
      {id: 8, label: "8h"},
      {id: 12, label: '12h'},
      {id: 16, label: '16h'},
      {id: 24, label: '24h'},
    ]
    this.init_select_tree(data);
  }

  ngAfterViewInit(){
    this.placeholder_title = this.placeholder;
    $("[name='daily_target_duration_title']").attr("placeholder", this.placeholder_title);
    $("[name='daily_target_duration_title']").val("8h");
  }
  ngOnDestroy(){
    this.reset_month();
  }
  tree_data; // 树结构数据
  // 下拉树示例
  init_select_tree(data){
    var that = this;
    that.tree_data = data;
    var daily_target_duration_el5s;
    layui.use(['eleTree',],function(){
      var eleTree = layui.eleTree;
      $("[name='daily_target_duration_title']").on("click",function (e) {
        if (that.xialaicon === "arrow-ios-upward-outline"){
          that.xialaicon = "arrow-ios-downward-outline"
        }else{
          that.xialaicon = "arrow-ios-upward-outline";
        }
        e.stopPropagation();
        if(!daily_target_duration_el5s){
          daily_target_duration_el5s=eleTree.render({
            elem: '.daily_target_duration_ele5',
            data: data,
            defaultExpandAll: false,
            showCheckbox: false,
            expandOnClickNode: false,
            highlightCurrent: true,
            // defaultCheckedKeys: [], // 默认勾选
            // defaultCheckedKeys: that.defaultCheckedKeys, // 默认勾选
            checkOnClickNode: true, // 点击节点时选中节点！
          });
          that.daily_target_duration_el5s = daily_target_duration_el5s;
        }
        $(".daily_target_duration_ele5").toggle();
      })
      
      // 节点被选择
      // var select_data = that.select_data; //[{id: 3, label: "nvh"},]
      // var select_label_list = that.select_label_list;
      eleTree.on("nodeClick(daily_target_duration_data5)",function(d) {
        console.error("select_data",d.data.currentData)
        $("[name='daily_target_duration_title']").val(d.data.currentData.label);
        $(".daily_target_duration_ele5").hide();
    })
    $(document).on("click",function() {
          $(".daily_target_duration_ele5").hide();
          that.xialaicon = "arrow-ios-downward-outline";
      })
    })
  }

  getselect(){
    return $("[name='daily_target_duration_title']").val();
  }
  // 删除选择的
  delselect(){
    $("[name='daily_target_duration_title']").val("8h");
  }
  // 清空下拉数据
  reset_month(){
    this.delselect();
    // console.log("清空下拉数据",$("[name='daily_target_duration_title']").val());
    var select = this.daily_target_duration_el5s?.getChecked();
    this.daily_target_duration_el5s?.reload({data:this.tree_data}); // 重新加载树
    // this.daily_target_duration_el5s?.unCheckNodes() //取消所有选中的节点

  }

}
