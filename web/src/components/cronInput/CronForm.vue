<template>
  <el-input v-model="cronValue" v-bind="props.inputProps">
    <template #append>
      <el-button @click="setting">设置</el-button>
    </template>
  </el-input>
  <el-dialog v-model="show" title="cron">
    <div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <template #label>
            <span>{{ text.Seconds.name }}</span>
          </template>
          <el-scrollbar :max-height="maxHeight">
            <el-row class="mt">
              <el-radio v-model="second.cronEvery" label="1">{{ text.Seconds.every }} </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="second.cronEvery" label="2"
                >{{ text.Seconds.interval[0] }}
                <el-input-number
                  v-model="second.incrementIncrement"
                  :min="1"
                  :max="60"
                ></el-input-number>
                {{ text.Seconds.interval[1] || '' }}
                <el-input-number
                  v-model="second.incrementStart"
                  :min="0"
                  :max="59"
                ></el-input-number>
                {{ text.Seconds.interval[2] || '' }}
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio class="long" v-model="second.cronEvery" label="3"
                >{{ text.Seconds.specific }}
                <el-select multiple v-model="second.specificSpecific">
                  <el-option v-for="(val, index) in 60" :key="index" :value="val - 1"
                    >{{ val - 1 }}
                  </el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="second.cronEvery" label="4"
                >{{ text.Seconds.cycle[0] }}
                <el-input-number v-model="second.rangeStart" :min="1" :max="60"></el-input-number>
                {{ text.Seconds.cycle[1] || '' }}
                <el-input-number v-model="second.rangeEnd" :min="0" :max="59"></el-input-number>
                {{ text.Seconds.cycle[2] || '' }}
              </el-radio>
            </el-row>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span>{{ text.Minutes.name }}</span>
          </template>
          <el-scrollbar :max-height="maxHeight">
            <el-row class="mt">
              <el-radio v-model="minute.cronEvery" label="1">{{ text.Minutes.every }} </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="minute.cronEvery" label="2"
                >{{ text.Minutes.interval[0] }}
                <el-input-number
                  v-model="minute.incrementIncrement"
                  :min="1"
                  :max="60"
                ></el-input-number>
                {{ text.Minutes.interval[1] }}
                <el-input-number
                  v-model="minute.incrementStart"
                  :min="0"
                  :max="59"
                ></el-input-number>
                {{ text.Minutes.interval[2] || '' }}
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio class="long" v-model="minute.cronEvery" label="3"
                >{{ text.Minutes.specific }}
                <el-select multiple v-model="minute.specificSpecific">
                  <el-option v-for="(val, index) in 60" :key="index" :value="val - 1"
                    >{{ val - 1 }}
                  </el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="minute.cronEvery" label="4"
                >{{ text.Minutes.cycle[0] }}
                <el-input-number v-model="minute.rangeStart" :min="1" :max="60"></el-input-number>
                {{ text.Minutes.cycle[1] }}
                <el-input-number v-model="minute.rangeEnd" :min="0" :max="59"></el-input-number>
                {{ text.Minutes.cycle[2] }}
              </el-radio>
            </el-row>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span>{{ text.Hours.name }}</span>
          </template>
          <el-scrollbar :max-height="maxHeight">
            <el-row class="mt">
              <el-radio v-model="hour.cronEvery" label="1">{{ text.Hours.every }} </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="hour.cronEvery" label="2"
                >{{ text.Hours.interval[0] }}
                <el-input-number
                  v-model="hour.incrementIncrement"
                  :min="0"
                  :max="23"
                ></el-input-number>
                {{ text.Hours.interval[1] }}
                <el-input-number v-model="hour.incrementStart" :min="0" :max="23"></el-input-number>
                {{ text.Hours.interval[2] }}
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio class="long" v-model="hour.cronEvery" label="3"
                >{{ text.Hours.specific }}
                <el-select multiple v-model="hour.specificSpecific">
                  <el-option v-for="(val, index) in 24" :key="index" :value="val - 1"
                    >{{ val - 1 }}
                  </el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="hour.cronEvery" label="4"
                >{{ text.Hours.cycle[0] }}
                <el-input-number v-model="hour.rangeStart" :min="0" :max="23"></el-input-number>
                {{ text.Hours.cycle[1] }}
                <el-input-number v-model="hour.rangeEnd" :min="0" :max="23"></el-input-number>
                {{ text.Hours.cycle[2] }}
              </el-radio>
            </el-row>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span>{{ text.Day.name }}</span>
          </template>
          <el-scrollbar :max-height="maxHeight">
            <el-row class="mt">
              <el-radio v-model="day.cronEvery" label="1">{{ text.Day.every }} </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="day.cronEvery" label="2"
                >{{ text.Day.intervalWeek[0] }}
                <el-input-number
                  v-model="week.incrementIncrement"
                  :min="1"
                  :max="7"
                ></el-input-number>
                {{ text.Day.intervalWeek[1] }}
                <el-select v-model="week.incrementStart">
                  <el-option
                    v-for="(val, index) in 7"
                    :key="index"
                    :label="text.Week[val - 1]"
                    :value="val"
                  ></el-option>
                </el-select>
                {{ text.Day.intervalWeek[2] }}
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="day.cronEvery" label="3"
                >{{ text.Day.intervalDay[0] }}
                <el-input-number
                  v-model="day.incrementIncrement"
                  :min="1"
                  :max="31"
                ></el-input-number>
                {{ text.Day.intervalDay[1] }}
                <el-input-number v-model="day.incrementStart" :min="1" :max="31"></el-input-number>
                {{ text.Day.intervalDay[2] }}
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio class="long" v-model="day.cronEvery" label="4"
                >{{ text.Day.specificWeek }}
                <el-select multiple v-model="week.specificSpecific">
                  <el-option
                    v-for="(val, index) in 7"
                    :key="index"
                    :label="text.Week[val - 1]"
                    :value="['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][val - 1]"
                  ></el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio class="long" v-model="day.cronEvery" label="5"
                >{{ text.Day.specificDay }}
                <el-select multiple v-model="day.specificSpecific">
                  <el-option v-for="(val, index) in 31" :key="index" :value="val"
                    >{{ val }}
                  </el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="day.cronEvery" label="6">{{ text.Day.lastDay }} </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="day.cronEvery" label="7">{{ text.Day.lastWeekday }} </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="day.cronEvery" label="8"
                >{{ text.Day.lastWeek[0] }}
                <el-select v-model="week.cronLastSpecificDomDay">
                  <el-option
                    v-for="(val, index) in 7"
                    :key="index"
                    :label="text.Week[val - 1]"
                    :value="val"
                  ></el-option>
                </el-select>
                {{ text.Day.lastWeek[1] || '' }}
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="day.cronEvery" label="9">
                <el-input-number
                  v-model="day.cronDaysBeforeEomMinus"
                  :min="1"
                  :max="31"
                ></el-input-number>
                {{ text.Day.beforeEndMonth[0] }}
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="day.cronEvery" label="10"
                >{{ text.Day.nearestWeekday[0] }}
                <el-input-number
                  v-model="day.cronDaysNearestWeekday"
                  :min="1"
                  :max="31"
                ></el-input-number>
                {{ text.Day.nearestWeekday[1] }}
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="day.cronEvery" label="11"
                >{{ text.Day.someWeekday[0] }}
                <el-input-number v-model="week.cronNthDayNth" :min="1" :max="5"></el-input-number>
                <el-select v-model="week.cronNthDayDay">
                  <el-option
                    v-for="(val, index) in 7"
                    :key="index"
                    :label="text.Week[val - 1]"
                    :value="val"
                  ></el-option>
                </el-select>
                {{ text.Day.someWeekday[1] }}
              </el-radio>
            </el-row>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span> {{ text.Month.name }}</span>
          </template>
          <el-scrollbar :max-height="maxHeight">
            <el-row class="mt">
              <el-radio v-model="month.cronEvery" label="1">{{ text.Month.every }} </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="month.cronEvery" label="2"
                >{{ text.Month.interval[0] }}
                <el-input-number
                  v-model="month.incrementIncrement"
                  :min="0"
                  :max="12"
                ></el-input-number>
                {{ text.Month.interval[1] }}
                <el-input-number
                  v-model="month.incrementStart"
                  :min="0"
                  :max="12"
                ></el-input-number>
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio class="long" v-model="month.cronEvery" label="3"
                >{{ text.Month.specific }}
                <el-select multiple v-model="month.specificSpecific">
                  <el-option
                    v-for="(val, index) in 12"
                    :key="index"
                    :label="val"
                    :value="val"
                  ></el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="month.cronEvery" label="4"
                >{{ text.Month.cycle[0] }}
                <el-input-number v-model="month.rangeStart" :min="1" :max="12"></el-input-number>
                {{ text.Month.cycle[1] }}
                <el-input-number v-model="month.rangeEnd" :min="1" :max="12"></el-input-number>
              </el-radio>
            </el-row>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span> {{ text.Year.name }}</span>
          </template>
          <el-scrollbar :max-height="maxHeight">
            <el-row class="mt">
              <el-radio v-model="year.cronEvery" label="1">{{ text.Year.every }} </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="year.cronEvery" label="2"
                >{{ text.Year.interval[0] }}
                <el-input-number
                  v-model="year.incrementIncrement"
                  :min="1"
                  :max="99"
                ></el-input-number>
                {{ text.Year.interval[1] }}
                <el-input-number
                  v-model="year.incrementStart"
                  :min="2018"
                  :max="2118"
                ></el-input-number>
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio class="long" v-model="year.cronEvery" label="3"
                >{{ text.Year.specific }}
                <el-select filterable multiple v-model="year.specificSpecific">
                  <el-option
                    v-for="(val, index) in 100"
                    :key="index"
                    :label="2017 + val"
                    :value="2017 + val"
                  ></el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row class="mt">
              <el-radio v-model="year.cronEvery" label="4"
                >{{ text.Year.cycle[0] }}
                <el-input-number
                  v-model="year.rangeStart"
                  :min="2018"
                  :max="2118"
                ></el-input-number>
                {{ text.Year.cycle[1] }}
                <el-input-number v-model="year.rangeEnd" :min="2018" :max="2118"></el-input-number>
              </el-radio>
            </el-row>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
      <div class="value">
        <span> cron预览: </span>
        <el-tag type="success">
          {{ cron }}
        </el-tag>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import type { InputProps } from 'element-plus'
