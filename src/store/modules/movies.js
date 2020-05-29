// API CONFIG
import { http, paramDefault } from '../../api/request';

// TYPES
import * as mutation from '../types/mutation';
import apiEndpoints from '../../api/endpoints';

// =========================
// STATE
// =========================

const state = {
  moviesList: null,
  moviesListStatusPending: null,
  moviesLcatsListStatusSuccess: null,
  moviesLcatsListStatusFail: null,
  moviesListFilter: null,
  moviesListSearch: null,
  moviesListPages: { total: null, current: null },
  moviesListPreview: { id: null },
  moviesListDetails: [],
  moviesListSort: { orderBy: null, orderDirection: null }
};

// =========================
// GETTERS
// =========================

const getters = {
  getAvailableMovieList: state => {
    return state.moviesList.map(movie => {
      return {
        id: movie.id,
        title: movie.title,
        original_title: movie.original_title,
        popularity: movie.popularity,
        vote_average: movie.vote_average
      };
    });
  },
  getAvailablePageList: state => state.moviesListPages.total,
  getCurrentPage: state => state.moviesListPages.current,
  getAvailableFilter: state => state.moviesListFilter,
  getDetailsMovie: state => state.moviesListDetails
}

// =========================
// MUTATIONS
// =========================

const mutations = {

  [mutation.SET_MOVIE_LIST_STATUS_PENDING] (state, payload) {
    state.moviesListStatusPending = payload;
  },

  [mutation.SET_MOVIE_LIST_STATUS_SUCCESS] (state, payload) {
    state.moviesListStatusSuccess = payload;
  },

  [mutation.SET_MOVIE_LIST_STATUS_FAIL] (state, payload) {
    state.moviesListStatusFail = payload;
  },

  [mutation.SET_MOVIE_AVAILABLE_LIST] (state, payload) {
    state.moviesList = payload;
  },

  [mutation.SET_MOVIE_PAGES] (state, payload) {
    state.moviesListPages.total = payload.total;
    state.moviesListPages.current = payload.current;
  },

  [mutation.SET_MOVIE_FILTER_TERM] (state, payload) {
    state.moviesListFilter = payload;
  },

  [mutation.SET_MOVIE_SEARCH_TERM] (state, payload) {
    state.moviesListSearch = payload;
  },

  [mutation.SET_MOVIE_PREVIEW_ITEM] (state, payload) {
    state.moviesListPreview.id = payload;
  },

  [mutation.SET_MOVIE_PREVIEW_ITEM_DETAILS] (state, payload) {
    state.moviesListDetails = payload;
  },

  [mutation.SET_MOVIE_SORT_DETAILS] (state, payload) {
    state.moviesListSort = payload;
  },

  [mutation.SET_MOVIE_SORT_LIST] (state, payload) {
    state.moviesLists = payload;
  }
}

// =========================
// ACTIONS
// =========================

