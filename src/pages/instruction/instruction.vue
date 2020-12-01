<template>
     <div class="instruction">
    <div class="title">
      <img class="img" :src="src">
      <p class="content content-title">真自律是一款自律神器，将分数作为奖励惩罚手段，提醒对良好行为的关注和强化。</p>
      <p class="content content-title">将生活想象成通关打怪，打败自己的心魔加分，被心魔打败减分。</p>
    </div>
    <p class="little-tip">1、给大家分享一下我一天的记录：</p>
    <p class="content tip"><label class="point">◉</label> 早上7点没有按时起床，减1分，目前-1分；</p>
    <p class="content tip"><label class="point">◉</label> 起床看了10页书，加2分，目前1分；</p>
    <p class="content tip"><label class="point">◉</label> 在地铁上做了一个超难的算法题，加5分，目前6分；</p>
    <p class="content tip"><label class="point">◉</label> 工作刷微博，又分心了，扣2分，目前4分；</p>
    <p class="content tip"><label class="point">◉</label> 午饭吃的绿色蔬菜，忍住没有吃麻辣烫，奖励自己5分，目前9分；</p>
    <p class="content tip"><label class="point">◉</label> 下午碰到了杠精，但是控制住了自己的情绪，没有生气，必须表扬自己，加5分，目前14分；</p>
    <p class="content tip"><label class="point">◉</label> 晚饭没有忍住T_T，还是吃了麻辣烫，罪恶罪恶，减10分，目前4分；</p>
    <p class="content tip"><label class="point">◉</label> 第二天早上按时起床，加1分，目前5分；</p>
    <p class="content prompts">加减多少分没有具体标准，主要看心魔给自己带来的影响，一般控制在1-10分之间。</p>
    <p class="little-tip">2、用什么动力来督促自己坚持记录呢？</p>
    <p class="content prompts">（1）设置相应的奖励</p>
    <p class="content tip"><label class="point">◉</label> 心态的奖励。</br>比如分数越多就会越幸运；凑足3个100分，就能有贵人相助等等。虽然听起来比较幼稚，对我自己而言这种心理暗示对生活还是很有积极意义的~</p>
    <p class="content tip"><label class="point">◉</label> 物质的奖励。</br>比如凑足300分，奖励自己一顿海底捞；够了500分，奖励自己旅游基金1000元等。虽然都是从自己身上薅下的肉，但是生活更有仪式感了~</p>
    <p class="content prompts">（2）减小记录的阻力</p>
    <p class="content tip">将小程序放在微信浮窗里，或者添加到桌面，减小打开程序的步骤，从而减小自己记录的阻力。</p>
    <img class="index-img" :src="src4">
    <p class="little-tip">3、小程序使用介绍</p>
    <p class="content prompts">（1）首页</p>
    <p class="content tip"><label class="point">◉</label> 清零功能：会将当前分数设为0，历史记录不会被清空。</p>
    <p class="content tip"><label class="point">◉</label> 撤销功能：撤销上一步的操作。</p>
    <img class="index-img" :src="src1">
    <p class="content prompts">（2）记录页面</p>
    <p class="content tip"><label class="point">◉</label> 添加备注：备注默认为空，可以点击添加备注。</p>
    <p class="content tip"><label class="point">◉</label> 修改备注：备注添加完成后，可以修改。</p>
    <img class="index-img" :src="src2">
    <p class="content prompts">（3）我的页面</p>
    <p class="content tip"><label class="point">◉</label> 清空记录：清空所有的历史记录，清空后记录不能恢复，谨慎操作~</p>
    <p class="content tip"><label class="point">◉</label> 意见反馈：对于小程序的建议、问题反馈、合作信息等，可以通过这个页面提交。</p>
    <img class="index-img" :src="src3">
    </div>
</template>
<script>
export default {
  data () {
    return {
      src: '../../static/images/littleTip-huang.jpg',
      src1: '../../static/images/index.jpg',
      src2: '../../static/images/record.jpg',
      src3: '../../static/images/me.jpg',
      src4: '../../static/images/share.png'
    }
  }
}
</script>
<style scoped lang="scss">
.instruction {
  .title {
    background:#feb500;
    border-radius: 16rpx;
    font-size: 16px;
    .img {
      width:100%;
      height:120px;
    }
    .content-title {
      padding:4px 20px 10px 20px;
    }
  }
  .content {
    padding:4px 15px;
    font-size: 16px;
    font-weight:bold;
  }
  .little-tip {
    padding:15px 15px 3px 15px;
    font-size: 15px;
    font-weight:bold;
    color: #EA5149;
  }
  .tip {
    font-size: 15px;
    font-weight:normal;
    .point{
      color: #feb600;
    }
  }
  .prompts {
    font-size: 15px;
  }
  .index-img {
    display:block;
    margin:10px auto;
    height:560px;
    border-radius: 10px;
    margin-bottom:30px;
  }
}
</style>