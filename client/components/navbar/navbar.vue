<template>
  <div id="navbar" class="ui fixed inverted blue menu">
    <!-- phone navbar -->
    <div class="ui grid container">
      <div class="mobile tablet only row">
        <div class="ui borderless inverted fluid blue menu">
          <button id="btnSidebarToggle" class="ui icon blue item button">
            <i class="content icon"></i>
          </button>
          <a href="/home" class="item" @click.prevent="goHome">{{$t('common.jakduk')}}</a>
          <div class="right menu">
            <a v-if="isAuthenticated" class="icon item logon">
              <div class="ui rounded image avatar nomargin">
                <img :src="avatarSrc(myProfile.picture)" class="nomargin">
              </div>
              <profile-menu></profile-menu>
            </a>
            <a v-else :href="'/login?redir=' + encodeURIComponent($route.fullPath)" class="icon item">
              <i class="sign in icon"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- desktop navbar -->
      <div class="computer only row">
        <div class="ui container">
          <div class="ui borderless inverted fluid blue menu">
            <a href="/home" class="header item" @click.prevent="goHome">{{$t('common.jakduk')}}</a>
            <div class="right menu">
              <div class="ui simple dropdown item">
                <i class="globe icon"></i> {{$t('common.language')}}
                <i class="dropdown icon"></i>
                <div class="menu">
                  <a :href="langPath + 'ko'" class="item"><i class="kr flag"></i> {{$t('common.language.korean')}}</a>
                  <a :href="langPath + 'en'" class="item"><i class="us flag"></i> {{$t('common.language.english')}}</a>
                </div>
              </div>
              <a v-if="isAuthenticated" class="icon item logon">
                <div class="ui rounded image avatar nomargin">
                  <img :src="avatarSrc(myProfile.picture)" class="nomargin">
                </div>
                <profile-menu></profile-menu>
              </a>
              <a v-else :href="'/login?redir=' + encodeURIComponent($route.fullPath)" class="item">{{$t('common.login')}}</a>
              <search-input v-model="searchKeyword" @on-enter="onSearchEnter" class="ui search item"></search-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  #navbar {
    box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12), 0 2px 10px 0 rgba(34, 36, 38, 0.15);
  }

  #navbar > div {
    padding: 0;
  }

  #navbar .popup .item {
    color: black;
  }

  #navbar .item.logon {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>

<script>
  import $ from 'jquery';
  import {mapState} from 'vuex';
  import ProfileMenu from '../profile_menu/profile_menu.vue';
  import SearchInput from '../search_input/search_input.vue';

  export default {
    data() {
      return {
        langPath: window.location.pathname,
        searchKeyword: ''
      };
    },
    mounted() {
      const $el = $(this.$el);

      $el.find('.logon.item').each((index, item) => {
        $(item).popup({
          popup: $(item).find('.popup'),
          position: 'bottom right',
          on: 'click'
        });
      });

      $el.find('#btnSidebarToggle').click(() => {
        $('#phoneSidenav').sidebar('toggle');
      });
    },
    computed: mapState(['myProfile', 'isAuthenticated']),
    watch: {
      $route(to, from) {
        const langQueryRegexp = /([?&])?lang=[^&]+/g;

        if (to.fullPath.match(langQueryRegexp)) {
          this.langPath = to.fullPath.replace(langQueryRegexp, (matched, $1) => `${$1}lang=`);
        } else {
          this.langPath = `${to.fullPath}${to.fullPath.lastIndexOf('?') !== -1 ? '&' : '?'}lang=`;
        }

        if (to.path === '/search') {
          this.searchKeyword = to.query.q;
        }
      }
    },
    methods: {
      onSearchEnter(keyword) {
        this.$router.push({
          name: 'search',
          query: {
            q: keyword,
            w: 'ARTICLE;COMMENT;GALLERY',
            from: 0,
            size: 3
          }
        });
      },
      goHome() {
        if (this.$route.name === 'home') {
          location.href = '/home';
        } else {
          this.$router.push({
            name: 'home'
          });
        }
      }
    },
    components: {
      'search-input': SearchInput,
      'profile-menu': ProfileMenu
    }
  };

</script>
