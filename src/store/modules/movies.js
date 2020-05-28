// API CONFIG
import { http, paramDefault } from '../../api/request'

// TYPES
import * as mutation from '../types/mutation'
import apiEndpoints from '../../api/endpoints';

// =========================
// STATE
// =========================

const state = {
  movies: [],
  filter: '',
  searchTerm: '',
  page: {
    total: null,
    current: 0
  }
};

// =========================
// GETTERS
// =========================

const getters = {
  getAvailableMovieList: state => state.movies,
  getAvailablePageList: state => state.page.total,
  getCurrentPage: state => state.page.current,
  getAvailableFilter: state => state.filter
};

// =========================
// MUTATIONS
// =========================

const mutations = {
  [mutation.SET_AVAILABLE_LIST] (state, movies) { state.movies = movies },

  [mutation.SET_FILTER_TERM] (state, filterStatus) { state.filter = filterStatus; },

  [mutation.SET_PAGES] (state, { total, current }) { state.page.total = total; state.page.current = current },

  [mutation.SET_SEARCH_TERM] (state, searchTerm) { state.searchTerm = searchTerm; }
};

// =========================
// ACTIONS
// =========================

const actions = {
  async displayFullList ({ commit, state }, pageToDisplay = 1) {
    const instance = await http(apiEndpoints.discover);
    const response = await instance.get('', { params: { ...paramDefault, page: pageToDisplay } });

    commit(mutation.SET_PAGES, { total: response.data.total_pages, current: response.data.page });
    commit(mutation.SET_AVAILABLE_LIST, response.data.results);
  },

  async displayFilteredList ({ commit, state }, pageToDisplay = 1) {
    const instance = await http(apiEndpoints.default);
    const response = await instance.get(`/${state.filter}`, { params: { ...paramDefault, page: pageToDisplay } });

    commit(mutation.SET_PAGES, { total: response.data.total_pages, current: response.data.page });
    commit(mutation.SET_AVAILABLE_LIST, response.data.results);
  },

  async displaySearchList ({ commit, state }, pageToDisplay = 1) {
    const instance = await http(apiEndpoints.search);
    const response = await instance.get('', { params: { ...paramDefault, page: pageToDisplay, query: state.searchTerm } });

    commit(mutation.SET_PAGES, { total: response.data.total_pages, current: response.data.page });
    commit(mutation.SET_AVAILABLE_LIST, response.data.results);
  },

  setFilter ({ commit, dispatch }, filterStatus) {
    commit(mutation.SET_FILTER_TERM, filterStatus);
    dispatch('displayFilteredList')
  },

  setPageToDisplay ({ commit, dispatch, state }, displayPage) {
    const filterState = state.filter;
    const searchState = state.searchTerm;
    if (filterState) {
      dispatch('displayFilteredList', displayPage)
    } else if (searchState) {
      dispatch('displaySearchList', displayPage)
    } else {
      dispatch('displayFullList', displayPage)
    }
  },

  setSearch ({ commit, dispatch }, searchTerm) {
    commit(mutation.SET_SEARCH_TERM, searchTerm);
    dispatch('displaySearchList')
  }
};

export default {
  /* namespaced: true, */
  state,
  getters,
  actions,
  mutations
};
