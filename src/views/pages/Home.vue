<template>
  <div>
    <div class="gradient text-white mb-0">
      <div class="pt-24">
        <div class="container px-3 pt-24 mx-auto flex flex-wrap flex-col lg:flex-row items-center">
          <!--Left Col-->
          <div class="flex flex-col w-full lg:w-2/5 justify-center items-start text-center md:text-left">
            <p class="uppercase tracking-loose w-full">
              Manage & Find Your Events
            </p>
            <p class="my-4 text-5xl font-bold leading-tight">
              Easy, Fast & Smart
            </p>
            <p class="leading-normal text-2xl mb-2">
              Make a public or a private event
            </p>
            <p class="leading-normal text-2xl">
              Brows your favorite local and online events
            </p>
            <div class="container w-full  pt-24">
              <vx-input-group class="mb-base">
                <vs-input
                  v-model="searchValue"
                  class="text-dark"
                  :placeholder="`Search Events near ${current_city}`"
                />

                <template slot="append">
                  <div class="append-text btn-addon">
                    <vs-button color="primary">
                      Serach Events
                    </vs-button>
                  </div>
                </template>
              </vx-input-group>
            </div>
          </div>
          <!--Right Col-->
          <div class="w-full md:w-3/5 py-6 text-center">
            <img
              class="w-full md:w-4/5 z-50"
              src="https://babooly.com/assets/img/home/image.png"
            >
          </div>
        </div>
      </div>

      <div class="relative -mb-6 -mt-12 lg:-mt-24">
        <svg
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#FFFFFF"
              fill-rule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              />
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              />
              <path
                id="Path-4"
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                opacity="0.200000003"
              />
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#FFFFFF"
              fill-rule="nonzero"
            >
              <path
                d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>

    <section class="bg-white border-b py-8">
      <div class="container max-w-5xl mx-auto m-8">
        <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center">
          Search & Create Events
        </h1>
        <div class="w-full mb-4">
          <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
        </div>

        <div class="flex flex-wrap container">
          <div class="mx-auto lg:p-24">
            <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
              Create Your Own Event!
            </h3>
            <p class="text-gray-600 mb-8">
              Make a public or a private event with limited guests.<br><br>
            </p>
          </div>
          <div class="mx-auto text-center lg:pr-24">
            <img
              class="w-full"
              src="@/assets/images/home/CreateEvent.svg"
            >
          </div>
        </div>

        <div class="flex flex-wrap flex-col-reverse container lg:flex-row">
          <div class="w-full lg:w-1/2  mt-6 lg:pl-24 text-center">
            <img src="@/assets/images/home/SearchEvents.svg">
          </div>
          <div class="w-full lg:w-1/2 lg:p-24 mt-6">
            <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
              Browse Event!
            </h3>
            <p class="text-gray-600 mb-8">
              Brows and search your favorite local and online events based on your interests and location.
              <br><br>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white border-b py-8">
      <div class="container mx-auto flex flex-wrap pt-4 pb-12">
        <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center">
          Your Benefits
        </h1>
        <div class="w-full mb-4">
          <div class="h-1 mx-auto bg-accent-gradient w-64 opacity-25 my-0 py-0 rounded-t" />
        </div>

        <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div class="flex-1  bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <img src="@/assets/images/home/OrganizeEvent.svg">
            <div class="w-full text-2xl text-dark text-center pt-6 px-6">
              Organize your event
            </div>
            <p class="text-base text-center px-6 mb-5">
              Sort your daily events faster. Focus more on the task at hand.
            </p>
          </div>
        </div>
        <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <img src="@/assets/images/home/FindEvent.svg">

            <div class="w-full text-2xl text-dark text-center pt-6  px-6">
              Find your favorite event
            </div>
            <p class="text-base text-center px-6 mb-5">
              Browse and search your favorite events based on your interests.
            </p>
          </div>
        </div>
        <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
          <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
            <img src="@/assets/images/home/InviteEvent.svg">

            <div class="w-full text-2xl text-dark text-center pt-6  px-6">
              Invite your guests
            </div>
            <p class="text-base text-center px-6 mb-5">
              Share interesting events with your friends by sending them invitations.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-accent-gradient pb-24">
      <svg
        class="full-width"
        viewBox="0 0 2500 264"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2500 145.833C2402 111.632 2330.82 89.0625 2286.46 78.125C2186.63 53.5139 2094.98 44.316 2029.51 38.1944C1961.3 31.816 1813.24 32.0746 1701.39 38.1944C1656.68 40.6406 1601.13 46.4271 1534.72 55.5555C1467.23 65.6024 1420.93 73.1267 1395.83 78.125C1348.67 87.5173 1264.12 107.24 1237.85 112.847C1145.87 132.481 1079.07 152.307 1013.89 163.194C898.481 182.472 841.189 184.788 744.791 187.5C658.837 184.868 595.179 181.396 553.819 177.083C483.63 169.762 402.321 154.056 355.903 145.833C268.453 130.34 149.819 100.248 0 55.5555V0H2500V145.833Z"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M2500 263.889C2342.49 262.278 2243.21 216.687 1993.21 159.875C1826.55 122 1556.24 108.794 1182.29 120.256C1685.18 -7.38617 2124.42 -2.89581 2500 133.727"
          fill="white"
        />
        <path
          opacity="0.1"
          d="M2326.39 82.1033C2018.38 138.482 1760.16 172.7 1551.73 184.759C1343.3 196.818 1092.84 191.323 800.347 168.274C883.559 166.454 1093.22 133.949 1429.34 70.7583C1765.46 7.56797 2064.47 11.3496 2326.39 82.1033Z"
          fill="white"
        />
        <path
          opacity="0.2"
          d="M684.026 174.216C536.751 212.971 279.368 233.32 1.73487 194.157V55.5561C293.103 128.571 520.533 168.124 684.026 174.216Z"
          fill="white"
        />
      </svg>

      <section class="container mx-auto text-center py-6 mb-12">
        <h1 class="w-full my-2 text-4xl leading-tight text-center text-white">
          Create Event
        </h1>
        <div class="w-full mb-4">
          <div class="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t" />
        </div>

        <h3 class="my-4 text-3xl leading-tight">
          <!--          Main Hero Message to sell yourself!-->
        </h3>
        <router-link
          to="/events/create"
          class="text-inherit hover:text-primary"
          @click.stop.prevent
        >
          <vs-button
            color="secondary"
            class="text-white"
          >
            Create Your Event
          </vs-button>
        </router-link>
      </section>
    </section>
  </div>
</template>
<script>

export default {
  data () {
    return {
      current_city: 'Los angeles',
      searchValue: ''
    }
  }
}
</script>
<style>
  .gradient {
    background: linear-gradient(90deg, #9C27B0 0%, #E9C9EF 100%);
  }

  .-mt-12 {
    margin-top: -12px;
  }

  .-mt-24 {
    margin-top: -24px;
  }

  .-mb-6 {
    margin-bottom: -6px;
  }
</style>
