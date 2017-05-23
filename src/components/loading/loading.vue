<template>
	<Spin fix size="large" class="loading-bg" style="background-color: transparent">
      <Icon type="load-c" size="22" class="ivu-load-loop"></Icon>
      <div><slot></slot></div>
    </Spin>
</template>

<script>
export default {
	name: 'Loading'
}
</script>
