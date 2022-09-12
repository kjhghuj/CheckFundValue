<template>
  <div class="pic">
      <div class="AddressBox">
          <div class="block"></div>
          <div v-show="showText" class="Address" @dblclick="changeAdd('text')">{{address}}</div>
          <div v-show="!showText" class="Address" @dblclick="changeAdd('inp')">
              <input type="text" v-model="address">
          </div>
          <div class="block"></div>
      </div>
      <div class="topTime">{{time}}</div>
      <div class="middleText"></div>
      <div class="bottomTime">{{bottomTime}}</div>
      <div class="popBtn" @click="showPop"></div>
      <div class="step1"></div>
      <div class="step2" @click="showPop(3)"></div>
      <div class="step3" @click="showPop(4)"></div>
      <div class="step4">
          <div class="arror"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {},
  watch: {},
  data() {
      return {
          address:'中科纳能大厦',
          time:'',
          bottomTime:'',
          showText: true
      }
  },
  computed : {},
  created () {},
  mounted () {
      let today = new Date()
      document.getElementById('app').style.padding = '0'
      this.time = today.format("yyyy-MM-dd hh:mm");
      this.bottomTime = new Date(new Date().getTime() - (24*3*60*60*1000)).format('yyyy-MM-dd')+ ' 23:39'
  },
  methods :{  
      changeAdd(){
          this.showText = !this.showText
      },
      showPop(num){
          if(num == 3){
              document.getElementsByClassName('step3')[0].style.display = 'block';
          } else if (num == 4){
              document.getElementsByClassName('step4')[0].style.display = 'block';
          } else {
            document.getElementsByClassName('step1')[0].style.bottom = 0;
            setTimeout(()=>{
                document.getElementsByClassName('step2')[0].style.display = 'block';
            },1000)
          }
      }
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
        user-select: none;
        .AddressBox {
            padding: 0 10%;
            box-sizing: border-box;
            position: absolute;
            width: 100%;
            display: flex;
            justify-content: space-between;
            top: 8.0rem;
            font-size:22px;
            font-weight: 400;
            color: #000;
            font-family: auto;
            .Address {
                background: #fff;
                width:80%;
                text-align: center;
            }
            .block {
                width: 10%;
                background: transparent;
            }
        }
        .topTime{
            position: absolute;
            top: 10.15rem;
            left: 9.4rem;
            font-size:14.3px;
            font-weight: 400;
            background: #fff;
            color: #8a8989;
            font-family: auto;
        }
        .bottomTime {
            position: absolute;
            color: #fff;
            left: 3.5rem;
            bottom:19.5rem;
            font-family: auto;
            font-size:11.5px;
            background:linear-gradient(#004fd7, #0140d3);
            // background:#098316;
            padding: 0 10px;
        }
        img {
            width: 100%;
            height: auto;
            display: inline-block;
        }
        .popBtn{
            width:300px;
            height: 30px;
            // border: 1px solid;
            position: absolute;
            bottom:17rem;
            left:50%;
            margin-left:-150px;
        }
        .step{
            position: absolute;
            width: 100%;
            height: 100%;
            background-size: 100%;
        }
        .step1{
            transition: 0.5s all;
            background:url('./step1.jpg') no-repeat;
            z-index: 2;
            bottom:-100%;
            .step()
        }
        .step2{
            transition: 1s all;
            background:url('./step2.jpg') no-repeat;
            z-index: 3;
            display: none;
            animation-name:fadeIn;
            animation-duration:0.5s;
            .step()
        }
        .step3{
            background:url('./step3.jpg') no-repeat;
            z-index: 4;
            display: none;
            .step()
        }
        .step4{
            background:url('./step4.jpg') no-repeat;
            z-index: 5;
            display: none;
            .step();
            .arror{
                background:url('./arror.jpg') no-repeat;
                background-size: 100%;
                width: 30%;
                height: 30%;
                position: absolute;
                bottom: 9.5rem;
                left: 8.5rem;
                border-radius: 50px 50px;
                animation-name:shousou;
                animation-timing-function:linear;
                animation-duration:1.2s;
                animation-iteration-count:infinite;
            }
        }
        @keyframes fadeIn {
            0%{
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
        @keyframes shousou {
            0%{
                transform: scale(1.1);
            }
            50%{
                transform: scale(1.3,1.3)
                // transform: scaleY(1.5);
            }
            100% {
                transform: scale(1.1);
            }
        }
    }
</style>