<template>
    <div>
        <h3>Welcome</h3>
        <TableForm :config="config" @submit="submit" style="margin:20px;"/>
    </div>

</template>

<script>
    import TableForm from "./TableForm";

    const repayTypeList = {
            averageCapital: '等额本金',
            averageInterest: '等额本息'
        },
        columns = [
            {
                prop: 'repaymentMethod',
                label: '还款方式',
                attr: {width: '180'},
                edit: true,
                format: ({repaymentMethod}) => repayTypeList[repaymentMethod]
            },
            {
                prop: 'productPer',
                label: '期数',
                attr: {width: '180'},
                edit: true,
                format: ({productPer}) => `${+productPer + 1}期(${productPer}个月)`
            },
            {
                prop: 'costRate',
                label: '成本利率',
                attr: {minWidth: '110'},
                edit: true,
                type: 'select',
                options: [{label: '5%', value: '5'}, {label: '10%', value: '10'}]
            },
            {prop: 'price', label: '单价', attr: {minWidth: '110'}, edit: true},
            {prop: 'company', label: '所属公司', attr: {minWidth: '110'}, edit: true},
            {
                prop: 'product',
                label: '产品',
                attr: {minWidth: '10'},
                edit: true,
                type: 'checkbox',
                options: [{label: '橘子', value: 'orange'}, {label: '苹果', value: 'apple'}]
            },
            {prop: 'date', label: '日期', attr: {minWidth: '110'}, edit: true, type: 'date', required: false,},
            {prop: 'opt', label: '锁定', attr: {minWidth: '110'}, edit: true, type: 'switch'},
        ];
    export default {
        name: "Welcome",
        components: {
            TableForm,
        },
        data() {
            return {
                config: {
                    columns,
                    data: [],
                },
            }
        },
        created() {
            this.config.data = [
                {
                    repaymentMethod: 'averageCapital',
                    productPer: '1',
                    price: '5',
                    company: '谷歌上海',
                    date: '2021-01-03',
                    opt: false
                },
                {
                    repaymentMethod: 'averageInterest',
                    productPer: '3',
                    costRate: '10',
                    price: '',
                    company: '雅虎北京',
                    opt: true
                },
                {
                    repaymentMethod: 'averageInterest',
                    productPer: '5',
                    costRate: '5',
                    price: '100',
                    company: '上海你真美',
                    opt: false
                },
            ]
        },
        methods: {
            submit(res) {
                console.log(res)
            }
        }
    }
</script>

<style scoped>

</style>