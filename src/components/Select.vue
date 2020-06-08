<template>
    <v-touch class="select" :class="{'active': !hideOption}" @tap="toggleDropdown()">
        <span class="input">{{inputText}}</span>
        <div class="options">
            <ul>
                <li v-for="(item, index) in options" @click="select(item)">{{item.label}}</li>
            </ul>
        </div>
        <div class="select-bg" :class="{'none': hideOption}"></div>
    </v-touch>
</template>

<script>
export default {
    props: ['options', 'value', 'placeholder'],
    data() {
        return {
            hideOption: true
        }
    },
    computed: {
        inputText() {
            const { value, options, placeholder } = this
            const valObj = options.filter(item => {
                console.log(value)
                return item.value === value
            })[0]

            return valObj ? valObj.label : placeholder
        }
    },
    methods: {
        select(option) {
            this.hideOption = true
            this.$emit('change', option.value)
        },
        toggleDropdown() {
            this.hideOption = !this.hideOption
        }
    }
}
</script>

<style lang="scss" scoped>
$primary: #168c74;

.select {
    border: 1px solid #ccc;
            cursor: pointer;    
    display: inline-block;
    border-radius: 20px;
    text-align: center;
    position: relative;
    height: 40px;
    &::before{
        right: 15px;
    }
    &.active{
        border-radius: 20px 20px 0 0;
        box-shadow: 0 0 5px rgba(0,0,0,0.2);
        // height: 42px;
        // border:none;
        &>.options{
            display: block
        }
    }

    &-bg{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1;
        // touch-action: none
    }
}

.input {
    // padding: 10px 50px;
    height: 40px;
    line-height: 40px;
    width:200px;
    display: inline-block;
    font-size: 16px;
    padding-right: 15px;
}

.options{
    // touch-action: none;
    max-height: 300px;
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 38px;
    display: none;
    border-top: none;
    list-style: none;
    margin: 0;
    width: 100%;
    padding: 10px 0 10px 0;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
    z-index: 10;
    background: #fff;
    border-radius: 0 0 20px 20px;
    &::before{
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 10px;
        top: -4px;
        background: #fff;
    }
    &>ul{
        list-style:none;
        margin:0;
        padding: 0;
        &>li{
            padding: 5px;
            &:hover{
                color:$primary
            }
        }
    }
}
</style>