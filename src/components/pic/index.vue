<template>
  <div class="pic">
      <div class="topTime">{{time}}</div>
      <div class="middleText"></div>
      <div class="bottomTime">{{time}}</div>
      <!-- <img src="hesuan.jpg" alt=""> -->
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {},
  watch: {},
  data() {
      return {
          time:''
      }
  },
  computed : {},
  created () {},
  mounted () {
      document.getElementById('app').style.padding = '0'
      this.time = new Date().format("yyyy-MM-dd hh:mm");
  },
  methods :{  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='less' scoped>
    .pic{
        position: fixed;
        top:0;bottom:0;left:0;right:0;
        background: url('./hesuan.jpg') no-repeat;
        background-size: 100%;
        .topTime{
            position: absolute;
            top: 7.3rem;
            left: 14.52rem;
            font-size:14px;
            font-weight: 900;
            background: #e7f8e6;
            color: #2a362bd9;
        }
        .bottomTime {
            position: absolute;
            color: #fff;
            left: 3.3rem;
            bottom:15.75rem;
            font-weight: 600;
            font-size:11.5px;
            background:#24acf4;
            padding: 0 10px;
        }
        img {
            width: 100%;
            height: auto;
            display: inline-block;
        }
    }
</style>