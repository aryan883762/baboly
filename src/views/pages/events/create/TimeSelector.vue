<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-1/2 xl:w-1/3 mb-4 ">
        <p class="text-sm pb-2">
          Start Date
        </p>

        <vs-col class="w-32">
          <datepicker
            v-model="startDate"
            placeholder="Start Date"
          />
        </vs-col>
        <vs-col class="pl-1 w-40">
          <vs-select
            v-model="startTime"
            class="w-40"
          >
            <vs-select-item
              v-for="(item,index) in hoursList"
              :key="index"
              :value="item"
              :text="item"
            />
          </vs-select>
        </vs-col>
      </div>
      <div class="w-full lg:w-1/2 xl:w-1/3 mb-4 ">
        <p class="text-sm pb-2">
          End Date
        </p>
        <vs-col class="w-32">
          <datepicker
            v-model="endDate"
            placeholder="End Date"
          />
        </vs-col>
        <vs-col class="pl-1 w-40">
          <vs-select
            v-model="endTime"
            class="w-40"
          >
            <vs-select-item
              v-for="(item,index) in hoursList"
              :key="index"
              :value="item"
              :text="item"
            />
          </vs-select>
        </vs-col>
      </div>
      <div class="w-full xl:w-1/3 mb-4">
        <p class="text-sm pb-2">
          Timezone
        </p>
        <vs-select
          v-model="event.timezoneId"
          class="w-full"
        >
          <vs-select-item
            v-for="(item,index) in timezones"
            :key="index"
            :value="item.timezoneId"
            :text="item.name"
          />
        </vs-select>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Event } from '@/models/Event'
import Datepicker from 'vuejs-datepicker'
import { CalendarModule } from '@/store/modules/calendarModule'
import { Timezone } from '@/models/Calendar'

  @Component({
    name: 'TimeSelector',
    components: {
      Datepicker
    }
  })
export default class TimeSelector extends Vue {
    @Prop() private event!: Event
    private startDate: string = ''
    private endDate: string = ''
    private startTime: string = '07:00 PM'
    private endTime: string = '11:00 PM'
    private timezones: Timezone [] = []
    private hoursList: string[] = CalendarModule.hoursList

    private configTimePicker = {
      enableTime: true,
      minDate: new Date(),
      maxDate: null,
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d H:i'
    }
    private configTodateTimePicker = {
      enableTime: true,
      minDate: null,
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d H:i'
    }

    private async mounted () {
      await CalendarModule.getTimezones()
      this.timezones = CalendarModule.timezones
    }

    private onFromChange (selectedDates, dateStr, instance) {
      this.$set(this.configTodateTimePicker, 'minDate', dateStr)
    }

    private onToChange (selectedDates, dateStr, instance) {
      this.$set(this.configTimePicker, 'maxDate', dateStr)
    }
}
</script>

<style lang=scss>

</style>
