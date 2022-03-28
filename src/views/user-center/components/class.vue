<template>
  <div>
    <h2>班级信息</h2>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="加入班级">
        <join-class />
      </a-tab-pane>
      <a-tab-pane key="2" tab="我的班级">
        <my-class />
      </a-tab-pane>
      <a-tab-pane key="3" tab="我的申请">
        <my-apply />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import JoinClass from "./JoinClass";
import MyClass from "./MyClass";
import MyApply from "./MyApply";

export default {
  name: "class",
  components: { MyApply, MyClass, JoinClass },
};
</script>

<style scoped></style>