const actions = {
  fetchMovieList ({ commit, state }, pageToDisplay = 1) {
    commit(mutation.SET_MOVIE_LIST_STATUS_PENDING, true);
    commit(mutation.SET_MOVIE_AVAILABLE_LIST, []);

    const axios = http(apiEndpoints.discover);

    axios
      .get('', { params: { ...paramDefault, page: pageToDisplay } })
      .then(response => {
        commit(mutation.SET_MOVIE_AVAILABLE_LIST, response.data.results);
        commit(mutation.SET_MOVIE_PAGES, { total: response.data.total_pages, current: response.data.page });
        commit(mutation.SET_MOVIE_LIST_STATUS_SUCCESS, true);
        commit(mutation.SET_MOVIE_LIST_STATUS_FAIL, false);
      })
      .catch(e => {
        commit(mutation.SET_MOVIE_LIST_STATUS_SUCCESS, false);
        commit(mutation.SET_MOVIE_LIST_STATUS_FAIL, true);
      })
      .finally(() => {
        commit(mutation.SET_MOVIE_LIST_STATUS_PENDING, false);
      })
  },

  fetchFilterList ({ commit, state }, pageToDisplay = 1) {
    commit(mutation.SET_MOVIE_LIST_STATUS_PENDING, true);
    commit(mutation.SET_MOVIE_AVAILABLE_LIST, []);

    const axios = http(apiEndpoints.default);

    axios
      .get(`${state.moviesListFilter}`, { params: { ...paramDefault, page: pageToDisplay } })
      .then(response => {
        commit(mutation.SET_MOVIE_AVAILABLE_LIST, response.data.results);
        commit(mutation.SET_MOVIE_PAGES, { total: response.data.total_pages, current: response.data.page });
        commit(mutation.SET_MOVIE_LIST_STATUS_SUCCESS, true);
        commit(mutation.SET_MOVIE_LIST_STATUS_FAIL, false);
      })
      .catch(e => {
        commit(mutation.SET_MOVIE_LIST_STATUS_SUCCESS, false);
        commit(mutation.SET_MOVIE_LIST_STATUS_FAIL, true);
      })
      .finally(() => {
        commit(mutation.SET_MOVIE_LIST_STATUS_PENDING, false);
      })
  },

  fetchSearchList ({ commit, state }, searchTerm, pageToDisplay = 1) {
    commit(mutation.SET_MOVIE_LIST_STATUS_PENDING, true);
    commit(mutation.SET_MOVIE_AVAILABLE_LIST, []);

    const axios = http(apiEndpoints.search);

    axios
      .get('', { params: { ...paramDefault, page: pageToDisplay, query: `${state.moviesListSearch}` } })
      .then(response => {
        commit(mutation.SET_MOVIE_AVAILABLE_LIST, response.data.results);
        commit(mutation.SET_MOVIE_PAGES, { total: response.data.total_pages, current: response.data.page });
        commit(mutation.SET_MOVIE_LIST_STATUS_SUCCESS, true);
        commit(mutation.SET_MOVIE_LIST_STATUS_FAIL, false);
      })
      .catch(e => {
        commit(mutation.SET_MOVIE_LIST_STATUS_SUCCESS, false);
        commit(mutation.SET_MOVIE_LIST_STATUS_FAIL, true);
      })
      .finally(() => {
        commit(mutation.SET_MOVIE_LIST_STATUS_PENDING, false);
      })
  },

  fetchPreviewItem ({ commit, state }) {
    commit(mutation.SET_MOVIE_LIST_STATUS_PENDING, true);
    const axios = http(apiEndpoints.default);

    Promise.all([
      axios.get(`${state.moviesListPreview.id}`, { params: { ...paramDefault } }),
      axios.get(`${state.moviesListPreview.id}/credits`, { params: { ...paramDefault } })
    ])
      .then(response => {
        const concatData = Object.assign({}, ...response.map(resp => ({ ...resp.data })))
        return concatData;
      })
      .then(data => {
        commit(mutation.SET_MOVIE_PREVIEW_ITEM_DETAILS, data);
        commit(mutation.SET_MOVIE_LIST_STATUS_SUCCESS, true);
        commit(mutation.SET_MOVIE_LIST_STATUS_FAIL, false);
      })
      .catch(e => {
        commit(mutation.SET_MOVIE_LIST_STATUS_SUCCESS, false);
        commit(mutation.SET_MOVIE_LIST_STATUS_FAIL, true);
      })
      .finally(() => {
        commit(mutation.SET_MOVIE_LIST_STATUS_PENDING, false);
      })
  },

  applayListSorting ({ commit, state, dispatch }, data) {
    const movieListSet = state.moviesList;

    switch (data.orderBy) {
      case 'votes':
        movieListSet.sort((a, b) => {
          if (data.orderDirection === 'desc') {
            return ((a.vote_average === b.vote_average) ? 0 : ((a.vote_average < b.vote_average) ? 1 : -1));
          } else {
            return ((a.vote_average === b.vote_average) ? 0 : ((a.vote_average > b.vote_average) ? 1 : -1));
          }
        });
        break;
      case 'popularity':
        movieListSet.sort((a, b) => {
          if (data.orderDirection === 'desc') {
            return ((a.popularity === b.popularity) ? 0 : ((a.popularity < b.popularity) ? 1 : -1));
          } else {
            return ((a.popularity === b.popularity) ? 0 : ((a.popularity > b.popularity) ? 1 : -1));
          }
        });
        break;
    }
    commit(mutation.SET_MOVIE_SORT_LIST, movieListSet);
  },

  async setFilter ({ commit, dispatch }, filterStatus) {
    await commit(mutation.SET_MOVIE_FILTER_TERM, filterStatus);
    dispatch('fetchFilterList', filterStatus);
  },

  async setSearch ({ commit, dispatch }, searchTerm) {
    await commit(mutation.SET_MOVIE_SEARCH_TERM, searchTerm);
    dispatch('fetchSearchList', searchTerm);
  },

  async setPreviewItem ({ commit, dispatch }, id) {
    await commit(mutation.SET_MOVIE_PREVIEW_ITEM, id);
    dispatch('fetchPreviewItem');
  },

  setPageToDisplay ({ commit, dispatch, state }, displayPage) {
    const filterState = state.moviesListFilter;
    const searchState = state.moviesListSearch;
    if (filterState) {
      dispatch('fetchFilterList', displayPage);
    } else if (searchState) {
      dispatch('fetchSearchList', displayPage);
    } else {
      dispatch('fetchMovieList', displayPage);
    }
  },

  setOrderDirection ({ commit, dispatch }, data) {
    commit(mutation.SET_MOVIE_SORT_DETAILS, data);
    dispatch('applayListSorting', { orderBy: state.moviesListSort.orderBy, orderDirection: state.moviesListSort.orderDirection });
  }
}

export default {
  /* namespaced: true, */
  state,
  getters,
  actions,
  mutations
};