import Language from './language'
import { computed, ref } from 'vue'

const emit = defineEmits(['close', 'change'])

const cronValue = defineModel<string>({ required: true })

const props = withDefaults(
  defineProps<{
    i18n?: keyof typeof Language
    maxHeight?: string
    inputProps?: Partial<InputProps>
  }>(),
  {
    maxHeight: '300px',
    i18n: 'cn'
  }
)

const show = ref(false)

const confirm = () => {
  cronValue.value = cron.value
  show.value = false
}

const setting = () => {
  if (cronValue.value) {
    let crons = cronValue.value.split(' ')
    // 解析seconds
    let secondsText = crons[0].trim()
    if (secondsText === '*') {
      second.value.cronEvery = '1'
    } else if (secondsText.includes('/')) {
      second.value.cronEvery = '2'
      let secondsTexts = secondsText.split('/')
      second.value.incrementStart = parseInt(secondsTexts[0])
      second.value.incrementIncrement = parseInt(secondsTexts[1])
    } else if (secondsText.includes(',') || isFinite(Number(secondsText))) {
      second.value.cronEvery = '3'
      second.value.specificSpecific = secondsText.split(',').map((item) => parseInt(item))
    } else if (secondsText.includes('-')) {
      second.value.cronEvery = '4'
      let secondsTexts = secondsText.split('-')
      second.value.rangeStart = parseInt(secondsTexts[0])
      second.value.rangeEnd = parseInt(secondsTexts[1])
    }
    // 解析minutes
    let minutesText = crons[1].trim()
    if (minutesText === '*') {
      minute.value.cronEvery = '1'
    } else if (minutesText.includes('/')) {
      minute.value.cronEvery = '2'
      let minutesTexts = minutesText.split('/')
      minute.value.incrementStart = parseInt(minutesTexts[0])
      minute.value.incrementIncrement = parseInt(minutesTexts[1])
    } else if (minutesText.includes(',') || isFinite(Number(minutesText))) {
      minute.value.cronEvery = '3'
      minute.value.specificSpecific = minutesText.split(',').map((item) => parseInt(item))
    } else if (minutesText.includes('-')) {
      minute.value.cronEvery = '4'
      let minutesTexts = minutesText.split('-')
      minute.value.rangeStart = parseInt(minutesTexts[0])
      minute.value.rangeEnd = parseInt(minutesTexts[1])
    }
    // 解析hours
    let hoursText = crons[2].trim()
    if (hoursText === '*') {
      hour.value.cronEvery = '1'
    } else if (hoursText.includes('/')) {
      hour.value.cronEvery = '2'
      let hoursTexts = hoursText.split('/')
      hour.value.incrementStart = parseInt(hoursTexts[0])
      hour.value.incrementIncrement = parseInt(hoursTexts[1])
    } else if (hoursText.includes(',') || isFinite(Number(hoursText))) {
      hour.value.cronEvery = '3'
      hour.value.specificSpecific = hoursText.split(',').map((item) => parseInt(item))
    } else if (hoursText.includes('-')) {
      hour.value.cronEvery = '4'
      let hoursTexts = hoursText.split('-')
      hour.value.rangeStart = parseInt(hoursTexts[0])
      hour.value.rangeEnd = parseInt(hoursTexts[1])
    }
    // 解析days weeks
    let daysText = crons[3].trim()
    let weeksText = crons[5].trim()
    if (daysText.includes('/')) {
      day.value.cronEvery = '3'
      let daysTexts = daysText.split('/')
      day.value.incrementStart = parseInt(daysTexts[0])
      day.value.incrementIncrement = parseInt(daysTexts[1])
    } else if (daysText.includes(',') || isFinite(Number(daysText))) {
      day.value.cronEvery = '5'
      day.value.specificSpecific = daysText.split(',').map((item) => parseInt(item))
    } else if (daysText === 'L') {
      day.value.cronEvery = '6'
    } else if (daysText === 'LW') {
      day.value.cronEvery = '7'
    } else if (daysText.startsWith('L-')) {
      day.value.cronEvery = '9'
      day.value.cronDaysBeforeEomMinus = parseInt(daysText.replace(/L-/g, ''))
    } else if (daysText.endsWith('W')) {
      day.value.cronEvery = '10'
      day.value.cronDaysNearestWeekday = parseInt(daysText.replace(/W/g, ''))
    } else if (daysText === '?') {
      if (weeksText.includes('/')) {
        day.value.cronEvery = '2'
        let weeksTexts = weeksText.split('/')
        week.value.incrementStart = parseInt(weeksTexts[0])
        week.value.incrementIncrement = parseInt(weeksTexts[1])
      } else if (weeksText.includes(',') || isFinite(Number(weeksText))) {
        day.value.cronEvery = '4'
        week.value.specificSpecific = weeksText.split(',').map((item) => item)
      } else if (weeksText.includes('#')) {
        day.value.cronEvery = '11'
        let weeksTexts = weeksText.split('#')
        week.value.cronNthDayDay = parseInt(weeksTexts[0])
        week.value.cronNthDayNth = parseInt(weeksTexts[1])
      } else if (weeksText.endsWith('L')) {
        day.value.cronEvery = '8'
        week.value.cronLastSpecificDomDay = parseInt(weeksText.replace(/L/g, ''))
      }
    } else {
      day.value.cronEvery = '1'
    }

    // 解析months
    let monthsText = crons[4].trim()
    if (monthsText === '*') {
      month.value.cronEvery = '1'
    } else if (monthsText.includes('/')) {
      month.value.cronEvery = '2'
      let monthsTexts = monthsText.split('/')
      month.value.incrementStart = parseInt(monthsTexts[0])
      month.value.incrementIncrement = parseInt(monthsTexts[1])
    } else if (monthsText.includes(',') || isFinite(Number(monthsText))) {
      month.value.cronEvery = '3'
      month.value.specificSpecific = monthsText.split(',').map((item) => parseInt(item))
    } else if (monthsText.includes('-')) {
      month.value.cronEvery = '4'
      let monthsTexts = monthsText.split('-')
      month.value.rangeStart = parseInt(monthsTexts[0])
      month.value.rangeEnd = parseInt(monthsTexts[1])
    }
    // 解析years
    let yearsText = crons[6]?.trim()
    if (!yearsText) {
      year.value.cronEvery = '1'
    } else if (yearsText.includes('/')) {
      year.value.cronEvery = '2'
      let yearsTexts = yearsText.split('/')
      year.value.incrementStart = parseInt(yearsTexts[0])
      year.value.incrementIncrement = parseInt(yearsTexts[1])
    } else if (yearsText.includes(',') || isFinite(Number(yearsText))) {
      year.value.cronEvery = '3'
      year.value.specificSpecific = yearsText.split(',').map((item) => parseInt(item))
    } else if (yearsText.includes('-')) {
      year.value.cronEvery = '4'
      let yearsTexts = yearsText.split('-')
      year.value.rangeStart = parseInt(yearsTexts[0])
      year.value.rangeEnd = parseInt(yearsTexts[1])
    }
  }
  show.value = true
}

