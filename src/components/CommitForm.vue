<template>
    <div class="pad-20">
        <vue-form v-if="!submitend" :state="formstate" @submit.prevent="onSubmit" ref="form">
            <div class="pad-bottom-20">您好，请问您有什么{{title}}</div>
            <validate class="field-group" :custom="{validatorName: validatorName}" :class="fieldClassName(formstate.userName)">
                <input type="text" maxlength="10" v-model="model.userName" required name="userName" class="field" placeholder="姓名">
                <field-messages class="error" name="userName" show="$touched || $submitted">
                  <div slot="required">请输入您的姓名</div>
                  <div slot="validatorName">姓名不能超过10个字，请重新输入</div>
                </field-messages>
            </validate>

            <validate class="field-group" :class="fieldClassName(formstate.userContact)">
                <input type="text" maxlength="12" v-model="model.userContact" required name="userContact" class="field" placeholder="电话">
                <field-messages class="error" name="userContact" show="$touched || $submitted">
                  <div slot="required">请输入您的电话</div>
                </field-messages>
            </validate>
     
            <validate class="field-group" :custom="{validatorText: validatorText}" :class="fieldClassName(formstate.content)">
                <textarea class="field" maxlength="30" name="content" required v-model="model.content" cols="30" rows="5" placeholder="请输入30字以内的内容"></textarea>
                <field-messages class="error" name="content" show="$touched || $submitted">
                  <div slot="required">请输入您的内容</div>
                  <div slot="validatorText">内容不能超过30字，请重新输入</div>
                </field-messages>
            </validate>

            <div class="field-group text-center">
                <button class="button submit-btn" type="submit">提交</button>
            </div>
        </vue-form>
        <div v-else class="success-box text-center">
            <p class="pad-top-40"><i class="iconfont icon-xiaolian"></i></p>
            <p>提交成功，非常感谢您的反馈</p>
            <p><button class="button submit-btn" @click="back">返回</button></p>
        </div>
    </div>
</template>

<script>
import api from "@/api";

export default {
  props: ["actions"],
  data() {
    return {
      submitend: false,
      formstate: {},
      model: {
        userName: "",
        userContact: "",
        content: ""
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.formstate.$invalid) {
        return;
      }

      api.setHelp(this.actions, this.model).then(res => {
        const { code, msg, object } = res.data;
        if (code != 0) {
          this.$notify({ group: 'alert', text: msg,  type: 'error'})
          return false
        }

        this.submitend = true
      })
    },
    fieldClassName(field) {
      if (!field) {
        return "";
      }
      if ((field.$touched || field.$submitted) && field.$valid) {
        return "has-success"
      }
      if ((field.$touched || field.$submitted) && field.$invalid) {
        return "has-error"
      }
    },
    back(){
      this.$emit('close')
    },
    validatorText(text){
      return text.length<=30
    },
    validatorName(text){
      return text.length<=10
    }
  },
  computed: {
    title(){
      const actionMap = {
        'help': '咨询',
        'advice': '建议'
      }

      return actionMap[this.actions]
    }
  }
};
</script>

<style scoped lang="scss">
.help-from {
  margin-top: 60px;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 1px 2px 6px 0px #ccc;
}

.field {
  border-radius: 3px;
  &-group {
    padding-bottom: 10px;
  }
}

.submit {
  &-btn {
    background: #fff;
    // font-size: 18px;
    // padding: 10px 80px;
    width: 200px;
    border-radius: 3px;
  }
}

.has-error {
  & > .field {
    border-color: #a94442;
  }
  & > .error {
    color: #a94442;
    padding-top: 3px;
  }
}

.icon-xiaolian{
  font-size: 60px;
}
</style>