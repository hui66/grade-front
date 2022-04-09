<template>
  <div>
  <el-header :gutter="20">
    <div class="is-center" align="center">
      <h1>学生学情分析</h1>
    </div>
  </el-header><br/>
  <div style="width: auto;height: 400px;align:center" id="main"/>
    <div style="width: auto;height: 400px" id="body">
      <div class="is-center" align="center">
        <h2>该学生需要优先补强的能力降序排序依次为：{{formInline}}</h2>
      </div>
      <br/>
      <br/>
      <div align="center">
        <h2>给您的建议：{{suggest}}</h2>
      </div>
    </div>
  </div>

</template>

<script>
import Vue from 'vue'
import echarts from 'echarts'
import { requestLearnQuery } from '@/api/user'
Vue.prototype.$echarts = echarts

export default {
  name: 'page',
  mounted () {
    // 在通过mounted调用即可
    this.echartsInit()
  },
  data () {
    return {
      formInline: '',
      suggest: '',
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: ['120', '200', '150', '80', '70'],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)'
        }
      }],
      tableData: [],
      rules: {
        param1: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        param2: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0,
      dialogFormVisible: false,
      form: {
        courseName: '',
        courseCode: '',
        index: 0,
        id: 0
      }
    }
  },
  methods: {
    echartsInit () {
      requestLearnQuery().then(res => {
        this.$message({
          message: '查询成功！',
          type: 'success'
        })
        console.log(res.data.yaxis)
        this.xAxis.data = res.data.xaxis
        this.series[0].data = res.data.yaxis
        this.formInline = res.data.learnSuggest
        this.suggest = res.data.word
        this.$echarts.init(document.getElementById('main')).setOption({
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          series: this.series
        })
      })
    }

  }
}
</script>