const second = ref<{
  cronEvery: string
  incrementStart: number
  incrementIncrement: number
  rangeStart: number
  rangeEnd: number
  specificSpecific: Array<any>
}>({
  cronEvery: '1',
  incrementStart: 3,
  incrementIncrement: 5,
  rangeStart: 0,
  rangeEnd: 0,
  specificSpecific: []
})

const minute = ref<{
  cronEvery: string
  incrementStart: number
  incrementIncrement: number
  rangeStart: number
  rangeEnd: number
  specificSpecific: Array<any>
}>({
  cronEvery: '1',
  incrementStart: 3,
  incrementIncrement: 5,
  rangeStart: 0,
  rangeEnd: 0,
  specificSpecific: []
})

const hour = ref<{
  cronEvery: string
  incrementStart: number
  incrementIncrement: number
  rangeStart: number
  rangeEnd: number
  specificSpecific: Array<any>
}>({
  cronEvery: '1',
  incrementStart: 3,
  incrementIncrement: 5,
  rangeStart: 0,
  rangeEnd: 0,
  specificSpecific: []
})

const day = ref<{
  cronEvery: string
  incrementStart: number
  incrementIncrement: number
  rangeStart: number
  rangeEnd: number
  specificSpecific: Array<any>
  cronDaysBeforeEomMinus: number
  cronDaysNearestWeekday: number
}>({
  cronEvery: '1',
  incrementStart: 1,
  incrementIncrement: 1,
  rangeStart: 0,
  rangeEnd: 0,
  specificSpecific: [],
  cronDaysBeforeEomMinus: 0,
  cronDaysNearestWeekday: 0
})

