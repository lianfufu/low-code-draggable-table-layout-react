export default {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 37.5, // 1rem = 37.5px
            propList: ['*'], // 所有属性都转换
            unitPrecision: 8, // 转换后保留的小数位数
        },
    },
};