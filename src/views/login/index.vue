<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <p>{{ $t('login.logo') }}</p>
          <!-- <img src="~@/assets/images/account-logo.png" alt="" /> -->
        </div>
        <div class="view-account-top-desc">
          <p>{{ $t('login.formTitle') }}</p>
          <!-- <p>title here</p> -->
        </div>
      </div>
      <div class="view-account-form">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.username" :placeholder="$t('login.forms.inputs.username.placeholder')">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              showPasswordOn="click"
              :placeholder="$t('login.forms.inputs.password.placeholder')"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <n-checkbox v-model:checked="autoLogin">{{$t('login.forms.inputs.autologin')}}</n-checkbox>
              </div>
              <!-- <div class="flex-initial order-last">
                <a href="javascript:">{{$t('login.forms.inputs.forgotPassword')}}</a>
              </div> -->
            </div>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              {{$t('login.forms.inputs.loginBtn')}} {{$t('global.title')}}
            </n-button>
          </n-form-item>
          <!-- 其他登录方式 -->
          <!-- <n-form-item class="default-color">
            <div class="flex view-account-other">
              <div class="flex-initial">
                <span>其它登录方式</span>
              </div>
              <div class="flex-initial mx-2">
                <a href="javascript:">
                  <n-icon size="24" color="#2d8cf0">
                    <LogoGithub />
                  </n-icon>
                </a>
              </div>
              <div class="flex-initial mx-2">
                <a href="javascript:">
                  <n-icon size="24" color="#2d8cf0">
                    <LogoFacebook />
                  </n-icon>
                </a>
              </div>
              <div class="flex-initial" style="margin-left: auto">
                <a href="javascript:">注册账号</a>
              </div>
            </div>
          </n-form-item> -->
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { $t } from 'vue-i18n';
import { AddLangMessage, Langs } from '@/utils/langs';
import { reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { useMessage } from 'naive-ui';
import { ResultEnum } from '@/enums/httpEnum';
import { PersonOutline, LockClosedOutline, LogoGithub, LogoFacebook } from '@vicons/ionicons5';
import { PageEnum } from '@/enums/pageEnum';
// import {$t} from '@/main';
interface FormState {
  username: string;
  password: string;
  keepLogin?: boolean;
}

const formRef = ref();


const message = useMessage();
const loading = ref(false);
const autoLogin = ref(true);
const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

const formInline = reactive({
  username: '',
  password: '',
  isCaptcha: true,
});

const rules = {
  username: { required: true, message: Langs.t('message.hello'), trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
};

const userStore = useUserStore();

const router = useRouter();
const route = useRoute();

const handleSubmit = (e) => {
  e.preventDefault();
  formRef.value.validate(async (errors) => {
    if (!errors) {
      const { username, password } = formInline;
      message.loading('登录中...');
      loading.value = true;

      const params: FormState = {
        username: username,
        password: password,
        keepLogin: autoLogin.value,
      };

      try {
        const { code, message: msg } = await userStore.login(params);
        message.destroyAll();
        if (code == ResultEnum.SUCCESS) {
          const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
          message.success('登录成功，即将进入系统');
          if (route.name === LOGIN_NAME) {
            router.replace('/');
          } else router.replace('/');
        } else {
          message.destroyAll();
          message.info('登录失败');
        }
      } catch (ex) {
        message.destroyAll();
        message.error('登录失败');
      } finally {
        loading.value = false;
      }
    } else {
      // message.error('111');
    }
  });
};
onMounted(() => {
  // console.log('loginpage mounted');
});
</script>

<style lang="less" scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 32px 0;
    width: 384px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    background-image: url('../../assets/images/login.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>