const week = ref<{
  cronEvery: string
  incrementStart: number
  incrementIncrement: number
  specificSpecific: Array<any>
  cronLastSpecificDomDay: number
  cronNthDayDay: number
  cronNthDayNth: number
}>({
  cronEvery: '1',
  incrementStart: 1,
  incrementIncrement: 1,
  specificSpecific: [],
  cronLastSpecificDomDay: 1,
  cronNthDayDay: 1,
  cronNthDayNth: 1
})

const month = ref<{
  cronEvery: string
  incrementStart: number
  incrementIncrement: number
  rangeStart: number
  rangeEnd: number
  specificSpecific: Array<any>
}>({
  cronEvery: '1',
  incrementStart: 3,
  incrementIncrement: 5,
  rangeStart: 0,
  rangeEnd: 0,
  specificSpecific: []
})

const year = ref<{
  cronEvery: string
  incrementStart: number
  incrementIncrement: number
  rangeStart: number
  rangeEnd: number
  specificSpecific: Array<any>
}>({
  cronEvery: '1',
  incrementStart: 2017,
  incrementIncrement: 1,
  rangeStart: 0,
  rangeEnd: 0,
  specificSpecific: []
})

const text = computed(() => Language[props.i18n])

const secondsText = computed(() => {
  let seconds = ''
  let cronEvery = second.value.cronEvery
  switch (cronEvery.toString()) {
    case '1':
      seconds = '*'
      break
    case '2':
      seconds = second.value.incrementStart + '/' + second.value.incrementIncrement
      break
    case '3':
      second.value.specificSpecific.map((val) => {
        seconds += val + ','
      })
      seconds = seconds.slice(0, -1)
      break
    case '4':
      seconds = second.value.rangeStart + '-' + second.value.rangeEnd
      break
  }
  return seconds
})

