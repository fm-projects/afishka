<template>
  <div class="container rt-wp mt-4">
    <h1 class="fs-2 fw-bold mb-4">Афиша мероприятий в Альметьевске</h1>

    <div class="row">
      <div class="col-12 col-lg-4 order-0 order-lg-1 mb-3 mb-lg-0">
        <div class="d-flex flex-wrap">
          <router-link class="btn btn-outline-dark mb-2 me-2" to="/create">
            <i class="bi-plus me-2"></i>Добавить мероприятие
          </router-link>
          <div
            class="btn btn-outline-dark mb-2"
            data-bs-toggle="collapse"
            href="#filters-collapse"
            role="button"
          >
            <i class="bi-funnel me-2"></i>Фильтры
          </div>
        </div>

        <div class="collapse show" id="filters-collapse">
          <div class="mb-3 mt-3">
            <FormInput
              label=""
              v-model="FILTERS.query"
              name="query"
              is-input-group
              @change="() => refreshResults()"
              clear-button
            >
              <span class="input-group-text" id="basic-addon1"
                ><i class="bi-search"></i
              ></span>
            </FormInput>
          </div>

          <div class="mb-3" v-if="store.getters.isAuthenticated">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="FILTERS.starred"
                id="show-starred"
                @change="() => refreshResults()"
              />
              <label class="form-check-label" for="show-starred">
                Избранные мероприятия
              </label>
            </div>
          </div>

          <div class="mb-3" v-if="store.state.auth.user?.is_staff">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="FILTERS.need_moderation"
                id="show-accepted"
                @change="() => refreshResults()"
              />
              <label class="form-check-label" for="show-accepted">
                Ожидающие модерации
              </label>
            </div>
          </div>

          <div class="mb-3">
            <div class="form-label">Дата</div>
            <datepicker
              v-model="(FILTERS.date as Date[])"
              range
              :enableTimePicker="false"
              :partial-range="true"
              :position="'left'"
              locale="ru"
              class="w-100 mb-2"
              :select-text="'Выбрать'"
              :cancel-text="'Отмена'"
              :clearable="false"
              title="Выбор даты"
            />
            <div class="d-flex flex-row flex-wrap">
              <button
                class="btn btn-sm btn-outline-dark me-1 mt-1"
                @click="
                  () => {
                    FILTERS.date = [];
                    refreshResults();
                  }
                "
              >
                Всё время
              </button>
              <button
                class="btn btn-sm btn-outline-dark me-1 mt-1"
                @click="
                  () => {
                    FILTERS.date = [moment().toDate(), null];
                    refreshResults();
                  }
                "
              >
                Сегодня
              </button>
              <button
                class="btn btn-sm btn-outline-dark me-1 mt-1"
                @click="
                  () => {
                    FILTERS.date = [moment().add(1, 'day').toDate(), null];
                    refreshResults();
                  }
                "
              >
                Завтра
              </button>
              <button
                class="btn btn-sm btn-outline-dark me-1 mt-1"
                @click="
                  () => {
                    FILTERS.date = [
                      moment().toDate(),
                      moment().add(7, 'days').toDate(),
                    ];
                    refreshResults();
                  }
                "
              >
                На этой неделе
              </button>
            </div>
          </div>

          <div class="mb-3">
            <FormSelect
              label="Подтверждение участия"
              :options="regNeedOptions"
              v-model="FILTERS.reg_needed"
              name="reg_needed"
              @change="() => refreshResults()"
            />
          </div>

          <div class="mb-3">
            <FormSelect
              label="Количество участников"
              :options="eventTypeOptions"
              v-model="FILTERS.participants"
              name="participants"
              @change="() => refreshResults()"
            />
          </div>

          <div class="mb-3">
            <FormSelect
              :options="priceOptions"
              v-model="FILTERS.price"
              name="price"
              label="Цена"
              @change="() => refreshResults()"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-8 order-1 order-lg-0">
        <Loading :is-loading="isLoading">
          <div v-if="!events.count" class="text-center mt-4">
            <img src="@/assets/icons/box.svg" alt="" height="80" class="mb-2" />
            <div>По вашему запросу ничего не найдено</div>
          </div>
          <div class="row g-3" v-else>
            <div
              class="col-12 col-md-6 col-lg-6"
              v-for="event of events.results"
            >
              <EventCard
                :obj="event"
                :gradient="gradients[event.id % gradients.length]"
              />
            </div>
          </div>
          <div v-if="events.next" class="text-center">
            <button
              class="btn btn-outline-dark"
              @click="
                () => {
                  page++;
                  refreshResults(false);
                }
              "
            >
              Загрузить ещё
            </button>
          </div>
        </Loading>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { APIEvent, listEvents, EventListParams } from "@/api/services/events";
