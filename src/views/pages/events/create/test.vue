<template>
  <div class="edit-image">
    <div class="image-container main">
      <label>Main product image (Can’t be changed)</label>
      <img src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80">
    </div>
    <div class="extra-images">
      <draggable
        :list="files"
        class="added-images"
      >
        <transition-group>
          <div
            v-for="(file, key) in files"
            :key="key"
            class="image-container"
          >
            <label>Image&nbsp;{{ parseInt(key)+1 }}</label>
            <img :ref="'preview'+parseInt(key)">
            <div
              class="remove-img"
              @click="removeImage(key)"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="white"
                />
                <path
                  d="M12.043 1.99902C6.51997 1.99902 2.04297 6.47602 2.04297 11.999C2.04297 17.522 6.51997 21.999 12.043 21.999C17.566 21.999 22.043 17.522 22.043 11.999C22.043 6.47602 17.565 1.99902 12.043 1.99902ZM16.75 15.292L15.336 16.706L12.043 13.414L8.74997 16.706L7.33597 15.292L10.628 11.999L7.33497 8.70602L8.74897 7.29302L12.042 10.586L15.335 7.29302L16.749 8.70602L13.457 11.999L16.75 15.292Z"
                  fill="#283441"
                />
              </svg>
            </div>
            <!-- <p style="background: #ccc;">{{ file.name }}</p> -->
          </div>
        </transition-group>
      </draggable>

      <div
        v-if="files.length < 6"
        class="image-container image-selector"
        :style="fileInputPos"
      >
        <label>Image&nbsp;{{ files.length + 1 }}</label>
        <div class="image-input">
          <div class="file-wrapper">
            <input
              type="file"
              name="file-input"
              multiple="True"
              @change="handleFileInput"
            >
            <svg
              class="icn-camera"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="40"
                height="40"
                rx="10"
                fill="#357BFF"
              />
              <path
                d="M19.9993 15.3324C17.4721 15.3324 15.416 17.3885 15.416 19.9157C15.416 22.4439 17.4721 24.4991 19.9993 24.4991C22.5266 24.4991 24.5827 22.4439 24.5827 19.9157C24.5827 17.3876 22.5266 15.3324 19.9993 15.3324ZM19.9993 22.6657C18.4832 22.6657 17.2493 21.4319 17.2493 19.9157C17.2493 18.3996 18.4832 17.1657 19.9993 17.1657C21.5155 17.1657 22.7493 18.3996 22.7493 19.9157C22.7493 21.4319 21.5155 22.6657 19.9993 22.6657Z"
                fill="white"
              />
              <path
                d="M27.334 13.4991H24.1577L22.8689 11.5658C22.5279 11.0543 21.9577 10.7491 21.3436 10.7491H18.6577C18.0436 10.7491 17.4734 11.0543 17.1324 11.5658L15.8436 13.4991H12.6673C11.6562 13.4991 10.834 14.3213 10.834 15.3324V25.4158C10.834 26.4268 11.6562 27.2491 12.6673 27.2491H27.334C28.3451 27.2491 29.1673 26.4268 29.1673 25.4158V15.3324C29.1673 14.3213 28.3451 13.4991 27.334 13.4991ZM12.6673 25.4158V15.3324H16.8244L18.6577 12.5824H21.3436L23.1769 15.3324H27.334L27.3349 25.4158H12.6673Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data () {
    return {
      files: [],
      dragList: [1, 2, 3, 4],
      fileInputPos: ''
    }
  },
  watch: {
    files: {
      deep: true,
      handler () {
        this.getImagePreviews()
        if (this.files.length < 3) {
          this.fileInputPos = 'top: 0;'
        } else {
          this.fileInputPos = 'bottom: 0;'
        }
        let hh = this.files.length % 3
        let rightPos = (2 - hh) * 160 + 10
        this.fileInputPos += `right:${rightPos}px;`
      }
    }
  },
  methods: {
    handleFileInput (e) {
      let files = e.target.files
      files = e.target.files
      if (!files) return;
      ([...files]).forEach(f => {
        this.files.push(f)
      })
    },
    getImagePreviews () {
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader()
          reader.addEventListener('load', function () {
            this.$refs['preview' + parseInt(i)][0].src = reader.result
          }.bind(this), false)
          reader.readAsDataURL(this.files[i])
        } else {
          this.$nextTick(function () {
            this.$refs['preview' + parseInt(i)][0].src = '/images/file.png'
          })
        }
      }
    },
    removeImage: function (idx) {
      this.files.splice(parseInt(idx), 1)
    }
  }
}
</script>