const minutesText = computed(() => {
  let minutes = ''
  let cronEvery = minute.value.cronEvery
  switch (cronEvery.toString()) {
    case '1':
      minutes = '*'
      break
    case '2':
      minutes = minute.value.incrementStart + '/' + minute.value.incrementIncrement
      break
    case '3':
      minute.value.specificSpecific.map((val) => {
        minutes += val + ','
      })
      minutes = minutes.slice(0, -1)
      break
    case '4':
      minutes = minute.value.rangeStart + '-' + minute.value.rangeEnd
      break
  }
  return minutes
})

const hoursText = computed(() => {
  let hours = ''
  let cronEvery = hour.value.cronEvery
  switch (cronEvery.toString()) {
    case '1':
      hours = '*'
      break
    case '2':
      hours = hour.value.incrementStart + '/' + hour.value.incrementIncrement
      break
    case '3':
      hour.value.specificSpecific.map((val) => {
        hours += val + ','
      })
      hours = hours.slice(0, -1)
      break
    case '4':
      hours = hour.value.rangeStart + '-' + hour.value.rangeEnd
      break
  }
  return hours
})

const daysText = computed(() => {
  let days = ''
  let cronEvery = day.value.cronEvery
  switch (cronEvery.toString()) {
    case '1':
      break
    case '2':
    case '4':
    case '11':
    case '8':
      days = '?'
      break
    case '3':
      days = day.value.incrementStart + '/' + day.value.incrementIncrement
      break
    case '5':
      day.value.specificSpecific.map((val) => {
        days += val + ','
      })
      days = days.slice(0, -1)
      break
    case '6':
      days = 'L'
      break
    case '7':
      days = 'LW'
      break
    case '9':
      days = 'L-' + day.value.cronDaysBeforeEomMinus
      break
    case '10':
      days = day.value.cronDaysNearestWeekday + 'W'
      break
  }
  return days
})

