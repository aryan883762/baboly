<template>
  <div
    id="event-details-page"
    class="container"
  >
    <div
      v-if="event"
      class="vx-row flex-col-reverse lg:flex-row"
    >
      <div class="vx-col w-full xl:w-7/10 lg:w-2/3 mb-base p-0 pr-5">
        <div class="profile-pan">
          <!-- PROFILE HEADER -->
          <div class="profile-header">
            <div class="relative">
              <div class="cover-container rounded-t-lg">
                <img
                  :src="userInfo && userInfo.cover_img || img"
                  alt="user-profile-cover"
                  class="responsive rounded-t-lg -mb-2"
                >
              </div>
              <div class="profile-img-container pointer-events-none">
                <div class=" filled bg-secondary p-2 md:p-3 text-center rounded text-white">
                  <p class="md:text-lg">
                    {{ event.startTime | moment('MMM') }}
                  </p>
                  <p class="md:text-2xl sm:font-medium">
                    {{ event.startTime | moment('DD') }}
                  </p>
                  <p class="md:text-lg">
                    {{ event.startTime | moment('ddd') }}
                  </p>
                </div>
                <div class="profile-actions pointer-events-auto flex">
                  <vs-button
                    icon-pack="feather"
                    radius
                    icon="icon-edit-2"
                  />
                  <vs-button
                    icon-pack="feather"
                    radius
                    icon="icon-settings"
                    class="ml-2 lg:ml-4"
                  />
                </div>
              </div>
            </div>
            <div
              class="flex items-center justify-end flex-wrap profile-header-nav p-6 pb-0"
            >
              <div class="block sm:hidden">
                <feather-icon
                  icon="AlignJustifyIcon"
                  class="vx-navbar-toggler cursor-pointer"
                  @click="isNavOpen = !isNavOpen"
                />
                <feather-icon
                  v-show="isNavOpen"
                  icon="XIcon"
                  class="vx-navbar-toggler cursor-pointer"
                  @click="isNavOpen = !isNavOpen"
                />
              </div>
              <div
                :class="isNavOpen ? 'block' : 'hidden'"
                class="w-10 flex-grow sm:flex sm:items-center sm:w-auto"
              >
                <div class="flex w-full mb-4">
                  <div class="w-1/3">
                    <div class="flex">
                      <div class="mr-3">
                        <vs-avatar
                          class="m-0"
                          :src="img"
                          size="47px"
                        />
                      </div>
                      <div class="leading-tight">
                        <p class="font-medium text-sm text-black pb-1">
                          Raees Clifford
                        </p>
                        <span class="text-xs pl-1">(Hosted by)</span>
                      </div>
                    </div>
                  </div>
                  <div class="w-2/3">
                    <ul
                      class="sm:flex justify-around mt-8 w-full md:mt-0 md:ml-auto md:w-2/5"
                    >
                      <li class="p-2 sm:p-0">
                        <router-link
                          to="/pages/profile"
                          class="text-sm"
                        >
                          About
                        </router-link>
                      </li>
                      <li class="p-2 sm:p-0">
                        <router-link
                          to="/pages/profile"
                          class="text-sm"
                        >
                          Photos
                        </router-link>
                      </li>
                      <li class="p-2 sm:p-0">
                        <router-link
                          to="/pages/profile"
                          class="text-sm"
                        >
                          Videos
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- <vx-navbar> -->
            <!-- </vx-navbar> -->
          </div>
        </div>
        <div>
          <div>
            <div class="m-4">
              <vs-row class="pb-3">
                <span class="text-lg text-black">{{ event.title }}</span>
              </vs-row>
              <vs-row>
                <span class="text-sm"> {{ event.description }} </span>
                <p class="read-more text-base text-black font-medium pt-3">
                  Read more
                </p>
              </vs-row>
              <vs-row>
                <div class="flex w-full mb-4 mt-6">
                  <div class="w-2/3">
                    <div class="ml-0 vx-row w-full mt-0">
                      <vs-button
                        class="mr-2 white-btn"
                        size="small"
                        type="filled"
                      >
                        Music
                      </vs-button>
                      <vs-button
                        class="mr-2 white-btn"
                        size="small"
                        type="filled"
                      >
                        rock
                      </vs-button>
                      <vs-button
                        class="mr-2 white-btn"
                        size="small"
                        type="filled"
                      >
                        hardcore punk
                      </vs-button>
                      <vs-button
                        class="mr-2 white-btn"
                        size="small"
                        type="filled"
                      >
                        pop
                      </vs-button>
                      <vs-button
                        class="mr-2 white-btn"
                        size="small"
                        type="filled"
                      >
                        metal
                      </vs-button>
                    </div>
                  </div>
                  <div class="w-1/3">
                    <div class="flex items-center">
                      <div class="flex items-center">
                        <feather-icon
                          class="mr-2"
                          icon="HeartIcon"
                          svg-classes="h-5 w-5"
                        />
                        <span>145</span>
                      </div>
                      <ul class="users-liked user-list ml-3 sm:ml-6">
                        <li
                          v-for="(user, userIndex) in (userPosts.length && userPosts[0].usersLiked || [])"
                          :key="userIndex"
                        >
                          <vx-tooltip
                            :text="user.name"
                            position="bottom"
                          >
                            <vs-avatar
                              :src="user.img"
                              size="30px"
                              class="border-2 border-white border-solid -m-1"
                            />
                          </vx-tooltip>
                        </li>
                      </ul>
                      <small class="ml-2">+{{ 5 }} more</small>
                    </div>
                  </div>
                </div>
              </vs-row>
              <vs-row>
                <div class="comments-container mt-4 w-full">
                  <div class="flex mb-3">
                    <div class="w-11/12 pr-2 comment-section-textarea">
                      <vs-textarea
                        v-model="commentBox"
                        v-validate="'required'"
                        name="commentBox"
                        type="email"
                        class="mb-2 comment-textarea"
                        placeholder="Type your comment..."
                      />
                      <feather-icon
                        class="mr-2"
                        icon="PaperclipIcon"
                        svg-classes="h-5 w-5"
                      />
                    </div>
                    <div class="w-auto">
                      <vs-button
                        size="normal"
                        color="secondary"
                        type="filled"
                        @click="onCreatePost"
                      >
                        Send
                      </vs-button>
                    </div>
                  </div>
                </div>
              </vs-row>
            </div>
          </div>
        </div>
        <!--Coments -->
        <!-- <Comments /> -->
        <vx-card
          v-for="(post, index) in userPosts"
          :key="index"
          class="mt-base"
        >
          <div>
            <!-- POST HEADER -->
            <div class="post-header flex justify-between mb-4">
              <div class="flex items-center">
                <div>
                  <vs-avatar
                    class="m-0"
                    :src="userLatestPhotos[0]"
                    size="45px"
                  />
                </div>
                <div class="ml-4">
                  <h6>{{ post.author }}</h6>
                  <small>{{ post.time | date(true) }} at
                    {{ post.time | time }}</small>
                </div>
              </div>
              <div class="flex">
                <feather-icon
                  class="ml-4"
                  icon="HeartIcon"
                  :svg-classes="{
                    'text-danger fill-current stroke-current': post.isLiked
                  }"
                />
              </div>
            </div>

            <!-- POST CONTENT -->
            <div class="post-content">
              <p>{{ post.body }}</p>
            </div>
            <div class="post-media-container mb-6 mt-4">
              <ul class="flex post-media-list">
                <li
                  v-for="(media, mediaIdex) in (post.media || post.mediaUrl && [{ img: post.mediaUrl }] || []).slice(0, 2)"
                  :key="mediaIdex"
                  class="post-media m-1 w-full"
                >
                  <img
                    v-if="mediaType(media) == 'image'"
                    class="responsive rounded"
                    :src="media.img"
                    alt="user-upload"
                  >
                  <!--                        <video-player-->
                  <!--                          v-else-if="mediaType(media) == 'video'"-->
                  <!--                          v-once-->
                  <!--                          ref="player"-->
                  <!--                          class="media-video-player"-->
                  <!--                          :options="playerOptions(media)"-->
                  <!--                        />-->
                  <!--                        <span-->
                  <!--                          v-else-->
                  <!--                          class="text-lg text-primary"-->
                  <!--                        >Unknown Media Type</span>-->
                </li>
              </ul>
              <span
                v-if="post.media && post.media.length > 2"
                class="flex justify-end"
              >
                <a
                  class="inline-flex items-center text-sm"
                  href=""
                ><span>View All</span>
                  <feather-icon
                    :icon="$vs.rtl ? 'ChevronsLeftIcon' : 'ChevronsRightIcon'"
                    svg-classes="h-4 w-4"
                  /></a>
              </span>
            </div>

            <!-- POST ACTION DATA -->
            <div>
              <div class="flex justify-between">
                <div class="flex items-center">
                  <div class="flex items-center">
                    <feather-icon
                      class="mr-2"
                      icon="HeartIcon"
                      svg-classes="h-5 w-5"
                    />
                    <span>{{ post.likes.length }}</span>
                  </div>
                  <ul class="users-liked user-list ml-3 sm:ml-6">
                    <li
                      v-for="(user, userIndex) in post.likes"
                      :key="userIndex"
                    >
                      <vx-tooltip
                        :text="user.name"
                        position="bottom"
                      >
                        <vs-avatar
                          :src="user.avatar"
                          size="30px"
                          class="border-2 border-white border-solid -m-1"
                        />
                      </vx-tooltip>
                    </li>
                  </ul>
                  <small class="ml-2">{{ post.likes.length > 5 ? `+${post.likes.length} more` - 5 : post.likes.length }}</small>
                </div>
                <div class="flex items-center">
                  <feather-icon
                    class="mr-2"
                    icon="MessageSquareIcon"
                    svg-classes="h-5 w-5"
                  />
                  <span>{{ (post.comments || []).length }}</span>
                </div>
              </div>
              <!-- <div class="comments-container mt-4">
                <div class="flex mb-3">
                  <div>
                    <vs-avatar
                      :src="userLatestPhotos[0]"
                      size="37px"
                    />
                  </div>
                  <div class="w-11/12 pl-3 pr-2 comment-section-textarea">
                    <vs-textarea
                      v-model="post.commentbox"
                      v-validate="'required'"
                      name="commentBox"
                      type="email"
                      class="mb-2 comment-textarea"
                      placeholder="Type your comment..."
                    />
                    <feather-icon
                      class="mr-2"
                      icon="PaperclipIcon"
                      svg-classes="h-5 w-5"
                    />
                  </div>
                  <div class="w-auto">
                    <vs-button
                      size="normal"
                      color="secondary"
                      type="filled"
                    >
                      Send
                    </vs-button>
                  </div>
                </div>
                <ul class="user-comments-list">
                  <li
                    v-for="(commentedUser,
                            commentIndex) in post.usersCommented.slice(0, 2)"
                    :key="commentIndex"
                    class="commented-user flex items-center mb-12"
                  >
                    <div class="mr-3">
                      <vs-avatar
                        :src="commentedUser.img"
                        size="37px"
                      />
                    </div>
                    <div class="leading-tight">
                      <feather-icon
                        class="horizontalIcon cursor-pointer"
                        icon="MoreHorizontalIcon"
                        svg-classes="h-5 w-5"
                      />
                      <p class="author">
                        {{ commentedUser.author }}
                        <span class="ml-3">12 Dec 2018 at 11:46 AM</span>
                      </p>
                      <span class="comment-body">{{ commentedUser.comment }}</span>
                      <div class="ml-auto">
                        <div class="like-count">
                          <feather-icon
                            icon="HeartIcon"
                            svg-classes="h-4 w-4"
                            class="mr-2 ml-2 mt-1 cursor-pointer"
                          />
                          <span class="text-count mt-1">8</span>
                        </div>
                      </div>
                    </div>
                    <div class="action-like-reply">
                      <span class="cursor-pointer">Like</span>
                      <span class="ml-5 cursor-pointer">Reply</span>
                    </div>
                  </li>
                </ul>
                <span
                  v-if="post.usersCommented.length > 2"
                  class="flex justify-end"
                >
                  <a
                    class="inline-flex items-center text-sm"
                    href=""
                  ><span>View All</span>
                    <feather-icon
                      :icon="$vs.rtl ? 'ChevronsLeftIcon' : 'ChevronsRightIcon'"
                      svg-classes="h-4 w-4"
                    /></a>
                </span>
              </div> -->
              <Comments
                :model-uid="event.uid"
                :post="post"
                :user-info="userInfo"
              />
            </div>
          </div>
        </vx-card>
      </div>

      <div class="vx-col w-full xl:w-3/10 lg:w-1/3 mb-base p-0">
        <vx-card>
          <div>
            <!--            <div class="ml-0 vx-row w-full">-->
            <!--              <vs-icon-->
            <!--                icon="format_align_left"-->
            <!--                size="small"-->
            <!--                color="primary"-->
            <!--              />-->
            <!--              <h5 class="ml-2">-->
            <!--                {{ event.title }}-->
            <!--              </h5>-->
            <!--            </div>-->
            <span class="text-xs">PUBLIC EVENT</span>
            <vs-divider />
            <div class="ml-0 vx-row w-full">
              <vs-icon
                icon="access_time"
                size="small"
                color="primary"
              />
              <h5 class="text-sm text-center p-2">
                {{ event.startTime | moment("DD MMM YYYY") }} at {{ event.startTime | moment("hh:mm") }}
              </h5>
            </div>
            <div class="ml-0 vx-row w-full">
              <vs-icon
                icon="location_on"
                size="small"
                color="primary"
              />
              <div class="vx-col p-0">
                <h5 class="text-sm text-center p-0">
                  { LOCATION.TITLE }
                </h5>
                <h5 class="text-xs pl-4 ">
                  { LOCATION.DIRECTION }
                </h5>
              </div>
              <div class="ml-0 vx-row w-full mt-3">
                <vs-icon
                  icon="map"
                  size="small"
                  color="primary"
                />
                <h5 class="text-sm text-center p-2">
                  Get DIRECTION
                </h5>
              </div>
              <vs-divider />
              <div class="ml-0 vx-row w-full mt-0 justify-center">
                <vs-button
                  class="ml-2"
                  size="small"
                  type="filled"
                >
                  Share
                </vs-button>
                <vs-button
                  class="ml-2"
                  size="small"
                  type="filled"
                >
                  Invite
                </vs-button>
                <vs-button
                  class="ml-2"
                  size="small"
                  type="filled"
                >
                  Interested
                </vs-button>
              </div>
              <vs-divider />
              <div class="ml-0 vx-row w-full mt-0 justify-center">
                <vs-icon
                  icon="local_atm"
                  size="small"
                  color="primary"
                />
                <h5 class="text-sm text-center p-2">
                  { PRICE_RANGE }
                </h5>
                <vs-button
                  size="normal"
                  color="secondary"
                  type="filled"
                  class="w-full m-4"
                >
                  GET TICKET
                </vs-button>

                <h5 class="text-xs text-center p-2 m-0 ">
                  { TICKETS_LEFT } Tickets left for sale.
                </h5>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>

    <pre>
          {{ event }}

    </pre>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { EventModule } from '@/store/modules/eventModule'
  import Comments from '@/components/comments/Comments.vue'
  import { Event } from '@/models/Event'
  import { ActiveUserModule } from '../../../store/modules/activeUserModule'
  import { User } from '@/models/User'
  import { CommentModule, Post } from '../../../store/modules/commentsModule'
  import { Comment } from '../../../models/Comment'

  @Component({
    name: 'EventDetails',
    components: { Comments }
  })
  export default class extends Vue {
    @Prop() private uid!: string;
    @Prop() private slug!: string;

    private isNavOpen: boolean = false
    private img: string = require('@/assets/images/portrait/small/avatar-s-5.jpg')

    private event: Event | null = null
    private commentBox: string = ''

    private mediaExtensions: any = {
      img: ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'exif', 'tiff'],
      video: ['avi', 'flv', 'wmv', 'mov', 'mp4', '3gp']
    };

    private userLatestPhotos: any[] = [
      require('@/assets/images/profile/user-uploads/user-01.jpg'),
      require('@/assets/images/profile/user-uploads/user-02.jpg'),
      require('@/assets/images/profile/user-uploads/user-04.jpg'),
      require('@/assets/images/profile/user-uploads/user-03.jpg'),
      require('@/assets/images/profile/user-uploads/user-05.jpg'),
      require('@/assets/images/profile/user-uploads/user-06.jpg'),
      require('@/assets/images/profile/user-uploads/user-07.jpg'),
      require('@/assets/images/profile/user-uploads/user-08.jpg'),
      require('@/assets/images/profile/user-uploads/user-09.jpg')
    ];

    private userPosts: any = []
    private userPostsSample: any[] = [
      {
        author: 'Leeanna Alvord',
        time: 'Mon Dec 12 2018 07:46:05 GMT+0000 (GMT)',
        isLiked: true,
        text:
          'I love jujubes wafer pie ice cream tiramisu. Chocolate I love pastry pastry sesame snaps wafer. Pastry topping biscuit lollipop topping I love lemon drops sweet roll bonbon. Brownie donut icing.',
        media: [{ img: require('@/assets/images/profile/post-media/2.jpg') }, { img: require('@/assets/images/profile/post-media/2.jpg') }],
        likes: 145,
        comments: 77,
        usersLiked: [
          {
            name: 'Trina Lynes',
            img: require('@/assets/images/portrait/small/avatar-s-1.jpg')
          },
          {
            name: 'Lilian Nenez',
            img: require('@/assets/images/portrait/small/avatar-s-2.jpg')
          },
          {
            name: 'Alberto Glotzbach',
            img: require('@/assets/images/portrait/small/avatar-s-3.jpg')
          },
          {
            name: 'George Nordick',
            img: require('@/assets/images/portrait/small/avatar-s-4.jpg')
          },
          {
            name: 'Vennie Mostowy',
            img: require('@/assets/images/portrait/small/avatar-s-5.jpg')
          }
        ],
        commentbox: '',
        usersCommented: [
          {
            comment: 'orthoplumbate morningtide naphthaline exarteritis',
            author: 'Kitty Allanson',
            img: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
            time: 'Mon Dec 10 2018 08:56:05 GMT+0000 (GMT)'
          },
          {
            comment: 'blockiness pandemy metaxylene speckle coppy',
            author: 'Jeanie Bulgrin',
            img: require('@/assets/images/portrait/small/avatar-s-8.jpg'),
            time: 'Mon Dec 10 2018 08:55:00 GMT+0000 (GMT)'
          }
        ]
      },
      {
        author: 'Leeanna Alvord',
        time: 'Mon Dec 11 2018 08:05:05 GMT+0000 (GMT)',
        isLiked: false,
        text:
          'Candy jelly beans powder brownie biscuit. Jelly marzipan oat cake cake. Cupcake I love wafer cake. Halvah I love powder jelly I love cheesecake cotton candy tiramisu brownie.',
        media: [{ img: require('@/assets/images/profile/post-media/25.jpg') }],
        likes: 276,
        comments: 105,
        usersLiked: [
          {
            name: 'Lai Lewandowski',
            img: require('@/assets/images/portrait/small/avatar-s-6.jpg')
          },
          {
            name: 'Elicia Rieske',
            img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
          },
          {
            name: 'Darcey Nooner',
            img: require('@/assets/images/portrait/small/avatar-s-8.jpg')
          },
          {
            name: 'Julee Rossignol',
            img: require('@/assets/images/portrait/small/avatar-s-10.jpg')
          },
          {
            name: 'Jeffrey Gerondale',
            img: require('@/assets/images/portrait/small/avatar-s-9.jpg')
          }
        ],
        commentbox: '',
        usersCommented: [
          {
            comment: 'I love cupcake danish jujubes sweet.',
            author: 'Darcey Nooner',
            img: require('@/assets/images/portrait/small/avatar-s-8.jpg'),
            time: 'Mon Dec 11 2018 09:56:05 GMT+0000 (GMT)'
          },
          {
            comment: 'Wafer I love brownie jelly bonbon tart apple pie',
            author: 'Lai Lewandowski',
            img: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
            time: 'Mon Dec 10 2018 09:50:00 GMT+0000 (GMT)'
          }
        ]
      },
      {
        author: 'Leeanna Alvord',
        time: 'Mon Dec 10 2018 12:05:05 GMT+0000 (GMT)',
        isLiked: false,
        text:
          'Wafer I love brownie jelly bonbon tart. Candy jelly beans powder brownie biscuit. Jelly marzipan oat cake cake.',
        media: [
          {
            sources: [
              { type: 'video/mp4', src: 'http://vjs.zencdn.net/v/oceans.mp4' }
            ],
            poster: 'https://goo.gl/xcCsDd'
          }
        ],
        likes: 269,
        comments: 98,
        usersLiked: [
          {
            name: 'Vennie Mostowy',
            img: require('@/assets/images/portrait/small/avatar-s-5.jpg')
          },
          {
            name: 'Elicia Rieske',
            img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
          },
          {
            name: 'Julee Rossignol',
            img: require('@/assets/images/portrait/small/avatar-s-10.jpg')
          },
          {
            name: 'Darcey Nooner',
            img: require('@/assets/images/portrait/small/avatar-s-8.jpg')
          },
          {
            name: 'Elicia Rieske',
            img: require('@/assets/images/portrait/small/avatar-s-7.jpg')
          }
        ],
        commentbox: '',
        usersCommented: [
          {
            comment: 'I love cupcake danish jujubes sweet.',
            author: 'Darcey Nooner',
            img: require('@/assets/images/portrait/small/avatar-s-8.jpg'),
            time: 'Mon Dec 11 2018 09:56:05 GMT+0000 (GMT)'
          },
          {
            comment: 'Wafer I love brownie jelly bonbon tart apple pie',
            author: 'Lai Lewandowski',
            img: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
            time: 'Mon Dec 10 2018 09:50:00 GMT+0000 (GMT)'
          }
        ]
      }
    ];

    async onCreatePost () {
      this.userPosts = await CommentModule.postComment({ data: { body: this.commentBox, mediaUrl: 'https://i.picsum.photos/id/1051/400/300.jpg' } as Post, uid: this.event.uid, model: 'event' })
      this.commentBox = ''
    }

    async created () {
      await this.fetchEvent()
      await this.fetchUserPosts()
    }

    get mediaType () {
      return media => {
        if (media.img) {
          console.log('match', /^http.*?$/g.test(media.img))
          const ext = media.img.split('.').pop()
          if (/^http.*?$/g.test(media.img) || this.mediaExtensions.img.includes(ext)) return 'image'
        } else if (media.sources && media.poster) {
          // other validations
          return 'video'
        }
      }
    }

    get playerOptions () {
      return media => {
        return {
          height: '360',
          fluid: true,
          autoplay: false,
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: media.sources,
          poster: media.poster
        }
      }
    }

    get eventdate () {
      return '2000-01-05 00:00:00'
    }

    get userInfo (): User {
      return ActiveUserModule.activeUserInfo
    }

    private async fetchEvent () {
      try {
        this.event = await EventModule.getEvent(this.uid)
      } catch (err) {
        console.error(err)
      }
    }

    private async fetchUserPosts () {
      try {
        this.userPosts = (await CommentModule.getComments({ model: 'event', uid: this.uid }) || []).filter(data => !data.parentUid)
      } catch (err) {
        console.error(err)
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*#event-description {*/
  /*  margin-left: 35px;*/
  /*  color: #626c7e;*/
  /*  font-style: normal;*/
  /*  font-weight: normal;*/
  /*}*/

  #imgevent {
    height: 336px;
  }

  #hostedby {
    color: #89969f;
    margin-right: 10px;
  }

  #hostname {
    color: #333333;
  }

  #dateevent {
    background-color: #681a7f;
    color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
    border-radius: 5px;
    display: flex;
    align-items: center;
    text-align: center;
    position: absolute;
    padding: 5px;
  }
  .read-more:after {
    content: '';
    position: absolute;
    margin-top: 11px;
    margin-left: 5px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid black;
  }

</style>