import { Paginator } from "@/api/types";
import { onMounted, ref } from "vue";
import EventCard from "./EventCard.vue";
import moment from "moment";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import gradients from "./gradients";
import FormSelect, { SelectOption } from "./forms/FormSelect.vue";
import { useStore } from "@/store";
import { Loading, FormInput } from ".";

const regNeedOptions: SelectOption[] = [
  {
    label: "---",
    value: "0",
  },
  {
    label: "Не требуется",
    value: "1",
  },
  {
    label: "Требуется",
    value: "2",
  },
];

const eventTypeOptions: SelectOption[] = [
  {
    label: "---",
    value: "0",
  },
  {
    label: "1-10",
    value: "1",
  },
  {
    label: "10-50",
    value: "2",
  },
  {
    label: "50+",
    value: "3",
  },
];

const priceOptions: SelectOption[] = [
  {
    label: "Бесплатно",
    value: "0",
  },
  {
    label: "До 100₽",
    value: "1",
  },
  {
    label: "До 500₽",
    value: "2",
  },
  {
    label: "До 1000₽",
    value: "3",
  },
  {
    label: "Все",
    value: "4",
    selected: true,
  },
];

const events = ref<Paginator<APIEvent>>({
  results: [],
  next: null,
  previous: null,
  count: 0,
});

type DatePickerRef = [Date, Date] | [Date, null] | [];

interface Filters {
  date: DatePickerRef;
  starred: boolean;
  reg_needed: string;
  participants: string;
  price: string;
  need_moderation: boolean;
  query: string;
}

const page = ref(1);
const isLoading = ref(true);
const store = useStore();

const FILTERS = ref<Filters>({
  date: [],
  starred: false,
  reg_needed: "0",
  participants: "0",
  price: "4",
  need_moderation: false,
  query: "",
});

onMounted(async () => {
  refreshResults();
  isLoading.value = false;
});

const refreshResults = async (reset = true) => {
  if (reset) {
    page.value = 1;
    events.value.results = [];
  }

  const params: EventListParams = {
    page: page.value,
  };

  if (FILTERS.value.starred && store.state.auth.user)
    params.id__in = store.state.auth.user.starred_events.join(",");

  if (FILTERS.value.need_moderation && store.state.auth.user?.is_staff)
    params.accepted = false;
  else params.accepted = true;

  if (FILTERS.value.date.length) {
    const dates = FILTERS.value.date
      .slice()
      .map((val) => (val === null ? null : moment(val).format("YYYY-MM-DD")));

    if (dates[0] !== null) {
      params.date_after = dates[0];
      params.date_before = dates[1] === null ? dates[0] : dates[1];
    }
  }

  if (FILTERS.value.reg_needed !== "0") {
    params.reg_needed = FILTERS.value.reg_needed === "2";
  }

  if (FILTERS.value.query.trim()) {
    params.query = FILTERS.value.query.trim();
  }

  if (FILTERS.value.participants !== "0") {
    switch (FILTERS.value.participants) {
      case "1":
        params.participants__gte = 1;
        params.participants__lte = 10;
        break;
      case "2":
        params.participants__gte = 11;
        params.participants__lte = 50;
        break;
      case "3":
        params.participants__gte = 50;
        break;
    }
  }

  if (FILTERS.value.price !== "4") {
    switch (FILTERS.value.price) {
      case "0":
        params.price__lte = 0;
        break;
      case "1":
        params.price__lte = 100;
        break;
      case "2":
        params.price__lte = 500;
        break;
      case "3":
        params.price__lte = 1000;
        break;
    }
  }

  const d = (await listEvents(params)).data;
  events.value.next = d.next;
  events.value.count = d.count;
  events.value.previous = d.previous;
  events.value.results = events.value.results.concat(d.results);
};
</script>
