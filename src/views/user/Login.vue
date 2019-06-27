<template>
  <div class="main">
    <!-- test -->
    <!-- <a-input v-model="hello"></a-input> -->
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="账号密码登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="账户：admin"
              v-decorator="[
                'username',
                { rules:
                  [{
                    required: true, message: '请输入账户名或邮箱地址'
                  },
                  {
                    validator: handleUsernameOrEmail
                  }],
                  validateTrigger: 'change'
                }
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"></a-icon>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码：admin or ant.design"
              v-decorator="[
                'password',
                { rule: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur' }
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"></a-icon>
            </a-input>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane key="tab2" tab="手机号登录">
          <a-form-item>
            <a-input size="large" type="text" placeholder="手机号"
              v-decorator="[
                'mobile',
                { rule: [{ required: true, pattern: /^1[3578]\d{9}$/,
                  message: '请输入你的手机号' }], validateTrigger: 'chnage' }
              ]" >
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"></a-icon>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input size="large" type="text" placeholder="验证码"
                  v-decorator="[
                    'captcha', { rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur' }
                  ]"
                >
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"></a-icon>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptche"
                tabindex="-1"
                size="large"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptche"
                v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
              ></a-button>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
        <router-link
          :to="{ name: 'about', params: { user: 'aaa' } }"
          class="forge-password"
          style="float: right;">
          忘记密码
        </router-link>
      </a-form-item>

      <a-form-item>
        <a-button
          class="login-button"
          size="large"
          type="primary"
          htmlType="submit"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定
        </a-button>
      </a-form-item>

    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { timeFix } from '@/utils/util';
import md5 from 'md5';

const User = namespace('user');

declare global {
  interface Window { UserLoginVM: any; }
}
window.UserLoginVM = window.UserLoginVM || {};

@Component
export default class UserLogin extends Vue {

  @User.Action('Login') public Login: any
  @User.Action('Logout') public Logout: any

  public customActiveKey: string = 'tab1';
  public loginBtn: boolean = false;
  // login type: 0 email, 1 username, 2 telephone
  public loginType: number = 0;
  public form: any = null;
  // public form: any = this.$form.createForm(this);
  // 如果 state: object = { loginType: 0 } 后面 state.loginType = 1 则报错 说 loginType 不在 object 上？？？
  public state: any = {
    time: 60,
    loginBtn: false,
    loginType: 0,
    smsSendBtn: false,
  }
  // test property variable
  /**
   * undefined 将不会被响应
   * 为了让 Babel 和 TypeScript 的装饰器行为保持一致 如果一个属性的初始值是 undefined，那么 vue-class-component 不会使其产生响应性。
   * 应该用 null 作为初始值 替代，或者使用 data 钩子来初始化化
   */
  public foo = undefined;

  constructor() {
    super(...arguments);
    window.UserLoginVM = this;
  }

  public handleUsernameOrEmail(rule: any, value: string, callback: any) {
    const { state } = this;
    const regex = /^(a-zA-Z0-9_-)+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if (regex.test(value)) {
      state.loginType = 0;
    } else {
      state.loginType = 1;
    }
    callback();
  }

  public handleTabClick(key: string) {
    this.customActiveKey = key;
  }

  public handleSubmit(e: Event) {
    e.preventDefault();
    const {
      form: { validateFields },
      state,
      customActiveKey,
      Login,
    } = this;

    state.loginBtn = true;

    const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha'];

    // 这里 err, values 类型 ？？
    validateFields(validateFieldsKey, { force: true }, (err: any, values: any) => {
      if (!err) {
        console.log('login form', values);
        const loginParams = { ...values };
        loginParams[!state.loginType ? 'email' : 'username'] = values.username
        loginParams.password = md5(values.password);
        Login(loginParams)
          .then((res: any) => this.loginSuccess(res))
          .catch((error: Error) => this.requestFailed(error))
          .finally(() => {
            state.loginBtn = false;
          })
      } else {
        setTimeout(() => {
          state.loginBtn = false;
        }, 600);
      }
    })
  }


  public loginSuccess(res: any) {
    console.log(res);
    this.$router.push({ name: 'about' });

    setTimeout(() => {
      this.$notification.success({
        message: '欢迎',
        description: `${timeFix()}, 欢迎回来`,
      })
    }, 1000)
  }

  public requestFailed(err: any) {
    this.$notification.error({
      message: '错误',
      description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
      duration: 4
    })
  }

  // class-based 类型 不支持 data
  private data() {
    return {
      hello: 'hello',
    }
  }
  // Lifecycle hook
  private created() {
    this.form = this.$form.createForm(this);
  }
}
</script>
