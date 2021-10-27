<template>
  <el-form :model="form" ref="form" size="small">
    <el-form-item v-if="!isDetail">
      <el-button type="primary" @click="add">新增</el-button>
    </el-form-item>
    <el-table :data="form.list" border>
      <el-table-column v-for="x in columns" :key="x.prop" :label="x.label" :prop="x.prop" v-bind="x.attr">
        <template slot-scope="{row, $index}">
          <t-text v-if="!x.edit" :row="{x, row}" />
          <template v-else>
            <t-text v-if="isDetail" :row="{x, row}" />
            <t-input v-else v-model="row[`${x.prop}`]" v-bind="componentAttrs(x, $index)" class="width100" />
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-form-item v-if="!isDetail" style="margin-top:18px;">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {config: Object},
  computed: {
    isDetail(){
      const { isDetail = false } = this.config || {}
      return isDetail
    }
  },
  components: {
    TInput: {
      functional: true,
      props: ['prop', 'rules', 'type', 'options'],
        // eslint-disable-next-line no-undef
      render: (h, {props: { prop, rules, type, options = [] }, data, listeners: {input = _.identity}}) => {
        const children = h => {
          if(type == 'select') return h('el-select', {class: 'width100', props: {...data.attrs}, on: {change(v){input(v)}}}, options.map(o => h('el-option', {props: {...o, key: o.value}})))
          else if(type == 'checkbox') return h('el-checkbox-group', {props: {...data.attrs}, on: {input(v) {input(v)}}}, options.map(o => h('el-checkbox', {props: {...o, label: o.value, key: o.value}}, [o.label])))
          else if(type == 'switch') return h('el-switch', {props: {activeColor: '#13ce66'}, ...data})
          else if(type == 'date') return h('el-date-picker', {props: {type: 'date', valueFormat: 'yyyy-MM-dd',}, ...data})
          return h('el-input', data)
        }

        return h('el-form-item', {props: {prop, rules}}, [children(h)])
      }
    },
    TText: {
      functional: true,
      props: ['row'],
      render: (h, {props: { row: { x, row } }}) => {
        if(!row[`${x.prop}`]) return h('span', '-')
        else if(x.format && typeof x.format == 'function') return h('span', x.format(row))
        else return h('span', row[`${x.prop}`])
      }
    },
  },
  data(){
    const { columns = [], data = [] } = this.config || {}
    return {
      form: {
        list: (data && data.length > 0) ? data.map(n => columns.reduce((r, c) => ({...r, [c.prop]: n[c.prop] == false ? n[c.prop] : (n[c.prop] || (c.type == 'checkbox' ? [] : ''))}), {})) : [columns.reduce((r, c) => ({...r, [c.prop]: c.type == 'checkbox' ? [] : (c.type == 'switch' ? false : '')}), {})]
      },
      columns,
      rules: columns.reduce((r, c) => ({...r, [c.prop]: { required: c.required == false ? false : true, message: c.label + '必填'}}), {})
    }
  },
  methods: {
    componentAttrs(item, idx){
      const {type, label} = item, attrs = Object.fromEntries(Object.entries(item).filter(n => !/^(prop|edit|label|attr|format)/.test(n[0]))),
      placeholder = (/^(select|el-date-picker)/.test(type) ? '请选择' : '请输入') + label
      Object.assign(attrs, {prop: `list.${idx}.${item.prop}`, rules: this.rules[item.prop]})
      return {...attrs, placeholder}
    },
    add(){
      const { columns = [] } = this.config || {}, obj = columns.reduce((r, c) => ({...r, [c.prop]: c.type == 'checkbox' ? [] : (c.type == 'switch' ? false : '')}), {})
      this.form.list.push(obj)
    },
    submit(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form.list)
        }
      })
    },
    reset(){
      this.$refs.form.resetFields();
    },
  }
}
</script>
<style scoped>
.width100{width: 100%;}
</style>