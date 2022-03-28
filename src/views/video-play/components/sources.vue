<template>
  <div class="source-container">
    <a-list :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <icon-font :type="getFileIcon(item.fileType)" />&nbsp;{{
          item.coursewareName + item.fileType
        }}
        <a
          slot="actions"
          @click="download(item.fileUrl, item.coursewareName, item.fileType)"
        >
          <a-icon type="download" /> 下载
        </a>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";
import { documentList } from "../../../api/course";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2802387_ynyz8kpfnlg.js",
});

export default {
  name: "sources",
  components: {
    IconFont,
  },
  props: ["courseId"],
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.getSourceList();
  },
  methods: {
    getSourceList() {
      documentList(this.courseId).then((response) => {
        if (response.code === 200) {
          if (response.data && response.data.coursewareList) {
            this.data = response.data.coursewareList;
          }
        } else {
          this.msgError(response.msg);
        }
      });
    },
    download(url, name, type) {
      const path = url + "?attname=" + name + type;
      console.warn(path);
      window.open(path);
    },
    getFileIcon(type) {
      const dict = {
        ".ppt": "icon-ppt-1",
        ".pptx": "icon-ppt-1",
        ".doc": "icon-word",
        ".docx": "icon-word",
        ".xls": "icon-excel-1",
        ".xlsx": "icon-excel-1",
        ".rar": "icon-yasuobao",
        ".zip": "icon-yasuobao",
        ".7z": "icon-yasuobao",
      };

      if (type in dict) return dict[type];
      else return "icon-wenjianleixing-biaozhuntu-weizhiwenjian";
    },
  },
};
</script>

<style scoped>
.source-container {
  height: 300px;
  overflow: auto;
}

.source-container::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3.5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.source-container::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #9fa0a2;
}

.source-container::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #ededed;
  border-radius: 10px;
}

@media screen and (max-width: 480px) {
  .source-container {
    padding: 0 5px;
  }
}
</style>