const weeksText = computed(() => {
  let weeks = ''
  let cronEvery = day.value.cronEvery
  switch (cronEvery.toString()) {
    case '1':
    case '3':
    case '5':
      weeks = '?'
      break
    case '2':
      weeks = week.value.incrementStart + '/' + week.value.incrementIncrement
      break
    case '4':
      week.value.specificSpecific.map((val) => {
        weeks += val + ','
      })
      weeks = weeks.slice(0, -1)
      break
    case '6':
    case '7':
    case '9':
    case '10':
      weeks = '?'
      break
    case '8':
      weeks = week.value.cronLastSpecificDomDay + 'L'
      break
    case '11':
      weeks = week.value.cronNthDayDay + '#' + week.value.cronNthDayNth
      break
  }
  return weeks
})

const monthsText = computed(() => {
  let months = ''
  let cronEvery = month.value.cronEvery
  switch (cronEvery.toString()) {
    case '1':
      months = '*'
      break
    case '2':
      months = month.value.incrementStart + '/' + month.value.incrementIncrement
      break
    case '3':
      month.value.specificSpecific.map((val) => {
        months += val + ','
      })
      months = months.slice(0, -1)
      break
    case '4':
      months = month.value.rangeStart + '-' + month.value.rangeEnd
      break
  }
  return months
})

const yearsText = computed(() => {
  let years = ''
  let cronEvery = year.value.cronEvery
  switch (cronEvery.toString()) {
    case '1':
      years = ''
      break
    case '2':
      years = year.value.incrementStart + '/' + year.value.incrementIncrement
      break
    case '3':
      year.value.specificSpecific.map((val) => {
        years += val + ','
      })
      years = years.slice(0, -1)
      break
    case '4':
      years = year.value.rangeStart + '-' + year.value.rangeEnd
      break
  }
  return years
})

const cron = computed(() => {
  return `${secondsText.value || '*'} ${minutesText.value || '*'} ${hoursText.value || '*'} ${
    daysText.value || '*'
  } ${monthsText.value || '*'} ${weeksText.value || '?'} ${yearsText.value}`
})
</script>
<style scoped></style>
